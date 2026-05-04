"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader";
import { Mail, MapPin, Phone, Globe, ChevronRight, Layout, ArrowUpRight } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const products = [
    { id: "aura-pendant", title: "Aura Pendant Light", price: "18,500", size: "large", image: "/images/products/Aura Pendant by Et2 _ E21172-PC _ ET2362737.jpg" },
    { id: "nova-desk", title: "Nova Desk", price: "4,200", size: "small", image: "/images/products/download (19).jpg" },
    { id: "eclipse-wall", title: "Eclipse Wall", price: "7,800", size: "small", image: "/images/products/Eclipse Wall Light.jpg" },
    { id: "zenith-floor", title: "Zenith Architectural", price: "22,000", size: "large", image: "/images/products/download (20).jpg" },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader finishLoading={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Navbar />
          <Hero />
          
          {/* Main Content Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-6 py-20">
            {/* Header with Mobile Optimizations */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
              <div className="max-w-xl">
                <motion.span 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="text-blue-500 font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block"
                >
                  Indore Signature Series
                </motion.span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase italic">
                  Light <span className="text-blue-500">Refined.</span>
                </h2>
                <p className="text-zinc-500 mt-4 text-xs md:text-sm font-medium uppercase tracking-widest leading-relaxed">
                  Engineered for excellence. Redefining modern interiors through intelligent lighting.
                </p>
              </div>
              <Link href="/collection" className="w-full md:w-auto">
                <button className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl">
                  Explore Gallery <ArrowUpRight size={14} />
                </button>
              </Link>
            </div>
            
            {/* Bento Grid - Responsive 2 columns on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {products.map((p) => (
                <div key={p.id} className={p.size === "large" ? "col-span-2" : "col-span-1"}>
                  <ProductCard {...p} price={`₹${p.price}`} />
                </div>
              ))}
            </div>
          </section>

          {/* --- MOBILE FRIENDLY FOOTER --- */}
          <footer className="border-t border-white/5 bg-[#050505] mt-20 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16">
                
                {/* Brand */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-blue-600 rounded-full animate-pulse" />
                    <span className="text-lg font-black tracking-[0.3em] uppercase">Lumina</span>
                  </div>
                  <p className="text-zinc-600 text-[10px] leading-relaxed font-bold uppercase tracking-widest">
                    Indore's leading architectural lighting consultant. Redefining atmosphere since 2015.
                  </p>
                </div>

                {/* Directory - Simplified for Mobile */}
                <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-4">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">Explore</h4>
                    <ul className="space-y-3 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                      <li><Link href="/collection" className="hover:text-white">Gallery</Link></li>
                      <li><Link href="/about" className="hover:text-white">Our Story</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">Social</h4>
                    <ul className="space-y-3 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                      <li><a href="#" className="hover:text-white">Instagram</a></li>
                      <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                    </ul>
                  </div>
                </div>

                {/* Logistics */}
                <div className="md:col-span-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">Contact Logistics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-3"><Mail size={12} className="text-blue-500" /> info@lumina.os</div>
                    <div className="flex items-center gap-3"><Phone size={12} className="text-blue-500" /> +91 97133-42226</div>
                    <div className="flex items-start gap-3 md:col-span-2 leading-loose">
                      <MapPin size={12} className="text-blue-500 shrink-0" /> 
                      Vijay Nagar, Indore, MP 452010
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Footer */}
              <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-700 text-center md:text-left">
                  Lumina Dashboard OS © 2026 • Indore, India
                </p>
                <div className="flex gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-800">
                  <button className="hover:text-blue-500">Privacy</button>
                  <button className="hover:text-blue-500">Terms</button>
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </main>
  );
}