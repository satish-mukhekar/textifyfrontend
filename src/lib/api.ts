import { Message } from './types';

// In a production app, this would be handled by a backend server
// to keep your API key secure. This is a simplified frontend-only
// implementation for demonstration purposes.

// Generate a unique ID for messages
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Simulate sending a message to the OpenAI API
export async function sendMessage(messages: Message[]): Promise<Message> {
  // In a real implementation, this would be a fetch call to your backend
  // which would then use the OpenAI API

  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // For demo purposes, respond with a canned response
    // In a real app, this would be the response from OpenAI
    const aiResponses = [
      "I'm an AI assistant simulation. In a real implementation, this would be connected to OpenAI's API through a secure backend.",
      "To implement this properly, you would need a backend server that securely stores your API key and forwards requests to OpenAI.",
      "This is a frontend-only demo. In production, you would make an API call to your backend, which would then use the OpenAI SDK.",
      "I'm responding with pre-written text. A real implementation would generate responses using OpenAI's models via a secure backend.",
      "In a complete implementation, your messages would be sent to a server, which would use your API key to make requests to OpenAI.",
      "To set this up with a real backend, you'd create a Node.js/Express server that handles authentication and API calls to OpenAI."
    ];
    
    const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    
    return {
      id: generateId(),
      role: 'assistant',
      content: randomResponse,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message. Please try again.');
  }
}
