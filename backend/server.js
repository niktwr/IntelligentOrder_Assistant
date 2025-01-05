const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const chatRoutes = require('./routes/chatRoutes');
const productRoutes = require('./routes/productRoutes');
const testRoutes = require('./routes/testRoutes');
// In server.js
const adminRoutes = require('./routes/adminRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes

app.use('/api/chat', chatRoutes);
app.use('/api/products', productRoutes);
app.use('/api/test', testRoutes);
app.use('/admin', adminRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    type: 'ERROR',
    message: 'An error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
