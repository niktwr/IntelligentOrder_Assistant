const express = require('express');
const router = express.Router();
const { fetchAnalyticsData } = require('../services/analyticsService');

router.get('/analytics', async (req, res) => {
    try {
        const data = await fetchAnalyticsData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
