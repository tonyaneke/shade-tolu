"use client";

import { FC, useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  Star,
} from "lucide-react";

interface MediaItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  type: "image" | "video";
  thumbnail?: string;
  span?: "tall" | "wide" | "normal";
}

interface MasonryGalleryProps {
  items?: MediaItem[];
  className?: string;
}

// Gallery images with various spans for masonry layout
const baseGalleryImages: Omit<MediaItem, "id">[] = [
  {
    src: "/gallery/mich-shade.jpg",
    alt: "Shade & Michael Together",
    category: "Love Story",
    type: "image",
    span: "tall",
  },
  {
    src: "/gallery/michael-flowers.jpg",
    alt: "Michael with Flowers",
    category: "Engagement",
    type: "image",
    span: "wide",
  },
  {
    src: "/gallery/micheal-smile.jpg",
    alt: "Michael's Smile",
    category: "Love Story",
    type: "image",
    span: "normal",
  },
  {
    src: "/gallery/shade-1.jpg",
    alt: "Beautiful Shade",
    category: "Pre-Wedding",
    type: "image",
    span: "normal",
  },
  {
    src: "/gallery/shade-2.jpg",
    alt: "Shade Portrait",
    category: "Pre-Wedding",
    type: "image",
    span: "tall",
  },
  {
    src: "/gallery/shade-3.jpg",
    alt: "Elegant Shade",
    category: "Engagement",
    type: "image",
    span: "normal",
  },
  {
    src: "/gallery/shade-ring.jpg",
    alt: "The Ring",
    category: "Engagement",
    type: "image",
    span: "wide",
  },
  {
    src: "/gallery/shade-tolu.jpg",
    alt: "Shade & Tolu",
    category: "Love Story",
    type: "image",
    span: "tall",
  },
  {
    src: "/gallery/shade-tolu2.jpg",
    alt: "Shade & Tolu Forever",
    category: "Love Story",
    type: "image",
    span: "normal",
  },
];

// Generate multiple copies for infinite scroll effect
const generateInfiniteItems = (
  baseItems: Omit<MediaItem, "id">[],
  copies: number = 5
): MediaItem[] => {
  const items: MediaItem[] = [];
  for (let i = 0; i < copies; i++) {
    baseItems.forEach((item, index) => {
      items.push({
        ...item,
        id: i * baseItems.length + index + 1,
      });
    });
  }
  return items;
};

const defaultItems: MediaItem[] = generateInfiniteItems(baseGalleryImages);

