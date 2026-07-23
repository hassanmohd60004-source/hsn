"use client";

import React, { useMemo } from "react";

/* ═══════════════════════════════════════════════════════
   SPARKLE FIELD — Twinkling sparkle dots + soft bokeh
   Provides a magical atmosphere with gold/white particles
   ═══════════════════════════════════════════════════════ */

const SPARKLE_COLORS = ["#C8A46B", "#DFD5C6", "#FFFFFF", "#D4B77A", "#F3EAD3"];

interface SparkleData {
  id: number;
  left: string;
  top: string;
  size: number;
  color: string;
  duration: string;
  delay: string;
}

interface BokehData {
  id: number;
  left: string;
  top: string;
  size: number;
  color: string;
  opacity: number;
  duration: string;
  delay: string;
}

function generateSparkles(count: number): SparkleData[] {
  const sparkles: SparkleData[] = [];
  for (let i = 0; i < count; i++) {
    sparkles.push({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 90}%`,
      size: 2 + Math.random() * 3, // 2–5px
      color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
      duration: `${2.5 + Math.random() * 4}s`, // 2.5–6.5s
      delay: `${-Math.random() * 6}s`,
    });
  }
  return sparkles;
}

function generateBokeh(count: number): BokehData[] {
  const bokeh: BokehData[] = [];
  for (let i = 0; i < count; i++) {
    bokeh.push({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      size: 28 + Math.random() * 30, // 28–58px
      color: SPARKLE_COLORS[i % 3],
      opacity: 0.03 + Math.random() * 0.04, // 3–7%
      duration: `${12 + Math.random() * 10}s`, // 12–22s
      delay: `${-Math.random() * 10}s`,
    });
  }
  return bokeh;
}

interface SparkleFieldProps {
  density?: "light" | "medium";
}

export default function SparkleField({ density = "medium" }: SparkleFieldProps) {
  const sparkleCount = density === "light" ? 8 : 14;
  const bokehCount = density === "light" ? 3 : 5;

  const sparkles = useMemo(() => generateSparkles(sparkleCount), [sparkleCount]);
  const bokeh = useMemo(() => generateBokeh(bokehCount), [bokehCount]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    >
      {/* Sparkle dots */}
      {sparkles.map((s) => (
        <div
          key={`sparkle-${s.id}`}
          className="sparkle absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* Bokeh circles */}
      {bokeh.map((b) => (
        <div
          key={`bokeh-${b.id}`}
          className="bokeh absolute rounded-full"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
            opacity: b.opacity,
            animationDuration: b.duration,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
}
