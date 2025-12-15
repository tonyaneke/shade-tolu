"use client";

import { FC, useState } from "react";
import { motion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { Heart, Plane, Home, Copy, Check } from "lucide-react";

interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

interface RegistrySectionProps {
  bankDetails?: BankDetails;
  className?: string;
}

const defaultBankDetails: BankDetails = {
  bankName: "Zenith",
  accountName: "Shade Odeleye",
  accountNumber: "2368681288",
};

const CopyButton: FC<{ text: string; label: string }> = ({ text, label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 rounded-full transition-colors text-amber-800 text-sm font-medium"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Copy {label}</span>
        </>
      )}
    </motion.button>
  );
};

export const RegistrySection: FC<RegistrySectionProps> = ({
  bankDetails = defaultBankDetails,
  className = "",
}) => {
  return (
    <section
      className={`py-24 px-6 bg-gradient-to-b from-amber-50/30 via-white to-amber-50/30 relative overflow-hidden ${className}`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-tl from-amber-100 to-yellow-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Title */}
        <ScrollReveal direction="up" className="text-center mb-12">
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
              Celebrate With Us
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
        </ScrollReveal>

        {/* Heartfelt Message */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-amber-100 mb-10">
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart className="w-12 h-12 text-amber-500 fill-amber-500/20" />
              </motion.div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed text-center mb-6">
              Your presence at our wedding is truly the greatest gift we could
              ask for. Celebrating this special day with you means the world to
              us, and we're so grateful for your love and support.
            </p>
            <p
              className="text-2xl md:text-3xl text-center mb-4"
              style={{
                fontFamily: "var(--font-tangerine)",
                color: "#D4AF37",
              }}
            >
              If you'd like to bless us further...
            </p>
            <p className="text-gray-600 text-center leading-relaxed">
              To help us keep things light and seamless, we would be grateful if
              cash gifts could be sent to the account details shared. Thank you.
            </p>
          </div>
        </ScrollReveal>

        {/* Gift Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Honeymoon Fund */}
        </div>

        {/* Bank Details */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-amber-200">
            <div className="text-center mb-6">
              <h3
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{
                  fontFamily: "var(--font-tangerine)",
                  color: "#D4AF37",
                }}
              >
                Bank Details
              </h3>
              <p className="text-gray-600 text-sm">
                For monetary gifts and contributions
              </p>
            </div>

            <div className="space-y-6">
              {/* Bank Name */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-amber-50/50 rounded-xl">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">
                    Bank Name
                  </p>
                  <p className="text-xl font-semibold text-gray-800">
                    {bankDetails.bankName}
                  </p>
                </div>
              </div>

              {/* Account Name */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-amber-50/50 rounded-xl">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1 font-medium">
                    Account Name
                  </p>
                  <p className="text-xl font-semibold text-gray-800">
                    {bankDetails.accountName}
                  </p>
                </div>
                <CopyButton text={bankDetails.accountName} label="Name" />
              </div>

              {/* Account Number */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-amber-50/50 rounded-xl">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1 font-medium">
                    Account Number
                  </p>
                  <p className="text-3xl font-bold text-amber-700 tracking-wider">
                    {bankDetails.accountNumber}
                  </p>
                </div>
                <CopyButton text={bankDetails.accountNumber} label="Number" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Thank You Message */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="mt-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <p
                className="text-3xl md:text-4xl mb-3"
                style={{
                  fontFamily: "var(--font-tangerine)",
                  color: "#D4AF37",
                }}
              >
                With Gratitude & Love
              </p>
              <p className="text-gray-600 italic">Shade & Tolu</p>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
