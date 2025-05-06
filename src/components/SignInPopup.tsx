import React, { useState } from 'react';
import { X } from 'lucide-react';
import { signIn, signUp } from '../lib/firebase';

interface SignInPopupProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onSignIn: () => void;
}

export default function SignInPopup({ isOpen, onClose, isDarkMode, onSignIn }: SignInPopupProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (pass: string) => {
    const hasLetter = /[a-zA-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pass);
    const isLongEnough = pass.length >= 8;

    if (!isLongEnough) {
      return "Password must be at least 8 characters long";
    }
    if (!hasLetter || !hasNumber) {
      return "Password must contain at least one letter and one number";
    }
    if (hasSpecial) {
      return "Password cannot contain special characters";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignIn) {
        if (!email || !password) {
          throw new Error('Please fill in all fields');
        }
        await signIn(email, password);
      } else {
        if (!username || !email || !password || !confirmPassword) {
          throw new Error('Please fill in all fields');
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
          throw new Error(passwordError);
        }

        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }

        await signUp(email, password, username);
      }

      onSignIn();
      onClose();
      
      // Reset form
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl p-8 w-full max-w-md relative shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors ${
            isDarkMode 
              ? 'text-white hover:bg-gray-700' 
              : 'text-gray-800 hover:bg-gray-100'
          }`}
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {isSignIn ? 'Sign In' : 'Create Account'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 text-red-500 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <div>
              <label 
                htmlFor="username" 
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                placeholder="Choose a username"
                disabled={isLoading}
              />
            </div>
          )}

          <div>
            <label 
              htmlFor="email" 
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>

          {!isSignIn && (
            <div>
              <label 
                htmlFor="confirmPassword" 
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-[#1875c7]`}
                placeholder="Confirm your password"
                disabled={isLoading}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#1875c7] text-white py-2 rounded-lg transition-colors ${
              isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-[#145fa3]'
            }`}
          >
            {isLoading 
              ? 'Loading...' 
              : isSignIn ? 'Sign In' : 'Create Account'
            }
          </button>
        </form>

        <button
          onClick={() => {
            setIsSignIn(!isSignIn);
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setError('');
          }}
          disabled={isLoading}
          className={`mt-4 text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          } hover:text-[#1875c7] transition-colors`}
        >
          {isSignIn ? 'Not a Member? Sign up here.' : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  );
}