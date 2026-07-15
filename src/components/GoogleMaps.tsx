"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { playPaperRustle } from "@/utils/audio";

interface GoogleMapsProps {
  embedUrl?: string;
  mapsLink: string;
  hallName: string;
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

/* ───────── Decorative Frame Corner ───────── */
const FrameCorner = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 40 40"
    className={`w-8 h-8 text-[#C8A46B] ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 38 L2 12 Q2 2 12 2 L38 2"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.6"
    />
    <path
      d="M6 38 L6 16 Q6 6 16 6 L38 6"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.3"
    />
    <circle cx="2" cy="38" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="38" cy="2" r="2" fill="currentColor" opacity="0.5" />
  </svg>
);

export default function GoogleMaps({ embedUrl, mapsLink, hallName }: GoogleMapsProps) {
  return (
    <section id="location" className="relative py-28 px-6 bg-[#F7F5F2] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C8A46B]/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto space-y-14 relative z-10">
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center space-y-5"
        >
          <span className="text-xs text-[#C8A46B] tracking-[0.3em] uppercase font-english">
            Location Map
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-arabic text-[#1A1A1A]">
            موقع الحفل
          </h2>
          <OrnamentalDivider />
        </motion.div>

        {/* ─── Map Container ─── */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: 1.5, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          onViewportEnter={() => playPaperRustle()}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative group"
        >
          {/* Outer glow */}
          <div className="absolute -inset-2 bg-gradient-to-b from-[#C8A46B]/10 via-[#C8A46B]/5 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />

          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-5 md:p-8 border border-[#DFD5C6]/50 shadow-xl group-hover:shadow-2xl group-hover:shadow-[#C8A46B]/10 transition-all duration-500 overflow-hidden">
            {/* Gold top border */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C8A46B] to-transparent" />
            {/* Gold bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C8A46B]/40 to-transparent" />

            {/* Corner decorations */}
            <FrameCorner className="absolute top-3 left-3" />
            <FrameCorner className="absolute top-3 right-3 -scale-x-100" />
            <FrameCorner className="absolute bottom-3 left-3 -scale-y-100" />
            <FrameCorner className="absolute bottom-3 right-3 scale-x-[-1] scale-y-[-1]" />

            {/* Embedded Map */}
            {embedUrl ? (
              <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-[#DFD5C6]/40 shadow-inner bg-[#EFECE7] ring-1 ring-[#C8A46B]/10">
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(15%) contrast(90%) saturate(85%)" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقع قاعة الزفاف"
                />
              </div>
            ) : (
              <div className="w-full aspect-[16/9] rounded-2xl border-2 border-dashed border-[#C8A46B]/30 flex flex-col items-center justify-center bg-gradient-to-br from-[#F7F5F2] to-[#DFD5C6]/10 text-center p-8">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-[#C8A46B]/10 rounded-full blur-xl scale-150 animate-pulse" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#C8A46B]/20 to-[#DFD5C6]/30 border border-[#C8A46B]/30 flex items-center justify-center">
                    <MapPin className="w-10 h-10 text-[#C8A46B]" strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-sm font-arabic text-gray-600 leading-relaxed">
                  اضغط على الزر أدناه لفتح الخريطة والاتجاهات
                </p>
              </div>
            )}

            {/* Map Info and Action */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-2">
              <div className="text-right space-y-2">
                <div className="flex items-center gap-3 justify-end">
                  <h3 className="text-lg font-bold font-arabic text-[#1A1A1A]">{hallName}</h3>
                  <div className="w-8 h-8 rounded-lg bg-[#C8A46B]/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#C8A46B]" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-arabic">
                  اضغط على زر الاتجاهات للذهاب مباشرة إلى خرائط Google
                </p>
              </div>

              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C8A46B] to-[#9E7D46] text-white rounded-2xl font-arabic text-sm font-semibold shadow-lg shadow-[#C8A46B]/25 hover:shadow-xl hover:shadow-[#C8A46B]/35 transition-all duration-300 w-full sm:w-auto justify-center overflow-hidden group/btn"
              >
                {/* Button shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                <Navigation className="w-4 h-4 rotate-45 relative z-10" />
                <span className="relative z-10">فتح الموقع والاتجاهات</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
