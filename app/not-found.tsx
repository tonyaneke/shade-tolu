"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Home, Heart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FAFAFA] to-white px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Text */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 font-playfair-display-sc">
            404
          </h1>
        </motion.div>

        {/* Heart Icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-6"
        >
          <Heart className="w-16 h-16 mx-auto text-amber-500 fill-amber-500" />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-playfair-display-sc">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Oops! Looks like this page got lost on the way to the wedding. Let's
            get you back to celebrate with us!
          </p>

          {/* Back Home Button */}
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Back to Wedding
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center gap-2"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="w-2 h-2 rounded-full bg-amber-400"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}











