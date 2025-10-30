"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 z-50 overflow-hidden">
      {/* Ambient Background Animation */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-br from-amber-200/20 via-yellow-200/20 to-amber-300/20 blur-3xl"
      />

      <div className="relative flex items-center justify-center">
        {/* Logo - Coming from top */}
        <motion.div
          initial={{ y: -200, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.2,
          }}
          className="absolute -top-32 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
          {/* Glow effect for logo */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 bg-gradient-to-br from-amber-300 to-yellow-300 rounded-full blur-3xl -z-10"
          />
        </motion.div>

        {/* Main Content Container */}
        <div
          className="flex items-center gap-4 text-center"
          style={{ fontFamily: "var(--font-tangerine)" }}
        >
          {/* "Shade" - Coming from left */}
          <motion.div
            initial={{ x: -300, opacity: 0, rotate: -45 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.5,
            }}
          >
            <motion.h1
              animate={{
                textShadow: [
                  "0 0 20px rgba(217, 119, 6, 0.3)",
                  "0 0 40px rgba(217, 119, 6, 0.5)",
                  "0 0 20px rgba(217, 119, 6, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent"
            >
              Shade
            </motion.h1>
          </motion.div>

          {/* "&" - Coming from bottom */}
          <motion.div
            initial={{ y: 300, opacity: 0, scale: 0, rotate: 180 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 1.3,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.8,
            }}
            className="relative"
          >
            <motion.span
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-7xl md:text-8xl font-bold bg-gradient-to-br from-yellow-500 via-amber-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg"
            >
              &
            </motion.span>
            {/* Sparkle effect */}
            <motion.div
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1.5,
              }}
              className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full blur-sm"
            />
            <motion.div
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1.8,
              }}
              className="absolute -bottom-2 -left-2 w-3 h-3 bg-amber-400 rounded-full blur-sm"
            />
          </motion.div>

          {/* "Tolu" - Coming from right */}
          <motion.div
            initial={{ x: 300, opacity: 0, rotate: 45 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.5,
            }}
          >
            <motion.h1
              animate={{
                textShadow: [
                  "0 0 20px rgba(180, 83, 9, 0.3)",
                  "0 0 40px rgba(180, 83, 9, 0.5)",
                  "0 0 20px rgba(180, 83, 9, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 bg-clip-text text-transparent"
            >
              Tolu
            </motion.h1>
          </motion.div>
        </div>

        {/* Subtitle - Fading in after everything */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.8,
          }}
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        >
          <p className="text-lg md:text-xl text-gray-600 font-playfair-display-sc tracking-wide">
            Loading your invitation...
          </p>
          {/* Loading dots */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-2 h-2 bg-gradient-to-br from-amber-300 to-yellow-300 rounded-full blur-sm"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
