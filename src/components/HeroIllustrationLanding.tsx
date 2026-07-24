"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeroIllustrationLandingProps {
  brideName: string;
  groomName: string;
  brideNameEn?: string;
  groomNameEn?: string;
}

/* ───────── Top Corner Botanical Leaf Flourish (Gold Line-Art) ───────── */
function TopCornerBotanical({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main curved branch */}
      <path
        d="M20 105 C25 70, 45 40, 95 20"
        stroke="#C8A46A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Natural delicate leaves */}
      <path
        d="M32 85 C24 78, 18 67, 27 60 C36 66, 40 76, 32 85 Z"
        stroke="#C8A46A"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M50 64 C40 57, 34 46, 43 39 C52 45, 55 56, 50 64 Z"
        stroke="#C8A46A"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M72 42 C64 34, 59 21, 70 15 C79 22, 79 33, 72 42 Z"
        stroke="#C8A46A"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M95 22 C90 12, 80 5, 88 1 C96 6, 100 14, 95 22 Z"
        stroke="#C8A46A"
        strokeWidth="1"
        fill="none"
      />
      {/* Opposite leaves */}
      <path
        d="M40 90 C49 82, 60 84, 62 94 C51 96, 44 92, 40 90 Z"
        stroke="#C8A46A"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M60 70 C70 63, 79 65, 81 76 C70 78, 62 74, 60 70 Z"
        stroke="#C8A46A"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M80 48 C90 41, 99 43, 101 54 C90 56, 82 52, 80 48 Z"
        stroke="#C8A46A"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

/* ───────── Luxury Gold Monogram "W" Symbol (Exact match to reference) ───────── */
function GoldMonogramW({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 90"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ornate crown emblem atop Monogram */}
      <path
        d="M45 5 L48 14 L55 9 L51 18 L58 20 L49 24 L45 20 L41 24 L32 20 L39 18 L35 9 L42 14 Z"
        stroke="#C8A46A"
        strokeWidth="1.1"
        fill="none"
      />
      <circle cx="45" cy="4" r="1.5" fill="#C8A46A" />

      {/* Main Calligraphic Serif W letter */}
      <path
        d="M20 32 H28 M24 32 L34 76 L45 44 L56 76 L66 32 M62 32 H70"
        stroke="#C8A46A"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Decorative intertwined flourishes */}
      <path
        d="M28 46 Q45 36 62 46"
        stroke="#C8A46A"
        strokeWidth="0.9"
        opacity="0.85"
      />
      <path
        d="M34 62 Q45 70 56 62"
        stroke="#C8A46A"
        strokeWidth="0.9"
        opacity="0.85"
      />

      {/* Bottom accent diamond */}
      <polygon points="45,82 48,85 45,88 42,85" fill="#C8A46A" />
    </svg>
  );
}

/* ───────── Bottom Luxury Gold Ornament ───────── */
function BottomGoldOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 30"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Extended left line */}
      <line x1="0" y1="15" x2="80" y2="15" stroke="#C8A46A" strokeWidth="0.8" opacity="0.6" />

      {/* Central Arabesque Emblem */}
      <g transform="translate(100, 15)">
        <circle cx="0" cy="0" r="3" fill="#C8A46A" />
        <path d="M-8 0 Q0 -8 8 0 Q0 8 -8 0 Z" stroke="#C8A46A" strokeWidth="0.8" fill="none" />
        <path d="M0 -8 Q8 0 0 8 Q-8 0 0 -8 Z" stroke="#C8A46A" strokeWidth="0.8" fill="none" />
        <circle cx="-12" cy="0" r="1.5" fill="#C8A46A" opacity="0.7" />
        <circle cx="12" cy="0" r="1.5" fill="#C8A46A" opacity="0.7" />
      </g>

      {/* Extended right line */}
      <line x1="120" y1="15" x2="200" y2="15" stroke="#C8A46A" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

