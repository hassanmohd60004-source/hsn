"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import Envelope from "@/components/Envelope";
import HeroInvitation from "@/components/HeroInvitation";
import InvitationMessage from "@/components/InvitationMessage";
import EventDetails from "@/components/EventDetails";
import Timeline from "@/components/Timeline";
import GoogleMaps from "@/components/GoogleMaps";
import RSVP from "@/components/RSVP";
import ShareSection from "@/components/ShareSection";
import BottomNav from "@/components/BottomNav";
import LocalCustomizer from "@/components/LocalCustomizer";

const defaultStyles = {
  background: "#F7F5F2",
  gold: "#C8A46B",
  textColor: "#1A1A1A",
  namesFont: "font-messiri",
  namesSize: "text-4.5xl md:text-6.5xl",
  bodySize: "text-xl md:text-2xl",
  wordStyles: {} as Record<string, any>,
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDev, setIsDev] = useState(false);
  
  // Master states
  const [config, setConfig] = useState<typeof weddingConfig>(weddingConfig);
  const [styles, setStyles] = useState(defaultStyles);

  // Undo/Redo history stack states
  const [history, setHistory] = useState<{ config: any; styles: any }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoingOrRedoing = useRef(false);

  // Initialize and check localhost
  useEffect(() => {
    const hostname = window.location.hostname;
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "192.168.1.254" ||
      process.env.NODE_ENV === "development"
    ) {
      setIsDev(true);
    }

    // Load saved local configs
    let initialConfig = weddingConfig;
    let initialStyles = defaultStyles;

    const savedConfig = localStorage.getItem("local_wedding_config");
    if (savedConfig) {
      try {
        initialConfig = JSON.parse(savedConfig);
        setConfig(initialConfig);
      } catch (e) {
        console.error(e);
      }
    }

    const savedStyles = localStorage.getItem("local_wedding_styles");
    if (savedStyles) {
      try {
        initialStyles = JSON.parse(savedStyles);
        setStyles(initialStyles);
      } catch (e) {
        console.error(e);
      }
    }

    // Initialize history stack
    setHistory([{ config: initialConfig, styles: initialStyles }]);
    setHistoryIndex(0);
  }, []);

  // Sync state modifications to history stack (debounced by 400ms)
  useEffect(() => {
    if (historyIndex === -1) return;

    if (isUndoingOrRedoing.current) {
      isUndoingOrRedoing.current = false;
      return;
    }

    const handler = setTimeout(() => {
      // Check if current states are actually different from the last history snapshot
      const currentSnapshot = history[historyIndex];
      if (
        currentSnapshot &&
        JSON.stringify(currentSnapshot.config) === JSON.stringify(config) &&
        JSON.stringify(currentSnapshot.styles) === JSON.stringify(styles)
      ) {
        return;
      }

      // Truncate redo history and push new state
      const newHistory = history.slice(0, historyIndex + 1);
      const updatedHistory = [...newHistory, { config, styles }];
      
      setHistory(updatedHistory);
      setHistoryIndex(updatedHistory.length - 1);

      // Save to localStorage
      localStorage.setItem("local_wedding_config", JSON.stringify(config));
      localStorage.setItem("local_wedding_styles", JSON.stringify(styles));
    }, 400);

    return () => clearTimeout(handler);
  }, [config, styles]);

  // Synchronize CSS custom properties
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty("--background", styles.background);
      document.documentElement.style.setProperty("--gold", styles.gold);
      document.documentElement.style.setProperty("--foreground", styles.textColor);
    }
  }, [styles]);

  // Undo / Redo Actions
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const snapshot = history[prevIndex];
      isUndoingOrRedoing.current = true;
      setHistoryIndex(prevIndex);
      setConfig(snapshot.config);
      setStyles(snapshot.styles);
      // Force update localStorage
      localStorage.setItem("local_wedding_config", JSON.stringify(snapshot.config));
      localStorage.setItem("local_wedding_styles", JSON.stringify(snapshot.styles));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const snapshot = history[nextIndex];
      isUndoingOrRedoing.current = true;
      setHistoryIndex(nextIndex);
      setConfig(snapshot.config);
      setStyles(snapshot.styles);
      localStorage.setItem("local_wedding_config", JSON.stringify(snapshot.config));
      localStorage.setItem("local_wedding_styles", JSON.stringify(snapshot.styles));
    }
  };

  const handleReset = () => {
    localStorage.removeItem("local_wedding_config");
    localStorage.removeItem("local_wedding_styles");
    setConfig(weddingConfig);
    setStyles(defaultStyles);
    window.location.reload();
  };

  const handleOpenEnvelope = () => {
    setIsOpen(true);
  };

  return (
    <main className="min-h-screen relative bg-background">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <Envelope
            key="envelope"
            onOpen={handleOpenEnvelope}
            brideName={config.brideName}
            groomName={config.groomName}
            brideNameEn={config.brideNameEn}
            groomNameEn={config.groomNameEn}
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col min-h-screen pb-20 md:pb-0"
          >
            {/* Hero Section */}
            <HeroInvitation
              brideName={config.brideName}
              groomName={config.groomName}
              countdownDate={config.countdownDate}
              hijriDate={config.hijriDate}
              gregorianDate={config.gregorianDate}
              namesFont={styles.namesFont}
            />

            {/* Invitation Message */}
            <InvitationMessage 
              text={config.invitationText} 
              namesFont={styles.namesFont}
              namesSize={styles.namesSize}
              bodySize={styles.bodySize}
              stylesObj={styles}
            />

            {/* Google Maps Location */}
            <GoogleMaps
              embedUrl={config.googleMapsEmbedUrl}
              mapsLink={config.googleMapsLink}
              hallName={config.hallName}
            />

            {/* Event Details */}
            <EventDetails
              hallName={config.hallName}
              address={config.address}
              gregorianDate={config.gregorianDate}
              hijriDate={config.hijriDate}
            />

            {/* Event Timeline */}
            <Timeline events={config.timeline} />

            {/* RSVP Form */}
            <RSVP />

            {/* Share Invitation */}
            <ShareSection
              shareMessage={config.shareMessage}
              brideName={config.brideName}
              groomName={config.groomName}
            />

            {/* Mobile Bottom Floating Nav Bar */}
            <BottomNav />

            {/* Local Developer Customizer - visible only on localhost */}
            {isDev && (
              <LocalCustomizer
                config={config}
                onChangeConfig={setConfig}
                styles={styles}
                onChangeStyles={setStyles}
                onReset={handleReset}
                canUndo={historyIndex > 0}
                canRedo={historyIndex < history.length - 1}
                onUndo={handleUndo}
                onRedo={handleRedo}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
