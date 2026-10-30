"use client";

import { useState } from "react";
import { FaBed, FaBath, FaRulerCombined, FaWhatsapp } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import SectionHeading from "@/components/SectionHeading";
import { properties } from "@/data/properties";
import { waLink } from "@/data/profile";

const tabs = [
  { id: "sale", label: "Buy" },
  { id: "rent", label: "Rent" },
] as const;

export default function Properties() {
  const [tab, setTab] = useState<"sale" | "rent">("sale");
  const list = properties.filter((p) => p.type === tab);

  return (
    <section id="properties" className="bg-black py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Featured Properties"
          title="Homes & spaces in Dhaka"
          text="A selection of properties for sale and rent. Ask me for off-market options matching your budget."
        />

        <div className="mt-10 flex justify-center">
          <div className="flex rounded-full border border-white/10 p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-8 py-2.5 text-sm font-semibold transition ${
                  tab === t.id ? "bg-gold text-black" : "text-zinc-300 hover:text-gold"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <article key={p.id} className="glass card-glow group overflow-hidden rounded-3xl transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_70px_-15px_rgba(201,164,76,.4)]">
              <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
                <div className="bg-grid absolute inset-0" />
                <div className="absolute h-32 w-32 rounded-full bg-gold/20 blur-3xl transition duration-700 group-hover:scale-150" />
                <MdApartment size={72} className="relative text-gold/70 transition duration-700 group-hover:scale-110" />
                <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-black">
                  {p.type === "sale" ? "For Sale" : "For Rent"}
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[3px] text-zinc-500">{p.kind}</p>
                <h3 className="mt-1 text-2xl font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{p.area}</p>
                <p className="mt-4 text-xl font-semibold text-gold">{p.price}</p>

                <div className="mt-4 flex gap-5 border-t border-white/10 pt-4 text-sm text-zinc-400">
                  {p.beds > 0 && (
                    <span className="flex items-center gap-2"><FaBed /> {p.beds}</span>
                  )}
                  <span className="flex items-center gap-2"><FaBath /> {p.baths}</span>
                  <span className="flex items-center gap-2"><FaRulerCombined /> {p.size}</span>
                </div>

                <a
                  href={waLink(`Hello Arif, I'm interested in "${p.title}" in ${p.area} (${p.price}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 rounded-full border border-gold/40 py-3 text-sm font-semibold text-gold transition hover:bg-gold hover:text-black"
                >
                  <FaWhatsapp /> Inquire
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-zinc-500">
          Looking to sell your property?{" "}
          <a href="#contact" className="text-gold underline-offset-4 hover:underline">
            Talk to me about a free valuation
          </a>
        </p>
      </div>
    </section>
  );
}
