"use client";

import { FC } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";

interface WeddingEvent {
  id: number;
  title: string;
  time: string;
  date: string;
  location: string;
  address: string;
  description: string;
  mapUrl?: string;
  image: string;
}

interface EventsScheduleProps {
  events?: WeddingEvent[];
  className?: string;
}

const defaultEvents: WeddingEvent[] = [
  {
    id: 1,
    title: "Traditional Wedding",
    time: "8:00 AM - 11:00 AM",
    date: "December 26, 2025",
    location: "K&M Event Center",
    address: "1 Dayo Kuye Cl, Ifako-Ijaiye, Lagos, Nigeria",
    description:
      "Join us for our traditional Nigerian wedding ceremony as we honor our heritage and celebrate with our families in the customary way.",
    mapUrl: "https://maps.google.com/?q=K%26M+Event+Center+Ifako-Ijaiye+Lagos",
    image: "/trad.png",
  },
  {
    id: 2,
    title: "Church Ceremony",
    time: "11:00 AM - 1:00 PM",
    date: "December 26, 2025",
    location: "Heritage of Faith",
    address: "Inside LTV 8 Agidingbi opposite Coca-Cola, Lagos, Nigeria",
    description:
      "Witness our sacred vows as we exchange promises before God in the beautiful Heritage of Faith church. The ceremony will be followed by photo sessions.",
    mapUrl:
      "https://maps.google.com/?q=Heritage+of+Faith+LTV+8+Agidingbi+Lagos",
    image: "/church.png",
  },
  {
    id: 3,
    title: "Reception & Dinner",
    time: "3:00 PM - 9:00 PM",
    date: "December 26, 2025",
    location: "K&M Event Center",
    address: "1 Dayo Kuye Cl, Ifako-Ijaiye, Lagos, Nigeria",
    description:
      "Celebrate with us at an elegant reception featuring cocktails, dinner, live music, and dancing. Let's create unforgettable memories together!",
    mapUrl: "https://maps.google.com/?q=K%26M+Event+Center+Ifako-Ijaiye+Lagos",
    image: "/nigeria-wedding.png",
  },
];

const EventCard: FC<{ event: WeddingEvent; index: number }> = ({
  event,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      {/* Card */}
      <div className="border border-amber-200/30 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300">
        {/* Image */}
        <div className="relative h-[590px] w-full overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Title */}
          <h3
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            {event.title}
          </h3>

          {/* Time */}
          <div className="flex items-center gap-2 text-amber-600 mb-4">
            <Clock className="w-5 h-5" />
            <span className="text-lg font-medium">{event.time}</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Location */}
          <div className="flex items-start gap-3 mb-6 p-4 bg-amber-50/50 rounded-2xl border border-amber-100">
            <MapPin className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">{event.location}</p>
              <p className="text-sm text-gray-600">{event.address}</p>
            </div>
          </div>

          {/* Button */}
          {event.mapUrl && (
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto border-2 border-amber-400 text-amber-700 rounded-full px-8 py-3 font-medium hover:bg-amber-50 transition-all"
              >
                View Map
              </motion.button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const EventsSchedule: FC<EventsScheduleProps> = ({
  events = defaultEvents,
  className = "",
}) => {
  return (
    <section
      className={`py-24 px-6 bg-gradient-to-b from-white via-amber-50/20 to-white relative overflow-hidden ${className}`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-gradient-to-tl from-amber-100 to-yellow-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            Wedding Schedule
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full mb-4"></div>
          <p
            className="text-gray-700 text-xl md:text-2xl max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            December 26, 2025 • Three beautiful celebrations in one
            unforgettable day
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 via-yellow-400 to-amber-400"></div>

          {/* Events */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <div key={event.id} className="relative md:pl-20">
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  className="hidden md:block absolute left-[1.4rem] top-8 w-4 h-4 rounded-full bg-amber-400 border-4 border-white shadow-lg"
                />

                <EventCard event={event} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Important Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 border border-amber-200/30 rounded-3xl bg-white p-8 shadow-sm"
        >
          <h3
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            Important Details
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-amber-100 rounded-2xl p-5 bg-amber-50/30">
              <p className="text-sm text-gray-600 font-semibold mb-1 uppercase tracking-wide">
                Dress Code
              </p>
              <p className="text-gray-900 font-medium">
                Traditional: Nigerian Attire • Church & Reception: Formal/Black
                Tie
              </p>
            </div>

            <div className="border border-amber-100 rounded-2xl p-5 bg-amber-50/30">
              <p className="text-sm text-gray-600 font-semibold mb-1 uppercase tracking-wide">
                Parking
              </p>
              <p className="text-gray-900 font-medium">
                Ample parking available at all venues
              </p>
            </div>

            <div className="border border-amber-100 rounded-2xl p-5 bg-amber-50/30">
              <p className="text-sm text-gray-600 font-semibold mb-1 uppercase tracking-wide">
                COVID-19
              </p>
              <p className="text-gray-900 font-medium">
                Please follow local health guidelines
              </p>
            </div>

            <div className="border border-amber-100 rounded-2xl p-5 bg-amber-50/30">
              <p className="text-sm text-gray-600 font-semibold mb-1 uppercase tracking-wide">
                RSVP Deadline
              </p>
              <p className="text-gray-900 font-medium">December 10, 2025</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
