"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import Envelope from "@/components/Envelope";
import HeroIllustrationLanding from "@/components/HeroIllustrationLanding";
import HeroInvitation from "@/components/HeroInvitation";
import InvitationMessage from "@/components/InvitationMessage";
import EventDetails from "@/components/EventDetails";
import Timeline from "@/components/Timeline";
import GoogleMaps from "@/components/GoogleMaps";
import RSVP from "@/components/RSVP";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

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
            brideName={weddingConfig.brideName}
            groomName={weddingConfig.groomName}
            brideNameEn={weddingConfig.brideNameEn}
            groomNameEn={weddingConfig.groomNameEn}
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col min-h-screen pb-20 md:pb-0"
          >
            {/* Top Luxury Watercolor Landing Cover Page */}
            <HeroIllustrationLanding
              brideName={weddingConfig.brideName}
              groomName={weddingConfig.groomName}
              brideNameEn={weddingConfig.brideNameEn}
              groomNameEn={weddingConfig.groomNameEn}
            />

            {/* Hero Section */}
            <HeroInvitation
              brideName={weddingConfig.brideName}
              groomName={weddingConfig.groomName}
              countdownDate={weddingConfig.countdownDate}
              hijriDate={weddingConfig.hijriDate}
              gregorianDate={weddingConfig.gregorianDate}
            />

            {/* Invitation Message */}
            <InvitationMessage text={weddingConfig.invitationText} />

            {/* Google Maps Location */}
            <GoogleMaps
              embedUrl={weddingConfig.googleMapsEmbedUrl}
              mapsLink={weddingConfig.googleMapsLink}
              hallName={weddingConfig.hallName}
            />

            {/* Event Details */}
            <EventDetails
              hallName={weddingConfig.hallName}
              address={weddingConfig.address}
              gregorianDate={weddingConfig.gregorianDate}
              hijriDate={weddingConfig.hijriDate}
            />

            {/* Event Timeline */}
            <Timeline events={weddingConfig.timeline} />

            {/* RSVP Form */}
            <RSVP />

            {/* Mobile Bottom Floating Nav Bar */}
            <BottomNav />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
