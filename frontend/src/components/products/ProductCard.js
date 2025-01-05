import React from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={product.imageUrl || "/api/placeholder/400/300"}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">${product.price}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => addToCart(product)}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <ShoppingCart size={20} />
            </button>
            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
