"use client";

import React, { useState } from "react";
import { useApp } from "@/app/context/AppContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import WishlistDrawer from "@/app/components/WishlistDrawer";
import SoundPlayer, { playGlobalSpraySound } from "@/app/components/SoundPlayer";
import { Mail, Phone, MapPin, Sparkles, Send, Terminal, CheckCircle } from "lucide-react";

export default function Contact() {
  const { submitContactMessage } = useApp();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  // SMTP Simulation Log state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [smtpLogs, setSmtpLogs] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playGlobalSpraySound();
    setIsSubmitting(true);
    setShowConsole(true);
    setSmtpLogs([]);

    // Simulated real-time Nodemailer SMTP protocol logs
    const logs = [
      "Initializing Node.js Nodemailer engine...",
      "Resolving SMTP server endpoint variables from process.env...",
      `Connecting to SMTP server at mail.swavikperfumes.com (SSL Port 465)...`,
      "Connection established. Handshaking...",
      ">> 220 mail.swavikperfumes.com ESMTP Postfix (Ubuntu)",
      "<< EHLO client.swavik.local",
      ">> 250-mail.swavikperfumes.com, PIPELINING, SIZE 31457280, 8BITMIME, STARTTLS",
      "<< AUTH LOGIN (Secure SSL TLS Session key verified)",
      ">> 334 VXNlcm5hbWU6 (Authenticating SMTP credential handshake)",
      `<< Dispatched validated sender account: accounts@swavikperfumes.com`,
      ">> 235 2.7.0 Authentication successful",
      `<< MAIL FROM:<${formData.email}>`,
      ">> 250 2.1.0 Ok",
      `<< RCPT TO:<concierge@swavikperfumes.com>`,
      ">> 250 2.1.5 Ok (Recipient inbox verified)",
      "<< DATA (Writing email headers: Subject: " + (formData.subject || "Showroom Inquiry") + ")",
      ">> 354 End data with <CR><LF>.<CR><LF>",
      "Dispatched secure message bytes to mailbox pool...",
      ">> 250 2.0.0 Ok: queued as SWK-MSG-8840294",
      "SMTP connection closed cleanly. Success transmission code 250.",
      "Dispatching auto-response verification to sender..."
    ];

    // Stream logs slowly for highly futuristic terminal visual feel
    for (let i = 0; i < logs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      setSmtpLogs((prev) => [...prev, logs[i]]);
    }

    // Save message to React context inbox
    submitContactMessage(formData.name, formData.email, formData.subject, formData.message);
    
    setIsSubmitting(false);
    setSubmittedSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
      <SoundPlayer />
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-6 w-full pt-32 pb-24">
        {/* Header Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Concierge Lounge</span>
          <h1 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-widest mt-3">
            COMMUNICATE WITH PERFUMERS
          </h1>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-4" />
          <p className="text-xs text-white/50 max-w-md mx-auto mt-4 leading-relaxed font-light">
            Have a custom scent formulation request or a wholesale boutique showroom inquiry? Secure a private concierge session.
          </p>
        </div>

        {/* Mapped Showrooms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { city: "Paris Showroom", address: "Rue du Faubourg Saint-Honoré, 75008 Paris", phone: "+33 (0) 1 42 68 53 00" },
            { city: "Dubai Showroom", address: "Promenade Block, Downtown Marina, Dubai UAE", phone: "+971 (0) 4 362 7900" },
            { city: "Mumbai Imperial Office", address: "Taj Palace Chambers, Colaba, Mumbai", phone: "+91 22 6665 3366" }
          ].map((showroom, i) => (
            <div key={i} className="bg-[#121212]/40 border border-white/5 hover:border-gold/30 rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300">
              <MapPin className="w-5 h-5 text-gold" />
              <h4 className="font-serif text-sm font-bold uppercase text-white tracking-wider">{showroom.city}</h4>
              <p className="text-xs text-white/50 leading-relaxed font-light">{showroom.address}</p>
              <span className="text-xs text-gold font-medium mt-auto">{showroom.phone}</span>
            </div>
          ))}
        </div>

        {/* Contact Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          {/* SMTP Terminal Output screen */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Mail Server Output</span>
              <h3 className="font-serif text-xl md:text-2xl text-white uppercase tracking-widest mt-1">
                SECURE SMTP LIVE WIRE
              </h3>
              <p className="text-xs text-white/50 leading-relaxed mt-2 font-light">
                When you click dispatch, your inquiry is securely routed through our active SMTP Mail Relay Node. You can view the live protocol handshaking logs below.
              </p>
            </div>

            {/* Simulated Live Console Log Terminal */}
            <div className="bg-[#050505] rounded-2xl border border-gold/20 p-6 font-mono text-[10px] text-green-400 h-[280px] overflow-y-auto shadow-2xl relative">
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded border border-green-500/20 text-[9px] text-green-400 uppercase tracking-widest">
                <Terminal className="w-3.5 h-3.5" />
                <span>SMTP TLS Relay Active</span>
              </div>

              {!showConsole ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-white/30 gap-2">
                  <Terminal className="w-8 h-8 stroke-[1.2] text-gold" />
                  <p>Awaiting SMTP email dispatch trigger...</p>
                  <p className="text-[9px]">Logs will populate in real-time upon form submission.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {smtpLogs.map((log, index) => (
                    <div key={index} className="leading-relaxed animate-fade-in break-all">
                      <span className="text-white/40">[{index + 1}]</span> {log}
                    </div>
                  ))}
                  {isSubmitting && (
                    <div className="animate-pulse text-gold">Relaying message packets...</div>
                  )}
                  {submittedSuccess && (
                    <div className="flex items-center gap-1.5 text-gold font-bold mt-4 animate-bounce">
                      <CheckCircle className="w-4 h-4 text-gold" />
                      <span>SMTP PROTOCOL COMPLETED. auto-confirmation invoice mailed.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="bg-[#121212]/40 border border-white/5 rounded-2xl p-8 flex flex-col gap-4 shadow-xl">
            <h3 className="font-serif text-lg uppercase tracking-widest text-white mb-2">Write Scent Inquiry</h3>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name..."
                className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-3 px-4 text-xs outline-none transition-all text-white placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Royal Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your secure email..."
                className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-3 px-4 text-xs outline-none transition-all text-white placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Custom Blend / Showroom VIP Tour / Boutique Orders..."
                className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-3 px-4 text-xs outline-none transition-all text-white placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Message Story</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Share your olfactory requirements or wholesale queries..."
                className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-3 px-4 text-xs outline-none transition-all text-white placeholder:text-white/20 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full py-4 bg-gold hover:bg-gold-light disabled:bg-gold/30 text-black font-bold uppercase tracking-widest text-xs rounded-md transition-colors btn-luxury flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Synthesizing Handshake..." : "Dispatch Secure Mail"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
