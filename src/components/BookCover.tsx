"use client";

import React, { useState } from "react";
import { playPaperRustle } from "@/utils/audio";

interface BookCoverProps {
  onComplete: () => void;
}

export default function BookCover({ onComplete }: BookCoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isWebsiteShown, setIsWebsiteShown] = useState(false);

  const handleBookClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    playPaperRustle();

    // Trigger website transition at 3.3 seconds as specified in user script
    setTimeout(() => {
      setIsWebsiteShown(true);
      // Wait for website transition (1.4s) to finish before releasing cover overlay
      setTimeout(() => {
        onComplete();
      }, 1400);
    }, 3300);
  };

  return (
    <>
      {/* ═══ BOOK COVER LANDING STAGE ═══ */}
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#efe8dd] overflow-hidden select-none"
        style={{ perspective: "3000px" }}
      >
        {/* Book Container */}
        <div
          onClick={handleBookClick}
          className={`cursor-pointer transition-all duration-[2500ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
            isOpen ? "open" : "hover:scale-[1.02]"
          }`}
          style={{
            width: "min(88vw, 430px)",
            height: "min(80vh, 760px)",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: isOpen ? "translateX(clamp(-180px, -20vw, -40px))" : "none",
          }}
        >
          {/* Inner Pages (Layers under cover) */}
          <div
            className="page shadow-md"
            style={{
              position: "absolute",
              inset: 0,
              background: "#FAF7F2",
              transformOrigin: "left center",
              transition: "1.8s cubic-bezier(0.23, 1, 0.32, 1)",
              borderRadius: "14px",
              transform: isOpen ? "rotateY(-150deg)" : "rotateY(0deg)",
              transitionDelay: isOpen ? "0.6s" : "0s",
              border: "1px solid rgba(200,164,107,0.2)",
            }}
          >
            <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center opacity-70">
              <p className="font-arabic text-[#8A7040] text-sm mb-2">بسم الله الرحمن الرحيم</p>
              <div className="w-16 h-[1px] bg-[#C8A46B]/40 my-3" />
              <p className="font-calligraphy text-[#9E7D46] text-xl">أهلاً بكم في دعوتنا</p>
            </div>
          </div>

          <div
            className="page shadow-md"
            style={{
              position: "absolute",
              inset: 0,
              background: "#FCFAF6",
              transformOrigin: "left center",
              transition: "1.8s cubic-bezier(0.23, 1, 0.32, 1)",
              borderRadius: "14px",
              transform: isOpen ? "rotateY(-165deg)" : "rotateY(0deg)",
              transitionDelay: isOpen ? "0.3s" : "0s",
              border: "1px solid rgba(200,164,107,0.15)",
            }}
          />

          {/* Book Front Cover (Top layer) */}
          <div
            className="cover"
            style={{
              position: "absolute",
              inset: 0,
              transformOrigin: "left center",
              transition: "2.2s cubic-bezier(0.23, 1, 0.32, 1)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: isOpen
                ? "0 10px 30px rgba(0,0,0,0.15)"
                : "0 40px 80px rgba(0,0,0,0.35)",
              transform: isOpen ? "rotateY(-175deg)" : "rotateY(0deg)",
            }}
          >
            <img
              src="/book-cover.jpg"
              alt="Wedding Book Cover"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </div>

        {/* Tap hint text */}
        {!isOpen && (
          <div className="absolute bottom-10 flex flex-col items-center pointer-events-none animate-pulse">
            <p className="font-arabic text-sm text-[#8A7040] font-semibold tracking-wide">
              اضغط لفتح الكتاب
            </p>
            <p className="font-english text-[10px] text-[#C8A46B]/70 tracking-[0.25em] uppercase mt-1">
              Tap to open
            </p>
          </div>
        )}
      </div>

      {/* ═══ WEBSITE TRANSITION OVERLAY ═══ */}
      <div
        className={`website ${isWebsiteShown ? "show" : ""}`}
        style={{
          position: "fixed",
          inset: 0,
          opacity: isWebsiteShown ? 1 : 0,
          transform: isWebsiteShown ? "scale(1)" : "scale(0.92)",
          filter: isWebsiteShown ? "blur(0px)" : "blur(20px)",
          transition: "1.4s ease",
          background: "#fdfaf6",
          zIndex: 60,
          pointerEvents: isWebsiteShown ? "none" : "none",
        }}
      />
    </>
  );
}
