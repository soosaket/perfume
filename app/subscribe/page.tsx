"use client";

import React, { useState } from "react";
import { useApp } from "@/app/context/AppContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import WishlistDrawer from "@/app/components/WishlistDrawer";
import SoundPlayer, { playGlobalSpraySound } from "@/app/components/SoundPlayer";
import { Sparkles, ShoppingBag, ShieldCheck, Compass, HelpCircle, Check } from "lucide-react";

export default function SubscriptionPage() {
  const { addToCart, setCartOpen } = useApp();

  const handleSubscribe = (tier: any) => {
    playGlobalSpraySound();
    const productMock = {
      id: tier.id,
      name: tier.name,
      price: tier.price,
      image: "/images/oud_royal.png",
      category: "Subscription Club",
      scentProfile: "Monthly Membership",
      longevity: "Up to 5 Days",
      concentration: "70% Oil Concentration",
      description: tier.description,
      notes: { top: "Custom", heart: "Custom", base: "Custom" },
      stock: 99,
      rating: 5.0,
      reviewsCount: 48,
      sizes: ["Monthly Decant"]
    };
    addToCart(productMock, 1, "Monthly Decant");
    setCartOpen(true);
  };

  const tiers = [
    {
      id: "sub-decant-club",
      name: "The Decant Club",
      price: 29,
      period: "month",
      description: "Sample curated reserves monthly. Receive 1x 10ml travel-sized fabric mist tailored directly to your scent quiz profile, safely wrapped in safe linen cases.",
      bullets: [
        "1x 10ml artisanal fabric spray",
        "Tailored to your Scent Quiz results",
        "Private Olfactory Journal access",
        "Complimentary standard shipping"
      ]
    },
    {
      id: "sub-showroom-select",
      name: "The Showroom Select",
      price: 59,
      period: "month",
      description: "Our signature monthly ritual. Receive 1x 50ml spray bottle of our core private showcase catalog items plus private sample decants of upcoming formulas.",
      bullets: [
        "1x 50ml full spray perfume",
        "1x 2ml upcoming reserve decant",
        "VIP private showroom pre-order access",
        "Complimentary express shipping",
        "Exclusive 10% catalog discount code"
      ]
    },
    {
      id: "sub-royal-platinum",
      name: "The Royal Platinum",
      price: 99,
      period: "month",
      description: "Absolute luxury olfactory experience. Receive 1x 100ml premium crystal bottle fabric perfume of your choice, custom oil extractions, and direct perfumer access.",
      bullets: [
        "1x 100ml crystal bottle perfume",
        "Curated custom note oil blends",
        "Direct access to bespoke formulation",
        "Platinum VIP support concierge",
        "Complimentary express insured shipping",
        "Exclusive 20% catalog discount code"
      ]
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
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Elite Scent Club</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-widest mt-3">
            MONTHLY SCENT SUBSCRIPTION
          </h1>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-4" />
          <p className="text-xs text-white/50 max-w-md mx-auto mt-4 leading-relaxed font-light">
            Keep your wardrobe continuously enveloped in premium, slow-releasing signature aromas. Modify, pause, or cancel your custom membership at any time.
          </p>
        </div>

        {/* Subscription Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`border rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-500 shadow-xl ${
                tier.price === 59
                  ? "bg-gold/5 border-gold shadow-[0_0_20px_rgba(212,175,55,0.05)] animate-gold-shine"
                  : "bg-[#121212]/40 border-white/5 hover:border-gold/30"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-lg font-bold uppercase text-white tracking-wider">{tier.name}</h3>
                  {tier.price === 59 && (
                    <span className="bg-gold text-black text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                      Most Popular
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-serif text-3xl md:text-4xl font-extrabold text-gold">${tier.price}</span>
                  <span className="text-xs text-white/40">/ {tier.period}</span>
                </div>

                <p className="text-xs text-white/60 leading-relaxed font-light mb-6">
                  {tier.description}
                </p>

                {/* Bullets */}
                <div className="flex flex-col gap-3 text-xs mb-8">
                  {tier.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className="text-white/80">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSubscribe(tier)}
                className={`w-full py-3.5 text-center font-bold uppercase tracking-widest text-xs rounded-md transition-all cursor-pointer ${
                  tier.price === 59
                    ? "bg-gold hover:bg-gold-light text-black btn-luxury shadow-lg shadow-gold/20"
                    : "border border-white/10 hover:border-gold text-white hover:text-gold bg-white/5 hover:bg-transparent"
                }`}
              >
                Join Scent Club
              </button>
            </div>
          ))}
        </div>

        {/* FAQs Accordions Section */}
        <div className="max-w-3xl mx-auto border-t border-white/5 pt-20">
          <h3 className="font-serif text-2xl text-white uppercase tracking-widest text-center mb-10">
            CONCIERGE SUBSCRIPTION FAQS
          </h3>

          <div className="flex flex-col gap-6 text-xs leading-relaxed text-white/50">
            {[
              { q: "How are the monthly scents selected?", a: "Upon subscribing, our system uses your Scent Quiz personality profile to align with our latest distillations. You can also modify your preferred scent family (Oud, Sandalwood, Gourmand) directly in your customer dashboard profile." },
              { q: "Can I swap or skip a month?", a: "Yes. Platinum and Showroom members can log into their private dashboard panel to swap their bottle selections, pause shipments, or skip a month before our recurring SMTP dispatch locks on the 1st of every month." },
              { q: "Are fabric perfumes completely safe on clothes?", a: "SWAVIK formulas contain zero synthetic chemical boosters or synthetic fixatives. Our 70% natural oils bind to clothing fabric threads safely. They are evaluated and certified as 100% safe on delicate wools, satin, cashmeres, and silks." }
            ].map((faq, i) => (
              <div key={i} className="bg-[#121212]/40 rounded-xl p-5 border border-white/5 flex flex-col gap-2">
                <h4 className="text-white font-medium flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-gold" />
                  {faq.q}
                </h4>
                <p className="font-light pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
