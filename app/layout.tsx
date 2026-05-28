import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/app/context/AppContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SWAVIK Fabric Perfumes | Elite Luxury Showroom & E-Commerce",
  description: "Experience the world's first premium fabric perfume showroom. 70% oil concentration engineered for deep fiber retention and eternal elegant projection. Middle Eastern elegance blended with French luxury craftsmanship.",
  keywords: ["fabric perfume", "luxury fragrance", "SWAVIK", "oud fabric spray", "sandalwood therapy", "gourmand collection"],
  authors: [{ name: "SWAVIK Royal Perfumers" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0B0B] text-white selection:bg-[#D4AF37] selection:text-black">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

