"use client";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function CollectionPage() {
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

  // Logic: Search Query ke base par filter
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchBarQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-20"
        >
          <span className="text-blue-500 font-bold tracking-[0.4em] uppercase text-[10px]">Indore Signature Series</span>
          <h1 className="text-7xl font-black tracking-tighter mt-4 italic uppercase">
            Our <span className="text-blue-500 underline decoration-blue-500/20 underline-offset-8">Designs</span>
          </h1>
          {searchBarQuery && (
            <p className="mt-4 text-zinc-400 text-sm">Showing results for: <span className="text-white italic">"{searchBarQuery}"</span></p>
          )}
        </motion.div>

        {/* Bento Grid with Filtered Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
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
                <h2 className="text-2xl font-bold text-zinc-800 uppercase tracking-[0.3em]">No Products Found</h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}