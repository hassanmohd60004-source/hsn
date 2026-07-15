"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  url: string;
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicPlayer({ url, isPlaying, onToggle }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4; // Soft volume for ambient feel
    }

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay blocked by browser. Awaiting user interaction.", err);
      });
    } else {
      audioRef.current.pause();
    }

    return () => {
      // Don't pause on small re-renders, but clean up on unmount
    };
  }, [isPlaying, url]);

  return (
    <div className="fixed bottom-24 left-6 z-40 md:bottom-6 md:left-6 select-none">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#DFD5C6]/40 text-[#C8A46B] flex items-center justify-center shadow-lg cursor-pointer hover:border-[#C8A46B]/40 transition-colors"
        title={isPlaying ? "كتم الصوت" : "تشغيل الموسيقى"}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center w-6 h-6">
            <Volume2 className="w-5 h-5" />
            {/* Ambient soundwaves indicator */}
            <span className="absolute w-full h-full rounded-full border border-[#C8A46B]/30 animate-ping" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400" />
        )}
      </motion.button>
    </div>
  );
}
