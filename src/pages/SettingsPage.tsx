import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, User, Smartphone, Mail, Lock, Trash2, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: {
      raceStart: true,
      fastestLap: true,
      positionChanges: true,
      weatherUpdates: false,
      email: true,
      push: true
    },
    privacy: {
      profileVisible: true,
      shareData: false,
      analytics: true
    }
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const updatePrivacySetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (value: boolean) => void }> = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-red-600' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please sign in to access settings</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black pt-16 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-400">Manage your account and preferences</p>
          </div>

          {/* Account Information */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Account Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  <Mail className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Password</p>
                  <p className="text-gray-400 text-sm">Last updated 30 days ago</p>
                </div>
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  <Lock className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Race Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Race Start Alerts</p>
                      <p className="text-gray-400 text-sm">Get notified when races begin</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.notifications.raceStart}
                      onChange={(value) => updateNotificationSetting('raceStart', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Fastest Lap Updates</p>
                      <p className="text-gray-400 text-sm">Notifications for new fastest laps</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.notifications.fastestLap}
                      onChange={(value) => updateNotificationSetting('fastestLap', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Position Changes</p>
                      <p className="text-gray-400 text-sm">Alerts for overtakes and position swaps</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.notifications.positionChanges}
                      onChange={(value) => updateNotificationSetting('positionChanges', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Weather Updates</p>
                      <p className="text-gray-400 text-sm">Track condition and weather changes</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.notifications.weatherUpdates}
                      onChange={(value) => updateNotificationSetting('weatherUpdates', value)}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-medium text-white mb-4">Delivery Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-white">Email Notifications</p>
                        <p className="text-gray-400 text-sm">Receive updates via email</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.notifications.email}
                      onChange={(value) => updateNotificationSetting('email', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Smartphone className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-white">Push Notifications</p>
                        <p className="text-gray-400 text-sm">Real-time browser notifications</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.notifications.push}
                      onChange={(value) => updateNotificationSetting('push', value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Privacy & Security
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Profile Visibility</p>
                  <p className="text-gray-400 text-sm">Make your profile visible to other users</p>
                </div>
                <ToggleSwitch
                  enabled={settings.privacy.profileVisible}
                  onChange={(value) => updatePrivacySetting('profileVisible', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Data Sharing</p>
                  <p className="text-gray-400 text-sm">Share anonymized data for improvements</p>
                </div>
                <ToggleSwitch
                  enabled={settings.privacy.shareData}
                  onChange={(value) => updatePrivacySetting('shareData', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Analytics</p>
                  <p className="text-gray-400 text-sm">Help us improve with usage analytics</p>
                </div>
                <ToggleSwitch
                  enabled={settings.privacy.analytics}
                  onChange={(value) => updatePrivacySetting('analytics', value)}
                />
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Danger Zone</h2>
            
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignOut}
                className="w-full flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors"
              >
                <Trash2 className="h-5 w-5" />
                <span>Delete Account</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;