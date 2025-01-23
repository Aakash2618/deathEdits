const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const { auth, isAdmin } = require('../middleware/auth.middleware');

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.tshirt')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
router.post('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.tshirt');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      tshirt: item.tshirt._id,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      price: item.tshirt.price
    }));

    const total = orderItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
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
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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