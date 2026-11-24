"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { waLink } from "@/data/profile";

const areas = ["Gulshan", "Banani", "Bashundhara R/A", "Uttara", "Dhanmondi", "Purbachal", "Chattogram — Khulshi", "Chattogram — Nasirabad", "Chattogram — Agrabad", "Cumilla — Kandirpar", "Cumilla — Kotbari"];
const goals = ["Buy", "Rent", "Sell"] as const;
const kinds = ["Apartment", "Duplex / House", "Land / Plot", "Commercial"];

// Shared spring for the sliding gold "pill" behind the selected tab.
const pill = { type: "spring", stiffness: 420, damping: 34 } as const;

const select =
  "w-full appearance-none rounded-xl border border-line bg-ink px-4 py-3.5 text-sm text-fg outline-none transition focus:border-gold";

// Property finder + moving list of areas. No backend: it opens a prefilled WhatsApp inquiry.
export default function QuickFind() {
  const [goal, setGoal] = useState<(typeof goals)[number]>("Buy");

  const onFind = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = `Hello Arif, I want to ${goal.toLowerCase()} a ${f.get("kind")} in ${f.get("area")}. Budget: ${f.get("budget") || "flexible"}.`;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative z-10 bg-ink">
      <motion.form
        onSubmit={onFind}
        aria-label="Find a property"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass card-glow relative mx-auto mb-12 w-[calc(100%-2rem)] max-w-5xl rounded-3xl p-4 sm:p-5"
      >
        <div className="relative z-0 mb-4 flex items-center gap-2">
          {goals.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGoal(g)}
              aria-pressed={goal === g}
              className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                goal === g ? "text-black" : "text-soft hover:text-gold"
              }`}
            >
              {goal === g && <motion.span layoutId="hero-goal" className="absolute inset-0 -z-10 rounded-full bg-gold" transition={pill} />}
              {g}
            </button>
          ))}
          <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[3px] text-mute sm:block">Find your property</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <select name="area" aria-label="Area" className={select} defaultValue="Gulshan">
            {areas.map((a) => <option key={a}>{a}</option>)}
          </select>
          <select name="kind" aria-label="Property type" className={select}>
            {kinds.map((k) => <option key={k}>{k}</option>)}
          </select>
          <input name="budget" aria-label="Budget" placeholder="Budget (e.g. ৳ 1.5 Crore)" className={`${select} placeholder:text-mute-2`} />
          <button type="submit" className="btn-shine flex items-center justify-center gap-2 rounded-xl bg-gold px-7 py-3.5 font-semibold text-black transition hover:bg-gold-soft">
            <FaSearch /> Find
          </button>
        </div>
      </motion.form>

      <div aria-hidden className="relative overflow-hidden border-y border-line py-5">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...areas, ...areas].map((a, i) => (
            <span key={i} className="flex items-center gap-12 font-display text-2xl italic text-mute">
              {a} <span className="not-italic text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
