import React from 'react';
import { Trophy, Zap, Timer, Flag } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Flag className="h-8 w-8 text-red-500" />
              <span className="text-white font-bold text-xl">F1 Project</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-red-400 transition-colors">Home</a>
              <a href="#" className="text-white hover:text-red-400 transition-colors">Races</a>
              <a href="#" className="text-white hover:text-red-400 transition-colors">Drivers</a>
              <a href="#" className="text-white hover:text-red-400 transition-colors">Teams</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              F1 PROJECT
              <span className="block text-4xl md:text-6xl text-red-500 mt-2">
                HOME-PAGE
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the thrill of Formula 1 racing with cutting-edge technology and real-time data analytics
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25">
                Start Racing
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Racing stripe decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Features Section */}
      <div className="bg-black/50 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Racing Excellence
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-8 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group">
              <div className="bg-red-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Championship Data</h3>
              <p className="text-gray-400 leading-relaxed">
                Real-time championship standings, driver statistics, and team performance analytics
              </p>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group">
              <div className="bg-red-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Timer className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Live Timing</h3>
              <p className="text-gray-400 leading-relaxed">
                Precision timing data, lap analysis, and sector-by-sector performance tracking
              </p>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group">
              <div className="bg-red-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">High Performance</h3>
              <p className="text-gray-400 leading-relaxed">
                Lightning-fast data processing and analysis for competitive advantage
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-red-500/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Flag className="h-6 w-6 text-red-500" />
            <span className="text-white font-bold text-lg">F1 Project</span>
          </div>
          <p className="text-gray-400">
            Built for the Bolt Hackathon • Racing towards innovation
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;