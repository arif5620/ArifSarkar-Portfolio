"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import SectionHeading from "@/components/SectionHeading";
import { bdPath } from "@/data/bdMap";
import { waLink } from "@/data/profile";

// x/y are positions on the 400x567 map viewBox (from lat/long).
const cities = [
  {
    name: "Dhaka",
    x: 205.1,
    y: 268.6,
    tag: "The capital",
    text: "Apartments, duplexes, offices and land across the city's most wanted neighbourhoods.",
    areas: ["Gulshan", "Banani", "Bashundhara", "Uttara", "Dhanmondi", "Purbachal"],
  },
  {
    name: "Chattogram",
    x: 321.7,
    y: 403.4,
    tag: "The port city",
    text: "Family homes and commercial space in the country's business and port capital.",
    areas: ["Khulshi", "Nasirabad", "Panchlaish", "Agrabad", "GEC"],
  },
  {
    name: "Cumilla",
    x: 270.6,
    y: 301.1,
    tag: "The value pick",
    text: "Land, plots and affordable homes on the Dhaka–Chattogram corridor.",
    areas: ["Kandirpar", "Tomsom Bridge", "Kotbari", "Ranir Bazar", "Jhautola"],
  },
];

const [dhaka, ctg, cum] = cities;
// Dhaka → Chattogram → Cumilla, curved for a flight-path feel.
const route = `M${dhaka.x} ${dhaka.y} Q${dhaka.x - 5} ${ctg.y + 10} ${ctg.x} ${ctg.y} Q${ctg.x + 20} ${cum.y + 30} ${cum.x} ${cum.y}`;

export default function ServiceAreas() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % cities.length), 3500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="areas" className="relative overflow-hidden bg-[#09090B] py-20 lg:py-28">
      <div className="animate-drift absolute -left-40 top-20 h-96 w-96 rounded-full bg-gold/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Where I Work"
          title="Dhaka · Chattogram · Cumilla"
          text="One trusted Realtor across three cities — from the capital to the port city and the heart of the corridor."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-10 rounded-full bg-gold/10 blur-[80px]" />
            <svg viewBox="0 0 400 567" className="relative w-full" role="img" aria-label="Map of Bangladesh showing Dhaka, Chattogram and Cumilla">
              <defs>
                <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1.3" fill="#c9a44c" opacity="0.35" />
                </pattern>
                <linearGradient id="routeGrad" x1="0" x2="1">
                  <stop offset="0" stopColor="#f8e7b0" />
                  <stop offset="1" stopColor="#c9a44c" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <motion.path
                d={bdPath}
                fill="url(#dots)"
                stroke="#c9a44c"
                strokeOpacity="0.55"
                strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />

              <motion.path
                id="route"
                d={route}
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1 0"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, delay: 1.5, ease: "easeInOut" }}
              />

              <circle r="6" fill="#fff" filter="url(#glow)">
                <animateMotion dur="5s" repeatCount="indefinite" rotate="auto" begin="4s">
                  <mpath href="#route" />
                </animateMotion>
              </circle>

              {cities.map((c, i) => (
                <g key={c.name} className="cursor-pointer" onClick={() => { setActive(i); setPaused(true); }}>
                  <circle cx={c.x} cy={c.y} r="10" fill="none" stroke="#c9a44c" strokeWidth="2">
                    <animate attributeName="r" values="8;26" dur="2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0" dur="2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={c.x} cy={c.y} r={active === i ? 10 : 7} fill={active === i ? "#f8e7b0" : "#c9a44c"} filter="url(#glow)" className="transition-all duration-500" />
                  <text
                    x={c.x + (c.name === "Dhaka" ? -16 : 16)}
                    y={c.y + 5}
                    textAnchor={c.name === "Dhaka" ? "end" : "start"}
                    className="font-display"
                    fontSize={active === i ? 26 : 20}
                    fontWeight="600"
                    fill={active === i ? "#f8e7b0" : "#e4e4e7"}
                    style={{ transition: "all .5s" }}
                  >
                    {c.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="space-y-4">
            {cities.map((c, i) => (
              <motion.div
                key={c.name}
                role="button"
                tabIndex={0}
                aria-expanded={active === i}
                onClick={() => { setActive(i); setPaused(true); }}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(i); setPaused(true); } }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`glass block w-full rounded-3xl p-6 text-left transition duration-500 ${
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
