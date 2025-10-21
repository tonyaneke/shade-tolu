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
    title: "University Days",
    date: "2015 - 2019",
    description:
      "Our paths crossed at the university campus, where we first met in a crowded lecture hall. Little did we know, this was just the beginning of something extraordinary. We were both ambitious students with big dreams, navigating the exciting world of higher education. Between classes, study groups, and campus activities, we found ourselves in the same circles more often than we expected. There was an instant connection, a natural ease in each other's presence that felt both comfortable and electrifying. Those university halls became the backdrop for the start of something beautiful.",
    image: "/first.jpg",
    side: "left",
  },
  {
    id: 2,
    title: "The First Conversation",
    date: "September 2016",
    description:
      "A simple conversation about a class project turned into hours of talking. We discovered our shared love for adventure, music, and dreams of the future. What started as a casual discussion about academic work evolved into deep conversations about life, aspirations, and everything in between. We talked about our favorite books, the places we wanted to travel, and the impact we hoped to make in the world. Time seemed to stand still as we found ourselves completely absorbed in each other's words. That day, we realized we had found someone who truly understood us, someone who saw the world through a similar lens yet brought a unique perspective that enriched our own.",
    image: "/second.jpg",
    side: "right",
  },
  {
    id: 3,
    title: "Best Friends",
    date: "2017",
    description:
      "Through late-night study sessions and campus events, we became inseparable friends. Our bond grew stronger with each passing day. We were there for each other through exam stress, celebrating victories and supporting each other through challenges. Whether it was grabbing coffee between classes, exploring the city on weekends, or simply sitting in comfortable silence while studying, every moment felt special. Our friendship was built on trust, laughter, and genuine care for each other's wellbeing. Friends started calling us inseparable, and honestly, we didn't mind. We had found not just a friend, but a kindred spirit who made life's journey infinitely more enjoyable.",
    image: "/third.jpg",
    side: "left",
  },
  {
    id: 4,
    title: "After University",
    date: "2019",
    description:
      "Graduation came, and life took us on different paths. But distance only made our connection deeper. We stayed in touch, supporting each other through new careers and life changes. As we stepped into the professional world, our lives became busier and more complex. New jobs, new cities, new responsibilities – everything was changing. Yet through it all, we made time for each other. Late-night phone calls, weekend video chats, and occasional visits became our lifeline. We celebrated each other's career milestones, offered advice during difficult times, and remained each other's biggest cheerleaders. The physical distance taught us the value of our connection, proving that true bonds transcend geography.",
    image: "/fourth.jpg",
    side: "right",
  },
  {
    id: 5,
    title: "Reconnecting",
    date: "2020",
    description:
      "A chance meeting at a mutual friend's party reignited the spark. This time, we both knew there was something more than friendship between us. After months of being apart, fate brought us together in the same room again. The moment our eyes met across that crowded party, it felt like coming home. We spent the entire evening talking, laughing, and reminiscing about old times while creating new memories. But something was different this time. The spark between us was undeniable, electric. We both felt it – this wasn't just friendship anymore. There was a deeper connection, an unspoken understanding that our relationship was evolving into something more beautiful and profound.",
    image: "/gallery/shade-tolu.jpg",
    side: "left",
  },
  {
    id: 6,
    title: "First Date",
    date: "January 2021",
    description:
      "Our first official date was magical. A cozy restaurant, endless conversation, and the realization that we had been falling for each other all along. The nervous excitement we felt was adorable – after all these years of knowing each other, we were experiencing butterflies all over again. The ambiance was perfect, the food delicious, but what made the evening truly special was us. We talked about everything – our hopes, our fears, our dreams for the future. And somewhere between the appetizers and dessert, we both realized what had always been there: we were meant to be more than friends. That night marked the beginning of our romantic journey, and we couldn't have been more certain that this was right.",
    image: "/gallery/shade-tolu2.jpg",
    side: "right",
  },
  {
    id: 7,
    title: "Adventures Together",
    date: "2021 - 2022",
    description:
      "From weekend getaways to simple walks in the park, every moment together was an adventure. We traveled, laughed, and built memories that would last a lifetime. We explored new cities, tried exotic cuisines, hiked scenic trails, and discovered hidden gems in our own backyard. But the adventures weren't just about the places we went – they were about experiencing life together, supporting each other's passions, and growing as individuals and as a couple. We learned each other's quirks, celebrated our differences, and found joy in both grand adventures and quiet moments. Whether we were dancing in the rain or watching sunsets from our favorite spot, every experience was enriched by having each other by our side.",
    image: "/gallery/shade-1.jpg",
    side: "left",
  },
  {
    id: 8,
    title: "Meeting the Families",
    date: "December 2022",
    description:
      "The holidays brought us closer as we introduced each other to our families. Their love and acceptance made us realize we had found our forever home in each other. Meeting each other's families was both exciting and nerve-wracking, but it exceeded all expectations. Our families welcomed us with open arms, treating us not as visitors but as family from day one. We shared meals, stories, traditions, and laughter. Seeing how naturally we fit into each other's families, how our loved ones embraced our relationship, made everything feel even more real and beautiful. The warmth and love we experienced during those family gatherings confirmed what we already knew in our hearts – we were building something lasting, something that extended beyond just the two of us.",
    image: "/gallery/shade-2.jpg",
    side: "right",
  },
  {
    id: 9,
    title: "The Proposal",
    date: "June 2023",
    description:
      "Under the golden sunset at our favorite beach, surrounded by the sound of waves and the warmth of love, the question was asked. It was a moment years in the making, a culmination of all the memories, adventures, and love we had shared. As the sun painted the sky in shades of gold and pink, with the ocean waves providing the perfect soundtrack, the words 'Will you marry me?' changed everything. Tears of joy, an overwhelming sense of happiness, and a resounding 'Yes!' marked the beginning of our forever. Watch the magical moment unfold in all its beauty – a moment we'll treasure for the rest of our lives.",
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
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
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
          {/* Our Journey - Fade in with scale */}
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 text-amber-600">
              <motion.div
                className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400"
                initial={{ width: 0 }}
                whileInView={{ width: "3rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <motion.span
                className="text-3xl md:text-4xl font-semibold tracking-wider"
                style={{ fontFamily: "var(--font-tangerine)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Our Journey
              </motion.span>
              <motion.div
                className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400"
                initial={{ width: 0 }}
                whileInView={{ width: "3rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Our Love Story - Slide up with fade */}
          <motion.h2
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-6"
            style={{ fontFamily: "var(--font-tangerine)" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          >
            Our Love Story
          </motion.h2>

          {/* Decorative divider */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full shadow-lg shadow-amber-400/50"></div>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
          </motion.div>

          {/* Subtitle - Fade in with slight delay */}
          <motion.p
            className="text-gray-600 mt-6 text-3xl md:text-4xl max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-tangerine)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
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
            {events.map((event, index) => (
              <ScrollReveal
                key={event.id}
                direction={event.side === "left" ? "left" : "right"}
                delay={index * 0.1}
              >
                <div
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    event.side === "right" ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <motion.div
                    className="flex-1 md:text-right md:pr-12"
                    initial={{
                      opacity: 0,
                      x: event.side === "left" ? -50 : 50,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
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
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <p className="text-amber-700 font-semibold text-sm tracking-wider uppercase">
                          {event.date}
                        </p>
                      </motion.div>
                      <motion.h3
                        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-4 font-playfair-display-sc leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        {event.title}
                      </motion.h3>
                      <motion.p
                        className="text-gray-700 leading-relaxed text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        {event.description}
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Center Heart - Champagne Gold with Beaming Effect */}
                  <motion.div
                    className="hidden md:block relative z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.3,
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
                  <motion.div
                    className="flex-1 md:pl-12"
                    initial={{
                      opacity: 0,
                      scale: 0.95,
                      x: event.side === "left" ? 50 : -50,
                    }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  >
                    <div
                      className={`${
                        event.side === "right" ? "md:pr-12 md:pl-0" : ""
                      }`}
                    >
                      {event.youtubeUrl ? (
                        <motion.div
                          className="relative w-full h-[640px] rounded-lg overflow-hidden shadow-sm group border-3 border-white/60 cursor-pointer"
                          onClick={() => setSelectedVideo(event.youtubeUrl!)}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={event.image!}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                          {/* Dark overlay */}
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                          {/* Play button */}
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-2xl shadow-amber-500/50 group-hover:shadow-amber-500/70 transition-all">
                              <Play
                                className="w-8 h-8 text-white ml-1"
                                fill="white"
                              />
                            </div>
                          </motion.div>
                          {/* Decorative corners - Gold */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/30 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-yellow-400/30 to-transparent"></div>
                        </motion.div>
                      ) : (
                        <motion.div
                          className="relative w-full h-[640px] rounded-lg overflow-hidden shadow-sm group border-3 border-white/60"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={event.image!}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          {/* Decorative corners - Gold */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-yellow-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            ))}
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
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors border border-white/20"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* YouTube iframe */}
              <iframe
                src={getYouTubeEmbedUrl(selectedVideo)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
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
