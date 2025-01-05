const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  stockQuantity: { type: Number, default: 0 },
  category: String
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;