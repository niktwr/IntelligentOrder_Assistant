// src/pages/HomePage.js
import React from 'react';
import ChatInterface from '../components/chat/chatInterface.js';
import FeaturedProducts from '../components/products/FeaturedProducts';

const HomePage = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
            <FeaturedProducts />
          </div>
          <div>
          <h2 className="text-2xl font-bold mb-4">AI Shopping Assistant</h2>
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;