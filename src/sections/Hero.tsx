"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaPhoneAlt, FaWhatsapp, FaSearch, FaCheckCircle } from "react-icons/fa";
import profile, { waLink } from "@/data/profile";
import { heroImage } from "@/data/properties";

const City3D = dynamic(() => import("@/components/City3D"), { ssr: false });

const areas = ["Gulshan", "Banani", "Bashundhara R/A", "Uttara", "Dhanmondi", "Purbachal", "Chattogram — Khulshi", "Chattogram — Nasirabad", "Chattogram — Agrabad", "Cumilla — Kandirpar", "Cumilla — Kotbari"];
const goals = ["Buy", "Rent", "Sell"] as const;
const kinds = ["Apartment", "Duplex / House", "Land / Plot", "Commercial"];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const select =
  "w-full appearance-none rounded-xl border border-white/10 bg-black/50 px-4 py-3.5 text-sm text-white outline-none transition focus:border-gold";

export default function Hero() {
  const [goal, setGoal] = useState<(typeof goals)[number]>("Buy");
  const [use3D, setUse3D] = useState(false);

  // 3D city only where WebGL works and the visitor hasn't asked for reduced motion; photo otherwise.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = document.createElement("canvas").getContext("webgl2");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- capability check needs the browser
    setUse3D(!reduced && !!gl);
  }, []);

  // Finder has no backend: it opens a prefilled WhatsApp inquiry.
  const onFind = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = `Hello Arif, I want to ${goal.toLowerCase()} a ${f.get("kind")} in ${f.get("area")}. Budget: ${f.get("budget") || "flexible"}.`;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black">
      <motion.div
        initial={{ scale: 1.25 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image src={heroImage} alt="Luxury home in Dhaka at dusk" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      {use3D && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
          <City3D />
        </motion.div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-black/50 lg:hidden" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      {!use3D && <div className="bg-grid absolute inset-0 opacity-60" />}
      <div className="animate-drift absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-gold/20 blur-[160px]" />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-4 pb-10 pt-32 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:pt-36">
        <div>
          <motion.p {...rise(0.2)} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[4px] text-gold">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" /> {profile.title}
          </motion.p>

          <motion.p {...rise(0.35)} className="mt-8 font-display text-2xl text-zinc-300 sm:text-3xl">
            Hello, I&apos;m <span className="text-shimmer font-semibold">{profile.name}</span> —
          </motion.p>

          <motion.h1 {...rise(0.5)} className="mt-2 text-5xl font-semibold leading-[1] sm:text-7xl xl:text-8xl">
            Your Realtor for <span className="text-shimmer italic">finest homes</span> in Bangladesh
          </motion.h1>

          <motion.div {...rise(0.65)} className="mt-6 h-9 text-xl text-zinc-200 sm:text-2xl">
            <TypeAnimation
              sequence={["Buy your dream home.", 2200, "Sell at the right price.", 2200, "Rent with confidence.", 2200]}
              repeat={Infinity}
              className="font-display"
            />
          </motion.div>

          <motion.div {...rise(0.8)} className="mt-8 flex flex-wrap gap-4">
            <a
              href="#properties"
              className="rounded-full bg-gold px-8 py-3.5 font-semibold text-black shadow-[0_0_40px_rgba(201,164,76,.5)] transition hover:scale-105 hover:bg-gold-soft"
            >
              Explore Properties
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="glass flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition hover:border-gold/60 hover:text-gold"
            >
              <FaPhoneAlt size={14} /> {profile.phone}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass card-glow animate-float hidden rounded-[2rem] p-6 lg:block"
        >
          <div className="relative mx-auto h-40 w-40">
            <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent,#c9a44c,transparent_45%,#f8e7b0,transparent_80%)]" />
            <div className="absolute inset-[3px] overflow-hidden rounded-full bg-zinc-900">
              <Image src="/profile.png" alt={`${profile.name}, Realtor in Dhaka`} fill sizes="160px" className="object-cover" />
            </div>
          </div>
          <p className="mt-5 text-center font-display text-4xl font-semibold">{profile.name}</p>
          <p className="text-center text-xs uppercase tracking-[3px] text-gold">Dhaka · Chattogram · Cumilla</p>
          <ul className="mt-5 space-y-2 text-sm text-zinc-300">
            {["Verified properties", "Honest, transparent pricing", "Reply within hours"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <FaCheckCircle className="text-gold" /> {t}
              </li>
            ))}
          </ul>
          <a
            href={waLink("Hello Arif, I'd like to discuss a property.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600"
          >
            <FaWhatsapp size={18} /> Chat on WhatsApp
          </a>
        </motion.div>
      </div>

      <motion.form
        {...rise(1)}
        onSubmit={onFind}
        className="glass card-glow relative mx-auto mb-10 w-[calc(100%-2rem)] max-w-5xl rounded-3xl p-4 sm:p-5"
      >
        <div className="mb-4 flex gap-2">
          {goals.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGoal(g)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                goal === g ? "bg-gold text-black" : "text-zinc-300 hover:text-gold"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <select name="area" aria-label="Area" className={select} defaultValue="Gulshan">
            {areas.map((a) => <option key={a}>{a}</option>)}
          </select>
          <select name="kind" aria-label="Property type" className={select}>
            {kinds.map((k) => <option key={k}>{k}</option>)}
          </select>
          <input name="budget" aria-label="Budget" placeholder="Budget (e.g. ৳ 1.5 Crore)" className={select} />
          <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-gold px-7 py-3.5 font-semibold text-black transition hover:bg-gold-soft">
            <FaSearch /> Find
          </button>
        </div>
      </motion.form>

      <div className="relative overflow-hidden border-y border-gold/15 bg-black/60 py-5 backdrop-blur">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...areas, ...areas].map((a, i) => (
            <span key={i} className="flex items-center gap-12 font-display text-2xl text-zinc-500">
              {a} <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
