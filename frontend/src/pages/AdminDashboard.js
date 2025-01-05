// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/orders'); // Adjust the endpoint as needed
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-3xl text-white font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl text-gray-300 mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">User  ID</th>
              <th className="py-3 px-4 text-left">Total Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b border-gray-600">
                <td className="py-3 px-4 text-gray-200">{order._id}</td>
                <td className="py-3 px-4 text-gray-200">{order.userId}</td>
                <td className="py-3 px-4 text-gray-200">${order.totalAmount.toFixed(2)}</td>
                <td className="py-3 px-4 text-gray-200">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;