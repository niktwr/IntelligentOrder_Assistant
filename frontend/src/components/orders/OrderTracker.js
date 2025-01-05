import React from 'react';
import { Check, Truck, Package, Archive } from 'lucide-react';

const OrderTracker = ({ status }) => {
  const steps = [
    { id: 'pending', label: 'Order Placed', icon: Archive },
    { id: 'processing', label: 'Processing', icon: Package },
    { id: 'shipped', label: 'Shipped', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: Check }
  ];

  const currentStep = steps.findIndex(step => step.id === status);

  return (
    <div className="py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                <step.icon size={20} />
              </div>
              <p className="mt-2 text-sm">{step.label}</p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  index < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OrderTracker;