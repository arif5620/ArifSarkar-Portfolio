"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const text =
  "I help people across Dhaka, Chattogram and Cumilla find the right home, sell at the right price and invest with confidence. Every listing is verified, every price is honest, and I stay with you until the keys are in your hand.";

// Words that get the gold, italic serif treatment.
const accent = new Set(["right", "honest,", "keys"]);

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  const gold = accent.has(word);
  return (
    <motion.span style={{ opacity, y }} className={`mr-[0.25em] inline-block ${gold ? "font-display italic text-gold" : ""}`}>
      {word}
    </motion.span>
  );
}

// Scroll-driven statement: each word lights up as you scroll past it.
export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  return (
    <section id="about-me" className="relative bg-ink py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[4px] text-mute">
          <span className="h-px w-10 bg-gold" /> (01) What I do
        </p>
        <p ref={ref} className="mt-8 text-[1.9rem] font-medium leading-[1.2] tracking-tight text-fg sm:text-5xl lg:text-[3.6rem]">
          <span className="sr-only">{text}</span>
          <span aria-hidden>
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </span>
        </p>
      </div>
    </section>
  );
}
