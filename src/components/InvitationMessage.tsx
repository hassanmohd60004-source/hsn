"use client";

import React from "react";
import { motion } from "framer-motion";

interface InvitationMessageProps {
  text: string;
  namesFont?: string;
  namesSize?: string;
  bodySize?: string;
  stylesObj?: any;
}

/** Decorative arabesque corner ornament for the invitation frame */
function FrameCorner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer curve */}
      <path
        d="M5 55 Q5 30, 30 15 Q45 7, 55 5"
        stroke="url(#fcGrad)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner curve */}
      <path
        d="M10 55 Q10 35, 32 22 Q45 14, 55 12"
        stroke="url(#fcGrad)"
        strokeWidth="0.8"
        fill="none"
        strokeDasharray="3 2"
      />
      {/* Leaf accent */}
      <path
        d="M20 42 Q15 32, 28 28 Q35 25, 38 18"
        stroke="rgba(200,164,107,0.4)"
        strokeWidth="0.8"
        fill="none"
      />
      {/* Tiny diamond */}
      <path
        d="M30 30 L33 26 L36 30 L33 34 Z"
        fill="rgba(200,164,107,0.2)"
        stroke="rgba(200,164,107,0.4)"
        strokeWidth="0.5"
      />
      <defs>
        <linearGradient id="fcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(200,164,107,0.15)" />
          <stop offset="50%" stopColor="rgba(200,164,107,0.6)" />
          <stop offset="100%" stopColor="rgba(200,164,107,0.15)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Arabesque divider with central motif */
