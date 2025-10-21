// "use client";

// import { FC, useState, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

// interface Testimonial {
//   name: string;
//   message: string;
//   date: string;
// }

// export const TestimonialsCarousel: FC = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   const fetchTestimonials = async () => {
//     try {
//       const response = await fetch("/api/messages");
//       const data = await response.json();

//       if (data.success && data.messages.length > 0) {
//         setTestimonials(data.messages);
//       }
//     } catch (error) {
//       console.error("Error fetching testimonials:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // If no testimonials, don't render
//   if (!loading && testimonials.length === 0) {
//     return null;
//   }

//   const goToPrevious = () => {
//     setCurrentIndex(
//       (prev) => (prev - 1 + testimonials.length) % testimonials.length
//     );
//   };

//   const goToNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   // Show loading state
//   if (loading) {
//     return (
//       <section className="py-16 md:py-24 px-6 relative overflow-hidden">
//         <div className="max-w-5xl mx-auto">
//           <div className="animate-pulse">
//             <div className="h-8 bg-amber-200/30 rounded-full w-64 mx-auto mb-4"></div>
//             <div className="h-64 bg-amber-200/20 rounded-3xl"></div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 md:py-24 px-6 relative overflow-hidden">
//       {/* Background Decorations */}
//       <div className="absolute inset-0 opacity-20 pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-tl from-purple-100 to-blue-100 rounded-full blur-3xl"></div>
//       </div>

//       {/* <div className="max-w-5xl mx-auto relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent font-playfair-display-sc mb-4">
//             Featured Messages
//           </h3>
//           <div className="relative inline-block">
//             <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full shadow-lg shadow-amber-400/50"></div>
//             <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
//           </div>
//         </motion.div>

//         <div className="relative">
//           {/* Testimonial Card */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -30 }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//               className="relative bg-white/40 backdrop-blur-lg rounded-[3rem] border-3 border-amber-200/60 shadow-2xl p-8 md:p-12"
//               style={{ willChange: "transform, opacity" }}
//             >
//               {/* Quote Icon */}
//               <motion.div
//                 initial={{ scale: 0, rotate: -180 }}
//                 animate={{ scale: 1, rotate: 0 }}
//                 transition={{ delay: 0.2, type: "spring" }}
//                 className="absolute top-8 left-8 w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-xl"
//               >
//                 <Quote className="w-8 h-8 text-white" />
//               </motion.div>

//               {/* Content */}
//               <div className="pt-20">
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="text-gray-800 text-lg md:text-xl leading-relaxed mb-8 italic"
//                 >
//                   "{testimonials[currentIndex].message}"
//                 </motion.p>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                   className="flex items-center gap-4"
//                 >
//                   <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg">
//                     <span className="text-white text-xl font-bold">
//                       {testimonials[currentIndex].name.charAt(0)}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="text-gray-900 font-bold text-lg">
//                       {testimonials[currentIndex].name}
//                     </p>
//                     <p className="text-amber-600 font-semibold text-sm">
//                       {new Date(
//                         testimonials[currentIndex].date
//                       ).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                         year: "numeric",
//                       })}
//                     </p>
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Decorative Corner */}
//               <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-amber-100/40 to-transparent rounded-tl-[3rem]"></div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Navigation Buttons */}
//           <motion.button
//             whileHover={{ scale: 1.1, x: -5 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={goToPrevious}
//             className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-[1.5rem] bg-white/40 hover:bg-white/60 backdrop-blur-md border-2 border-amber-200/60 hover:border-amber-400/80 flex items-center justify-center transition-all shadow-xl"
//           >
//             <ChevronLeft className="w-6 h-6 text-gray-700" />
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.1, x: 5 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={goToNext}
//             className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-[1.5rem] bg-white/40 hover:bg-white/60 backdrop-blur-md border-2 border-amber-200/60 hover:border-amber-400/80 flex items-center justify-center transition-all shadow-xl"
//           >
//             <ChevronRight className="w-6 h-6 text-gray-700" />
//           </motion.button>
//         </div>

//         {/* Dots Indicator */}
//         <div className="flex justify-center gap-3 mt-8">
//           {testimonials.map((_, index) => (
//             <motion.button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               whileHover={{ scale: 1.3 }}
//               whileTap={{ scale: 0.9 }}
//               className={`transition-all duration-300 rounded-full ${
//                 index === currentIndex
//                   ? "w-12 h-3 bg-gradient-to-r from-amber-400 to-yellow-500 shadow-lg shadow-amber-400/50"
//                   : "w-3 h-3 bg-gray-300 hover:bg-amber-300"
//               }`}
//             />
//           ))}
//         </div>
//       </div> */}
//     </section>
//   );
// };
