"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { waLink } from "@/data/profile";

const GOLD = "#c9a44c";
const SOFT = "#f8e7b0";
const ease = [0.22, 1, 0.36, 1] as const;
// Rounded so server and browser print identical SVG numbers (avoids hydration mismatch).
const r2 = (n: number) => Math.round(n * 100) / 100;

// Line art draws itself in when a scene appears.
const draw = (delay = 0, duration = 1.2) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { pathLength: { duration, delay, ease }, opacity: { duration: 0.2, delay } },
});

const pop = (delay = 0) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.6, delay, ease },
});

/** Suited figure; origin at the feet. */
function Person({ x, y, s = 1, delay = 0, flip = false, tie = true, label }: {
  x: number; y: number; s?: number; delay?: number; flip?: boolean; tie?: boolean; label?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g transform={`scale(${flip ? -s : s} ${s})`}>
      <motion.circle cx="0" cy="-118" r="17" fill="#0b0b0f" stroke={SOFT} strokeWidth="2.5" {...draw(delay)} />
      <motion.path d="M-30 -92 Q0 -102 30 -92 L36 -10 L-36 -10 Z" fill="#0b0b0f" stroke={GOLD} strokeWidth="2.5" strokeLinejoin="round" {...draw(delay + 0.2)} />
      <motion.path d="M-11 -96 L0 -66 L11 -96" fill="none" stroke={SOFT} strokeWidth="2" {...draw(delay + 0.5, 0.6)} />
      {tie && <motion.path d="M0 -92 L-4 -76 L0 -58 L4 -76 Z" fill={GOLD} stroke="none" {...pop(delay + 0.8)} />}
      <motion.path d="M-24 -10 L-20 0 M24 -10 L20 0" stroke={GOLD} strokeWidth="2.5" {...draw(delay + 0.6, 0.4)} />
      </g>
      {label && (
        <motion.text y={-148 * s} textAnchor="middle" fill={SOFT} fontSize="15" fontWeight="600" {...pop(delay + 1)}>
          {label}
        </motion.text>
      )}
    </g>
  );
}

function House({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <motion.path d="M-60 -50 L0 -100 L60 -50 M-48 -60 V0 H48 V-60" fill="none" stroke={GOLD} strokeWidth="3" strokeLinejoin="round" {...draw(delay, 1.4)} />
      <motion.rect x="-12" y="-36" width="24" height="36" fill="none" stroke={SOFT} strokeWidth="2.5" {...draw(delay + 1)} />
      <motion.rect x="-38" y="-46" width="16" height="16" fill={GOLD} opacity="0.7" {...pop(delay + 1.3)} />
      <motion.rect x="22" y="-46" width="16" height="16" fill={GOLD} opacity="0.7" {...pop(delay + 1.4)} />
    </g>
  );
}

function Sparkle({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <motion.line
            key={i}
            x1={r2(Math.cos(a) * 14)} y1={r2(Math.sin(a) * 14)} x2={r2(Math.cos(a) * 34)} y2={r2(Math.sin(a) * 34)}
            stroke={SOFT} strokeWidth="2.5" strokeLinecap="round"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: [0, 1, 0.2, 1], pathLength: 1 }}
            transition={{ duration: 1.6, delay: delay + i * 0.03, repeat: Infinity, repeatDelay: 1.2 }}
          />
        );
      })}
    </g>
  );
}

/* ---------- Scenes (all in a 400x320 viewBox) ---------- */

function SceneHandshake() {
  return (
    <>
      <Person x={130} y={290} delay={0} label="Arif" />
      <Person x={270} y={290} flip delay={0.3} label="Client" />
      {/* Arms meeting in a handshake */}
      <motion.path d="M156 196 Q182 214 198 200" fill="none" stroke={GOLD} strokeWidth="9" strokeLinecap="round" {...draw(1.2, 0.8)} />
      <motion.path d="M244 196 Q218 214 202 200" fill="none" stroke={GOLD} strokeWidth="9" strokeLinecap="round" {...draw(1.4, 0.8)} />
      <motion.circle cx="200" cy="200" r="9" fill={SOFT} {...pop(2)} />
      <Sparkle x={200} y={200} delay={2.1} />
    </>
  );
}

