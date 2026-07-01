import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { getResponse } from '../utils/chatbotKnowledge';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm here to answer questions about me. What would you like to know?", isBot: true },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getResponse(userMessage);
      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
      setIsTyping(false);
    }, 500 + Math.random() * 500);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div
        className={`fixed top-1/2 right-0 w-[360px] sm:w-[380px] md:w-[420px] max-w-[calc(100vw-4rem)] h-[70vh] max-h-[720px] -translate-y-1/2 bg-primary/70 backdrop-blur-xl rounded-l-2xl shadow-2xl border border-white/10 flex flex-col transition-all duration-300 ease-out z-50 ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-label="Portfolio chatbot"
      >
        <div className="bg-white/5 border-b border-white/10 p-4 rounded-tl-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xs font-semibold backdrop-blur-sm border border-white/10 text-white">
              AI
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Ravi's Assistant</h3>
              <p className="text-white/70 text-xs">Ask me anything about me</p>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="text-white/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
            aria-label="Close chat"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.text} isBot={msg.isBot} />
          ))}

          {isTyping && (
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-semibold text-white">
                AI
              </div>
              <div className="bg-white/90 rounded-2xl rounded-tl-sm px-4 py-3 shadow-lg backdrop-blur-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/5 rounded-bl-2xl">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-white/10 text-white placeholder-white/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#915EFF] backdrop-blur-sm border border-white/10"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-[#915EFF] to-blue-500 text-white px-5 py-3 rounded-xl font-semibold hover:from-[#7d4fe2] hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <button
        onClick={toggleChat}
        className={`fixed top-1/2 right-3 -translate-y-1/2 w-11 h-11 bg-[#050816]/80 backdrop-blur-md text-white rounded-full shadow-2xl hover:shadow-[0_0_24px_rgba(145,94,255,0.5)] transition-all duration-300 flex items-center justify-center text-xl z-50 hover:scale-110 border border-[#915EFF]/30 hover:border-[#915EFF]/60 ${
          isOpen ? 'rotate-0' : 'animate-pulse'
        }`}
        aria-label="Toggle chat"
        type="button"
      >
        {isOpen ? (
          <svg className="w-5 h-5 text-[#915EFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-[#915EFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>

      {!isOpen && (
        <div className="fixed top-[calc(50%-26px)] right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full z-50 animate-bounce"></div>
      )}
    </>
  );
};

export default Chatbot;
