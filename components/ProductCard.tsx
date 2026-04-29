"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, ArrowUpRight } from "lucide-react";

export default function ProductCard({ id, title, price, image }: any) {
  const [isFlying, setIsFlying] = useState(false);
  const slug = id || title.toLowerCase().replace(/\s+/g, '-');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // 1. Purana Animation Trigger
    setIsFlying(true);

    // 2. Logic to Save in Cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newItem = { title, price, image, qty: 1 };
    const existingIndex = cart.findIndex((item: any) => item.title === title);
    
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push(newItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));

    // 3. Animation duration ke baad cleanup
    setTimeout(() => {
      setIsFlying(false);
      window.dispatchEvent(new Event("cartUpdate"));
    }, 800);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-5 rounded-[28px] group flex flex-col justify-between h-full relative overflow-visible"
    >
      {/* --- PURANA FLYING ANIMATION (RESTORED) --- */}
      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{ top: "20%", left: "40%", opacity: 1, scale: 1 }}
            animate={{ 
              top: "-100vh", 
              left: "90%", 
              opacity: 0,
              scale: [1, 2.5, 0.1], // Zoom-in phir chota hokar gayab
              rotate: 720 // Purana spin effect
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute z-[1000] pointer-events-none h-20 w-20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.6)] border-2 border-blue-500 bg-black"
          >
            {image ? (
              <img src={image} className="w-full h-full object-cover" alt="flying-product" />
            ) : (
              <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                <ShoppingBag size={24} className="text-white" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <div className="relative h-56 rounded-[20px] overflow-hidden mb-5 bg-black/20 border border-white/5">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-800 uppercase font-black text-[10px]">
              Lumina Image
            </div>
          )}
          
          {/* Subtle Dashboard Icon */}
          <div className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>

        <h3 className="font-bold text-lg text-white/90 tracking-tight group-hover:text-blue-500 transition-colors">
          {title}
        </h3>
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest mt-1">
          {price}
        </p>
      </div>

      <button 
        onClick={handleAddToCart}
        className="mt-8 w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-white uppercase tracking-[0.2em] hover:bg-blue-600 hover:border-blue-500 transition-all active:scale-95"
      >
        Add to Project
      </button>
    </motion.div>
  );
}