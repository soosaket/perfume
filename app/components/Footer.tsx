"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/app/context/AppContext";
import { Mail, ArrowRight, Check } from "lucide-react";

export default function Footer() {
  const { subscribeNewsletter } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError(true);
      return;
    }
    const success = subscribeNewsletter(email);
    if (success) {
      setSubscribed(true);
      setEmail("");
      setError(false);
      setTimeout(() => setSubscribed(false), 5000);
    } else {
      // already subscribed
      setSubscribed(true);
      setEmail("");
      setError(false);
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-gold/10 pt-20 pb-8 text-white/70">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="font-serif text-3xl tracking-[0.25em] text-white">SWAVIK</span>
            <span className="text-[8px] tracking-[0.6em] text-gold uppercase mt-0.5 ml-0.5">
              FABRIC PERFUMES
            </span>
          </div>
          <p className="text-xs leading-relaxed text-white/50 pr-4">
            “Crafted for retention, not evaporation.” SWAVIK is the pioneer of luxury fabric perfume showrooms, delivering highly concentrated organic oils formulated strictly to lock within fabric threads, guaranteeing days of magnificent signature evolution.
          </p>
          <div className="text-[10px] tracking-widest uppercase font-serif text-gold mt-2">
            DESIGNED FOR RETENTION. NOT EVAPORATION.
          </div>
        </div>

        {/* Quick Directories */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white text-xs uppercase tracking-widest font-semibold border-b border-gold/20 pb-2">
            OLFACTORY DIRECTORIES
          </h4>
          <nav className="flex flex-col gap-3 text-xs">
            <Link href="/shop" className="hover:text-gold transition-colors">
              Featured Fragrances
            </Link>
            <Link href="/shop?category=Middle%20Eastern" className="hover:text-gold transition-colors">
              Middle Eastern Oud Collection
            </Link>
            <Link href="/shop?category=Gourmand" className="hover:text-gold transition-colors">
              Gourmand Dessert Indulgences
            </Link>
            <Link href="/shop?category=Organic%20%26%20Therapy" className="hover:text-gold transition-colors">
              Sandalwood Therapy Rituals
            </Link>
            <Link href="/offers" className="hover:text-gold transition-colors">
              VIP Custom Perfume Boxes
            </Link>
            <Link href="/subscribe" className="hover:text-gold transition-colors">
              Monthly Decant Membership
            </Link>
          </nav>
        </div>

        {/* Showroom Coordinates */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white text-xs uppercase tracking-widest font-semibold border-b border-gold/20 pb-2">
            SHOWROOM COORDINATES
          </h4>
          <div className="flex flex-col gap-4 text-xs text-white/50 leading-relaxed">
            <div>
              <p className="text-white font-medium">Paris Imperial Showroom</p>
              <p>Rue du Faubourg Saint-Honoré, 75008 Paris</p>
            </div>
            <div>
              <p className="text-white font-medium">Dubai Royal Showroom</p>
              <p>The Promenade, Downtown Marina, Dubai UAE</p>
            </div>
            <div>
              <p className="text-white font-medium">Digital Concierge</p>
              <p>concierge@swavikperfumes.com</p>
            </div>
          </div>
        </div>

        {/* Exclusive Newsletter */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white text-xs uppercase tracking-widest font-semibold border-b border-gold/20 pb-2">
            ROYAL SCENT MEMBERSHIP
          </h4>
          <p className="text-xs text-white/50 leading-relaxed">
            Subscribe to unlock private fragrance journal updates, pre-order launches of artisanal sandalwood formulations, and VIP codes.
          </p>

          <form onSubmit={handleSubscribe} className="relative mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              placeholder="Enter your royal email..."
              className={`w-full bg-black/60 border ${
                error ? "border-red-500" : "border-gold/30 focus:border-gold"
              } text-xs text-white rounded-md py-3 pl-4 pr-12 outline-none transition-all duration-300 placeholder:text-white/30`}
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-gold hover:bg-gold-light text-black rounded-md flex items-center justify-center transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {subscribed && (
            <div className="flex items-center gap-2 text-gold text-xs font-medium animate-fade-in">
              <Check className="w-4 h-4" />
              <span>You have joined the Royal Scent List.</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
        <div>
          &copy; {currentYear} SWAVIK Fabric Perfumes. All Rights Reserved. Crafted for Olfactory Excellence.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:text-gold transition-colors">
            Our Heritage
          </Link>
          <Link href="/contact" className="hover:text-gold transition-colors">
            SMTP Live Logs
          </Link>
          <Link href="/admin" className="hover:text-gold transition-colors">
            Seller Panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
