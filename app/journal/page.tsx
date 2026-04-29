"use client";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";

export default function JournalPage() {
  const blogs = [
    { title: "The Art of Warm Lighting", date: "April 2026", category: "Design Tips" },
    { title: "Smart Homes: 2026 Trends", date: "March 2026", category: "Tech" },
    { title: "Lighting for Modern Offices", date: "Feb 2026", category: "Commercial" },
  ];

  return (
    <main className="bg-[#050505] min-h-screen text-white font-sans">
      <Navbar />
      <div className="pt-40 px-6 max-w-5xl mx-auto">
        <h1 className="text-7xl font-black tracking-tighter text-center mb-20">LUMINA <span className="text-blue-500 underline decoration-1 underline-offset-8">JOURNAL</span></h1>
        
        <div className="space-y-1">
          {blogs.map((blog, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="py-12 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center group cursor-pointer"
            >
              <div>
                <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">{blog.category}</span>
                <h2 className="text-3xl font-bold mt-2 group-hover:translate-x-4 transition-transform duration-500">{blog.title}</h2>
              </div>
              <p className="text-zinc-600 font-mono mt-4 md:mt-0">{blog.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}