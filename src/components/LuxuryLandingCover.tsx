"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LuxuryLandingCoverProps {
  brideName: string;
  groomName: string;
  onExplore?: () => void;
}

/** Delicate Luxury Gold Corner Ornaments */
function GoldCornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={`w-8 h-8 md:w-10 md:h-10 text-[#C8A46A] ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 58 C 2 30, 20 12, 58 2"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M8 58 C 8 36, 26 18, 58 8"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <circle cx="58" cy="2" r="2" fill="currentColor" opacity="0.7" />
      <path
        d="M22 22 Q 28 14 36 22 Q 28 30 22 22 Z"
        fill="currentColor"
        opacity="0.25"
      />
    </svg>
  );
}

/** Luxury Center Monogram Badge with W */
function LuxuryMonogram() {
  return (
    <div className="relative flex items-center justify-center my-2">
      {/* Left Thin Gold Line */}
      <div className="w-16 md:w-32 h-[0.75px] bg-gradient-to-r from-transparent via-[#C8A46A]/60 to-[#C8A46A]" />

      {/* Monogram Circle Container */}
      <div className="mx-4 relative w-11 h-11 md:w-13 md:h-13 rounded-full border border-[#C8A46A]/40 flex items-center justify-center bg-[#FCFBF8] shadow-[0_0_15px_rgba(200,164,106,0.12)]">
        <div className="absolute inset-[3px] rounded-full border border-[#C8A46A]/20 pointer-events-none" />
        <span
          className="text-[#C8A46A] text-lg md:text-xl font-serif tracking-widest pl-0.5"
          style={{ fontFamily: "var(--font-cinzel), 'Cinzel', serif" }}
        >
          W
        </span>
      </div>

      {/* Right Thin Gold Line */}
      <div className="w-16 md:w-32 h-[0.75px] bg-gradient-to-l from-transparent via-[#C8A46A]/60 to-[#C8A46A]" />
    </div>
  );
}

/** Bottom Luxury Ornament Divider */
function BottomGoldOrnament() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className="w-12 md:w-24 h-[0.75px] bg-gradient-to-r from-transparent to-[#C8A46A]/60" />
      <div className="w-2 h-2 rotate-45 border border-[#C8A46A] bg-[#FCFBF8]" />
      <div className="w-12 md:w-24 h-[0.75px] bg-gradient-to-l from-transparent to-[#C8A46A]/60" />
    </div>
  );
}

export default function LuxuryLandingCover({
  brideName,
  groomName,
  onExplore,
}: LuxuryLandingCoverProps) {
  return (
    <section className="relative min-h-screen w-full bg-[#FCFBF8] flex flex-col items-center justify-between py-12 px-4 md:px-8 text-center overflow-hidden select-none">
      {/* Background Subtle Soft Light Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-[#C8A46A]/[0.025] rounded-full blur-3xl" />
      </div>

      {/* Outer Border / Frame */}
      <div className="absolute inset-4 md:inset-8 border border-[#C8A46A]/20 rounded-xl pointer-events-none" />
      <div className="absolute inset-5 md:inset-9 border border-[#C8A46A]/10 rounded-lg pointer-events-none" />

      {/* Top Corner Ornaments */}
      <GoldCornerFlourish className="absolute top-6 left-6 md:top-10 md:left-10" />
      <GoldCornerFlourish className="absolute top-6 right-6 md:top-10 md:right-10 -scale-x-100" />
      <GoldCornerFlourish className="absolute bottom-6 left-6 md:bottom-10 md:left-10 -scale-y-100" />
      <GoldCornerFlourish className="absolute bottom-6 right-6 md:bottom-10 md:right-10 scale-x-[-1] scale-y-[-1]" />

      {/* ─── 1. TOP HEADER & MONOGRAM ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-xl pt-4 z-10 flex flex-col items-center"
      >
        <LuxuryMonogram />

        {/* Title: A DAY THAT WILL BE UNFORGETTABLE */}
        <h2
          className="text-[24px] sm:text-[28px] md:text-[42px] text-[#555555] font-serif uppercase tracking-[4px] mt-4 font-light leading-snug"
          style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
        >
          A DAY THAT WILL BE
          <span className="block mt-1 font-normal tracking-[5px] text-[#444444]">
            UNFORGETTABLE
          </span>
        </h2>
      </motion.div>

      {/* ─── 2. MAIN WATERCOLOR ILLUSTRATION ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="relative my-6 w-full max-w-[850px] flex items-center justify-center z-10"
      >
        {/* Soft Radial Glow behind artwork */}
        <div className="absolute inset-0 bg-white/80 rounded-full blur-2xl scale-90 pointer-events-none" />

        {/* Watercolor Venue Image with Screen/Natural Blend */}
        <div className="relative w-[90%] md:w-[75%] max-w-[700px] overflow-hidden rounded-2xl">
          <Image
            src="/images/venue_watercolor.jpg"
            alt="Venue Watercolor Illustration"
            width={900}
            height={650}
            priority
            className="w-full h-auto object-contain mix-blend-screen filter contrast-[1.05] brightness-[1.02]"
            style={{
              maskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
            }}
          />
        </div>
      </motion.div>

      {/* ─── 3. COUPLE NAMES & BOTTOM ORNAMENT ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="w-full max-w-md pb-4 z-10 flex flex-col items-center"
      >
        {/* Couple Names */}
        <div className="flex flex-col items-center justify-center space-y-1">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl text-[#444444] font-normal leading-tight"
            style={{ fontFamily: "var(--font-great-vibes), 'Great Vibes', cursive" }}
          >
            {groomName}
          </h1>
          <span
            className="text-2xl md:text-3xl text-[#C8A46A] font-serif font-light my-1"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            &
          </span>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl text-[#444444] font-normal leading-tight"
            style={{ fontFamily: "var(--font-great-vibes), 'Great Vibes', cursive" }}
          >
            {brideName}
          </h1>
        </div>

        {/* Bottom Ornament */}
        <BottomGoldOrnament />

        {/* Optional Interactive Explore Button / Scroll Indicator */}
        {onExplore && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={onExplore}
            className="mt-4 px-6 py-2.5 rounded-full border border-[#C8A46A]/40 text-xs text-[#666666] tracking-[2px] font-serif uppercase bg-white/60 hover:bg-white hover:border-[#C8A46A] shadow-sm transition-all duration-300 cursor-pointer"
            style={{ fontFamily: "var(--font-cinzel), 'Cinzel', serif" }}
          >
            فتح الدعوة الرسمية
          </motion.button>
        )}
      </motion.div>
    </section>
  );
}
