import React from "react";
import { Sparkles, PenSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useParallax } from "../hooks/useParallax";

export default function Hero() {
  const parallaxOffset = useParallax(0.5);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where Great{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Ideas
            </span>{" "}
            <br /> Come to Life
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join our community of innovators and thought leaders. Share your
            ideas, discover new perspectives, and collaborate on the next big
            thing.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="group px-8 py-4 rounded-xl bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white transition-all border border-white/10 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:text-purple-400" />
              Discover Ideas
            </motion.button>
            <motion.button
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PenSquare className="mr-2 h-5 w-5" />
              Post New Idea
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
