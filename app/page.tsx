"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/src/ui/navbar";
import { HeroSection } from "@/src/ui/hero-section";
import { WelcomeSection } from "@/src/ui/WelcomeSection";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Dynamic imports for below-the-fold components
const CoupleImagesCarousel = dynamic(
  () =>
    import("@/src/ui/CoupleImagesCarousel").then((mod) => ({
      default: mod.CoupleImagesCarousel,
    })),
  {
    ssr: true,
    loading: () => (
      <div className="h-[700px] animate-pulse bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
    ),
  }
);

const WeddingPartyHome = dynamic(
  () =>
    import("@/src/ui/WeddingPartyHome").then((mod) => ({
      default: mod.WeddingPartyHome,
    })),
  {
    loading: () => (
      <div className="h-[800px] animate-pulse bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
    ),
  }
);

const EventsSchedule = dynamic(
  () =>
    import("@/src/ui/EventsSchedule").then((mod) => ({
      default: mod.EventsSchedule,
    })),
  {
    ssr: true,
    loading: () => (
      <div className="h-[1000px] animate-pulse bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
    ),
  }
);

const WordsFromFriends = dynamic(
  () =>
    import("@/src/ui/WordsFromFriends").then((mod) => ({
      default: mod.WordsFromFriends,
    })),
  {
    ssr: true,
    loading: () => (
      <div className="h-[600px] animate-pulse bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
    ),
  }
);

const AttendingCTA = dynamic(
  () =>
    import("@/src/ui/AttendingCTA").then((mod) => ({
      default: mod.AttendingCTA,
    })),
  {
    ssr: true,
    loading: () => (
      <div className="h-[500px] animate-pulse bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
    ),
  }
);

const Footer = dynamic(
  () => import("@/src/ui/Footer").then((mod) => ({ default: mod.Footer })),
  { ssr: true }
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax effects for different sections
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Shade & Tolu Wedding Ceremony",
    description: "Join us as we celebrate the union of Shade and Tolu",
    startDate: "2024-12-26T08:00:00+01:00",
    endDate: "2024-12-26T23:59:59+01:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Lagos, Nigeria",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "Nigeria",
      },
    },
    image: [
      "https://shadentolu.com/first.jpg",
      "https://shadentolu.com/second.jpg",
      "https://shadentolu.com/third.jpg",
    ],
    organizer: {
      "@type": "Person",
      name: "Shade & Tolu",
    },
    performer: {
      "@type": "Person",
      name: "Shade & Tolu",
    },
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div
        ref={containerRef}
        className="font-sans min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white relative m-0 p-0"
      >
        <Navbar />

        {/* Hero Section - Above the fold with parallax */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <HeroSection />
        </motion.div>

        {/* Welcome Section - Fade in on scroll */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <WelcomeSection />
        </motion.div>

        {/* Below the fold sections - lazy loaded with stagger effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <CoupleImagesCarousel />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <EventsSchedule />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <WeddingPartyHome />
        </motion.div>

        {/* Words from Friends - Keep carousel intact with animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <WordsFromFriends />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <AttendingCTA />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Footer />
        </motion.div>
      </div>
    </>
  );
}
