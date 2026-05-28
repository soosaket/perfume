"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/app/context/AppContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import WishlistDrawer from "@/app/components/WishlistDrawer";
import SoundPlayer, { playGlobalSpraySound } from "@/app/components/SoundPlayer";
import { ShieldCheck, Calendar, CreditCard, Sparkles, Printer, CheckCircle, Package } from "lucide-react";

export default function CheckoutPage() {
  const { cart, coupon, discountPercent, placeOrder } = useApp();
  
  // Checkout steps: 1 = Shipping Address, 2 = Payment Card, 3 = Confirmation Invoice
  const [step, setStep] = useState<number>(1);
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);

  // Address Form State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States"
  });

  // Card Form State
  const [paymentCard, setPaymentCard] = useState({
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: ""
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentCard({
      ...paymentCard,
      [e.target.name]: e.target.value
    });
  };

  // Card formatting helpers
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.fullName || !shippingAddress.email || !shippingAddress.address) return;
    playGlobalSpraySound();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentCard.cardNumber || !paymentCard.cardName) return;
    
    playGlobalSpraySound();
    // Execute context checkout placeOrder
    const newOrder = placeOrder(shippingAddress, "Luxury Card System");
    setPlacedOrder(newOrder);
    setStep(3);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal - discountAmount + shipping;

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white print:bg-white print:text-black">
      {/* Hide layout wrappers in printing */}
      <div className="print:hidden">
        <SoundPlayer />
        <Navbar />
        <CartDrawer />
        <WishlistDrawer />
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-6 w-full pt-32 pb-24 print:pt-4 print:pb-4">
        
        {/* Step Indicator Header */}
        {step < 3 && (
          <div className="max-w-md mx-auto mb-12 flex justify-between items-center text-xs uppercase tracking-widest font-bold border-b border-white/5 pb-4 print:hidden">
            <span className={step === 1 ? "text-gold" : "text-white/40"}>1. Consignee Address</span>
            <span className="text-white/20">&rarr;</span>
            <span className={step === 2 ? "text-gold" : "text-white/40"}>2. Card Verification</span>
          </div>
        )}

        {/* STEP 1: ADDRESS DETAILS */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start max-w-5xl mx-auto">
            
            {/* Form (3 cols) */}
            <form onSubmit={handleAddressSubmit} className="lg:col-span-3 bg-[#121212]/40 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-xl">
              <h3 className="font-serif text-lg uppercase tracking-widest text-white mb-2">Delivery Coordinates</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Consignee Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleAddressChange}
                    required
                    placeholder="E.g. Lord Alexander"
                    className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-4 text-xs outline-none text-white placeholder:text-white/20"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Secure Email</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingAddress.email}
                    onChange={handleAddressChange}
                    required
                    placeholder="alexander@luxury.com"
                    className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-4 text-xs outline-none text-white placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Contact Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleAddressChange}
                    required
                    placeholder="+1 (555) 732 9402"
                    className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-4 text-xs outline-none text-white placeholder:text-white/20"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Residency Country</label>
                  <select
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleAddressChange}
                    className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-4 text-xs outline-none text-white cursor-pointer"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="France">France</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Delivery Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleAddressChange}
                  required
                  placeholder="Street address, apartment, penthouse suite..."
                  className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-4 text-xs outline-none text-white placeholder:text-white/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    required
                    placeholder="New York"
                    className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-4 text-xs outline-none text-white placeholder:text-white/20"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">ZIP / Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleAddressChange}
                    required
                    placeholder="10001"
                    className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-4 text-xs outline-none text-white placeholder:text-white/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gold hover:bg-gold-light text-black font-bold uppercase tracking-widest text-xs rounded-md transition-colors btn-luxury mt-2 cursor-pointer"
              >
                Proceed to Verification
              </button>
            </form>

            {/* Subtotals Panel (2 cols) */}
            <div className="lg:col-span-2 bg-[#121212]/40 border border-white/5 rounded-2xl p-6 flex flex-col gap-6">
              <h4 className="font-serif text-xs uppercase tracking-widest text-gold font-bold mb-2 border-b border-white/5 pb-2">
                Order Review
              </h4>
              <div className="flex flex-col gap-4">
                {cart.map((item, i) => (
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

              <div className="border-t border-white/5 pt-4 flex flex-col gap-2 text-xs text-white/50">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-gold">
                    <span>Privilege Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white">{shipping === 0 ? "Complimentary" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/5 mt-2">
                  <span>Total Due</span>
                  <span className="text-gold font-serif text-lg font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* STEP 2: PAYMENT CARD VERIFICATION */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start max-w-5xl mx-auto">
            
            {/* Left form (3 cols) */}
            <form onSubmit={handlePaymentSubmit} className="lg:col-span-3 bg-[#121212]/40 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-xl">
              <h3 className="font-serif text-lg uppercase tracking-widest text-white mb-2 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gold" />
                Luxury Card Verification
              </h3>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentCard.cardNumber}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    setPaymentCard({ ...paymentCard, cardNumber: formatted });
                  }}
                  maxLength={19}
                  required
                  placeholder="4000 1234 5678 9010"
                  className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-4 text-xs outline-none text-white placeholder:text-white/20 font-mono tracking-widest"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={paymentCard.cardName}
                  onChange={handleCardChange}
                  required
                  placeholder="E.g. Lord Alexander"
                  className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-4 text-xs outline-none text-white placeholder:text-white/20 uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Expiry Date</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={paymentCard.cardExpiry}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9]/g, "");
                      if (val.length > 2) {
                        val = val.substring(0, 2) + "/" + val.substring(2, 4);
                      }
                      setPaymentCard({ ...paymentCard, cardExpiry: val });
                    }}
                    maxLength={5}
                    required
                    placeholder="MM/YY"
                    className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-4 text-xs outline-none text-white placeholder:text-white/20 font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">CVV Code</label>
                  <input
                    type="password"
                    name="cardCvv"
                    value={paymentCard.cardCvv}
                    onChange={handleCardChange}
                    maxLength={3}
                    required
                    placeholder="***"
                    className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-4 text-xs outline-none text-white placeholder:text-white/20 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gold hover:bg-gold-light text-black font-bold uppercase tracking-widest text-xs rounded-md transition-colors btn-luxury mt-2 cursor-pointer"
              >
                Complete Payment Verification
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-2 bg-transparent hover:text-gold text-white/50 text-[10px] uppercase font-bold tracking-widest mt-1 text-center"
              >
                &larr; Back to Shipping Address
              </button>
            </form>

            {/* Right Interactive Credit Card Visualizer (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-6 items-center">
              <h4 className="font-serif text-xs uppercase tracking-widest text-gold font-bold mb-2 self-start">
                Secure Virtual Card
              </h4>
              
              {/* Virtual Gold Credit Card */}
              <div className="w-full aspect-[1.586/1] bg-gradient-to-tr from-[#8C7326] via-[#D4AF37] to-[#F3E5AB] rounded-2xl p-6 shadow-2xl flex flex-col justify-between text-black relative overflow-hidden border border-white/20 max-w-[340px] animate-gold-shine">
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                
                {/* Chip / Brand */}
                <div className="flex justify-between items-center relative z-10">
                  <div className="w-10 h-8 bg-black/10 rounded border border-black/5" />
                  <span className="font-serif text-base tracking-[0.2em] font-extrabold uppercase text-black">SWAVIK</span>
                </div>

                {/* Card Number */}
                <div className="font-mono text-base md:text-lg tracking-widest text-black/80 font-bold my-4 relative z-10">
                  {paymentCard.cardNumber || "•••• •••• •••• ••••"}
                </div>

                {/* Expiry / Name */}
                <div className="flex justify-between items-end relative z-10">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[8px] uppercase tracking-wider text-black/50">Cardholder</span>
                    <span className="font-sans text-xs tracking-wider font-semibold uppercase text-black truncate pr-4">
                      {paymentCard.cardName || "Alexander Churchill"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 flex-shrink-0 text-right">
                    <span className="text-[8px] uppercase tracking-wider text-black/50">Expires</span>
                    <span className="font-mono text-xs font-semibold text-black">
                      {paymentCard.cardExpiry || "08/29"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Secure note */}
              <div className="flex items-center gap-2 text-[10px] text-white/40 justify-center">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>PCI-DSS Compliant 256-bit SSL encrypted.</span>
              </div>
            </div>

          </div>
        )}

        {/* STEP 3: OFFICIAL SHOWROOM PDF INVOICE CONFIRMATION */}
        {step === 3 && placedOrder !== null && (
          <div className="max-w-3xl mx-auto">
            
            {/* Thank you box */}
            <div className="text-center mb-8 print:hidden">
              <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.3em] bg-gold/15 border border-gold/40 text-gold px-3.5 py-1.5 rounded-full mb-4 animate-gold-shine">
                <CheckCircle className="w-4 h-4" />
                Acquisition Complete
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white uppercase tracking-widest">
                YOUR INVOICE IS COMPLED
              </h2>
              <p className="text-xs text-white/50 mt-2 max-w-md mx-auto">
                Thank you for acquiring our organic fabric perfumes. An auto-confirmation email containing your invoice pdf has been dispatched via our secure SMTP relay.
              </p>
              
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handlePrintInvoice}
                  className="px-5 py-2.5 bg-white/5 hover:bg-gold hover:text-black border border-white/10 hover:border-gold text-xs uppercase font-bold tracking-widest rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Print Official Invoice
                </button>
                <Link
                  href={`/track?orderId=${placedOrder.id}`}
                  className="px-5 py-2.5 bg-gold hover:bg-gold-light text-black text-xs uppercase font-bold tracking-widest rounded-md transition-all flex items-center gap-1.5 shadow-lg shadow-gold/20"
                >
                  <Package className="w-4 h-4" />
                  Track Transit: {placedOrder.id}
                </Link>
              </div>
            </div>

            {/* PRINTABLE INVOICE SHEET (Ivory / Elegant Border) */}
            <div className="bg-[#FFFFFA] text-black border-4 border-gold/45 rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden font-sans">
              {/* Gold luxury crest overlay (SVG placeholder) */}
              <div className="absolute top-8 right-8 flex flex-col text-right items-end select-none">
                <span className="font-serif text-2xl font-extrabold tracking-[0.3em] text-[#8C7326]">SWAVIK</span>
                <span className="text-[6px] tracking-[0.55em] text-black/50 font-bold uppercase mt-0.5">FABRIC PERFUMES</span>
              </div>

              {/* Title Crest */}
              <div className="mb-10 pb-6 border-b border-[#8C7326]/20">
                <span className="text-[8px] uppercase tracking-widest text-[#8C7326] font-extrabold">Official Showroom Voucher</span>
                <h3 className="font-serif text-2xl font-black tracking-widest uppercase text-black mt-1">OFFICIAL INVOICE CERTIFICATE</h3>
                <p className="text-[10px] text-black/50 mt-1">SWAVIK Perfumers Paris &bull; Dubai &bull; Mumbai</p>
              </div>

              {/* Invoice Metadata */}
              <div className="grid grid-cols-2 gap-8 text-xs mb-10">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[8px] uppercase text-[#8C7326] font-bold">Voucher Reference</span>
                  <span className="font-mono font-bold text-sm text-black">{placedOrder.id}</span>
                  <span className="text-[10px] text-black/50">Date Issued: {placedOrder.date}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[8px] uppercase text-[#8C7326] font-bold">Consignee Address</span>
                  <span className="font-bold text-black">{placedOrder.shippingAddress.fullName}</span>
                  <span className="text-[10px] text-black/60 leading-relaxed">
                    {placedOrder.shippingAddress.address}, {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.zipCode}, {placedOrder.shippingAddress.country}
                  </span>
                </div>
              </div>

              {/* Items List Table */}
              <div className="mb-10">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-black/10 text-[8px] uppercase tracking-widest text-black/50">
                      <th className="py-2">Item Description</th>
                      <th className="py-2 text-center">Size</th>
                      <th className="py-2 text-center">Quantity</th>
                      <th className="py-2 text-right">Acquisition Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {placedOrder.items.map((item: any, i: number) => (
                      <tr key={i} className="border-b border-black/5">
                        <td className="py-3">
                          <p className="font-semibold text-black">{item.product.name}</p>
                          <p className="text-[9px] text-[#8C7326] mt-0.5">{item.concentration}</p>
                        </td>
                        <td className="py-3 text-center">{item.size}</td>
                        <td className="py-3 text-center">{item.quantity}</td>
                        <td className="py-3 text-right font-serif font-bold">${item.product.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Subtotals invoice */}
              <div className="max-w-xs ml-auto text-xs flex flex-col gap-2.5 border-t-2 border-[#8C7326] pt-4">
                <div className="flex justify-between text-black/60">
                  <span>Subtotal Value</span>
                  <span className="font-bold text-black">${placedOrder.subtotal}</span>
                </div>
                {placedOrder.discount > 0 && (
                  <div className="flex justify-between text-[#8C7326] font-semibold">
                    <span>Privilege Coupon (-15%)</span>
                    <span>-${placedOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-black/60">
                  <span>Insured Special Transit</span>
                  <span>{placedOrder.shipping === 0 ? "Complimentary" : `$${placedOrder.shipping}`}</span>
                </div>
                <div className="flex justify-between text-black font-extrabold text-sm border-t border-black/10 pt-2.5">
                  <span>Total Value Settled</span>
                  <span className="text-[#8C7326] font-serif text-base">${placedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Sealed Signatures */}
              <div className="flex justify-between items-end mt-16 pt-6 border-t border-black/5 text-[9px] text-black/40">
                <div className="flex flex-col">
                  <span>Voucher issued by:</span>
                  <span className="font-serif text-[10px] font-bold text-[#8C7326] uppercase mt-1">SWAVIK Concierge Lounge</span>
                </div>
                <div className="w-16 h-16 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center text-[#8C7326] font-serif font-semibold italic text-[10px] transform rotate-12">
                  SEALED
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Hide footer in printing */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
