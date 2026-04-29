"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function SignIn() {
  const [isOn, setIsOn] = useState(false);

  return (
    <main className="bg-black min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden relative">
      
      {/* 1. The Hanging Lamp & Rope */}
      <div className="absolute top-0 flex flex-col items-center">
        {/* Wire */}
        <div className="w-[2px] h-32 bg-zinc-800" />
        
        {/* Lamp Head */}
        <div className={`w-16 h-12 rounded-t-full transition-colors duration-500 ${isOn ? 'bg-blue-600 neon-glow' : 'bg-zinc-900'}`} />
        
        {/* The Pull Rope */}
        <motion.div 
          onClick={() => setIsOn(!isOn)}
          whileTap={{ y: 20 }}
          className="cursor-pointer flex flex-col items-center"
        >
          <div className="w-[1px] h-20 bg-zinc-700" />
          <div className="w-3 h-3 bg-zinc-500 rounded-full hover:bg-white transition-colors" />
        </motion.div>
      </div>

      {/* 2. The Form (Appears when switched ON) */}
      <AnimatePresence>
        {isOn ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            className="max-w-md w-full glass-card p-10 rounded-[40px] border border-blue-500/30 neon-glow relative mt-40"
          >
            {/* Global Light Effect from Top */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 blur-[120px] -z-10" />

            <div className="text-center mb-10">
              <h1 className="text-3xl font-black tracking-widest text-white mb-2">LOG IN</h1>
              <p className="text-zinc-500 text-sm">Enter your credentials under the Lumina light</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 ml-1">Email</label>
                <input type="email" placeholder="name@example.com" className="w-full bg-black/50 border border-white/10 mt-2 px-6 py-4 rounded-2xl focus:border-blue-500 transition-all outline-none text-white text-sm" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 ml-1">Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-black/50 border border-white/10 mt-2 px-6 py-4 rounded-2xl focus:border-blue-500 transition-all outline-none text-white text-sm" />
              </div>
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all shadow-lg active:scale-95">
                LIGHT UP MY ACCOUNT
              </button>
            </form>

            <p className="text-center mt-8 text-zinc-500 text-xs">
              New here? <Link href="/auth/signup" className="text-white font-bold hover:text-blue-500 underline underline-offset-4 ml-1">Sign Up</Link>
            </p>
          </motion.div>
        ) : (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-zinc-700 font-bold tracking-widest uppercase mt-40"
          >
            Pull the rope to start
          </motion.p>
        )}
      </AnimatePresence>
    </main>
  );
}