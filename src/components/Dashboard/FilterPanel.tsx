import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Users, BarChart3, Cloud } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    drivers: string[];
    teams: string[];
    categories: string[];
  };
  onFiltersChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const drivers = ['Max Verstappen', 'Lewis Hamilton', 'Charles Leclerc', 'Lando Norris', 'George Russell'];
  const teams = ['Red Bull Racing', 'Mercedes', 'Ferrari', 'McLaren', 'Aston Martin'];
  const categories = [
    { id: 'timing', label: 'Timing', icon: BarChart3 },
    { id: 'position', label: 'Positions', icon: User },
    { id: 'telemetry', label: 'Telemetry', icon: BarChart3 },
    { id: 'weather', label: 'Weather', icon: Cloud },
  ];

  const toggleFilter = (type: string, value: string) => {
    const newFilters = { ...filters };
    if (newFilters[type as keyof typeof filters].includes(value)) {
      newFilters[type as keyof typeof filters] = newFilters[type as keyof typeof filters].filter(item => item !== value);
    } else {
      newFilters[type as keyof typeof filters] = [...newFilters[type as keyof typeof filters], value];
    }
    onFiltersChange(newFilters);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 border-l border-red-500/20 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Drivers */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Drivers
                  </h3>
                  <div className="space-y-2">
                    {drivers.map((driver) => (
                      <button
                        key={driver}
                        onClick={() => toggleFilter('drivers', driver)}
                        className={`w-full p-3 rounded-lg border transition-colors text-left ${
                          filters.drivers.includes(driver)
                            ? 'bg-red-600 border-red-500 text-white'
                            : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-red-500'
                        }`}
                      >
                        {driver}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Teams */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Teams
                  </h3>
                  <div className="space-y-2">
                    {teams.map((team) => (
                      <button
                        key={team}
                        onClick={() => toggleFilter('teams', team)}
                        className={`w-full p-3 rounded-lg border transition-colors text-left ${
                          filters.teams.includes(team)
                            ? 'bg-red-600 border-red-500 text-white'
                            : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-red-500'
                        }`}
                      >
                        {team}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <button
                          key={category.id}
                          onClick={() => toggleFilter('categories', category.id)}
                          className={`w-full p-3 rounded-lg border transition-colors text-left flex items-center ${
                            filters.categories.includes(category.id)
                              ? 'bg-red-600 border-red-500 text-white'
                              : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-red-500'
                          }`}
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          {category.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <button
                  onClick={() => onFiltersChange({ drivers: [], teams: [], categories: [] })}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;