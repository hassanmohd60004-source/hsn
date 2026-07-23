"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HeroInvitationProps {
  brideName: string;
  groomName: string;
  countdownDate: string;
  hijriDate: string;
  gregorianDate: string;
}

/** Elegant botanical branch vector illustration for opposite corners */
function BotanicalBranch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.0"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Delicate main stem */}
      <path d="M10 110 C 35 90, 65 55, 105 15" />
      {/* Detailed hand-drawn leaves */}
      <path d="M35 85 C 22 75, 25 62, 42 70 C 42 70 38 80 35 85 Z" fill="currentColor" fillOpacity="0.03" />
      <path d="M52 68 C 38 58, 42 45, 58 52 C 58 52 55 62 52 68 Z" fill="currentColor" fillOpacity="0.03" />
      <path d="M70 50 C 58 38, 62 25, 78 32 C 78 32 75 42 70 50 Z" fill="currentColor" fillOpacity="0.03" />
      <path d="M88 32 C 78 20, 82 8, 95 15 C 95 15 92 25 88 32 Z" fill="currentColor" fillOpacity="0.03" />
      {/* Opposite leaves */}
      <path d="M28 92 C 40 102, 50 92, 40 85 C 40 85 32 88 28 92 Z" fill="currentColor" fillOpacity="0.03" />
      <path d="M45 75 C 58 85, 68 75, 58 68 C 58 68 50 70 45 75 Z" fill="currentColor" fillOpacity="0.03" />
      <path d="M62 57 C 75 67, 85 57, 75 50 C 75 50 68 52 62 57 Z" fill="currentColor" fillOpacity="0.03" />
      <path d="M80 38 C 92 48, 102 38, 92 31 C 92 31 85 33 80 38 Z" fill="currentColor" fillOpacity="0.03" />
    </svg>
  );
}

/** Helper to convert standard digits to Arabic Eastern digits */
function toArabicNums(val: number | string): string {
  const str = typeof val === "number" ? val.toString().padStart(2, "0") : val;
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return str
    .split("")
    .map((d) => (isNaN(parseInt(d)) ? d : arabicDigits[parseInt(d)]))
    .join("");
}