function InvitationDivider() {
  return (
    <svg
      width="220"
      height="30"
      viewBox="0 0 220 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Left branch */}
      <path
        d="M0 15 Q25 15, 40 9 Q55 3, 70 8 Q82 12, 92 15"
        stroke="url(#invDivGrad)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M0 15 Q25 15, 40 21 Q55 27, 70 22 Q82 18, 92 15"
        stroke="url(#invDivGrad)"
        strokeWidth="1"
        fill="none"
      />
      {/* Left leaf */}
      <path
        d="M40 9 Q43 3, 47 8"
        stroke="rgba(200,164,107,0.4)"
        strokeWidth="0.7"
        fill="none"
      />
      <path
        d="M40 21 Q43 27, 47 22"
        stroke="rgba(200,164,107,0.4)"
        strokeWidth="0.7"
        fill="none"
      />

      {/* Center ornament */}
      <rect
        x="103"
        y="8"
        width="14"
        height="14"
        rx="1.5"
        transform="rotate(45 110 15)"
        stroke="url(#invDivGrad)"
        strokeWidth="1"
        fill="rgba(200,164,107,0.06)"
      />
      <circle cx="110" cy="15" r="1.5" fill="rgba(200,164,107,0.5)" />

      {/* Right branch */}
      <path
        d="M220 15 Q195 15, 180 9 Q165 3, 150 8 Q138 12, 128 15"
        stroke="url(#invDivGrad)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M220 15 Q195 15, 180 21 Q165 27, 150 22 Q138 18, 128 15"
        stroke="url(#invDivGrad)"
        strokeWidth="1"
        fill="none"
      />
      {/* Right leaf */}
      <path
        d="M180 9 Q177 3, 173 8"
        stroke="rgba(200,164,107,0.4)"
        strokeWidth="0.7"
        fill="none"
      />
      <path
        d="M180 21 Q177 27, 173 22"
        stroke="rgba(200,164,107,0.4)"
        strokeWidth="0.7"
        fill="none"
      />

      <defs>
        <linearGradient id="invDivGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(200,164,107,0.05)" />
          <stop offset="30%" stopColor="rgba(200,164,107,0.5)" />
          <stop offset="50%" stopColor="rgba(200,164,107,0.7)" />
          <stop offset="70%" stopColor="rgba(200,164,107,0.5)" />
          <stop offset="100%" stopColor="rgba(200,164,107,0.05)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function InvitationMessage({
  text,
  namesFont,
  namesSize,
  bodySize,
  stylesObj,
}: InvitationMessageProps) {
  const paragraphs = text.split("\n").filter((p) => p.trim() !== "");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative py-28 bg-background bg-grain overflow-hidden">
      {/* Ambient gold glow orbs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(200,164,107,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[radial-gradient(circle,rgba(200,164,107,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* ─── Ornamental double-border invitation frame ─── */}
          <motion.div variants={itemVariants} className="relative">
            {/* Outer border */}
            <div className="absolute inset-0 border-2 border-[#C8A46B]/25 rounded-sm pointer-events-none" />
            {/* Inner border with offset */}
            <div className="absolute inset-[10px] border border-[#C8A46B]/15 rounded-sm pointer-events-none" />
            {/* Inner-inner subtle border */}
            <div className="absolute inset-[14px] border border-[#C8A46B]/8 rounded-sm pointer-events-none border-dashed" />

            {/* Corner ornaments */}
            <FrameCorner className="absolute -top-2 -right-2 opacity-70" />
            <FrameCorner className="absolute -top-2 -left-2 opacity-70 -scale-x-100" />
            <FrameCorner className="absolute -bottom-2 -right-2 opacity-70 -scale-y-100" />
            <FrameCorner className="absolute -bottom-2 -left-2 opacity-70 -scale-x-100 -scale-y-100" />

            {/* Content area */}
            <div className="relative px-8 py-14 md:px-16 md:py-20 text-center space-y-6">
              {/* Top ornamental divider */}
              <motion.div variants={itemVariants}>
                <InvitationDivider />
              </motion.div>

              {/* Invitation paragraphs */}
              <div className="space-y-5 mt-6">
                {paragraphs.map((para, index) => {
                  // Detect Quranic verse
                  const isVerse =
                    para.includes("وَمنْ آيَاتِهِ") ||
                    para.includes("وَمِنْ آيَاتِهِ") ||
                    para.includes("آياته") ||
                    para.includes("صدق الله العظيم");

                  // Detect names line (common Arabic names)
                  const namePatterns = [
                    "أحمد", "محمد", "فيصل", "عبدالله", "خالد", "سلطان", "عمر",
                    "نورا", "سارة", "فاطمة", "مريم", "هند", "لطيفة", "ريم",
                  ];
                  const isNames = namePatterns.some((name) =>
                    para.includes(name)
                  );

                  if (isVerse) {
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="my-8"
                      >
                        {/* Gold highlighted verse frame */}
                        <div className="relative inline-block max-w-xl mx-auto px-8 py-5">
                          {/* Verse border frame */}
                          <div className="absolute inset-0 border border-[#C8A46B]/30 rounded-sm" />
                          <div className="absolute inset-[3px] border border-[#C8A46B]/15 rounded-sm" />
                          {/* Subtle gold background wash */}
                          <div className="absolute inset-0 bg-gradient-to-b from-[#C8A46B]/[0.04] via-[#C8A46B]/[0.06] to-[#C8A46B]/[0.04] rounded-sm" />

                          {/* Top/bottom accent lines */}
                          <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#C8A46B]/40 to-transparent" />
                          <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#C8A46B]/40 to-transparent" />

                          <p className="relative text-xl md:text-2xl font-calligraphy text-[#9E7D46] font-semibold leading-[2.2] tracking-wide">
                            {para}
                          </p>
                        </div>
                      </motion.div>
                    );
                  }

                  if (isNames) {
                    const cleanPara = para.replace(" & ", " و ").replace("(", "").replace(")", "").trim();
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="my-10 flex justify-center items-center"
                      >
                        <h3 className={`${namesSize || "text-4.5xl md:text-6.5xl"} ${namesFont || "font-messiri"} font-bold text-[#1A1A1A] leading-relaxed select-none`}>
                          {cleanPara}
                        </h3>
                      </motion.div>
                    );
                  }

                  const words = para.split(" ");
                  return (
                    <motion.p
                      key={index}
                      variants={itemVariants}
                      className={`${bodySize || "text-xl md:text-2xl"} text-[#1A1A1A] leading-[2.6] flex flex-wrap justify-center gap-x-1.5`}
                      style={{ fontFamily: "var(--font-amiri), Amiri, serif" }}
                    >
                      {words.map((word, wordIdx) => {
                        const wordKey = `${index}-${wordIdx}`;
                        const customStyle = stylesObj?.wordStyles?.[wordKey];
                        if (customStyle) {
                          const { color, font, size, effect } = customStyle;
                          return (
                            <span
                              key={wordIdx}
                              className={`${font || ""} ${size || ""} ${effect || ""} transition-all duration-300`}
                              style={{
                                color: color || undefined,
                                fontFamily: font ? `var(--font-${font.replace("font-", "")})` : undefined
                              }}
                            >
                              {word}
                            </span>
                          );
                        }
                        return <span key={wordIdx}>{word}</span>;
                      })}
                    </motion.p>
                  );
                })}
              </div>

              {/* Bottom ornamental divider */}
              <motion.div variants={itemVariants} className="pt-4">
                <InvitationDivider />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
