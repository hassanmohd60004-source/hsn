"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, CalendarCheck, Heart, User, Users, Phone, MessageSquare } from "lucide-react";
import { playPaperRustle } from "@/utils/audio";
import confetti from "canvas-confetti";

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

/* ───────── Decorative Frame Corner ───────── */
const FrameCorner = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 50 50"
    className={`w-8 h-8 text-[#C8A46B] ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 48 L2 15 Q2 2 15 2 L48 2"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.5"
    />
    <path
      d="M8 48 L8 20 Q8 8 20 8 L48 8"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.25"
    />
    <circle cx="2" cy="48" r="2" fill="currentColor" opacity="0.4" />
    <circle cx="48" cy="2" r="2" fill="currentColor" opacity="0.4" />
  </svg>
);

export default function RSVP() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"attending" | "not_attending" | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [localRSVP, setLocalRSVP] = useState<{ name: string; status: string } | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Check if RSVP is already stored locally
  useEffect(() => {
    const savedRSVP = localStorage.getItem("wedding_rsvp");
    if (savedRSVP) {
      try {
        const parsed = JSON.parse(savedRSVP);
        setLocalRSVP(parsed);
        setIsSubmitted(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const triggerConfetti = () => {
    // Custom premium golden and white confetti burst
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#C8A46B", "#DFD5C6", "#FFFFFF"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#C8A46B", "#DFD5C6", "#FFFFFF"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleSubmit = async (selectedStatus: "attending" | "not_attending") => {
    if (!name.trim()) {
      alert("يرجى إدخال الاسم الكريم");
      return;
    }
    if (!phone.trim()) {
      alert("يرجى إدخال رقم الهاتف");
      return;
    }

    // Validate Egyptian mobile numbers (supports both English and Arabic numeral inputs)
    const convertArabicDigits = (str: string) => {
      const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
      return str.replace(/[٠-٩]/g, (w) => arabicDigits.indexOf(w).toString());
    };
    const normalizedPhone = convertArabicDigits(phone.trim());
    const cleanPhone = normalizedPhone.replace(/[\s\-\+]/g, "");
    const isEgyptianPhone = /^(0|20)?1[0125][0-9]{8}$/.test(cleanPhone);
    if (!isEgyptianPhone) {
      alert("يرجى إدخال رقم هاتف مصري صحيح (مثال: 01xxxxxxxxx)");
      return;
    }

    setIsSending(true);

    const rsvpData = {
      name,
      guests: selectedStatus === "attending" ? guests : "0",
      phone: cleanPhone,
      message,
      status: selectedStatus,
      date: new Date().toLocaleString("ar-EG"),
    };

    const rsvpApiUrl = process.env.NEXT_PUBLIC_RSVP_API_URL || "https://script.google.com/macros/s/AKfycbyzEmWaJFErTkYYY3ykcc772VGv1d0JC7PIKlB3yEypEdHW1XhJyph4y8S9ejqAMPc7wQ/exec";
    if (rsvpApiUrl) {
      try {
        await fetch(rsvpApiUrl, {
          method: "POST",
          mode: "no-cors", // Bypasses CORS redirect block on Google Apps Script
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rsvpData),
        });
      } catch (e) {
        console.error("Error sending RSVP:", e);
      }
    }

    localStorage.setItem("wedding_rsvp", JSON.stringify(rsvpData));
    setStatus(selectedStatus);
    setLocalRSVP(rsvpData);
    setIsSubmitted(true);
    setIsSending(false);

    if (selectedStatus === "attending") {
      triggerConfetti();
    }
  };

  const handleReset = () => {
    localStorage.removeItem("wedding_rsvp");
    setName("");
    setGuests("1");
    setPhone("");
    setMessage("");
    setStatus(null);
    setIsSubmitted(false);
    setLocalRSVP(null);
  };

  /* ───── Shared input classes ───── */
  const inputBaseClass =
    "w-full px-5 py-3.5 bg-white/80 backdrop-blur-sm border border-[#DFD5C6]/50 rounded-2xl focus:border-[#C8A46B] focus:ring-2 focus:ring-[#C8A46B]/20 font-arabic text-sm text-[#1A1A1A] outline-none transition-all duration-300 hover:border-[#C8A46B]/30 placeholder:text-gray-400";

  return (
    <section id="rsvp" className="relative py-28 px-6 bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#C8A46B]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#C8A46B]/[0.02] rounded-full blur-3xl" />
        {/* Floating heart */}
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-16"
        >
          <Heart className="w-20 h-20 text-[#C8A46B]/[0.08] stroke-1" />
        </motion.div>
        <motion.div
          animate={{ y: [6, -6, 6], rotate: [3, -3, 3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-24 left-12"
        >
          <Heart className="w-14 h-14 text-[#C8A46B]/[0.06] stroke-1" />
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto space-y-14 relative z-10">
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center space-y-5"
        >
          <span className="text-xs text-[#C8A46B] tracking-[0.3em] uppercase font-english">
            RSVP Confirmation
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-arabic text-[#1A1A1A]">
            تأكيد الحضور
          </h2>
          <OrnamentalDivider />
          <p className="text-sm text-gray-500 font-arabic max-w-md mx-auto leading-relaxed">
            يرجى تأكيد حضوركم لمساعدتنا في تنظيم الترتيبات الخاصة بكم
          </p>
        </motion.div>

        {/* ─── Form / Result ─── */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: -1.5, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          onViewportEnter={() => playPaperRustle()}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative"
        >
          <AnimatePresence mode="wait">
          {isSubmitted && localRSVP ? (
            /* ═══════ SUBMITTED STATE ═══════ */
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative"
            >
              {/* Outer glow */}
              <div
                className={`absolute -inset-2 rounded-[2rem] blur-xl transition-opacity duration-500 ${
                  localRSVP.status === "attending"
                    ? "bg-[#C8A46B]/10"
                    : "bg-red-500/5"
                }`}
              />

              <div className="relative bg-[#F7F5F2]/80 backdrop-blur-xl border border-[#DFD5C6]/50 rounded-3xl p-10 md:p-12 text-center space-y-8 shadow-xl overflow-hidden">
                {/* Top gold accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C8A46B] to-transparent" />
                {/* Bottom gold accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A46B]/30 to-transparent" />

                {/* Corner decorations */}
                <FrameCorner className="absolute top-3 left-3" />
                <FrameCorner className="absolute top-3 right-3 -scale-x-100" />
                <FrameCorner className="absolute bottom-3 left-3 -scale-y-100" />
                <FrameCorner className="absolute bottom-3 right-3 scale-x-[-1] scale-y-[-1]" />

                {/* Status icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
                >
                  {localRSVP.status === "attending" ? (
                    <div className="relative mx-auto w-20 h-20">
                      <div className="absolute inset-0 bg-[#C8A46B]/15 rounded-full blur-xl animate-pulse" />
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#C8A46B] to-[#9E7D46] border-2 border-[#C8A46B] flex items-center justify-center shadow-lg shadow-[#C8A46B]/30">
                        <CalendarCheck className="w-9 h-9 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                  ) : (
                    <div className="relative mx-auto w-20 h-20">
                      <div className="absolute inset-0 bg-red-400/10 rounded-full blur-xl" />
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 flex items-center justify-center shadow-lg">
                        <X className="w-9 h-9 text-red-400" strokeWidth={1.5} />
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="space-y-3"
                >
                  <h3 className="text-2xl font-bold font-arabic text-[#1A1A1A]">
                    {localRSVP.status === "attending" ? "نسعد بلقائك!" : "سنفتقدك!"}
                  </h3>
                  <div className="w-10 h-[1.5px] bg-gradient-to-r from-transparent via-[#C8A46B] to-transparent mx-auto" />
                  <p className="text-sm font-arabic text-gray-600 leading-relaxed max-w-sm mx-auto">
                    {localRSVP.status === "attending" ? (
                      <>
                        تم تأكيد حضورك باسم <strong className="text-[#C8A46B]">{localRSVP.name}</strong>.
                        <br />
                        نتطلع بشوق لمشاركتك فرحتنا الكبرى!
                      </>
                    ) : (
                      <>
                        نشكرك يا <strong className="text-[#C8A46B]">{localRSVP.name}</strong> على وقتك.
                        <br />
                        يؤسفنا عدم تمكنك من الحضور ونسأل الله أن يجمعنا في مناسبات قادمة.
                      </>
                    )}
                  </p>
                </motion.div>

                {/* Reset button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  onClick={handleReset}
                  className="text-xs font-arabic text-gray-400 hover:text-[#C8A46B] underline underline-offset-4 decoration-gray-300 hover:decoration-[#C8A46B] transition-all duration-300 cursor-pointer"
                >
                  تعديل الاستجابة / تأكيد حضور آخر
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* ═══════ FORM STATE ═══════ */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative"
            >
              {/* Subtle outer glow */}
              <div className="absolute -inset-1 bg-gradient-to-b from-[#C8A46B]/10 via-transparent to-[#C8A46B]/5 rounded-[2rem] blur-xl" />

              <div className="relative bg-[#F7F5F2]/70 backdrop-blur-xl border border-[#DFD5C6]/50 rounded-3xl p-7 md:p-10 space-y-8 shadow-lg overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C8A46B] to-transparent" />

                {/* Corner decorations */}
                <FrameCorner className="absolute top-3 left-3" />
                <FrameCorner className="absolute top-3 right-3 -scale-x-100" />

                {/* Mandatory Notice Banner */}
                <div className="bg-[#C8A46B]/5 border border-[#C8A46B]/15 rounded-2xl p-4 text-center text-xs md:text-sm text-[#9E7D46] font-arabic leading-relaxed">
                  ⚠️ يرجى تأكيد حضوركم وملء البيانات المطلوبة بدقة لنتمكن من حصر أعداد الحضور وتنسيق التجهيزات الخاصة بكم.
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold font-arabic text-[#1A1A1A] flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#C8A46B]/10 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-[#C8A46B]" />
                      </div>
                      الاسم الكريم *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="الاسم الثلاثي"
                      className={inputBaseClass}
                      required
                    />
                  </div>

                  {/* Guest Count */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold font-arabic text-[#1A1A1A] flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#C8A46B]/10 flex items-center justify-center">
                        <Users className="w-3.5 h-3.5 text-[#C8A46B]" />
                      </div>
                      عدد الحضور *
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className={`${inputBaseClass} appearance-none cursor-pointer`}
                      style={{
                        backgroundImage:
                          "url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23C8A46B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "left 16px center",
                        backgroundSize: "16px",
                      }}
                    >
                      <option value="1">شخص واحد</option>
                      <option value="2">شخصين</option>
                      <option value="3">٣ أشخاص</option>
                      <option value="4">٤ أشخاص</option>
                      <option value="5">٥ أشخاص</option>
                    </select>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold font-arabic text-[#1A1A1A] flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#C8A46B]/10 flex items-center justify-center">
                        <Phone className="w-3.5 h-3.5 text-[#C8A46B]" />
                      </div>
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01xxxxxxxxx"
                      className={`${inputBaseClass} text-left`}
                      dir="ltr"
                      required
                    />
                  </div>

                  {/* Optional Message */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold font-arabic text-[#1A1A1A] flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#C8A46B]/10 flex items-center justify-center">
                        <MessageSquare className="w-3.5 h-3.5 text-[#C8A46B]" />
                      </div>
                      رسالة تهنئة للعروسين (اختيارية)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="أجمل التمنيات بحياة زوجية سعيدة..."
                      rows={3}
                      className={`${inputBaseClass} resize-none`}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-5 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSubmit("attending")}
                    disabled={isSending}
                    className="relative flex items-center justify-center gap-2.5 px-6 py-4.5 bg-gradient-to-r from-[#C8A46B] to-[#9E7D46] text-white rounded-2xl font-arabic text-sm font-semibold shadow-lg shadow-[#C8A46B]/25 hover:shadow-xl hover:shadow-[#C8A46B]/35 transition-all duration-300 cursor-pointer overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                    <Check className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{isSending ? "جاري الإرسال..." : "سأحضر"}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSubmit("not_attending")}
                    disabled={isSending}
                    className="flex items-center justify-center gap-2.5 px-6 py-4.5 bg-white/80 backdrop-blur-sm hover:bg-red-50/80 text-red-400 border border-red-200/60 hover:border-red-300 rounded-2xl font-arabic text-sm font-semibold transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                    <span>{isSending ? "جاري الإرسال..." : "لن أتمكن"}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
