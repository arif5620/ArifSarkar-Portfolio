"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaPhoneAlt, FaWhatsapp, FaShieldAlt, FaMapMarkerAlt } from "react-icons/fa";
import profile, { waLink } from "@/data/profile";

const paths = [
  { label: "Buy", text: "Find your home or investment", href: "#properties" },
  { label: "Sell", text: "Get the right price, faster", href: "#contact" },
  { label: "Rent", text: "Quality homes and offices", href: "#properties" },
];

const areas = ["Gulshan", "Banani", "Baridhara", "Bashundhara R/A", "Uttara", "Dhanmondi", "Mohammadpur", "Mirpur", "Purbachal", "Motijheel"];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-black pt-32 lg:pt-40">
      <div className="bg-grid absolute inset-0" />
      <div className="animate-drift absolute -right-40 -top-20 h-[34rem] w-[34rem] rounded-full bg-gold/20 blur-[170px]" />
      <div className="animate-drift absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-amber-700/15 blur-[150px] [animation-delay:-7s]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p {...rise(0)} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[4px] text-gold">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" /> Dhaka, Bangladesh
          </motion.p>

          <motion.h1 {...rise(0.15)} className="mt-6 text-5xl font-semibold leading-[1.02] sm:text-7xl lg:text-8xl">
            Your trusted <br />
            <span className="text-shimmer">Realtor</span> in Dhaka
          </motion.h1>

          <motion.div {...rise(0.3)} className="mt-6 h-9 text-2xl text-zinc-200 sm:text-3xl">
            <TypeAnimation
              sequence={["Buy your dream home.", 2200, "Sell at the right price.", 2200, "Rent with confidence.", 2200]}
              repeat={Infinity}
              className="font-display"
            />
          </motion.div>

          <motion.p {...rise(0.45)} className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            I&apos;m {profile.name}, a {profile.title.toLowerCase()}. Honest advice, verified properties and
            personal attention — from first call to final handover.
          </motion.p>

          <motion.div {...rise(0.6)} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#properties"
              className="rounded-full bg-gold px-8 py-3.5 font-semibold text-black shadow-[0_0_40px_rgba(201,164,76,.45)] transition hover:scale-105 hover:bg-gold-soft"
            >
              View Properties
            </a>
            <a
              href={waLink("Hello Arif, I'm interested in a property in Dhaka.")}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-gold transition hover:border-gold/60"
            >
              <FaWhatsapp /> WhatsApp
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="glass flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition hover:border-gold/60 hover:text-gold"
            >
              <FaPhoneAlt size={14} /> Call Me
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-md"
        >
          <div className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent,#c9a44c,transparent_40%,#f8e7b0,transparent_75%)] opacity-80" />
          <div className="absolute inset-[3px] overflow-hidden rounded-full bg-zinc-950">
            <Image
              src="/profile.png"
              alt="Arif Sarkar, Real Estate Consultant and Realtor in Dhaka"
              fill
              priority
              sizes="(min-width: 640px) 28rem, 22rem"
              className="object-cover"
            />
          </div>

          <div className="glass animate-float absolute left-0 top-10 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-left-10">
            <FaShieldAlt className="text-gold" />
            <span className="text-sm font-medium">Verified listings</span>
          </div>
          <div className="glass animate-float absolute -right-2 bottom-12 flex items-center gap-3 rounded-2xl px-4 py-3 [animation-delay:-3s] sm:-right-8">
            <FaMapMarkerAlt className="text-gold" />
            <span className="text-sm font-medium">All over Dhaka</span>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-20 grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3">
        {paths.map((p, i) => (
          <motion.a
            key={p.label}
            href={p.href}
            {...rise(0.7 + i * 0.12)}
            whileHover={{ y: -6 }}
            className="glass card-glow group rounded-3xl p-7"
          >
            <span className="text-xs tracking-[4px] text-zinc-500">0{i + 1}</span>
            <h3 className="mt-2 text-4xl font-semibold transition group-hover:text-gold">{p.label}</h3>
            <p className="mt-1 text-sm text-zinc-400">
              {p.text} <span className="inline-block transition group-hover:translate-x-1">→</span>
            </p>
          </motion.a>
        ))}
      </div>

      <div className="relative mt-20 overflow-hidden border-y border-gold/15 py-5">
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
