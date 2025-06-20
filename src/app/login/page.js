'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { SiMetamask } from 'react-icons/si';
import {
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../auth";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';

const provider = new GoogleAuthProvider();

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
  const router = useRouter();
  const { user } = useAuth();

   useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              router.push('/profile');
            }
          });
          return () => unsubscribe();
        }, [user, router]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle SignIn/SignUp with Google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/profile');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
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

    try {
      if (authMode === 'login') {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setIsLoading(false);
        toast.success("✅ Logged in successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            })
      } else {
        const userCredential =await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        user.displayName = formData.name;

        // Update the user's profile with their full name
        await updateProfile(user, { displayName: formData.name });
        setIsLoading(false);
        toast.success("🎉 Registration successful!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
      }
    } catch (error) {
      console.log(error.message);
    }

    
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
                      onClick={handleGoogleSignIn}
                    >
                      Continue with Google
                    </SocialButton>
                    
                    {/* For Future if we want connect to metamask in login/signup page */}
                    {/* <SocialButton 
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
                    </SocialButton> */}
                    
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
                          ? (<><span className='text-white'>{"Don't have an account? "}</span>{"  Sign up"}</>) 
                          : (<><span className='text-white'>Already have an account?</span>{"  Log in"}</>)}
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
        </motion.div>
      </div>
    </>
  );
}