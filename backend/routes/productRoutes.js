const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ stockQuantity: -1 })
      .limit(6);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

module.exports = router;