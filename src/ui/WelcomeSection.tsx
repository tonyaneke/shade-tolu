"use client";

import { FC } from "react";
import { motion } from "motion/react";
import { Calendar, MapPin } from "lucide-react";

export const WelcomeSection: FC = () => {
  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden bg-white">
      {/* Gold Splashes Background - Clean and Minimalist */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large gold splashes */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-amber-300/20 via-yellow-200/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-gradient-to-tl from-amber-400/15 via-yellow-300/10 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-tr from-yellow-300/20 via-amber-200/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-amber-300/25 via-yellow-200/15 to-transparent rounded-full blur-3xl"></div>

        {/* Small accent splashes */}
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-amber-400/25 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-tl from-yellow-300/20 to-transparent rounded-full blur-2xl"></div>

        {/* Subtle shimmer effect */}
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 right-1/3 w-48 h-48 bg-gradient-to-br from-amber-300/15 to-transparent rounded-full blur-2xl"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-6"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            Welcome to Our Celebration
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-gray-700 text-md md:text-3xl leading-relaxed mb-10 max-w-3xl mx-auto line-clamp-3 md:line-clamp-2"
            // style={{ fontFamily: "var(--font-tangerine)" }}
          >
            We are thrilled to share this special moment with you. Join us as we
            embark on this beautiful journey of love, laughter, and happily ever
            after.
          </motion.p>

          {/* Info Cards */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="flex items-center gap-3 bg-white/40 backdrop-blur-lg px-6 py-4 rounded-[2rem] border-2 border-gray-200/60 hover:border-rose-300/80 shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-[1.5rem] bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600 font-semibold">Date</p>
                <p className="text-gray-900 font-bold">December 26, 2025</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: -1 }}
              className="flex items-center gap-3 bg-white/40 backdrop-blur-lg px-6 py-4 rounded-[2rem] border-2 border-gray-200/60 hover:border-purple-300/80 shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-[1.5rem] bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600 font-semibold">Location</p>
                <p className="text-gray-900 font-bold">Lagos, Nigeria</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
