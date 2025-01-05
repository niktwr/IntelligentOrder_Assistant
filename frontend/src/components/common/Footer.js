// src/components/common/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300">
              Your trusted electronics store with AI-powered assistance.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="text-gray-300 hover:text-white">Products</a></li>
              <li><a href="/orders" className="text-gray-300 hover:text-white">Orders</a></li>
              <li><a href="/support" className="text-gray-300 hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">Email: support@electronics.com</p>
            <p className="text-gray-300">Phone: 7489962476</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">© 2025 Electronics Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;