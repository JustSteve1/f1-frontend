import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Chrome } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSwitchToSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [favoriteDrivers, setFavoriteDrivers] = useState<string[]>([]);
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const { signUp } = useAuth();

  const drivers = ['Max Verstappen', 'Lewis Hamilton', 'Charles Leclerc', 'Lando Norris', 'George Russell'];
  const teams = ['Red Bull Racing', 'Mercedes', 'Ferrari', 'McLaren', 'Aston Martin'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, {
        name,
        favorite_drivers: favoriteDrivers,
        favorite_teams: favoriteTeams
      });
      onClose();
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDriver = (driver: string) => {
    setFavoriteDrivers(prev => 
      prev.includes(driver) 
        ? prev.filter(d => d !== driver)
        : [...prev, driver]
    );
  };

  const toggleTeam = (team: string) => {
    setFavoriteTeams(prev => 
      prev.includes(team) 
        ? prev.filter(t => t !== team)
        : [...prev, team]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-2xl p-8 w-full max-w-md border border-red-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {step === 1 ? 'Create Account' : 'Personalize Your Experience'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                <>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center space-x-3 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <Chrome className="h-5 w-5" />
                    <span>Continue with Google</span>
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-900 text-gray-400">or</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                          placeholder="Create a password"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Favorite Drivers</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {drivers.map((driver) => (
                        <button
                          key={driver}
                          type="button"
                          onClick={() => toggleDriver(driver)}
                          className={`p-3 rounded-lg border transition-colors text-left ${
                            favoriteDrivers.includes(driver)
                              ? 'bg-red-600 border-red-500 text-white'
                              : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-red-500'
                          }`}
                        >
                          {driver}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Favorite Teams</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {teams.map((team) => (
                        <button
                          key={team}
                          type="button"
                          onClick={() => toggleTeam(team)}
                          className={`p-3 rounded-lg border transition-colors text-left ${
                            favoriteTeams.includes(team)
                              ? 'bg-red-600 border-red-500 text-white'
                              : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-red-500'
                          }`}
                        >
                          {team}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : step === 1 ? 'Continue' : 'Create Account'}
              </motion.button>
            </form>

            {step === 1 && (
              <p className="mt-6 text-center text-gray-400">
                Already have an account?{' '}
                <button
                  onClick={onSwitchToSignIn}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  Sign in
                </button>
              </p>
            )}

            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="mt-4 text-center w-full text-gray-400 hover:text-white transition-colors"
              >
                Back
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignUpModal;