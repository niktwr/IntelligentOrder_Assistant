// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Ensure this path is correct

// Get all orders for admin
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId'); // Populate product details if needed
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;