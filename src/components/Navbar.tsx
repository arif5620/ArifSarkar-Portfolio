"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
  const [section, setSection] = useState("home");
  const pathname = usePathname();
  const onBlog = pathname.startsWith("/blog");
  const active = onBlog ? "Insights" : navLinks.find((l) => l.href === `/#${section}`)?.name;

  // Highlight the menu item for the section currently in the middle of the screen.
  useEffect(() => {
    if (onBlog) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSection(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    // Watch every section, so sections without a menu item (FAQ, EMI...) clear the highlight.
    document.querySelectorAll("main section[id]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onBlog]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: close with Escape and stop the page scrolling underneath.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Main"
        className={`mx-auto mt-3 flex w-[92%] max-w-7xl items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl transition-all duration-300 lg:px-8 ${
          scrolled ? "border-gold/30 bg-ink/85 shadow-2xl shadow-black/40" : "border-line bg-ink/60"
        }`}
      >
        <Link href="/#home" className="font-display text-xl font-semibold tracking-[3px] text-fg sm:text-2xl">
          ARIF<span className="text-gold">.</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-current={active === item.name ? "true" : undefined}
              className={`relative py-1 transition-colors hover:text-gold ${active === item.name ? "text-gold" : "text-soft"}`}
            >
              {item.name}
              {active === item.name && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </a>
          ))}
        </div>

        <a
          href={`tel:${profile.phone}`}
          className="btn-shine hidden rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-gold-soft md:block"
        >
          Call Now
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="z-[9999] flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div id="mobile-menu" className={`fixed inset-0 z-[9998] transition-all duration-300 md:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="absolute inset-0 bg-ink/90 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div className="absolute left-1/2 top-20 w-[90%] max-w-sm -translate-x-1/2 rounded-3xl border border-line bg-ink-2 p-6">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active === item.name ? "true" : undefined}
                className={`rounded-xl px-4 py-3 text-lg hover:text-gold ${active === item.name ? "bg-gold/10 text-gold" : "text-soft"}`}
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
