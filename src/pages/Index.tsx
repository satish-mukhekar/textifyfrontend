
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import LoadingDots from '@/components/LoadingDots';
import { Message } from '@/lib/types';
import { sendMessage, generateId } from '@/lib/api';

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! How can I assist you today?',
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message to the chat
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // In a real app, this would send all context messages for better responses
      const aiMessage = await sendMessage([...messages, userMessage]);
      
      // Add AI response to the chat
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to get response');
      console.error('Error getting AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] max-w-4xl mx-auto px-4">
      <Header />
      
      <main className="flex-1 flex flex-col w-full max-w-3xl mx-auto mb-4">
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto py-4 px-2">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <div className="flex justify-start my-4">
                <div className="ai-message flex items-center space-x-2">
                  <LoadingDots className="text-current" />
                </div>
              </div>
            )}
            
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input area */}
        <div className="sticky bottom-0 w-full glass-panel rounded-t-2xl px-4 py-3 border-t">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;
