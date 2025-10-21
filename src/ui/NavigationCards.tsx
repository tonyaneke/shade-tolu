"use client";

import { FC } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Heart, Calendar, MapPin, Gift, Camera, Mail } from "lucide-react";

interface NavigationCard {
  title: string;
  description: string;
  href: string;
  icon: "heart" | "calendar" | "map" | "gift" | "camera" | "mail";
  gradient: string;
}

const navigationCards: NavigationCard[] = [
  {
    title: "Our Love Story",
    description: "Journey through our beautiful timeline together",
    href: "/love-story",
    icon: "heart",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    title: "Wedding Details",
    description: "Event schedule and important information",
    href: "/wedding-details",
    icon: "calendar",
    gradient: "from-amber-400 to-yellow-500",
  },
  {
    title: "Lagos Guide",
    description: "Travel tips and recommendations for your visit",
    href: "/lagos-guide",
    icon: "map",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    title: "Registry & Gifts",
    description: "Your presence is the best gift, but if you wish...",
    href: "/gifts",
    icon: "gift",
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    title: "Photo Gallery",
    description: "Beautiful moments captured in time",
    href: "/gallery",
    icon: "camera",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    title: "RSVP",
    description: "Let us know you'll be joining our celebration",
    href: "/rsvp",
    icon: "mail",
    gradient: "from-orange-400 to-red-500",
  },
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "heart":
      return Heart;
    case "calendar":
      return Calendar;
    case "map":
      return MapPin;
    case "gift":
      return Gift;
    case "camera":
      return Camera;
    case "mail":
      return Mail;
    default:
      return Heart;
  }
};

export const NavigationCards: FC = () => {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent font-playfair-display-sc mb-4">
            Explore Our Wedding
          </h3>
          <div className="relative inline-block">
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full shadow-lg shadow-amber-400/50"></div>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-700 mt-6 text-lg max-w-2xl mx-auto">
            Discover all the details about our special day
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {navigationCards.map((card, index) => {
            const Icon = getIcon(card.icon);

            return (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href={card.href}>
                  <motion.div
                    whileHover={{ scale: 1.03, rotate: 1, y: -5 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative bg-white/40 backdrop-blur-lg rounded-[2.5rem] border-3 border-amber-200/60 hover:border-amber-400/80 shadow-xl hover:shadow-2xl transition-all overflow-hidden h-full"
                  >
                    {/* Gradient Header */}
                    <div
                      className={`h-32 bg-gradient-to-br ${card.gradient} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 rounded-[1.8rem] bg-white shadow-2xl flex items-center justify-center border-3 border-white/60"
                      >
                        <Icon
                          className={`w-10 h-10 bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`}
                          style={{
                            WebkitTextFillColor: "transparent",
                            WebkitBackgroundClip: "text",
                          }}
                        />
                      </motion.div>

                      {/* Floating particles - Simplified */}
                      <motion.div
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute top-4 right-4 w-2 h-2 bg-white/60 rounded-full"
                        style={{ willChange: "opacity" }}
                      />
                      <motion.div
                        animate={{
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        className="absolute top-8 right-12 w-3 h-3 bg-white/40 rounded-full"
                        style={{ willChange: "opacity" }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8 pt-14">
                      <h4 className="text-2xl font-bold text-gray-900 mb-3 font-playfair-display-sc group-hover:text-amber-600 transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {card.description}
                      </p>

                      {/* Arrow */}
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 10 }}
                        className="mt-6 flex items-center gap-2 text-amber-600 font-semibold"
                      >
                        <span>Explore</span>
                        <span className="text-xl">→</span>
                      </motion.div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-100/30 to-transparent rounded-tl-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
