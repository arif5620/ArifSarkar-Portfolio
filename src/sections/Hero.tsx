import Image from "next/image";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import profile, { waLink } from "@/data/profile";

const paths = [
  { label: "Buy", text: "Find your home or investment", href: "#properties" },
  { label: "Sell", text: "Get the right price, faster", href: "#contact" },
  { label: "Rent", text: "Quality homes and offices", href: "#properties" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-black pb-16 pt-32 lg:pt-40">
      <div className="absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-gold/10 blur-[160px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-xs uppercase tracking-[5px] text-gold">Dhaka, Bangladesh</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Your trusted <span className="text-gold">Realtor</span> in Dhaka
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            I&apos;m {profile.name}, a {profile.title.toLowerCase()}. I help buyers, sellers and tenants make
            confident property decisions — with honest advice, local market knowledge and personal attention.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#properties" className="rounded-full bg-gold px-8 py-3.5 font-semibold text-black transition hover:bg-gold-soft">
              View Properties
            </a>
            <a
              href={waLink("Hello Arif, I'm interested in a property in Dhaka.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 font-semibold text-gold transition hover:bg-gold/10"
            >
              <FaWhatsapp /> WhatsApp
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold transition hover:border-gold hover:text-gold"
            >
              <FaPhoneAlt size={14} /> Call Me
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <div className="rounded-t-full border border-gold/30 p-3">
            <Image
              src="/profile.png"
              alt="Arif Sarkar, Real Estate Consultant and Realtor in Dhaka"
              width={600}
              height={750}
              priority
              className="h-auto w-full rounded-t-full bg-zinc-900 object-cover"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3">
        {paths.map((p) => (
          <a
            key={p.label}
            href={p.href}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold/50"
          >
            <h3 className="text-3xl font-semibold group-hover:text-gold">{p.label}</h3>
            <p className="mt-1 text-sm text-zinc-400">{p.text} →</p>
          </a>
        ))}
      </div>
    </section>
  );
}
