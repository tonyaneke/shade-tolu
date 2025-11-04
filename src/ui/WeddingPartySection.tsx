"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";

const ChromaGrid = dynamic(() => import("@/components/ChromaGrid"), {
  ssr: false,
});

interface PartyMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
  image: string;
}

interface WeddingPartySectionProps {
  bridesmaids?: PartyMember[];
  groomsmen?: PartyMember[];
  className?: string;
}

// Bridesmaids will be sourced from provided links, deriving names from filenames
const bridesmaidLinks: string[] = [
  "https://i.postimg.cc/cHKzPQnc/Judith-Haggai.jpg",
  "https://i.postimg.cc/85qYGjR0/Kazeem-happiness.jpg",
  "https://i.postimg.cc/zXpkSyLv/MARY-U-JONATHAN.jpg",
  "https://i.postimg.cc/YSTRGTvZ/Opeyemi-Osho.png",
  "https://i.postimg.cc/SRkWc4kc/Rukiat-Rahman.jpg",
];

const toTitleCase = (text: string) =>
  text
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const nameFromUrl = (url: string) => {
  try {
    const last = url.split("/").pop() || "";
    const noExt = last.replace(/\.[^.]+$/, "");
    const spaced = noExt.replace(/[-_]+/g, " ");
    return toTitleCase(spaced);
  } catch {
    return "Bridesmaid";
  }
};

const defaultBridesmaids: PartyMember[] = bridesmaidLinks.map((link, index) => ({
  id: index + 1,
  name: nameFromUrl(link),
  role: "Bridesmaid",
  image: link,
}));

const groomsmenLinks: string[] = [
  "https://i.postimg.cc/cCzw2nf7/BALOGUN-OLUWATOYIN-DAVID.jpg",
  "https://i.postimg.cc/WpYGhQxb/EMMANUEL-AKINPELU.jpg",
  "https://i.postimg.cc/ZYs8C1X4/Kingsley.jpg",
  "https://i.postimg.cc/jq3HLGBD/OLUWADAMILARE-ADEYINKA.jpg",
  "https://i.postimg.cc/rFv595VR/OYAWOYE-OLUWATOBI-PAULjpeg.jpg",
  "https://i.postimg.cc/JzNHcgYG/Sheriff-Mohammed.jpg",
];

const defaultGroomsmen: PartyMember[] = groomsmenLinks.map((link, index) => ({
  id: index + 1,
  name: nameFromUrl(link),
  role: "Groomsman",
  image: link,
}));

// Transform wedding party data to ChromaGrid format
const transformToChromaGridItems = (
  members: PartyMember[],
  type: "bridesmaid" | "groomsman"
) => {
  const colors = [
    {
      borderColor: "#D4AF37",
      gradient: "linear-gradient(145deg, #D4AF37, #000)",
    },
    {
      borderColor: "#F59E0B",
      gradient: "linear-gradient(210deg, #F59E0B, #000)",
    },
    {
      borderColor: "#FCD34D",
      gradient: "linear-gradient(165deg, #FCD34D, #000)",
    },
    {
      borderColor: "#FBBF24",
      gradient: "linear-gradient(195deg, #FBBF24, #000)",
    },
  ];

  return members.map((member, index) => ({
    image: member.image,
    title: member.name,
    subtitle: member.role,
    handle: member.bio,
    borderColor: colors[index % colors.length].borderColor,
    gradient: colors[index % colors.length].gradient,
  }));
};

export const WeddingPartySection: FC<WeddingPartySectionProps> = ({
  bridesmaids = defaultBridesmaids,
  groomsmen = defaultGroomsmen,
  className = "",
}) => {
  const bridesmaidItems = transformToChromaGridItems(bridesmaids, "bridesmaid");
  const groomsmenItems = transformToChromaGridItems(groomsmen, "groomsman");

  return (
    <section
      className={`py-24 px-6 bg-gradient-to-b from-white to-[#FAFAFA] relative overflow-hidden ${className}`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-gradient-to-tl from-amber-100 to-yellow-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            Our Wedding Party
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full"></div>
          <p
            className="text-gray-700 mt-6 text-xl md:text-2xl max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            The amazing people who have supported us throughout our journey
          </p>
        </motion.div>

        {/* Bridesmaids Section */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-4"
              style={{ fontFamily: "var(--font-tangerine)" }}
            >
              Bridesmaids
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mx-auto rounded-full"></div>
          </motion.div>

          <div style={{ minHeight: "500px" }}>
            <ChromaGrid
              items={bridesmaidItems}
              radius={280}
              columns={bridesmaids.length >= 4 ? 4 : bridesmaids.length}
              damping={0.4}
              fadeOut={0.5}
            />
          </div>
        </div>

        {/* Groomsmen Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-4"
              style={{ fontFamily: "var(--font-tangerine)" }}
            >
              Groomsmen
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mx-auto rounded-full"></div>
          </motion.div>

          <div style={{ minHeight: "500px" }}>
            <ChromaGrid
              items={groomsmenItems}
              radius={280}
              columns={groomsmen.length >= 4 ? 4 : groomsmen.length}
              damping={0.4}
              fadeOut={0.5}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
