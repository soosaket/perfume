"use client";

import React from "react";
import Image from "next/image";
import { useApp } from "@/app/context/AppContext";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";

export default function WishlistDrawer() {
  const {
    products,
    wishlist,
    wishlistOpen,
    setWishlistOpen,
    toggleWishlist,
    addToCart,
    setCartOpen
  } = useApp();

  if (!wishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleTransferToCart = (product: any) => {
    addToCart(product, 1, "100ml");
    toggleWishlist(product.id); // remove from wishlist on add
    setWishlistOpen(false);
    setCartOpen(true); // open cart drawer to show added item
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setWishlistOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-[#0C0C0C] border-l border-gold/20 shadow-2xl flex flex-col z-10 animate-slide-in-right">
        {/* Header */}
        <div className="p-6 border-b border-gold/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg tracking-widest text-white uppercase">Your Scent Favorites</h3>
            <span className="text-[10px] text-gold font-bold px-2 py-0.5 bg-gold/10 rounded-full border border-gold/30">
              {wishlistProducts.length} Items
            </span>
          </div>
          <button
            onClick={() => setWishlistOpen(false)}
            className="p-2 text-white/70 hover:text-gold transition-colors"
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Contents */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {wishlistProducts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 text-white/40">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold">
                <Heart className="w-6 h-6 stroke-[1.2]" />
              </div>
              <div>
                <h4 className="font-serif text-sm tracking-widest uppercase text-white mb-1">Your favorites is empty</h4>
                <p className="text-xs">Save the exquisite fabric perfumes you adore to purchase or sample later.</p>
              </div>
              <button
                onClick={() => setWishlistOpen(false)}
                className="mt-2 text-xs uppercase tracking-widest bg-gold hover:bg-gold-light text-black font-semibold px-6 py-2.5 rounded-md transition-colors"
              >
                Discover Perfumes
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="flex gap-4 pb-6 border-b border-white/5">
                {/* Image */}
                <div className="relative w-20 h-20 bg-black/60 rounded border border-gold/10 overflow-hidden flex items-center justify-center flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider line-clamp-1">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-white/30 hover:text-red-500 transition-colors"
                        aria-label="Remove from favorites"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[10px] text-gold mt-1">{product.concentration}</div>
                    <div className="text-xs font-bold text-white mt-1">${product.price}</div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleTransferToCart(product)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-gold hover:bg-gold-light text-black text-[10px] uppercase font-bold py-2 rounded transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      Add to Bag
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="border border-white/10 hover:border-red-500 hover:text-red-500 text-white/50 text-[10px] uppercase font-bold px-2 py-2 rounded transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
