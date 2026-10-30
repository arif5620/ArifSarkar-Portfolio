import { FaShieldAlt, FaHandshake, FaMapMarkedAlt, FaComments } from "react-icons/fa";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";

const reasons = [
  { icon: <FaShieldAlt />, title: "Integrity first", text: "Honest advice, even when it means telling you to walk away from a deal." },
  { icon: <FaMapMarkedAlt />, title: "Local market knowledge", text: "Real insight into neighbourhoods, prices and developers in Dhaka, Chattogram and Cumilla." },
  { icon: <FaHandshake />, title: "Personal service", text: "You deal directly with me — not a call centre — from first meeting to handover." },
  { icon: <FaComments />, title: "Clear communication", text: "Quick replies on phone and WhatsApp, in Bangla or English." },
];

const steps = [
  { title: "Consultation", text: "We talk about your needs, budget and preferred areas." },
  { title: "Shortlist & Visits", text: "I shortlist verified options and arrange site visits." },
  { title: "Negotiation", text: "I negotiate the best price and terms on your behalf." },
  { title: "Handover", text: "Documents, registration support and a smooth handover." },
];

export default function WhyChoose() {
  return (
    <section id="why-me" className="bg-black py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Why Choose Me" title="Real estate, done with trust" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <AnimatedSection key={r.title} delay={i * 0.12} className="glass card-glow rounded-3xl p-7 text-center transition duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(201,164,76,.35)]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-xl text-gold">
                {r.icon}
              </div>
              <h3 className="mt-5 text-2xl font-semibold">{r.title}</h3>
              <p className="mt-3 leading-7 text-zinc-400">{r.text}</p>
            </AnimatedSection>
          ))}
        </div>

        <h3 className="mt-24 text-center text-3xl font-semibold sm:text-4xl">How I work</h3>
        <div className="relative mt-12 grid gap-10 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent md:block" />
          {steps.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.2} className="relative text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold font-semibold text-black shadow-[0_0_30px_rgba(201,164,76,.6)]">
                {i + 1}
              </div>
              <h4 className="mt-5 font-display text-2xl font-semibold">{s.title}</h4>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{s.text}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
