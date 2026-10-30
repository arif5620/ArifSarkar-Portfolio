"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import profile from "@/data/profile";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Properties", href: "/#properties" },
  { name: "Services", href: "/#services" },
  { name: "Insights", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`mx-auto mt-3 flex w-[92%] max-w-7xl items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl transition-all duration-300 lg:px-8 ${
          scrolled ? "border-gold/30 bg-ink/85 shadow-2xl shadow-black/40" : "border-line bg-ink/60"
        }`}
      >
        <Link href="/#home" className="font-display text-xl font-semibold tracking-[3px] text-fg sm:text-2xl">
          ARIF<span className="text-gold">.</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((item) => (
            <a key={item.name} href={item.href} className="text-soft transition hover:text-gold">
              {item.name}
            </a>
          ))}
        </div>

        <a
          href={`tel:${profile.phone}`}
          className="hidden rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-gold-soft md:block"
        >
          Call Now
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="z-[9999] flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div className={`fixed inset-0 z-[9998] transition-all duration-300 md:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="absolute inset-0 bg-ink/90 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div className="absolute left-1/2 top-20 w-[90%] max-w-sm -translate-x-1/2 rounded-3xl border border-line bg-ink-2 p-6">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-lg text-soft hover:text-gold"
              >
                {item.name}
              </a>
            ))}
            <a href={`tel:${profile.phone}`} className="mt-3 rounded-full bg-gold py-3 text-center font-semibold text-black">
              Call Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
