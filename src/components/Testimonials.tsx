import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    content: "IdeaShare has transformed how I collaborate with others. The platform's intuitive design and supportive community make sharing ideas a breeze.",
    author: "Sarah Johnson",
    role: "Product Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    content: "The feedback I've received on my ideas has been invaluable. This platform truly fosters innovation and creative thinking.",
    author: "Michael Chen",
    role: "Tech Entrepreneur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
  },
  {
    content: "As an innovator, finding the right platform to share ideas is crucial. IdeaShare exceeds all expectations with its amazing community.",
    author: "Emily Rodriguez",
    role: "Innovation Consultant",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
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
            Join thousands of satisfied users who have found success on our platform.
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