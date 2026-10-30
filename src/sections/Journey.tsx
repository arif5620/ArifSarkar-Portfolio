"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { waLink } from "@/data/profile";

const photo = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;

const steps = [
  { n: "01", title: "It starts with a handshake", text: "We talk about your needs, budget and timeline — no pressure, just a clear plan.", img: photo("1638262052640-82e94d64664a", 1200) },
  { n: "02", title: "Shortlist & visit", text: "I verify and shortlist only what truly fits, then visit with you.", img: photo("1560518883-ce09059eeffa") },
  { n: "03", title: "Sign with confidence", text: "Price negotiated and papers checked before anything is signed.", img: photo("1450101499163-c8848c66ca85") },
  { n: "04", title: "Keys in your hand", text: "Registration support and a smooth handover. Welcome home.", img: photo("1741156386380-0236c72eb6f9") },
];

const clients = [
  { title: "Families", text: "Safe, spacious homes near good schools and hospitals.", img: photo("1709787627975-9cb37bbeca60") },
  { title: "Investors", text: "Apartments and land with strong resale and rental potential.", img: photo("1565953522043-baea26b83b7e") },
  { title: "Land & Commercial", text: "Plots, shops and offices for growing businesses.", img: photo("1497366811353-6870744d04b2") },
];

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
});

function PhotoCard({ img, alt, className = "", sizes, children }: {
  img: string; alt: string; className?: string; sizes: string; children: React.ReactNode;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-ink-2 ${className}`}>
      <Image src={img} alt={alt} fill sizes={sizes} className="object-cover transition duration-1000 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">{children}</div>
    </div>
  );
}

export default function Journey() {
  const [first, ...rest] = steps;

  return (
    <section id="journey" className="bg-ink-2 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Your Journey"
          title="From first call to your keys"
          text="A simple, honest process — so buying, selling or renting feels exciting, not stressful."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <motion.div {...reveal(0)}>
            <PhotoCard img={first.img} alt="Real estate agent shaking hands with a client" sizes="(min-width: 1024px) 50vw, 100vw" className="h-80 sm:h-[28rem] lg:h-full lg:min-h-[34rem]">
              <span className="text-shimmer font-display text-6xl font-bold">{first.n}</span>
              <h3 className="mt-1 text-3xl font-semibold sm:text-4xl">{first.title}</h3>
              <p className="mt-2 max-w-md text-zinc-200">{first.text}</p>
            </PhotoCard>
          </motion.div>

          <div className="grid gap-5">
            {rest.map((s, i) => (
              <motion.div key={s.n} {...reveal(i + 1)}>
                <PhotoCard img={s.img} alt={s.title} sizes="(min-width: 1024px) 50vw, 100vw" className="h-52">
                  <div className="flex items-end gap-4">
                    <span className="font-display text-5xl font-bold text-gold-soft">{s.n}</span>
                    <div>
                      <h3 className="text-2xl font-semibold">{s.title}</h3>
                      <p className="text-sm text-zinc-200">{s.text}</p>
                    </div>
                  </div>
                </PhotoCard>
              </motion.div>
            ))}
          </div>
        </div>

        <h3 className="mt-20 text-center text-3xl font-semibold sm:text-4xl">Who I help</h3>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {clients.map((c, i) => (
            <motion.a
              key={c.title}
              {...reveal(i)}
              href={waLink(`Hello Arif, I'm interested in ${c.title.toLowerCase()} property.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <PhotoCard img={c.img} alt={c.title} sizes="(min-width: 768px) 33vw, 100vw" className="h-80">
                <h4 className="font-display text-3xl font-semibold">{c.title}</h4>
                <p className="mt-1 text-sm text-zinc-200">{c.text}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-gold-soft transition group-hover:translate-x-1">Talk to Arif →</span>
              </PhotoCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
