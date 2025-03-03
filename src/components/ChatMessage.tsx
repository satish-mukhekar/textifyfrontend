
import React from 'react';
import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={cn(
        "flex w-full my-4 items-start gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <Bot size={18} className="text-secondary-foreground" />
        </div>
      )}
      
      <div 
        className={cn(
          "message-bubble max-w-[80%] md:max-w-[70%]",
          isUser ? "user-message" : "ai-message"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <User size={18} className="text-primary-foreground" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
