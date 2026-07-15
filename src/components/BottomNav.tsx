"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Calendar, MapPin } from "lucide-react";

export default function BottomNav() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    {
      label: "الدعوة",
      icon: <Home className="w-5 h-5" />,
      action: () => handleScroll("hero"),
    },
    {
      label: "الموقع",
      icon: <MapPin className="w-5 h-5" />,
      action: () => handleScroll("location"),
    },
    {
      label: "الموعد",
      icon: <Calendar className="w-5 h-5" />,
      action: () => handleScroll("details"),
    },
  ];

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] as const }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-[320px] md:hidden"
    >
      <div className="bg-white/80 backdrop-blur-lg border border-[#DFD5C6]/40 rounded-full py-3 px-6 shadow-2xl flex items-center justify-between gap-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-[#C8A46B] active:text-[#C8A46B] cursor-pointer transition-colors flex-1"
          >
            {item.icon}
            <span className="text-[10px] font-arabic">{item.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
