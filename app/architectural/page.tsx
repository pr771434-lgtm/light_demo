"use client";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { Layout, Maximize, PenTool } from "lucide-react";

export default function ArchitecturalPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <Navbar />
      <div className="pt-40 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-2xl"
        >
          <h1 className="text-6xl font-black tracking-tighter mb-6">
            ARCHITECTURAL <span className="text-blue-500">PRECISION.</span>
          </h1>
          <p className="text-zinc-400 text-xl leading-relaxed">
            We partner with architects and interior designers to create lighting 
            landscapes that redefine structural beauty.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mt-24">
          <div className="aspect-video bg-zinc-900 rounded-[30px] border border-white/5 flex items-center justify-center overflow-hidden group">
             <div className="h-full w-full bg-gradient-to-br from-blue-600/10 to-transparent group-hover:scale-110 transition-transform duration-700" />
             <p className="absolute font-bold tracking-widest text-zinc-600 uppercase">Hospitality Projects</p>
          </div>
          <div className="flex flex-col justify-center space-y-8">
            <div className="flex gap-6">
              <div className="h-12 w-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                <PenTool className="text-blue-500" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Custom Consultation</h3>
                <p className="text-zinc-500 mt-2">Tailored lighting layouts for high-end residential and commercial spaces.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="h-12 w-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                <Layout className="text-blue-500" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Structural Integration</h3>
                <p className="text-zinc-500 mt-2">Seamlessly hidden light sources that highlight architectural features.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}