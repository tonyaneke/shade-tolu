"use client";

import { FC } from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const CircularGallery = dynamic(() => import("@/components/CircularGallery"), {
  ssr: false,
});

const galleryItems = [
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791992/Shade_Et._Michael-_52_of_55_enfymw.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791987/Shade_Et._Michael-_50_of_55_udbaxj.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791976/Shade_Et._Michael-_51_of_55_k8j85e.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791976/Shade_Et._Michael-_41_of_55_gfm9xu.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791972/Shade_Et._Michael-_54_of_55_bxzet0.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791972/Shade_Et._Michael-_54_of_55_bxzet0.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791963/Shade_Et._Michael-_40_of_55_iu0ykg.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791963/Shade_Et._Michael-_43_of_55_uagvmr.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791962/Shade_Et._Michael-_42_of_55_x5t3bx.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791961/Shade_Et._Michael-_19_of_55_quuw9i.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791959/Shade_Et._Michael-_32_of_55_tohkb3.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791958/Shade_Et._Michael-_8_of_55_rihguq.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791959/Shade_Et._Michael-_32_of_55_tohkb3.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791958/Shade_Et._Michael-_8_of_55_rihguq.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791958/Shade_Et._Michael-_31_of_55_xqbbi8.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791956/Shade_Et._Michael-_30_of_55_xyldqe.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791954/Shade_Et._Michael-_29_of_55_heel5v.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791953/Shade_Et._Michael-_28_of_55_dnp2ot.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791950/Shade_Et._Michael-_15_of_55_za9ac2.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791949/Shade_Et._Michael-_9_of_55_d3zjnz.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791950/Shade_Et._Michael-_15_of_55_za9ac2.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791946/Shade_Et._Michael-_17_of_55_ibntoy.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791945/Shade_Et._Michael-_18_of_55_wyxg3j.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791943/Shade_Et._Michael-_11_of_55_aegl90.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791939/Shade_Et._Michael-_14_of_55_uzp9yy.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791938/Shade_Et._Michael-_16_of_55_hynbvs.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791934/Shade_Et._Michael-_12_of_55_rccz03.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791934/Shade_Et._Michael-_7_of_55_jg9nsc.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791932/Shade_Et._Michael-_10_of_55_j2jfyv.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791930/_KAC9295-Edit_i7u4vi.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791927/_KAC9353-Edit_satz7e.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791927/Shade_Et._Michael-_6_of_55_keumsf.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791925/_KAC8945-Edit_saracr.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791924/_KAC8635-Edit_eol4di.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791924/_KAC9283-Edit_jjzulr.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791923/_KAC9250-Edit_g8aosp.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791922/_KAC8971-Edit_gzybxw.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791921/_KAC8689-Edit_dhxqgk.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791921/_KAC8v967-Edit_yyonbh.jpg",
    text: "Wedding Moment",
  },
  {
    image:
      "https://res.cloudinary.com/dy8f717vw/image/upload/v1765791920/_KAC8512-Edit_kz5qns.jpg",
    text: "Wedding Moment",
  },
];

export const CoupleImagesCarousel: FC = () => {
  return (
    <section className="pt-0 pb-16 px-0">
      <div className="max-w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 pt-8"
        >
          <h3
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            Our Journey
          </h3>
          <div className="relative inline-block">
            <div className="w-24 h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mx-auto rounded-full shadow-lg shadow-amber-300/50"></div>
            <motion.div
              animate={{
                x: ["-50%", "50%", "-50%"],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-y-1/2 w-3 h-3 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"
            />
          </div>
        </motion.div>

        <div
          style={{
            height: "600px",
            position: "relative",
            paddingBottom: "3rem",
          }}
        >
          <CircularGallery
            items={galleryItems}
            bend={3}
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>
      </div>
    </section>
  );
};