const clientTypes = [
  { key: "family", title: "Families", text: "A safe, spacious home near good schools." },
  { key: "investor", title: "Investors", text: "Property that grows in value and earns rent." },
  { key: "land", title: "Land & Commercial", text: "Plots, shops and offices for business." },
] as const;

function SceneClients({ type }: { type: (typeof clientTypes)[number]["key"] }) {
  if (type === "family") {
    return (
      <g key="family">
        <Person x={80} y={290} s={0.95} delay={0} />
        <Person x={150} y={290} s={0.85} tie={false} delay={0.2} />
        <Person x={208} y={290} s={0.55} tie={false} delay={0.4} />
        <House x={315} y={290} delay={0.6} />
        <motion.path d="M240 120 q8 -14 16 0 q8 -14 16 0 q0 12 -16 22 q-16 -10 -16 -22 Z" fill={GOLD} {...pop(2)} />
      </g>
    );
  }
  if (type === "investor") {
    return (
      <g key="investor">
        <Person x={95} y={290} delay={0} />
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            x={190 + i * 45} width="30" fill={GOLD} opacity={0.4 + i * 0.18}
            initial={{ y: 290, height: 0 }}
            animate={{ y: 290 - (50 + i * 45), height: 50 + i * 45 }}
            transition={{ duration: 0.9, delay: 0.5 + i * 0.2, ease }}
          />
        ))}
        <motion.path d="M190 210 L250 170 L300 150 L360 80 M340 80 H360 V100" fill="none" stroke={SOFT} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" {...draw(1.4)} />
      </g>
    );
  }
  return (
    <g key="land">
      <motion.path d="M30 290 L120 230 L280 230 L190 290 Z" fill={`${GOLD}22`} stroke={GOLD} strokeWidth="2.5" {...draw(0)} />
      <motion.path d="M75 260 L165 260 M110 245 L230 245" stroke={GOLD} strokeOpacity="0.5" strokeDasharray="4 6" {...draw(0.6)} />
      <motion.path d="M155 250 V170" stroke={SOFT} strokeWidth="3" {...draw(0.9, 0.6)} />
      <motion.path d="M155 170 L195 182 L155 194 Z" fill={GOLD} {...pop(1.4)} />
      <motion.path d="M290 290 V110 H360 V290 M300 130 H350 M300 160 H350 M300 190 H350 M300 220 H350 M300 250 H350" fill="none" stroke={GOLD} strokeWidth="2.5" {...draw(0.4, 1.6)} />
    </g>
  );
}

function SceneSearch() {
  return (
    <>
      <motion.path d="M20 290 H380" stroke={GOLD} strokeOpacity="0.4" {...draw(0)} />
      <House x={110} y={290} s={0.7} delay={0} />
      <House x={210} y={290} s={0.9} delay={0.3} />
      <House x={310} y={290} s={0.7} delay={0.6} />
      <motion.g initial={{ x: 60, y: 120, opacity: 0 }} animate={{ x: [60, 300, 160], y: [120, 110, 150], opacity: 1 }} transition={{ duration: 3, delay: 1.2, ease: "easeInOut" }}>
        <circle r="30" fill={`${SOFT}18`} stroke={SOFT} strokeWidth="4" />
        <path d="M21 21 L48 48" stroke={SOFT} strokeWidth="8" strokeLinecap="round" />
      </motion.g>
      <motion.g {...pop(4.2)}>
        <circle cx="210" cy="78" r="16" fill={GOLD} />
        <path d="M202 78 l6 6 l11 -12" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
    </>
  );
}

