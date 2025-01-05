const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback({
      user: req.user._id,
      ...req.body
    });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;