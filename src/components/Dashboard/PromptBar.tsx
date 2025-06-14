import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Filter } from 'lucide-react';

interface PromptBarProps {
  onSendPrompt: (prompt: string) => void;
  onToggleFilter: () => void;
}

const PromptBar: React.FC<PromptBarProps> = ({ onSendPrompt, onToggleFilter }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSendPrompt(prompt);
      setPrompt('');
    }
  };

  const presetPrompts = [
    "Who's the fastest driver right now?",
    "Show me Verstappen's sector times",
    "What's the weather like?",
    "Current championship standings"
  ];

  return (
    <div className="sticky bottom-0 bg-gray-900/90 backdrop-blur-md border-t border-red-500/20 p-4">
      {/* Preset Prompts */}
      <div className="flex flex-wrap gap-2 mb-4">
        {presetPrompts.map((presetPrompt, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSendPrompt(presetPrompt)}
            className="bg-gray-800/50 hover:bg-red-600/20 text-gray-300 hover:text-red-400 px-3 py-2 rounded-lg text-sm transition-colors border border-gray-600 hover:border-red-500/50"
          >
            {presetPrompt}
          </motion.button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <button
          type="button"
          onClick={onToggleFilter}
          className="p-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors"
        >
          <Filter className="h-5 w-5" />
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask about race data, drivers, or teams..."
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
          />
        </div>

        <button
          type="button"
          className="p-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors"
        >
          <Mic className="h-5 w-5" />
        </button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!prompt.trim()}
          className="p-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </motion.button>
      </form>
    </div>
  );
};

export default PromptBar;