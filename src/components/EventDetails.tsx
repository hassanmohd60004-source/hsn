"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";

interface EventDetailsProps {
  hallName: string;
  address: string;
  gregorianDate: string;
  hijriDate: string;
}

/* ───────── Ornamental SVG Divider ───────── */
const OrnamentalDivider = () => (
  <svg
    viewBox="0 0 400 40"
    className="w-48 md:w-64 h-8 mx-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 20 Q50 0 100 20 T200 20 T300 20 T400 20"
      stroke="#C8A46B"
      strokeWidth="1"
      opacity="0.5"
    />
    <circle cx="200" cy="20" r="4" fill="#C8A46B" opacity="0.8" />
    <circle cx="170" cy="20" r="2" fill="#C8A46B" opacity="0.4" />
    <circle cx="230" cy="20" r="2" fill="#C8A46B" opacity="0.4" />
    <path d="M185 14 L200 8 L215 14" stroke="#C8A46B" strokeWidth="1" opacity="0.6" />
    <path d="M185 26 L200 32 L215 26" stroke="#C8A46B" strokeWidth="1" opacity="0.6" />
    <line x1="50" y1="20" x2="160" y2="20" stroke="#C8A46B" strokeWidth="0.5" opacity="0.3" />
    <line x1="240" y1="20" x2="350" y2="20" stroke="#C8A46B" strokeWidth="0.5" opacity="0.3" />
  </svg>
);

/* ───────── Corner Flourish ───────── */
const CornerFlourish = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 60 60"
    className={`w-10 h-10 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 55 Q5 30 20 20 Q30 15 40 10 Q50 5 55 5"
      stroke="#C8A46B"
      strokeWidth="1.2"
      opacity="0.4"
      fill="none"
    />
    <path
      d="M10 55 Q10 35 25 25 Q35 18 50 10"
      stroke="#C8A46B"
      strokeWidth="0.8"
      opacity="0.25"
      fill="none"
    />
    <circle cx="55" cy="5" r="2" fill="#C8A46B" opacity="0.5" />
  </svg>
);

/* ───────── Card data ───────── */
const getCards = (hallName: string, address: string, gregorianDate: string, hijriDate: string) => [
  {
    icon: MapPin,
    label: "مكان الحفل",
    primary: hallName,
    secondary: address,
    accent: true,
  },
  {
    icon: Calendar,
    label: "تاريخ الحفل",
    primary: gregorianDate,
    secondary: hijriDate,
    accent: false,
  },
  {
    icon: Clock,
    label: "التوقيت",
    primary: "٤:٠٠ عصراً",
    secondary: "يسعدنا حضوركم في الموعد المحدد لمشاركتنا البهجة",
    accent: false,
  },
];

export default function EventDetails({
  hallName,
  address,
  gregorianDate,
  hijriDate,
}: EventDetailsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const cards = getCards(hallName, address, gregorianDate, hijriDate);

  return (
    <section id="details" className="relative py-28 px-6 bg-[#F7F5F2] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#C8A46B]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C8A46B]/[0.04] rounded-full blur-3xl" />
        {/* Subtle radial pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #C8A46B 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center space-y-5"
        >
          <span className="text-xs text-[#C8A46B] tracking-[0.3em] uppercase font-english">
            Event Details
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-arabic text-[#1A1A1A]">
            تفاصيل المناسبة
          </h2>
          <OrnamentalDivider />
        </motion.div>

        {/* ─── Cards Grid ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.35, ease: "easeOut" } }}
                className="group relative"
              >
                {/* Glow behind card on hover */}
                <div className="absolute -inset-1 bg-gradient-to-b from-[#C8A46B]/20 via-[#C8A46B]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-[#DFD5C6]/50 shadow-sm group-hover:shadow-2xl group-hover:shadow-[#C8A46B]/10 group-hover:border-[#C8A46B]/50 transition-all duration-500 flex flex-col items-center text-center overflow-hidden">
                  {/* Gold top border accent */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-transparent via-[#C8A46B] to-transparent transition-all duration-700" />

                  {/* Corner flourishes */}
                  <CornerFlourish className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CornerFlourish className="absolute bottom-2 left-2 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-[#C8A46B]/10 rounded-2xl blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F7F5F2] to-[#DFD5C6]/30 border border-[#DFD5C6]/50 flex items-center justify-center text-[#C8A46B] group-hover:bg-gradient-to-br group-hover:from-[#C8A46B] group-hover:to-[#9E7D46] group-hover:text-white group-hover:border-[#C8A46B] group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-[#C8A46B]/20">
                      <Icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-bold font-arabic text-[#1A1A1A] mb-3">
                    {card.label}
                  </h3>

                  {/* Tiny gold divider */}
                  <div className="w-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#C8A46B] to-transparent mb-4 group-hover:w-16 transition-all duration-500" />

                  {/* Primary */}
                  <p
                    className={`text-base font-semibold font-arabic mb-2 ${
                      card.accent ? "text-[#C8A46B]" : "text-[#1A1A1A]"
                    }`}
                  >
                    {card.primary}
                  </p>

                  {/* Secondary */}
                  <p className="text-sm text-gray-500 font-arabic leading-relaxed">
                    {card.secondary}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
