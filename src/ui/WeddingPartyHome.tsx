"use client";

import { FC } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

interface PartyMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const bridesmaids: PartyMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Maid of Honor",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Emily Chen",
    role: "Bridesmaid",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Maya Patel",
    role: "Bridesmaid",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Olivia Williams",
    role: "Bridesmaid",
    image:
      "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Sophia Martinez",
    role: "Bridesmaid",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Isabella Garcia",
    role: "Bridesmaid",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Ava Thompson",
    role: "Bridesmaid",
    image:
      "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Mia Anderson",
    role: "Bridesmaid",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
  },
];

const groomsmen: PartyMember[] = [
  {
    id: 1,
    name: "Michael Chen",
    role: "Best Man",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "James Rodriguez",
    role: "Groomsman",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "David Kim",
    role: "Groomsman",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Alexander Brown",
    role: "Groomsman",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Daniel Wilson",
    role: "Groomsman",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Matthew Lee",
    role: "Groomsman",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Christopher Davis",
    role: "Groomsman",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Joshua Martinez",
    role: "Groomsman",
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop",
  },
];

const PartyMemberCard: FC<{
  member: PartyMember;
  index: number;
  side: "left" | "right";
}> = ({ member, index, side }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.08,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{ y: -10, scale: 1.03, rotate: side === "left" ? -2 : 2 }}
      className="group"
    >
      <div className="relative rounded-[1.2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
        {/* Image Container */}
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Always Visible Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Enhanced Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-amber-500/30"
          />

          {/* Border with Glass Effect */}
          <div className="absolute inset-0 border-2 border-white/20 group-hover:border-rose-400/60 rounded-[1.2rem] transition-all duration-300"></div>

          {/* Heart Icon - Top Corner */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileHover={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center shadow-xl group-hover:bg-gradient-to-br group-hover:from-rose-500 group-hover:to-pink-600 transition-all duration-300"
          >
            <Heart className="w-5 h-5 text-white group-hover:fill-white transition-all" />
          </motion.div>

          {/* Name & Role - Always Visible on Image */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <motion.div
              initial={{ y: 10, opacity: 0.9 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="text-left"
            >
              <h4 className="font-bold text-white text-base mb-1 drop-shadow-lg group-hover:text-rose-300 transition-colors">
                {member.name}
              </h4>
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  className="h-px w-8 bg-gradient-to-r from-rose-300 to-pink-300 origin-left"
                />
                <p className="text-xs text-rose-200/90 font-semibold uppercase tracking-wide">
                  {member.role}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sparkle Effects - Simplified for performance */}
          {index < 4 && (
            <>
              <motion.div
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full blur-sm"
                style={{ willChange: "opacity" }}
              />
              <motion.div
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3 + 1,
                }}
                className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full blur-sm"
                style={{ willChange: "opacity" }}
              />
            </>
          )}
        </div>

        {/* Animated Border Glow - Only on first row for performance */}
        {index < 4 && (
          <motion.div
            animate={{
              opacity: [0, 0.3, 0],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.2 }}
            className="absolute -inset-[2px] bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 rounded-[1.4rem] blur-lg -z-10 opacity-0 group-hover:opacity-40"
            style={{ willChange: "opacity" }}
          />
        )}
      </div>
    </motion.div>
  );
};

export const WeddingPartyHome: FC = () => {
  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      {/* Animated Background Gradients - Simplified */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-200 via-yellow-200 to-amber-300 rounded-full blur-3xl"
          style={{ willChange: "opacity" }}
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-amber-100 via-yellow-100 to-amber-200 rounded-full blur-3xl"
          style={{ willChange: "opacity" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h3
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-6"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            Our Wedding Party
          </h3>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative inline-block"
          >
            <div className="w-40 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full shadow-lg shadow-amber-400/50"></div>
            <motion.div
              animate={{
                x: ["-50%", "50%", "-50%"],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-y-1/2 w-3 h-3 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50"
            />
          </motion.div>
        </motion.div>

        {/* Our People Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            Our People
          </h3>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative inline-block mb-4"
          >
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full shadow-lg shadow-amber-400/50"></div>
            <motion.div
              animate={{
                x: ["-50%", "50%", "-50%"],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-y-1/2 w-3 h-3 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50"
            />
          </motion.div>
          <p
            className="text-gray-700 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            The special people who will stand beside us on our most precious day
          </p>
        </motion.div>

        {/* Bridesmaids */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-4 mb-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-xl"
              >
                <Heart className="w-7 h-7 text-white fill-white" />
              </motion.div>
              <div>
                <h4
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent"
                  style={{ fontFamily: "var(--font-tangerine)" }}
                >
                  Bridesmaids
                </h4>
                <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mt-1"></div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {bridesmaids.map((member, index) => (
              <PartyMemberCard
                key={member.id}
                member={member}
                index={index}
                side="left"
              />
            ))}
          </div>
        </div>

        {/* Groomsmen */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-4 mb-3 justify-end">
              <div className="text-right">
                <h4
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent"
                  style={{ fontFamily: "var(--font-tangerine)" }}
                >
                  Groomsmen
                </h4>
                <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mt-1 ml-auto"></div>
              </div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-xl"
              >
                <Heart className="w-7 h-7 text-white fill-white" />
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {groomsmen.map((member, index) => (
              <PartyMemberCard
                key={member.id}
                member={member}
                index={index}
                side="right"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