export const MasonryGallery: FC<MasonryGalleryProps> = ({
  items = defaultItems,
  className = "",
}) => {
  const [filter, setFilter] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [displayedItems, setDisplayedItems] = useState<MediaItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 12;

  const categories = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  const allFilteredItems =
    filter === "All" ? items : items.filter((item) => item.category === filter);

  const filteredItems = displayedItems.filter((item) =>
    filter === "All" ? true : item.category === filter
  );

  const handlePrevious = () => {
    setSelectedIndex((prev) =>
      prev > 0 ? prev - 1 : filteredItems.length - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev < filteredItems.length - 1 ? prev + 1 : 0
    );
  };

  // Load more items
  const loadMoreItems = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;
      const newItems = allFilteredItems.slice(0, endIndex);
      setDisplayedItems(newItems);
      setPage(page + 1);
      setIsLoading(false);
    }, 300);
  }, [page, isLoading, allFilteredItems, itemsPerPage]);

  // Initial load
  useEffect(() => {
    setDisplayedItems(allFilteredItems.slice(0, itemsPerPage));
    setPage(2);
  }, []);

  // Reset when filter changes
  useEffect(() => {
    setDisplayedItems(allFilteredItems.slice(0, itemsPerPage));
    setPage(2);
  }, [filter]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          displayedItems.length < allFilteredItems.length
        ) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [
    isLoading,
    displayedItems.length,
    allFilteredItems.length,
    loadMoreItems,
  ]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex < 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIndex(-1);
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredItems.length]);

  const getSpanClass = (span?: string) => {
    switch (span) {
      case "tall":
        return "md:row-span-2";
      case "wide":
        return "md:col-span-2";
      default:
        return "";
    }
  };

  return (
    <section className={`py-24 px-6 relative overflow-hidden ${className}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-200 via-yellow-200 to-amber-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tl from-amber-100 via-yellow-100 to-amber-200 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-tangerine)",
              textShadow:
                "0 0 40px rgba(212, 175, 55, 0.4), 0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Our Precious Moments
            </span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block relative mb-6"
          >
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg max-w-2xl mx-auto"
            style={{
              color: "#D4AF37",
              textShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          >
            Every photo tells a story, every moment is a treasure
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category, idx) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                filter === category
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-500/30"
                  : "bg-white/80 backdrop-blur-sm text-amber-800 border border-amber-200 hover:border-amber-400 shadow-sm"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Custom Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-2"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.3,
                }}
                whileHover={{
                  scale: 1.02,
                  zIndex: 10,
                }}
                onClick={() => setSelectedIndex(index)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative group cursor-pointer mb-2 break-inside-avoid"
              >
                <div className="relative w-full overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  {/* Image */}
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={800}
                    height={
                      item.span === "tall"
                        ? 1200
                        : item.span === "wide"
                        ? 600
                        : 800
                    }
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Video Play Button */}
                  {item.type === "video" && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-slate-800 fill-slate-800 ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Info */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-4 z-20 transition-opacity duration-300 ${
                      hoveredId === item.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="text-white font-semibold text-sm drop-shadow-lg mb-1">
                      {item.alt}
                    </p>
                    <p className="text-white/80 text-xs">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Infinite Scroll Observer */}
        <div
          ref={observerRef}
          className="h-20 flex items-center justify-center"
        >
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-amber-600"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full"
              />
              <span className="text-sm font-medium">
                Loading more moments...
              </span>
            </motion.div>
          )}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex justify-center gap-4 flex-wrap"
        >
          {[
            {
              label: "Captured Moments",
              value: baseGalleryImages.length,
              icon: Sparkles,
            },
            {
              label: "Categories",
              value: categories.length - 1,
              icon: Heart,
            },
            {
              label: "Love Stories",
              value: baseGalleryImages.filter(
                (i) => i.category === "Love Story"
              ).length,
              icon: Star,
            },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl px-8 py-5 border border-amber-200/40 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-3xl font-bold text-amber-700">
                  {stat.value}
                </p>
              </div>
              <p className="text-amber-800/70 text-xs font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Optimized Image Preview Modal */}
      <AnimatePresence>
        {selectedIndex >= 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedIndex(-1)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(-1)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 z-30"
              aria-label="Close preview"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 z-30"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 z-30"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Image Container */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full flex items-center justify-center p-16"
            >
              {filteredItems[selectedIndex]?.type === "video" ? (
                <div className="relative w-full h-full max-w-6xl flex items-center justify-center">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                    <Image
                      src={
                        filteredItems[selectedIndex]?.thumbnail ||
                        filteredItems[selectedIndex]?.src
                      }
                      alt={filteredItems[selectedIndex]?.alt || ""}
                      fill
                      className="object-contain"
                      priority
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg mx-auto mb-3">
                          <Play className="w-10 h-10 text-slate-800 fill-slate-800 ml-1" />
                        </div>
                        <p className="text-white text-lg font-semibold">
                          Video Placeholder
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={filteredItems[selectedIndex]?.src || ""}
                    alt={filteredItems[selectedIndex]?.alt || ""}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    quality={95}
                    priority
                  />
                </div>
              )}
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center max-w-2xl px-4">
              <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full">
                <p className="text-white text-sm font-medium mb-0.5">
                  {filteredItems[selectedIndex]?.alt}
                </p>
                <p className="text-white/70 text-xs">
                  {filteredItems[selectedIndex]?.category}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
