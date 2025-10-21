"use client";

import { FC } from "react";
import { ScrollReveal } from "./ScrollReveal";
import {
  Hotel,
  Plane,
  MapPin,
  Sun,
  UtensilsCrossed,
  Camera,
} from "lucide-react";

interface TravelInfoCard {
  id: number;
  title: string;
  description: string;
  icon: "hotel" | "plane" | "map" | "sun" | "food" | "camera";
  details: string[];
}

interface TravelGuideProps {
  travelInfo?: TravelInfoCard[];
  className?: string;
}

const defaultTravelInfo: TravelInfoCard[] = [
  {
    id: 1,
    title: "Accommodation",
    description: "Recommended hotels and lodging near the venue",
    icon: "hotel",
    details: [
      "Eko Hotel & Suites - 5 min from venue",
      "The Wheatbaker Hotel - 10 min from venue",
      "Federal Palace Hotel - 15 min from venue",
      "Special wedding rates available with code: DJ2024",
    ],
  },
  {
    id: 2,
    title: "Getting There",
    description: "Transportation and airport information",
    icon: "plane",
    details: [
      "Murtala Muhammed International Airport (LOS)",
      "Airport transfers can be arranged",
      "Uber and Bolt are widely available",
      "Hotel shuttles available from select hotels",
    ],
  },
  {
    id: 3,
    title: "Things to Do",
    description: "Must-see attractions in Lagos",
    icon: "camera",
    details: [
      "Visit Lekki Conservation Centre",
      "Explore Nike Art Gallery",
      "Beach day at Elegushi Beach",
      "Shopping at Lekki Arts & Crafts Market",
    ],
  },
  {
    id: 4,
    title: "Local Cuisine",
    description: "Delicious restaurants to try",
    icon: "food",
    details: [
      "Terra Kulture - Traditional Nigerian cuisine",
      "Shiro - Asian fusion dining",
      "Craft Gourmet - Contemporary African food",
      "The Place - Popular spot for locals",
    ],
  },
  {
    id: 5,
    title: "Weather",
    description: "What to expect in June",
    icon: "sun",
    details: [
      "Temperature: 24-28°C (75-82°F)",
      "Rainy season - bring an umbrella",
      "Light, breathable clothing recommended",
      "Evenings can be cooler near the coast",
    ],
  },
  {
    id: 6,
    title: "Local Tips",
    description: "Good to know before you go",
    icon: "map",
    details: [
      "Nigerian Naira (NGN) is the local currency",
      "Credit cards widely accepted in hotels",
      "Tipping is appreciated (10-15%)",
      "Download offline maps before arrival",
    ],
  },
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "hotel":
      return Hotel;
    case "plane":
      return Plane;
    case "map":
      return MapPin;
    case "sun":
      return Sun;
    case "food":
      return UtensilsCrossed;
    case "camera":
      return Camera;
    default:
      return MapPin;
  }
};

const TravelCard: FC<{ info: TravelInfoCard; index: number }> = ({
  info,
  index,
}) => {
  const Icon = getIcon(info.icon);

  return (
    <ScrollReveal direction="up" delay={index * 0.1} scale>
      <div className="group bg-white/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-3 border-amber-200/60 hover:border-amber-400/80 h-full relative">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 p-8 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/25 backdrop-blur-md flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl">
              <Icon className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white font-playfair-display-sc mb-2">
              {info.title}
            </h3>
            <p className="text-white/95 text-sm leading-relaxed">
              {info.description}
            </p>
          </div>

          {/* Decorative element */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="p-7">
          <ul className="space-y-4">
            {info.details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-3 group/item">
                <div className="w-2 h-2 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300 shadow-sm"></div>
                <span className="text-gray-700 leading-relaxed text-sm group-hover/item:text-gray-900 transition-colors duration-300">
                  {detail}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative corner */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-[100px]"></div>
      </div>
    </ScrollReveal>
  );
};

export const TravelGuide: FC<TravelGuideProps> = ({
  travelInfo = defaultTravelInfo,
  className = "",
}) => {
  return (
    <section
      className={`py-24 px-6 bg-gradient-to-b from-white via-blue-50/20 to-white relative overflow-hidden ${className}`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-40 left-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-gradient-to-tl from-amber-100 to-yellow-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 text-amber-600">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400"></div>
              <span className="text-sm font-semibold tracking-widest uppercase">
                Explore Lagos
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent font-playfair-display-sc mb-6">
            Lagos Travel Guide
          </h2>
          <div className="relative inline-block">
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full shadow-lg shadow-amber-400/50"></div>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-700 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know for your trip to Lagos. We can't wait to
            show you our beautiful city!
          </p>
        </ScrollReveal>

        {/* Travel Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelInfo.map((info, index) => (
            <TravelCard key={info.id} info={info} index={index} />
          ))}
        </div>

        {/* Map Section */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="mt-16 bg-white rounded-2xl overflow-hidden shadow-2xl border border-amber-100">
            <div className="p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4 font-playfair-display-sc text-center">
                Venue Location
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Find us at: 123 Cathedral Lane, Victoria Island, Lagos, Nigeria
              </p>
              {/* Placeholder for map - you can integrate Google Maps here */}
              <div className="w-full h-96 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">
                    Interactive Map Coming Soon
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
