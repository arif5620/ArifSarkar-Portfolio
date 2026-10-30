"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp, FaHome } from "react-icons/fa";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import { bdPath } from "@/data/bdMap";
import { waLink } from "@/data/profile";
import { deals, sampleDeals, project } from "@/data/deals";

// Real deals only in production; sample pins help preview the design locally.
const shownDeals = deals.length || process.env.NODE_ENV === "production" ? deals : sampleDeals;

// x/y are positions on the 400x567 map (projected from lat/long); label sits where it can't be clipped.
const cities = [
  {
    name: "Dhaka",
    x: 205.1,
    y: 268.6,
    label: { dx: -18, dy: 7, anchor: "end" as const },
    tag: "The capital",
    deals: "Apartments · Duplexes · Offices",
    text: "Apartments, duplexes, offices and land across the city's most wanted neighbourhoods.",
    areas: ["Gulshan", "Banani", "Bashundhara", "Uttara", "Dhanmondi", "Purbachal"],
  },
  {
    name: "Chattogram",
    x: 321.7,
    y: 403.4,
    label: { dx: -8, dy: 44, anchor: "middle" as const },
    tag: "The port city",
    deals: "Family homes · Commercial",
    text: "Family homes and commercial space in the country's business and port capital.",
    areas: ["Khulshi", "Nasirabad", "Panchlaish", "Agrabad", "GEC"],
  },
  {
    name: "Cumilla",
    x: 270.6,
    y: 301.1,
    label: { dx: 18, dy: 7, anchor: "start" as const },
    tag: "The value pick",
    deals: "Land · Plots · Homes",
    text: "Land, plots and affordable homes on the Dhaka–Chattogram corridor.",
    areas: ["Kandirpar", "Tomsom Bridge", "Kotbari", "Ranir Bazar", "Jhautola"],
  },
];

const [dhaka, ctg, cum] = cities;
// Dhaka → Chattogram → Cumilla.
const route = `M${dhaka.x} ${dhaka.y} Q${dhaka.x - 5} ${ctg.y + 10} ${ctg.x} ${ctg.y} Q${ctg.x + 20} ${cum.y + 30} ${cum.x} ${cum.y}`;
const trail = [0, 1, 2, 3, 4, 5];
// Where each pop-up sits relative to its pin, chosen to keep labels and route visible.
const bubblePos: Record<string, string> = {
  Dhaka: "-translate-x-1/2 -translate-y-[150%]",
  Cumilla: "-translate-x-[15%] -translate-y-[175%]",
  Chattogram: "-translate-x-[118%] -translate-y-1/2",
};

