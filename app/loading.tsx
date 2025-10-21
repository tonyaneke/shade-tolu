"use client";

import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50 z-50">
      <div className="text-center">
        {/* Animated Logo/Heart with Gradient */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-6 relative"
        >
          <div className="relative w-20 h-20 mx-auto">
            <motion.svg
              className="w-20 h-20 text-rose-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>
            {/* Glow effect */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full blur-2xl -z-10"
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 font-playfair-display-sc"
        >
          Shade & Tolu
        </motion.h2>

        {/* Loading Dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
