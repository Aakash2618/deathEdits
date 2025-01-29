require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer=require("multer")
const path=require("path")
const crypto=require("crypto")

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const tshirtRoutes = require('./routes/tshirt.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const {upload }= require('./middleware/multer.middleware')
const {uploadOnCloudinary} = require('./utils/cloudinary')


const app = express();

// Middleware
app.use(cors({
  "origin":"https://deathedits.vercel.app/"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get("/",(req,res)=>{
  res.json("server running successfully...")
})
app.get("/api",(req,res)=>{
  res.json("its working")
})

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', tshirtRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
