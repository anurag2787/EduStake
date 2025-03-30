import { motion } from 'framer-motion';
import { useState } from 'react';

export default function DiscussionForum() {
  const [question, setQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      text: 'How does feature selection impact model performance?',
      timestamp: '3 min ago',
      likes: 2
    },
    {
      id: 2,
      type: 'ai',
      text: 'Feature selection can significantly improve model performance in several ways:\n\n1) It reduces overfitting by eliminating irrelevant features\n2) It improves accuracy by focusing on the most predictive variables\n3) It reduces training time and computational requirements\n4) It enhances model interpretability by simplifying the model',
      timestamp: '2 min ago',
      likes: 4
    }
  ]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // Add user question
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      text: question,
      timestamp: 'Just now',
      likes: 0
    };
    
    setMessages([...messages, newMessage]);
    setQuestion('');
    
    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        text: "Based on your question, I can provide these insights:\n\nRegularization techniques like L1 (Lasso) and L2 (Ridge) help prevent overfitting by penalizing model complexity. L1 regularization can perform feature selection by shrinking some coefficients to zero, while L2 regularization reduces the impact of features without eliminating them completely.\n\nThis is particularly useful when dealing with high-dimensional datasets where the risk of overfitting is higher.",
        timestamp: 'Just now',
        likes: 0
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 3000);
  };
  
  const handleLike = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
    ));
  };
  
  return (
    <motion.section
      className="min-h-screen py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-blue-300 mb-8 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        AI Discussion Forum
      </motion.h2>
      
      <p className="text-blue-200 mb-12 text-center max-w-2xl mx-auto">
        Ask questions and get instant AI responses. Explore complex topics through interactive dialogue.
      </p>
      
      {/* Chat Area */}
      <div className="max-w-3xl mx-auto bg-blue-900/30 rounded-xl p-4 md:p-6 mb-6">
        <div className="space-y-6 mb-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10, x: message.type === 'user' ? 10 : -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-xl p-4 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white ml-12' 
                    : 'bg-indigo-900/80 text-blue-100 mr-12 border border-blue-700/30'
                }`}
              >
                {message.type === 'ai' && (
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <span className="text-blue-300 text-sm font-medium">AI Assistant</span>
                  </div>
                )}
                
                <p className="whitespace-pre-line">{message.text}</p>
                
                <div className="flex justify-between items-center mt-2 text-xs">
                  <span className={message.type === 'user' ? 'text-blue-200' : 'text-blue-400'}>
                    {message.timestamp}
                  </span>
                  
                  <button 
                    className={`flex items-center ${message.type === 'user' ? 'text-blue-200' : 'text-blue-400'}`}
                    onClick={() => handleLike(message.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905C11 6.432 9.432 8 7.5 8H5a2 2 0 00-2 2v10c0 .568.447 1.059 1 1.093m11-6c0 .568-.447 1.059-1 1.093m0 0h-5.656c-.5 0-.905.405-.905.905a3 3 0 01-3 3h0" />
                    </svg>
                    {message.likes}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 10, x: -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
            >
              <div className="max-w-xs md:max-w-md rounded-xl p-4 bg-indigo-900/80 text-blue-100 mr-12 border border-blue-700/30">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <span className="text-blue-300 text-sm font-medium">AI Assistant</span>
                </div>
                
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Input Area */}
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about your learning material..."
            className="flex-1 bg-blue-800/30 border border-blue-700/50 rounded-l-lg px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 rounded-r-lg px-4 py-3 text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </form>
      </div>
      
      <motion.p 
        className="text-blue-300/70 text-center text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Questions and responses are not stored permanently. This is a simulated discussion.
      </motion.p>
    </motion.section>
  );
}