function SceneSign() {
  return (
    <>
      <motion.rect x="110" y="30" width="180" height="250" rx="10" fill="#0b0b0f" stroke={GOLD} strokeWidth="2.5" {...draw(0)} />
      <motion.text x="200" y="68" textAnchor="middle" fill={SOFT} fontSize="16" fontWeight="700" letterSpacing="4" {...pop(0.6)}>
        AGREEMENT
      </motion.text>
      {[95, 115, 135, 155, 175].map((y, i) => (
        <motion.path key={y} d={`M135 ${y} H${i % 2 ? 245 : 265}`} stroke={GOLD} strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" {...draw(0.7 + i * 0.12, 0.4)} />
      ))}
      <motion.path d="M135 245 H265" stroke={GOLD} strokeOpacity="0.4" {...draw(1.4, 0.4)} />
      <motion.path d="M140 238 c10 -30 18 -30 20 -4 c2 18 10 -26 22 -8 c8 12 10 2 18 -6 c6 -6 10 10 18 4 c8 -6 14 -2 22 0" fill="none" stroke={SOFT} strokeWidth="3" strokeLinecap="round" {...draw(1.8, 1.6)} />
      <motion.g initial={{ x: 140, y: 238, rotate: 0 }} animate={{ x: [140, 182, 220, 260], y: [238, 226, 232, 238] }} transition={{ duration: 1.6, delay: 1.8 }}>
        <path d="M0 0 L8 -6 L48 -46 L40 -54 L0 -14 Z" fill={GOLD} />
      </motion.g>
    </>
  );
}

