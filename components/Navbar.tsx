"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, Mic, Paperclip } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((acc: number, item: any) => acc + item.qty, 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("cartUpdate", updateCount);
    return () => window.removeEventListener("cartUpdate", updateCount);
  }, []);

  // Search Logic: Query ko URL mein push karega
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      router.push(`/collection?search=${searchQuery}`);
    } else if (pathname === "/collection") {
      router.push("/collection");
    }
  }, [searchQuery, router, pathname]);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 z-[100] w-full border-b border-white/5 bg-black/40 backdrop-blur-xl px-6 md:px-12 py-5 flex justify-between items-center"
    >
      <Link href="/" className="flex items-center gap-2 group shrink-0">
        <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse group-hover:bg-white transition-colors" />
        <h1 className="text-xl font-bold tracking-[0.3em] text-white">LUMINA</h1>
      </Link>

      {/* Animated Search Container */}
      <div className="flex-1 flex justify-center px-4 max-w-2xl">
        <AnimatePresence mode="wait">
          {isSearchOpen ? (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="relative h-12 w-full flex items-center"
            >
              {/* Mesh Gradient Glowing Border Effect (Reference Match) */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-orange-400 rounded-2xl blur-md opacity-40 animate-pulse" />
              
              <div className="relative w-full h-full bg-black/80 backdrop-blur-2xl rounded-2xl border border-white/10 flex items-center px-4 gap-3">
                <Search size={16} className="text-zinc-500" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Provide complex widgets to improve..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-xs text-white placeholder:text-zinc-600 font-medium"
                />
                <div className="flex items-center gap-3 text-zinc-500">
                  <Paperclip size={14} className="hover:text-white cursor-pointer transition" />
                  <Mic size={14} className="hover:text-white cursor-pointer transition" />
                  <button onClick={() => {setIsSearchOpen(false); setSearchQuery("");}}>
                    <X size={16} className="text-white bg-white/10 rounded-full p-1 hover:bg-white/20" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-400">
              <Link href="/collection" className="hover:text-white transition-colors">Collection</Link>
              <Link href="/architectural" className="hover:text-white transition-colors">Architectural</Link>
              <Link href="/smart-tech" className="hover:text-white transition-colors">Smart Tech</Link>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6 shrink-0">
        {!isSearchOpen && (
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-zinc-400 hover:text-white transition p-1"
          >
            <Search size={18} />
          </button>
        )}
        
        <Link href="/cart" className="relative text-zinc-400 hover:text-white transition p-1">
          <ShoppingBag size={18} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-[9px] text-white h-4 w-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>
        
        <Link href="/auth/signin" className="hidden md:block">
          <button className="px-6 py-2 bg-white text-black text-[10px] font-bold rounded-full hover:bg-blue-600 hover:text-white transition-all">
            SIGN IN
          </button>
        </Link>
        <button className="md:hidden text-white p-1"><Menu size={24} /></button>
      </div>
    </motion.nav>
  );
}