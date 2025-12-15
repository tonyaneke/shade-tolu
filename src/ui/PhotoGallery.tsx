"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  id: number;
  src: string;
  alt: string;
  category: string;
}

interface PhotoGalleryProps {
  photos?: Photo[];
  className?: string;
}

const defaultPhotos: Photo[] = [
  {
    id: 1,
    src: "/first.jpg",
    alt: "Our first meeting",
    category: "Love Story",
  },
  {
    id: 2,
    src: "/second.jpg",
    alt: "The proposal",
    category: "Engagement",
  },
  {
    id: 3,
    src: "/third.jpg",
    alt: "Pre-wedding photoshoot",
    category: "Pre-Wedding",
  },
  {
    id: 4,
    src: "/first.jpg",
    alt: "Engagement party",
    category: "Engagement",
  },
  {
    id: 5,
    src: "/second.jpg",
    alt: "Our love story",
    category: "Love Story",
  },
  {
    id: 6,
    src: "/third.jpg",
    alt: "Pre-wedding shoot",
    category: "Pre-Wedding",
  },
];

export const PhotoGallery: FC<PhotoGalleryProps> = ({
  photos = defaultPhotos,
  className = "",
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(photos.map((p) => p.category))),
  ];

  const filteredPhotos =
    filter === "All" ? photos : photos.filter((p) => p.category === filter);

  const handlePrevious = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    setSelectedPhoto(photos[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    setSelectedPhoto(photos[nextIndex]);
  };

  return (
    <section
      className={`py-24 px-6 bg-gradient-to-b from-white to-[#FAFAFA] ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollReveal direction="up" className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 font-playfair-display-sc mb-4">
            Our Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 text-lg">
            Capturing the beautiful moments of our journey together
          </p>
        </ScrollReveal>

        {/* Filter Buttons */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-amber-50 border border-amber-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <ScrollReveal
              key={photo.id}
              direction="up"
              delay={index * 0.1}
              scale
            >
              <motion.div
                layoutId={`photo-${photo.id}`}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-lg">
                      {photo.alt}
                    </p>
                    <p className="text-amber-300 text-sm">{photo.category}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors duration-300 z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors duration-300 z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors duration-300 z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              layoutId={`photo-${selectedPhoto.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] w-full aspect-square"
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-white text-xl font-semibold mb-1">
                {selectedPhoto.alt}
              </p>
              <p className="text-amber-300">{selectedPhoto.category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
















