"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className = "" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Love Story", href: "/love-story" },
    { name: "Tribute", href: "/wedding-details" },
    { name: "Gallery", href: "/gallery" },
    { name: "Gifts", href: "/gifts" },
    { name: "RSVP", href: "/rsvp" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${
        scrolled ? "pt-3" : "pt-6"
      } ${className}`}
    >
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full max-w-5xl transition-all duration-700 ease-in-out ${
          scrolled || !isHomePage
            ? "bg-white/90 backdrop-blur-xl shadow-2xl shadow-gray-300/40 border-white/60"
            : "bg-transparent backdrop-blur-md shadow-lg shadow-gray-200/20 border-white/20"
        } rounded-full border relative overflow-visible`}
      >
        {/* Ambient glow effect */}
        <div
          className={`absolute -inset-[1px] bg-gradient-to-r from-amber-100/30 via-yellow-100/30 to-amber-100/30 rounded-full blur transition-opacity duration-700 -z-10 ${
            scrolled || !isHomePage ? "opacity-60" : "opacity-30"
          }`}
        ></div>

        <div
          className={`relative flex items-center transition-all duration-300 ${
            scrolled
              ? "px-4 py-[1.05rem] lg:py-[0.9rem]"
              : "px-6 py-[1.4rem] lg:py-[1.2rem]"
          }`}
        >
          {/* Logo - Positioned absolutely on the left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute left-4 lg:left-6"
          >
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={scrolled ? 68 : 90}
                  height={scrolled ? 68 : 90}
                  className="object-contain transition-all duration-300"
                  priority
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Right: Desktop Navigation Links - Right aligned */}
          <div className="hidden lg:flex items-center gap-1 justify-end flex-1 pr-4">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link key={index} href={link.href}>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`relative transition-all duration-300 font-medium text-sm tracking-wide group px-4 py-2 rounded-full font-playfair-display-sc ${
                      isActive
                        ? "text-amber-600"
                        : scrolled || !isHomePage
                        ? "text-gray-700 hover:text-amber-600"
                        : "text-white hover:text-amber-200"
                    }`}
                  >
                    <span className="relative z-10 whitespace-nowrap">
                      {link.name}
                    </span>
                    {/* Hover background */}
                    <motion.div
                      className={`absolute inset-0 rounded-full ${
                        scrolled || !isHomePage
                          ? "bg-amber-100/60"
                          : "bg-white/20"
                      }`}
                      initial={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.8,
                      }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Underline effect */}
                    <motion.div
                      className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full ${
                        scrolled || !isHomePage
                          ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400"
                          : "bg-gradient-to-r from-white via-amber-200 to-white"
                      }`}
                      initial={{ width: isActive ? "70%" : 0 }}
                      whileHover={{ width: "70%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button - Positioned absolutely on the right */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden absolute right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 transition-all shadow-lg shadow-amber-500/40"
          >
            <motion.div
              initial={false}
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu - Separate island below main nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden absolute top-full mt-4 left-4 right-4 bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200/60 shadow-2xl shadow-gray-300/40 overflow-hidden"
          >
            {/* Ambient glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-amber-100/40 via-yellow-100/40 to-amber-100/40 rounded-3xl blur opacity-50 -z-10"></div>

            <div className="p-4 space-y-1">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={index} href={link.href} onClick={handleLinkClick}>
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`block px-5 py-3.5 hover:bg-amber-100/60 rounded-2xl transition-all duration-300 font-medium font-playfair-display-sc relative group ${
                        isActive
                          ? "text-amber-600 bg-amber-100/60"
                          : "text-gray-700 hover:text-amber-600"
                      }`}
                    >
                      <span className="relative z-10">{link.name}</span>
                      {/* Animated gradient background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-200/0 via-amber-200/30 to-amber-200/0 rounded-2xl opacity-0 group-hover:opacity-100"
                        initial={false}
                        transition={{ duration: 0.3 }}
                      />
                      {/* Left accent bar */}
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-gradient-to-b from-amber-400 to-yellow-400 rounded-r"
                        initial={{ height: isActive ? "60%" : 0 }}
                        whileHover={{ height: "60%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
