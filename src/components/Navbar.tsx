"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#projects" },
  { name: "Meta Ads", href: "#facebook-ads" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`mx-auto mt-3 flex w-[92%] max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 backdrop-blur-xl lg:px-6 lg:py-4 ${
          scrolled
            ? "border-blue-500/20 bg-zinc-950/80 shadow-2xl shadow-black/40"
            : "border-white/10 bg-black/40"
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 text-xl font-black tracking-[3px] text-white sm:text-2xl"
        >
          <span>ARIF</span>
          <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative text-gray-300 transition duration-300 hover:text-blue-400 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop Button */}
        <div className="hidden items-center md:flex">
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="z-[9999] flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-blue-500 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[9998] transition-all duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />

        <div className="absolute left-1/2 top-20 w-[90%] max-w-sm -translate-x-1/2 rounded-3xl border border-white/10 bg-zinc-900/95 p-6 shadow-2xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-lg font-medium text-gray-300 transition-all duration-300 hover:bg-blue-500/10 hover:text-blue-400"
              >
                {item.name}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-center font-semibold text-white"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}