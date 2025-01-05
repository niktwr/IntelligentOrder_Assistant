import React from 'react';
import { formatDate, formatOrder } from '../../utils/helpers';

const OrderCard = ({ order }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">Order #{order._id.slice(-6)}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>
      
      <div className="space-y-2">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p>{item.product.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">${item.price * item.quantity}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Total Amount</p>
          <p className="font-semibold">${order.totalAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
