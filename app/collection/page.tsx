"use client";
import { Suspense } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

function CollectionContent() {
  const searchParams = useSearchParams();
  const searchBarQuery = searchParams.get("search") || "";

  const allProducts = [
    { id: "aura", title: "Aura Pendant", price: "₹10", image: "/images/products/Aura Pendant by Et2 _ E21172-PC _ ET2362737.jpg" },
    { id: "nova", title: "Nova Desk Lamp", price: "₹4,200", image: "/images/products/download (19).jpg" },
    { id: "eclipse", title: "Eclipse Wall", price: "₹7,800", image: "/images/products/Eclipse Wall Light.jpg" },
    { id: "zenith", title: "Zenith Floor", price: "₹22,000", image: "/images/products/download (20).jpg" },
    { id: "luna", title: "Luna Chandelier", price: "₹45,000", image: "/images/products/Luna Chandelier by Architect@Work.jpg" },
    { id: "orion", title: "Orion Spot", price: "₹3,500", image: "/images/products/Foco de techo Sean, 4 luces, negro de Orion.jpg" },
  ];

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchBarQuery.toLowerCase())
  );

  return (
    <div className="pt-24 md:pt-40 pb-10 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto overflow-x-hidden">
      {/* Header Section - Responsive Sizes */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 md:mb-20 text-center md:text-left"
      >
        <span className="text-blue-500 font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase text-[9px] md:text-[10px]">
          Indore Signature Series
        </span>
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter mt-2 md:mt-4 italic uppercase leading-none">
          Our <span className="text-blue-500 underline decoration-blue-500/20 underline-offset-4 md:underline-offset-8">Designs</span>
        </h1>
        {searchBarQuery && (
          <p className="mt-4 text-zinc-400 text-xs md:text-sm">
            Showing results for: <span className="text-white italic">"{searchBarQuery}"</span>
          </p>
        )}
      </motion.div>

      {/* Grid - 2 Columns on Mobile, 3 on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard title={p.title} price={p.price} image={p.image} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="col-span-full py-20 text-center"
            >
              <h2 className="text-lg md:text-2xl font-bold text-zinc-800 uppercase tracking-[0.2em]">No Products Found</h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CollectionPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-blue-500 font-bold animate-pulse uppercase tracking-widest text-xs">Loading Collection...</p>
        </div>
      }>
        <CollectionContent />
      </Suspense>
    </main>
  );
}