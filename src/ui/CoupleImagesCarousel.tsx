"use client";

import { FC } from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const CircularGallery = dynamic(() => import("@/components/CircularGallery"), {
  ssr: false,
});

const galleryItems = [
  {
    image: "https://i.postimg.cc/d1HRKzk3/Shade-Tolulope16.jpg",
    text: "Shade & Tolulope",
  },
  {
    image: "https://i.postimg.cc/sD161Jsn/Shade-et-Tolu-Family-15.jpg",
    text: "Family Love",
  },
  { image: "https://i.postimg.cc/TYRxsFjr/001.jpg", text: "Beautiful Wedding" },
  { image: "https://i.postimg.cc/L66dDfRX/003.jpg", text: "Elegant Moments" },
  {
    image: "https://i.postimg.cc/CLv3Q1xg/IMG-5711.avif",
    text: "Wedding Ceremony",
  },
  {
    image: "https://i.postimg.cc/nhg6nPm0/IMG-5837.avif",
    text: "Special Moments",
  },
  { image: "https://i.postimg.cc/bJHMHYBM/IMG-5861.avif", text: "Celebration" },
  {
    image: "https://i.postimg.cc/65Hkm35D/IMG-7827.jpg",
    text: "Wedding Portrait",
  },
  { image: "https://i.postimg.cc/9MtStXn1/IMG-9813.avif", text: "Wedding Day" },
];

export const CoupleImagesCarousel: FC = () => {
  return (
    <section className="pt-0 pb-16 px-0">
      <div className="max-w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 pt-8"
        >
          <h3
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            Our Journey
          </h3>
          <div className="relative inline-block">
            <div className="w-24 h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mx-auto rounded-full shadow-lg shadow-amber-300/50"></div>
            <motion.div
              animate={{
                x: ["-50%", "50%", "-50%"],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-y-1/2 w-3 h-3 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"
            />
          </div>
        </motion.div>

        <div
          style={{
            height: "600px",
            position: "relative",
            paddingBottom: "3rem",
          }}
        >
          <CircularGallery
            items={galleryItems}
            bend={3}
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>
      </div>
    </section>
  );
};
