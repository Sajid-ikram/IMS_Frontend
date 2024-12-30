import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    content: "IMS-Connect has revolutionized the way we harness creativity across our global teams. The platform makes it easy to share, develop, and track ideas from anywhere.",
    author: "Emma Williams",
    role: "Sustainability Manager, GreenFuture",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
  },
  {
    content: "The collaborative tools have been a game changer. By connecting with colleagues across regions, we developed breakthrough solutions that wouldn’t have been possible otherwise.",
    author: "James Patel",
    role: "Urban Planner, GreenFuture",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80"
  },
  {
    content: "IMS-Connect has bridged the gap between offices and regions, giving everyone a voice in the innovation process. It’s more than a tool—it’s a cultural shift.",
    author: "Sophia Lin",
    role: "Environmental Analyst, GreenFuture",
    image: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&q=80"
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

export default function Testimonials() {
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
          <h2 className="text-3xl font-bold text-white mb-4">What Our Users Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
          Join innovators from around the globe who are transforming ideas into impactful solutions with IMS-Connect.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
              variants={item}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <p className="text-gray-300 mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <motion.img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="ml-4">
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}