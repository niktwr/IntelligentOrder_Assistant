import React from 'react';
import { useOrders } from '../hooks/useOrders';
import OrderCard from '../components/orders/OrderCard';
import Loading from '../components/common/Loading';

const OrderHistory = () => {
  const { orders, loading } = useOrders();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map(order => (
              <OrderCard key={order._id} order={order} />
            ))
          ) : (
            <p className="text-center text-gray-500">No orders found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;