"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/app/context/AppContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import WishlistDrawer from "@/app/components/WishlistDrawer";
import SoundPlayer, { playGlobalSpraySound } from "@/app/components/SoundPlayer";
import { Compass, Sparkles, Package, Star, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

export default function UserDashboard() {
  const { orders, products } = useApp();

  // Mocked active user
  const user = {
    fullName: "Prince Alexander Al-Saud",
    email: "royal@riyadh.gov",
    scentAura: "Warm Woody & Oriental",
    memberSince: "May 2026",
    conciergeLevel: "Royal Platinum Member"
  };

  // Recommendations based on woody/oriental profile
  const recommendedScents = products.filter(
    (p) => p.category === "Middle Eastern" || p.scentProfile.includes("Woody")
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
      <SoundPlayer />
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-6 w-full pt-32 pb-24">
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* User Profile Left Sidebar (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-[#121212]/40 border border-gold/15 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Gold glow */}
              <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-gold/5 blur-2xl" />
              
              <div className="flex flex-col gap-4 relative z-10">
                <span className="inline-flex items-center gap-1.5 self-start text-[9px] uppercase tracking-widest bg-gold/15 border border-gold/40 text-gold px-2.5 py-1 rounded-full animate-gold-shine">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {user.conciergeLevel}
                </span>

                <div>
                  <h2 className="font-serif text-2xl font-bold uppercase text-white tracking-wide">
                    {user.fullName}
                  </h2>
                  <p className="text-xs text-white/50">{user.email}</p>
                </div>

                <div className="border-t border-white/5 pt-4 flex flex-col gap-3 text-xs text-white/60">
                  <div className="flex items-center justify-between">
                    <span className="text-white/40">Member Since</span>
                    <span>{user.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/40">Olfactory Scent Aura</span>
                    <span className="text-gold font-semibold uppercase">{user.scentAura}</span>
                  </div>
                </div>

                <div className="bg-black/60 rounded-lg p-4 border border-gold/10 mt-2 flex flex-col gap-2">
                  <span className="text-[9px] uppercase text-gold font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Concierge Message
                  </span>
                  <p className="text-[10px] text-white/70 leading-relaxed font-light">
                    Your Platinum membership secures complimentary express insured transit on all showroom requests. A private sample decant of our upcoming Amber Oud reserves has been added to your next shipment.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-[#121212]/40 border border-white/5 rounded-2xl p-6">
              <h3 className="font-serif text-xs uppercase tracking-widest text-gold font-bold mb-6 border-b border-white/5 pb-2">
                Aura Harmonies For You
              </h3>

              <div className="flex flex-col gap-4">
                {recommendedScents.map((p) => (
                  <div key={p.id} className="flex gap-3 items-center text-xs pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-black/60 rounded border border-white/10 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 flex flex-col min-w-0">
                      <span className="text-white font-medium line-clamp-1">{p.name}</span>
                      <span className="text-[9px] text-white/40 uppercase">
                        {p.scentProfile} &bull; {p.concentration}
                      </span>
                    </div>
                    <Link
                      href={`/product/${p.id}`}
                      className="p-2 border border-white/10 hover:border-gold hover:text-gold text-white rounded transition-all flex-shrink-0"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User History Center Right (3 cols) */}
          <div className="lg:col-span-3 bg-[#121212]/40 border border-white/5 rounded-2xl p-6 md:p-8">
            <h3 className="font-serif text-sm uppercase tracking-widest text-white font-bold mb-6 pb-2 border-b border-white/5">
              Acquisition Ledger & History
            </h3>

            {orders.length === 0 ? (
              <div className="text-center py-20 text-white/40 flex flex-col gap-4 items-center">
                <Package className="w-10 h-10 stroke-[1.2] text-gold" />
                <div>
                  <h4 className="font-serif text-xs uppercase text-white tracking-widest mb-1">No Orders Placed Yet</h4>
                  <p className="text-[10px] max-w-xs mx-auto">Once you proceed through checkout, your official invoice certificate history will be logged here.</p>
                </div>
                <Link
                  href="/shop"
                  className="text-xs uppercase tracking-widest bg-gold hover:bg-gold-light text-black font-semibold px-5 py-2 rounded transition-colors"
                >
                  Acquire Perfumes
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-black/40 border border-white/5 rounded-xl p-5 flex flex-col gap-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-3 text-xs">
                      <div className="flex items-center gap-4">
                        <span className="font-mono font-bold text-gold text-sm">{order.id}</span>
                        <span className="flex items-center gap-1.5 text-white/40 text-[10px]">
                          <Calendar className="w-3.5 h-3.5" />
                          {order.date}
                        </span>
                      </div>
                      
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold border ${
                        order.status === "Delivered"
                          ? "bg-green-500/10 border-green-500/30 text-green-400"
                          : "bg-gold/15 border-gold/40 text-gold"
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Order items checklist */}
                    <div className="flex flex-col gap-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-black/60 rounded border border-white/10 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                            <div>
                              <p className="text-white font-medium line-clamp-1">{item.product.name}</p>
                              <p className="text-[9px] text-white/40 uppercase">
                                Size: {item.size} &bull; {item.quantity} Qty
                              </p>
                            </div>
                          </div>
                          
                          <span className="font-bold text-white">${item.product.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom actions */}
                    <div className="border-t border-white/5 pt-3 mt-1 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-gold" />
                        <span className="text-white/40">Total Settled:</span>
                        <span className="text-gold font-bold font-serif ml-1">${order.total.toFixed(2)}</span>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/track?orderId=${order.id}`}
                          className="px-3.5 py-1.5 border border-white/10 hover:border-gold hover:text-gold rounded text-[10px] uppercase font-bold tracking-widest transition-all"
                        >
                          Track Shipment
                        </Link>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </main>
      <Footer />
    </div>
  );
}
