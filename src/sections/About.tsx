import Image from "next/image";
import profile from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import AnimatedSection from "@/components/AnimatedSection";

const points = [
  "Local expertise in Dhaka, Chattogram and Cumilla",
  "Transparent pricing — no hidden commissions or surprises",
  "Guidance on documents, verification and registration",
  "Available by phone and WhatsApp, in Bangla and English",
];

export default function About() {
  return (
    <section id="about" className="bg-[#09090B] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="About Me" title="A Realtor you can trust" />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <TiltCard className="card-glow relative mx-auto w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-[0_30px_80px_-20px_rgba(201,164,76,.35)]">
            <Image
              src="/profile.png"
              alt={`${profile.name}, Realtor in Dhaka`}
              width={600}
              height={700}
              className="h-auto w-full bg-zinc-900 object-cover"
            />
          </TiltCard>

          <AnimatedSection delay={0.2}>
            <h3 className="text-3xl font-semibold sm:text-4xl">
              Hello, I&apos;m <span className="text-gold">{profile.name}</span>
            </h3>
            <p className="mt-5 leading-8 text-zinc-400">
              I&apos;m a real estate consultant working across Dhaka, Chattogram and Cumilla, who believes buying, selling or renting a property
              should feel clear and safe. Every client gets my personal attention — I listen first, shortlist
              only what fits your needs and budget, and stay with you until the deal is closed.
            </p>
            <p className="mt-4 leading-8 text-zinc-400">
              My focus is simple: honest advice, verified properties and long-term relationships built on trust.
            </p>

            <ul className="mt-7 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex gap-3 text-zinc-300">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
