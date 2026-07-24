"use client";

import React, { useState } from "react";
import { weddingConfig } from "@/config/wedding";
import BookCover from "@/components/BookCover";
import HeroInvitation from "@/components/HeroInvitation";
import InvitationMessage from "@/components/InvitationMessage";
import EventDetails from "@/components/EventDetails";
import Timeline from "@/components/Timeline";
import GoogleMaps from "@/components/GoogleMaps";
import RSVP from "@/components/RSVP";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  const [isOpenComplete, setIsOpenComplete] = useState(false);

  return (
    <main className="min-h-screen relative bg-background">
      {/* ═══ BOOK COVER LANDING SCREEN ═══ */}
      {!isOpenComplete && (
        <BookCover onComplete={() => setIsOpenComplete(true)} />
      )}

      {/* ═══ MAIN WEBSITE CONTENT ═══ */}
      <div className="flex flex-col min-h-screen pb-20 md:pb-0">
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
      </div>
    </main>
  );
}
