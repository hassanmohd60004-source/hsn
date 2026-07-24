"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BookCoverProps {
  onOpen: () => void;
  brideName: string;
  groomName: string;
  brideNameEn: string;
  groomNameEn: string;
}

/** Synthesize a cinematic book-opening sound using Web Audio API */
const playBookOpenSound = () => {
  if (typeof window === "undefined") return;
  try {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Layer 1: Deep resonant thud (book spine)
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(80, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.6);
    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0, ctx.currentTime);
    gain1.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.8);

    // Layer 2: Paper swoosh (wide filtered noise)
    const bufLen = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) d[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const bpf = ctx.createBiquadFilter();
    bpf.type = "bandpass";
    bpf.frequency.setValueAtTime(2500, ctx.currentTime + 0.1);
    bpf.Q.setValueAtTime(0.6, ctx.currentTime);
    bpf.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 1.4);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, ctx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.15);
    noiseGain.gain.setValueAtTime(0.05, ctx.currentTime + 0.3);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);
    noise.connect(bpf);
    bpf.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(ctx.currentTime + 0.1);
    noise.stop(ctx.currentTime + 2);

    // Layer 3: Magical shimmer (high-freq sparkle)
    const osc2 = ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(1200, ctx.currentTime + 0.5);
    osc2.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 1.2);
    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.6);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.5);
    osc2.stop(ctx.currentTime + 1.6);
  } catch (e) {
    console.error("Audio error:", e);
  }
};

