"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, ChevronRight, Mic, Globe, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((acc: number, item: any) => acc + item.qty, 0));
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("cartUpdate", updateCount);
    return () => window.removeEventListener("cartUpdate", updateCount);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collection?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-[100] w-full border-b border-white/5 bg-black/40 backdrop-blur-xl px-4 md:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-2 w-2 bg-blue-500 rounded-full" />
          <h1 className="text-sm md:text-xl font-bold tracking-[0.3em] text-white uppercase">Lumina</h1>
        </Link>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <button onClick={() => setIsSearchOpen(true)} className="text-zinc-400 hover:text-white transition-colors p-1">
            <Search size={18} />
          </button>
          
          <Link href="/cart" className="relative text-zinc-400 hover:text-white transition-colors p-1">
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-[8px] h-3.5 w-3.5 rounded-full flex items-center justify-center font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white bg-white/5 p-2 rounded-lg">
            <Menu size={20} />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/collection" className="hover:text-white transition-colors">Collection</Link>
            <Link href="/cart" className="hover:text-white transition-colors">Cart</Link>
          </div>
        </div>
      </nav>

      {/* Futuristic AI Search Bar Look */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 w-full h-24 bg-black/90 backdrop-blur-2xl z-[150] px-6 flex items-center justify-center border-b border-white/10"
          >
            <div className="relative w-full max-w-2xl group">
              {/* Glowing Gradient Border Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
              
              <div className="relative bg-[#0a0a0a] rounded-2xl border border-white/10 flex items-center px-4 h-14 gap-3 shadow-2xl">
                <Globe size={16} className="text-blue-500 hidden md:block" />
                
                <form onSubmit={handleSearch} className="flex-1 flex items-center gap-3">
                  <input 
                    autoFocus
                    type="text"
                    placeholder="Search designs..."
                    className="w-full bg-transparent text-white text-sm outline-none placeholder:text-zinc-600 font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  
                  <div className="flex items-center gap-3 border-l border-white/10 pl-3">
                    <Mic size={14} className="text-zinc-500 hover:text-white cursor-pointer" />
                    <button type="submit" className="text-blue-500 hover:text-white transition-colors">
                       <Send size={16} />
                    </button>
                  </div>
                </form>

                <button onClick={() => {setIsSearchOpen(false); setSearchQuery("");}} className="ml-2 pl-2 border-l border-white/10 text-zinc-500 hover:text-red-500">
                  <X size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[200] bg-black flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-600 uppercase italic">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="bg-white/10 p-3 rounded-full text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6">
              {[
                { name: "Home", path: "/" },
                { name: "Collection", path: "/collection" },
                { name: "Cart", path: "/cart" }
              ].map((item) => (
                <Link 
                  key={item.name} 
                  href={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-bold tracking-tighter text-white flex justify-between items-center uppercase italic"
                >
                  {item.name} <ChevronRight size={24} className="text-blue-500" />
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/5">
              <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest italic">
                Indore Signature Series
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}