export default function ServiceAreas() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pick = (i: number) => { setActive(i); setPaused(true); };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % cities.length), 3500);
    return () => clearInterval(t);
  }, [paused]);

  const city = cities[active];
  const [hovered, setHovered] = useState<number | null>(null);
  const deal = hovered === null ? null : shownDeals[hovered];

  return (
    <section id="areas" className="relative overflow-hidden bg-[#09090B] py-20 lg:py-28">
      <div className="animate-drift absolute -left-40 top-20 h-96 w-96 rounded-full bg-gold/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Where I Work"
          title="Dhaka · Chattogram · Cumilla"
          text="One trusted Realtor across three cities — from the capital to the port city and the heart of the corridor."
        />

        {shownDeals.length > 0 && (
          <p className="mt-8 text-center text-sm text-zinc-400">
            <span className="text-gold">◆</span> {shownDeals.length} deals closed across three cities — hover a pin to see one
          </p>
        )}

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <TiltCard className="glass card-glow mx-auto w-full max-w-md rounded-[2rem] p-4 sm:p-6">
            <div className="relative" style={{ transform: "translateZ(40px)" }}>
              <svg viewBox="-10 -10 420 590" className="relative w-full" role="img" aria-label="Map of Bangladesh showing Dhaka, Chattogram and Cumilla">
                <defs>
                  <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="1.2" fill="#c9a44c" opacity="0.4" />
                  </pattern>
                  <linearGradient id="routeGrad" x1="0" x2="1">
                    <stop offset="0" stopColor="#f8e7b0" />
                    <stop offset="1" stopColor="#c9a44c" />
                  </linearGradient>
                  <linearGradient id="scan" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#f8e7b0" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#f8e7b0" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#f8e7b0" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id="bdClip"><path d={bdPath} /></clipPath>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="soft"><feGaussianBlur stdDeviation="8" /></filter>
                </defs>

                {/* Extruded depth layer */}
                <path d={bdPath} transform="translate(0 12)" fill="#c9a44c" opacity="0.12" filter="url(#soft)" />

                <motion.path
                  d={bdPath}
                  fill="url(#dots)"
                  stroke="#c9a44c"
                  strokeOpacity="0.7"
                  strokeWidth="1.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />

                {/* Hologram scan line */}
                <g clipPath="url(#bdClip)">
                  <rect x="0" width="400" height="90" fill="url(#scan)">
                    <animate attributeName="y" values="-90;567" dur="4s" repeatCount="indefinite" />
                  </rect>
                </g>

                <path id="route" d={route} fill="none" stroke="#c9a44c" strokeOpacity="0.25" strokeWidth="6" strokeLinecap="round" />
                <motion.path
                  d={route}
                  fill="none"
                  stroke="url(#routeGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="8 10"
                  className="animate-dash"
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1.5 }}
                />

                {/* Light trail following a golden house along the route */}
                {trail.map((k) => (
                  <circle key={k} r={5 - k * 0.7} fill="#f8e7b0" opacity={0.8 - k * 0.13}>
                    <animateMotion dur="6s" repeatCount="indefinite" begin={`${2 + k * 0.07}s`}>
                      <mpath href="#route" />
                    </animateMotion>
                  </circle>
                ))}
                <g filter="url(#glow)">
                  <circle r="13" fill="#0b0b0f" stroke="#f8e7b0" strokeWidth="2" />
                  <path d="M-7 1 L0 -6 L7 1 M-5 0 V7 H5 V0" fill="none" stroke="#f8e7b0" strokeWidth="2" strokeLinejoin="round" />
                  <animateMotion dur="6s" repeatCount="indefinite" begin="2s">
                    <mpath href="#route" />
                  </animateMotion>
                </g>

                {shownDeals.map((d, i) => {
                  const { x, y } = project(d.lat, d.lon);
                  return (
                    <motion.g
                      key={d.area + i}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 2.5 + i * 0.12, type: "spring" }}
                      style={{ originX: `${x}px`, originY: `${y}px` }}
                      className="cursor-pointer"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => setHovered(i)}
                    >
                      <circle cx={x} cy={y} r="9" fill="transparent" />
                      <rect x={x - 3.5} y={y - 3.5} width="7" height="7" transform={`rotate(45 ${x} ${y})`} fill={hovered === i ? "#fff" : "#f8e7b0"} filter="url(#glow)" />
                    </motion.g>
                  );
                })}

                {cities.map((c, i) => {
                  const on = active === i;
                  const w = c.name.length * 12 + 24;
                  const lx = c.x + c.label.dx;
                  const ly = c.y + c.label.dy;
                  const rx = c.label.anchor === "end" ? lx - w + 10 : c.label.anchor === "middle" ? lx - w / 2 : lx - 10;
                  return (
                    <g key={c.name} className="cursor-pointer" onClick={() => pick(i)}>
                      <circle cx={c.x} cy={c.y} r="10" fill="none" stroke="#c9a44c" strokeWidth="2">
                        <animate attributeName="r" values="8;30" dur="2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0" dur="2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                      </circle>
                      <circle cx={c.x} cy={c.y} r={on ? 10 : 7} fill={on ? "#f8e7b0" : "#c9a44c"} filter="url(#glow)" style={{ transition: "all .5s" }} />
                      <rect x={rx} y={ly - 22} width={w} height={32} rx={16} fill={on ? "#c9a44c" : "#0b0b0f"} stroke="#c9a44c" strokeOpacity="0.6" style={{ transition: "all .5s" }} />
                      <text x={lx} y={ly} textAnchor={c.label.anchor} className="font-display" fontSize="21" fontWeight="700" fill={on ? "#000" : "#f5f1e8"}>
                        {c.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Pop-up "deal" bubble above the active city */}
              <AnimatePresence mode="wait">
                {deal ? (
                  <motion.div
                    key={`deal-${hovered}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[140%]"
                    style={{ left: `${((project(deal.lat, deal.lon).x + 10) / 420) * 100}%`, top: `${((project(deal.lat, deal.lon).y + 10) / 590) * 100}%` }}
                  >
                    <div className="whitespace-nowrap rounded-xl border border-gold/50 bg-black/85 px-3 py-2 text-xs shadow-[0_10px_30px_rgba(201,164,76,.4)]">
                      <p className="font-semibold text-gold">✓ {deal.type}</p>
                      <p className="text-zinc-300">{deal.area}, {deal.city} · {deal.year}</p>
                    </div>
                  </motion.div>
                ) : (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`pointer-events-none absolute z-10 ${bubblePos[city.name]}`}
                  style={{ left: `${((city.x + 10) / 420) * 100}%`, top: `${((city.y + 10) / 590) * 100}%` }}
                >
                  <div className="glass flex items-center gap-3 whitespace-nowrap rounded-2xl border-gold/40 bg-black/70 px-4 py-2.5 shadow-[0_10px_40px_rgba(201,164,76,.35)]">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-black"><FaHome size={14} /></span>
                    <div>
                      <p className="text-sm font-semibold">{city.name}</p>
                      <p className="text-[11px] text-gold">{city.deals}</p>
                    </div>
                  </div>
                </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TiltCard>

          <div className="space-y-4">
            {cities.map((c, i) => (
              <motion.div
                key={c.name}
                role="button"
                tabIndex={0}
                aria-expanded={active === i}
                onClick={() => pick(i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(i); } }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`glass block w-full cursor-pointer rounded-3xl p-6 text-left transition duration-500 ${
                  active === i ? "card-glow scale-[1.02] border-gold/40 shadow-[0_20px_60px_-20px_rgba(201,164,76,.5)]" : "opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-semibold">{c.name}</h3>
                  <span className="text-xs uppercase tracking-[3px] text-gold">{c.tag}</span>
                </div>
                <p className="mt-2 text-zinc-400">{c.text}</p>
                {active === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.areas.map((a) => (
                        <span key={a} className="rounded-full border border-gold/30 px-3 py-1 text-xs text-zinc-300">{a}</span>
                      ))}
                    </div>
                    <a
                      href={waLink(`Hello Arif, I'm looking for property in ${c.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
                    >
                      <FaWhatsapp /> Ask about {c.name}
                    </a>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
