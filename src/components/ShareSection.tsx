"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Copy, Check, MessageCircle } from "lucide-react";

interface ShareSectionProps {
  shareMessage: string;
  brideName: string;
  groomName: string;
}

/* ───────── Ornamental SVG Divider ───────── */
const OrnamentalDivider = () => (
  <svg
    viewBox="0 0 400 40"
    className="w-48 md:w-64 h-8 mx-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 20 Q50 0 100 20 T200 20 T300 20 T400 20"
      stroke="#C8A46B"
      strokeWidth="1"
      opacity="0.5"
    />
    <circle cx="200" cy="20" r="4" fill="#C8A46B" opacity="0.8" />
    <circle cx="170" cy="20" r="2" fill="#C8A46B" opacity="0.4" />
    <circle cx="230" cy="20" r="2" fill="#C8A46B" opacity="0.4" />
    <path d="M185 14 L200 8 L215 14" stroke="#C8A46B" strokeWidth="1" opacity="0.6" />
    <path d="M185 26 L200 32 L215 26" stroke="#C8A46B" strokeWidth="1" opacity="0.6" />
    <line x1="50" y1="20" x2="160" y2="20" stroke="#C8A46B" strokeWidth="0.5" opacity="0.3" />
    <line x1="240" y1="20" x2="350" y2="20" stroke="#C8A46B" strokeWidth="0.5" opacity="0.3" />
  </svg>
);

/* ───────── Top ornamental border ───────── */
const SectionTopBorder = () => (
  <svg
    viewBox="0 0 800 20"
    className="w-full h-4 absolute top-0 left-0 right-0"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <line x1="0" y1="10" x2="350" y2="10" stroke="#C8A46B" strokeWidth="0.5" opacity="0.2" />
    <circle cx="360" cy="10" r="2" fill="#C8A46B" opacity="0.3" />
    <path d="M370 10 Q400 2 430 10" stroke="#C8A46B" strokeWidth="1" opacity="0.4" />
    <circle cx="440" cy="10" r="2" fill="#C8A46B" opacity="0.3" />
    <line x1="450" y1="10" x2="800" y2="10" stroke="#C8A46B" strokeWidth="0.5" opacity="0.2" />
  </svg>
);

export default function ShareSection({ shareMessage, brideName, groomName }: ShareSectionProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setCanShare(true);
    }
  }, []);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  const handleCopyLink = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWhatsAppShare = () => {
    const url = getShareUrl();
    const text = encodeURIComponent(`${shareMessage}${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleNativeShare = () => {
    const url = getShareUrl();
    if (navigator.share) {
      navigator.share({
        title: `دعوة زفاف ${groomName} & ${brideName}`,
        text: shareMessage,
        url: url,
      }).catch((error) => console.log("Error sharing:", error));
    } else {
      handleCopyLink();
    }
  };

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-white via-[#F7F5F2]/50 to-[#F7F5F2] text-center overflow-hidden">
      {/* Top ornamental border */}
      <SectionTopBorder />

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C8A46B]/[0.03] rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="max-w-lg mx-auto space-y-10 relative z-10"
      >
        {/* ─── Section Header ─── */}
        <div className="space-y-5">
          <span className="text-xs text-[#C8A46B] tracking-[0.3em] uppercase font-english">
            Share the Joy
          </span>
          <h3 className="text-2xl md:text-3xl font-bold font-arabic text-[#1A1A1A]">
            مشاركة الدعوة
          </h3>
          <OrnamentalDivider />
          <p className="text-sm text-gray-500 font-arabic leading-relaxed">
            يسعدنا أن تشاركوا فرحتنا مع من تحبون
          </p>
        </div>

        {/* ─── Share Buttons ─── */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* WhatsApp share */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleWhatsAppShare}
            className="relative flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0e7a6e] text-white rounded-2xl text-sm font-semibold font-arabic shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/30 cursor-pointer transition-all duration-300 overflow-hidden group/btn"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
            <MessageCircle className="w-5 h-5 relative z-10" />
            <span className="relative z-10">واتساب</span>
          </motion.button>

          {/* Native web share */}
          {canShare && (
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNativeShare}
              className="relative flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-[#C8A46B] to-[#9E7D46] text-white rounded-2xl text-sm font-semibold font-arabic shadow-lg shadow-[#C8A46B]/20 hover:shadow-xl hover:shadow-[#C8A46B]/30 cursor-pointer transition-all duration-300 overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              <Share2 className="w-5 h-5 relative z-10" />
              <span className="relative z-10">مشاركة</span>
            </motion.button>
          )}

          {/* Copy Link */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCopyLink}
            className="relative flex items-center gap-2.5 px-7 py-4 bg-white/80 backdrop-blur-sm hover:bg-white text-[#1A1A1A] border border-[#DFD5C6]/50 hover:border-[#C8A46B]/40 rounded-2xl text-sm font-semibold font-arabic shadow-sm hover:shadow-md cursor-pointer transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-2.5 text-[#25D366] font-semibold"
                >
                  <div className="w-5 h-5 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>تم النسخ</span>
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C8A46B]/10 flex items-center justify-center">
                    <Copy className="w-3.5 h-3.5 text-[#C8A46B]" />
                  </div>
                  <span>نسخ الرابط</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* ─── Footer Ornament ─── */}
        <div className="pt-8 space-y-4">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C8A46B]/40 to-transparent mx-auto" />
          <p className="text-xs text-[#C8A46B]/60 font-calligraphy">
            بارك الله لهما وبارك عليهما وجمع بينهما في خير
          </p>
        </div>
      </motion.div>
    </section>
  );
}
