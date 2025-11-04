"use client";

import { FC, useState } from "react";
import React from "react";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { WaveDivider } from "./CurvedDivider";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Play, X, Heart } from "lucide-react";

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  image?: string;
  youtubeUrl?: string;
  side?: "left" | "right";
}

interface TimelineStoryProps {
  events?: TimelineEvent[];
  className?: string;
}

const defaultEvents: TimelineEvent[] = [
  {
    id: 1,
    title: "THE MEETING “Hello, May I Join You?",
    date: "2010",
    description: `Our story began in 2010, at the University of Port Harcourt.
            I was seated in Basic Hall, just starting my pre-degree program in Petroleum Engineering, when this beautiful young lady walked in — Shade.
            She wore a simple white top and a black skirt, yet there was something effortlessly graceful about her. She smiled, looked around, and then asked softly, "Hello, may I join you?"
            I said yes — not realizing that single moment would mark the beginning of a story far beyond what either of us imagined.
            We didn’t know it then, but that seat in Basic Hall wasn’t just about academics; it was destiny quietly taking its place.
            So, sit back, relax, and let us take you on a journey — one of friendship, timing, and the kind of love that only time could reveal.`,
    image: "https://i.postimg.cc/y6GL2yL1/C1.png",
    side: "left",
  },
  {
    id: 2,
    title: "Side by Side — The Beginning of Friendship",
    date: "2012",
    description:
      "We didn’t say much that day — just exchanged names, courses, and a few polite smiles. But as the weeks went by, life seemed to keep crossing our paths in the most unexpected ways. What began as simple hellos turned into longer conversations, shared jokes, and eventually, a genuine friendship. Before long, we became study partners — spending long hours in the library, sharing notes, and motivating each other to stay focused. At that stage, it was all about academics. Romance wasn’t even a thought; we were just two young dreamers helping each other chase success. Looking back now, it’s beautiful how something so ordinary — shared notes and study sessions — quietly laid the foundation for a story neither of us saw coming.",
    image: "https://i.postimg.cc/pLRcBX0z/C360-2017-10-01-23-32-42-659.jpg",
    side: "right",
  },
  {
    id: 3,
    title: "The Twist That Drew Us Closer",
    date: "2017",
    description:
      "After completing our one-year Basic Program at the University of Port Harcourt, Shade and I stayed in touch — checking in on each other often and eagerly awaiting the release of the admission list.My heart was set on Petroleum Engineering, while she dreamt passionately about Medicine and Surgery. But as fate would have it, destiny had a different script for us. When the admission list finally came out, we both found our names under Geology — a course neither of us had ever imagined studying. There was excitement, yes, but also a quiet mix of surprise and uncertainty. We had achieved the dream of gaining admission, yet it wasn’t quite the dream we had envisioned. After days of deep thought and prayer, I chose to embrace the new path before me. Interestingly, Shade had come to the same conclusion. We both accepted the offer and began our registration process — together.  Looking back now, it feels almost poetic how life aligned our journeys once again — not just in the same university, but in the same department, with sequential matric numbers: mine 026, hers 027. We even got to sit side by side during exams. Was that the stage being set for our story of love?Move on to the next chapter to find out.",
    image: "https://i.postimg.cc/NfmCvr9w/c2.png",
    side: "left",
  },
  {
    id: 4,
    title: "Unspoken Feelings",
    date: "2016",
    description:
      "We’re sorry to disappoint you — no, we didn’t start a romantic relationship.Were there feelings? Yes. Undeniably so. But for reasons of preserving and prioritizing our genuine friendship, I was not willing to jeopardize access to her for expression of my feelings. I chose to be silent over confession. What followed was four years of unspoken emotions wrapped in genuine friendship. We built a bond that was honest, easy, and deeply comforting — a kind of friendship that didn’t need words to be understood. We studied together late into the night, helped each other with assignments, and shared countless moments of laughter, support, and quiet admiration. Life, however, had its own plans. Along the way, we each embarked on separate journeys of love — with different people, in search of something we didn’t realize we already had. We celebrated each other’s highs and offered shoulders during the lows, never crossing the line, yet never truly apart. Looking back, it’s almost poetic how we spent those years side by side, learning not just about rocks and minerals, strikes and deeps, field trips but about patience, timing, and the quiet power of destiny at work behind the scenes.",
    image: "https://i.postimg.cc/tCsy3kMj/c4.jpg",
    side: "right",
  },
  {
    id: 5,
    title: "Time and Distance — Life After Uni",
    date: "2020",
    description:
      "Then came the NYSC year — that inevitable season where life begins to scatter friends across the country. I was posted to Abuja, while she found herself in Jos. But somehow, it never really felt like we were apart. The distance didn’t break our connection; if anything, it refined it. We shared laughter, stories, and small wins from our new worlds. We were intentional about staying in touch — not out of obligation, but out of genuine care. We encouraged each other’s growth, discussed our career dreams, and found new ways to show up for one another, even from miles away. Adulthood had begun to test us — with its demands, decisions, and uncertainties — yet our friendship only grew deeper. When NYSC came to an end, she moved to Lagos, chasing the next chapter of her life and exploring what the city had in store. I, on the other hand, chose to remain in Abuja, charting my own course and building my path one step at a time. Years went by — yet through it all, our bond remained unshaken. We celebrated milestones together, cheered for each other’s achievements, and watched time turn our friendship into something rare and beautiful. Seven, eight, nine, ten, eleven, twelve years of friendship…And still, we stood — not knowing that all those years of consistency, patience, and quiet affection were leading us toward something far greater than friendship.",
    image: "https://i.postimg.cc/QMtRDdZr/c3.png",
    side: "left",
  },
  {
    id: 6,
    title: "When Friendship Found Love",
    date: "January 2021",
    description:
      "In our thirteenth year of friendship, something shifted — voice was given to surpressed emotions of over a decade. In what could only be described as an unconventional moment, I finally asked her out. It wasn’t rehearsed or grand — just honest. But that simple question stirred up a flood of emotions and memories, gently unveiling what had been hidden in plain sight all along. We laughed, we reminisced, and then came the question that lingered between smiles and silence — “What took us so long?” Perhaps it was timing. Perhaps it was destiny’s way of preparing us for each other.After years of friendship, shared dreams, and unspoken feelings, we both knew it was time to embrace what had always been there. And so, we took the leap — from friends to lovers — not as strangers discovering something new, but as two souls finally recognizing what life had been quietly writing all these years. Today, when I look at her, I don’t just see the girl from Basic Hall or my friend from Geology class. I see my answered prayer, my constant, my home and safe haven. Thirteen years of friendship, and a lifetime of love ahead.Our story didn’t begin with sparks — it began with friendship.But now, it burns with a flame only time and destiny could have kindled.",
    image: "https://i.postimg.cc/tJZq4z0t/IMG-5680.avif",
    side: "right",
  },
  {
    id: 9,
    title: "The Proposal",
    date: "June 2023",
    description:
      "It happened on June 21, 2025 — a day that will forever stay etched in my heart. After 15 years of friendship, laughter, and shared memories, we were about to turn that bond into a lifetime together. The planning phase? Far from easy. Pulling off a surprise for Shade is like trying to hide the sunrise — nearly impossible. But with her best friend Folasade, we decided to take up the challenge. It took us one full month to strategize, adjust, and perfect every little detail. The final master plan came from Folasade — to send Shade a “work dinner invitation.” If there’s anything that excites Shade deeply, it’s seeing her friends thrive in their careers. That was the hook. To sell the story, we went as far as designing an actual event flyer for this so-called “career dinner.” She was over the moon when she got it — proud of her friend’s promotion and already planning what to wear. She even called me in excitement, completely unaware that I was in on the plan. Behind the scenes, however, Folasade and I were coordinating everything — her outfit, the decor, the timing, every single detail. To keep her from getting suspicious, I told her I had to travel to Aba for work, just so I could sneak into Lagos and set things in motion. Because we talk every day, I knew the slightest background sound could give me away, so we carefully blocked every loophole. Her siblings and a few close friends were all part of the secret circle. Everyone played their part perfectly. And when she finally walked in — expecting a work dinner — she found me waiting, ring in hand, heart racing, ready to ask the one question that would change everything. You can watch how this beautiful story unfolded in the link below… ❤️",
    image: "/first.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=w-tOMzLS5oU",
    side: "left",
  },
  {
    id: 10,
    title: "Forever Begins",
    date: "December 26, 2025",
    description:
      "And now, we invite you to witness the next chapter of our love story. Join us as we say 'I do' and begin our journey as husband and wife. This is the moment we've been dreaming about, the day when we officially become family in the eyes of the world. We're so grateful for everyone who has been part of our journey – from those early university days to this beautiful milestone. Your love, support, and presence have shaped our story in countless ways. As we stand together, ready to make our vows and commit to a lifetime of love, laughter, and adventure, we couldn't imagine celebrating without you. Here's to new beginnings, endless love, and the beautiful future we're building together. Thank you for being part of our forever.",
    image: "/gallery/shade-3.jpg",
    side: "right",
  },
];

