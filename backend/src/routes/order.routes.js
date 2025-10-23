const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const { auth, isAdmin } = require('../middleware/auth.middleware');
const razorpay=require('../utils/razorPay')
const crypto=require('crypto')

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.tshirt')
      .sort({ createdAt: -1 });
    res.json(orders);
    console.log(orders)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// app.get("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//     res.json({ success: true, orders });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Unable to fetch orders" });
//   }
// });

// Get all orders (admin only)
router.get('/all', auth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .populate('items.tshirt')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create order from cart
router.post('/',auth, async (req, res) => {
   const { amount } = req.body;
  // try {
  //   const cart = await Cart.findOne({ user: req.user._id })
  //     .populate('items.tshirt');
    
  //   if (!cart || cart.items.length === 0) {
  //     return res.status(400).json({ message: 'Cart is empty' });
  //   }

  //   const orderItems = cart.items.map(item => ({
  //     tshirt: item.tshirt._id,
  //     quantity: item.quantity,
  //     size: item.size,
  //     color: item.color,
  //     price: item.tshirt.price
  //   }));

  //   const total = orderItems.reduce((sum, item) => 
  //     sum + (item.price * item.quantity), 0
  //   );

  //   const order = new Order({
  //     user: req.user._id,
  //     items: orderItems,
  //     total,
  //     shippingAddress: req.body.shippingAddress
  //   });

  //   await order.save();
    
  //   // Clear cart after order creation
  //   cart.items = [];
  //   await cart.save();

  //   await order.populate('items.tshirt');
  //   res.status(201).json(order);
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }

  try {
    const options = {
      amount: amount * 100,  // Convert to paise
      currency: 'INR',
      receipt: `order_rcptid_${new Date().getTime()}`,
    };

    // Create order
    const order = await razorpay.orders.create(options);

    if (!order || !order.id) {
      return res.status(500).json({ error: 'Order creation failed' });
    }

    res.json({ id: order.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/verify',auth,async(req,res)=>{
 try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      // ✅ Payment signature verified
      try {
        const cart = await Cart.findOne({ user: req.user._id })
          .populate('items.tshirt');

        if (!cart || cart.items.length === 0) {
          return res.status(400).json({ message: 'Cart is empty' });
        }
        console.log("hkdfjksdjfkjusdjskfj",cart)

        const orderItems = cart.items.map(item => ({
          tshirt: item.tshirt._id,
          quantity: item.quantity,
          size: item.size,
          // color: item.color,
          price: item.tshirt.price
        }));

        const total = orderItems.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        );

        const order = new Order({
          user: req.user._id,
          items: orderItems,
          total,
          shippingAddress: req.body.shippingAddress
        });

        await order.save();

        // Clear cart after order creation
        cart.items = [];
        await cart.save();

        await order.populate('items.tshirt');

        // ✅ Send response to frontend
        res.status(201).json(order);

        // ⏳ OPTIONAL: Do post-response background tasks here
        // (like sending an email, analytics, etc.)
        // They will run but not affect the response:
        // Example:
        // try {
        //   await sendOrderConfirmationEmail(req.user.email, order);
        // } catch (emailErr) {
        //   console.error("Email send failed:", emailErr);
        // }

      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
      }
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
})

// Update order status (admin only)
router.patch('/:id/status', auth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('items.tshirt');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;