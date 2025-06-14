import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Heart, Users, Edit3, Save, X } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'F1 Enthusiast',
    email: 'fan@f1dashboard.com',
    favorite_drivers: ['Max Verstappen', 'Lewis Hamilton'],
    favorite_teams: ['Red Bull Racing', 'Mercedes'],
    created_at: '2024-01-15'
  });

  const [editedUser, setEditedUser] = useState(userData);

  const drivers = ['Max Verstappen', 'Lewis Hamilton', 'Charles Leclerc', 'Lando Norris', 'George Russell', 'Carlos Sainz', 'Sergio Perez', 'Fernando Alonso'];
  const teams = ['Red Bull Racing', 'Mercedes', 'Ferrari', 'McLaren', 'Aston Martin', 'Alpine', 'Williams', 'AlphaTauri'];

  const handleSave = () => {
    setUserData(editedUser);
    setIsEditing(false);
  };

  const toggleDriver = (driver: string) => {
    setEditedUser(prev => ({
      ...prev,
      favorite_drivers: prev.favorite_drivers.includes(driver)
        ? prev.favorite_drivers.filter(d => d !== driver)
        : [...prev.favorite_drivers, driver]
    }));
  };

  const toggleTeam = (team: string) => {
    setEditedUser(prev => ({
      ...prev,
      favorite_teams: prev.favorite_teams.includes(team)
        ? prev.favorite_teams.filter(t => t !== team)
        : [...prev.favorite_teams, team]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black pt-16 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {userData.name}
                </h1>
                <p className="text-gray-400">Member since {new Date(userData.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors"
                  >
                    <Save className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setEditedUser(userData);
                      setIsEditing(false);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-colors"
                >
                  <Edit3 className="h-5 w-5" />
                </motion.button>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="inline h-4 w-4 mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    />
                  ) : (
                    <p className="text-white bg-gray-800/50 rounded-lg px-4 py-3">
                      {userData.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="inline h-4 w-4 mr-2" />
                    Email
                  </label>
                  <p className="text-white bg-gray-800/50 rounded-lg px-4 py-3">
                    {userData.email}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Member Since
                  </label>
                  <p className="text-white bg-gray-800/50 rounded-lg px-4 py-3">
                    {new Date(userData.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Preferences</h2>
              
              {/* Favorite Drivers */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  <Heart className="inline h-4 w-4 mr-2" />
                  Favorite Drivers
                </label>
                {isEditing ? (
                  <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                    {drivers.map((driver) => (
                      <button
                        key={driver}
                        onClick={() => toggleDriver(driver)}
                        className={`p-3 rounded-lg border transition-colors text-left ${
                          editedUser.favorite_drivers.includes(driver)
                            ? 'bg-red-600 border-red-500 text-white'
                            : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-red-500'
                        }`}
                      >
                        {driver}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {userData.favorite_drivers.length > 0 ? (
                      userData.favorite_drivers.map((driver) => (
                        <div key={driver} className="bg-red-600/20 text-red-400 px-3 py-2 rounded-lg">
                          {driver}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 italic">No favorite drivers selected</p>
                    )}
                  </div>
                )}
              </div>

              {/* Favorite Teams */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  <Users className="inline h-4 w-4 mr-2" />
                  Favorite Teams
                </label>
                {isEditing ? (
                  <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                    {teams.map((team) => (
                      <button
                        key={team}
                        onClick={() => toggleTeam(team)}
                        className={`p-3 rounded-lg border transition-colors text-left ${
                          editedUser.favorite_teams.includes(team)
                            ? 'bg-red-600 border-red-500 text-white'
                            : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-red-500'
                        }`}
                      >
                        {team}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {userData.favorite_teams.length > 0 ? (
                      userData.favorite_teams.map((team) => (
                        <div key={team} className="bg-red-600/20 text-red-400 px-3 py-2 rounded-lg">
                          {team}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 italic">No favorite teams selected</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;