export const TimelineStory: FC<TimelineStoryProps> = ({
  events = defaultEvents,
  className = "",
}) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const timelineRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?si=lhsbP7iBpqgYZxjN&autoplay=1`;
  };

  return (
    <section
      ref={timelineRef}
      className={`py-24 px-6 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden ${className}`}
    >
      {/* Background Decorations - Champagne Gold */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-300 to-yellow-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-gradient-to-tl from-amber-200 to-yellow-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title - Champagne Gold Theme */}
        <div className="text-center mb-20">
          {/* Our Journey - Fade in with scale - Show immediately */}
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 text-amber-600">
              <motion.div
                className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400"
                initial={{ width: 0 }}
                animate={{ width: "3rem" }}
                transition={{ duration: 0.4, delay: 0.1 }}
              />
              <motion.span
                className="text-3xl md:text-4xl font-semibold tracking-wider"
                style={{ fontFamily: "var(--font-tangerine)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Our Journey
              </motion.span>
              <motion.div
                className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400"
                initial={{ width: 0 }}
                animate={{ width: "3rem" }}
                transition={{ duration: 0.4, delay: 0.1 }}
              />
            </div>
          </motion.div>

          {/* Our Love Story - Slide up with fade - Show immediately */}
          <motion.h2
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-6"
            style={{ fontFamily: "var(--font-tangerine)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            Our Love Story
          </motion.h2>

          {/* Decorative divider */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full shadow-lg shadow-amber-400/50"></div>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
          </motion.div>

          {/* Subtitle - Fade in with slight delay */}
          <motion.p
            className="text-gray-600 mt-6 text-3xl md:text-4xl max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-tangerine)" }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          >
            Every love story is special, beautiful, and unique. Here's ours.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line - Champagne Gold (Background) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-amber-200/30 via-amber-300/30 to-amber-200/30 hidden md:block"></div>

          {/* Center Line - Animated Progress */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-400 hidden md:block origin-top"
            style={{ height: lineHeight, scaleY: 1 }}
          ></motion.div>

          {/* Timeline Events */}
          <div className="space-y-24">
            {events.map((event, index) => {
              // First 2 events show immediately, others use scroll reveal
              const isFirstTwo = index < 2;
              const baseDelay = isFirstTwo ? 0.6 + index * 0.1 : 0;

              return (
                <ScrollReveal
                  key={event.id}
                  direction={event.side === "left" ? "left" : "right"}
                  delay={baseDelay}
                  duration={isFirstTwo ? 0.4 : 0.6}
                >
                  <div
                    className={`flex flex-col md:flex-row items-center gap-6 md:gap-8 ${
                      event.side === "right" ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content */}
                    <motion.div
                      className="flex-1 w-full md:text-right md:pr-12"
                      initial={{
                        opacity: isFirstTwo ? 0 : 0,
                        x: event.side === "left" ? -30 : 30,
                      }}
                      animate={isFirstTwo ? { opacity: 1, x: 0 } : undefined}
                      whileInView={
                        !isFirstTwo ? { opacity: 1, x: 0 } : undefined
                      }
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: baseDelay + 0.1 }}
                    >
                      <div
                        className={`${
                          event.side === "right"
                            ? "md:text-left md:pl-12 md:pr-0"
                            : ""
                        }`}
                      >
                        <motion.div
                          className="inline-block mb-3 px-4 py-1.5 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 backdrop-blur-sm rounded-full border border-amber-400/30"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={
                            isFirstTwo ? { opacity: 1, scale: 1 } : undefined
                          }
                          whileInView={
                            !isFirstTwo ? { opacity: 1, scale: 1 } : undefined
                          }
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: baseDelay + 0.2 }}
                        >
                          <p className="text-amber-700 font-semibold text-sm tracking-wider uppercase">
                            {event.date}
                          </p>
                        </motion.div>
                        <motion.h3
                          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight"
                          initial={{ opacity: 0, y: 10 }}
                          animate={
                            isFirstTwo ? { opacity: 1, y: 0 } : undefined
                          }
                          whileInView={
                            !isFirstTwo ? { opacity: 1, y: 0 } : undefined
                          }
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: baseDelay + 0.25,
                          }}
                        >
                          {event.title}
                        </motion.h3>
                        <motion.p
                          className="text-gray-800 text-[1.05rem] md:text-[1.125rem] leading-8 md:leading-9 max-w-prose text-justify"
                          initial={{ opacity: 0, y: 10 }}
                          animate={
                            isFirstTwo ? { opacity: 1, y: 0 } : undefined
                          }
                          whileInView={
                            !isFirstTwo ? { opacity: 1, y: 0 } : undefined
                          }
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: baseDelay + 0.3 }}
                        >
                          {event.description}
                        </motion.p>
                      </div>
                    </motion.div>

                    {/* Center Heart - Champagne Gold with Beaming Effect */}
                    <motion.div
                      className="hidden md:block relative z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        isFirstTwo ? { opacity: 1, scale: 1 } : undefined
                      }
                      whileInView={
                        !isFirstTwo ? { opacity: 1, scale: 1 } : undefined
                      }
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: baseDelay + 0.2,
                      }}
                    >
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* Outer beaming ring */}
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.6, 0, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Heart className="w-12 h-12 text-amber-400 fill-amber-400/30" />
                        </motion.div>

                        {/* Second beaming ring */}
                        <motion.div
                          animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.4, 0, 0.4],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 0.5,
                          }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Heart className="w-12 h-12 text-yellow-400 fill-yellow-400/20" />
                        </motion.div>

                        {/* Main heart with glow */}
                        <motion.div
                          className="relative z-10 w-10 h-10 rounded-full bg-transparent flex items-center justify-center"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Heart className="w-6 h-6 text-amber-500 fill-amber-500 drop-shadow-lg" />
                        </motion.div>

                        {/* Continuous subtle pulse on main heart */}
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400/20 to-yellow-400/20 blur-md"></div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Image or Video */}
                    <div className="flex-1 w-full md:pl-12">
                      <div
                        className={`w-full ${
                          event.side === "right" ? "md:pr-12 md:pl-0" : ""
                        }`}
                      >
                        {event.youtubeUrl ? (
                          <div
                            className="relative w-full rounded-lg overflow-hidden shadow-lg group border-2 border-white/60 cursor-pointer bg-gray-50"
                            onClick={() => setSelectedVideo(event.youtubeUrl!)}
                            style={{ minHeight: "280px", maxHeight: "640px" }}
                          >
                            {event.image && (
                              <div
                                className="relative w-full h-full"
                                style={{
                                  minHeight: "280px",
                                  maxHeight: "640px",
                                }}
                              >
                                <Image
                                  src={event.image}
                                  alt={event.title}
                                  fill
                                  className="object-contain p-2"
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                                  priority={isFirstTwo}
                                  unoptimized={
                                    event.image.startsWith("http://") ||
                                    event.image.startsWith("https://")
                                  }
                                />
                              </div>
                            )}
                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 z-10"></div>
                            {/* Play button */}
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                            >
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-2xl shadow-amber-500/50 group-hover:shadow-amber-500/70 transition-all">
                                <Play
                                  className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1"
                                  fill="white"
                                />
                              </div>
                            </motion.div>
                            {/* Decorative corners - Gold */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/30 to-transparent z-0"></div>
                            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-yellow-400/30 to-transparent z-0"></div>
                          </div>
                        ) : (
                          <div
                            className="relative w-full rounded-lg overflow-hidden shadow-lg group border-2 border-white/60 bg-gray-50"
                            style={{ minHeight: "280px", maxHeight: "640px" }}
                          >
                            {event.image && (
                              <div
                                className="relative w-full h-full"
                                style={{
                                  minHeight: "280px",
                                  maxHeight: "640px",
                                }}
                              >
                                <Image
                                  src={event.image}
                                  alt={event.title}
                                  fill
                                  className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                                  priority={isFirstTwo}
                                  unoptimized={
                                    event.image.startsWith("http://") ||
                                    event.image.startsWith("https://")
                                  }
                                />
                              </div>
                            )}
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                            {/* Decorative corners - Gold */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-yellow-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* YouTube Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-6xl aspect-video rounded-lg sm:rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 sm:-top-12 sm:right-0 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors border border-white/20"
                aria-label="Close video"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* YouTube iframe */}
              <iframe
                width="560"
                height="315"
                src={getYouTubeEmbedUrl(selectedVideo)}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
                style={{ minHeight: "200px" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Curved Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider color="fill-white" />
      </div>
    </section>
  );
};
