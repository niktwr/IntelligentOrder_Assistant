// backend/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatbotService = require('../services/chatbotService'); // Adjusted import

// Middleware to check auth
const authMiddleware = async (req, res, next) => {
  try {
    // For testing, set a dummy user ID
    req.user = { _id: '65786543210987654321abcd' };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

router.post('/message', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ 
        type: 'ERROR',
        message: 'Message is required' 
      });
    }

    console.log('Received message:', message); // Debug log
    const response = await chatbotService.processMessage(message, req.user._id);
    console.log('Chatbot response:', response); // Debug log
    res.json(response);
  } catch (error) {
    console.error('Chat route error:', error);
    res.status(500).json({ 
      type: 'ERROR',
      message: 'An error occurred processing your message'
    });
  }
});

module.exports = router;