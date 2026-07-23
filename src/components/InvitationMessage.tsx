"use client";

import React from "react";
import { motion } from "framer-motion";
import { playPaperRustle } from "@/utils/audio";

interface InvitationMessageProps {
  text: string;
}

/** Elegant botanical branch vector illustration for corners */
function BotanicalBranch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      stroke="#C9A77B"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Delicate main stem */}
      <path d="M10 110 C 35 90, 65 55, 105 15" />
      {/* Detailed hand-drawn leaves */}
      <path d="M35 85 C 22 75, 25 62, 42 70 C 42 70 38 80 35 85 Z" />
      <path d="M52 68 C 38 58, 42 45, 58 52 C 58 52 55 62 52 68 Z" />
      <path d="M70 50 C 58 38, 62 25, 78 32 C 78 32 75 42 70 50 Z" />
      <path d="M88 32 C 78 20, 82 8, 95 15 C 95 15 92 25 88 32 Z" />
      {/* Opposite leaves */}
      <path d="M28 92 C 40 102, 50 92, 40 85 C 40 85 32 88 28 92 Z" />
      <path d="M45 75 C 58 85, 68 75, 58 68 C 58 68 50 70 45 75 Z" />
      <path d="M62 57 C 75 67, 85 57, 75 50 C 75 50 68 52 62 57 Z" />
      <path d="M80 38 C 92 48, 102 38, 92 31 C 92 31 85 33 80 38 Z" />
    </svg>
  );
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
            
            {/* Top-Right Corner Botanical Leaf */}
            <motion.div
              variants={leafVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute -top-6 -right-6 w-36 h-36 rotate-90 pointer-events-none"
            >
              <BotanicalBranch className="w-full h-full" />
            </motion.div>

            {/* Bottom-Left Corner Botanical Leaf */}
            <motion.div
              variants={leafVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 w-36 h-36 -rotate-90 pointer-events-none"
            >
              <BotanicalBranch className="w-full h-full" />
            </motion.div>

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
