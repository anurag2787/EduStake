'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { SiMetamask } from 'react-icons/si';

// Enhanced background with floating elements and gradient overlay
const EnhancedBackground = () => {
  // Create particles with different sizes and animations
  const particles = Array.from({ length: 40 });
  
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br bg-transparent opacity-90"></div>
      
      {/* Glowing circle in the background */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Floating particles */}
      {particles.map((_, i) => {
        const size = Math.random() * 12 + 2;
        const duration = Math.random() * 60 + 30;
        const delay = Math.random() * 20;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.2 + 0.1;
        
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-indigo-400' : 'bg-cyan-400'}`}
            style={{ width: size, height: size }}
            initial={{ x: `${posX}vw`, y: `${posY}vh`, opacity: 0 }}
            animate={{
              y: [`${posY}vh`, `${(posY + 30) % 100}vh`],
              x: [`${posX}vw`, `${(posX + (Math.random() * 10 - 5)) % 100}vw`],
              opacity: [0, opacity, 0],
              scale: [1, Math.random() * 0.5 + 1, 1]
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      })}
      
      {/* Grid lines for depth */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTU5IDFIMXY1OGg1OFYxeiIgZmlsbD0iIzIwMjA0MCIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
    </div>
  );
};

// Enhanced Input field component with subtle animation
const InputField = ({ label, type, name, value, onChange, error, inputDelay }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  return (
    <motion.div 
      className="mb-5 relative"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: inputDelay, duration: 0.3 }}
    >
      <div className="relative group">
        <input
          type={inputType}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(value ? true : false)}
          className={`w-full px-5 py-4 bg-gray-900/50 text-white rounded-xl border backdrop-blur-sm
            transition-all duration-300 outline-none 
            ${error ? 'border-red-500' : isFocused ? 'border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'border-gray-700'}
            ${isFocused || value ? 'pt-6 pb-2' : ''}`}
        />
        <motion.label
          htmlFor={name}
          className={`absolute left-5 transition-all duration-200 pointer-events-none
            ${isFocused || value ? 'text-xs top-2 text-blue-400' : 'text-base top-4 text-gray-400'}`}
        >
          {label}
        </motion.label>
        
        {type === 'password' && (
          <motion.button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-4 top-4 text-gray-400 hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.1, color: '#60a5fa' }}
            whileTap={{ scale: 0.95 }}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </motion.button>
        )}
        
        {/* Background glow effect on focus */}
        <AnimatePresence>
          {isFocused && !error && (
            <motion.div 
              className="absolute inset-0 rounded-xl -z-10 opacity-30 blur-md bg-blue-600"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 0.15, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.div
            className="mt-2 flex items-center text-red-500 text-sm ml-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 102 0V11a1 1 0 10-2 0v4z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Enhanced button component with better animation
const Button = ({ children, onClick, isLoading, secondary = false, delay = 0.6 }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      className={`w-full py-4 px-5 rounded-xl font-medium transition-all relative overflow-hidden group
        ${secondary 
          ? 'bg-transparent text-blue-400 hover:bg-blue-900/30 border border-blue-500/30' 
          : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/20'
        }
        flex items-center justify-center`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated shine effect */}
      {!secondary && (
        <motion.div 
          className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20" 
          style={{ skewX: -15 }}
          initial={{ left: "-100%" }}
          animate={{ left: ["0%", "150%"] }}
          transition={{ 
            duration: 1.5, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1
          }}
        />
      )}

      {isLoading ? (
        <div className="flex items-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          <span>Processing...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

// Enhanced social button component
const SocialButton = ({ icon, children, onClick, delay = 0.7, variant = "default" }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full py-3 px-5 rounded-xl font-medium mb-4
        ${variant === "metamask" 
          ? "bg-gradient-to-r from-orange-600/20 to-orange-500/10 text-white border border-orange-500/30" 
          : "bg-gray-800/50 text-white border border-gray-700/70"}
        backdrop-blur-sm hover:border-blue-500/50
        flex items-center justify-center gap-3 transition-all group`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)' }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        className="text-xl"
        animate={{ rotate: [0, 0] }}
        whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
      >
        {icon}
      </motion.span>
      <span className="group-hover:text-white transition-colors">{children}</span>
    </motion.button>
  );
};

// Background ellipse for visual interest
const BackgroundEllipse = () => (
  <div className="absolute top-0 right-0 -z-10 overflow-hidden">
    <svg viewBox="0 0 200 200" width="500" height="500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ellipseGradient" gradientTransform="rotate(45)">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path 
        fill="url(#ellipseGradient)" 
        d="M41.1,-70.6C53.3,-64.2,63.2,-52.9,71,-39.5C78.8,-26.1,84.5,-10.5,83.5,4.6C82.5,19.8,74.7,34.4,64,45.2C53.2,56,39.5,62.9,24.9,68.1C10.4,73.3,-5,76.8,-19.1,73.4C-33.3,70,-46.1,59.8,-54.9,47.2C-63.7,34.7,-68.4,19.8,-70.7,4.3C-73,-11.2,-72.9,-27.2,-66.3,-40C-59.7,-52.8,-46.7,-62.2,-33.2,-68.3C-19.7,-74.4,-5.4,-77,8.3,-74.8C22,-72.6,42,-77,53.5,-70.2Z" 
        transform="translate(100 100)" 
      />
    </svg>
  </div>
);

// Logo component
const Logo = () => (
  <motion.div 
    className="absolute top-6 left-6 flex items-center space-x-2"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 7L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 7L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">EduStake</span>
  </motion.div>
);

// Main Auth Component
export default function Auth() {
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    
    if (authMode === 'signup') {
      if (!formData.name) newErrors.name = 'Name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle successful login/signup
      console.log('Form submitted:', formData);
    }, 2000);
  };

  // Handle MetaMask connection
  const connectMetaMask = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        setIsLoading(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        setWalletAddress(address);
        setIsMetaMaskConnected(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
        setIsLoading(false);
      }
    } else {
      alert('MetaMask not found. Please install MetaMask to connect your wallet.');
    }
  };

  // Toggle between login and signup
  const toggleAuthMode = () => {
    setErrors({});
    setAuthMode(prev => prev === 'login' ? 'signup' : 'login');
  };

  return (
    <>
      <Head>
        <title>{authMode === 'login' ? 'Login' : 'Sign Up'} | EduStake</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-transparent text-white relative">
        
        
        <motion.div
          className="mt-28 w-full max-w-md mx-4 my-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="backdrop-blur-md bg-black/30 border border-gray-800/50 rounded-2xl shadow-2xl shadow-blue-900/20 overflow-hidden"
            animate={{ boxShadow: ['0 20px 25px -5px rgba(0, 0, 255, 0.1)', '0 20px 25px -5px rgba(0, 0, 255, 0.2)', '0 20px 25px -5px rgba(0, 0, 255, 0.1)'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Auth Tabs */}
            <div className="flex mt-2 px-2">
              <motion.button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-4 px-6 rounded-t-lg transition-all duration-300 ${authMode === 'login' ? 'text-blue-400 border-b-2 border-blue-500 font-medium' : 'text-gray-400'}`}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.button>
              <motion.button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-4 px-6 rounded-t-lg transition-all duration-300 ${authMode === 'signup' ? 'text-blue-400 border-b-2 border-blue-500 font-medium' : 'text-gray-400'}`}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Up
              </motion.button>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={authMode}
                className="px-8 py-6 pb-8"
                initial={{ opacity: 0, x: authMode === 'login' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: authMode === 'login' ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit}>
                  {/* Login Form */}
                  {authMode === 'login' && (
                    <>
                      <motion.h2 
                        className="text-2xl font-bold mb-8 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
                          Welcome Back 👋
                        </span>
                        <br />
                        <span className="text-lg font-normal text-gray-300 mt-2 block">
                          Log in to Access Your Dashboard
                        </span>
                      </motion.h2>
                      
                      <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        inputDelay={0.3}
                      />
                      
                      <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        inputDelay={0.4}
                      />
                      
                      <motion.div
                        className="text-right mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.a 
                          href="#" 
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
                          whileHover={{ 
                            textShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
                          }}
                        >
                          Forgot Password?
                          <svg className="w-3 h-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </motion.a>
                      </motion.div>
                      
                      <Button isLoading={isLoading} delay={0.5}>
                        Login to Learn
                      </Button>
                    </>
                  )}
                  
                  {/* Signup Form */}
                  {authMode === 'signup' && (
                    <>
                      <motion.h2 
                        className="text-2xl font-bold mb-8 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
                          Create Your Account 🚀
                        </span>
                        <br />
                        <span className="text-lg font-normal text-gray-300 mt-2 block">
                          Start Learning & Earning
                        </span>
                      </motion.h2>
                      
                      <InputField
                        label="Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        inputDelay={0.3}
                      />
                      
                      <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        inputDelay={0.4}
                      />
                      
                      <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        inputDelay={0.5}
                      />
                      
                      <InputField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        inputDelay={0.6}
                      />
                      
                      <Button isLoading={isLoading} delay={0.7}>
                        Create Account
                      </Button>
                    </>
                  )}

                  <div className="mt-8">
                    <motion.div
                      className="relative flex items-center my-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex-grow border-t border-gray-700/50"></div>
                      <span className="flex-shrink px-4 text-gray-400 text-sm">or continue with</span>
                      <div className="flex-grow border-t border-gray-700/50"></div>
                    </motion.div>
                    
                    <SocialButton 
                      icon={<FaGoogle className="text-lg text-red-400" />} 
                      delay={0.7}
                      onClick={() => console.log('Google login')}
                    >
                      Continue with Google
                    </SocialButton>
                    
                    <SocialButton 
                      icon={<FaGoogle className="text-xl text-orange-400" />} 
                      delay={0.8}
                      variant="metamask"
                      onClick={connectMetaMask}
                    >
                      {isMetaMaskConnected 
                        ? `Connected: ${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` 
                        : 'Connect MetaMask'}
                      
                      {isMetaMaskConnected && (
                        <motion.span 
                          className="ml-2 text-xs bg-gradient-to-r from-blue-900/60 to-blue-800/30 rounded-full px-3 py-1 border border-blue-500/50 shadow-sm shadow-blue-500/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                        >
                          Web3 Verified
                        </motion.span>
                      )}
                    </SocialButton>
                    
                    <motion.div 
                      className="text-center mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <motion.button 
                        type="button" 
                        onClick={toggleAuthMode}
                        className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center"
                        whileHover={{ 
                          scale: 1.03,
                          textShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
                        }}
                      >
                        {authMode === 'login' 
                          ? "Don't have an account? Sign up" 
                          : "Already have an account? Log in"}
                        <svg className="w-3 h-3 ml-1 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  </div>
                </form>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
          {/* Footer branding */}
          <motion.div
            className="text-center mt-6 text-gray-500 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1 }}
          >
            © 2025 EduStake | Learn and Earn with Web3
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}