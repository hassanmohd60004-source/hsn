"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   useParallax — Mobile-focused gyroscope parallax hook
   Returns { x, y } offset values (-15 to +15 px) from
   device tilt (mobile) or mouse movement (desktop fallback).
   ═══════════════════════════════════════════════════════ */

interface ParallaxOffset {
  x: number;
  y: number;
}

const MAX_OFFSET = 15; // px
const SMOOTHING = 0.08; // lower = smoother

export function useParallax(): ParallaxOffset {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });
  const targetRef = useRef<ParallaxOffset>({ x: 0, y: 0 });
  const currentRef = useRef<ParallaxOffset>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const hasGyro = useRef(false);

  const animate = useCallback(() => {
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * SMOOTHING;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * SMOOTHING;
    setOffset({ x: currentRef.current.x, y: currentRef.current.y });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Try device orientation first (mobile)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      hasGyro.current = true;
      const x = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, (e.gamma / 30) * MAX_OFFSET));
      const y = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, ((e.beta - 45) / 30) * MAX_OFFSET));
      targetRef.current = { x, y };
    };

    // Fallback: mouse move (desktop)
    const handleMouseMove = (e: MouseEvent) => {
      if (hasGyro.current) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const x = ((e.clientX - cx) / cx) * MAX_OFFSET;
      const y = ((e.clientY - cy) / cy) * MAX_OFFSET;
      targetRef.current = { x, y };
    };

    window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return offset;
}
