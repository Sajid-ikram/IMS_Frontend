import React from 'react';
import { Brain, Users, Zap, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Brain,
    title: 'Centralized Idea Hub',
    description: 'Capture and organize innovative ideas from employees across 20 offices worldwide.'
  },
  {
    icon: Users,
    title: 'Global Collaboration',
    description: 'Bridge regional and cultural gaps to foster teamwork and cross-regional innovation.'
  },
  {
    icon: Zap,
    title: 'Streamlined Evaluation',
    description: 'Leverage AI-powered tools to efficiently filter, prioritize, and develop high-potential ideas.'
  },
  {
    icon: Trophy,
    title: 'Incentives & Recognition',
    description: 'Encourage contributions through team-based rewards and recognition for collaborative success.'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Features() {
  return (
    <div className="bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">About IMS-System?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
          Discover the features that transformed GreenFuture's innovation process, enabling global collaboration and renewed creativity.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all"
              variants={item}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <feature.icon className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}