"use client";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// --- 3D PARTICLE CORE (Lumina Blue Theme) ---
function ParticleCore({ count = 2500 }) {
  const points = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      const distance = 1.8 + Math.random() * 1.2; 

      positions[i * 3] = distance * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = distance * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = distance * Math.cos(theta);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += 0.002;
      points.current.rotation.x += 0.001;
      points.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.03);
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      {/* Blue Theme Color (#3b82f6) use kiya hai */}
      <pointsMaterial
        size={0.012}
        color="#3b82f6" 
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function Preloader({ finishLoading }: { finishLoading: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // 100% hote hi bina button ke auto-open logic
          setTimeout(() => {
            finishLoading();
          }, 800); 
          return 100;
        }
        return prev + 1;
      });
    }, 25); 
    return () => clearInterval(interval);
  }, [finishLoading]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1, filter: "blur(40px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D Blue Orb Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ParticleCore />
        </Canvas>
      </div>

      {/* Interface Overlay */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-12 text-center"
        >
          <h1 className="text-white text-4xl font-black tracking-[1.2em] ml-[1.2em] drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            LUMINA
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4">
             <div className="h-1 w-1 bg-blue-500 rounded-full animate-ping" />
             <p className="text-blue-500/60 text-[8px] tracking-[0.8em] uppercase">
               Synchronizing Neural Interface
             </p>
          </div>
        </motion.div>

        {/* Minimalist Blue Circle Progress */}
        <div className="w-24 h-24 rounded-full flex items-center justify-center relative">
          <svg className="w-full h-full absolute transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke="currentColor"
              strokeWidth="1"
              fill="transparent"
              className="text-white/5"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="44"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray="276"
              animate={{ strokeDashoffset: 276 - (276 * progress) / 100 }}
              className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
            />
          </svg>
          <span className="text-blue-500 font-mono text-xs font-bold">{progress}%</span>
        </div>

        {/* Auto-Open Status Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-[9px] text-zinc-500 tracking-[0.4em] uppercase font-bold"
        >
          {progress < 100 ? "System Booting..." : "Authentication Complete"}
        </motion.div>
      </div>

      {/* Deep Blue Atmospheric Glow */}
      <div className="absolute w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* HUD Corners */}
      <div className="absolute top-10 left-10 w-16 h-16 border-l border-t border-blue-500/20" />
      <div className="absolute bottom-10 right-10 w-16 h-16 border-r border-b border-blue-500/20" />
    </motion.div>
  );
}