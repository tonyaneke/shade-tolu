"use client";

import { FC, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart, Instagram, Facebook, Mail, Phone, ArrowUp } from "lucide-react";

interface FooterProps {
  className?: string;
}

export const Footer: FC<FooterProps> = ({ className = "" }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`relative bg-white overflow-hidden ${className}`}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-yellow-400 to-amber-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Couple Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent drop-shadow-lg"
              style={{ fontFamily: "var(--font-tangerine)" }}
            >
              Shade & Tolu
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              Thank you for being part of our special day. Your presence means
              the world to us.
            </p>
            <div className="inline-flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
              <Heart className="w-5 h-5 text-amber-400 animate-pulse" />
              <span className="font-bold text-amber-400">
                December 26, 2025
              </span>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4
              className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-tangerine)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "Our Love Story",
                "Wedding Details",
                "Travel Guide",
                "Registry",
                "RSVP",
              ].map((link, idx) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-600 hover:text-amber-600 transition-all duration-300 flex items-center gap-3 group text-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-amber-300/50"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4
              className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-tangerine)" }}
            >
              Get in Touch
            </h4>
            <div className="space-y-4 mb-8">
              <a
                href="mailto:wedding@shadetolu.com"
                className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center transition-all duration-300 border border-amber-200 group-hover:border-amber-400 group-hover:scale-110">
                  <Mail className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-sm">wedding@shadetolu.com</span>
              </a>
              <a
                href="tel:+2341234567890"
                className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center transition-all duration-300 border border-amber-200 group-hover:border-amber-400 group-hover:scale-110">
                  <Phone className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-sm">+234 123 456 7890</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-2xl bg-amber-50 hover:from-amber-400 hover:to-yellow-500 hover:bg-gradient-to-br flex items-center justify-center transition-all duration-300 hover:scale-110 group border border-amber-200 hover:border-transparent shadow-lg hover:shadow-amber-400/40"
              >
                <Instagram className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-2xl bg-amber-50 hover:from-amber-400 hover:to-yellow-500 hover:bg-gradient-to-br flex items-center justify-center transition-all duration-300 hover:scale-110 group border border-amber-200 hover:border-transparent shadow-lg hover:shadow-amber-400/40"
              >
                <Facebook className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>
            © 2025 Shade & Tolu. All rights reserved. Made with{" "}
            <Heart className="w-4 h-4 inline text-amber-500" /> in Lagos.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="hover:text-amber-600 transition-colors"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-amber-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          whileHover={{ scale: 1.15, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          transition={{ type: "spring", stiffness: 300 }}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-400 text-white shadow-2xl shadow-amber-500/40 hover:shadow-amber-400/60 flex items-center justify-center z-50 group border-2 border-white/20 backdrop-blur-sm"
        >
          <ArrowUp className="w-7 h-7 group-hover:-translate-y-1 transition-transform duration-300 drop-shadow-lg" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.button>
      )}
    </footer>
  );
};
