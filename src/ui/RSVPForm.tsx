"use client";

import { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ScrollReveal } from "./ScrollReveal";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Mail, User, MessageSquare } from "lucide-react";
import { AccessCard } from "./AccessCard";
import { submitRSVP } from "@/lib/api";

interface RSVPFormProps {
  className?: string;
}

export const RSVPForm: FC<RSVPFormProps> = ({ className = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    goodwillMessage: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [accessCode, setAccessCode] = useState("");

  const mutation = useMutation({
    mutationFn: submitRSVP,
    onSuccess: (data) => {
      setAccessCode(data.data.accessCode);
    },
    onError: (error: Error) => {
      setErrors({
        submit: error.message || "An error occurred. Please try again.",
      });
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (formData.goodwillMessage && formData.goodwillMessage.length > 250) {
      newErrors.goodwillMessage = "Message must be 250 characters or less";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    mutation.mutate({
      name: formData.name,
      email: formData.email,
      goodwillMessage: formData.goodwillMessage || undefined,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section
      className={`py-24 px-6 bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 relative overflow-hidden ${className}`}
    >
      {/* Modern Colorful Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-cyan-400 via-blue-400 to-purple-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section Title */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            Join Our Celebration
          </h2>
          <div className="relative inline-block">
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto rounded-full shadow-lg shadow-pink-500/50"></div>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-700 mt-6 text-lg max-w-xl mx-auto leading-relaxed">
            We can't wait to celebrate with you! Let us know you're coming.
          </p>
        </ScrollReveal>

        {/* Form or Access Card */}
        {mutation.isSuccess && accessCode ? (
          <ScrollReveal direction="up" delay={0.2} scale>
            <AccessCard name={formData.name} accessCode={accessCode} />
          </ScrollReveal>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Name Field Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 border-2 border-dashed border-purple-300/60 hover:border-purple-400">
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-sm"
                >
                  <User className="w-5 h-5 text-purple-500" />
                  Full Name *
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-2xl border-2 bg-gradient-to-r from-purple-50/50 to-pink-50/50 ${
                    errors.name ? "border-red-400" : "border-purple-200/60"
                  } focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all text-gray-800 font-medium`}
                  placeholder="Your beautiful name..."
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-2"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Email Field Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 border-2 border-dashed border-pink-300/60 hover:border-pink-400">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 mb-3 bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent font-bold text-sm"
                >
                  <Mail className="w-5 h-5 text-pink-500" />
                  Email Address *
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-2xl border-2 bg-gradient-to-r from-pink-50/50 to-orange-50/50 ${
                    errors.email ? "border-red-400" : "border-pink-200/60"
                  } focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all text-gray-800 font-medium`}
                  placeholder="hello@example.com"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-2"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Goodwill Message Field Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 border-2 border-dashed border-orange-300/60 hover:border-orange-400">
                <label
                  htmlFor="goodwillMessage"
                  className="flex items-center gap-2 mb-3 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent font-bold text-sm"
                >
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                  Goodwill Message (Optional)
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  id="goodwillMessage"
                  name="goodwillMessage"
                  value={formData.goodwillMessage}
                  onChange={handleChange}
                  rows={4}
                  maxLength={250}
                  className={`w-full px-4 py-3 rounded-2xl border-2 bg-gradient-to-r from-orange-50/50 to-pink-50/50 ${
                    errors.goodwillMessage
                      ? "border-red-400"
                      : "border-orange-200/60"
                  } focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all resize-none text-gray-800 font-medium`}
                  placeholder="Share your best wishes... 💕"
                />
                <div className="flex justify-between items-center mt-2">
                  <AnimatePresence>
                    {errors.goodwillMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm"
                      >
                        {errors.goodwillMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <p
                    className={`text-sm ml-auto font-semibold ${
                      formData.goodwillMessage.length > 250
                        ? "text-red-500"
                        : formData.goodwillMessage.length > 200
                        ? "text-orange-600"
                        : "text-gray-500"
                    }`}
                  >
                    {formData.goodwillMessage.length}/250
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Fun Submit Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
            >
              <motion.button
                type="submit"
                disabled={mutation.isPending}
                whileHover={{
                  scale: mutation.isPending ? 1 : 1.05,
                  rotate: mutation.isPending ? 0 : [0, -1, 1, -1, 0],
                }}
                whileTap={{ scale: mutation.isPending ? 1 : 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full py-6 rounded-full font-bold text-xl text-white transition-all duration-300 shadow-2xl hover:shadow-3xl overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                />

                {/* Sparkle effect on hover */}
                {!mutation.isPending && (
                  <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        style={{
                          top: `${20 + i * 15}%`,
                          left: `${10 + i * 15}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                )}

                <span className="relative z-10 flex items-center justify-center gap-3">
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span
                        className="text-xl"
                        style={{ fontFamily: "var(--font-tangerine)" }}
                      >
                        Sending...
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        className="text-2xl"
                        style={{ fontFamily: "var(--font-tangerine)" }}
                      >
                        Count Me In!
                      </span>
                      <motion.span
                        animate={{ rotate: [0, 14, -14, 0] }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      >
                        🎉
                      </motion.span>
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mt-4 p-4 bg-red-50 border-2 border-dashed border-red-300 rounded-2xl text-center"
                >
                  <p className="text-red-700 font-semibold">{errors.submit}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        )}
      </div>
    </section>
  );
};
