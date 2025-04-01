import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function AIChatInterface() {
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "Hello! I'm your AI assistant. Feel free to ask me any questions or share any doubts you have. I'm here to help with any topic!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      likes: 0
    }
  ]);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input field on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Modified function to get response without requiring backend API
  const getAIResponse = async (userMessage) => {
    try {
      setIsTyping(true);
      
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple response generation logic based on user input
      let response = "";
      const lowerCaseMessage = userMessage.toLowerCase();
      
      if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
        response = "Hello there! How can I help you today?";
      } 
      else if (lowerCaseMessage.includes("how are you")) {
        response = "I'm functioning well, thank you for asking! How about you?";
      }
      else if (lowerCaseMessage.includes("name")) {
        response = "I'm your AI Assistant, designed to help answer your questions and engage in discussions!";
      }
      else if (lowerCaseMessage.includes("help") || lowerCaseMessage.includes("can you")) {
        response = "I'd be happy to help! I can answer questions, provide information on various topics, help with creative tasks, or just chat. What specifically would you like assistance with?";
      }
      else if (lowerCaseMessage.includes("ai") || lowerCaseMessage.includes("artificial intelligence")) {
        response = "Artificial Intelligence refers to systems designed to perform tasks that typically require human intelligence. This includes learning, reasoning, problem-solving, perception, and language understanding. I'm an example of an AI assistant designed to have helpful conversations!";
      }
      else if (lowerCaseMessage.includes("quantum")) {
        response = "Quantum computing uses quantum phenomena like superposition and entanglement to perform calculations. Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits or 'qubits' that can exist in multiple states simultaneously, potentially solving certain problems much faster than classical computers.";
      }
      else if (lowerCaseMessage.includes("creative writing") || lowerCaseMessage.includes("writing tips")) {
        response = "For creative writing, try these tips: 1) Write regularly to develop your voice, 2) Read widely for inspiration, 3) Show don't tell - use sensory details, 4) Develop complex characters with clear motivations, 5) Revise and edit your work thoroughly. Would you like more specific advice about a particular aspect of writing?";
      }
      else if (lowerCaseMessage.includes("homework")) {
        response = "I'd be happy to help with your homework! To assist effectively, could you tell me the subject and specific question or topic you're working on?";
      }
      else {
        response = "That's an interesting point! I'd love to discuss this further. Could you elaborate more on what you'd like to know about this topic?";
      }
      
      return response;
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm sorry, I encountered an error processing your request. Please try again.";
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: currentTime,
      likes: 0
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    const userQuery = inputMessage;
    setInputMessage('');
    setIsTyping(true);
    
    try {
      // Get AI response
      const aiResponseText = await getAIResponse(userQuery);
      
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        likes: 0
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error in chat flow:', error);
      
      // Error fallback
      const errorResponse = {
        id: Date.now() + 1,
        type: 'ai',
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        likes: 0
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleLike = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
    ));
  };
  
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-4xl bg-blue-950/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-blue-700/30">
        {/* Header */}
        <div className="bg-blue-800/70 px-6 py-4 flex items-center justify-between border-b border-blue-700/50">
          <motion.div
            className="flex items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Assistant</h2>
              <p className="text-blue-200 text-sm">Ask me anything</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center"
          >
            <span className={`w-3 h-3 rounded-full bg-green-500 mr-2 ${isTyping ? 'animate-pulse' : ''}`}></span>
            <span className="text-blue-200 text-sm">{isTyping ? 'Thinking...' : 'Online'}</span>
          </motion.div>
        </div>
        
        {/* Chat Area */}
        <div className="h-[500px] flex flex-col">
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10, x: message.type === 'user' ? 10 : -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {message.type === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-2 mt-1 flex-shrink-0 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                )}
                
                <div 
                  className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl p-4 shadow-md ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none' 
                      : 'bg-gradient-to-r from-indigo-800/90 to-blue-900/90 text-blue-100 rounded-tl-none border border-blue-700/30'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                  
                  <div className="flex justify-between items-center mt-2 text-xs">
                    <span className={message.type === 'user' ? 'text-blue-200' : 'text-blue-400'}>
                      {message.timestamp}
                    </span>
                    
                    <button 
                      className={`flex items-center transition-all hover:text-white ${message.type === 'user' ? 'text-blue-200' : 'text-blue-400'}`}
                      onClick={() => handleLike(message.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill={message.likes > 0 ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905C11 6.432 9.432 8 7.5 8H5a2 2 0 00-2 2v10c0 .568.447 1.059 1 1.093m11-6c0 .568-.447 1.059-1 1.093m0 0h-5.656c-.5 0-.905.405-.905.905a3 3 0 01-3 3h0" />
                      </svg>
                      {message.likes > 0 && message.likes}
                    </button>
                  </div>
                </div>
                
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center ml-2 mt-1 flex-shrink-0 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 10, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-2 mt-1 flex-shrink-0 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <div className="max-w-xs sm:max-w-sm md:max-w-md rounded-2xl p-4 bg-gradient-to-r from-indigo-800/90 to-blue-900/90 text-blue-100 border border-blue-700/30 rounded-tl-none shadow-md">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-4 bg-blue-900/50 border-t border-blue-800">
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 bg-blue-800/40 border border-blue-700/50 rounded-l-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={isTyping || !inputMessage.trim()}
                className={`bg-gradient-to-r from-blue-600 to-indigo-600 rounded-r-xl px-4 py-3 text-white transition-all ${
                  isTyping || !inputMessage.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-500 hover:to-indigo-500'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
            
            {/* Suggested questions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <SuggestedQuestion text="How does AI work?" onClick={(text) => setInputMessage(text)} />
              <SuggestedQuestion text="Help with my homework" onClick={(text) => setInputMessage(text)} />
              <SuggestedQuestion text="Explain quantum computing" onClick={(text) => setInputMessage(text)} />
              <SuggestedQuestion text="Creative writing tips" onClick={(text) => setInputMessage(text)} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Suggested question component
function SuggestedQuestion({ text, onClick }) {
  return (
    <button 
      onClick={() => onClick(text)}
      className="text-sm bg-blue-800/30 hover:bg-blue-700/50 text-blue-300 px-3 py-1 rounded-full border border-blue-700/30 transition-colors"
    >
      {text}
    </button>
  );
}