const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');
const { auth } = require('../middleware/auth.middleware');

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate('items.tshirt', 'title description imageUrl price')
      .exec(); 
      console.log(cart)
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add item to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { tshirtId, quantity, size, color } = req.body;
    console.log(req.body)
    console.log(tshirtId,quantity,color,size)
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => 
      item.tshirt.toString() === tshirtId &&
      item.size === size &&
      item.color === color
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ tshirt: tshirtId, quantity, size, color })
        // total: quantity * (await Cart.findById(tshirtId)).price})   line to get the total of te item
    }

    await cart.save();
    await cart.populate('items.tshirt');
    
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update cart item
router.patch('/update/:itemId', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    
    const itemIndex = cart.items.findIndex(item => 
      item._id.toString() === req.params.itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate('items.tshirt');
    
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:itemId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    const initialItemCount = cart.items.length;
    cart.items = cart.items.filter(item =>{ 
      console.log(item._id.toString(),".....",req.params.itemId)
     return item._id.toString() !== req.params.itemId
    }
    );

    if (cart.items.length === initialItemCount) {
      return res.status(404).json({ message: "Item not found in cart." });
    }

    
    await cart.save();
    await cart.populate('items.tshirt');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;