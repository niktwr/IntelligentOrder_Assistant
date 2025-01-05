import React from 'react';
import { formatCurrency } from '../../utils/helpers';

const OrderSummary = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div className="border-b pb-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p>{formatCurrency(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{formatCurrency(order.totalAmount)}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>{formatCurrency(0)}</p>
          </div>
          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <p>{formatCurrency(order.totalAmount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;