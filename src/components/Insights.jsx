import React, { useState } from 'react';

const Insights = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! 👋 How can I help you with RPI dorm insights today?', time: '7:20' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { sender: 'user', text: input, time: '7:21' };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Thanks for your question! I’ll get that info for you shortly.', time: '7:22' },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Insights Page</h1>
      <p className="text-lg">
        Welcome to the insights page. Here's where you'll find data about dorms, trends, and more.
      </p>

      {/* Floating Help Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-[#1e1e1e] text-white px-5 py-3 rounded-full shadow-lg hover:opacity-90 transition"
        >
          Assistance
        </button>
      )}

      {/* Chat Popup */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl border border-gray-300 flex flex-col overflow-hidden z-50">
          {/* Header */}
          <div className="bg-[#1e1e1e] text-white px-4 py-3 flex justify-between items-center">
            <h2 className="text-sm font-medium">Need Help?</h2>
            <button onClick={() => setIsChatOpen(false)} className="text-white text-lg font-bold">×</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 text-sm text-gray-800">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-[#e5e5ea] text-right'
                      : 'bg-[#f1f0f0] text-left'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className="text-[10px] mt-1 text-gray-400">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t flex items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              type="text"
              placeholder="Type your message..."
              className="flex-1 border px-3 py-2 rounded-full text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 text-[#c8102e] font-bold text-lg"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insights;
