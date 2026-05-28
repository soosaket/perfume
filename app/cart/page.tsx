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
import { Trash2, Plus, Minus, Tag, ShieldCheck, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    coupon,
    discountPercent,
    applyCoupon
  } = useApp();

  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState<"idle" | "success" | "error">("idle");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const success = applyCoupon(couponCode);
    if (success) {
      setCouponStatus("success");
      setCouponCode("");
      setTimeout(() => setCouponStatus("idle"), 4000);
    } else {
      setCouponStatus("error");
      setTimeout(() => setCouponStatus("idle"), 4000);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
      <SoundPlayer />
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-6 w-full pt-32 pb-24">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Acquisitions</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-widest mt-3">
            YOUR OLFACTORY DESIGNER BAG
          </h1>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-4" />
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24 bg-[#121212]/20 border border-white/5 rounded-2xl max-w-xl mx-auto flex flex-col gap-4 items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold">
              <ShoppingBag className="w-6 h-6 stroke-[1.2]" />
            </div>
            <h3 className="font-serif text-lg uppercase tracking-widest text-white">Your designer bag is empty</h3>
            <p className="text-xs text-white/50 max-w-xs mx-auto">
              You haven't added any luxury fabric perfume reserves to your bag yet. Head over to our showroom and pick an aura.
            </p>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest bg-gold hover:bg-gold-light text-black font-semibold px-6 py-2.5 rounded-md mt-2 transition-colors cursor-pointer"
            >
              Browse Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Columns: Items Table (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-[#121212]/40 border border-white/5 rounded-2xl p-6 overflow-hidden">
                <h3 className="font-serif text-sm uppercase tracking-widest text-white font-bold mb-6 pb-2 border-b border-white/5">
                  Acquired Reserves
                </h3>

                <div className="flex flex-col gap-6">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.product.id}-${item.size}-${index}`}
                      className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-white/5 last:border-b-0 last:pb-0 items-start sm:items-center"
                    >
                      {/* Image */}
                      <div className="relative w-24 h-24 bg-black/60 rounded-xl border border-gold/15 flex-shrink-0 flex items-center justify-center p-2">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      {/* Info Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-sm font-bold uppercase text-white tracking-wide line-clamp-1">
                            {item.product.name}
                          </h4>
                        </div>
                        <span className="text-[10px] text-gold font-medium uppercase mt-1 block">
                          {item.concentration}
                        </span>
                        
                        <div className="flex items-center gap-4 text-xs text-white/50 mt-3">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] uppercase font-bold text-white/30">Bottle Size:</span>
                            <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded font-bold text-white">
                              {item.size}
                            </span>
                          </div>
                          <span>&bull;</span>
                          <span className="font-bold text-gold">${item.product.price} each</span>
                        </div>
                      </div>

                      {/* Quantity Selector & Price */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto flex-shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0">
                        <div className="flex items-center border border-white/10 rounded overflow-hidden bg-black">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="p-2 hover:bg-white/5 text-white/70 hover:text-gold transition-colors text-xs font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="p-2 hover:bg-white/5 text-white/70 hover:text-gold transition-colors text-xs font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-serif font-bold text-gold text-lg">
                            ${item.product.price * item.quantity}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="p-2 border border-white/10 hover:border-red-500 rounded text-white/40 hover:text-red-500 transition-colors"
                            title="Remove Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Back to shop link */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-gold transition-colors self-start"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to private showroom catalog
              </Link>
            </div>

            {/* Right Column: Totals summary (1 col) */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#121212]/40 border border-white/5 rounded-2xl p-6">
                <h3 className="font-serif text-sm uppercase tracking-widest text-white font-bold mb-6 pb-2 border-b border-white/5">
                  Order Summary
                </h3>

                {/* Promo Coupon Code */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon: ROYALGOLD or FABRIC20"
                    className="flex-1 bg-black border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-3 text-xs outline-none uppercase tracking-wider text-white placeholder:text-white/20"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-white/5 hover:bg-gold hover:text-black border border-white/10 hover:border-gold rounded-md text-xs font-semibold text-white transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {couponStatus === "success" && (
                  <p className="text-[10px] text-green-400 font-medium mb-4">Privilege discount code applied!</p>
                )}
                {couponStatus === "error" && (
                  <p className="text-[10px] text-red-400 font-medium mb-4">Invalid private showroom code.</p>
                )}

                {/* Cost breakdown */}
                <div className="flex flex-col gap-3 text-xs text-white/50 border-b border-white/5 pb-4 mb-4">
                  <div className="flex justify-between">
                    <span>Aura Subtotal</span>
                    <span className="text-white">${subtotal}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-gold">
                      <span>Privilege Discount ({coupon} - {discountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Tax (Organic Exemption)</span>
                    <span className="text-white">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Specialized Insured Shipping</span>
                    <span className="text-white">{shipping === 0 ? "Complimentary" : `$${shipping}`}</span>
                  </div>
                  
                  {shipping > 0 && (
                    <p className="text-[9px] text-gold/60 italic text-center mt-2 bg-gold/5 border border-gold/10 p-2 rounded">
                      Add ${(150 - subtotal)} more to unlock complimentary insured royal shipping!
                    </p>
                  )}
                </div>

                {/* Royal total balance */}
                <div className="flex justify-between items-center text-sm font-bold text-white mb-6">
                  <span>Royal Balance Due</span>
                  <span className="font-serif text-xl font-bold text-gold">${total.toFixed(2)}</span>
                </div>

                {/* Shield note */}
                <div className="flex items-center gap-2 text-[10px] text-white/40 justify-center mb-6">
                  <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Insured hand-delivery with sealed signature box.</span>
                </div>

                {/* Proceed Checkout button */}
                <Link
                  href="/checkout"
                  className="w-full text-center block bg-gold hover:bg-gold-light text-black font-bold uppercase tracking-widest text-xs py-4 rounded-md transition-colors btn-luxury shadow-lg shadow-gold/25"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
