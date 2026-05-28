"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import WishlistDrawer from "@/app/components/WishlistDrawer";
import SoundPlayer from "@/app/components/SoundPlayer";
import { Sparkles, ShieldCheck, Flame, Compass, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
      <SoundPlayer />
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />

      {/* Hero Banner */}
      <section className="relative py-32 bg-[#080808] border-b border-white/5 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,#0B0B0B_80%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.3em] bg-gold/10 border border-gold/30 text-gold px-3.5 py-1.5 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Our Story & Legacy
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-widest leading-tight">
            ROOTED IN NATURE. <br />
            <span className="text-gold-gradient">CRAFTED WITH DEVOTION.</span>
          </h1>
          <p className="text-xs md:text-sm text-white/50 max-w-xl mx-auto mt-6 leading-relaxed font-light">
            SWAVIK was born from a singular, revolutionary realization: true fragrance should live inside your fabrics, not evaporate from your skin.
          </p>
        </div>
      </section>

      {/* Main Philosophy */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">The Rare Craft</span>
            <h2 className="font-serif text-3xl text-white uppercase tracking-widest leading-tight">
              THE ART OF STEAM DISTILLATION
            </h2>
            <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light font-sans">
              Every drop of SWAVIK organic oils undergoes meticulous traditional steam distillation. Sourced directly from our family plantations and curated growers, we harvest raw sandalwood bark, Cambodian agarwood chips, and fresh Damask roses at sunrise when their oil concentration peaks.
            </p>
            <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light font-sans">
              Unlike generic, cheap chemical perfumes that rely on toxic synthetic fixatives, our perfumes use Asia's largest organic natural oil bases. This artisanal patience yields pure essential oils that bind with clothing fibers, keeping you wrapped in an eternal aromatic halo.
            </p>
          </div>
          
          {/* Distillation Visual Card */}
          <div className="relative aspect-[4/3] bg-black/60 rounded-2xl border border-gold/15 flex items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-transparent" />
            <div className="relative w-full h-full flex flex-col justify-between z-10 text-center items-center py-6">
              <span className="text-gold font-serif text-6xl font-black italic block">CRAFT</span>
              <div>
                <p className="text-xs uppercase text-white tracking-widest font-bold">Zero Synthetics &bull; 100% Pure Organic</p>
                <p className="text-[10px] text-white/40 mt-1 max-w-xs">Individually handcrafted perfumery wisdom, never mass manufactured.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 70% Oil Technology Grid */}
        <div className="bg-[#080808] border border-gold/15 rounded-2xl p-8 md:p-12 mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Scientific Innovation</span>
            <h3 className="font-serif text-2xl md:text-3xl text-white uppercase tracking-widest mt-2">
              THE 70% HIGH OIL EXCLUSIVITY
            </h3>
            <p className="text-xs text-white/50 mt-2">
              Standard colognes contain only 5% to 15% fragrance oils diluted in high-percentage synthetic alcohols. SWAVIK utilizes a proprietary 70% concentration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2 p-6 bg-black/40 rounded-xl border border-white/5 text-center">
              <span className="text-gold font-serif text-3xl font-bold">01</span>
              <h4 className="text-white text-xs uppercase tracking-widest font-bold mt-2">Deep Fiber Penetration</h4>
              <p className="text-[10px] text-white/50 leading-relaxed mt-1">Our oils bind deeply with textile threads, releasing aromas gently with body motion.</p>
            </div>
            <div className="flex flex-col gap-2 p-6 bg-black/40 rounded-xl border border-white/5 text-center">
              <span className="text-gold font-serif text-3xl font-bold">02</span>
              <h4 className="text-white text-xs uppercase tracking-widest font-bold mt-2">Reduced Alcohol Sharpness</h4>
              <p className="text-[10px] text-white/50 leading-relaxed mt-1">Free of synthetic chemical boosters, eliminating the dry, coughing sting of colognes.</p>
            </div>
            <div className="flex flex-col gap-2 p-6 bg-black/40 rounded-xl border border-white/5 text-center">
              <span className="text-gold font-serif text-3xl font-bold">03</span>
              <h4 className="text-white text-xs uppercase tracking-widest font-bold mt-2">Slow Olfactory Evolution</h4>
              <p className="text-[10px] text-white/50 leading-relaxed mt-1">Notes unfold step-by-step over 96 hours, giving you a beautiful trace even after storage.</p>
            </div>
          </div>
        </div>

        {/* Traditional Sandalwood Skincare Therapy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Therapy image card */}
          <div className="relative aspect-[4/3] bg-black/60 rounded-2xl border border-gold/15 overflow-hidden flex items-center justify-center p-4">
            <Image
              src="/images/sandalwood_therapy.png"
              alt="Sandalwood Organic Skincare Therapy"
              fill
              className="object-cover opacity-75"
            />
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Therapy Heritage</span>
            <h2 className="font-serif text-3xl text-white uppercase tracking-widest leading-tight">
              DIVINE SANDALWOOD THERAPY RITUALS
            </h2>
            <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light font-sans">
              Inspired by ancient Indian Ubtan rituals passed down through generations, our **Sandalwood Therapy** collection fuses 100% natural organic sandalwood powders and pure Bulgarian rose waters.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-[11px] text-white/50">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Cooling Ritual Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Helps Calm & Refresh Skin</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Supports Light Hydration</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Suitable for Women & Men</span>
              </div>
            </div>

            <Link
              href="/shop?category=Organic%20%26%20Therapy"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold hover:text-white font-bold mt-2 transition-colors"
            >
              Acquire Sandalwood Rituals
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}
