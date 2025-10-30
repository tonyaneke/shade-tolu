"use client";

import { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date("2025-12-26T08:00:00").getTime();
      const now = Date.now(); // More performant than new Date().getTime()
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="flex justify-center"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-6 py-4 shadow-lg">
        <div className="flex items-center gap-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.3 }}
              className="text-center"
            >
              <motion.div
                key={unit.value}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-bold text-white mb-1"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {String(unit.value).padStart(2, "0")}
              </motion.div>
              <div
                className="text-xs text-white/70 uppercase tracking-wide"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface HeroSectionProps {
  className?: string;
}

const images = [
  { src: "/first.jpg", alt: "Wedding Image 1" },
  { src: "/second.jpg", alt: "Wedding Image 2" },
  { src: "/third.jpg", alt: "Wedding Image 3" },
];

export const HeroSection: FC<HeroSectionProps> = ({ className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* Image Carousel with Parallax and Fancy Transitions */}
      <motion.div
        style={{ y, scale, willChange: "transform" }}
        className="relative w-full h-full"
      >
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          const isPrev =
            index === (currentIndex - 1 + images.length) % images.length;

          return (
            <motion.div
              key={index}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.1,
                x: isActive ? "0%" : isPrev ? "-5%" : "5%",
                rotateY: isActive ? 0 : isPrev ? -8 : 8,
                filter: isActive
                  ? "blur(0px) brightness(1)"
                  : "blur(8px) brightness(0.7)",
              }}
              transition={{
                opacity: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
                scale: { duration: 6, ease: "linear" },
                x: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
                rotateY: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
                filter: { duration: 1, ease: "easeInOut" },
              }}
              className="absolute inset-0"
              style={{
                willChange: isActive ? "opacity, transform, filter" : "auto",
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <motion.div
                animate={{
                  scale: isActive ? [1, 1.05] : 1,
                }}
                transition={{
                  scale: { duration: 6, ease: "linear", repeat: 0 },
                }}
                className="relative w-full h-full"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  quality={85}
                  sizes="100vw"
                />
                {/* Dark Gradient Overlay */}
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0.3,
                  }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"
                ></motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ opacity, willChange: "opacity" }}
        className="absolute inset-0 flex items-end justify-center pb-32 z-10"
      >
        <div
          className="text-center text-white px-4 max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-tangerine)" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-4 tracking-wide"
            style={{
              textShadow:
                "0 0 60px rgba(212, 175, 55, 0.6), 0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent drop-shadow-2xl">
              Shade & Tolu
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-block relative mb-4"
          >
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-2xl md:text-4xl font-bold mb-6 tracking-wide"
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            Together Forever
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-2xl mb-6"
          >
            <p className="text-xl md:text-3xl font-semibold mb-1 text-amber-200 font-sans">
              December 26, 2025
            </p>
            <p className="text-base text-white/90 font-sans">
              📍 Lagos, Nigeria
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <CountdownTimer />
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-12 border-2 border-white/40 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/5 shadow-lg"
            >
              <motion.div className="w-2 h-2 bg-amber-300 rounded-full shadow-lg shadow-amber-300/50"></motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
