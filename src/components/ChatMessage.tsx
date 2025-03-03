
import React from 'react';
import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={cn(
        "flex w-full my-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          isUser ? "user-message" : "ai-message"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
