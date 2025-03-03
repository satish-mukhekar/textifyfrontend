
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 200);
    textarea.style.height = `${newHeight}px`;
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-end gap-2 w-full"
    >
      <div className="relative flex-grow rounded-2xl overflow-hidden border border-input bg-background shadow-sm">
        <Sparkles className="absolute left-3 top-1/2 -translate, left-3, top-1/2, -translate-y-1/2 text-muted-foreground h-4 w-4" style={{ opacity: input ? 0 : 0.5 }} />
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message ChatGPT..."
          rows={1}
          disabled={isLoading}
          className="w-full px-4 py-3 pl-10 pr-12 resize-none focus:outline-none bg-transparent placeholder:text-muted-foreground/70"
          style={{ minHeight: '44px', maxHeight: '200px' }}
        />
      </div>
      <Button 
        type="submit" 
        size="icon" 
        className="h-11 w-11 rounded-full shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 disabled:opacity-50"
        disabled={!input.trim() || isLoading}
        aria-label="Send message"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default ChatInput;
