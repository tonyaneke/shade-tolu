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
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title - simple and clean */}
        <ScrollReveal direction="up" className="text-center mb-12">
          <p className="text-sm md:text-base text-gray-500 mb-2">Blessings & Well Wishes</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            Words from Friends
          </h2>
        </ScrollReveal>

        {/* Messages Marquee - infinite left scroll, auto-sized cards */}
        <div className="relative -mx-6 px-6 overflow-hidden">
          <motion.div
            className="flex gap-4 items-start"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: Math.max(20, messages.length * 6), ease: "linear", repeat: Infinity }}
          >
            {[...messages, ...messages].map((msg, index) => (
              <div
                key={index}
                className="inline-flex flex-col bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow w-80 md:w-[19.2rem] h-44 md:h-48 flex-shrink-0"
              >
                <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-3 line-clamp-3 md:line-clamp-4">“{msg.message}”</p>
                <div className="h-px bg-gray-100 mb-3" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                    {getInitial(msg.name)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{msg.name}</h4>
                    <p className="text-xs text-gray-500">{formatDate(msg.date)}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {messages.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 text-sm md:text-base">Thank you for your kind words.</p>
          </div>
        )}
      </div>
    </section>
  );
};
