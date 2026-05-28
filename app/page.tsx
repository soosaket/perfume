"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/app/context/AppContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import WishlistDrawer from "@/app/components/WishlistDrawer";
import SoundPlayer, { playGlobalSpraySound } from "@/app/components/SoundPlayer";
import InteractiveQuiz from "@/app/components/InteractiveQuiz";
import { Sparkles, Heart, ShoppingBag, Eye, Star, Info, ShieldCheck, HelpCircle, ArrowRight, BookOpen } from "lucide-react";

export default function Home() {
  const { products, toggleWishlist, isInWishlist, addToCart, setCartOpen } = useApp();
  const [activeTab, setActiveTab] = useState<"middle-eastern" | "gourmand" | "signature" | "sandalwood">("middle-eastern");
  const [activeSprayCoord, setActiveSprayCoord] = useState<number | null>(null);
  
  // Coordinates for the interactive shirt diagram
  const shirtCoordinates = [
    { id: 1, label: "Left Shoulder", sprays: 2, top: "18%", left: "34%" },
    { id: 2, label: "Right Shoulder", sprays: 2, top: "18%", left: "62%" },
    { id: 3, label: "Left Lower Armhole", sprays: 2, top: "45%", left: "28%" },
    { id: 4, label: "Right Lower Armhole", sprays: 2, top: "45%", left: "68%" },
    { id: 5, label: "Shirt Button Area", sprays: 2, top: "35%", left: "48%" },
    { id: 6, label: "Collar Area", sprays: 2, top: "12%", left: "48%" },
    { id: 7, label: "Back Side Outfit", sprays: 3, top: "30%", left: "82%" },
  ];

  const handleSprayShirt = (coordId: number) => {
    setActiveSprayCoord(coordId);
    playGlobalSpraySound();
    setTimeout(() => setActiveSprayCoord(null), 1000);
  };

  const handleQuickAdd = (product: any) => {
    addToCart(product, 1, "100ml");
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
      {/* Immersive Sound Player */}
      <SoundPlayer />

      {/* Global Headers */}
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,30,10,0.5)_0%,#0B0B0B_80%)] z-0" />
        
        {/* Soft floating mist overlay */}
        <div className="absolute inset-0 z-1 pointer-events-none opacity-20 bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1')] bg-cover mix-blend-color-dodge animate-smoke" />

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Scent Title Text */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 self-center lg:self-start text-[10px] uppercase tracking-[0.4em] bg-gold/10 border border-gold/30 text-gold px-4 py-2 rounded-full animate-gold-shine">
              <Sparkles className="w-3.5 h-3.5" />
              World's First Fabric Perfume Showroom
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-gold-gradient">
              A NEW ERA OF <br />
              <span className="text-white">FABRIC SCENT</span>
            </h1>
            <p className="text-sm md:text-base text-white/60 max-w-lg leading-relaxed font-light">
              Designed strictly for retention, not just rapid evaporation. SWAVIK binds organic natural oils directly into fabric fibers, delivering a 360-degree olfactory aura that evolves slow and lingers for days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
              <Link
                href="/shop"
                className="px-8 py-4 bg-gold hover:bg-gold-light text-black font-bold uppercase tracking-widest text-xs rounded-md transition-all duration-300 btn-luxury shadow-lg shadow-gold/20"
              >
                Explore Showroom
              </Link>
              <a
                href="#application-guide"
                className="px-8 py-4 border border-white/10 hover:border-gold hover:text-gold text-white font-bold uppercase tracking-widest text-xs rounded-md transition-all duration-300 bg-white/5"
              >
                How To Apply
              </a>
            </div>
          </div>

          {/* Floating Product Bottle Visualizer */}
          <div className="relative flex justify-center items-center h-[350px] md:h-[450px]">
            {/* Ambient gold halo back plate */}
            <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full bg-gold/5 blur-3xl" />
            
            {/* Crystal bottle render image */}
            <div className="relative w-[260px] h-[340px] md:w-[320px] md:h-[420px] animate-float-slow">
              <Image
                src="/images/oud_royal.png"
                alt="SWAVIK Premium Crystal Bottle"
                fill
                priority
                className="object-contain filter drop-shadow-[0_10px_30px_rgba(212,175,55,0.35)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE OLFACTORY JOURNEY COMPARISON */}
      <section className="py-24 border-t border-white/5 bg-[#080808] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">The Science of Retention</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white uppercase tracking-widest mt-2">
              UNDERSTANDING FABRIC PERFUME
            </h2>
            <p className="text-xs text-white/50 max-w-md mx-auto mt-2">
              Standard perfumes dissolve rapidly on skin chemistry and body heat. Fabric perfumes are engineered strictly to lock within fabric threads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Standard Skin Perfumes */}
            <div className="bg-[#101010]/60 border border-white/5 rounded-2xl p-8 flex flex-col gap-4 relative">
              <span className="absolute -top-3 -left-3 bg-red-500/10 border border-red-500/30 text-red-400 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md font-bold">
                Standard Perfume
              </span>
              <h3 className="font-serif text-lg text-white uppercase tracking-widest mt-4">Evaporates Rapidly</h3>
              <ul className="text-xs text-white/50 flex flex-col gap-3 leading-relaxed">
                <li className="flex gap-2 items-start text-red-400/80">
                  <span>✕</span> Heavily affected by body heat, sweat, skin acidity, and personal biology.
                </li>
                <li className="flex gap-2 items-start">
                  <span>✕</span> Quick initial blast that evaporates completely within hours.
                </li>
                <li className="flex gap-2 items-start">
                  <span>✕</span> Direct skin alcohol applications trigger sharp, drying reactions.
                </li>
              </ul>
            </div>

            {/* SWAVIK Fabric Perfume */}
            <div className="bg-gold/5 border border-gold/30 rounded-2xl p-8 flex flex-col gap-4 relative shadow-[0_0_20px_rgba(212,175,55,0.05)] animate-gold-shine">
              <span className="absolute -top-3 -left-3 bg-gold/20 border border-gold text-gold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md font-bold">
                SWAVIK Fabric Formula
              </span>
              <h3 className="font-serif text-lg text-gold uppercase tracking-widest mt-4">Fiber Thread Retention</h3>
              <ul className="text-xs text-white/80 flex flex-col gap-3 leading-relaxed">
                <li className="flex gap-2 items-start text-gold">
                  <span>✓</span> 70% High Concentration natural oils designed exclusively for garments.
                </li>
                <li className="flex gap-2 items-start">
                  <span>✓</span> Binds deep inside fabric pores. Evaporates slowly for constant longevity.
                </li>
                <li className="flex gap-2 items-start">
                  <span>✓</span> Completely organic base: zero synthetics, 100% safe on delicate silks and cottons.
                </li>
                <li className="flex gap-2 items-start">
                  <span>✓</span> Creates a consistent 360-degree bubble that moves as your outfit moves.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE APPLICATION DRESS SHIRT DIAGRAM */}
      <section id="application-guide" className="py-24 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">The Scent Blueprint</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white uppercase tracking-widest leading-tight">
              THE CORRECT WAY <br />TO APPLY FABRIC PERFUME
            </h2>
            <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light">
              Fragrance is an experience projected from all angles. For maximum 360-degree sillage retention, follow our precise master coordinates.
            </p>
            <div className="flex flex-col gap-4 text-xs text-white/50 mt-2">
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="text-gold font-serif text-lg font-bold">1</span>
                <div>
                  <p className="text-white font-medium">Shoulders & Collars (2 Sprays each)</p>
                  <p className="text-[10px]">Projects scent outward during handshakes and close greetings.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="text-gold font-serif text-lg font-bold">2</span>
                <div>
                  <p className="text-white font-medium">Chest Button Area & Armholes (2 Sprays each)</p>
                  <p className="text-[10px]">Locks scent within the fabric folds for steady release as you walk.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="text-gold font-serif text-lg font-bold">3</span>
                <div>
                  <p className="text-white font-medium">Back Side Outfit (3 Sprays)</p>
                  <p className="text-[10px]">Creates an unforgettable olfactory scent trail behind you.</p>
                </div>
              </div>
            </div>
            
            {/* Help Call */}
            <div className="text-[10px] text-gold/60 italic flex items-center gap-1.5 mt-2">
              <Info className="w-3.5 h-3.5" />
              <span>Click coordinates on the dress shirt layout to test the simulated spray trigger!</span>
            </div>
          </div>

          {/* Right Diagram Rendering */}
          <div className="relative flex justify-center items-center p-8 bg-[#080808] border border-gold/15 rounded-2xl">
            
            {/* SVG Outline representation of dress shirt */}
            <div className="relative w-full max-w-[320px] aspect-[3/4] flex items-center justify-center">
              
              {/* Animated Spray Rings */}
              {activeSprayCoord !== null && (
                <div
                  className="absolute z-30 pointer-events-none rounded-full border-4 border-gold/80 animate-ping"
                  style={{
                    width: "80px",
                    height: "80px",
                    top: `calc(${shirtCoordinates.find(c => c.id === activeSprayCoord)?.top} - 25px)`,
                    left: `calc(${shirtCoordinates.find(c => c.id === activeSprayCoord)?.left} - 25px)`
                  }}
                />
              )}

              {/* Minimal Dress Shirt Graphic */}
              <svg viewBox="0 0 200 240" fill="none" stroke="currentColor" className="w-full h-full text-white/10 stroke-[1.5]">
                {/* Collar */}
                <path d="M70,30 L100,50 L130,30" />
                {/* Shoulders */}
                <path d="M70,30 L30,45 L15,100 L35,100 L45,65" />
                <path d="M130,30 L170,45 L185,100 L165,100 L155,65" />
                {/* Body Outline */}
                <path d="M45,65 L50,210 L150,210 L155,65" />
                {/* Buttons line */}
                <path d="M100,50 L100,210" strokeDasharray="4 4" />
                {/* Pockets */}
                <rect x="60" y="80" width="25" height="25" rx="2" />
                <rect x="115" y="80" width="25" height="25" rx="2" />
              </svg>

              {/* Active Spray points buttons overlay */}
              {shirtCoordinates.map((coord) => (
                <button
                  key={coord.id}
                  onClick={() => handleSprayShirt(coord.id)}
                  className={`absolute w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shadow-lg transition-all duration-300 ${
                    activeSprayCoord === coord.id
                      ? "bg-gold border-gold text-black scale-125"
                      : "bg-black/80 hover:bg-gold border-gold/45 text-gold hover:text-black cursor-pointer"
                  }`}
                  style={{ top: coord.top, left: coord.left }}
                  title={`Spray ${coord.label} (${coord.sprays} sprays)`}
                >
                  {coord.id}
                </button>
              ))}
            </div>

            {/* Sprays Guide list panel */}
            <div className="absolute bottom-4 right-4 bg-black/80 border border-white/5 rounded p-3 text-[9px] uppercase tracking-wider text-white/50 flex flex-col gap-1.5">
              <span className="text-white font-bold mb-1">Click Coordinates</span>
              {shirtCoordinates.map((coord) => (
                <span
                  key={coord.id}
                  className={`flex items-center justify-between gap-4 cursor-pointer hover:text-gold ${
                    activeSprayCoord === coord.id ? "text-gold font-bold" : ""
                  }`}
                  onClick={() => handleSprayShirt(coord.id)}
                >
                  <span>{coord.id}. {coord.label}</span>
                  <span className="text-gold">{coord.sprays} Sprays</span>
                </span>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRIVATE LUXURY COLLECTION SHOWCASE */}
      <section className="py-24 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Artisanal Craft</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white uppercase tracking-widest mt-2">
              THE CORE PRIVATE SHOWCASE
            </h2>
            
            {/* Showroom tabs selector */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                { id: "middle-eastern", label: "Middle Eastern Oud" },
                { id: "gourmand", label: "Gourmand Deserts" },
                { id: "signature", label: "Signature Paris" },
                { id: "sandalwood", label: "Sandalwood Therapy" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all duration-300 font-semibold border cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-gold text-black border-gold shadow-lg shadow-gold/10"
                      : "bg-transparent text-white/50 border-white/10 hover:border-gold hover:text-gold"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Catalog Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products
              .filter((p) => {
                if (activeTab === "middle-eastern") return p.category === "Middle Eastern";
                if (activeTab === "gourmand") return p.category === "Gourmand";
                if (activeTab === "signature") return p.category === "Signature";
                if (activeTab === "sandalwood") return p.category === "Organic & Therapy";
                return true;
              })
              .map((product) => (
                <div
                  key={product.id}
                  className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-white/5 hover:border-gold/30 p-6 flex flex-col justify-between transition-all duration-500 group shadow-lg"
                >
                  {/* Image render */}
                  <div className="relative aspect-square w-full bg-black/60 rounded-xl overflow-hidden flex items-center justify-center p-4 border border-white/5 mb-6">
                    {/* Floating Lighter Glow */}
                    <div className="absolute w-32 h-32 rounded-full bg-gold/5 blur-2xl group-hover:bg-gold/15 transition-all" />
                    
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-8 group-hover:scale-105 transition-all duration-700 animate-float-medium"
                    />

                    {/* Category tag */}
                    <span className="absolute top-3 left-3 bg-[#0B0B0B]/85 border border-gold/30 text-gold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-medium">
                      {product.concentration}
                    </span>

                    {/* Favorite toggle icon */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full border transition-all ${
                        isInWishlist(product.id)
                          ? "bg-gold border-gold text-black"
                          : "bg-[#0B0B0B]/85 border-white/10 hover:border-gold text-white hover:text-gold"
                      }`}
                      aria-label="Save Favorite"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Text details */}
                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-1 text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                      <span className="text-[9px] text-white/40 ml-1">({product.reviewsCount} reviews)</span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-white group-hover:text-gold transition-colors duration-300 uppercase tracking-wide">
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-white/50 leading-relaxed font-light line-clamp-2">
                      {product.description}
                    </p>

                    {/* Scent notes overview */}
                    <div className="bg-black/40 rounded-lg p-3 border border-white/5 mt-2 flex flex-col gap-1 text-[10px] text-white/40">
                      <p><strong className="text-white">Top Notes:</strong> {product.notes.top}</p>
                      <p><strong className="text-white">Base Notes:</strong> {product.notes.base}</p>
                    </div>
                  </div>

                  {/* Actions purchase */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <span className="text-[9px] text-white/40 block">Price</span>
                      <span className="font-serif text-lg font-bold text-white">${product.price}</span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/product/${product.id}`}
                        className="p-3 border border-white/10 hover:border-gold hover:text-gold text-white rounded-md transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className="flex items-center gap-1.5 bg-gold hover:bg-gold-light text-black text-xs font-bold uppercase py-3 px-4 rounded-md transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Acquire
                      </button>
                    </div>
                  </div>

                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE OLFACTORY FRAGRANCE QUIZ SECTION */}
      <section className="py-24 bg-[#0B0B0B] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <InteractiveQuiz />
        </div>
      </section>

      {/* 6. BRAND philosophy and artisanal COUNTERS */}
      <section className="py-20 bg-[#080808] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
          {[
            { metric: "70%", title: "High Oil Concentration", desc: "Engineered specifically to lock within garments." },
            { metric: "100%", title: "Organic natural bases", desc: "Distilled strictly from ancient sandalwood and pure attars." },
            { metric: "20+", title: "Wisdom Years of Craft", desc: "Formulated by master perfumers under strict Middle Eastern tradition." },
            { metric: "5+", title: "Days scent retention", desc: "Evaluated to persist on clothes even after luxury closet storage." }
          ].map((counter, i) => (
            <div key={i} className="flex flex-col gap-2 p-6 border border-white/5 rounded-xl bg-black/30">
              <span className="font-serif text-4xl lg:text-5xl font-extrabold text-gold leading-none">{counter.metric}</span>
              <h4 className="text-white text-xs uppercase tracking-widest font-semibold mt-2">{counter.title}</h4>
              <p className="text-[10px] text-white/40 leading-relaxed max-w-[200px] mx-auto mt-1">{counter.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PRESTIGIOUS TESTIMONIALS */}
      <section className="py-24 bg-[#0b0b0b] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Showroom Accolades</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white uppercase tracking-widest mt-2">
              CONCIERGE REVIEWS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { author: "Lady Elizabeth C.", location: "London UK", quote: "“The Oud Royal Fabric mist has completely replaced standard room sprays and personal skin perfumes for me. I spray it on my silk evening gowns, and even after dry cleaning, a subtle royal agarwood trace is still beautifully woven within the fibers.”" },
              { author: "Hassan Al-Mansoori", location: "Abu Dhabi UAE", quote: "“Absolute Middle Eastern mastery. The high oil concentration formula doesn't stain white thobes or delicate fabrics at all. Instead, it creates an elegant, non-cloying amber envelope that projected for an entire five-day yacht cruise.”" },
              { author: "Marc-Antoine D.", location: "Paris France", quote: "“Incredible ubtan-inspired Sandalwood Therapy spray! When misted onto bed linens, it provides a warm, relaxing, organic sandalwood and vetiver atmosphere that promotes total peace. Pure botanical heritage and craft.”" }
            ].map((review, i) => (
              <div key={i} className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-white/5 p-6 flex flex-col justify-between">
                <p className="text-xs italic text-white/70 leading-relaxed font-light mb-6">
                  {review.quote}
                </p>
                <div>
                  <div className="text-xs font-semibold text-white uppercase tracking-wider">{review.author}</div>
                  <div className="text-[10px] text-gold uppercase tracking-widest">{review.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SUBSCRIPTION CTA BANNER */}
      <section className="py-20 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 border-t border-b border-gold/25 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 flex flex-col gap-6 items-center">
          <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.3em] bg-gold/20 text-gold px-3.5 py-1.5 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            Elite Olfactory Decant Club
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white uppercase tracking-widest">
            THE MONTHLY LUXURY SCENT COFFRET
          </h2>
          <p className="text-xs md:text-sm text-white/70 max-w-lg leading-relaxed font-light">
            Receive private, custom-formulated fabric sprays, decant vials, and sample swatches directly to your residency. Tailored precisely to your quiz scent profile.
          </p>
          <Link
            href="/subscribe"
            className="px-8 py-4 bg-gold hover:bg-gold-light text-black font-bold uppercase tracking-widest text-xs rounded-md transition-colors btn-luxury shadow-lg shadow-gold/25 mt-2"
          >
            Become an Elite Member
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
