"use client";
import { motion } from "framer-motion";

export default function ProductCard() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-4 relative">
      
      {/* Soft background gradients */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-500/15 rounded-full filter blur-[120px] animate-pulse"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-500/15 rounded-full filter blur-[120px] animate-pulse"
        />
      </div>

      {/* Centered Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4 z-10"
      >
        <h1 className="text-4xl sm:text-6xl font-bold text-white">Templates Coming Soon</h1>
        <p className="text-zinc-400 text-lg">We are working hard to launch stunning templates for your projects. Stay tuned!</p>
      </motion.div>
    </div>
  );
}
