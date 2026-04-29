"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader";
// Sirf wahi icons import kiye hain jo 100% stable hain
import { Mail, MapPin, Phone, Globe, ChevronRight, Layout } from "lucide-react";

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
    <main className="min-h-screen bg-[#0d0f14]">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader finishLoading={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Navbar />
          <Hero />
          
          <section className="max-w-7xl mx-auto px-6 py-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Make Things <span className="text-blue-500">Simple!</span></h2>
                <p className="text-zinc-500 max-w-md text-sm leading-relaxed font-medium uppercase tracking-widest text-[10px]">Indore's finest selection of architectural lighting solutions.</p>
              </div>
              <Link href="/collection">
                <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all text-white flex items-center gap-2">
                   Launch Gallery <ChevronRight size={14} />
                </button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className={p.size === "large" ? "md:col-span-2" : "md:col-span-1"}>
                  <ProductCard {...p} price={`₹${p.price}`} />
                </div>
              ))}
            </div>
          </section>

          {/* --- FINAL CLEAN DASHBOARD FOOTER --- */}
          <footer className="border-t border-white/5 bg-[#0a0c10] mt-20 pt-24 pb-12 text-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                
                {/* Brand Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-blue-600 rounded-lg flex items-center justify-center">
                       <Layout size={12} className="text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-[0.2em] uppercase">Lumina</span>
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                    Architectural lighting systems engineered for modern interiors. Redefining the atmosphere through intelligence.
                  </p>
                </div>

                {/* Directory */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-8">Directory</h4>
                  <ul className="space-y-4 text-zinc-400 text-xs font-semibold">
                    <li><Link href="/collection" className="hover:text-white transition-colors">Project Gallery</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Lighting Assets</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">System Logs</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Studio</Link></li>
                  </ul>
                </div>

                {/* Logistics */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-8">Logistics</h4>
                  <ul className="space-y-4 text-zinc-400 text-xs font-semibold">
                    <li className="flex items-center gap-3"><Mail size={14} /> info@lumina.os</li>
                    <li className="flex items-center gap-3"><Phone size={14} /> +91 731 400 000</li>
                    <li className="flex items-start gap-3"><MapPin size={14} /> Vijay Nagar, Indore, <br />MP 452010</li>
                  </ul>
                </div>

                {/* Social Hub - Problematic icons replaced with Text-links */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-8">Social Hub</h4>
                  <div className="flex flex-col gap-4">
                    <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-2">
                       <Globe size={14} /> Global Network
                    </a>
                    <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-2">
                       <Layout size={14} /> Digital Portfolio
                    </a>
                  </div>
                </div>
              </div>

              {/* Legal Footer */}
              <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-700">
                  <span>Lumina Dashboard OS © 2026</span>
                  <span className="hidden md:block">•</span>
                  <span>Build v4.2.0</span>
                </div>
                <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                  <button className="hover:text-blue-500 transition-colors">Privacy Protocol</button>
                  <button className="hover:text-blue-500 transition-colors">Terms of Use</button>
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </main>
  );
}