export default function BookCover({
  onOpen,
  brideName,
  groomName,
  brideNameEn,
  groomNameEn,
}: BookCoverProps) {
  const [phase, setPhase] = useState<
    "idle" | "opening" | "pagesFlutter" | "zoomIn" | "done"
  >("idle");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /* ─── Gold particle system ─── */
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface P {
      x: number; y: number; s: number;
      vx: number; vy: number;
      c: string; a: number; d: number;
      r: number; rs: number;
    }

    const ps: P[] = [];
    const cols = ["#C8A46B", "#DFD5C6", "#FFF8E7", "#F3EAD3", "#E8D5B7", "#FFD700"];

    let raf: number;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ambient sparkles
      if (phase === "idle" && ps.length < 25 && Math.random() > 0.92) {
        ps.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 5,
          s: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 0.6 - 0.2,
          c: cols[Math.floor(Math.random() * cols.length)],
          a: Math.random() * 0.25 + 0.1,
          d: 0.0008,
          r: Math.random() * 360,
          rs: (Math.random() - 0.5) * 1,
        });
      }

      // Burst on open
      if ((phase === "opening" || phase === "pagesFlutter") && ps.length < 200) {
        for (let i = 0; i < 5; i++) {
          const angle = Math.PI * 2 * Math.random();
          const spd = Math.random() * 6 + 2;
          ps.push({
            x: canvas.width * 0.35,
            y: canvas.height * 0.5,
            s: Math.random() * 3.5 + 1,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd - 2,
            c: cols[Math.floor(Math.random() * cols.length)],
            a: 1,
            d: Math.random() * 0.012 + 0.004,
            r: Math.random() * 360,
            rs: (Math.random() - 0.5) * 5,
          });
        }
      }

      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.01;
        p.a -= p.d;
        p.r += p.rs;
        if (p.a <= 0) { ps.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.r * Math.PI) / 180);
        ctx.beginPath();
        ctx.moveTo(0, -p.s);
        ctx.lineTo(p.s * 0.6, 0);
        ctx.lineTo(0, p.s);
        ctx.lineTo(-p.s * 0.6, 0);
        ctx.closePath();
        ctx.fillStyle = p.c;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.c;
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [phase]);

  /* ─── Handle open ─── */
  const handleOpen = useCallback(() => {
    if (phase !== "idle") return;
    playBookOpenSound();

    // Phase 1: Cover opens
    setPhase("opening");

    // Phase 2: Pages flutter / reveal
    setTimeout(() => setPhase("pagesFlutter"), 1200);

    // Phase 3: Cinematic zoom into the page
    setTimeout(() => setPhase("zoomIn"), 2400);

    // Phase 4: Transition to site
    setTimeout(() => {
      setPhase("done");
      setTimeout(() => onOpen(), 500);
    }, 3800);
  }, [phase, onOpen]);

  const isOpening = phase !== "idle";
  const coverOpen = phase === "opening" || phase === "pagesFlutter" || phase === "zoomIn" || phase === "done";
  const showPages = phase === "pagesFlutter" || phase === "zoomIn" || phase === "done";
  const zoomingIn = phase === "zoomIn" || phase === "done";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none"
      style={{ background: "linear-gradient(160deg, #FAF8F4 0%, #F0ECE4 40%, #E8E2D8 100%)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ─── Radial ambient glow ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 40% 50%, rgba(200,164,107,0.08) 0%, transparent 60%)",
        }}
      />

      {/* ─── Gold particles canvas ─── */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" />

      {/* ═══════════════════════════════════════════════════
           THE BOOK – Full-screen on mobile
         ═══════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: zoomingIn ? 0 : 1,
          scale: zoomingIn ? 2.5 : 1,
          y: zoomingIn ? -100 : 0,
        }}
        transition={{
          opacity: { duration: zoomingIn ? 1.0 : 1.4, ease: "easeInOut" },
          scale: { duration: zoomingIn ? 1.2 : 1.4, ease: [0.16, 1, 0.3, 1] as const },
          y: { duration: zoomingIn ? 1.2 : 1.4, ease: [0.16, 1, 0.3, 1] as const },
        }}
        style={{ perspective: "2000px" }}
      >
        {/* Book container – tall ratio to fill mobile screen */}
        <div
          className="relative"
          style={{
            width: "min(88vw, 420px)",
            height: "min(85vh, 720px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ─── BOOK SHADOW (ground) ─── */}
          <motion.div
            animate={{
              scaleX: coverOpen ? 1.4 : 1,
              scaleY: coverOpen ? 1.2 : 1,
              opacity: coverOpen ? 0.12 : 0.2,
            }}
            transition={{ duration: 1 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-8"
            style={{
              background: "radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 70%)",
              filter: "blur(6px)",
            }}
          />

          {/* ─── BACK COVER ─── */}
          <div
            className="absolute inset-0 rounded-sm"
            style={{
              background: "linear-gradient(155deg, #E8DFD0 0%, #DDD4C2 40%, #D0C7B2 100%)",
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.06), 0 25px 80px rgba(0,0,0,0.15)",
            }}
          >
            {/* Spine shadow */}
            <div className="absolute top-0 bottom-0 left-0 w-10"
              style={{ background: "linear-gradient(to right, rgba(0,0,0,0.1), transparent)" }}
            />
            {/* Inner page content hint */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showPages ? 0.5 : 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center px-8"
              >
                <p className="font-arabic text-[#B09060] text-base mb-3">
                  بسم الله الرحمن الرحيم
                </p>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C8A46B]/50 to-transparent mx-auto mb-4" />
                <p className="font-calligraphy text-[#8A7040] text-2xl leading-relaxed mb-2">
                  {groomName}
                </p>
                <span className="text-[#C8A46B] text-lg font-english">&</span>
                <p className="font-calligraphy text-[#8A7040] text-2xl leading-relaxed mt-2">
                  {brideName}
                </p>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C8A46B]/50 to-transparent mx-auto mt-4 mb-3" />
                <p className="font-arabic text-[#B09060]/60 text-xs tracking-wide">
                  نتشرف بدعوتكم لمشاركتنا فرحتنا
                </p>
              </motion.div>
            </div>
          </div>

          {/* ─── PAGE EDGES (right side) ─── */}
          <div
            className="absolute top-[2px] bottom-[2px]"
            style={{
              right: "-7px",
              width: "7px",
              background: "repeating-linear-gradient(to bottom, #F8F4EC 0px, #F8F4EC 1.5px, #EAE3D5 1.5px, #EAE3D5 3px)",
              borderRadius: "0 3px 3px 0",
              boxShadow: "2px 0 4px rgba(0,0,0,0.08)",
            }}
          />

          {/* ─── PAGE EDGES (bottom) ─── */}
          <div
            className="absolute left-[2px] right-[2px]"
            style={{
              bottom: "-5px",
              height: "5px",
              background: "repeating-linear-gradient(to right, #F8F4EC 0px, #F8F4EC 1.5px, #EAE3D5 1.5px, #EAE3D5 3px)",
              borderRadius: "0 0 3px 3px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
            }}
          />

          {/* ─── INNER PAGES (visible when open) ─── */}
          {showPages && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`page-${i}`}
                  initial={{ rotateY: 0, opacity: 0 }}
                  animate={{
                    rotateY: -(20 + i * 15),
                    opacity: 0.9 - i * 0.15,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.12,
                    ease: [0.25, 0.46, 0.45, 0.94] as const,
                  }}
                  className="absolute inset-0"
                  style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    zIndex: 8 - i,
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-sm"
                    style={{
                      background: `linear-gradient(to right, #F5F0E6 0%, ${i % 2 === 0 ? '#FAF7F0' : '#F8F4EB'} 100%)`,
                      boxShadow: "inset 0 0 15px rgba(0,0,0,0.03), -2px 0 8px rgba(0,0,0,0.04)",
                      backfaceVisibility: "hidden",
                    }}
                  />
                </motion.div>
              ))}
            </>
          )}

          {/* ─── FRONT COVER (the opening part) ─── */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: coverOpen ? -165 : 0 }}
            transition={{
              duration: 1.8,
              ease: [0.22, 0.61, 0.36, 1] as const,
            }}
            className="absolute inset-0 cursor-pointer"
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              zIndex: coverOpen ? 5 : 20,
            }}
            onClick={handleOpen}
          >
            {/* FRONT FACE – The cover image */}
            <div
              className="absolute inset-0 rounded-sm overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                boxShadow: coverOpen
                  ? "none"
                  : "0 20px 60px rgba(0,0,0,0.25), 0 8px 25px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Cover image */}
              <img
                src="/book-cover.jpg"
                alt="Wedding Invitation Book Cover"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />

              {/* Subtle sheen overlay */}
              <motion.div
                animate={{
                  backgroundPosition: coverOpen ? "200% 200%" : "0% 0%",
                }}
                transition={{ duration: 3, ease: "linear" }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 55%, transparent 70%)",
                  backgroundSize: "200% 200%",
                }}
              />

              {/* Gold edge highlight on top */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(to right, #B89855, #D4B77A, #C8A46B, #B89855)" }}
              />
              {/* Gold edge highlight on bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(to right, #B89855, #D4B77A, #C8A46B, #B89855)" }}
              />
              {/* Gold edge highlight on right */}
              <div
                className="absolute top-0 bottom-0 right-0 w-[2px]"
                style={{ background: "linear-gradient(to bottom, #B89855, #D4B77A, #C8A46B, #B89855)" }}
              />
            </div>

            {/* BACK FACE of front cover (visible when flipped) */}
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "linear-gradient(155deg, #E5DCC8 0%, #D8CEBA 50%, #CCC2AE 100%)",
                boxShadow: "inset 0 0 25px rgba(0,0,0,0.05)",
              }}
            >
              {/* Ornamental pattern on inside cover */}
              <div
                className="absolute inset-4 border border-[#C8A46B]/12 rounded"
                style={{
                  backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 25px, rgba(200,164,107,0.025) 25px, rgba(200,164,107,0.025) 26px)",
                }}
              />
            </div>
          </motion.div>

          {/* ─── GOLD SPINE (left edge, always visible) ─── */}
          <div
            className="absolute top-0 bottom-0 left-0 z-[22] pointer-events-none"
            style={{ width: "14px" }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, #B89855 0%, #D4B77A 30%, #C8A46B 60%, #B09050 100%)",
                borderRadius: "3px 0 0 3px",
                boxShadow: "inset 1px 0 4px rgba(255,255,255,0.15), inset -1px 0 3px rgba(0,0,0,0.1), -2px 0 6px rgba(0,0,0,0.1)",
              }}
            >
              {/* Spine decorative bands */}
              {[12, 25, 75, 88].map((pct) => (
                <div
                  key={pct}
                  className="absolute left-0 right-0 h-[2px]"
                  style={{
                    top: `${pct}%`,
                    background: "linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
                  }}
                />
              ))}
              {/* Center spine line */}
              <div className="absolute top-[30%] bottom-[30%] left-1/2 -translate-x-1/2 w-[1px] bg-white/10" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══ CINEMATIC LIGHT BURST on zoom ═══ */}
      <AnimatePresence>
        {zoomingIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-40 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 40% 50%, rgba(255,252,240,0.95) 0%, rgba(247,245,242,0.9) 40%, rgba(240,236,228,0.85) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ═══ HINT TEXT ═══ */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: [0.3, 1, 0.3], y: 0 }}
            exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
            transition={{
              opacity: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
              y: { duration: 0.6 },
            }}
            className="absolute bottom-16 sm:bottom-20 z-20 flex flex-col items-center pointer-events-none"
          >
            {/* Tap icon */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-10 h-10 mb-3 flex items-center justify-center"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9E7D46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 13V4.5a1.5 1.5 0 0 1 3 0V12" />
                <path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0V12" />
                <path d="M14 10.5a1.5 1.5 0 0 1 3 0V12" />
                <path d="M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2 .208a6 6 0 0 1-5.012-2.7L7 19c-.312-.479-1.407-2.388-3.286-5.728a1.5 1.5 0 0 1 .536-2.022 1.867 1.867 0 0 1 2.28.28L8 13" />
              </svg>
            </motion.div>
            <p className="font-arabic text-base text-[#9E7D46] font-semibold tracking-wide">
              اضغط لفتح الدعوة
            </p>
            <p className="font-english text-[10px] text-[#C8A46B]/50 tracking-[0.25em] uppercase mt-1.5">
              Tap to Open
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Brand footer ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpening ? 0 : 0.4 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-6 text-center font-english text-[10px] text-[#C8A46B] tracking-[0.3em] uppercase z-10"
      >
        {brideNameEn} & {groomNameEn}
      </motion.div>
    </motion.div>
  );
}
