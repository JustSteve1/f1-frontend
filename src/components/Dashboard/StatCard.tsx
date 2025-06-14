import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Zap, MessageSquare } from 'lucide-react';
import { StatCard as StatCardType } from '../../types';

interface StatCardProps {
  stat: StatCardType;
  onPrompt: (prompt: string) => void;
}

const StatCard: React.FC<StatCardProps> = ({ stat, onPrompt }) => {
  const getIcon = () => {
    switch (stat.category) {
      case 'timing':
        return <Clock className="h-5 w-5" />;
      case 'position':
        return <TrendingUp className="h-5 w-5" />;
      case 'telemetry':
        return <Zap className="h-5 w-5" />;
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getCategoryColor = () => {
    switch (stat.category) {
      case 'timing':
        return 'text-blue-400 bg-blue-400/10';
      case 'position':
        return 'text-green-400 bg-green-400/10';
      case 'telemetry':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'weather':
        return 'text-purple-400 bg-purple-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const presetPrompts = [
    'Tell me more about this',
    'Compare with other drivers',
    'Show historical data',
    'Explain the significance'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 mb-4"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getCategoryColor()}`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="text-white font-semibold">{stat.title}</h3>
            <p className="text-gray-400 text-sm">{stat.timestamp}</p>
          </div>
        </div>
        {stat.driver && (
          <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm">
            {stat.driver}
          </span>
        )}
      </div>

      <div className="text-gray-300 mb-4">
        {stat.type === 'text' && <p>{stat.content}</p>}
        {stat.type === 'chart' && (
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-gray-400">Chart visualization would appear here</p>
            <p className="text-white mt-2">{stat.content}</p>
          </div>
        )}
        {stat.type === 'image' && (
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-gray-400">Image would appear here</p>
            <p className="text-white mt-2">{stat.content}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {presetPrompts.map((prompt, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPrompt(prompt)}
            className="bg-gray-800/50 hover:bg-red-600/20 text-gray-300 hover:text-red-400 px-3 py-1 rounded-full text-sm transition-colors border border-gray-600 hover:border-red-500/50"
          >
            {prompt}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default StatCard;