"use client";

import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import WishlistDrawer from "@/app/components/WishlistDrawer";
import SoundPlayer from "@/app/components/SoundPlayer";
import InteractiveQuiz from "@/app/components/InteractiveQuiz";
import { Sparkles } from "lucide-react";

export default function ScentQuizPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
      <SoundPlayer />
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />

      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-6 relative">
        {/* Background ambient halo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="w-full max-w-4xl mx-auto z-10 flex flex-col gap-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-1 bg-gold/15 border border-gold/30 text-gold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full animate-gold-shine">
              <Sparkles className="w-3.5 h-3.5" />
              Concierge Olfactory Quiz
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-white uppercase tracking-widest mt-4">
              FIND YOUR SIGNATURE AURA
            </h1>
            <p className="text-xs text-white/50 max-w-md mx-auto mt-2 leading-relaxed font-light">
              By aligning fabric density, emotional atmosphere, and projection strength, our master perfumers isolate the perfect SWAVIK extraction for your lifestyle.
            </p>
          </div>

          <InteractiveQuiz />
        </div>
      </main>

      <Footer />
    </div>
  );
}
