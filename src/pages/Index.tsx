
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import LoadingDots from '@/components/LoadingDots';
import { Message } from '@/lib/types';
import { sendMessage, generateId } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Bot, Download } from 'lucide-react';
import jsPDF from 'jspdf';

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m Donatuz AI, powered by 0g.ai. How can I assist you today?',
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
  
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };
  
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
  
    try {
      // Call your API
      const response = await fetch('https://og-aibotbackend-git-main-satishmukhekars-projects.vercel.app/api/inference/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          providerAddress: '0xf07240Efa67755B5311bc75784a061eDB47165Dd',
          content,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }
  
      const data = await response.json();
  
      // AI message from API response
      const aiMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.content, // Setting API response as message content
        timestamp: Date.now(),
      };
  
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to get response');
      console.error('Error getting AI response:', error);
    } finally {
      setIsLoading(false); // Stop loading only after API response is received
    }
  };
  

  const exportChat = () => {
    try {
      // Create a new PDF document
      const doc = new jsPDF();
      const lineHeight = 10;
      let y = 20; // Start position
      
      // Add title
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Chat Conversation Export', 20, y);
      y += lineHeight * 2;
      
      // Reset to normal text
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      // Format and add messages
      messages.forEach((msg, index) => {
        const role = msg.role === 'user' ? 'You' : 'Donatuz AI';
        const time = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : '';
        
        // Add the role and timestamp
        doc.setFont('helvetica', 'bold');
        doc.text(`${role} (${time}):`, 20, y);
        y += lineHeight;
        
        // Add the message content
        doc.setFont('helvetica', 'normal');
        
        // Handle long content with line wrapping
        const splitText = doc.splitTextToSize(msg.content, 170);
        
        // Check if we need a new page
        if (y + (splitText.length * lineHeight) > 280) {
          doc.addPage();
          y = 20;
        }
        
        doc.text(splitText, 20, y);
        y += (splitText.length * lineHeight) + 10;
        
        // Add more space after each message
        if (index < messages.length - 1) {
          // Check if we need a new page for the next message
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
        }
      });
      
      // Save the PDF
      const filename = `chat-export-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(filename);
      
      toast.success('Chat exported as PDF successfully!');
    } catch (error) {
      toast.error('Failed to export chat as PDF');
      console.error('Export error:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-background to-background/95">
      <Header />
      
      <main className="flex-1 flex flex-col w-full max-w-3xl mx-auto mb-4 px-4">
        <div className="flex-1 overflow-y-auto py-6 px-2">
          <div className="space-y-2 pb-4">
            <div className="flex justify-end mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs flex items-center gap-1" 
                onClick={exportChat}
                disabled={messages.length <= 1}
              >
                <Download size={14} />
                Export Chat
              </Button>
            </div>
            
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <div className="flex justify-start my-4 items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Bot size={18} className="text-secondary-foreground" />
                </div>
                <div className="ai-message max-w-[80%] md:max-w-[70%] relative p-4 rounded-lg">
                  <div className="flex items-center">
                    <span className="mr-2">Thinking</span>
                    <LoadingDots className="text-current" />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="sticky bottom-0 w-full glass-panel rounded-t-2xl px-4 py-4 border-t bg-background/80 backdrop-blur-sm">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;
