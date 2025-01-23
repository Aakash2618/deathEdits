const mongoose = require('mongoose');

const tshirtSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true,
    min: 0
  },
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  }],
  colors: [{
    type: String
  }],
  category: {
    type: String,
    required: true
  },
  imageUrl: [{
    type: String,
    // alt:String,
    required: true,
  }],
  stock: {
    type: Number,
    required: false,
    min: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tshirt', tshirtSchema);