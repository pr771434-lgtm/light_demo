"use client";
import Navbar from "../../../components/Navbar";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const params = useParams();
  
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <Navbar />
      <div className="pt-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
        {/* Left: Product Image */}
        <div className="aspect-square bg-zinc-900 rounded-[40px] flex items-center justify-center border border-white/5">
           <div className="h-64 w-64 bg-blue-500/10 blur-[80px] rounded-full animate-pulse"/>
           <p className="absolute text-zinc-500 uppercase tracking-widest">Product Image: {params.id}</p>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-black uppercase">{params.id} Series</h1>
          <p className="text-blue-500 text-2xl font-bold mt-4">₹18,500</p>
          <p className="text-zinc-400 mt-8 leading-relaxed">
            Premium architectural lighting designed to bring warmth and sophistication 
            to your modern living spaces. Crafted with high-grade aluminum and smart LED tech.
          </p>

          <div className="mt-12 flex gap-4">
            <button className="flex-1 bg-white text-black py-4 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all">
              ADD TO CART
            </button>
            <button className="flex-1 border border-white/10 py-4 rounded-2xl font-bold hover:bg-zinc-900 transition-all">
              WISHLIST
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}