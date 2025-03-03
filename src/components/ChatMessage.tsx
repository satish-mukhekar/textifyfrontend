
import React from 'react';
import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Bot, User, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const formattedTime = message.timestamp ? format(message.timestamp, 'h:mm a') : '';
  
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
          "message-bubble max-w-[80%] md:max-w-[70%] relative",
          isUser ? "user-message" : "ai-message"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <div className="text-[10px] text-muted-foreground flex items-center mt-1 justify-end">
          <Clock size={10} className="mr-1" />
          {formattedTime}
        </div>
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
