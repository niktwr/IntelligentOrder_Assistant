export const validateOrderInput = (orderData) => {
    const errors = {};
  
    if (!orderData.items || !orderData.items.length) {
      errors.items = 'Order must contain at least one item';
    }
  
    if (!orderData.shippingAddress) {
      errors.shippingAddress = 'Shipping address is required';
    } else {
      const requiredFields = ['street', 'city', 'state', 'zipCode', 'country'];
      requiredFields.forEach(field => {
        if (!orderData.shippingAddress[field]) {
          errors.shippingAddress = `${field} is required in shipping address`;
        }
      });
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };