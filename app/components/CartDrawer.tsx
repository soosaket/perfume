"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/app/context/AppContext";
import { X, Trash2, Plus, Minus, Tag, ShieldCheck } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateCartQuantity,
    coupon,
    discountPercent,
    applyCoupon
  } = useApp();

  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState<"idle" | "success" | "error">("idle");

  if (!cartOpen) return null;

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
  const total = subtotal - discountAmount;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-[#0C0C0C] border-l border-gold/20 shadow-2xl flex flex-col z-10 animate-slide-in-right">
        {/* Header */}
        <div className="p-6 border-b border-gold/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg tracking-widest text-white uppercase">Your Fragrance Bag</h3>
            <span className="text-[10px] text-gold font-bold px-2 py-0.5 bg-gold/10 rounded-full border border-gold/30">
              {cart.reduce((acc, item) => acc + item.quantity, 0)} Items
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 text-white/70 hover:text-gold transition-colors"
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Contents */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 text-white/40">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold">
                <Trash2 className="w-6 h-6 stroke-[1.2]" />
              </div>
              <div>
                <h4 className="font-serif text-sm tracking-widest uppercase text-white mb-1">Your bag is currently empty</h4>
                <p className="text-xs">Explore our premium organic showroom and select a signature fabric scent aura.</p>
              </div>
              <Link
                href="/shop"
                onClick={() => setCartOpen(false)}
                className="mt-2 text-xs uppercase tracking-widest bg-gold hover:bg-gold-light text-black font-semibold px-6 py-2.5 rounded-md transition-colors"
              >
                Shop Showroom
              </Link>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.product.id}-${item.size}-${index}`}
                className="flex gap-4 pb-6 border-b border-white/5"
              >
                {/* Image */}
                <div className="relative w-20 h-20 bg-black/60 rounded border border-gold/10 overflow-hidden flex items-center justify-center flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="text-white/30 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-white/50 mt-1">
                      <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">{item.size}</span>
                      <span>&bull;</span>
                      <span className="text-gold">{item.concentration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity selectors */}
                    <div className="flex items-center border border-white/10 rounded overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="p-1 px-2 hover:bg-white/5 text-white/70 hover:text-gold transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="p-1 px-2 hover:bg-white/5 text-white/70 hover:text-gold transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-gold">${item.product.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gold/10 bg-[#080808] flex flex-col gap-4">
            {/* Promo Codes */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-3 w-3.5 h-3.5 text-white/40" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon: ROYALGOLD or FABRIC20"
                  className="w-full bg-black border border-white/10 focus:border-gold/50 rounded-md py-2.5 pl-9 pr-4 text-xs outline-none transition-all placeholder:text-white/20 uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-4 bg-white/5 hover:bg-gold hover:text-black border border-white/10 hover:border-gold rounded-md text-xs font-semibold text-white transition-all cursor-pointer"
              >
                Apply
              </button>
            </form>

            {couponStatus === "success" && (
              <p className="text-[10px] text-green-400 font-medium">Privilege discount code applied successfully!</p>
            )}
            {couponStatus === "error" && (
              <p className="text-[10px] text-red-400 font-medium">Invalid or expired private coupon code.</p>
            )}

            {/* Price stack */}
            <div className="flex flex-col gap-2 border-b border-white/5 pb-4 text-xs text-white/50">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">${subtotal}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-gold">
                  <span>Privilege Coupon ({coupon} - {discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-bold text-sm pt-2">
                <span>Royal Balance</span>
                <span className="text-gold">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Guarantee */}
            <div className="flex items-center gap-2 text-[10px] text-white/40 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Complimentary insured shipping on orders over $150</span>
            </div>

            {/* Checkout action */}
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="w-full text-center bg-gold hover:bg-gold-light text-black font-bold uppercase tracking-widest text-xs py-4 rounded-md transition-all btn-luxury"
            >
              Secure Checkout
            </Link>

            <Link
              href="/cart"
              onClick={() => setCartOpen(false)}
              className="w-full text-center border border-white/10 hover:border-gold text-white hover:text-gold text-xs uppercase tracking-widest py-3 rounded-md transition-all"
            >
              View Full Cart Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
