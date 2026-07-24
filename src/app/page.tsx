"use client";

import React from "react";
import { weddingConfig } from "@/config/wedding";
import HeroInvitation from "@/components/HeroInvitation";
import InvitationMessage from "@/components/InvitationMessage";
import EventDetails from "@/components/EventDetails";
import Timeline from "@/components/Timeline";
import GoogleMaps from "@/components/GoogleMaps";
import RSVP from "@/components/RSVP";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-background flex flex-col pb-20 md:pb-0">
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
    </main>
  );
}
