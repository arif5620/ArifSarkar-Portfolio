"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { toggleTheme, useIsDark } from "@/lib/theme";

// Desktop: a pendant lamp hanging under the menu. Pull (click or drag) the cord to switch light/dark.
export function ThemeLamp() {
  const dark = useIsDark();
  const [swing, setSwing] = useState(0);
  const pull = () => {
    toggleTheme();
    setSwing((s) => s + 1);
  };

  return (
    <div className="pointer-events-none fixed right-[calc((100vw-min(92vw,80rem))/2+150px)] top-0 z-40 hidden lg:block">
      <div key={swing} className={`origin-top ${swing ? "lamp-swing" : ""}`}>
        <span className="mx-auto block h-24 w-px bg-mute-2" />
        <motion.button
          type="button"
          onClick={pull}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.35}
          onDragEnd={(_, info) => info.offset.y > 18 && pull()}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? "Lights on" : "Lights off"}
          className="pointer-events-auto relative -mt-px flex cursor-grab flex-col items-center active:cursor-grabbing"
        >
          {/* shade */}
          <svg width="34" height="22" viewBox="0 0 34 22" className="text-fg">
            <path d="M14 0h6v4h-6z" fill="currentColor" />
            <path d="M6 20 Q17 0 28 20 Z" fill="currentColor" />
          </svg>
          {/* bulb */}
          <span
            className={`-mt-1 h-3 w-3 rounded-full transition-all duration-500 ${
              dark ? "bg-gold-soft shadow-[0_0_18px_6px_rgba(227,201,126,.65)]" : "bg-mute-2/60"
            }`}
          />
          {/* light cone in dark mode */}
          <span
            aria-hidden
            className={`pointer-events-none absolute left-1/2 top-5 h-56 w-56 -translate-x-1/2 transition-opacity duration-700 ${dark ? "opacity-100" : "opacity-0"}`}
            style={{ background: "radial-gradient(50% 60% at 50% 0%, rgba(227,201,126,.22), transparent 70%)", clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)" }}
          />
        </motion.button>
      </div>
    </div>
  );
}

// Mobile: a compact sun/moon button in the menu bar.
export function ThemeButton({ className = "" }: { className?: string }) {
  const dark = useIsDark();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition hover:text-gold ${className}`}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
