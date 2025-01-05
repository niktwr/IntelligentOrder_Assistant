import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSend, loading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 rounded-lg bg-blue-500 text-white disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;