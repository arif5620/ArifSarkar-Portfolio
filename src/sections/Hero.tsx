"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { FaPhoneAlt, FaWhatsapp, FaSearch, FaCheckCircle } from "react-icons/fa";
import profile, { waLink } from "@/data/profile";
import { heroImage } from "@/data/properties";

const City3D = dynamic(() => import("@/components/City3D"), { ssr: false });

const areas = ["Gulshan", "Banani", "Bashundhara R/A", "Uttara", "Dhanmondi", "Purbachal", "Chattogram — Khulshi", "Chattogram — Nasirabad", "Chattogram — Agrabad", "Cumilla — Kandirpar", "Cumilla — Kotbari"];
const goals = ["Buy", "Rent", "Sell"] as const;
const kinds = ["Apartment", "Duplex / House", "Land / Plot", "Commercial"];

const select =
  "w-full appearance-none rounded-xl border border-white/15 bg-black/50 px-4 py-3.5 text-sm text-white outline-none transition focus:border-gold";

// The hero is always dark (photo background) in both light and dark mode.
export default function Hero() {
  const [goal, setGoal] = useState<(typeof goals)[number]>("Buy");
  const [use3D, setUse3D] = useState(false);

  // 3D skyline only where WebGL works and motion isn't reduced; the photo stays as the fallback.
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
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black text-white">
      <Image
        src={heroImage}
        alt="Luxury home in Bangladesh at dusk"
        fill
        priority
        sizes="100vw"
        className="animate-kenburns object-cover"
      />
      {use3D && (
        <div className="animate-fade absolute inset-0">
          <City3D />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-black/45 lg:hidden" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-4 pb-10 pt-32 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:pt-36">
        <div>
          <p className="glass-dark animate-rise inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[4px] text-gold-soft">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" /> {profile.title}
          </p>

          <p className="animate-rise mt-8 font-display text-2xl text-zinc-300 [animation-delay:.1s] sm:text-3xl">
            Hello, I&apos;m <span className="text-shimmer font-semibold">{profile.name}</span> —
          </p>

          <h1 className="animate-rise mt-2 text-5xl font-semibold leading-[1] [animation-delay:.2s] sm:text-7xl xl:text-8xl">
            Your Realtor for <span className="text-shimmer italic">finest homes</span> in Bangladesh
          </h1>

          <div className="animate-rise mt-6 h-9 text-xl text-zinc-200 [animation-delay:.3s] sm:text-2xl">
            <TypeAnimation
              sequence={["Buy your dream home.", 2200, "Sell at the right price.", 2200, "Rent with confidence.", 2200]}
              repeat={Infinity}
              className="font-display"
            />
          </div>

          <div className="animate-rise mt-8 flex flex-wrap gap-4 [animation-delay:.4s]">
            <a
              href="#properties"
              className="rounded-full bg-gold px-8 py-3.5 font-semibold text-black shadow-[0_0_40px_rgba(201,164,76,.45)] transition hover:scale-105 hover:bg-gold-soft"
            >
              Explore Properties
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="glass-dark flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition hover:text-gold-soft"
            >
              <FaPhoneAlt size={14} /> {profile.phone}
            </a>
          </div>
        </div>

        <div className="glass-dark animate-rise hidden rounded-[2rem] p-6 [animation-delay:.5s] lg:block">
          <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-2 border-gold">
            <Image src="/profile.png" alt={`${profile.name}, Realtor in Bangladesh`} fill sizes="144px" className="object-cover" />
          </div>
          <p className="mt-5 text-center font-display text-4xl font-semibold">{profile.name}</p>
          <p className="text-center text-xs uppercase tracking-[3px] text-gold-soft">Dhaka · Chattogram · Cumilla</p>
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
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            <FaWhatsapp size={18} /> Chat on WhatsApp
          </a>
        </div>
      </div>

      <form
        onSubmit={onFind}
        className="glass-dark animate-rise relative mx-auto mb-10 w-[calc(100%-2rem)] max-w-5xl rounded-3xl p-4 [animation-delay:.6s] sm:p-5"
      >
        <div className="mb-4 flex gap-2">
          {goals.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGoal(g)}
              aria-pressed={goal === g}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                goal === g ? "bg-gold text-black" : "text-zinc-300 hover:text-gold-soft"
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
          <input name="budget" aria-label="Budget" placeholder="Budget (e.g. ৳ 1.5 Crore)" className={`${select} placeholder:text-zinc-400`} />
          <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-gold px-7 py-3.5 font-semibold text-black transition hover:bg-gold-soft">
            <FaSearch /> Find
          </button>
        </div>
      </form>

      <div className="relative overflow-hidden border-y border-gold/20 bg-black/70 py-5">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...areas, ...areas].map((a, i) => (
            <span key={i} className="flex items-center gap-12 font-display text-2xl text-zinc-400">
              {a} <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
