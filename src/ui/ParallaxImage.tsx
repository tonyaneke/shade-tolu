"use client";

import { FC, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
  priority?: boolean;
}

export const ParallaxImage: FC<ParallaxImageProps> = ({
  src,
  alt,
  className = "",
  intensity = 0.3,
  priority = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${intensity * 100}%`, `-${intensity * 100}%`]
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
        />
      </motion.div>
    </div>
  );
};













