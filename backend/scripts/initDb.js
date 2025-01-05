// backend/scripts/initDb.js
const mongoose = require('mongoose');
const Product = require('../models/Product');
const sampleProducts = require('../config/data/sampleProducts');
require('dotenv').config();

async function initializeDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted');

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Database initialization error:', error);
  } finally {
    mongoose.disconnect();
  }
}

initializeDatabase();