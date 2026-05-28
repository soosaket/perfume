"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp, Product, Order } from "@/app/context/AppContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import WishlistDrawer from "@/app/components/WishlistDrawer";
import SoundPlayer, { playGlobalSpraySound } from "@/app/components/SoundPlayer";
import { Sparkles, BarChart3, Package, Settings, Plus, Edit2, Trash2, Send, Mail, MessageSquare, PlusCircle, Check } from "lucide-react";

export default function AdminDashboard() {
  const {
    products,
    orders,
    messages,
    subscribers,
    addNewProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    replyToMessage,
    sendSimulatedNewsletter
  } = useApp();

  // Tab State: "overview" | "products" | "orders" | "messages" | "newsletter"
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Live CRUD Editor dialog states
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Omit<Product, "rating" | "reviewsCount">>({
    id: "",
    name: "",
    category: "Middle Eastern",
    scentProfile: "",
    price: 0,
    image: "/images/oud_royal.png",
    longevity: "Up to 4 Days",
    concentration: "70% Oil Concentration",
    description: "",
    notes: { top: "", heart: "", base: "" },
    stock: 10,
    sizes: ["100ml"]
  });

  // Newsletter Form State
  const [newsletterSubject, setNewsletterSubject] = useState("");
  const [newsletterContent, setNewsletterContent] = useState("");
  const [newsletterLogs, setNewsletterLogs] = useState<string[]>([]);
  const [sendingNewsletter, setSendingNewsletter] = useState(false);
  const [newsletterFinished, setNewsletterFinished] = useState(false);

  // Message reply State
  const [activeReplyMessageId, setActiveReplyMessageId] = useState<string | null>(null);
  const [replyTextInput, setReplyTextInput] = useState("");

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProductForm({
      id: "scent-" + Math.floor(1000 + Math.random() * 9000),
      name: "",
      category: "Middle Eastern",
      scentProfile: "",
      price: 85,
      image: "/images/oud_royal.png",
      longevity: "Up to 4 Days",
      concentration: "70% Oil Concentration",
      description: "",
      notes: { top: "Saffron", heart: "Rose", base: "Amber" },
      stock: 15,
      sizes: ["50ml", "100ml"]
    });
    setShowEditorModal(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      id: product.id,
      name: product.name,
      category: product.category,
      scentProfile: product.scentProfile,
      price: product.price,
      image: product.image,
      longevity: product.longevity,
      concentration: product.concentration,
      description: product.description,
      notes: { ...product.notes },
      stock: product.stock,
      sizes: [...product.sizes]
    });
    setShowEditorModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    playGlobalSpraySound();
    
    if (editingProduct) {
      // Update
      const fullProd: Product = {
        ...productForm,
        rating: editingProduct.rating,
        reviewsCount: editingProduct.reviewsCount
      };
      updateProduct(fullProd);
    } else {
      // Create
      addNewProduct(productForm);
    }

    setShowEditorModal(false);
  };

  const handleDeleteProduct = (id: string) => {
    playGlobalSpraySound();
    if (confirm("Are you sure you want to permanently delete this artisanal scent reserve from catalog?")) {
      deleteProduct(id);
    }
  };

  const handleOrderStatusShift = (orderId: string, currentStatus: string) => {
    playGlobalSpraySound();
    let nextStatus: Order["status"] = "Pending";
    if (currentStatus === "Pending") nextStatus = "Shipped";
    else if (currentStatus === "Shipped") nextStatus = "In Transit";
    else if (currentStatus === "In Transit") nextStatus = "Delivered";
    else return;

    updateOrderStatus(orderId, nextStatus, `Artisanal status updated by seller manager to ${nextStatus}.`);
  };

  const handleReplySubmit = (e: React.FormEvent, msgId: string) => {
    e.preventDefault();
    if (!replyTextInput.trim()) return;

    playGlobalSpraySound();
    replyToMessage(msgId, replyTextInput);
    setActiveReplyMessageId(null);
    setReplyTextInput("");
  };

  const handleLaunchNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterSubject || !newsletterContent) return;

    playGlobalSpraySound();
    setSendingNewsletter(true);
    setNewsletterFinished(false);
    setNewsletterLogs([]);

    const result = sendSimulatedNewsletter(newsletterSubject, newsletterContent);
    
    // Slow print console logs
    for (let i = 0; i < result.log.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setNewsletterLogs((prev) => [...prev, result.log[i]]);
    }

    setSendingNewsletter(false);
    setNewsletterFinished(true);
    setNewsletterSubject("");
    setNewsletterContent("");
  };

  // Math totals for SaaS charts
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const formattedRevenue = totalRevenue.toFixed(2);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
      <SoundPlayer />
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />

      <main className="flex-1 max-w-7xl mx-auto px-6 w-full pt-32 pb-24">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-white/5 pb-6">
          <div className="text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Seller Portal</span>
            <h1 className="font-serif text-3xl md:text-4xl text-white uppercase tracking-widest mt-2 flex items-center justify-center md:justify-start gap-3">
              <Settings className="w-8 h-8 text-gold animate-spin-slow" />
              SWAVIK SAAS CONSOLE
            </h1>
          </div>

          {/* Navigation Tab Caps */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "products", label: "Scent CRUD", icon: PlusCircle },
              { id: "orders", label: "Order Hub", icon: Package },
              { id: "messages", label: "Inbox Messages", icon: MessageSquare },
              { id: "newsletter", label: "SMTP Broadcasts", icon: Mail }
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playGlobalSpraySound();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-gold border-gold text-black shadow-lg"
                      : "bg-transparent text-white/50 border-white/10 hover:border-gold hover:text-gold"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-12 animate-fade-in">
            {/* Metric Blocks */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Revenue", metric: `$${formattedRevenue}`, subtext: "Live cash pool settled", points: "M 0 30 Q 15 15, 30 25 T 60 5 T 90 20" },
                { title: "Active Orders", metric: orders.length, subtext: "Awaiting transit tracking", points: "M 0 30 Q 15 5, 30 10 T 60 20 T 90 5" },
                { title: "Subscribers", metric: subscribers.length, subtext: "Royal scent members pool", points: "M 0 30 Q 15 25, 30 15 T 60 5 T 90 2" },
                { title: "Scent Inquiries", metric: messages.length, subtext: "Showroom visitor emails", points: "M 0 20 Q 15 20, 30 20 T 60 20 T 90 20" }
              ].map((card, i) => (
                <div key={i} className="bg-[#121212]/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-36">
                  <div>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold block">{card.title}</span>
                    <span className="font-serif text-2xl lg:text-3xl font-extrabold text-gold mt-2 block leading-none">{card.metric}</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[9px] text-white/30 truncate pr-4">{card.subtext}</span>
                    {/* Tiny animated SVG charts */}
                    <svg className="w-16 h-8 text-gold stroke-current fill-none stroke-2 overflow-visible">
                      <path d={card.points} />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick action banners */}
            <div className="bg-gold/5 border border-gold/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_20px_rgba(212,175,55,0.05)]">
              <div>
                <h4 className="font-serif text-lg text-white uppercase tracking-wider">Catalog Exclusivity Status</h4>
                <p className="text-xs text-white/50 mt-1 max-w-lg leading-relaxed">
                  Currently running {products.length} artisanal reserves on the catalog. Ready to add, modify, or test new olfactory extractions? Head to Scent CRUD.
                </p>
              </div>
              <button
                onClick={() => {
                  playGlobalSpraySound();
                  setActiveTab("products");
                }}
                className="px-6 py-3 bg-gold hover:bg-gold-light text-black text-xs uppercase font-bold tracking-widest rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                Go Manage Catalog
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE CRUD PRODUCTS */}
        {activeTab === "products" && (
          <div className="flex flex-col gap-8 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="font-serif text-lg uppercase tracking-widest text-white">Artisanal Catalog Reserves</h3>
              <button
                onClick={handleOpenAdd}
                className="flex items-center gap-1.5 bg-gold hover:bg-gold-light text-black text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add New Scent
              </button>
            </div>

            {/* Products CRUD Table */}
            <div className="bg-[#121212]/40 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/5 bg-black/40 text-[9px] uppercase tracking-widest text-white/40">
                    <th className="p-4">Visual Scent</th>
                    <th className="p-4">Artisanal Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Oils Concentration</th>
                    <th className="p-4">Showroom Price</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-all">
                      <td className="p-4">
                        <div className="relative w-10 h-10 bg-black/60 rounded border border-white/10 overflow-hidden flex items-center justify-center">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                      </td>
                      <td className="p-4 font-bold text-white uppercase tracking-wider">{product.name}</td>
                      <td className="p-4 text-white/60">{product.category}</td>
                      <td className="p-4 text-gold font-medium">{product.concentration}</td>
                      <td className="p-4 font-bold text-white">${product.price}</td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-2 border border-white/10 hover:border-gold hover:text-gold rounded text-white/60 transition-colors"
                          title="Edit Scent"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 border border-white/10 hover:border-red-500 hover:text-red-500 rounded text-white/60 transition-colors"
                          title="Delete Scent"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDER HUB */}
        {activeTab === "orders" && (
          <div className="flex flex-col gap-8 animate-fade-in">
            <h3 className="font-serif text-lg uppercase tracking-widest text-white border-b border-white/5 pb-4">
              Showroom Transit Control
            </h3>

            {orders.length === 0 ? (
              <div className="text-center py-20 text-white/30 border border-white/5 rounded-2xl bg-[#121212]/20">
                <Package className="w-8 h-8 stroke-[1.2] text-gold mx-auto mb-2" />
                <p className="text-xs">No active royal orders processed yet.</p>
              </div>
            ) : (
              <div className="bg-[#121212]/40 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/5 bg-black/40 text-[9px] uppercase tracking-widest text-white/40">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Date Placed</th>
                      <th className="p-4">Consignee Name</th>
                      <th className="p-4">Billing Total</th>
                      <th className="p-4">Transit Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-all">
                        <td className="p-4 font-mono font-bold text-gold">{order.id}</td>
                        <td className="p-4 text-white/60">{order.date}</td>
                        <td className="p-4 text-white font-medium">{order.shippingAddress.fullName}</td>
                        <td className="p-4 font-bold text-white">${order.total.toFixed(2)}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-widest font-bold border ${
                            order.status === "Delivered"
                              ? "bg-green-500/10 border-green-500/30 text-green-400"
                              : "bg-gold/15 border-gold/40 text-gold animate-pulse"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          {order.status !== "Delivered" ? (
                            <button
                              onClick={() => handleOrderStatusShift(order.id, order.status)}
                              className="px-3 py-1.5 bg-gold hover:bg-gold-light text-black text-[10px] uppercase font-bold tracking-wider rounded transition-colors cursor-pointer"
                            >
                              Shift Status &rarr;
                            </button>
                          ) : (
                            <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider flex items-center justify-end gap-1">
                              <Check className="w-3.5 h-3.5" />
                              Settled
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CONCIERGE SHOWROOM INBOX */}
        {activeTab === "messages" && (
          <div className="flex flex-col gap-8 animate-fade-in">
            <h3 className="font-serif text-lg uppercase tracking-widest text-white border-b border-white/5 pb-4">
              Boutique Scent Inquiries
            </h3>

            {messages.length === 0 ? (
              <div className="text-center py-20 text-white/30 border border-white/5 rounded-2xl bg-[#121212]/20">
                <MessageSquare className="w-8 h-8 stroke-[1.2] text-gold mx-auto mb-2" />
                <p className="text-xs">No guest messages recorded yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-[#121212]/40 border border-white/5 hover:border-gold/25 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-3 text-xs text-white/50">
                      <div>
                        <span className="font-bold text-white uppercase tracking-wider">{msg.name}</span>
                        <span className="ml-1">&bull; {msg.email}</span>
                      </div>
                      <span className="text-[9px] font-mono">{msg.date}</span>
                    </div>

                    <div>
                      <p className="text-xs text-gold font-bold uppercase tracking-wider">Subject: {msg.subject || "No Subject"}</p>
                      <p className="text-xs leading-relaxed text-white/70 mt-2 font-light">{msg.message}</p>
                    </div>

                    {msg.replied ? (
                      <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 text-xs text-white/80">
                        <span className="text-[9px] uppercase text-gold font-bold block mb-1">Your Concierge Reply:</span>
                        <p className="italic font-light">“{msg.replyText}”</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 mt-2">
                        {activeReplyMessageId === msg.id ? (
                          <form onSubmit={(e) => handleReplySubmit(e, msg.id)} className="flex flex-col gap-2">
                            <textarea
                              value={replyTextInput}
                              onChange={(e) => setReplyTextInput(e.target.value)}
                              required
                              rows={3}
                              placeholder="Type your official showroom response..."
                              className="bg-black/60 border border-gold/30 rounded-md p-3 text-xs outline-none text-white resize-none"
                            />
                            <div className="flex gap-2 justify-end">
                              <button
                                type="button"
                                onClick={() => setActiveReplyMessageId(null)}
                                className="px-3 py-1.5 border border-white/10 hover:border-white text-white/60 text-[10px] uppercase font-bold rounded"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-1.5 bg-gold hover:bg-gold-light text-black text-[10px] uppercase font-bold rounded flex items-center gap-1 cursor-pointer"
                              >
                                <Send className="w-3 h-3" />
                                Send Reply
                              </button>
                            </div>
                          </form>
                        ) : (
                          <button
                            onClick={() => setActiveReplyMessageId(msg.id)}
                            className="px-4 py-2 border border-gold/30 hover:border-gold text-gold hover:text-black hover:bg-gold text-[10px] uppercase font-bold tracking-wider rounded transition-all self-start cursor-pointer"
                          >
                            Reply to Message
                          </button>
                        )}
                      </div>
                    )}

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: SMTP NEWSLETTER BLAST CAMPAIGN */}
        {activeTab === "newsletter" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start max-w-5xl mx-auto animate-fade-in">
            {/* Compositor form (3 cols) */}
            <form onSubmit={handleLaunchNewsletter} className="lg:col-span-3 bg-[#121212]/40 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-xl">
              <h3 className="font-serif text-lg uppercase tracking-widest text-white mb-2 flex items-center gap-2">
                <Mail className="w-5 h-5 text-gold" />
                SMTP Newsletter Blast
              </h3>
              <p className="text-xs text-white/50 leading-relaxed font-light mb-2">
                Draft a beautiful email broadcast. When launched, Nodemailer relays the HTML content securely to all **{subscribers.length}** registered royal scent list members.
              </p>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Campaign Subject</label>
                <input
                  type="text"
                  value={newsletterSubject}
                  onChange={(e) => setNewsletterSubject(e.target.value)}
                  required
                  placeholder="Artisanal Oud Pre-orders / Private Sandalwood Launches..."
                  className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-4 text-xs outline-none text-white placeholder:text-white/20"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Email HTML/Content Body</label>
                <textarea
                  value={newsletterContent}
                  onChange={(e) => setNewsletterContent(e.target.value)}
                  required
                  rows={6}
                  placeholder="Write editorial marketing text detailing our new organic distillation releases..."
                  className="bg-black/60 border border-white/10 focus:border-gold/50 rounded-md py-2.5 px-4 text-xs outline-none text-white placeholder:text-white/20 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sendingNewsletter}
                className="mt-2 w-full py-4 bg-gold hover:bg-gold-light disabled:bg-gold/30 text-black font-bold uppercase tracking-widest text-xs rounded-md transition-colors btn-luxury flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                {sendingNewsletter ? "Executing Handshake..." : "Broadcast Newsletter Blast"}
              </button>
            </form>

            {/* Live console visual log Relay (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <h4 className="font-serif text-xs uppercase tracking-widest text-gold font-bold">
                SMTP Live Protocol console
              </h4>

              <div className="bg-[#050505] rounded-2xl border border-gold/20 p-5 font-mono text-[9px] text-green-400 h-[300px] overflow-y-auto shadow-2xl">
                {newsletterLogs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-white/20 gap-1.5">
                    <Mail className="w-8 h-8 stroke-[1.2] text-gold" />
                    <p>Awaiting broadcast email trigger...</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {newsletterLogs.map((log, index) => (
                      <div key={index} className="leading-relaxed animate-fade-in break-all">
                        <span className="text-white/30">[{index + 1}]</span> {log}
                      </div>
                    ))}
                    {sendingNewsletter && (
                      <div className="animate-pulse text-gold">Relaying broadcast mail packets...</div>
                    )}
                    {newsletterFinished && (
                      <div className="text-gold font-bold uppercase tracking-wider mt-3">
                        ✓ RELAY COMPLETE. PRIVATE EMAILS DELIVERED.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* CRUD MODAL FORM DIALOG */}
      {showEditorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowEditorModal(false)} />
          
          <form
            onSubmit={handleSaveProduct}
            className="bg-[#101010] border border-gold/30 rounded-2xl p-6 md:p-8 max-w-xl w-full h-[550px] overflow-y-auto relative z-10 flex flex-col gap-4 shadow-2xl animate-fade-in"
          >
            <h3 className="font-serif text-lg uppercase tracking-widest text-gold font-bold mb-2">
              {editingProduct ? "Edit Artisanal Scent" : "Add Scent Reserve"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Scent Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  required
                  placeholder="SWAVIK Midnight Rose"
                  className="bg-black border border-white/10 rounded-md py-2 px-3 text-xs outline-none text-white focus:border-gold/50"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Category</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="bg-black border border-white/10 rounded-md py-2 px-3 text-xs outline-none text-white cursor-pointer focus:border-gold/50"
                >
                  <option value="Middle Eastern">Middle Eastern</option>
                  <option value="Gourmand">Gourmand</option>
                  <option value="Signature">Signature</option>
                  <option value="Organic & Therapy">Organic & Therapy</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Olfactory Profile</label>
                <input
                  type="text"
                  value={productForm.scentProfile}
                  onChange={(e) => setProductForm({ ...productForm, scentProfile: e.target.value })}
                  required
                  placeholder="Amber Floral"
                  className="bg-black border border-white/10 rounded-md py-2 px-3 text-xs outline-none text-white focus:border-gold/50"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Showroom Price ($)</label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                  required
                  placeholder="85"
                  className="bg-black border border-white/10 rounded-md py-2 px-3 text-xs outline-none text-white focus:border-gold/50"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Oils Concentration</label>
                <input
                  type="text"
                  value={productForm.concentration}
                  onChange={(e) => setProductForm({ ...productForm, concentration: e.target.value })}
                  required
                  placeholder="70% Oil Concentration"
                  className="bg-black border border-white/10 rounded-md py-2 px-3 text-xs outline-none text-white focus:border-gold/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Longevity Descriptor</label>
                <input
                  type="text"
                  value={productForm.longevity}
                  onChange={(e) => setProductForm({ ...productForm, longevity: e.target.value })}
                  required
                  placeholder="Up to 4 Days"
                  className="bg-black border border-white/10 rounded-md py-2 px-3 text-xs outline-none text-white focus:border-gold/50"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Showroom Stock Qty</label>
                <input
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                  required
                  placeholder="15"
                  className="bg-black border border-white/10 rounded-md py-2 px-3 text-xs outline-none text-white focus:border-gold/50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Scent Image Path</label>
              <input
                type="text"
                value={productForm.image}
                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                required
                placeholder="/images/oud_royal.png"
                className="bg-black border border-white/10 rounded-md py-2 px-3 text-xs outline-none text-white focus:border-gold/50 font-mono"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase tracking-widest text-white/50 font-bold">Poetic Description</label>
              <textarea
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                required
                rows={2}
                placeholder="poetic copy explaining fiber retention notes..."
                className="bg-black border border-white/10 rounded-md py-2 px-3 text-xs outline-none text-white resize-none focus:border-gold/50"
              />
            </div>

            {/* Note Pyramids CRUD */}
            <div className="bg-black/60 rounded p-4 border border-white/5 flex flex-col gap-3">
              <span className="text-[9px] uppercase text-gold font-bold">Scent Pyramid notes</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] uppercase tracking-widest text-white/40 font-bold">Top Layer</label>
                  <input
                    type="text"
                    value={productForm.notes.top}
                    onChange={(e) => setProductForm({
                      ...productForm,
                      notes: { ...productForm.notes, top: e.target.value }
                    })}
                    required
                    placeholder="Saffron, Rose"
                    className="bg-black border border-white/10 rounded-md py-1.5 px-2.5 text-xs outline-none text-white focus:border-gold/50"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] uppercase tracking-widest text-white/40 font-bold">Heart Layer</label>
                  <input
                    type="text"
                    value={productForm.notes.heart}
                    onChange={(e) => setProductForm({
                      ...productForm,
                      notes: { ...productForm.notes, heart: e.target.value }
                    })}
                    required
                    placeholder="Cambodian Oud"
                    className="bg-black border border-white/10 rounded-md py-1.5 px-2.5 text-xs outline-none text-white focus:border-gold/50"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] uppercase tracking-widest text-white/40 font-bold">Base Layer</label>
                  <input
                    type="text"
                    value={productForm.notes.base}
                    onChange={(e) => setProductForm({
                      ...productForm,
                      notes: { ...productForm.notes, base: e.target.value }
                    })}
                    required
                    placeholder="Amber, Musk"
                    className="bg-black border border-white/10 rounded-md py-1.5 px-2.5 text-xs outline-none text-white focus:border-gold/50"
                  />
                </div>
              </div>
            </div>

            {/* Actions modal */}
            <div className="flex gap-2 justify-end mt-2 pt-3 border-t border-white/5">
              <button
                type="button"
                onClick={() => setShowEditorModal(false)}
                className="px-4 py-2 border border-white/10 hover:border-white text-white/60 text-xs uppercase font-bold rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gold hover:bg-gold-light text-black text-xs uppercase font-bold rounded cursor-pointer"
              >
                Save Scent Reserve
              </button>
            </div>

          </form>
        </div>
      )}

      <Footer />
    </div>
  );
}
