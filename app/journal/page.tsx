"use client";

import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import WishlistDrawer from "@/app/components/WishlistDrawer";
import SoundPlayer from "@/app/components/SoundPlayer";
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";

export default function Journal() {
  const articles = [
    {
      title: "Fabric Thread vs. Skin Pore Chemistry",
      excerpt: "Why standard colognes dissolve rapidly due to skin acidity and personal biology, and how our 70% oil concentration formula binds permanently into high-density silk and wool fibers.",
      date: "May 26, 2026",
      readTime: "4 min read",
      category: "Olfactory Science"
    },
    {
      title: "The Sacred Sandalwood Distillation Tradition",
      excerpt: "A deep dive into our ancient Indian steam distillation plantations, harvesting raw sandalwood roots at sunrise to capture pure cooling essential oil and ubtan skincare heritage.",
      date: "May 18, 2026",
      readTime: "6 min read",
      category: "Heritage Craft"
    },
    {
      title: "The Art of Layering: Blending Rose with Royal Oud",
      excerpt: "How to mist your cotton dress shirts with a crisp floral Parisian signature and anchor it with a dark, smoky Middle Eastern Cambodian agarwood on your cashmere coat for a 360-degree aura.",
      date: "May 10, 2026",
      readTime: "5 min read",
      category: "Scent Layering"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
      <SoundPlayer />
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-6 w-full pt-32 pb-24">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Fragrance Journal</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-widest mt-3">
            THE OLFACTORY EDITORIAL
          </h1>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-4" />
          <p className="text-xs text-white/50 max-w-md mx-auto mt-4 leading-relaxed font-light">
            Educating the senses. Discover the science of fabric scent retention, ancient organic extraction histories, and styling guides from our master perfumers.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((art, i) => (
            <div
              key={i}
              className="bg-[#121212]/40 border border-white/5 hover:border-gold/30 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-500 group shadow-lg"
            >
              <div>
                <div className="flex justify-between items-center text-[10px] text-gold uppercase tracking-widest font-semibold mb-4">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {art.category}
                  </span>
                  <span className="text-white/30">{art.readTime}</span>
                </div>

                <h3 className="font-serif text-xl font-bold uppercase text-white group-hover:text-gold transition-colors duration-300 tracking-wide mt-2">
                  {art.title}
                </h3>
                
                <p className="text-xs text-white/50 leading-relaxed font-light mt-4">
                  {art.excerpt}
                </p>
              </div>

              <div className="border-t border-white/5 pt-6 mt-8 flex justify-between items-center text-xs">
                <span className="text-white/30 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {art.date}
                </span>

                <button className="inline-flex items-center gap-1.5 text-gold hover:text-white font-bold transition-all group-hover:translate-x-1 cursor-pointer">
                  Read Editorial
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
