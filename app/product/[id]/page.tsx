"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/app/context/AppContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import WishlistDrawer from "@/app/components/WishlistDrawer";
import SoundPlayer, { playGlobalSpraySound } from "@/app/components/SoundPlayer";
import { Heart, ShoppingBag, ArrowLeft, Star, ShieldCheck, Flame, Compass, Sparkles } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetails({ params }: ProductPageProps) {
  // Await page params in Next.js 15/16
  const { id } = use(params);
  
  const { products, toggleWishlist, isInWishlist, addToCart, setCartOpen } = useApp();
  
  // Find current active product
  const product = products.find((p) => p.id === id) || products[0];

  // Component states
  const [selectedSize, setSelectedSize] = useState<string>("100ml");
  const [quantity, setQuantity] = useState<number>(1);
  const [activePyramidLayer, setActivePyramidLayer] = useState<"top" | "heart" | "base">("top");

  const handleAddToCart = () => {
    playGlobalSpraySound();
    addToCart(product, quantity, selectedSize);
    setCartOpen(true);
  };

  const handleInstantBuy = () => {
    playGlobalSpraySound();
    addToCart(product, quantity, selectedSize);
    setCartOpen(true);
  };

  // Find dynamic related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Note layer descriptions
  const layerDescriptions = {
    top: {
      title: "Top Notes (First Evaporation Layer)",
      duration: "0 to 2 Hours Presence",
      desc: "The immediate olfactory signature that greets you upon spraying. Crafted with delicate organic citrus, rose waters, or spices, binding gracefully to outer textile threads.",
      notes: product.notes.top
    },
    heart: {
      title: "Heart Notes (Olfactory Core)",
      duration: "2 to 12 Hours Presence",
      desc: "The true character and emotion of the blend. Featuring rich Cambodian agarwoods, ancient vetiver, or floral accords that anchor in woven fabric loops, projecting dynamically with motion.",
      notes: product.notes.heart
    },
    base: {
      title: "Base Notes (Deep Fiber Retention)",
      duration: "12 Hours to 5 Days Presence",
      desc: "The deep, heavy organic core of our 70% oil formula. Solidifying into thick cotton and wool fibers, these amber, musk, and resin tones resist drying out and linger beautifully.",
      notes: product.notes.base
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
      <SoundPlayer />
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />

      {/* Main details screen */}
      <main className="flex-1 max-w-7xl mx-auto px-6 w-full pt-32 pb-24">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-gold transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Scent Collection
        </Link>

        {/* Split grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
          
          {/* Left Column: Visual Showcase */}
          <div className="flex flex-col gap-6">
            
            {/* Big bottle showcase */}
            <div className="relative aspect-square w-full bg-black/60 rounded-2xl border border-gold/15 flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
              
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-contain p-12 animate-float-slow filter drop-shadow-[0_10px_30px_rgba(212,175,55,0.25)]"
              />

              {/* Longevity Badge */}
              <span className="absolute bottom-4 left-4 bg-black/80 border border-gold text-gold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full font-bold">
                {product.longevity} Longevity on Wools
              </span>
            </div>

            {/* Scent Variant Sizes */}
            <div className="bg-[#121212]/40 border border-white/5 rounded-xl p-4 flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Available Bottling:</span>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border rounded-md transition-all cursor-pointer ${
                      selectedSize === size
                        ? "bg-gold border-gold text-black shadow-md shadow-gold/10"
                        : "bg-transparent text-white/50 border-white/10 hover:border-gold hover:text-gold"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Spec Specifications */}
          <div className="flex flex-col gap-6">
            
            {/* Category / Star Ratings */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] bg-gold/10 border border-gold/30 text-gold px-3.5 py-1.5 rounded-full">
                <Compass className="w-3.5 h-3.5" />
                {product.category} &bull; {product.scentProfile}
              </span>
              
              <div className="flex items-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-xs text-white/40 ml-1">({product.reviewsCount} private showroom reviews)</span>
              </div>
            </div>

            {/* Scent Title Name */}
            <div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-wide leading-tight">
                {product.name}
              </h1>
              <p className="text-gold font-medium uppercase text-xs tracking-widest mt-1">
                Concentration: {product.concentration}
              </p>
            </div>

            {/* Poetic description copy */}
            <p className="text-xs md:text-sm leading-relaxed text-white/60 font-light font-sans">
              {product.description}
            </p>

            {/* 1. INTERACTIVE SCENT PYRAMID DIAGRAM */}
            <div className="bg-[#121212]/40 border border-gold/15 rounded-2xl p-6 relative overflow-hidden">
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4 block">Interactive Scent Pyramid</span>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                {/* Visual Pyramid Shapes Canvas (Clickable SVG) */}
                <div className="md:col-span-2 flex justify-center py-4">
                  <div className="relative w-full max-w-[140px] aspect-[4/3] flex items-center justify-center">
                    
                    {/* SVG Triangles Layers */}
                    <svg viewBox="0 0 100 80" className="w-full h-full cursor-pointer">
                      {/* Top Notes Layer */}
                      <polygon
                        points="50,5 30,30 70,30"
                        onClick={() => setActivePyramidLayer("top")}
                        className={`transition-all duration-300 stroke-gold/50 ${
                          activePyramidLayer === "top"
                            ? "fill-gold/30 stroke-gold stroke-[2]"
                            : "fill-black/60 hover:fill-gold/15"
                        }`}
                      />
                      {/* Heart Notes Layer */}
                      <polygon
                        points="30,31 15,55 85,55 70,31"
                        onClick={() => setActivePyramidLayer("heart")}
                        className={`transition-all duration-300 stroke-gold/50 ${
                          activePyramidLayer === "heart"
                            ? "fill-gold/30 stroke-gold stroke-[2]"
                            : "fill-black/60 hover:fill-gold/15"
                        }`}
                      />
                      {/* Base Notes Layer */}
                      <polygon
                        points="15,56 0,80 100,80 85,56"
                        onClick={() => setActivePyramidLayer("base")}
                        className={`transition-all duration-300 stroke-gold/50 ${
                          activePyramidLayer === "base"
                            ? "fill-gold/30 stroke-gold stroke-[2]"
                            : "fill-black/60 hover:fill-gold/15"
                        }`}
                      />
                    </svg>

                    {/* Simple notes markers text overlay */}
                    <div className="absolute text-[8px] uppercase tracking-widest text-white/30 pointer-events-none flex flex-col gap-5 text-center mt-2 font-bold">
                      <span className={activePyramidLayer === "top" ? "text-gold" : ""}>Top</span>
                      <span className={activePyramidLayer === "heart" ? "text-gold" : ""}>Heart</span>
                      <span className={activePyramidLayer === "base" ? "text-gold" : ""}>Base</span>
                    </div>

                  </div>
                </div>

                {/* Scent notes details panel */}
                <div className="md:col-span-3 bg-black/40 rounded-xl p-4 border border-white/5 flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {layerDescriptions[activePyramidLayer].title}
                  </h4>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest font-semibold">
                    {layerDescriptions[activePyramidLayer].duration}
                  </span>
                  
                  <p className="text-[11px] text-white/60 leading-relaxed font-light mt-1">
                    {layerDescriptions[activePyramidLayer].desc}
                  </p>

                  <div className="bg-black/80 rounded border border-gold/10 p-2.5 mt-2">
                    <span className="text-[9px] uppercase text-white/40 block font-bold">Mated Ingredients:</span>
                    <span className="text-[11px] text-white font-medium italic mt-0.5 block">{layerDescriptions[activePyramidLayer].notes}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. FABRIC LONGEVITY VISUAL GRAPHICS */}
            <div className="bg-[#121212]/40 border border-white/5 rounded-2xl p-6">
              <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-4 block">Fabric Longevity Matrix</span>
              <div className="flex flex-col gap-3">
                {[
                  { fabric: "Wool & Cashmere Coats", days: 5, fillWidth: "w-full", text: "5 Days Eternal Aura" },
                  { fabric: "Premium Silk & Satin Gowns", days: 4, fillWidth: "w-4/5", text: "4 Days Solid Presence" },
                  { fabric: "Light Cotton & Linens", days: 3, fillWidth: "w-3/5", text: "3 Days Moderate Release" }
                ].map((row, i) => (
                  <div key={i} className="flex flex-col gap-1 text-xs">
                    <div className="flex justify-between items-center text-[10px] text-white/60">
                      <span>{row.fabric}</span>
                      <span className="text-gold font-bold">{row.text}</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                      <div className={`h-full bg-gold-gradient rounded-full ${row.fillWidth}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Buy / Cart Controls */}
            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-2">
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block">Showroom Price</span>
                <span className="font-serif text-3xl font-extrabold text-white">${product.price}</span>
              </div>

              {/* Quantity Selectors */}
              <div className="flex items-center border border-white/10 rounded-md bg-black overflow-hidden h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 hover:bg-white/5 text-white/70 hover:text-gold transition-colors text-sm font-bold"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 hover:bg-white/5 text-white/70 hover:text-gold transition-colors text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <button
                onClick={handleInstantBuy}
                className="py-4 bg-gold hover:bg-gold-light text-black font-bold uppercase tracking-widest text-xs rounded-md transition-colors btn-luxury shadow-lg shadow-gold/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Buy Instantly
              </button>
              <button
                onClick={handleAddToCart}
                className="py-4 border border-white/10 hover:border-gold hover:text-gold text-white font-bold uppercase tracking-widest text-xs rounded-md transition-all bg-white/5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Scent Bag
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-between items-center gap-4 text-[10px] text-white/40 pt-4 border-t border-white/5">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>Complimentary Shipping</span>
              </div>
              <div className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span>70% High Oil Fabric Binding</span>
              </div>
              <div>100% Organic Ingredients</div>
            </div>

          </div>
        </div>

        {/* RELATED HARMONIES */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-white/5 pt-20">
            <h3 className="font-serif text-2xl text-white uppercase tracking-widest mb-10 text-center">
              HARMONIOUS COMPLEMENTS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#121212]/40 border border-white/5 hover:border-gold/30 p-6 rounded-2xl flex flex-col justify-between transition-all duration-500 group"
                >
                  <div className="relative aspect-square w-full bg-black/60 rounded-xl overflow-hidden flex items-center justify-center p-4 mb-4">
                    <div className="absolute w-20 h-20 bg-gold/5 rounded-full blur-xl group-hover:bg-gold/10" />
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain p-6 animate-float-medium group-hover:scale-105 transition-all"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-gold font-semibold uppercase tracking-wider block mb-1">
                      {p.scentProfile}
                    </span>
                    <h4 className="font-serif text-sm font-bold uppercase text-white group-hover:text-gold transition-colors tracking-wide line-clamp-1">
                      {p.name}
                    </h4>
                    <p className="text-xs text-white/50 leading-relaxed font-light mt-1 line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                    <span className="font-serif text-base font-bold text-white">${p.price}</span>
                    <Link
                      href={`/product/${p.id}`}
                      className="text-xs font-bold uppercase tracking-widest text-gold hover:text-white transition-colors"
                    >
                      Acquire &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
