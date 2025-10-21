"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { motion } from "motion/react";
import { Shirt, Phone, Mail, MapPin, Check, ShoppingBag } from "lucide-react";

interface AsoEbiOption {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  color: string;
  gradient: string;
}

const asoEbiOptions: AsoEbiOption[] = [
  {
    id: 1,
    name: "Women's Aso Ebi",
    description:
      "Beautiful traditional fabric with elegant design. Includes head tie and wrapper.",
    price: "₦35,000",
    image: "/first.jpg",
    color: "Emerald Green & Gold",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    id: 2,
    name: "Men's Aso Ebi",
    description:
      "Premium quality fabric with matching cap. Perfect for the celebration.",
    price: "₦30,000",
    image: "/second.jpg",
    color: "Navy Blue & Gold",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    id: 3,
    name: "Children's Aso Ebi",
    description: "Adorable traditional wear for kids. Available in all sizes.",
    price: "₦20,000",
    image: "/third.jpg",
    color: "Coral & Gold",
    gradient: "from-rose-400 to-pink-500",
  },
];

export const AsoEbiSection: FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tl from-blue-100 to-purple-100 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-block mb-8"
          >
            <div className="w-24 h-24 mx-auto rounded-[2.5rem] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-2xl shadow-gray-500/30">
              <Shirt className="w-12 h-12 text-white" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-gray-700 to-gray-800 blur-2xl -z-10"
              />
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent font-playfair-display-sc mb-6">
            Aso Ebí
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative inline-block mb-6"
          >
            <div className="w-32 h-1 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 mx-auto rounded-full shadow-lg shadow-gray-400/50"></div>
            <motion.div
              animate={{ x: ["-50%", "50%", "-50%"], scale: [1, 1.5, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-y-1/2 w-3 h-3 bg-gray-600 rounded-full shadow-lg shadow-gray-500/50"
            />
          </motion.div>

          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Join us in celebrating our special day by wearing our carefully
            selected Aso Ebí. Each design represents our culture and unity.
          </p>
        </ScrollReveal>

        {/* Aso Ebi Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {asoEbiOptions.map((option, index) => (
            <ScrollReveal key={option.id} direction="up" delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -10, scale: 1.03 }}
                onClick={() => setSelectedOption(option.id)}
                className={`group cursor-pointer relative bg-white/30 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${
                  selectedOption === option.id
                    ? "border-3 border-gray-400/80"
                    : "border-2 border-gray-200/60 hover:border-gray-400/60"
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={option.image}
                    alt={option.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Selected Badge */}
                  {selectedOption === option.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shadow-xl"
                    >
                      <Check className="w-6 h-6 text-white" />
                    </motion.div>
                  )}

                  {/* Price Tag */}
                  <div className="absolute top-4 left-4">
                    <div
                      className={`bg-gradient-to-br ${option.gradient} text-white px-4 py-2 rounded-[1.2rem] shadow-xl font-bold`}
                    >
                      {option.price}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-playfair-display-sc group-hover:text-gray-700 transition-colors">
                    {option.name}
                  </h3>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    {option.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Shirt className="w-4 h-4 text-gray-600" />
                    <p className="text-sm text-gray-600 font-semibold">
                      {option.color}
                    </p>
                  </div>
                </div>

                {/* Decorative Corner */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-gray-100/40 to-transparent rounded-tl-[100px]"
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Contact Information */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border-2 border-gray-200/60 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-gray-900 font-playfair-display-sc mb-8 text-center">
                How to Order
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Contact Methods */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/50 backdrop-blur-sm rounded-[2rem] p-6 border-2 border-gray-200/60 hover:border-gray-400/60 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">
                        Call or WhatsApp
                      </h4>
                      <p className="text-gray-700 mb-3">
                        Contact our Aso Ebí coordinator
                      </p>
                      <a
                        href="tel:+2348012345678"
                        className="text-gray-800 font-bold hover:text-gray-900 transition-colors"
                      >
                        +234 801 234 5678
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/50 backdrop-blur-sm rounded-[2rem] p-6 border-2 border-gray-200/60 hover:border-green-400/60 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">
                        Email Us
                      </h4>
                      <p className="text-gray-700 mb-3">
                        Send your order details
                      </p>
                      <a
                        href="mailto:asoebi@shadetolu.com"
                        className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
                      >
                        asoebi@shadetolu.com
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Pickup Location */}
              <motion.div
                whileHover={{ scale: 1.01, y: -5 }}
                className="bg-white/50 backdrop-blur-sm rounded-[2rem] p-6 border-2 border-gray-200/60 hover:border-rose-400/60 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg mb-2">
                      Pickup Location
                    </h4>
                    <p className="text-gray-700 mb-3">
                      Collect your Aso Ebí from our office
                    </p>
                    <p className="text-gray-900 font-semibold">
                      15 Admiralty Way, Lekki Phase 1, Lagos, Nigeria
                    </p>
                    <a
                      href="https://maps.google.com/?q=Admiralty+Way+Lekki+Lagos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 text-rose-600 font-bold hover:text-rose-700 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      View on Map
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Order Instructions */}
              <div className="mt-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white font-bold text-lg rounded-[2rem] shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
                >
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800"
                  />
                  <ShoppingBag className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Place Your Order</span>
                </motion.button>
              </div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-gray-100/40 to-transparent rounded-bl-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-100/40 to-transparent rounded-tr-[100px]"></div>
          </div>
        </ScrollReveal>

        {/* Important Notes */}
        <ScrollReveal direction="up" delay={0.6}>
          <div className="bg-white/30 backdrop-blur-lg rounded-[2.5rem] p-8 border-2 border-gray-200/60 shadow-lg">
            <h4 className="text-2xl font-bold text-gray-900 font-playfair-display-sc mb-6 text-center">
              Important Information
            </h4>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-600 mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Order Deadline:</strong> December 15, 2024
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-600 mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Sizes Available:</strong> XS, S, M, L, XL, XXL, XXXL
                  (Custom sizing available upon request)
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-600 mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Payment:</strong> Bank transfer or cash upon pickup
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-600 mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Delivery:</strong> Ready for collection from December
                  20, 2024
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-600 mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Note:</strong> Please include your name, size, and
                  quantity when ordering
                </p>
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
