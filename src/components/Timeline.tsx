"use client";

import React from "react";
import { motion } from "framer-motion";
import { TimelineEvent } from "@/config/wedding";

interface TimelineProps {
  events: TimelineEvent[];
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

/* ───────── Decorative end cap for the timeline ───────── */
const TimelineEndCap = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2 L14 8 L20 8 L15 12 L17 18 L12 14 L7 18 L9 12 L4 8 L10 8 Z"
      fill="#C8A46B"
      opacity="0.6"
    />
  </svg>
);

export default function Timeline({ events }: TimelineProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="timeline" className="relative py-28 px-6 bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#C8A46B]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#C8A46B]/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto space-y-16 relative z-10">
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center space-y-5"
        >
          <span className="text-xs text-[#C8A46B] tracking-[0.3em] uppercase font-english">
            Schedule Timeline
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-arabic text-[#1A1A1A]">
            برنامج الحفل
          </h2>
          <OrnamentalDivider />
        </motion.div>

        {/* ─── Timeline ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mr-4 md:mr-8 space-y-10 pb-4"
        >
          {/* Gold connecting line */}
          <div className="absolute top-2 right-[-1px] md:right-[-1px] bottom-2 w-[2px]">
            <div className="w-full h-full bg-gradient-to-b from-[#C8A46B]/60 via-[#C8A46B]/40 to-[#C8A46B]/10 rounded-full" />
          </div>

          {events.map((event, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative pr-10 md:pr-14 group"
            >
              {/* ── Gold circle node with glow ── */}
              <div className="absolute top-5 right-[-9px] md:right-[-9px] z-10">
                {/* Glow ring */}
                <div className="absolute -inset-2 bg-[#C8A46B]/15 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                {/* Outer ring */}
                <div className="relative w-[18px] h-[18px] rounded-full border-2 border-[#C8A46B] bg-white flex items-center justify-center group-hover:border-[#9E7D46] transition-colors duration-300 shadow-sm group-hover:shadow-md group-hover:shadow-[#C8A46B]/30">
                  {/* Inner dot */}
                  <div className="w-2 h-2 rounded-full bg-[#C8A46B] group-hover:bg-[#9E7D46] group-hover:scale-125 transition-all duration-300" />
                </div>
              </div>

              {/* ── Event card ── */}
              <div className="relative bg-[#F7F5F2]/60 backdrop-blur-sm border border-[#DFD5C6]/30 hover:border-[#C8A46B]/40 rounded-2xl p-5 md:p-7 transition-all duration-500 group-hover:bg-white/80 group-hover:shadow-xl group-hover:shadow-[#C8A46B]/5 overflow-hidden">
                {/* Subtle left border accent on hover */}
                <div className="absolute top-3 right-0 bottom-3 w-[2px] bg-[#C8A46B] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                  {/* Time badge */}
                  <div className="flex items-center gap-3 min-w-[90px]">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#C8A46B]/10 to-[#DFD5C6]/20 border border-[#C8A46B]/20 text-sm font-bold font-arabic text-[#9E7D46] tracking-wide group-hover:from-[#C8A46B]/20 group-hover:to-[#DFD5C6]/30 group-hover:border-[#C8A46B]/40 transition-all duration-500">
                      {event.time}
                    </span>
                  </div>

                  {/* Separator */}
                  <div className="hidden md:flex items-center">
                    <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[#C8A46B]/30 to-transparent" />
                  </div>

                  {/* Event title */}
                  <h3 className="text-base md:text-lg font-semibold font-arabic text-[#1A1A1A] group-hover:text-[#9E7D46] transition-colors duration-300">
                    {event.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}

          {/* ── Timeline end cap ── */}
          <div className="absolute bottom-[-8px] right-[-11px] md:right-[-11px]">
            <TimelineEndCap />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
