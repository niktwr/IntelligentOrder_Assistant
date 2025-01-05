// src/components/common/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-white">
              Store 
            </Link>
          </div>
          
          <div className="flex items-center space-x-10">
               <>
                <Link to="/admin" className="text-gray-300 font-semibold hover:text-white">
                  Admin Dashboard
                </Link>
                <Link to="/cart" className="text-gray-300 hover:text-white">
                  <ShoppingCart size={20} />
                </Link>
                
              </>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;