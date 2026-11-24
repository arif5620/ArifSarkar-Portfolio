"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";

type Ring = { items: string[]; rx: number; ry: number; cy: number; tilt: number; speed: number };

// Two tilted orbits around Arif: what he deals in, and where.
const rings: Ring[] = [
  { items: ["Apartments", "Duplex & Houses", "Land & Plots", "Commercial Space", "Rentals", "Investment"], rx: 0.44, ry: 0.09, cy: 0.66, tilt: -6, speed: 0.16 },
  { items: ["Gulshan", "Bashundhara", "Uttara", "Dhanmondi", "Purbachal", "Khulshi", "Agrabad", "Kandirpar"], rx: 0.48, ry: 0.11, cy: 0.4, tilt: 5, speed: -0.11 },
];

function ellipsePath(W: number, H: number, r: Ring) {
  const rx = r.rx * W * (W < 640 ? 0.82 : 1);
  return { cx: W / 2, cy: r.cy * H, rx, ry: r.ry * W };
}

export default function Expertise() {
  const stage = useRef<HTMLDivElement>(null);
  const pills = useRef<(HTMLSpanElement | null)[][]>(rings.map(() => []));
  const backSvg = useRef<SVGSVGElement>(null);
  const frontSvg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let raf = 0;
    let visible = false;
    let t = 0;
    let last = performance.now();

    const drawRings = () => {
      [backSvg.current, frontSvg.current].forEach((svg, layer) => {
        if (!svg) return;
        svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
        svg.querySelectorAll("ellipse").forEach((e, i) => {
          const g = ellipsePath(W, H, rings[i]);
          e.setAttribute("cx", `${g.cx}`);
          e.setAttribute("cy", `${g.cy}`);
          e.setAttribute("rx", `${g.rx}`);
          e.setAttribute("ry", `${g.ry}`);
          e.setAttribute("transform", `rotate(${rings[i].tilt} ${g.cx} ${g.cy})`);
          // Front layer only shows the near (lower) half of each orbit.
          if (layer === 1) e.setAttribute("clip-path", `url(#orbit-front-${i})`);
        });
        if (layer === 1) {
          svg.querySelectorAll("clipPath rect").forEach((rect, i) => {
            const g = ellipsePath(W, H, rings[i]);
            rect.setAttribute("x", "0");
            rect.setAttribute("y", `${g.cy}`);
            rect.setAttribute("width", `${W}`);
            rect.setAttribute("height", `${H}`);
          });
        }
      });
    };

    const place = () => {
      rings.forEach((r, ri) => {
        const g = ellipsePath(W, H, r);
        const a = (r.tilt * Math.PI) / 180;
        r.items.forEach((_, i) => {
          const p = pills.current[ri][i];
          if (!p) return;
          const th = t * r.speed * Math.PI * 2 + (i / r.items.length) * Math.PI * 2;
          const ex = g.rx * Math.cos(th);
          const ey = g.ry * Math.sin(th);
          const x = g.cx + ex * Math.cos(a) - ey * Math.sin(a);
          const y = g.cy + ex * Math.sin(a) + ey * Math.cos(a);
          const depth = (Math.sin(th) + 1) / 2; // 0 = far, 1 = near
          p.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${0.78 + depth * 0.3})`;
          p.style.opacity = `${0.35 + depth * 0.65}`;
          p.style.zIndex = depth > 0.5 ? "30" : "5";
          p.style.filter = depth < 0.35 ? "blur(1px)" : "none";
        });
      });
    };

    const resize = () => {
      W = el.clientWidth;
      H = el.clientHeight;
      drawRings();
      place();
    };

    const tick = (now: number) => {
      t += Math.min(now - last, 50) / 1000;
      last = now;
      place();
      raf = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduced) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="expertise" className="relative overflow-hidden bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <AnimatedSection>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[4px] text-mute">
              <span className="h-px w-10 bg-gold" /> (02) Expertise
            </p>
            <h2 className="mt-6 font-sans text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Everything behind <span className="font-display font-medium italic text-gold">a smooth deal.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="max-w-md leading-7 text-mute lg:ml-auto">
              Property types I handle every day and the neighbourhoods I know street by street, from Gulshan to Agrabad to Kandirpar.
            </p>
          </AnimatedSection>
        </div>

        <div ref={stage} className="relative mx-auto mt-6 h-[460px] w-full max-w-5xl sm:h-[600px]">
          <svg ref={backSvg} aria-hidden className="absolute inset-0 z-[4] h-full w-full overflow-visible">
            {rings.map((_, i) => (
              <ellipse key={i} fill="none" stroke="var(--gold)" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 6" />
            ))}
          </svg>

          <div aria-hidden className="absolute inset-x-[25%] bottom-[10%] top-[25%] z-[3] rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 z-20 mx-auto h-[92%] w-[70%] max-w-[420px] [mask-image:linear-gradient(to_bottom,#000_72%,transparent)]">
            <Image
              src="/arif-cutout.webp"
              unoptimized
              alt="Arif"
              fill
              className="object-contain object-bottom"
            />
          </div>

          <svg ref={frontSvg} aria-hidden className="pointer-events-none absolute inset-0 z-[25] h-full w-full overflow-visible">
            <defs>
              {rings.map((_, i) => (
                <clipPath key={i} id={`orbit-front-${i}`}>
                  <rect />
                </clipPath>
              ))}
            </defs>
            {rings.map((_, i) => (
              <ellipse key={i} fill="none" stroke="var(--gold)" strokeOpacity="0.7" strokeWidth="1.2" />
            ))}
          </svg>

          <ul aria-label="Property types and areas" className="absolute inset-0">
            {rings.map((r, ri) =>
              r.items.map((item, i) => (
                <li key={item} className="contents">
                  <span
                    ref={(n) => {
                      pills.current[ri][i] = n;
                    }}
                    className={`absolute left-0 top-0 flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm will-change-transform sm:text-sm ${
                      ri === 0 ? "border-gold/50 bg-ink/80 text-fg" : "border-line bg-card text-soft"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${ri === 0 ? "bg-gold" : "bg-mute-2"}`} />
                    {item}
                  </span>
                </li>
              )),
            )}
          </ul>
        </div>

      </div>
    </section>
  );
}
