"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/app/context/AppContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import WishlistDrawer from "@/app/components/WishlistDrawer";
import SoundPlayer, { playGlobalSpraySound } from "@/app/components/SoundPlayer";
import { Search, Heart, ShoppingBag, Eye, Star, SlidersHorizontal, ArrowUpDown } from "lucide-react";

export default function Shop() {
  const { products, toggleWishlist, isInWishlist, addToCart, setCartOpen } = useApp();
  
  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedScentProfile, setSelectedScentProfile] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(120);
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Extract unique categories and profiles for dynamic filter dropdowns
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [products]);

  const scentProfiles = useMemo(() => {
    const profiles = new Set(products.map((p) => p.scentProfile));
    return ["All", ...Array.from(profiles)];
  }, [products]);

  // Handle product filtering & sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.notes.top.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.notes.base.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        const matchesScent = selectedScentProfile === "All" || p.scentProfile === selectedScentProfile;
        const matchesPrice = p.price <= maxPrice;
        
        return matchesSearch && matchesCategory && matchesScent && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return b.reviewsCount - a.reviewsCount; // default popularity
      });
  }, [products, searchQuery, selectedCategory, selectedScentProfile, maxPrice, sortBy]);

  const handleQuickAdd = (product: any) => {
    playGlobalSpraySound();
    addToCart(product, 1, "100ml");
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
      <SoundPlayer />
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-6 w-full pt-32 pb-24">
        {/* Page Title Banners */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Showroom Catalog</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-widest mt-3">
            THE SCENT PRIVATE CACHÉ
          </h1>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-4" />
          <p className="text-xs text-white/50 max-w-md mx-auto mt-4 leading-relaxed font-light">
            Indulge in our full range of 70% oil concentration fabric mist extractions. Filtered by royal scent categories and curated scent pyramids.
          </p>
        </div>

        {/* Filter Toolbar Controls */}
        <div className="bg-[#121212]/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 mb-12 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search perfumes, scent notes, ingredients..."
                className="w-full bg-black/60 border border-white/10 focus:border-gold/50 rounded-lg py-3 pl-11 pr-4 text-xs outline-none transition-all placeholder:text-white/30"
              />
            </div>

            {/* Actions for Mobile filters */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <button
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-gold hover:text-black border border-white/10 hover:border-gold rounded-lg text-xs font-semibold uppercase tracking-wider transition-all md:hidden cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gold" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-black/60 border border-white/10 focus:border-gold/50 text-xs text-white/80 py-3 px-4 rounded-lg outline-none cursor-pointer"
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Filter Panel */}
          <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ${showFiltersMobile ? "block" : "hidden md:grid"}`}>
            {/* Category Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-black/60 border border-white/10 focus:border-gold/50 text-xs text-white py-2.5 px-3 rounded-md outline-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Scent Profile Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Olfactory Aura</label>
              <select
                value={selectedScentProfile}
                onChange={(e) => setSelectedScentProfile(e.target.value)}
                className="bg-black/60 border border-white/10 focus:border-gold/50 text-xs text-white py-2.5 px-3 rounded-md outline-none cursor-pointer"
              >
                {scentProfiles.map((profile) => (
                  <option key={profile} value={profile}>
                    {profile}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-2">
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/50 font-bold">
                <span>Maximum Price</span>
                <span className="text-gold font-bold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="120"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-gold bg-white/5 h-1.5 rounded-full cursor-pointer mt-3"
              />
              <div className="flex justify-between text-[9px] text-white/30 mt-1">
                <span>$50</span>
                <span>$120</span>
              </div>
            </div>
          </div>
        </div>

        {/* Catalog Items Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-[#121212]/20 rounded-2xl border border-white/5 max-w-xl mx-auto flex flex-col gap-4 items-center">
            <span className="text-gold text-2xl">✕</span>
            <h3 className="font-serif text-lg uppercase tracking-widest text-white">No Fragrances Found</h3>
            <p className="text-xs text-white/50 max-w-xs mx-auto">
              Your selected filters returned zero private reserves. Try expanding your price slider or clearing your search filter query.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedScentProfile("All");
                setMaxPrice(120);
              }}
              className="text-xs uppercase tracking-widest bg-gold hover:bg-gold-light text-black font-semibold px-6 py-2.5 rounded-md mt-2 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-white/5 hover:border-gold/30 p-6 flex flex-col justify-between transition-all duration-500 group shadow-lg"
              >
                {/* Image panel */}
                <div className="relative aspect-square w-full bg-black/60 rounded-xl overflow-hidden flex items-center justify-center p-4 border border-white/5 mb-6">
                  <div className="absolute w-32 h-32 rounded-full bg-gold/5 blur-2xl group-hover:bg-gold/15 transition-all" />
                  
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-all duration-700 animate-float-medium"
                  />

                  {/* Longevity tag */}
                  <span className="absolute bottom-3 left-3 bg-[#0B0B0B]/85 border border-gold/30 text-gold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-medium">
                    {product.longevity} Longevity
                  </span>

                  {/* Favorite button */}
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

                {/* Info block */}
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gold uppercase tracking-widest font-semibold">
                      {product.category} &bull; {product.scentProfile}
                    </span>
                    <div className="flex items-center gap-1 text-gold">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-[10px] text-white/50">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-base font-bold text-white group-hover:text-gold transition-colors duration-300 uppercase tracking-wide">
                    {product.name}
                  </h3>
                  
                  <p className="text-xs text-white/50 leading-relaxed font-light line-clamp-2">
                    {product.description}
                  </p>

                  {/* Notes List */}
                  <div className="bg-black/45 rounded-lg p-3 border border-white/5 mt-2 text-[10px] text-white/40 flex flex-col gap-1">
                    <p><strong className="text-white">Top notes:</strong> {product.notes.top}</p>
                    <p><strong className="text-white">Heart notes:</strong> {product.notes.heart}</p>
                    <p><strong className="text-white">Base notes:</strong> {product.notes.base}</p>
                  </div>
                </div>

                {/* Details actions footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <span className="text-[9px] text-white/40 block">Concentration</span>
                    <span className="text-[10px] text-gold font-medium uppercase">{product.concentration}</span>
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
        )}
      </main>

      <Footer />
    </div>
  );
}
