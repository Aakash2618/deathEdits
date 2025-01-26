const express = require('express');
const router = express.Router();
const Tshirt = require('../models/tshirt.model');
const { auth, isAdmin } = require('../middleware/auth.middleware');
const {upload}=require("../middleware/multer.middleware")
const {uploadOnCloudinary}=require("../utils/cloudinary")

// Get all t-shirts
router.get('/', async (req, res) => {
  try {
    const tshirts = Tshirt.find();
    res.json(tshirts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single t-shirt
router.get('/:id', auth, isAdmin,async (req, res) => {
  try {
    const tshirt = await Tshirt.findById(req.params.id);
    if (!tshirt) {
      return res.status(404).json({ message: 'T-shirt not found' });
    }
    res.json(tshirt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create t-shirt (admin only)
router.post('/', auth , isAdmin,upload.array("photos",4), async (req, res) => {
  if(!req.files) return null;
  try {
    const files=req.files;
    const imageUrls=await uploadOnCloudinary(files)
    console.log(imageUrls)
    console.log(req.body)
    const newTshirt = new Tshirt({...req.body,price:parseInt(req.body.price),sizes:JSON.parse(req.body.sizes),imageUrl:imageUrls});
    await newTshirt.save();
    res.status(201).json(newTshirt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update t-shirt (admin only)
router.patch('/:id', auth, isAdmin, async (req, res) => {
  try {
    const tshirt = await Tshirt.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!tshirt) {
      return res.status(404).json({ message: 'T-shirt not found' });
    }
    res.json(tshirt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete t-shirt (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const tshirt = await Tshirt.findByIdAndDelete(req.params.id);
    if (!tshirt) {
      return res.status(404).json({ message: 'T-shirt not found' });
    }
    // res.json({ message: 'T-shirt deleted' });
    res.json(await Tshirt.find())
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
