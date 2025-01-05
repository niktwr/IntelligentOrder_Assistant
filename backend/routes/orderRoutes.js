const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const { sendOrderConfirmation } = require('../services/emailService');
const { updateInventory } = require('../services/inventoryService');

router.post('/', async (req, res) => {
  try {
    const order = new Order({
      user: req.user._id,
      ...req.body
    });
    await order.save();
    await updateInventory(order.items);
    await sendOrderConfirmation(order);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;