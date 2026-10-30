import { FaShieldAlt, FaHandshake, FaMapMarkedAlt, FaComments } from "react-icons/fa";
import SectionHeading from "@/components/SectionHeading";

const reasons = [
  { icon: <FaShieldAlt />, title: "Integrity first", text: "Honest advice, even when it means telling you to walk away from a deal." },
  { icon: <FaMapMarkedAlt />, title: "Local market knowledge", text: "Real insight into Dhaka neighbourhoods, pricing trends and developers." },
  { icon: <FaHandshake />, title: "Personal service", text: "You deal directly with me — not a call centre — from first meeting to handover." },
  { icon: <FaComments />, title: "Clear communication", text: "Quick replies on phone and WhatsApp, in Bangla or English." },
];

export default function WhyChoose() {
  return (
    <section id="why-me" className="bg-black py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Why Choose Me" title="Real estate, done with trust" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-3xl border border-white/10 p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-xl text-gold">
                {r.icon}
              </div>
              <h3 className="mt-5 text-2xl font-semibold">{r.title}</h3>
              <p className="mt-3 leading-7 text-zinc-400">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
