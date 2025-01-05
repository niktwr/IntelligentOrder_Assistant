import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const createOrder = async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      setOrders(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  };

  return { orders, loading, createOrder, fetchOrders };
};