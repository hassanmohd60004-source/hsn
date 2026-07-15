"use client";

let lastPlayTime = 0;

/** Synthesize a soft paper sliding / rustling sound using Web Audio API (no music) */
export const playPaperRustle = () => {
  if (typeof window === "undefined") return;
  
  const now = Date.now();
  // Prevent spamming overlap when scrolling fast (600ms cooldown)
  if (now - lastPlayTime < 650) return;
  lastPlayTime = now;

  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const bufferSize = ctx.sampleRate * 0.75; // 0.75 seconds sound
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    // Bandpass filter to isolate the paper rustling frequency range (800Hz - 2200Hz)
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.Q.setValueAtTime(0.85, ctx.currentTime);
    // Smooth frequency decay to simulate slowing friction of sliding paper
    filter.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.65);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.08); // soft start
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7); // smooth fade out

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseNode.start(ctx.currentTime);
    noiseNode.stop(ctx.currentTime + 0.75);
  } catch (e) {
    console.error("Failed to play paper rustle sound:", e);
  }
};
