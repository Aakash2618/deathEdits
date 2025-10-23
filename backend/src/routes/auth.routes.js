const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Register
router.post('/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('first_name').notEmpty()
  ],
  async (req, res) => {
    try {
      const { email, password, first_name,last_name,phone,address } = req.body;
      // console.log(first_name,last_name,address,phone,password)
      
      const existingUser = await User.findOne({ email }) || await User.findOne({phone});
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const user = new User({ email, password, first_name, last_name, phone, address, });
      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'akki_akki',
        { expiresIn: '24h' }
      );

      res.status(201).json({ user, token ,message:"User Registered Successfully!"});
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error.message });
    }
});

// Login
router.post('/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(403).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'akki_akki',
        { expiresIn: '24h' }
      );

      res.json({ user, token ,  });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

module.exports = router;