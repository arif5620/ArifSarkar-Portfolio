"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Short cinematic curtain on the first homepage visit of a session.
export default function IntroLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = true;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- needs sessionStorage, browser-only
    setShow(true);
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => setShow(false)}
        >
          <div className="text-center">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-shimmer font-display text-7xl font-semibold tracking-[0.2em] sm:text-9xl"
              >
                ARIF
              </motion.p>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
              className="mx-auto mt-4 h-px w-48 origin-left bg-gradient-to-r from-transparent via-gold to-transparent"
            />
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="mt-4 text-[10px] uppercase text-zinc-400 sm:text-xs"
            >
              Real Estate · Dhaka · Chattogram · Cumilla
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
