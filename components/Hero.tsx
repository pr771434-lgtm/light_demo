"use client";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToCollection = () => {
    const element = document.getElementById("collection-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openStory = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Dynamic Glow Orbs - Futuristic Background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute h-[800px] w-[800px] rounded-full bg-blue-600/10 blur-[180px]" 
      />

      <div className="relative z-10 text-center px-4">
        <motion.span 
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-blue-400 text-xs md:text-sm uppercase font-bold"
        >
          Future of Illumination
        </motion.span>
        
        {/* Futuristic Reveal Effect */}
        <motion.h1 
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 50 }}
          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0 }}
          transition={{ duration: 1.2, ease: [0.45, 0.05, 0.55, 0.95], delay: 0.5 }}
          className="mt-6 text-7xl md:text-[10rem] font-black text-white leading-none tracking-tighter"
        >
          LIGHT <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-white to-blue-500 italic">
            
          </span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
        >
          <button 
            onClick={scrollToCollection}
            className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95 neon-glow uppercase tracking-widest text-xs"
          >
            Explore Series
          </button>
          
          <button 
            onClick={openStory}
            className="px-10 py-4 border border-white/10 glass-card text-white font-black rounded-2xl hover:bg-white/10 transition-all active:scale-95 uppercase tracking-widest text-xs"
          >
            Watch Story
          </button>
        </motion.div>
      </div>

      {/* Cyberpunk Decorative Elements */}
      <div className="absolute bottom-10 left-10 hidden lg:block opacity-20">
        <div className="text-[10px] font-mono text-zinc-500 tracking-[0.5em] uppercase vertical-text">
          Lumina System v1.0
        </div>
      </div>
    </section>
  );
}