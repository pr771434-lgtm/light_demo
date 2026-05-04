"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Trash2, Plus, Minus, CreditCard, Truck, MapPin, CheckCircle2, Mail, Info, Package, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [showQR, setShowQR] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(data);
  }, []);

  const updateCartAndStorage = (newCart: any[]) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdate"));
  };

  const changeQty = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].qty = Math.max(1, newCart[index].qty + delta);
    updateCartAndStorage(newCart);
  };

  const removeItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    updateCartAndStorage(newCart);
  };

  const subtotal = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
    return acc + (price * item.qty);
  }, 0);

  const codFee = 50;
  const grandTotal = paymentMethod === "cod" ? subtotal + codFee : subtotal;
  const upiLink = `upi://pay?pa=9713342226-2@ybl&pn=Lumina%20Store&am=${grandTotal}&cu=INR`;

  const isFormValid = formData.name && formData.email && formData.phone && formData.address && cart.length > 0;

  const handleOrderComplete = async () => {
    setIsProcessing(true);
    const generatedId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    
    // Simulate API delay
    setTimeout(() => {
      setCart([]);
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event("cartUpdate"));
      setShowQR(false);
      setOrderConfirmed(true);
      setIsProcessing(false);
    }, 2000);
  };

  if (orderConfirmed) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center pt-32 px-6 pb-20 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center mb-8">
            <CheckCircle2 size={40} />
          </motion.div>
          <h1 className="text-4xl font-black uppercase italic italic tracking-tighter mb-4">Confirmed</h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-10">Order ID: {orderId}</p>
          <button onClick={() => window.location.href = "/"} className="bg-white text-black px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest">Back to Shop</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-32">
      <Navbar />
      <div className="pt-32 md:pt-40 px-4 md:px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-10 uppercase italic">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-6 md:gap-10">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Form */}
            <section className="bg-zinc-900/40 p-6 md:p-8 rounded-[32px] border border-white/5">
              <div className="flex items-center gap-3 mb-6 text-blue-500"><MapPin size={18}/><h2 className="text-sm font-bold uppercase tracking-widest text-white">Shipping</h2></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-black/60 border border-white/5 p-4 rounded-xl outline-none focus:border-blue-500 text-sm"/>
                <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-black/60 border border-white/5 p-4 rounded-xl outline-none focus:border-blue-500 text-sm"/>
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="md:col-span-2 bg-black/60 border border-white/5 p-4 rounded-xl outline-none focus:border-blue-500 text-sm"/>
                <textarea placeholder="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="md:col-span-2 bg-black/60 border border-white/5 p-4 rounded-xl h-24 outline-none focus:border-blue-500 text-sm"/>
              </div>
            </section>

            {/* Cart Items */}
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {cart.map((item, index) => (
                  <motion.div key={index} layout exit={{ opacity: 0, x: -10 }} className="flex gap-4 p-4 bg-zinc-900/30 rounded-2xl border border-white/5 items-center">
                    <div className="h-16 w-16 bg-zinc-800 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[10px] uppercase truncate">{item.title}</h3>
                      <p className="text-blue-500 font-bold text-[10px]">{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-black/40 rounded-lg p-1.5 border border-white/5">
                      <button onClick={() => changeQty(index, -1)}><Minus size={10}/></button>
                      <span className="text-[10px] font-bold w-4 text-center">{item.qty}</span>
                      <button onClick={() => changeQty(index, 1)}><Plus size={10}/></button>
                    </div>
                    <button onClick={() => removeItem(index)} className="text-zinc-600 p-1"><Trash2 size={14}/></button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900/60 p-6 md:p-8 rounded-[32px] border border-blue-500/10 lg:sticky lg:top-32">
              <h2 className="text-sm font-black mb-6 uppercase tracking-widest">Summary</h2>
              <div className="flex flex-col gap-2 mb-6">
                <button onClick={() => setPaymentMethod("online")} className={`p-4 rounded-xl border flex items-center justify-between transition-all ${paymentMethod === "online" ? "border-blue-500 bg-blue-500/10" : "border-white/5 opacity-40"}`}>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Pay Online</span>
                  <CreditCard size={14}/>
                </button>
                <button onClick={() => setPaymentMethod("cod")} className={`p-4 rounded-xl border flex items-center justify-between transition-all ${paymentMethod === "cod" ? "border-blue-500 bg-blue-500/10" : "border-white/5 opacity-40"}`}>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Cash on Delivery</span>
                  <Truck size={14}/>
                </button>
              </div>

              <div className="border-t border-white/5 pt-6 space-y-3 mb-6">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500"><span>Total</span><span className="text-white text-lg font-black">₹{grandTotal.toLocaleString()}</span></div>
              </div>

              <button 
                disabled={!isFormValid || isProcessing} 
                onClick={() => paymentMethod === "online" ? setShowQR(true) : handleOrderComplete()} 
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                {isProcessing ? "Wait..." : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal Mobile Optimized */}
      <AnimatePresence>
        {showQR && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-8 rounded-[40px] w-full max-w-xs text-black text-center">
              <div className="bg-blue-50 p-4 rounded-2xl mb-6 inline-block"><QRCodeSVG value={upiLink} size={180} /></div>
              <h2 className="text-xl font-black mb-6 tracking-tight">Scan & Pay ₹{grandTotal}</h2>
              <button onClick={handleOrderComplete} className="w-full bg-black text-white py-4 rounded-xl font-bold text-[10px] uppercase mb-3">I Have Paid</button>
              <button onClick={() => setShowQR(false)} className="text-[9px] font-bold text-zinc-400 uppercase">Cancel</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}