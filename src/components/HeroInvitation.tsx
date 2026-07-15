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

/* ──── Ornamental SVG Components ──── */

/** Arabesque corner flourish – positioned absolutely in each corner */
function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer sweeping curve */}
      <path
        d="M5 115 C5 60, 60 5, 115 5"
        stroke="url(#cornerGrad)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner decorative curve */}
      <path
        d="M15 115 C15 70, 70 15, 115 15"
        stroke="url(#cornerGrad)"
        strokeWidth="0.8"
        fill="none"
        strokeDasharray="4 3"
      />
      {/* Leaf / teardrop motif */}
      <path
        d="M30 100 Q20 80, 40 70 Q60 60, 70 40 Q80 20, 100 30"
        stroke="url(#cornerGrad)"
        strokeWidth="1"
        fill="none"
      />
      {/* Tiny diamond accent */}
      <path
        d="M55 65 L60 58 L65 65 L60 72 Z"
        fill="rgba(200,164,107,0.3)"
        stroke="rgba(200,164,107,0.5)"
        strokeWidth="0.5"
      />
      {/* Spiral curl */}
      <path
        d="M85 25 Q90 35, 80 40 Q70 45, 75 55"
        stroke="rgba(200,164,107,0.4)"
        strokeWidth="0.8"
        fill="none"
      />
      <defs>
        <linearGradient id="cornerGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(200,164,107,0.1)" />
          <stop offset="50%" stopColor="rgba(200,164,107,0.5)" />
          <stop offset="100%" stopColor="rgba(200,164,107,0.15)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Ornamental arabesque divider with intricate gold pattern */
