"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useApp } from "@/app/context/AppContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import WishlistDrawer from "@/app/components/WishlistDrawer";
import SoundPlayer, { playGlobalSpraySound } from "@/app/components/SoundPlayer";
import { Search, Compass, Package, MapPin, Calendar, Clock, Check } from "lucide-react";

// Pre-configured premium mock test orders for direct instant testing
const mockTrackOrders: { [key: string]: any } = {
  "SWK-708090": {
    id: "SWK-708090",
    date: "May 25, 2026",
    subtotal: 171,
    discount: 25.65,
    shipping: 0,
    total: 145.35,
    status: "In Transit",
    paymentMethod: "Luxury Card System",
    shippingAddress: {
      fullName: "Prince Alexander Al-Saud",
      email: "royal@riyadh.gov",
      phone: "+966 50 123 4567",
      address: "Al-Yamamah Royal Palace, Al-Hada",
      city: "Riyadh",
      zipCode: "11564",
      country: "Saudi Arabia"
    },
    items: [
      {
        product: { name: "SWAVIK Oud Royal Fabric Perfume", price: 89, image: "/images/oud_royal.png" },
        quantity: 1,
        size: "100ml",
        concentration: "70% Oil Concentration"
      },
      {
        product: { name: "SWAVIK Gourmand Chocolate & Cream", price: 82, image: "/images/gourmand.png" },
        quantity: 1,
        size: "100ml",
        concentration: "70% Oil Concentration"
      }
    ],
    timeline: [
      { status: "Ordered & Confirmed", date: "10:30 AM", description: "Your luxury perfume showroom invoice is generated and processed.", done: true },
      { status: "Olfactory Craft Preparation", date: "02:15 PM", description: "Bottling, secure sealing, and organic fabric casing wrapping finished.", done: true },
      { status: "Dispatched", date: "09:00 AM", description: "Handed over to our premium specialized carrier partners.", done: true },
      { status: "Delivered", date: "", description: "Arriving at your designated royal residency.", done: false }
    ]
  },
  "SWK-405060": {
    id: "SWK-405060",
    date: "May 22, 2026",
    subtotal: 75,
    discount: 0,
    shipping: 15,
    total: 90,
    status: "Delivered",
    paymentMethod: "Apple Pay Simulated",
    shippingAddress: {
      fullName: "Lady Beatrice Churchill",
      email: "beatrice@belgravia.co.uk",
      phone: "+44 20 7946 0958",
      address: "Chamber 8, Eaton Square, Belgravia",
      city: "London",
      zipCode: "SW1W 9BD",
      country: "United Kingdom"
    },
    items: [
      {
        product: { name: "SWAVIK Divine Sandalwood Therapy", price: 75, image: "/images/sandalwood_therapy.png" },
        quantity: 1,
        size: "100ml",
        concentration: "65% Oil Concentration"
      }
    ],
    timeline: [
      { status: "Ordered & Confirmed", date: "11:00 AM", description: "Your luxury perfume showroom invoice is generated and processed.", done: true },
      { status: "Olfactory Craft Preparation", date: "03:30 PM", description: "Bottling, secure sealing, and organic fabric casing wrapping finished.", done: true },
      { status: "Dispatched", date: "08:15 AM", description: "Handed over to our premium specialized carrier partners.", done: true },
      { status: "Delivered", date: "03:45 PM", description: "Arrived at your designated royal residency.", done: true }
    ]
  }
};

