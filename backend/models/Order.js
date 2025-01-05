// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'CANCELLED'], default: 'PENDING' },
  deliveryAddress: { type: String, required: true } // Ensure this field is defined
});

module.exports = mongoose.model('Order', orderSchema);