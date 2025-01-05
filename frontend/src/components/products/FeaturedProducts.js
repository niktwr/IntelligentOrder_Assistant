// src/components/products/FeaturedProducts.js
import React, { useEffect, useState } from 'react';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/featured');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading products...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product._id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-white">{product.name}</h3>
            <p className="text-gray-400 mb-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-white">${product.price}</span>
              <span className="text-sm text-gray-500">
                Stock: {product.stockQuantity}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;