export default function TrackOrder() {
  const { orders } = useApp();
  const [orderIdQuery, setOrderIdQuery] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdQuery.trim()) return;

    playGlobalSpraySound();
    const query = orderIdQuery.trim().toUpperCase();

    // 1. Search in local context orders first
    const foundContext = orders.find((o) => o.id.toUpperCase() === query);
    
    if (foundContext) {
      setSearchedOrder(foundContext);
    } 
    // 2. Search in mock test orders second
    else if (mockTrackOrders[query]) {
      setSearchedOrder(mockTrackOrders[query]);
    } else {
      setSearchedOrder(null);
    }
    
    setHasSearched(true);
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
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Transit Logistics</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-widest mt-3">
            TRACK YOUR AURA SHIPMENT
          </h1>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-4" />
          <p className="text-xs text-white/50 max-w-md mx-auto mt-4 leading-relaxed font-light">
            Monitor the olfactory craft bottling progress, packaging prep, dispatch, and estimated delivery timeline of your SWAVIK order.
          </p>
        </div>

        {/* Search Field */}
        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={handleTrackSubmit} className="flex gap-2">
            <input
              type="text"
              value={orderIdQuery}
              onChange={(e) => setOrderIdQuery(e.target.value)}
              placeholder="Enter Order ID: e.g. SWK-708090"
              className="flex-1 bg-black border border-white/10 focus:border-gold/50 rounded-md py-3 px-4 text-xs outline-none uppercase tracking-wider text-white placeholder:text-white/20"
            />
            <button
              type="submit"
              className="px-6 bg-gold hover:bg-gold-light text-black text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Track
            </button>
          </form>

          {/* Test order helper panel */}
          <div className="bg-[#121212]/40 rounded-lg p-3 border border-white/5 mt-3 text-[10px] text-white/40 flex flex-col gap-1.5">
            <span className="text-white font-semibold uppercase">Showroom Test IDs:</span>
            <div className="flex gap-4">
              <span>
                <code className="text-gold font-mono cursor-pointer hover:underline" onClick={() => setOrderIdQuery("SWK-708090")}>
                  SWK-708090
                </code>{" "}
                (In Transit)
              </span>
              <span>
                <code className="text-gold font-mono cursor-pointer hover:underline" onClick={() => setOrderIdQuery("SWK-405060")}>
                  SWK-405060
                </code>{" "}
                (Delivered)
              </span>
            </div>
          </div>
        </div>

        {/* Tracking Details Display */}
        {hasSearched && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            {searchedOrder === null ? (
              <div className="text-center py-12 bg-[#121212]/20 border border-white/5 rounded-2xl max-w-md mx-auto">
                <span className="text-gold text-xl">✕</span>
                <h3 className="font-serif text-sm uppercase tracking-widest text-white mt-2">Reference Reference Not Found</h3>
                <p className="text-[11px] text-white/50 max-w-xs mx-auto mt-1">
                  We could not find an active showroom shipment matching that ID. Check the spelling or try copying one of our helper Test IDs.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                
                {/* Stepper Timeline (Left 3 cols) */}
                <div className="lg:col-span-3 bg-[#121212]/40 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="font-serif text-sm uppercase tracking-widest font-bold text-white">Logistics Timeline</span>
                    <span className="inline-flex items-center gap-1 bg-gold/15 border border-gold/30 text-gold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                      <Package className="w-3.5 h-3.5" />
                      Status: {searchedOrder.status}
                    </span>
                  </div>

                  {/* Vertical Timeline Stepper */}
                  <div className="flex flex-col gap-8 pl-4 relative before:absolute before:left-7 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                    {searchedOrder.timeline.map((step: any, i: number) => (
                      <div key={i} className="flex gap-6 items-start relative z-10">
                        {/* Circle bullet */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                            step.done
                              ? "bg-gold border-gold text-black shadow-lg shadow-gold/20"
                              : "bg-[#0b0b0b] border-white/20 text-white/30"
                          }`}
                        >
                          {step.done ? <Check className="w-3 h-3 stroke-[3]" /> : <span className="text-[9px]">{i + 1}</span>}
                        </div>

                        {/* Text */}
                        <div className="flex-1 flex flex-col gap-0.5">
                          <div className="flex justify-between items-center text-xs">
                            <h4 className={`font-semibold uppercase tracking-wider ${step.done ? "text-white" : "text-white/40"}`}>
                              {step.status}
                            </h4>
                            <span className="text-[9px] text-white/30">{step.date}</span>
                          </div>
                          <p className="text-[11px] text-white/50 leading-relaxed font-light mt-1">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address / Invoice specs (Right 2 cols) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  
                  {/* Address Box */}
                  <div className="bg-[#121212]/40 border border-white/5 rounded-2xl p-6">
                    <h4 className="font-serif text-xs uppercase tracking-widest text-gold font-bold mb-4 border-b border-white/5 pb-2">
                      Royal Consignee Coordinates
                    </h4>
                    <div className="flex flex-col gap-3 text-xs leading-relaxed text-white/60">
                      <div className="flex gap-2">
                        <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">{searchedOrder.shippingAddress.fullName}</p>
                          <p className="text-[11px]">{searchedOrder.shippingAddress.address}</p>
                          <p className="text-[11px]">{searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.country}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 border-t border-white/5 pt-3 text-[11px]">
                        <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                        <div>
                          <p className="text-white/40 uppercase">Aura Misted Date</p>
                          <p>{searchedOrder.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipment Items List */}
                  <div className="bg-[#121212]/40 border border-white/5 rounded-2xl p-6">
                    <h4 className="font-serif text-xs uppercase tracking-widest text-gold font-bold mb-4 border-b border-white/5 pb-2">
                      Insured Packages
                    </h4>
                    <div className="flex flex-col gap-4">
                      {searchedOrder.items.map((item: any, i: number) => (
                        <div key={i} className="flex gap-3 items-center text-xs">
                          <div className="w-10 h-10 bg-black/60 rounded border border-white/10 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="flex-1 flex flex-col min-w-0">
                            <span className="text-white font-medium line-clamp-1">{item.product.name}</span>
                            <span className="text-[9px] text-white/40 uppercase">
                              {item.size} &bull; {item.quantity} Qty
                            </span>
                          </div>
                          <span className="font-serif font-bold text-gold text-right">${item.product.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-4 flex justify-between items-center text-xs">
                      <span className="text-white/40">Total Insured Value</span>
                      <span className="font-serif font-bold text-gold text-sm">${searchedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>

                </div>

              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
