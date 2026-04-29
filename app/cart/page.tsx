"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Trash2, Plus, Minus, CreditCard, Truck, MapPin, User, Phone, X, CheckCircle2, Mail, Info, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [showQR, setShowQR] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

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

  const upiId = "9713342226-2@ybl"; 
  const upiLink = `upi://pay?pa=${upiId}&pn=Lumina%20Store&am=${grandTotal}&cu=INR`;

  const isFormValid = formData.name && formData.email && formData.phone && formData.address && cart.length > 0;

  const handleOrderComplete = async () => {
    setIsProcessing(true);
    const generatedId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          amount: grandTotal,
          orderId: generatedId,
        }),
      });

      if (res.ok) {
        setCart([]);
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event("cartUpdate"));
        setShowQR(false);
        setOrderConfirmed(true);
      } else {
        setOrderConfirmed(true);
      }
    } catch (err) {
      console.error(err);
      alert("Order processing error.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderConfirmed) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
        <Navbar />
        <div className="pt-40 px-6 max-w-4xl mx-auto flex flex-col items-center pb-20 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-24 w-24 bg-green-500 rounded-full flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
            <CheckCircle2 size={52} />
          </motion.div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4">Order <span className="text-blue-500">Confirmed</span></h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-12">Receipt sent to {formData.email}</p>
          <div className="w-full glass-card p-10 rounded-[48px] border border-white/5 text-left">
            <div className="flex flex-col md:flex-row justify-between mb-12 border-b border-white/5 pb-10">
              <div><p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-2">Order ID</p><p className="font-mono text-xl text-blue-400">{orderId}</p></div>
              <div><p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-2 text-right">Expected Delivery</p><p className="text-xl font-bold">2-4 Business Days</p></div>
            </div>
            <button onClick={() => window.location.href = "/"} className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest text-[10px]">Return to Gallery</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <div className="pt-40 px-6 max-w-7xl mx-auto pb-20">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black tracking-tighter mb-16 uppercase italic">Finalize <span className="text-blue-500">Order</span></motion.h1>
        
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <section className="glass-card p-8 rounded-[32px] border border-white/5">
              <div className="flex items-center gap-3 mb-8 text-blue-500"><MapPin size={20} /><h2 className="text-xl font-bold uppercase tracking-widest text-white">Shipping Information</h2></div>
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500"/>
                <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500"/>
                <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 md:col-span-2"/>
                <textarea placeholder="Complete Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl h-28 outline-none focus:border-blue-500 md:col-span-2"/>
              </div>
            </section>

            <AnimatePresence mode="popLayout">
              {cart.map((item, index) => (
                <motion.div key={index} layout exit={{ opacity: 0, x: 20 }} className="flex gap-6 p-6 glass-card rounded-[32px] items-center border border-white/5">
                  {/* ✅ Image Holder Updated */}
                  <div className="h-20 w-20 bg-zinc-900 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-1 opacity-20">
                         <Package size={20} />
                         <span className="text-[6px] font-bold uppercase tracking-widest">Lumina</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-xs uppercase tracking-tight">{item.title}</h3>
                    <p className="text-blue-500 font-bold text-[10px] mt-1">{item.price}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-black/40 rounded-xl p-2 border border-white/5">
                    <button onClick={() => changeQty(index, -1)} className="hover:text-blue-500 transition-colors"><Minus size={12}/></button>
                    <span className="font-bold text-xs">{item.qty}</span>
                    <button onClick={() => changeQty(index, 1)} className="hover:text-blue-500 transition-colors"><Plus size={12}/></button>
                  </div>
                  <button onClick={() => removeItem(index)} className="p-2 text-zinc-600 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-8 rounded-[40px] border border-blue-500/10 sticky top-40">
              <h2 className="text-xl font-black mb-8 uppercase tracking-widest text-center">Summary</h2>
              
              <div className="space-y-3 mb-8">
                <button onClick={() => setPaymentMethod("online")} className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between ${paymentMethod === "online" ? "border-blue-500 bg-blue-500/10" : "border-white/5 bg-white/5 opacity-40"}`}>
                   <div className="flex items-center gap-3"><CreditCard size={18} className={paymentMethod === "online" ? "text-blue-500" : "text-zinc-500"} /><span className="text-[10px] font-bold uppercase tracking-widest">QR Scanner</span></div>
                </button>
                <button onClick={() => setPaymentMethod("cod")} className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between ${paymentMethod === "cod" ? "border-blue-500 bg-blue-500/10" : "border-white/5 bg-white/5 opacity-40"}`}>
                   <div className="flex items-center gap-3"><Truck size={18} className={paymentMethod === "cod" ? "text-blue-500" : "text-zinc-500"} /><span className="text-[10px] font-bold uppercase tracking-widest">Cash on Delivery</span></div>
                </button>
              </div>

              <div className="space-y-4 font-medium border-t border-white/5 pt-8 mb-4">
                <div className="flex justify-between text-[11px] uppercase tracking-widest">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-mono">₹{subtotal.toLocaleString()}</span>
                </div>
                
                <AnimatePresence>
                  {paymentMethod === "cod" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between text-[11px] uppercase tracking-widest text-blue-400">
                      <span className="flex items-center gap-1">COD Fee <Info size={10} /></span>
                      <span className="font-mono">+ ₹{codFee}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between text-[11px] uppercase tracking-widest">
                  <span className="text-zinc-500">Shipping</span>
                  <span className="text-green-500 font-bold">Free</span>
                </div>
              </div>

              <div className="flex justify-between py-6 font-black text-3xl tracking-tighter border-b border-white/5 mb-8">
                <span>Total</span><span className="text-blue-500 font-mono">₹{grandTotal.toLocaleString()}</span>
              </div>

              <button disabled={!isFormValid || isProcessing} onClick={() => paymentMethod === "online" ? setShowQR(true) : handleOrderComplete()} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black hover:bg-white hover:text-black transition-all disabled:opacity-20 uppercase tracking-widest text-[10px]">
                {isProcessing ? "Finalizing..." : paymentMethod === "online" ? "Authorize with QR" : "Confirm COD Order"}
              </button>
              
              {paymentMethod === "cod" && (
                <p className="text-[8px] text-zinc-500 mt-4 text-center uppercase tracking-widest">₹{codFee} Handling fee applied for Cash Collection</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showQR && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-10 rounded-[50px] max-w-sm w-full text-black flex flex-col items-center">
              <div className="p-6 bg-blue-50 rounded-3xl mb-6 shadow-inner"><QRCodeSVG value={upiLink} size={220} level="H" /></div>
              <h2 className="text-2xl font-black tracking-tighter">Scan to Pay</h2>
              <p className="text-blue-600 font-bold text-sm mb-8">₹{grandTotal.toLocaleString()}</p>
              <button onClick={handleOrderComplete} disabled={isProcessing} className="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                {isProcessing ? "Processing..." : "I Have Paid - Send Receipt"} <Mail size={14}/>
              </button>
              <button onClick={() => setShowQR(false)} className="mt-4 text-[9px] uppercase font-bold text-zinc-400 hover:text-red-500 transition-colors">Cancel</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}