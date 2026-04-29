"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function SignUp() {
  const [isOn, setIsOn] = useState(false);

  return (
    <main className="bg-black min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden relative">
      
      {/* Hanging Lamp UI */}
      <div className="absolute top-0 flex flex-col items-center">
        <div className="w-[2px] h-32 bg-zinc-800" />
        <div className={`w-16 h-12 rounded-t-full transition-colors duration-500 ${isOn ? 'bg-blue-600 neon-glow' : 'bg-zinc-900'}`} />
        <motion.div 
          onClick={() => setIsOn(!isOn)}
          whileTap={{ y: 20 }}
          className="cursor-pointer flex flex-col items-center"
        >
          <div className="w-[1px] h-20 bg-zinc-700" />
          <div className="w-3 h-3 bg-zinc-500 rounded-full" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOn ? (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="max-w-md w-full glass-card p-10 rounded-[40px] border border-blue-500/30 neon-glow mt-40"
          >
            <h1 className="text-3xl font-black tracking-widest text-white text-center mb-10">SIGN UP</h1>
            
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full bg-black/50 border border-white/10 px-6 py-4 rounded-2xl focus:border-blue-500 outline-none text-white text-sm" />
              <input type="email" placeholder="Email" className="w-full bg-black/50 border border-white/10 px-6 py-4 rounded-2xl focus:border-blue-500 outline-none text-white text-sm" />
              <input type="password" placeholder="Password" className="w-full bg-black/50 border border-white/10 px-6 py-4 rounded-2xl focus:border-blue-500 outline-none text-white text-sm" />
              
              <button className="w-full bg-white text-black py-4 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all mt-4">
                CREATE ACCOUNT
              </button>
            </form>

            <p className="text-center mt-8 text-zinc-500 text-xs">
              Already a member? <Link href="/auth/signin" className="text-white font-bold hover:text-blue-500 underline underline-offset-4 ml-1">Log In</Link>
            </p>
          </motion.div>
        ) : (
          <p className="text-zinc-700 font-bold tracking-[0.5em] uppercase mt-40 animate-pulse">Switch on the light</p>
        )}
      </AnimatePresence>
    </main>
  );
}