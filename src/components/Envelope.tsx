"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeProps {
  onOpen: () => void;
  brideName: string;
  groomName: string;
  brideNameEn: string;
  groomNameEn: string;
}

export default function Envelope({ onOpen, brideName, groomName, brideNameEn, groomNameEn }: EnvelopeProps) {
  const [phase, setPhase] = useState<"idle" | "sealBreak" | "flapOpen" | "cardSlide" | "done">("idle");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Gold particle system
  useEffect(() => {
    if (phase === "idle" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      color: string; alpha: number; decay: number;
      rotation: number; rotationSpeed: number;
    }

    const particles: Particle[] = [];
    const colors = ["#C8A46B", "#DFD5C6", "#FFFFFF", "#F3EAD3", "#E8D5B7"];

    for (let i = 0; i < 60; i++) {
      const angle = (Math.PI * 2 * i) / 60;
      const speed = Math.random() * 5 + 2;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: Math.random() * 3 + 1.5,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.012 + 0.004,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particles.length < 100 && Math.random() > 0.5) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          size: Math.random() * 2.5 + 0.5,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: -Math.random() * 1.5 - 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.4 + 0.3,
          decay: 0.002,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY -= 0.01;
        p.alpha -= p.decay;
        p.rotation += p.rotationSpeed;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [phase]);

  const handleOpen = useCallback(() => {
    if (phase !== "idle") return;

    // Phase 1: Seal breaks
    setPhase("sealBreak");

    // Phase 2: Flap opens upward
    setTimeout(() => setPhase("flapOpen"), 500);

    // Phase 3: Card slides out from inside
    setTimeout(() => setPhase("cardSlide"), 1500);

    // Phase 4: Transition to main site
    setTimeout(() => {
      setPhase("done");
      setTimeout(() => onOpen(), 800);
    }, 3200);
  }, [phase, onOpen]);

  const flapShouldOpen = phase === "flapOpen" || phase === "cardSlide" || phase === "done";
  const cardShouldSlide = phase === "cardSlide" || phase === "done";
  const sealShouldBreak = phase !== "idle";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F7F5F2] overflow-hidden select-none">
      {/* Background blur */}
      <motion.div
        animate={{ filter: sealShouldBreak ? "blur(6px)" : "blur(0px)", scale: sealShouldBreak ? 1.05 : 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[#F7F5F2]"
      />

      {/* Gold particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />

      {/* Envelope Assembly */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative z-10"
        style={{ perspective: "1200px" }}
      >
        <div className="relative w-[85vw] max-w-[420px] aspect-[4/3]">

          <AnimatePresence>
            {phase !== "done" && (
              <>
                {/* ===== ENVELOPE BACK ===== */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#F0ECE6] to-[#E8E3DC] shadow-2xl border border-[#E0DBD4] overflow-hidden">
                  <div className="absolute inset-2 rounded-xl border border-[#D5CFC5]/40 bg-[#FAF8F5]/40" />
                  <motion.div
                    animate={{ opacity: flapShouldOpen ? 0.15 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-black/20 to-transparent"
                  />
                </div>

                {/* ===== INVITATION CARD (starts hidden INSIDE, slides UP out of envelope) ===== */}
                <motion.div
                  initial={{ y: "0%" }}
                  animate={cardShouldSlide ? { y: "-58%" } : { y: "0%" }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as const }}
                  className="absolute z-[13]"
                  style={{
                    /* Card sits inside the envelope area, inset from edges */
                    left: "7%",
                    right: "7%",
                    top: "5%",
                    bottom: "5%",
                  }}
                >
                  <div className="w-full h-full bg-white rounded-xl shadow-2xl border border-[#E5DFD6] overflow-hidden">
                    {/* Gold double border */}
                    <div className="absolute inset-3 border border-[#C8A46B]/25 rounded-lg pointer-events-none" />
                    <div className="absolute inset-4 border border-[#C8A46B]/10 rounded pointer-events-none" />

                    <div className="relative h-full flex flex-col items-center justify-between py-6 px-5">
                      {/* Monogram */}
                      <div className="w-10 h-10 rounded-full border-2 border-[#C8A46B]/40 flex items-center justify-center bg-gradient-to-b from-[#FAF8F5] to-white">
                        <span className="font-english text-[#C8A46B] text-sm font-light tracking-wider">
                          {groomNameEn[0]}{brideNameEn[0]}
                        </span>
                      </div>

                      <div className="flex-1 flex flex-col items-center justify-center space-y-3 my-4">
                        <p className="text-[10px] text-[#C8A46B] tracking-[0.25em] uppercase font-english">
                          Wedding Invitation
                        </p>
                        <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#C8A46B] to-transparent" />
                        <h2 className="text-2xl sm:text-3xl font-bold font-calligraphy text-[#1A1A1A] leading-relaxed text-center">
                          {groomName}
                          <span className="block font-english text-[#C8A46B] text-lg font-light my-1">&</span>
                          {brideName}
                        </h2>
                        <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#C8A46B] to-transparent" />
                        <p className="text-[10px] text-gray-400 tracking-wider font-arabic max-w-[200px] text-center leading-relaxed">
                          نتشرف بدعوتكم لمشاركتنا فرحتنا الكبرى
                        </p>
                      </div>

                      <p className="text-[9px] text-[#C8A46B]/60 font-english tracking-[0.3em] uppercase">
                        Port Said, Egypt
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* ===== ENVELOPE FRONT BODY (covers bottom half — hides the card) ===== */}
                <div className="absolute inset-0 z-[16] pointer-events-none">
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-[#EDE8E1] to-[#E5E0D8] rounded-b-2xl border-x border-b border-[#DDD8D0]"
                    style={{ clipPath: "polygon(0% 50%, 0% 100%, 100% 100%, 100% 50%)" }}
                  />
                </div>

                {/* ===== LEFT FLAP ===== */}
                <div className="absolute inset-0 z-[17] pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden"
                    style={{ clipPath: "polygon(0% 0%, 0% 100%, 50% 50%)" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F0ECE6] to-[#EAE5DE]">
                      <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent" />
                    </div>
                  </div>
                </div>

                {/* ===== RIGHT FLAP ===== */}
                <div className="absolute inset-0 z-[17] pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden"
                    style={{ clipPath: "polygon(100% 0%, 100% 100%, 50% 50%)" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-l from-[#F0ECE6] to-[#EAE5DE]">
                      <div className="absolute inset-0 bg-gradient-to-bl from-black/[0.02] to-transparent" />
                    </div>
                  </div>
                </div>

                {/* ===== BOTTOM FLAP ===== */}
                <div className="absolute inset-0 z-[18] pointer-events-none">
                  <div className="absolute inset-0 rounded-b-2xl"
                    style={{ clipPath: "polygon(0% 100%, 50% 50%, 100% 100%)" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F5F1EB] to-[#EDE9E2]">
                      <div className="absolute inset-0" style={{
                        background: "linear-gradient(to bottom right, transparent 49%, rgba(0,0,0,0.03) 50%, transparent 51%)"
                      }} />
                    </div>
                  </div>
                </div>

                {/* ===== TOP FLAP (opens upward with real 3D, goes behind the card and fades out when open) ===== */}
                <motion.div
                  initial={{ rotateX: 0, opacity: 1 }}
                  animate={{ 
                    rotateX: flapShouldOpen ? -180 : 0,
                    opacity: cardShouldSlide ? 0 : 1,
                  }}
                  transition={{ 
                    rotateX: { duration: 1.0, ease: [0.45, 0, 0.55, 1] as const },
                    opacity: { duration: 0.3, ease: "easeInOut" }
                  }}
                  className="absolute inset-0"
                  style={{
                    transformOrigin: "top center",
                    transformStyle: "preserve-3d",
                    zIndex: cardShouldSlide ? 10 : 19,
                  }}
                >
                  {/* Front face */}
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: "polygon(0% 0%, 50% 50%, 100% 0%)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#EDE8E1] to-[#E3DED6] rounded-t-2xl">
                      <div className="absolute inset-0" style={{
                        background: "linear-gradient(to bottom left, transparent 48.5%, rgba(0,0,0,0.04) 49.5%, rgba(0,0,0,0.04) 50.5%, transparent 51.5%)"
                      }} />
                    </div>
                  </div>

                  {/* Back face (visible when flap is open) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: "polygon(0% 0%, 50% 50%, 100% 0%)",
                      backfaceVisibility: "hidden",
                      transform: "rotateX(180deg)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#E0DBD3] to-[#D8D3CB] rounded-t-2xl">
                      <div className="absolute inset-6 border border-dashed border-[#C8A46B]/15 rounded" />
                    </div>
                  </div>
                </motion.div>

                {/* ===== GOLD WAX SEAL (centered exactly at flap intersection) ===== */}
                <motion.div
                  initial={{ scale: 1, rotate: 0, opacity: 1 }}
                  animate={sealShouldBreak
                    ? { scale: [1, 1.15, 0], rotate: [0, -8, 30], opacity: [1, 1, 0] }
                    : { scale: 1 }
                  }
                  transition={sealShouldBreak
                    ? { duration: 0.5, times: [0, 0.3, 1], ease: "easeOut" }
                    : { duration: 0.3 }
                  }
                  className="absolute z-[25] cursor-pointer"
                  style={{
                    top: "50%",
                    left: "50%",
                    marginTop: "-36px",
                    marginLeft: "-36px",
                    width: "72px",
                    height: "72px",
                  }}
                  onClick={handleOpen}
                >
                  <div className="relative group w-full h-full">
                    {/* Pulsing rings */}
                    <div className="absolute -inset-3 rounded-full border border-[#C8A46B]/20 animate-ping pointer-events-none"
                      style={{ animationDuration: "3s" }}
                    />
                    <div className="absolute -inset-5 rounded-full border border-[#C8A46B]/10 animate-ping pointer-events-none"
                      style={{ animationDuration: "4s", animationDelay: "0.5s" }}
                    />

                    {/* Seal body */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#D4B77A] via-[#C8A46B] to-[#9E7D46] shadow-lg flex items-center justify-center border-2 border-[#B89855] group-hover:scale-110 transition-transform duration-500">
                      <div className="w-[88%] h-[88%] rounded-full border border-dashed border-white/30 flex flex-col items-center justify-center bg-gradient-to-tr from-[#A88A4A] via-[#C8A46B] to-[#DFC88C]/60">
                        <span className="text-[11px] font-bold text-white font-arabic drop-shadow-sm leading-tight">
                          افتح الدعوة
                        </span>
                        <span className="text-[7px] text-white/70 font-english uppercase tracking-[0.15em] mt-0.5">
                          Open
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Pulse Hint Text below envelope */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: [0.35, 1, 0.35],
              y: 0 
            }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              opacity: {
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut"
              },
              y: { duration: 0.5 }
            }}
            className="absolute bottom-28 z-20 flex flex-col items-center pointer-events-none"
          >
            <p className="font-arabic text-sm md:text-base text-[#9E7D46] font-semibold tracking-wide">
              افتح الظرف
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: sealShouldBreak ? 0 : 0.5, y: sealShouldBreak ? 20 : 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-10 text-center font-english text-xs text-[#C8A46B] tracking-[0.3em] uppercase z-10"
      >
        {brideNameEn} & {groomNameEn}
      </motion.div>
    </div>
  );
}
