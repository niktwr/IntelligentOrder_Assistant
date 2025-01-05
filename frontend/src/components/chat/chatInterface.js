// src/components/chat/ChatInterface.js
import React, { useState, useEffect, useRef } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);
      
      const response = await fetch('http://localhost:5000/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.type === 'PRODUCT_LIST') {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: data.message,
          products: data.products // Store products for rendering
        }]);
      } else {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: data.message,
          data: data
        }]);
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        type: 'error',
        content: 'Sorry, there was an error sending your message. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[550px] w-full max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-lg p-3 ${
              msg.type === 'user' ? 'bg-blue-500 text-white' : 
              msg.type === 'error' ? 'bg-red-500 text-white' :
              'bg-gray-700 text-white'
            }`}>
              <p>{msg.content}</p>
              {msg.products && msg.products.length > 0 && (
                <div className="mt-2">
                  <p>Available Products:</p>
                  <ul className="list-disc pl-5">
                    {msg.products.map((product, index) => (
                      <li key={index} className="text-gray-300">
                        {product.name} - ${product.price} <br />
                        {product.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {msg.data?.type === 'ORDER_CONFIRMATION' && (
                <div className="mt-2 text-sm">
                  <p>Order confirmed!</p>
                  <p>Total: ${msg.data.orderDetails.totalAmount}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-700 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 border border-gray-600 rounded-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:border-blue-500"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className={`px-6 py-2 rounded-lg transition-colors ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                :                 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ChatInterface;