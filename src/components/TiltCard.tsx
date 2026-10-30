"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";

// Card that tilts toward the pointer in 3D with a moving light glare.
export default function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(x, (v) => `${v * 100}%`);
  const glareY = useTransform(y, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(248,231,176,.25), transparent 55%)`;

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - r.left) / r.width);
          y.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => { x.set(0.5); y.set(0.5); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative ${className}`}
      >
        {children}
        <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 rounded-[inherit]" />
      </motion.div>
    </div>
  );
}
