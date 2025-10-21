"use client";

import { FC } from "react";
import { TextAnimate } from "./TextAnimate";
import AppleInvites from "../components/smoothui/ui/AppleInvites";

interface LoveStorySectionProps {
  className?: string;
}

export const LoveStorySection: FC<LoveStorySectionProps> = ({
  className = "",
}) => {
  const weddingEvents = [
    {
      id: 1,
      title: "Our First Meeting",
      subtitle: "A beautiful beginning",
      location: "Coffee Shop Downtown",
      image: "/first.jpg",
      badge: "Love Story",
    },
    {
      id: 2,
      title: "The Proposal",
      subtitle: "The moment we said yes",
      location: "Sunset Beach",
      image: "/second.jpg",
      badge: "Engagement",
    },
    {
      id: 3,
      title: "Our Wedding Day",
      subtitle: "Forever starts here",
      location: "Garden Venue",
      image: "/third.jpg",
      badge: "Wedding",
    },
  ];

  return (
    <section className={`py-24 px-6 bg-[#FAFAFA] ${className}`}>
      <div className="max-w-8xl mx-auto">
        {/* Animated Title */}
        <div className="text-center mb-20">
          <TextAnimate
            text="Our Love Story"
            type="fadeInUp"
            className="text-5xl md:text-6xl font-bold text-gray-800 font-playfair-display-sc"
          />
        </div>

        {/* Apple Invites Carousel */}
        <div className="mb-20 flex justify-center">
          <div className="w-full max-w-4xl h-[600px]">
            <AppleInvites
              events={weddingEvents}
              interval={4000}
              cardWidth={350}
              cardHeight={500}
              className="h-full"
            />
          </div>
        </div>

        {/* Optional Content */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 font-playfair-display-sc leading-relaxed">
            Every love story is beautiful, but ours is our favorite. From the
            first moment we met to the day we said "I do," our journey has been
            filled with laughter, adventure, and endless love.
          </p>
        </div>
      </div>
    </section>
  );
};