function SceneKeys() {
  return (
    <>
      {/* Door opening with light pouring out */}
      <motion.path d="M150 290 V70 H250 V290" fill="none" stroke={GOLD} strokeWidth="3" {...draw(0)} />
      <motion.polygon points="150,70 250,70 330,290 70,290" fill={`${SOFT}`} initial={{ opacity: 0 }} animate={{ opacity: [0, 0.18, 0.12] }} transition={{ duration: 1.5, delay: 0.8 }} />
      <motion.rect x="150" y="70" width="100" height="220" fill="#0b0b0f" stroke={GOLD} strokeWidth="2.5" style={{ originX: "150px" }} initial={{ scaleX: 1 }} animate={{ scaleX: 0.25 }} transition={{ duration: 1.2, delay: 0.6, ease }} />
      {/* Key */}
      <motion.g initial={{ x: 200, y: 330, rotate: -40, opacity: 0 }} animate={{ x: 200, y: 175, rotate: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 1.2, ease }}>
        <circle r="22" fill="none" stroke={SOFT} strokeWidth="6" />
        <path d="M22 0 H80 M62 0 V16 M74 0 V12" stroke={SOFT} strokeWidth="6" strokeLinecap="round" />
      </motion.g>
      <motion.g initial={{ scale: 3, opacity: 0, rotate: -20 }} animate={{ scale: 1, opacity: 1, rotate: -12 }} transition={{ duration: 0.5, delay: 2.4, ease: "backOut" }} style={{ originX: "200px", originY: "62px" }}>
        <rect x="95" y="40" width="210" height="44" rx="8" fill="#0b0b0f" fillOpacity="0.85" stroke={GOLD} strokeWidth="4" />
        <text x="200" y="70" textAnchor="middle" fill={GOLD} fontSize="20" fontWeight="800" letterSpacing="3">DEAL CLOSED</text>
      </motion.g>
      {Array.from({ length: 18 }, (_, i) => (
        <motion.rect
          key={i} width="6" height="10" fill={i % 2 ? GOLD : SOFT}
          initial={{ x: 200, y: 170, opacity: 0 }}
          animate={{ x: r2(200 + Math.cos(i * 2.1) * (90 + (i % 5) * 20)), y: [170, 60 + (i % 4) * 20, 320], opacity: [0, 1, 0], rotate: i * 40 }}
          transition={{ duration: 2.2, delay: 2.6 + (i % 6) * 0.05, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}
    </>
  );
}

const scenes = [
  { step: "01", title: "It starts with a handshake", text: "I listen first — your needs, budget and dreams — and we agree on a plan built on trust." },
  { step: "02", title: "Every client, every dream", text: "Families, investors and businesses — each gets advice made for their goal." },
  { step: "03", title: "Shortlist & visit", text: "I search, verify and shortlist only the properties that truly fit, then visit them with you." },
  { step: "04", title: "Sign with confidence", text: "Price negotiated, papers checked, agreement signed — no surprises." },
  { step: "05", title: "Keys in your hand", text: "Registration, handover and the moment the door opens. Deal closed." },
];

export default function DealStory() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [clientIdx, setClientIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = scenes.length;
    const i = Math.min(n - 1, Math.floor(v * n));
    setActive(i);
    // Within scene 2, scrolling also flips through the three client types.
    const inScene = v * n - 1;
    if (i === 1) setClientIdx(Math.min(2, Math.max(0, Math.floor(inScene * 3))));
  });

  const scene = scenes[active];
  const client = clientTypes[clientIdx];

  return (
    <section ref={ref} id="story" className="relative bg-black" style={{ height: `${scenes.length * 90}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-start overflow-hidden lg:items-center">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[160px]" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-4 px-4 pb-24 pt-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-0">
          <div className="order-2 lg:order-1">
            <p className="text-xs uppercase tracking-[5px] text-gold">How a deal comes together</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease }}
              >
                <p className="text-shimmer mt-2 font-display text-5xl font-bold sm:text-8xl lg:mt-4">{scene.step}</p>
                <h2 className="mt-1 text-2xl font-semibold sm:text-5xl lg:mt-2">{scene.title}</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400 sm:text-lg sm:leading-7 lg:mt-4">{scene.text}</p>
                {active === 1 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {clientTypes.map((c, i) => (
                      <button
                        key={c.key}
                        onClick={() => setClientIdx(i)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${i === clientIdx ? "bg-gold text-black" : "glass text-zinc-300"}`}
                      >
                        {c.title}
                      </button>
                    ))}
                  </div>
                )}
                {active === scenes.length - 1 && (
                  <a
                    href={waLink("Hello Arif, I'd like to start my property journey.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block rounded-full bg-gold px-8 py-3.5 font-semibold text-black shadow-[0_0_40px_rgba(201,164,76,.5)] transition hover:scale-105"
                  >
                    Start your deal with Arif
                  </a>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex items-center gap-3 lg:mt-8">
              {scenes.map((s, i) => (
                <span key={s.step} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-gold" : i < active ? "w-4 bg-gold/60" : "w-4 bg-white/15"}`} />
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="glass card-glow relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] p-3 lg:p-4">
              <svg viewBox="0 0 400 320" className="mx-auto max-h-[30svh] w-full lg:max-h-none" role="img" aria-label={scene.title}>
                {/* Keyed remount: each scene redraws itself; no exit wait, so fast scrolling can't desync it. */}
                <g key={active === 1 ? `c-${client.key}` : active}>
                  {active === 0 && <SceneHandshake />}
                  {active === 1 && <SceneClients type={client.key} />}
                  {active === 2 && <SceneSearch />}
                  {active === 3 && <SceneSign />}
                  {active === 4 && <SceneKeys />}
                </g>
              </svg>
              {active === 1 && (
                <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-gold">{client.text}</p>
              )}
              {active === 0 && (
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/60 py-1 pl-1 pr-3">
                  <span className="relative h-8 w-8 overflow-hidden rounded-full border border-gold">
                    <Image src="/profile.png" alt="Arif" fill sizes="32px" className="object-cover" />
                  </span>
                  <span className="text-xs text-zinc-300">Your Realtor</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <motion.div style={{ width: bar }} className="absolute bottom-0 left-0 h-[2px] bg-gold" />
      </div>
    </section>
  );
}
