"use client";

import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  scale?: boolean;
  once?: boolean;
}

export const ScrollReveal: FC<ScrollRevealProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  scale = false,
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.1, margin: "-50px" });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 60, opacity: 0 };
      case "down":
        return { y: -60, opacity: 0 };
      case "left":
        return { x: 60, opacity: 0 };
      case "right":
        return { x: -60, opacity: 0 };
      case "none":
        return { opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    return {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
    };
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        ...getInitialPosition(),
        ...(scale && { scale: 0.9 }),
      }}
      animate={isInView ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration: duration * 0.8, // Slightly faster
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

