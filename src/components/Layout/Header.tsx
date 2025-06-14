import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flag, Menu, X, User, BarChart3, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  onSignInClick?: () => void;
  onSignUpClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignInClick, onSignUpClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const publicNavItems = [
    { label: 'Features', href: '#features' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <Flag className="h-8 w-8 text-red-500" />
            <span className="text-white font-bold text-xl">F1 Dashboard</span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {user ? (
              // Authenticated user navigation
              <>
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.button
                      key={item.path}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => navigate(item.path)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        isActive 
                          ? 'text-red-400 bg-red-500/10' 
                          : 'text-white hover:text-red-400 hover:bg-red-500/5'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </>
            ) : (
              // Public navigation (only on homepage)
              location.pathname === '/' && (
                <>
                  {publicNavItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-white hover:text-red-400 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </>
              )
            )}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg px-3 py-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-medium">
                      {user.name || 'F1 Fan'}
                    </p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignOut}
                  className="text-white hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/5"
                >
                  Sign Out
                </motion.button>
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
              {user ? (
                <>
                  {/* User info */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name || 'F1 Fan'}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  
                  {/* Navigation items */}
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                          isActive 
                            ? 'text-red-400 bg-red-500/10' 
                            : 'text-white hover:text-red-400 hover:bg-red-500/5'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                  
                  <div className="pt-4 border-t border-red-500/20">
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left text-white hover:text-red-400 transition-colors p-3 rounded-lg hover:bg-red-500/5"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Public navigation (only on homepage) */}
                  {location.pathname === '/' && (
                    <>
                      {publicNavItems.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-white hover:text-red-400 transition-colors p-3 rounded-lg hover:bg-red-500/5"
                        >
                          {item.label}
                        </a>
                      ))}
                    </>
                  )}
                  
                  <div className="flex flex-col space-y-2 pt-4 border-t border-red-500/20">
                    <button
                      onClick={() => {
                        onSignInClick?.();
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-white hover:text-red-400 transition-colors p-3 rounded-lg hover:bg-red-500/5"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        onSignUpClick?.();
                        setIsMenuOpen(false);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;