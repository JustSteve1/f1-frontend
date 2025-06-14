import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/Dashboard/StatCard';
import PromptBar from '../components/Dashboard/PromptBar';
import FilterPanel from '../components/Dashboard/FilterPanel';
import { StatCard as StatCardType } from '../types';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<StatCardType[]>([]);
  const [filters, setFilters] = useState({
    drivers: [],
    teams: [],
    categories: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock data generator
  const generateMockStat = (): StatCardType => {
    const types: StatCardType['type'][] = ['text', 'chart', 'image'];
    const categories: StatCardType['category'][] = ['timing', 'position', 'telemetry', 'weather', 'general'];

    const mockStats = [
      {
        title: 'Fastest Lap Alert',
        content: 'Max Verstappen sets fastest lap with 1:31.456 - 0.3s faster than previous best!',
        category: 'timing' as const,
        driver: 'Max Verstappen'
      },
      {
        title: 'Position Change',
        content: 'Hamilton overtakes Leclerc for P2! Brilliant move at Turn 3.',
        category: 'position' as const,
        driver: 'Lewis Hamilton'
      },
      {
        title: 'Pit Stop Strategy',
        content: 'McLaren calls Norris in for fresh mediums. Undercut attempt in progress.',
        category: 'general' as const,
        driver: 'Lando Norris'
      },
      {
        title: 'Sector Analysis',
        content: 'Verstappen dominates Sector 1 with purple times - 0.2s advantage over the field.',
        category: 'telemetry' as const,
        driver: 'Max Verstappen'
      },
      {
        title: 'Weather Update',
        content: 'Light rain detected at Turn 7. Teams monitoring conditions closely.',
        category: 'weather' as const
      }
    ];

    const randomStat = mockStats[Math.floor(Math.random() * mockStats.length)];
    
    return {
      id: Date.now().toString() + Math.random(),
      type: types[Math.floor(Math.random() * types.length)],
      title: randomStat.title,
      content: randomStat.content,
      timestamp: new Date().toLocaleTimeString(),
      category: randomStat.category,
      driver: randomStat.driver
    };
  };

  // Auto-generate stats
  useEffect(() => {
    const interval = setInterval(() => {
      const newStat = generateMockStat();
      setStats(prev => [...prev, newStat]);
    }, 5000);

    // Generate initial stats
    const initialStats = Array.from({ length: 3 }, () => generateMockStat());
    setStats(initialStats);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when new stats arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [stats]);

  const handlePrompt = (prompt: string) => {
    // Generate a response stat based on the prompt
    const responseStat: StatCardType = {
      id: Date.now().toString(),
      type: 'text',
      title: 'AI Response',
      content: `Based on your query "${prompt}", here's what I found: This is a mock response that would contain relevant F1 data and insights.`,
      timestamp: new Date().toLocaleTimeString(),
      category: 'general'
    };
    
    setStats(prev => [...prev, responseStat]);
  };

  const filteredStats = stats.filter(stat => {
    if (filters.drivers.length > 0 && stat.driver && !filters.drivers.includes(stat.driver)) {
      return false;
    }
    if (filters.categories.length > 0 && !filters.categories.includes(stat.category)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Live Race Dashboard</h1>
            <p className="text-gray-300">
              Real-time F1 data and insights
              {filteredStats.length > 0 && ` • ${filteredStats.length} updates`}
            </p>
          </motion.div>
        </div>

        {/* Stats Feed */}
        <div 
          ref={scrollRef}
          className="pb-32 max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-800"
        >
          {filteredStats.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-lg">
                {filters.drivers.length > 0 || filters.categories.length > 0 
                  ? 'No stats match your current filters. Try adjusting your filters or ask a question below.'
                  : 'Waiting for race data... Ask a question to get started!'
                }
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredStats.map((stat) => (
                <StatCard
                  key={stat.id}
                  stat={stat}
                  onPrompt={handlePrompt}
                />
              ))}
            </div>
          )}
        </div>

        {/* Prompt Bar */}
        <PromptBar
          onSendPrompt={handlePrompt}
          onToggleFilter={() => setShowFilters(true)}
        />

        {/* Filter Panel */}
        <FilterPanel
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>
    </div>
  );
};

export default DashboardPage;