import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (content) => {
    setLoading(true);
    try {
      const userMessage = {
        content,
        role: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      const response = await api.post('/chat', { message: content });
      const botMessage = {
        content: response.data.message,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    loading
  };
};
