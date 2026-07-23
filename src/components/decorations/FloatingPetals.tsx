"use client";

import React, { useMemo } from "react";

/* ═══════════════════════════════════════════════════════
   FLOATING PETALS — CSS-only animated petal overlay
   Renders ~18 falling petals with random sizes, positions,
   drift speeds, and rotations. Very low opacity (5–12%).
   ═══════════════════════════════════════════════════════ */

const PETAL_COLORS = [
  "#FAF7F2", // cream
  "#F5E6E0", // blush
  "#F0E6D8", // champagne
  "#EDD5CC", // soft rose
  "#FFFFFF", // white
  "#DFC8AD", // warm champagne
];

const PETAL_COUNT = 24;

interface PetalData {
  id: number;
  left: string;
  size: number;
  color: string;
  duration: string;
  delay: string;
  drift: number;
  initialRotate: number;
  opacity: number;
}

function generatePetals(): PetalData[] {
  const petals: PetalData[] = [];
  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push({
      id: i,
      left: `${(i / PETAL_COUNT) * 100 + Math.random() * (100 / PETAL_COUNT)}%`,
      size: 14 + Math.random() * 18, // 14–32px
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      duration: `${12 + Math.random() * 10}s`, // 12–22s
      delay: `${-Math.random() * 20}s`, // stagger starts
      drift: -35 + Math.random() * 70, // horizontal drift range
      initialRotate: Math.random() * 360,
      opacity: 0.35 + Math.random() * 0.25, // 35–60%
    });
  }
  return petals;
}

export default function FloatingPetals() {
  const petals = useMemo(() => generatePetals(), []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal absolute"
          style={{
            left: p.left,
            top: "-5%",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
            ["--petal-drift" as string]: `${p.drift}px`,
            ["--petal-rotate" as string]: `${p.initialRotate}deg`,
          }}
        >
          <svg
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M15 2 C10 6,4 12,6 18 C8 24,13 26,15 24 C17 26,22 24,24 18 C26 12,20 6,15 2Z"
              fill={p.color}
              stroke="#C8A46B"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
