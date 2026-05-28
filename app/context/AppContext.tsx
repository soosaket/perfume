"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  scentProfile: string;
  price: number;
  image: string;
  longevity: string;
  concentration: string;
  description: string;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  stock: number;
  rating: number;
  reviewsCount: number;
  sizes: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  concentration: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: "Pending" | "Shipped" | "In Transit" | "Delivered";
  timeline: { status: string; date: string; description: string; done: boolean }[];
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  replied: boolean;
  replyText?: string;
}

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  messages: ContactMessage[];
  subscribers: string[];
  coupon: string;
  discountPercent: number;
  applyCoupon: (code: string) => boolean;
  addToCart: (product: Product, quantity?: number, size?: string, concentration?: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  placeOrder: (shippingAddress: any, paymentMethod: string) => Order;
  submitContactMessage: (name: string, email: string, subject: string, message: string) => void;
  subscribeNewsletter: (email: string) => boolean;
  
  // Admin functions
  addNewProduct: (product: Omit<Product, "rating" | "reviewsCount">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: Order["status"], timelineUpdate?: string) => void;
  replyToMessage: (messageId: string, replyText: string) => void;
  sendSimulatedNewsletter: (subject: string, content: string) => { success: boolean; log: string[] };

  // Drawer states
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
}

const defaultProducts: Product[] = [
  {
    id: "oud-royal",
    name: "SWAVIK Oud Royal Fabric Perfume",
    category: "Middle Eastern",
    scentProfile: "Oriental Woody",
    price: 89,
    image: "/images/oud_royal.png",
    longevity: "Up to 5 Days",
    concentration: "70% Oil Concentration",
    description: "A rich, regal scent fusing high-concentration organic agarwood (oud), warm saffron, smoky incense, and dark musk. Engineered specifically to bind deeply with fabric fibers for a magnificent, slow-releasing aura that lingers on garments for days.",
    notes: {
      top: "Royal Saffron, Damask Rose",
      heart: "Cambodian Agarwood (Oud), Virginian Cedar",
      base: "Golden Amber, Rich Musk, Sandalwood"
    },
    stock: 12,
    rating: 4.9,
    reviewsCount: 142,
    sizes: ["50ml", "100ml"]
  },
  {
    id: "sandalwood-therapy",
    name: "SWAVIK Divine Sandalwood Therapy",
    category: "Organic & Therapy",
    scentProfile: "Warm Woody",
    price: 75,
    image: "/images/sandalwood_therapy.png",
    longevity: "Up to 3 Days",
    concentration: "65% Oil Concentration",
    description: "A calming organic botanical elixir crafted using 100% pure natural sandalwood essence, cooling rose water, and Indian vetiver. Inspired by ancient ubtan bathing rituals, designed to surround your attire in a pure, peaceful, meditative botanical envelope.",
    notes: {
      top: "Cardamom Pods, Rosewater",
      heart: "Pure Sandalwood, Vetiver Roots",
      base: "White Amber, Warm Cedarwood"
    },
    stock: 18,
    rating: 4.8,
    reviewsCount: 96,
    sizes: ["50ml", "100ml"]
  },
  {
    id: "gourmand-chocolate",
    name: "SWAVIK Gourmand Chocolate & Cream",
    category: "Gourmand",
    scentProfile: "Sweet Indulgent",
    price: 82,
    image: "/images/gourmand.png",
    longevity: "Up to 4 Days",
    concentration: "70% Oil Concentration",
    description: "An incredibly addictive, dessert-inspired luxury fabric mist. Features luxurious dark cocoa solids, rich Madagascar vanilla beans, caramelized white cream, and sweet honey. Leaves a delicious, irresistible dry down trail on wools, silks, and cottons.",
    notes: {
      top: "Raw Cocoa Powder, Vanilla Pod",
      heart: "Hot Caramel Swirl, Milk Cream Accord",
      base: "Wildflower Honey, Soft Amber"
    },
    stock: 15,
    rating: 4.95,
    reviewsCount: 218,
    sizes: ["50ml", "100ml"]
  },
  {
    id: "signature-paris",
    name: "SWAVIK Parisien Signature",
    category: "Signature",
    scentProfile: "Fresh Floral",
    price: 95,
    image: "/images/signature.png",
    longevity: "Up to 4 Days",
    concentration: "70% Oil Concentration",
    description: "A gorgeous, sophisticated floral combination designed to replicate a crisp Parisian balcony breeze. Fuses clean fresh laundry accords, sparkling Italian lemon, dew-kissed Damask roses, and a base of rich cashmere wood and warm amber tones.",
    notes: {
      top: "Clean Laundry Accord, Italian Lemon",
      heart: "Damask Rose Petals, Star Jasmine",
      base: "White Musk, Cashmere Wood, Warm Amber"
    },
    stock: 9,
    rating: 4.7,
    reviewsCount: 88,
    sizes: ["50ml", "100ml"]
  },
  {
    id: "royal-amber-attar",
    name: "SWAVIK Royal Amber Attar",
    category: "Middle Eastern",
    scentProfile: "Rich Amber",
    price: 99,
    image: "/images/oud_royal.png",
    longevity: "Up to 6 Days",
    concentration: "80% Oil Concentration",
    description: "Our highest concentration perfume extraction, featuring a pure organic attar structure. Deep amber glow mixed with intense smoke, balsamic wood resins, and organic musk for absolute royalty, deep fiber retention, and unmatched sillage projection.",
    notes: {
      top: "Warm Nutmeg, Frankincense",
      heart: "Crystalline Amber, Golden Patchouli",
      base: "Balsamic Resins, Oakmoss, Imperial Musk"
    },
    stock: 6,
    rating: 5.0,
    reviewsCount: 64,
    sizes: ["50ml"]
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<string[]>(["vip@swavik.com", "royalty@dubai.ae"]);
  const [coupon, setCoupon] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [wishlistOpen, setWishlistOpen] = useState<boolean>(false);

  // Load from localstorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("swavik_cart");
    const storedWishlist = localStorage.getItem("swavik_wishlist");
    const storedOrders = localStorage.getItem("swavik_orders");
    const storedMessages = localStorage.getItem("swavik_messages");
    const storedProducts = localStorage.getItem("swavik_products");
    const storedSubscribers = localStorage.getItem("swavik_subscribers");

    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    if (storedMessages) setMessages(JSON.parse(storedMessages));
    if (storedProducts) setProducts(JSON.parse(storedProducts));
    if (storedSubscribers) setSubscribers(JSON.parse(storedSubscribers));
  }, []);

  // Save triggers
  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const applyCoupon = (code: string) => {
    const normalized = code.toUpperCase().trim();
    if (normalized === "ROYALGOLD") {
      setCoupon(normalized);
      setDiscountPercent(15);
      return true;
    } else if (normalized === "FABRIC20") {
      setCoupon(normalized);
      setDiscountPercent(20);
      return true;
    }
    return false;
  };

  const addToCart = (product: Product, quantity = 1, size = "100ml", concentration = "70% Oil Concentration") => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.concentration === concentration
      );
      let updated;
      if (existingIndex > -1) {
        updated = [...prev];
        updated[existingIndex].quantity += quantity;
      } else {
        updated = [...prev, { product, quantity, size, concentration }];
      }
      saveToStorage("swavik_cart", updated);
      return updated;
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => !(item.product.id === productId && item.size === size));
      saveToStorage("swavik_cart", updated);
      return updated;
    });
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    setCart((prev) => {
      const updated = prev
        .map((item) =>
          item.product.id === productId && item.size === size ? { ...item, quantity: Math.max(1, quantity) } : item
        );
      saveToStorage("swavik_cart", updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCoupon("");
    setDiscountPercent(0);
    localStorage.removeItem("swavik_cart");
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const updated = prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId];
      saveToStorage("swavik_wishlist", updated);
      return updated;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const placeOrder = (shippingAddress: any, paymentMethod: string) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discount = subtotal * (discountPercent / 100);
    const shipping = subtotal > 150 ? 0 : 15;
    const total = subtotal - discount + shipping;
    
    const newOrder: Order = {
      id: "SWK-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      items: [...cart],
      subtotal,
      discount,
      shipping,
      total,
      status: "Pending",
      paymentMethod,
      shippingAddress,
      timeline: [
        { status: "Ordered & Confirmed", date: new Date().toLocaleTimeString(), description: "Your luxury perfume showroom invoice is generated and processed.", done: true },
        { status: "Olfactory Craft Preparation", date: "", description: "Bottling, secure sealing, and organic fabric casing wrapping.", done: false },
        { status: "Dispatched", date: "", description: "Handed over to our premium specialized carrier partners.", done: false },
        { status: "Delivered", date: "", description: "Arrived at your designated royal residency.", done: false }
      ]
    };

    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      saveToStorage("swavik_orders", updated);
      return updated;
    });

    clearCart();
    return newOrder;
  };

  const submitContactMessage = (name: string, email: string, subject: string, message: string) => {
    const newMessage: ContactMessage = {
      id: "MSG-" + Math.floor(10000 + Math.random() * 90000),
      name,
      email,
      subject,
      message,
      date: new Date().toLocaleString(),
      replied: false
    };

    setMessages((prev) => {
      const updated = [newMessage, ...prev];
      saveToStorage("swavik_messages", updated);
      return updated;
    });
  };

  const subscribeNewsletter = (email: string) => {
    const normalized = email.toLowerCase().trim();
    if (!subscribers.includes(normalized)) {
      setSubscribers((prev) => {
        const updated = [...prev, normalized];
        saveToStorage("swavik_subscribers", updated);
        return updated;
      });
      return true;
    }
    return false;
  };

  // Admin Controls
  const addNewProduct = (product: Omit<Product, "rating" | "reviewsCount">) => {
    const fullProduct: Product = {
      ...product,
      rating: 4.8,
      reviewsCount: 1
    };
    setProducts((prev) => {
      const updated = [...prev, fullProduct];
      saveToStorage("swavik_products", updated);
      return updated;
    });
  };

  const updateProduct = (updatedProd: Product) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === updatedProd.id ? updatedProd : p));
      saveToStorage("swavik_products", updated);
      return updated;
    });
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      saveToStorage("swavik_products", updated);
      return updated;
    });
  };

  const updateOrderStatus = (orderId: string, status: Order["status"], timelineUpdate?: string) => {
    setOrders((prev) => {
      const updated = prev.map((order) => {
        if (order.id !== orderId) return order;
        
        const nextTimeline = [...order.timeline];
        if (status === "Shipped") {
          nextTimeline[1].done = true;
          nextTimeline[1].date = new Date().toLocaleTimeString();
        } else if (status === "In Transit") {
          nextTimeline[1].done = true;
          nextTimeline[2].done = true;
          nextTimeline[2].date = new Date().toLocaleTimeString();
        } else if (status === "Delivered") {
          nextTimeline[1].done = true;
          nextTimeline[2].done = true;
          nextTimeline[3].done = true;
          nextTimeline[3].date = new Date().toLocaleTimeString();
        }
        
        if (timelineUpdate) {
          nextTimeline.push({
            status: "Update",
            date: new Date().toLocaleTimeString(),
            description: timelineUpdate,
            done: true
          });
        }

        return {
          ...order,
          status,
          timeline: nextTimeline
        };
      });
      saveToStorage("swavik_orders", updated);
      return updated;
    });
  };

  const replyToMessage = (messageId: string, replyText: string) => {
    setMessages((prev) => {
      const updated = prev.map((msg) =>
        msg.id === messageId ? { ...msg, replied: true, replyText } : msg
      );
      saveToStorage("swavik_messages", updated);
      return updated;
    });
  };

  const sendSimulatedNewsletter = (subject: string, content: string) => {
    const log: string[] = [];
    log.push(`[${new Date().toLocaleTimeString()}] Authenticating with SWAVIK SMTP Node Server...`);
    log.push(`[${new Date().toLocaleTimeString()}] Secure TLS handshake established (Port 465).`);
    log.push(`[${new Date().toLocaleTimeString()}] Accessing list of active royal scent members (${subscribers.length} total).`);
    
    subscribers.forEach((email) => {
      log.push(`[${new Date().toLocaleTimeString()}] Success: Email successfully dispatched to ${email}`);
    });
    
    log.push(`[${new Date().toLocaleTimeString()}] SMTP Connection closed cleanly. All messages delivered.`);
    return { success: true, log };
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        messages,
        subscribers,
        coupon,
        discountPercent,
        applyCoupon,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        submitContactMessage,
        subscribeNewsletter,
        addNewProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        replyToMessage,
        sendSimulatedNewsletter,
        cartOpen,
        setCartOpen,
        wishlistOpen,
        setWishlistOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