export default function HeroInvitation({
  brideName,
  groomName,
  countdownDate,
  hijriDate,
  gregorianDate,
}: HeroInvitationProps) {
  // Dynamic parsing of gregorianDate prop (e.g. "الأربعاء، ١٢ أغسطس ٢٠٢٦ م")
  const dateClean = (gregorianDate || "").replace("،", "");
  const dateParts = dateClean.split(" ");
  const dayName = dateParts[0] || "الخميس";
  const dayNumber = dateParts[1] || "13";
  const monthName = dateParts[2] || "أغسطس";
  const yearName = (dateParts[3] || "٢٠٢٦") + " " + (dateParts[4] || "م");

  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(countdownDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [countdownDate]);

  // Animation configs
  const mainFadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const slowFloatTopRight = {
    animate: {
      y: [0, -8, 0],
      x: [0, 4, 0],
      rotate: [90, 93, 90],
      transition: {
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const slowFloatBottomLeft = {
    animate: {
      y: [0, 8, 0],
      x: [0, -4, 0],
      rotate: [-90, -93, -90],
      transition: {
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#FCFAF8] bg-grain flex flex-col items-center justify-center px-6 py-20 overflow-hidden select-none">
      
      {/* 1. Thin page border & corner geometric diamond accents */}
      <div className="absolute inset-4 md:inset-6 border border-[#D8C2A8]/30 pointer-events-none z-30">
        <div className="absolute -top-1 -left-1 w-2 h-2 rotate-45 border border-[#C9A77B] bg-[#FCFAF8]" />
        <div className="absolute -top-1 -right-1 w-2 h-2 rotate-45 border border-[#C9A77B] bg-[#FCFAF8]" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 rotate-45 border border-[#C9A77B] bg-[#FCFAF8]" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 rotate-45 border border-[#C9A77B] bg-[#FCFAF8]" />
      </div>

      {/* 2. Concentric large faded circular pattern behind card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] pointer-events-none z-0 flex items-center justify-center opacity-[0.06]">
        <div className="absolute w-full h-full rounded-full border border-[#C9A77B]/40" />
        <div className="absolute w-[84%] h-[84%] rounded-full border border-dashed border-[#C9A77B]/30" />
        <div className="absolute w-[68%] h-[68%] rounded-full border border-[#C9A77B]/20" />
        <div className="absolute w-[50%] h-[50%] rounded-full border border-dashed border-[#C9A77B]/15" />
      </div>

      {/* 3. Floating corner botanical decorations */}
      <motion.div
        variants={slowFloatTopRight}
        animate="animate"
        className="absolute -top-16 -right-16 w-52 h-52 sm:w-72 sm:h-72 text-[#C9A77B]/60 opacity-[0.08] pointer-events-none z-10"
      >
        <BotanicalBranch className="w-full h-full" />
      </motion.div>

      <motion.div
        variants={slowFloatBottomLeft}
        animate="animate"
        className="absolute -bottom-16 -left-16 w-52 h-52 sm:w-72 sm:h-72 text-[#C9A77B]/60 opacity-[0.08] pointer-events-none z-10"
      >
        <BotanicalBranch className="w-full h-full" />
      </motion.div>

      {/* 4. Top section content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="text-center space-y-4 mb-10 z-10"
      >
        <p
          className="font-calligraphy text-lg md:text-xl text-[#C9A77B] tracking-wide select-none"
          style={{ fontFamily: "var(--font-amiri), Amiri, serif" }}
        >
          بسم الله الرحمن الرحيم
        </p>
        
        {/* Luxury top divider */}
        <div className="flex items-center justify-center gap-4 text-[#D8C2A8]/50">
          <div className="w-20 h-[0.7px] bg-[#D8C2A8]/30" />
          <span className="text-[#C9A77B] text-[6px] rotate-45 border border-[#C9A77B] p-0.5 bg-[#FCFAF8]" />
          <div className="w-20 h-[0.7px] bg-[#D8C2A8]/30" />
        </div>
      </motion.div>

      {/* 5. Main Card Container (Islamic Arch Frame) */}
      <motion.div
        variants={mainFadeUp}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-[340px] md:max-w-[380px] aspect-[400/550] z-20 mb-10"
      >
        {/* Arch Frame vectors forming double gold border */}
        <svg
          viewBox="0 0 400 550"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full absolute inset-0 text-[#C9A77B]/60 pointer-events-none drop-shadow-[0_8px_30px_rgba(201,167,123,0.04)]"
        >
          {/* Outer Mihrab Arch */}
          <path
            d="M 30,520 L 30,180 C 30,100 100,50 200,30 C 300,50 370,100 370,180 L 370,520 Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {/* Inner Dashed Mihrab Arch */}
          <path
            d="M 38,512 L 38,183 C 38,107 104,60 200,41 C 296,60 362,107 362,183 L 362,512 Z"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeDasharray="3 3"
          />
        </svg>

        {/* Embossed inner card backdrop and soft shadow */}
        <div
          className="absolute inset-[38px] rounded-b-[4px] bg-[#FCFAF8] pointer-events-none shadow-[inset_0_2px_12px_rgba(122,110,99,0.02)]"
          style={{
            clipPath: "polygon(0% 28%, 50% 0%, 100% 28%, 100% 100%, 0% 100%)",
          }}
        />

        {/* Inside the frame content */}
        <div className="absolute inset-[38px] flex flex-col items-center justify-center text-center py-6 space-y-6 select-none z-10">
          <p className="text-xs md:text-sm font-arabic text-[#666666]/80 tracking-widest">
            حفل زفاف
          </p>

          {/* Groom's Name */}
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="text-5xl md:text-6xl font-ruqaa text-[#222222] font-normal"
          >
            {groomName}
          </motion.h1>

          {/* Gold divider 1 */}
          <div className="w-12 h-[0.7px] bg-[#C9A77B]/30" />

          {/* Connecting word */}
          <span className="text-[#C9A77B] font-ruqaa text-2xl md:text-3xl font-normal select-none">
            و
          </span>

          {/* Gold divider 2 */}
          <div className="w-12 h-[0.7px] bg-[#C9A77B]/30" />

          {/* Bride's Name */}
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
            className="text-5xl md:text-6xl font-ruqaa text-[#222222] font-normal"
          >
            {brideName}
          </motion.h1>
        </div>
      </motion.div>

      {/* 6. Centered Date Section under the card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="z-10 text-center w-full max-w-sm mt-4 select-none"
      >
        <div className="flex items-center justify-center gap-6 md:gap-8">
          
          {/* Right Column: Day name + Hijri */}
          <div className="flex flex-col items-center text-right w-24">
            <span className="font-arabic text-sm md:text-base text-[#222222] font-semibold">
              {dayName}
            </span>
            <span className="font-arabic text-[11px] md:text-xs text-[#666666] mt-0.5">
              {hijriDate}
            </span>
          </div>

          {/* Column Separator */}
          <div className="h-8 w-[0.7px] bg-[#D8C2A8]/45" />

          {/* Center Column: Big Number */}
          <div className="flex flex-col items-center justify-center">
            <span className="font-arabic text-5xl md:text-5xl font-bold text-[#C9A77B] leading-none">
              {dayNumber}
            </span>
          </div>

          {/* Column Separator */}
          <div className="h-8 w-[0.7px] bg-[#D8C2A8]/45" />

          {/* Left Column: Month + Year */}
          <div className="flex flex-col items-center text-left w-24">
            <span className="font-arabic text-sm md:text-base text-[#222222] font-semibold">
              {monthName}
            </span>
            <span className="font-arabic text-[11px] md:text-xs text-[#666666] mt-0.5">
              {yearName}
            </span>
          </div>

        </div>
      </motion.div>

      {/* 7. Premium Minimalist Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.9 }}
        className="z-10 text-center w-full max-w-[340px] md:max-w-[360px] mt-8 select-none"
      >
        {/* Subtle top divider line */}
        <div className="flex items-center justify-center gap-4 text-[#D8C2A8]/30 mb-4">
          <div className="w-12 h-[0.7px] bg-[#D8C2A8]/30" />
          <span className="text-[#C9A77B]/70 text-xs tracking-widest font-arabic font-medium">الوقت المتبقي</span>
          <div className="w-12 h-[0.7px] bg-[#D8C2A8]/30" />
        </div>

        {/* Countdown Box */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 bg-[#FCFAF8] border border-[#D8C2A8]/20 rounded-2xl py-3 px-6 shadow-[0_4px_25px_rgba(122,110,99,0.03)]">
          {/* Days */}
          <div className="flex flex-col items-center min-w-[48px]">
            <span className="font-arabic text-2xl sm:text-3xl font-light text-[#C9A77B] leading-normal">
              {toArabicNums(timeLeft.days)}
            </span>
            <span className="font-arabic text-[10px] sm:text-[11px] text-[#666666]/70 mt-0.5">
              يوم
            </span>
          </div>

          {/* Colon Separator */}
          <span className="text-[#D8C2A8]/60 text-sm self-center pb-3 select-none">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center min-w-[48px]">
            <span className="font-arabic text-2xl sm:text-3xl font-light text-[#C9A77B] leading-normal">
              {toArabicNums(timeLeft.hours)}
            </span>
            <span className="font-arabic text-[10px] sm:text-[11px] text-[#666666]/70 mt-0.5">
              ساعة
            </span>
          </div>

          {/* Colon Separator */}
          <span className="text-[#D8C2A8]/60 text-sm self-center pb-3 select-none">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center min-w-[48px]">
            <span className="font-arabic text-2xl sm:text-3xl font-light text-[#C9A77B] leading-normal">
              {toArabicNums(timeLeft.minutes)}
            </span>
            <span className="font-arabic text-[10px] sm:text-[11px] text-[#666666]/70 mt-0.5">
              دقيقة
            </span>
          </div>

          {/* Colon Separator */}
          <span className="text-[#D8C2A8]/60 text-sm self-center pb-3 select-none">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center min-w-[48px]">
            <span className="font-arabic text-2xl sm:text-3xl font-light text-[#C9A77B] leading-normal">
              {toArabicNums(timeLeft.seconds)}
            </span>
            <span className="font-arabic text-[10px] sm:text-[11px] text-[#666666]/70 mt-0.5">
              ثانية
            </span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
