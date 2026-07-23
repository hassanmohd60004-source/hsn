"use client";

import React from "react";
import { motion } from "framer-motion";
import { playPaperRustle } from "@/utils/audio";
import { FloralCorner, Peony } from "@/components/decorations/FloralSVGs";

interface InvitationMessageProps {
  text: string;
}



/** Small elegant leaf icon for bottom divider */
function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9a7 7 0 0 1-9 9Z" />
      <path d="M19 2c-2.26 4.33-5.27 7.14-8 9" />
    </svg>
  );
}

export default function InvitationMessage({ text }: InvitationMessageProps) {
  const paragraphs = text.split("\n").map((p) => p.trim()).filter(Boolean);

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotate: -1.5, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const leafVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.1,
      transition: { duration: 1.8, delay: 0.6 },
    },
  };

  return (
    <section className="relative py-24 bg-[#FCFAF7] bg-grain overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          onViewportEnter={() => playPaperRustle()}
          className="w-full max-w-[700px] mx-auto rounded-[28px] bg-[#FCFAF7] border border-[#D8C2A8]/45 p-3 md:p-4 shadow-[0_12px_40px_rgba(122,110,99,0.06)]"
        >
          {/* Inner card container showing the double border */}
          <div className="border border-[#D8C2A8]/25 rounded-[20px] px-6 py-12 md:px-16 md:py-20 relative overflow-hidden text-center space-y-8">
            
            {/* Top-Right Corner Floral */}
            <FloralCorner className="absolute -top-3 -right-3 w-32 h-32 md:w-40 md:h-40 opacity-50 pointer-events-none" />

            {/* Bottom-Left Corner Floral */}
            <FloralCorner className="absolute -bottom-3 -left-3 w-32 h-32 md:w-40 md:h-40 scale-x-[-1] scale-y-[-1] opacity-50 pointer-events-none" />

            {/* Peony Watermark */}
            <Peony className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.12] pointer-events-none" />

            {/* Main content body */}
            <div className="relative z-10 space-y-8">
              {paragraphs.map((para, index) => {
                // 1. Detect Quranic verse
                const isVerse =
                  para.includes("وَمنْ آيَاتِهِ") ||
                  para.includes("وَمِنْ آيَاتِهِ") ||
                  para.includes("آياته") ||
                  para.includes("صدق الله العظيم");

                // 2. Detect Bismillah
                const isBismillah = para.includes("بسم الله الرحمن الرحيم");

                // 3. Detect main couple names
                const isCoupleNames =
                  (para.includes("أحمد") || para.includes("احمد")) &&
                  (para.includes("نورا") || para.includes("نورة"));

                // 4. Detect Parents lines
                const isGroomParents = para.includes("نجل الدكتور");
                const isBrideParents = para.includes("كريمة الأستاذ");
                const isSeparator = para.trim() === "و";

                if (isBismillah) {
                  return (
                    <p
                      key={index}
                      className="text-lg md:text-xl font-calligraphy text-[#C9A77B] leading-normal"
                      style={{ fontFamily: "var(--font-amiri), Amiri, serif" }}
                    >
                      {para}
                    </p>
                  );
                }

                if (isVerse) {
                  return (
                    <div key={index} className="max-w-xl mx-auto my-6 px-4">
                      <p
                        className="text-base md:text-lg font-calligraphy text-[#7A6E63] leading-[2] italic"
                        style={{ fontFamily: "var(--font-amiri), Amiri, serif" }}
                      >
                        {para}
                      </p>
                    </div>
                  );
                }

                if (para.includes("نتشرف بدعوتكم")) {
                  return (
                    <p
                      key={index}
                      className="text-base md:text-lg font-arabic text-[#7A6E63] tracking-wide font-normal"
                    >
                      {para}
                    </p>
                  );
                }

                if (isCoupleNames) {
                  const cleanPara = para.replace(" & ", " و ").replace("(", "").replace(")", "").trim();
                  return (
                    <div key={index} className="py-2">
                      <motion.h1
                        initial={{ scale: 0.96, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                        className="text-5xl md:text-[66px] font-ruqaa font-bold text-[#2E2E2E] leading-tight select-none"
                      >
                        {cleanPara}
                      </motion.h1>

                      {/* Small elegant heart divider */}
                      <div className="flex items-center justify-center gap-4 mt-6 text-[#D8C2A8]">
                        <div className="w-16 h-[0.7px] bg-[#D8C2A8]/50" />
                        <span className="text-[#C9A77B] text-sm">♡</span>
                        <div className="w-16 h-[0.7px] bg-[#D8C2A8]/50" />
                      </div>
                    </div>
                  );
                }

                if (isGroomParents) {
                  const fatherName = "محمد حسن";
                  return (
                    <div key={index} className="space-y-1">
                      <p className="text-xs md:text-sm font-arabic text-[#7A6E63] uppercase tracking-wider">
                        نجل الدكتور
                      </p>
                      <h4
                        className="text-lg md:text-xl font-calligraphy text-[#2E2E2E] font-bold"
                        style={{ fontFamily: "var(--font-amiri), Amiri, serif" }}
                      >
                        {fatherName}
                      </h4>
                    </div>
                  );
                }

                if (isSeparator) {
                  return (
                    <p key={index} className="text-[#C9A77B] font-ruqaa text-lg md:text-xl py-1 select-none">
                      و
                    </p>
                  );
                }

                if (isBrideParents) {
                  const fatherName = "محمد فاروق";
                  return (
                    <div key={index} className="space-y-1">
                      <p className="text-xs md:text-sm font-arabic text-[#7A6E63] uppercase tracking-wider">
                        كريمة الأستاذ
                      </p>
                      <h4
                        className="text-lg md:text-xl font-calligraphy text-[#2E2E2E] font-bold"
                        style={{ fontFamily: "var(--font-amiri), Amiri, serif" }}
                      >
                        {fatherName}
                      </h4>

                      {/* Leaf divider */}
                      <div className="flex items-center justify-center gap-4 pt-6 text-[#D8C2A8]">
                        <div className="w-12 h-[0.7px] bg-[#D8C2A8]/50" />
                        <LeafIcon className="w-4 h-4 text-[#C9A77B] opacity-80" />
                        <div className="w-12 h-[0.7px] bg-[#D8C2A8]/50" />
                      </div>
                    </div>
                  );
                }

                if (para.includes("ونسعد بمشاركتكم")) {
                  return (
                    <p
                      key={index}
                      className="text-lg md:text-xl font-arabic text-[#2E2E2E] font-medium leading-relaxed pt-2"
                    >
                      {para}
                    </p>
                  );
                }

                return (
                  <p
                    key={index}
                    className="text-xs md:text-sm font-arabic text-[#7A6E63] tracking-widest leading-normal pt-1"
                  >
                    {para}
                  </p>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
