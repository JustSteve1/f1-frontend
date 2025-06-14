import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flag, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onSignInClick?: () => void;
  onSignUpClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignInClick, onSignUpClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Flag className="h-8 w-8 text-red-500" />
            <span className="text-white font-bold text-xl">F1 Dashboard</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white hover:text-red-400 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-white hover:text-red-400 transition-colors">
              Testimonials
            </a>
            <a href="#schedule" className="text-white hover:text-red-400 transition-colors">
              Schedule
            </a>
            <a href="#faq" className="text-white hover:text-red-400 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-white" />
                  <span className="text-white text-sm">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-white hover:text-red-400 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onSignInClick}
                  className="text-white hover:text-red-400 transition-colors"
                >
                  Sign In
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSignUpClick}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Sign Up
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-red-500/20"
          >
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-white hover:text-red-400 transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-white hover:text-red-400 transition-colors">
                Testimonials
              </a>
              <a href="#schedule" className="text-white hover:text-red-400 transition-colors">
                Schedule
              </a>
              <a href="#faq" className="text-white hover:text-red-400 transition-colors">
                FAQ
              </a>
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t border-red-500/20">
                  <span className="text-white text-sm">{user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="text-left text-white hover:text-red-400 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-red-500/20">
                  <button
                    onClick={onSignInClick}
                    className="text-left text-white hover:text-red-400 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={onSignUpClick}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-center"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;