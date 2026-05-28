"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

// Global handle to trigger spray sound from other files
let globalPlaySpray: (() => void) | null = null;

export const playGlobalSpraySound = () => {
  if (globalPlaySpray) {
    globalPlaySpray();
  }
};

export default function SoundPlayer() {
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Synth nodes
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize Web Audio API nodes
  const initAudio = () => {
    if (audioCtxRef.current) return;
    
    // Create audio context
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Create a low pass filter for warm showroom feel
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 400;
    filter.Q.value = 1;
    filterRef.current = filter;

    // Main gain controls master volume
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    gainNodeRef.current = masterGain;

    // Connect to speakers
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    // Warm synthesizer drone oscillator 1 (Triangle wave at 110Hz - A2)
    const osc1 = ctx.createOscillator();
    osc1.type = "triangle";
    osc1.frequency.value = 110;
    
    const gain1 = ctx.createGain();
    gain1.gain.value = 0.15;
    osc1.connect(gain1);
    gain1.connect(filter);
    osc1.start();
    osc1Ref.current = osc1;

    // Warm synthesizer drone oscillator 2 (Sine wave at 165Hz - E3 Fifth)
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 165;
    
    const gain2 = ctx.createGain();
    gain2.gain.value = 0.2;
    osc2.connect(gain2);
    gain2.connect(filter);
    osc2.start();
    osc2Ref.current = osc2;

    // LFO to slowly sweep filter frequency (luxury organic movement)
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08; // Super slow - 12 seconds per sweep
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 180; // Sweep filter between 220Hz and 580Hz
    
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    lfoRef.current = lfo;

    setIsPlaying(true);
  };

  // Synthesize a spray mist pshhht sound dynamically!
  const playSpraySound = () => {
    try {
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      
      // If audio context is suspended (browser policy), resume it
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // 1. Synthesize White Noise Buffer
      const bufferSize = ctx.sampleRate * 0.45; // 0.45 second spray
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      // 2. Highpass Filter for crisp spray mist sound
      const hpFilter = ctx.createBiquadFilter();
      hpFilter.type = "highpass";
      hpFilter.frequency.value = 2500; // Let only crisp airy sounds through

      // 3. Lowpass Filter for natural water spray weight
      const lpFilter = ctx.createBiquadFilter();
      lpFilter.type = "lowpass";
      lpFilter.frequency.value = 5000;

      // 4. Amplitude Envelope
      const sprayGain = ctx.createGain();
      
      // Sound routing
      noiseSource.connect(hpFilter);
      hpFilter.connect(lpFilter);
      lpFilter.connect(sprayGain);
      sprayGain.connect(ctx.destination);

      // Program the spray aerosol envelope (rapid attack, smooth decay)
      const now = ctx.currentTime;
      sprayGain.gain.setValueAtTime(0, now);
      // Fast burst attack
      sprayGain.gain.linearRampToValueAtTime(0.35, now + 0.04);
      // Continuous spray body decay
      sprayGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      noiseSource.start(now);
      noiseSource.stop(now + 0.46);
    } catch (e) {
      console.log("Audio synthesis error: ", e);
    }
  };

  // Connect global helper
  useEffect(() => {
    globalPlaySpray = playSpraySound;
    return () => {
      globalPlaySpray = null;
    };
  }, [isPlaying]);

  // Handle mute toggling
  const handleToggleMute = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    if (muted) {
      // Fade in ambient drone (avoid pops)
      gainNodeRef.current?.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 1.5);
      setMuted(false);
      // Play a satisfying welcome spray
      setTimeout(() => playSpraySound(), 200);
    } else {
      // Fade out ambient drone
      gainNodeRef.current?.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      setMuted(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Sound active text indicator */}
      {!muted && (
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest bg-gold/10 border border-gold/20 text-gold px-2.5 py-1 rounded-full animate-gold-shine">
          <Sparkles className="w-2.5 h-2.5 animate-spin" />
          Royal Showroom Ambience Active
        </span>
      )}

      {/* Circle button */}
      <button
        onClick={handleToggleMute}
        className={`w-10 h-10 rounded-full border ${
          muted ? "border-white/10 hover:border-gold/50 bg-black text-white/70" : "border-gold bg-gold text-black animate-pulse"
        } flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer`}
        title={muted ? "Enable Luxury Room Ambience" : "Mute Ambience"}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
