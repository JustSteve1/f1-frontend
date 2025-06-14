import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Timer, Flag, Star, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const HomePage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: Trophy,
      title: 'Real-time Race Data',
      description: 'Live timing, positions, and championship standings updated in real-time during races.'
    },
    {
      icon: Timer,
      title: 'Advanced Analytics',
      description: 'Deep insights into driver performance, sector times, and strategic decisions.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Insights',
      description: 'Get intelligent analysis and predictions powered by machine learning.'
    }
  ];

  const testimonials = [
    {
      name: 'Alex Rodriguez',
      role: 'F1 Enthusiast',
      content: 'This app completely transformed how I watch F1 races. The real-time insights are incredible!',
      rating: 5
    },
    {
      name: 'Sarah Chen',
      role: 'Racing Analyst',
      content: 'The data visualization and AI insights help me understand the sport at a much deeper level.',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'Casual Fan',
      content: 'Perfect for someone new to F1. The explanations make everything so much clearer.',
      rating: 5
    }
  ];

  const upcomingRaces = [
    { name: 'Bahrain Grand Prix', date: 'March 2, 2025', circuit: 'Bahrain International Circuit' },
    { name: 'Saudi Arabian Grand Prix', date: 'March 9, 2025', circuit: 'Jeddah Corniche Circuit' },
    { name: 'Australian Grand Prix', date: 'March 30, 2025', circuit: 'Albert Park Circuit' },
  ];

  const faqs = [
    {
      question: 'What is F1 Dashboard?',
      answer: 'F1 Dashboard is a second-screen companion app that enhances your Formula 1 viewing experience with real-time data, AI-powered insights, and interactive features.'
    },
    {
      question: 'How does the real-time data work?',
      answer: 'Our app connects to official F1 timing feeds to provide live race data, including lap times, positions, pit stops, and telemetry information.'
    },
    {
      question: 'Can I use this during live races?',
      answer: 'Absolutely! The app is designed to be used alongside live race broadcasts, providing additional context and insights as the race unfolds.'
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Yes, our web app is fully responsive and works perfectly on mobile devices. Native mobile apps are coming soon!'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black">
      {/* Hero Section */}
      <section className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              F1 DASHBOARD
              <span className="block text-3xl md:text-5xl text-red-500 mt-2">
                Second Screen Experience
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Enhance your Formula 1 viewing with real-time data, AI-powered insights, and interactive features that bring you closer to the action.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25"
              >
                Explore Features
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                View Schedule
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300">Everything you need for the ultimate F1 experience</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gray-900/50 p-8 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group"
                >
                  <div className="bg-red-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-300">Join thousands of F1 fans who love our platform</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-900/50 p-6 rounded-xl border border-red-500/20"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Race Schedule Section */}
      <section id="schedule" className="py-20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Upcoming Races</h2>
            <p className="text-xl text-gray-300">Don't miss any of the action this season</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingRaces.map((race, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 p-6 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 text-red-500 mr-3" />
                  <span className="text-red-400 font-semibold">{race.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{race.name}</h3>
                <p className="text-gray-400">{race.circuit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Everything you need to know about F1 Dashboard</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 rounded-xl border border-red-500/20 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                >
                  <span className="text-white font-semibold">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-red-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-red-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-300">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-500/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Flag className="h-6 w-6 text-red-500" />
            <span className="text-white font-bold text-lg">F1 Dashboard</span>
          </div>
          <p className="text-gray-400">
            Built for F1 fans • Racing towards innovation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;