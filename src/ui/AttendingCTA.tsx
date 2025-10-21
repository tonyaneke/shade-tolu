"use client";

import { FC } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export const AttendingCTA: FC = () => {
  return (
    <section className="relative py-12 md:py-16 px-6 overflow-hidden bg-white">
      {/* Background Pattern & Gold Splashes */}
      <div className="absolute inset-0">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #d97706 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Diagonal lines pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #f59e0b 0px,
              #f59e0b 1px,
              transparent 1px,
              transparent 20px
            )`,
          }}
        />

        {/* Gold splashes - organic shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large splash top-left */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-amber-400/20 via-yellow-400/15 to-transparent rounded-full blur-3xl" />

          {/* Medium splash top-right */}
          <div className="absolute top-10 -right-10 w-80 h-80 bg-gradient-to-bl from-amber-300/15 via-yellow-300/10 to-transparent rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-2xl" />

          {/* Large splash bottom-right */}
          <div className="absolute -bottom-20 -right-32 w-[500px] h-96 bg-gradient-to-tl from-amber-500/25 via-yellow-400/15 to-transparent rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl" />

          {/* Medium splash bottom-left */}
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-to-tr from-yellow-400/20 via-amber-300/10 to-transparent rounded-full blur-2xl" />

          {/* Small accent splashes */}
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-xl" />
          <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-gradient-to-bl from-yellow-300/10 to-transparent rounded-[50%_50%_30%_70%] blur-xl" />
        </div>

        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 via-transparent to-yellow-50/30" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-tangerine)" }}
            >
              So, are you coming?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-base md:text-lg text-gray-700 leading-relaxed"
            >
              We'd love to celebrate with you on our special day.
              <br />
              Let us know if you'll be joining us – it only takes a moment.
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/rsvp">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-white text-lg font-bold rounded-full shadow-2xl shadow-amber-500/30 hover:shadow-3xl hover:shadow-amber-500/40 transition-all overflow-hidden"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <span className="relative">RSVP Now</span>
                <CheckCircle2 className="w-6 h-6 relative" strokeWidth={2.5} />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
