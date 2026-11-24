"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { waLink } from "@/data/profile";
import { useIsDark } from "@/lib/theme";

const City3D = dynamic(() => import("@/components/City3D"), { ssr: false });

const first = "ARIF";
const last = "SARKAR";
const badge = "REALTOR · DHAKA · CHATTOGRAM · CUMILLA · ";

function Letters({ word, start }: { word: string; start: number }) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.04em]">
      {word.split("").map((ch, i) => (
        <span key={i} className="hero-letter" style={{ "--d": `${start + i * 0.06}s` } as React.CSSProperties}>
          {ch}
        </span>
      ))}
    </span>
  );
}

// Editorial hero: giant name, Arif's cut-out portrait standing in front of it, mouse + scroll parallax.
// In dark mode the golden 3D skyline glows behind everything.
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const dark = useIsDark();
  const [can3D, setCan3D] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Pointer parallax (fine pointers only): the name drifts one way, the portrait the other.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const nameX = useTransform(sx, (v) => v * -24);
  const photoX = useTransform(sx, (v) => v * 18);
  const photoRY = useTransform(sy, (v) => v * 8);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  // 3D skyline only where WebGL works, motion isn't reduced and data isn't being saved; loads when idle.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduced || saveData) return;
    const gl = document.createElement("canvas").getContext("webgl2");
    if (!gl) return;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    const start = () => setCan3D(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 600);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-fg"
    >
      {/* Backdrop: skyline in dark mode, soft gold light in light mode. */}
      {dark && can3D && (
        <div className="animate-fade pointer-events-none absolute inset-0 opacity-70">
          <City3D />
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 72% 42%, color-mix(in srgb, var(--gold) 16%, transparent), transparent 70%), linear-gradient(to top, var(--ink) 4%, transparent 40%)",
        }}
      />
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-28 sm:px-6 lg:pt-32">
        <div className="hero-in flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[3px]" style={{ "--d": "0s" } as React.CSSProperties}>
          <span className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Taking new clients
          </span>
          <span className="rounded-full border border-line px-3 py-1.5 text-mute">Dhaka · Chattogram · Cumilla</span>
        </div>

        {/* Name block */}
        <motion.div style={{ y: nameY, x: nameX }} className="relative z-10 mt-8 lg:mt-10">
          <p className="hero-in flex flex-wrap items-baseline gap-x-4 gap-y-1" style={{ "--d": "0.1s" } as React.CSSProperties}>
            <span className="font-display text-3xl italic text-gold sm:text-4xl">Hello, I&apos;m</span>
            <span className="font-mono text-[10px] uppercase tracking-[3px] text-mute sm:text-xs">Real estate consultant &amp; Realtor</span>
          </p>
          <h1 className="mt-1 font-sans font-extrabold leading-[0.82] tracking-[-0.055em]">
            <span className="sr-only">Arif Sarkar — Real Estate Consultant &amp; Realtor in Dhaka, Chattogram and Cumilla</span>
            <span
              aria-hidden
              className="block bg-gradient-to-r from-fg via-fg to-mute-2 bg-clip-text text-[22vw] text-transparent sm:text-[19vw] lg:text-[11.5vw] xl:text-[10.5rem]"
            >
              <Letters word={first} start={0.15} />
            </span>
            <span
              aria-hidden
              className="block bg-gradient-to-r from-fg via-mute to-mute-2/40 bg-clip-text text-[22vw] text-transparent sm:text-[19vw] lg:ml-[0.18em] lg:text-[11.5vw] xl:text-[10.5rem]"
            >
              <Letters word={last} start={0.4} />
            </span>
          </h1>
        </motion.div>

        {/* Portrait in front of the name */}
        <motion.div
          style={{ y: photoY, x: photoX, rotateY: photoRY }}
          className="pointer-events-none relative z-20 mx-auto -mt-[16vw] h-[54svh] w-full max-w-[520px] sm:-mt-[12vw] sm:h-[60svh] lg:absolute lg:bottom-0 lg:right-[2%] lg:mt-0 lg:h-[86%] lg:w-[40vw] lg:max-w-[560px]"
        >
          <div className="hero-photo relative h-full w-full [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]">
            <Image
              src="/arif-cutout.webp"
              unoptimized
              alt="Arif Sarkar, Realtor in Bangladesh, in a blue suit"
              fill
              preload
              className="object-contain object-bottom"
            />
          </div>
        </motion.div>

        {/* Pitch + actions */}
        <motion.div style={{ opacity: fade }} className="relative z-30 -mt-6 max-w-lg pb-24 lg:mt-10 lg:max-w-md lg:pb-28">
          <p className="hero-in text-base leading-7 text-soft sm:text-lg" style={{ "--d": "0.7s" } as React.CSSProperties}>
            I help families, investors and businesses <span className="text-fg">buy, sell and rent</span> the right property in Bangladesh, with
            verified listings and honest advice from first call to keys.
          </p>
          <div className="hero-in mt-7 flex flex-wrap items-center gap-3" style={{ "--d": "0.85s" } as React.CSSProperties}>
            <a
              href="#properties"
              className="btn-shine group flex items-center gap-3 rounded-full bg-fg py-2 pl-6 pr-2 text-sm font-semibold text-ink transition hover:scale-[1.03]"
            >
              View properties
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-black transition group-hover:rotate-[-45deg]">
                <FaArrowRight size={12} />
              </span>
            </a>
            <a
              href={waLink("Hello Arif, I'd like to discuss a property.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-line bg-card px-5 py-3 text-sm font-semibold text-fg backdrop-blur transition hover:border-gold hover:text-gold"
            >
              <FaWhatsapp className="text-green-500" size={16} /> WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Spinning badge */}
        <a
          href="#contact"
          aria-label="Contact Arif"
          className="hero-in absolute bottom-24 right-4 z-30 hidden h-28 w-28 sm:block lg:bottom-auto lg:right-auto lg:left-[46%] lg:top-[64%]"
          style={{ "--d": "1s" } as React.CSSProperties}
        >
          <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full text-fg">
            <defs>
              <path id="badge-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
            </defs>
            <text fontSize="8.6" letterSpacing="2.2" fill="currentColor" className="font-mono">
              <textPath href="#badge-circle">{badge}</textPath>
            </text>
          </svg>
          <span className="absolute inset-0 m-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold text-black shadow-[0_0_30px_rgba(201,164,76,.5)]">
            <FaArrowRight size={13} className="-rotate-45" />
          </span>
        </a>

        {/* Bottom rail */}
        <div className="hero-in absolute inset-x-4 bottom-5 z-30 flex items-end justify-between text-[10px] uppercase tracking-[3px] text-mute sm:inset-x-6" style={{ "--d": "1.1s" } as React.CSSProperties}>
          <a href="#about-me" className="flex items-center gap-3 transition hover:text-gold">
            <span className="relative block h-10 w-px overflow-hidden bg-line">
              <span className="animate-scroll-cue absolute inset-0 bg-gold" />
            </span>
            Scroll to explore
          </a>
          <span className="hidden font-mono sm:block">23.81° N · 90.41° E — Dhaka, BD</span>
        </div>
      </div>
    </section>
  );
}
