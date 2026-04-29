"use client";

import Navbar from "../../components/Navbar";
import { Cpu, Smartphone, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function SmartTech() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      
      <div className="pt-40 flex flex-col items-center text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-600/20 text-blue-400 px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-6 border border-blue-500/30"
        >
          FUTURE OF ILLUMINATION
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
        >
          SMART CONTROL. <br/> 
          <span className="text-zinc-500">PERFECT MOOD.</span>
        </motion.h1>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mt-20">
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-8 border border-white/5 bg-zinc-900/50 rounded-3xl backdrop-blur-sm"
          >
            <div className="h-12 w-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Smartphone className="text-blue-500" size={24}/>
            </div>
            <h3 className="text-xl font-bold mb-2">App Controlled</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Adjust brightness and warmth directly from the Lumina App on iOS or Android.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-8 border border-white/5 bg-zinc-900/50 rounded-3xl backdrop-blur-sm"
          >
            <div className="h-12 w-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Cpu className="text-blue-500" size={24}/>
            </div>
            <h3 className="text-xl font-bold mb-2">AI Integration</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Seamlessly connects with Alexa, Google Home, and Apple HomeKit.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-8 border border-white/5 bg-zinc-900/50 rounded-3xl backdrop-blur-sm"
          >
            <div className="h-12 w-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Zap className="text-blue-500" size={24}/>
            </div>
            <h3 className="text-xl font-bold mb-2">Energy Efficient</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Smart sensors that optimize power consumption based on room occupancy.
            </p>
          </motion.div>
        </div>
      </div>

      <footer className="py-20 text-center text-zinc-700 text-sm uppercase tracking-[0.3em]">
        Lumina Intelligent Systems © 2026
      </footer>
    </main>
  );
}