// backend/routes/testRoutes.js
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

router.get('/test-gemini', async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent('Say hello');
    res.json({ 
      message: result.response.text(),
      status: 'Gemini API working'
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      status: 'Gemini API error'
    });
  }
});

module.exports = router;