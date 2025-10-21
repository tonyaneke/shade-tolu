"use client";

import { FC } from "react";
import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";

interface AccessCardProps {
  name: string;
  accessCode: string;
}

export const AccessCard: FC<AccessCardProps> = ({ name, accessCode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 border-2 border-green-200 rounded-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <Check className="w-6 h-6 text-green-600" />
          </motion.div>
          <p className="text-green-700 font-semibold text-lg">
            RSVP Confirmed! Thank you! 🎉
          </p>
        </div>
      </motion.div>

      {/* Access Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        {/* Card Container */}
        <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-pink-50 rounded-[2.5rem] p-1 shadow-2xl">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-500 to-pink-400 rounded-[2.5rem] opacity-60 blur-xl"></div>

          {/* Card Content */}
          <div className="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-10 border-2 border-amber-200/60">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-200/30 to-transparent rounded-bl-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-tr-[100px]"></div>

            {/* Card Header */}
            <div className="text-center mb-8 relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="inline-flex items-center gap-2 mb-4"
              >
                <Sparkles className="w-6 h-6 text-amber-500" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent">
                  Wedding Access Card
                </h3>
                <Sparkles className="w-6 h-6 text-amber-500" />
              </motion.div>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full"></div>
            </div>

            {/* Card Details */}
            <div className="space-y-6 relative z-10">
              {/* Guest Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-between items-center pb-4 border-b-2 border-amber-100"
              >
                <span className="text-sm font-semibold text-amber-800 uppercase tracking-wider">
                  Guest Name
                </span>
                <span className="text-lg font-bold text-gray-800">{name}</span>
              </motion.div>

              {/* Event Details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex justify-between items-center pb-4 border-b-2 border-amber-100"
              >
                <span className="text-sm font-semibold text-amber-800 uppercase tracking-wider">
                  Event
                </span>
                <span className="text-base font-semibold text-gray-700">
                  Shade & Tolu's Wedding
                </span>
              </motion.div>

              {/* Access Code */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200"
              >
                <p className="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-3 text-center">
                  Access Code
                </p>
                <div className="text-center">
                  <motion.p
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                    className="text-3xl font-black text-transparent bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text tracking-widest font-mono"
                  >
                    {accessCode}
                  </motion.p>
                </div>
              </motion.div>
            </div>

            {/* Shipping Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 relative z-10"
            >
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl p-4 text-center shadow-lg">
                <p className="text-white font-semibold text-sm flex items-center justify-center gap-2">
                  <span className="text-xl">✨</span>
                  This access card will be shipped to your address
                  <span className="text-xl">✨</span>
                </p>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-6 text-center relative z-10"
            >
              <p className="text-sm text-gray-600 leading-relaxed">
                A confirmation email has been sent to your inbox with all the
                details.
                <br />
                <span className="font-semibold text-gray-700">
                  We can&apos;t wait to celebrate with you! 💕
                </span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Floating Animation */}
        <motion.div
          className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full opacity-20 blur-2xl"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 blur-2xl"
          animate={{
            y: [0, 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};
