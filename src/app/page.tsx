"use client";

import React, { useState, useEffect } from "react";
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
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDev, setIsDev] = useState(false);
  
  // Hydration-safe states
  const [config, setConfig] = useState<typeof weddingConfig>(weddingConfig);
  const [styles, setStyles] = useState(defaultStyles);

  useEffect(() => {
    // Detect if running on localhost / network dev port
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
    const savedConfig = localStorage.getItem("local_wedding_config");
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error(e);
      }
    }

    const savedStyles = localStorage.getItem("local_wedding_styles");
    if (savedStyles) {
      try {
        setStyles(JSON.parse(savedStyles));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Update localStorage when configs change
  useEffect(() => {
    if (config !== weddingConfig) {
      localStorage.setItem("local_wedding_config", JSON.stringify(config));
    }
  }, [config]);

  useEffect(() => {
    if (styles !== defaultStyles) {
      localStorage.setItem("local_wedding_styles", JSON.stringify(styles));
    }
    
    // Dynamically update CSS custom properties
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty("--background", styles.background);
      document.documentElement.style.setProperty("--gold", styles.gold);
      document.documentElement.style.setProperty("--foreground", styles.textColor);
    }
  }, [styles]);

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
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