export default function HeroIllustrationLanding({
  brideName,
  groomName,
  brideNameEn = "Noura",
  groomNameEn = "Ahmed",
}: HeroIllustrationLandingProps) {
  // Animation configs per specs
  const pageFade = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.0, ease: "easeOut" as const },
    },
  };

  const imageScale = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 },
    },
  };

  const textFadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: "easeOut" as const, delay: 0.4 },
    },
  };

  return (
    <section
      id="hero-landing"
      className="relative w-full min-h-screen flex flex-col items-center justify-between py-8 md:py-14 px-4 bg-[#FCFBF8] text-[#444444] overflow-hidden select-none"
    >
      {/* ─── 1. TOP FRAME & DECORATION ─── */}
      <motion.div
        variants={pageFade}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl mx-auto relative flex flex-col items-center pt-2 md:pt-4"
      >
        {/* Top-Left Corner Botanical Branch */}
        <div className="absolute top-0 left-2 md:left-6 w-16 md:w-24 h-16 md:h-24 pointer-events-none">
          <TopCornerBotanical className="w-full h-full" />
        </div>

        {/* Top-Right Corner Botanical Branch */}
        <div className="absolute top-0 right-2 md:right-6 w-16 md:w-24 h-16 md:h-24 pointer-events-none -scale-x-100">
          <TopCornerBotanical className="w-full h-full" />
        </div>

        {/* Side Vertical Framing Lines (matching reference design) */}
        <div className="absolute top-12 md:top-16 left-3 md:left-8 w-[0.8px] h-36 md:h-52 bg-gradient-to-b from-[#C8A46A]/60 via-[#C8A46A]/30 to-transparent pointer-events-none" />
        <div className="absolute top-12 md:top-16 right-3 md:right-8 w-[0.8px] h-36 md:h-52 bg-gradient-to-b from-[#C8A46A]/60 via-[#C8A46A]/30 to-transparent pointer-events-none" />

        {/* Top Horizontal Line with Monogram in Center */}
        <div className="w-full flex items-center justify-center gap-4 px-12 md:px-24 mb-4">
          <div className="flex-1 h-[0.8px] bg-gradient-to-r from-transparent via-[#C8A46A]/50 to-[#C8A46A]/80" />
          {/* Monogram W */}
          <div className="relative z-10 p-1">
            <GoldMonogramW className="w-12 h-12 md:w-16 md:h-16 text-[#C8A46A]" />
          </div>
          <div className="flex-1 h-[0.8px] bg-gradient-to-l from-transparent via-[#C8A46A]/50 to-[#C8A46A]/80" />
        </div>

        {/* Title Text */}
        <motion.div
          variants={textFadeUp}
          initial="hidden"
          animate="visible"
          className="text-center space-y-1 md:space-y-2 mt-2 px-4"
        >
          <h2
            className="text-[20px] sm:text-[28px] md:text-[38px] lg:text-[42px] font-normal tracking-[0.22em] text-[#555555] uppercase leading-tight font-cinzel"
            style={{ fontFamily: "var(--font-cinzel), 'Cinzel', serif" }}
          >
            A DAY THAT WILL BE
          </h2>
          <h2
            className="text-[20px] sm:text-[28px] md:text-[38px] lg:text-[42px] font-normal tracking-[0.22em] text-[#555555] uppercase leading-tight font-cinzel"
            style={{ fontFamily: "var(--font-cinzel), 'Cinzel', serif" }}
          >
            UNFORGETTABLE
          </h2>
        </motion.div>
      </motion.div>

      {/* ─── 2. MAIN WATERCOLOR VENUE ILLUSTRATION ─── */}
      <motion.div
        variants={imageScale}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-2xl md:max-w-3xl my-6 md:my-8 flex items-center justify-center px-4"
      >
        {/* Soft subtle white glow & background fade behind image */}
        <div className="absolute inset-0 bg-radial from-white via-white/80 to-transparent blur-2xl rounded-full scale-110 pointer-events-none" />

        {/* Main Artwork Container */}
        <div className="relative w-[92%] sm:w-[85%] md:w-[75%] max-w-[650px] aspect-[4/3] sm:aspect-[16/11]">
          {/* Background softness blending mask */}
          <img
            src="/images/venue_illustration.jpg"
            alt="Venue Watercolor Illustration"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(200,164,106,0.08)] transition-all duration-700"
          />
        </div>
      </motion.div>

      {/* ─── 3. COUPLE NAMES & BOTTOM ORNAMENT ─── */}
      <motion.div
        variants={textFadeUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl mx-auto text-center flex flex-col items-center pb-4 md:pb-8"
      >
        {/* English Script Names */}
        <div
          className="flex items-center justify-center gap-3 sm:gap-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#333333] tracking-wide my-2"
          style={{ fontFamily: "var(--font-great-vibes), 'Great Vibes', cursive" }}
        >
          <span>{groomNameEn}</span>
          <span className="text-[#C8A46A] font-light font-cormorant text-3xl sm:text-4xl md:text-5xl italic px-1">
            &
          </span>
          <span>{brideNameEn}</span>
        </div>

        {/* Arabic Names subtitle (subtle luxury addition) */}
        <p className="text-xs sm:text-sm font-arabic text-[#777777] tracking-widest mt-1 mb-4">
          {groomName} & {brideName}
        </p>

        {/* Bottom Gold Arabesque Ornament */}
        <div className="w-48 sm:w-64 md:w-80 h-6 flex items-center justify-center my-2">
          <BottomGoldOrnament className="w-full h-full" />
        </div>
      </motion.div>
    </section>
  );
}
