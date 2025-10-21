"use client";

import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface Message {
  name: string;
  message: string;
  date: string;
}

export const WordsFromFriends: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages");
      const data = await response.json();

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <section className="py-24 px-6 bg-gradient-to-b from-white via-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-amber-200/30 rounded-full w-48 mx-auto mb-4"></div>
            <div className="h-12 bg-amber-200/30 rounded-full w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (messages.length === 0) {
    return null;
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 relative overflow-hidden">
      {/* Modern Colorful Background Decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-cyan-400 via-blue-400 to-purple-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-purple-500 to-pink-500"></div>
              <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
              <span
                className="text-xl font-bold tracking-wide"
                style={{ fontFamily: "var(--font-tangerine)" }}
              >
                Blessings & Well Wishes
              </span>
              <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
              <div className="h-px w-8 bg-gradient-to-l from-transparent via-pink-500 to-orange-500"></div>
            </div>
          </div>
          <h2
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            Words from Friends
          </h2>
          <div className="relative inline-block">
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto rounded-full shadow-lg shadow-pink-500/50"></div>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
          </div>
        </ScrollReveal>

        {/* Horizontal Scrolling Messages */}
        <div className="relative mt-12 -mx-6 px-6">
          <div
            className="overflow-x-auto overflow-y-hidden pb-6 scroll-smooth"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#f472b6 transparent",
            }}
          >
            <div className="flex gap-6 px-2">
              {/* Render each message once - no duplication */}
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 1) }}
                  whileHover={{ y: -4 }}
                  className="group relative flex-shrink-0 w-80"
                >
                  {/* Modern Colorful Card */}
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 border-2 border-dashed border-transparent hover:border-pink-400 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-pink-500/20 h-full bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
                    {/* Colorful top accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-t-2xl"></div>

                    {/* Message Content */}
                    <div className="space-y-3 pt-1">
                      <p className="text-gray-700 leading-relaxed text-sm italic line-clamp-4">
                        "{msg.message}"
                      </p>

                      {/* Modern gradient divider */}
                      <div className="h-px bg-gradient-to-r from-purple-200 via-pink-300 to-orange-200"></div>

                      {/* Author Info - Compact */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {/* Colorful gradient initial */}
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
                            <span className="text-white font-bold text-xs">
                              {getInitial(msg.name)}
                            </span>
                          </div>

                          {/* Name and Date */}
                          <div className="flex-1 min-w-0">
                            <h4
                              className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate text-base leading-tight"
                              style={{ fontFamily: "var(--font-tangerine)" }}
                            >
                              {msg.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {formatDate(msg.date)}
                            </p>
                          </div>
                        </div>

                        {/* Colorful heart */}
                        <Heart className="w-4 h-4 text-pink-500 fill-pink-500 flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Colorful gradient fade on edges */}
          <div className="absolute left-0 top-0 bottom-6 w-24 bg-gradient-to-r from-purple-50 via-pink-50/50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-6 w-24 bg-gradient-to-l from-amber-50 via-pink-50/50 to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Footer Message */}
        {messages.length > 0 && (
          <ScrollReveal direction="up" delay={0.5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-16"
            >
              <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Thank you for your beautiful words and blessings! 💕
              </p>
            </motion.div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};
