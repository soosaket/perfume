"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/app/context/AppContext";
import { ShoppingBag, Heart, User, Settings, Sparkles, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { cart, wishlist, setCartOpen, setWishlistOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for header background shifts
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: "Showroom", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Our Craft", href: "/about" },
    { label: "Scent Quiz", href: "/quiz" },
    { label: "Journal", href: "/journal" },
    { label: "Bespoke Offers", href: "/offers" },
    { label: "Subscription", href: "/subscribe" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0B0B0B]/85 backdrop-blur-md py-4 border-b border-gold/20"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-2xl tracking-[0.25em] text-white group-hover:text-gold transition-colors duration-300">
              SWAVIK
            </span>
            <span className="text-[7px] tracking-[0.6em] text-gold uppercase mt-0.5 ml-0.5">
              FABRIC PERFUMES
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest transition-colors duration-300 hover:text-gold ${
                    isActive ? "text-gold font-medium" : "text-white/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            {/* Scent Quiz floating glow */}
            <Link
              href="/quiz"
              className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold px-3 py-1.5 rounded-full text-gold transition-all duration-300 animate-gold-shine"
            >
              <Sparkles className="w-3 h-3" />
              Scent Finder
            </Link>

            {/* Wishlist */}
            <button
              onClick={() => setWishlistOpen(true)}
              className="relative p-2 text-white hover:text-gold transition-colors duration-300"
              aria-label="Wishlist Drawer"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-black font-semibold text-[9px] rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-white hover:text-gold transition-colors duration-300"
              aria-label="Shopping Drawer"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-black font-semibold text-[9px] rounded-full flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Profile */}
            <Link
              href="/dashboard"
              className="p-2 text-white hover:text-gold transition-colors duration-300"
              aria-label="User Dashboard"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </Link>

            {/* Admin Cog */}
            <Link
              href="/admin"
              className="p-2 text-white/50 hover:text-gold transition-colors duration-300 hidden md:block"
              aria-label="Admin Dashboard"
            >
              <Settings className="w-5 h-5 stroke-[1.5]" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-gold transition-colors duration-300 lg:hidden"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0B0B0B] flex flex-col pt-24 px-8 animate-fade-in lg:hidden">
          <nav className="flex flex-col gap-6 text-center mt-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-widest py-2 border-b border-white/5 hover:text-gold ${
                    isActive ? "text-gold font-semibold" : "text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-auto mb-12 flex flex-col gap-4">
            <Link
              href="/quiz"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest bg-gold text-black font-semibold py-3 rounded-md hover:bg-gold-light transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Interactive Scent Quiz
            </Link>
            
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest border border-white/20 text-white/70 py-3 rounded-md hover:bg-white/5 transition-all"
            >
              <Settings className="w-4 h-4" />
              Seller / Admin Panel
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
