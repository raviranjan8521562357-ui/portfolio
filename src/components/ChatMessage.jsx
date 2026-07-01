import React from 'react';

const ChatMessage = ({ message, isBot }) => {
  return (
    <div className={`flex items-start gap-3 mb-4 animate-fadeIn ${isBot ? '' : 'flex-row-reverse'}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
          isBot
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
            : 'bg-gradient-to-br from-green-400 to-blue-500 text-white'
        }`}
      >
        {isBot ? 'AI' : 'YOU'}
      </div>

      <div className={`flex-1 max-w-[80%] ${isBot ? '' : 'flex justify-end'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isBot
              ? 'bg-white/90 text-gray-800 rounded-tl-sm'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-sm'
          } shadow-lg backdrop-blur-sm`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-line">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
