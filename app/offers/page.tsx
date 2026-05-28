"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useApp } from "@/app/context/AppContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import WishlistDrawer from "@/app/components/WishlistDrawer";
import SoundPlayer, { playGlobalSpraySound } from "@/app/components/SoundPlayer";
import { Sparkles, ShoppingBag, ShieldCheck, Compass, Send, CheckCircle } from "lucide-react";

export default function Offers() {
  const { addToCart, setCartOpen } = useApp();
  
  // Custom Scent Request State
  const [bespokeData, setBespokeData] = useState({
    fabric: "Wool & Silk",
    mood: "Mysterious & Confident",
    notes: "Oud, Saffron, Honey",
    comments: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBespokeData({
      ...bespokeData,
      [e.target.name]: e.target.value
    });
  };

  const handleBespokeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playGlobalSpraySound();
    setIsSubmitting(true);
    
    // Simulate SMTP dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setBespokeData({ fabric: "Wool & Silk", mood: "Mysterious & Confident", notes: "Oud, Saffron, Honey", comments: "" });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  // Mock Bundle Products
  const bundles = [
    {
      id: "bundle-decant-royal",
      name: "The Royal Decant Collection",
      price: 49,
      image: "/images/oud_royal.png",
      description: "Sample our entire artisanal private reserve. Includes 3x 10ml purse-sized mists: Oud Royal, Sandalwood Therapy, and Gourmand Chocolate. Meticulously wrapped in safe organic linen casing.",
      sizes: ["3x 10ml Coffret"]
    },
    {
      id: "bundle-coffret-imperial",
      name: "The Imperial Showroom Coffret Case",
      price: 155,
      image: "/images/signature.png",
      description: "Our ultimate signature gift box. Features 1x 100ml Parisien Signature, 1x 100ml Gourmand Chocolate & Cream, and an exquisite handcrafted polished cedarwood showroom casket case.",
      sizes: ["2x 100ml + Box"]
    }
  ];

  const handleAddBundle = (bundle: any) => {
    playGlobalSpraySound();
    const productMock = {
      id: bundle.id,
      name: bundle.name,
      price: bundle.price,
      image: bundle.image,
      category: "Bespoke Offers",
      scentProfile: "Curated Set",
      longevity: "Up to 5 Days",
      concentration: "70% Oil Concentration",
      description: bundle.description,
      notes: { top: "Curated", heart: "Curated", base: "Curated" },
      stock: 5,
      rating: 5.0,
      reviewsCount: 12,
      sizes: bundle.sizes
    };
    addToCart(productMock, 1, bundle.sizes[0]);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
      <SoundPlayer />
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-6 w-full pt-32 pb-24">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Privilege Lounge</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-widest mt-3">
            BESPOKE OFFERS & BUNDLES
          </h1>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-4" />
          <p className="text-xs text-white/50 max-w-md mx-auto mt-4 leading-relaxed font-light">
            Acquire specialized multi-fragrance sample coffrets or request a completely unique, customized fabric formulation crafted strictly for your wedding, residency, or private showroom.
          </p>
        </div>

        {/* Curated Bundles Section */}
        <div className="mb-24">
          <h3 className="font-serif text-2xl text-white uppercase tracking-widest text-center mb-12">
            CURATED VIP BUNDLES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {bundles.map((bundle) => (
              <div
                key={bundle.id}
                className="bg-[#121212]/40 border border-gold/15 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-500 group shadow-lg"
              >
                {/* Visual Image */}
                <div className="relative aspect-video w-full bg-black/60 rounded-xl overflow-hidden flex items-center justify-center p-4 border border-white/5 mb-6">
                  <div className="absolute w-20 h-20 bg-gold/5 rounded-full blur-xl group-hover:bg-gold/10" />
                  <Image
                    src={bundle.image}
                    alt={bundle.name}
                    fill
                    className="object-contain p-6 animate-float-medium group-hover:scale-105 transition-all"
                  />
                  <span className="absolute top-3 left-3 bg-[#0b0b0b]/85 border border-gold text-gold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-bold">
                    Special Bundle Offer
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="font-serif text-lg font-bold uppercase text-white group-hover:text-gold transition-colors tracking-wide">
                    {bundle.name}
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    {bundle.description}
                  </p>
                  
                  <div className="text-[10px] text-white/40 mt-2 flex gap-1">
                    <span className="font-bold">Includes:</span>
                    <span>{bundle.sizes[0]} Packaging Case</span>
                  </div>
                </div>

                {/* Price Actions */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                  <span className="font-serif text-xl font-bold text-white">${bundle.price}</span>
                  <button
                    onClick={() => handleAddBundle(bundle)}
                    className="flex items-center gap-1.5 bg-gold hover:bg-gold-light text-black text-xs font-bold uppercase py-2.5 px-5 rounded-md transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Acquire Bundle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bespoke Form Scent Configurator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center max-w-5xl mx-auto border-t border-white/5 pt-20">
          
          {/* Form Explainer (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Bespoke Altar</span>
            <h2 className="font-serif text-3xl text-white uppercase tracking-widest leading-tight">
              PRIVATE CUSTOM SCENT FORMULATION
            </h2>
            <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light font-sans">
              For ultimate luxury exclusivity, collaborate with our royal perfumers to draft a signature scent profile formulated uniquely to bind with your specific lifestyle textile fibers.
            </p>
            
            <div className="flex flex-col gap-2 text-[10px] text-white/40">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>1-on-1 perfumer consultation over SMTP relay</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Custom physical sample coffrets dispatched first</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Sealed gold-engraved certification case</span>
              </div>
            </div>
          </div>

          {/* Scent Form Config (3 cols) */}
          <form onSubmit={handleBespokeSubmit} className="lg:col-span-3 bg-[#121212]/40 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-xl">
            <h3 className="font-serif text-base uppercase tracking-widest text-white mb-2">Artisanal Scent Request</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Adorned Fabric Category</label>
                <select
                  name="fabric"
                  value={bespokeData.fabric}
                  onChange={handleInputChange}
                  className="bg-black border border-white/10 rounded-md py-2 px-3 text-xs outline-none text-white cursor-pointer"
                >
                  <option value="Wool & Silk">Heavy Wools & Silks</option>
                  <option value="Raw Cottons & Linens">Raw Cotton & Linens</option>
                  <option value="Cashmere Sweaters">Cashmere & Knits</option>
                  <option value="Velvet & Synthetics">Velvet & Tapestries</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Olfactory Vibe</label>
                <select
                  name="mood"
                  value={bespokeData.mood}
                  onChange={handleInputChange}
                  className="bg-black border border-white/10 rounded-md py-2 px-3 text-xs outline-none text-white cursor-pointer"
                >
                  <option value="Mysterious & Confident">Mysterious & Confident</option>
                  <option value="Relaxing & Meditative">Relaxing & Meditative</option>
                  <option value="Delicious & Gourmet">Delicious & Gourmet</option>
                  <option value="Crisp & Royal Tailored">Crisp & Royal Tailored</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Preferred Olfactory Ingredients</label>
              <input
                type="text"
                name="notes"
                value={bespokeData.notes}
                onChange={handleInputChange}
                required
                placeholder="E.g. Saffron, Cambodian Oud, Bulgarian Rose, Wild Honey"
                className="bg-black border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-3 text-xs outline-none text-white placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Specific Requests / Comments</label>
              <textarea
                name="comments"
                value={bespokeData.comments}
                onChange={handleInputChange}
                rows={3}
                placeholder="Details of the event or styling parameters..."
                className="bg-black border border-white/10 focus:border-gold/50 rounded-md py-2 px-3 text-xs outline-none text-white placeholder:text-white/20 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full py-3.5 bg-gold hover:bg-gold-light text-black font-bold uppercase tracking-widest text-xs rounded-md transition-colors btn-luxury flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Dispatching Query..." : "Inquire Custom Formulation"}
            </button>

            {success && (
              <div className="flex items-center gap-2 text-gold text-xs font-bold justify-center mt-2 animate-bounce">
                <CheckCircle className="w-4 h-4 text-gold" />
                <span>Custom scent specifications relayed to perfumers!</span>
              </div>
            )}
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}
