"use client";

import { FC } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export const TributePage: FC = () => {
  return (
    <section className="min-h-screen py-24 px-6 bg-gradient-to-b from-white via-amber-50/20 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-gradient-to-tl from-amber-100 to-yellow-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            In Loving Memory
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content */}
        <div className="lg:flex lg:gap-12 lg:items-start">
          {/* Image Container - Left on large screens */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-5/12 mb-8 lg:mb-0 lg:sticky lg:top-32"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-200">
              <Image
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop"
                alt="Mother of the Bride"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>

          {/* Text Content - Right on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-7/12 space-y-8"
          >
            {/* Name and Details */}
            <div className="text-center lg:text-left">
              <h2
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-tangerine)" }}
              >
                [Mother's Name]
              </h2>
              <p className="text-xl text-gray-600 italic">
                [Birth Year] - [Year]
              </p>
            </div>

            {/* Tribute Text */}
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Today, as we celebrate this beautiful union, we hold in our
                hearts the memory of a woman whose love, grace, and strength
                shaped the person standing at the altar. Though she cannot be
                here in person, her spirit surrounds us, woven into every moment
                of joy and every tear of happiness.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                She taught us that love is patient, that kindness is strength,
                and that family is everything. Her wisdom echoes in the laughter
                we share, in the traditions we honor, and in the bonds that
                bring us together today.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                Her hands may not hold ours, but her love lifts us. Her voice
                may be silent, but her words guide us. Her presence may be
                missed, but her legacy lives on in every gesture of love, every
                act of compassion, and every moment we choose to celebrate life
                fully.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                As we witness this sacred commitment, we honor her memory by
                living as she taught us—with open hearts, unwavering faith, and
                boundless love. She would be so proud to see this day, and
                though distance separates us, love transcends all boundaries.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="pt-4 border-t-2 border-amber-200"
              >
                <p className="text-center lg:text-left italic text-gray-600">
                  "Those we love don't go away, they walk beside us every day.
                  Unseen, unheard, but always near, still loved, still missed,
                  and very dear."
                </p>
              </motion.div>
            </div>

            {/* Closing Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="mt-12 p-8 bg-white border border-amber-200/30 rounded-3xl shadow-sm"
            >
              <p
                className="text-2xl md:text-3xl text-center text-gray-800 mb-4"
                style={{ fontFamily: "var(--font-tangerine)" }}
              >
                Forever in our hearts
              </p>
              <p className="text-center text-gray-600">
                This day is dedicated to her memory, celebrated in her honor,
                and lived in the way she showed us—with grace, with love, and
                with gratitude for every precious moment.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
