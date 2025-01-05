// services/chatbotService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { emailService } = require('./emailService');

class ChatbotService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  async processMessage(message, userId) {
    try {
      const lowercaseMessage = message.toLowerCase();

      // Check for greetings
    if (lowercaseMessage.includes('hi') || lowercaseMessage.includes('hello')) {
      return {
        type: 'GREETING',
        message: 'Hello! How can I assist you today? You can ask me to recommend products, place an order, or check your order status.'
      };
    }

    // Check for recommendations
    if (lowercaseMessage.includes('recommend') || lowercaseMessage.includes('suggest')) {
      return {
        type: 'RECOMMENDATION',
        message: 'I can help you with that! What type of products are you interested in? You can ask about TVs, phones, fridges, and more.'
      };
    }
  
    if (lowercaseMessage.includes('help')) {
      return {
        type: 'HELP',
        message: 'You can ask me things like: "Hi", "Recommend me a TV", "Order 2 phones", or "Check my order status".'
      };
    }
    
      // Check for order requests for different product types
      const orderMatch = lowercaseMessage.match(/order\s+(\d+)\s+(.+)/);
      if (orderMatch) {
        const quantity = parseInt(orderMatch[1]);
        const itemName = orderMatch[2].trim();
        return await this.handleOrderPlacement(userId, itemName, quantity);
      }
  
      // Check for product queries for different categories
      if (lowercaseMessage.includes('tv')) {
        return await this.handleProductQuery('TV');
      } else if (lowercaseMessage.includes('fridge')) {
        return await this.handleProductQuery('Fridge');
      } else if (lowercaseMessage.includes('phone')) {
        return await this.handleProductQuery('Phone');
      } else if (lowercaseMessage.includes('microwave')) {
        return await this.handleProductQuery('Microwave');
      }
  
      // Default response if no specific command is recognized
      return {
        type: 'ERROR',
        message: 'I did not understand your request. Please try again.'
      };
    } catch (error) {
      console.error('Error processing message:', error);
      return {
        type: 'ERROR',
        message: 'An error occurred while processing your request.'
      };
    }
  }

  async handleProductQuery(category) {
    const products = await Product.find({ category }).limit(3); // Adjust the query as needed
  
    if (products.length === 0) {
      return {
        type: 'ERROR',
        message: `Sorry, we don't have any ${category}s available.`
      };
    }
  
    const productList = products.map(p => ({
      name: p.name,
      price: p.price,
      description: p.description,
      image: p.image // If you have images
    }));
  
    return {
      type: 'PRODUCT_LIST',
      message: `Here are some ${category}s we have available:`,
      products: productList
    };
  }

  async handleOrderPlacement(userId, itemName, quantity) {
    try {
      console.log('Processing order for:', itemName, 'Quantity:', quantity); // Debug log
  
      const product = await Product.findOne({
        name: { $regex: new RegExp(itemName, 'i') }
      });
  
      if (!product) {
        return {
          type: 'ERROR',
          message: `Sorry, we couldn't find ${itemName} in our inventory.`
        };
      }
  
      if (product.stockQuantity < quantity) {
        return {
          type: 'ERROR',
          message: `Sorry, we only have ${product.stockQuantity} ${itemName}(s) in stock.`
        };
      }
  
      // Here, you can either hardcode a delivery address for testing or get it from the user
      const deliveryAddress = "123 Test St, Test City, TC 12345"; // Replace with actual user input if available
  
      const order = new Order({
        userId,
        items: [{
          productId: product._id,
          quantity,
          price: product.price
        }],
        totalAmount: product.price * quantity,
        status: 'PENDING',
        deliveryAddress // Include the delivery address here
      });
  
      await order.save();
  
      // Update stock
      product.stockQuantity -= quantity;
      await product.save();
  
      return {
        type: 'ORDER_CONFIRMATION',
        message: `Order placed successfully! Order ID: ${order._id}`,
        orderDetails: {
          orderId: order._id,
          items: order.items,
          totalAmount: order.totalAmount,
          status: order.status
        }
      };
    } catch (error) {
      console.error('Order placement error:', error); // Log the error details
      return {
        type: 'ERROR',
        message: 'Sorry, there was an error placing your order. Please try again.'
      };
    }
  }

  async handleOrderTracking(orderId) {
    const order = await Order.findById(orderId).populate('items.productId');
    if (!order) {
      return {
        type: 'ERROR',
        message: 'Order not found.'
      };
    }

    return {
      type: 'ORDER_TRACKING',
      message: `Order ID: ${order._id}, Status: ${order.status}, Total Amount: $${order.totalAmount.toFixed(2)}`,
      orderDetails: {
        items: order.items.map(item => ({
          name: item.productId.name,
          quantity: item.quantity,
          price: item.price
        }))
      }
    };
  }

  async handleOrderCancellation(userId, orderId) {
    const order = await Order.findOne({ _id: orderId, userId });
    
    if (!order) {
      return {
        type: 'ERROR',
        message: 'Order not found or unauthorized.'
      };
    }

    if (order.status !== 'PENDING') {
      return {
        type: 'ERROR',
        message: 'Sorry, only pending orders can be cancelled.'
      };
    }

    order.status = 'CANCELLED';
    await order.save();

    // Restore stock
    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stockQuantity += item.quantity;
        await product.save();
      }
    }

    return {
      type: 'ORDER_CANCELLED',
      message: `Order #${orderId} has been cancelled successfully.`
    };
  }

  async handleOrderSummary(userId) {
    const orders = await Order.find({ userId }).populate('items.productId');
    if (orders.length === 0) {
      return {
        type: 'ERROR',
        message: 'You have no orders yet.'
      };
    }

    const orderSummary = orders.map(order => ({
      orderId: order._id,
      totalAmount: order.totalAmount,
      status: order.status,
      items: order.items.map(item => ({
        name: item.productId.name,
        quantity: item.quantity,
        price: item.price
      }))
    }));

    return {
      type: 'ORDER_SUMMARY',
      message: 'Here are your orders:',
      orders: orderSummary
    };
  }
}

module.exports = new ChatbotService();