function ArabesqueDivider({ width = 280 }: { width?: number }) {
  return (
    <svg
      width={width}
      height="40"
      viewBox="0 0 280 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Left flowing branch */}
      <path
        d="M0 20 Q30 20, 50 12 Q70 4, 90 10 Q105 15, 115 20"
        stroke="url(#divGrad)"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M0 20 Q30 20, 50 28 Q70 36, 90 30 Q105 25, 115 20"
        stroke="url(#divGrad)"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Left leaves */}
      <path
        d="M50 12 Q55 4, 60 10"
        stroke="rgba(200,164,107,0.5)"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M70 6 Q75 0, 78 8"
        stroke="rgba(200,164,107,0.4)"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M50 28 Q55 36, 60 30"
        stroke="rgba(200,164,107,0.5)"
        strokeWidth="0.8"
        fill="none"
      />

      {/* Center ornament – layered diamond */}
      <rect
        x="130"
        y="10"
        width="20"
        height="20"
        rx="2"
        transform="rotate(45 140 20)"
        stroke="url(#divGrad)"
        strokeWidth="1.2"
        fill="rgba(200,164,107,0.08)"
      />
      <rect
        x="134"
        y="14"
        width="12"
        height="12"
        rx="1"
        transform="rotate(45 140 20)"
        stroke="rgba(200,164,107,0.4)"
        strokeWidth="0.8"
        fill="rgba(200,164,107,0.05)"
      />
      {/* Center dot */}
      <circle cx="140" cy="20" r="2" fill="rgba(200,164,107,0.6)" />

      {/* Right flowing branch (mirrored) */}
      <path
        d="M280 20 Q250 20, 230 12 Q210 4, 190 10 Q175 15, 165 20"
        stroke="url(#divGrad)"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M280 20 Q250 20, 230 28 Q210 36, 190 30 Q175 25, 165 20"
        stroke="url(#divGrad)"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Right leaves */}
      <path
        d="M230 12 Q225 4, 220 10"
        stroke="rgba(200,164,107,0.5)"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M210 6 Q205 0, 202 8"
        stroke="rgba(200,164,107,0.4)"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M230 28 Q225 36, 220 30"
        stroke="rgba(200,164,107,0.5)"
        strokeWidth="0.8"
        fill="none"
      />

      <defs>
        <linearGradient id="divGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(200,164,107,0.05)" />
          <stop offset="30%" stopColor="rgba(200,164,107,0.6)" />
          <stop offset="50%" stopColor="rgba(200,164,107,0.8)" />
          <stop offset="70%" stopColor="rgba(200,164,107,0.6)" />
          <stop offset="100%" stopColor="rgba(200,164,107,0.05)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function HeroInvitation({
  brideName,
  groomName,
  countdownDate,
  hijriDate,
  gregorianDate,
}: HeroInvitationProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(countdownDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [countdownDate]);

  // Convert English numbers to Arabic numbers helper
  const toArabicNums = (num: number) => {
    const arabicNums = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return num
      .toString()
      .split("")
      .map((d) => (isNaN(parseInt(d)) ? d : arabicNums[parseInt(d)]))
      .join("");
  };

  // Framer Motion animation presets – staggered cascade
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const timeUnits = [
    { label: "أيام", value: timeLeft.days },
    { label: "ساعات", value: timeLeft.hours },
    { label: "دقائق", value: timeLeft.minutes },
    { label: "ثواني", value: timeLeft.seconds },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden"
    >
      {/* ─── Multi-layer luxury background ─── */}
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F7F5F2] to-[#F2EDE6]" />

      {/* Radial gold glow – top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(200,164,107,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Radial gold glow – bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(200,164,107,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none" />

      {/* Decorative large circle ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] md:w-[750px] md:h-[750px] rounded-full border border-[#C8A46B]/10" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[580px] h-[580px] md:w-[730px] md:h-[730px] rounded-full border border-[#C8A46B]/5 border-dashed" />
      </div>

      {/* ─── Corner flourishes ─── */}
      <CornerFlourish className="absolute top-4 right-4 md:top-8 md:right-8 opacity-50" />
      <CornerFlourish className="absolute top-4 left-4 md:top-8 md:left-8 opacity-50 -scale-x-100" />
      <CornerFlourish className="absolute bottom-4 right-4 md:bottom-8 md:right-8 opacity-50 -scale-y-100" />
      <CornerFlourish className="absolute bottom-4 left-4 md:bottom-8 md:left-8 opacity-50 -scale-x-100 -scale-y-100" />

      {/* ─── Main content ─── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        {/* Bismillah */}
        <motion.div variants={fadeInScale} className="mb-10">
          <p className="text-2xl md:text-3xl font-calligraphy text-[#9E7D46] font-semibold leading-relaxed">
            بسم الله الرحمن الرحيم
          </p>
        </motion.div>

        {/* Top arabesque divider */}
        <motion.div variants={itemVariants} className="mb-10">
          <ArabesqueDivider />
        </motion.div>

        {/* ─── Names with ornamental frame ─── */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="relative inline-block px-12 py-8">
            {/* Ornamental double border frame */}
            <div className="absolute inset-0 border border-[#C8A46B]/25 rounded-sm" />
            <div className="absolute inset-[6px] border border-[#C8A46B]/15 rounded-sm" />

            {/* Small corner diamonds on the frame */}
            <svg className="absolute -top-[5px] -right-[5px] w-[10px] h-[10px]" viewBox="0 0 10 10">
              <rect x="2" y="2" width="6" height="6" transform="rotate(45 5 5)" fill="#C8A46B" opacity="0.5" />
            </svg>
            <svg className="absolute -top-[5px] -left-[5px] w-[10px] h-[10px]" viewBox="0 0 10 10">
              <rect x="2" y="2" width="6" height="6" transform="rotate(45 5 5)" fill="#C8A46B" opacity="0.5" />
            </svg>
            <svg className="absolute -bottom-[5px] -right-[5px] w-[10px] h-[10px]" viewBox="0 0 10 10">
              <rect x="2" y="2" width="6" height="6" transform="rotate(45 5 5)" fill="#C8A46B" opacity="0.5" />
            </svg>
            <svg className="absolute -bottom-[5px] -left-[5px] w-[10px] h-[10px]" viewBox="0 0 10 10">
              <rect x="2" y="2" width="6" height="6" transform="rotate(45 5 5)" fill="#C8A46B" opacity="0.5" />
            </svg>

            <h1 className="font-calligraphy text-foreground leading-relaxed">
              <span className="block text-5xl md:text-7xl mb-2">
                {groomName}
              </span>
              <span className="block text-4xl md:text-5xl text-[#C8A46B] my-3 font-calligraphy">
                و
              </span>
              <span className="block text-5xl md:text-7xl mt-2">
                {brideName}
              </span>
            </h1>
          </div>
        </motion.div>

        {/* Middle arabesque divider */}
        <motion.div variants={itemVariants} className="mb-8">
          <ArabesqueDivider width={200} />
        </motion.div>

        {/* Dates */}
        <motion.div variants={itemVariants} className="mb-6 space-y-3">
          <p className="text-xl md:text-2xl font-arabic text-foreground/80 font-medium">
            {gregorianDate}
          </p>
          <p className="text-sm md:text-base font-arabic gold-text-static">
            {hijriDate}
          </p>
        </motion.div>

        {/* Bottom arabesque divider */}
        <motion.div variants={itemVariants} className="mb-10">
          <ArabesqueDivider width={160} />
        </motion.div>

        {/* ─── Countdown Timer ─── */}
        <motion.div variants={itemVariants}>
          <p className="text-xs md:text-sm font-arabic text-foreground/50 mb-8">
            المتبقي على مشاركتنا الفرحة
          </p>

          <div className="grid grid-cols-4 gap-3 md:gap-5 max-w-lg mx-auto">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 1.2 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="group relative"
              >
                <div
                  className="relative rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center
                             bg-white/50 backdrop-blur-xl
                             border border-[#C8A46B]/20
                             shadow-gold
                             shadow-inner-gold
                             transition-all duration-500
                             hover:shadow-gold-lg hover:border-[#C8A46B]/40"
                >
                  {/* Top gold accent bar */}
                  <div className="absolute top-0 left-2 right-2 h-[1.5px] bg-gradient-to-r from-transparent via-[#C8A46B]/60 to-transparent rounded-t-2xl" />

                  {/* Bottom gold accent bar */}
                  <div className="absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-[#C8A46B]/20 to-transparent rounded-b-2xl" />

                  {/* Number */}
                  <span className="text-3xl md:text-5xl font-bold text-foreground font-arabic tabular-nums leading-none">
                    {toArabicNums(unit.value)}
                  </span>

                  {/* Label */}
                  <span className="text-[10px] md:text-xs text-foreground/45 font-arabic mt-2 tracking-wider">
                    {unit.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom fade-out gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
