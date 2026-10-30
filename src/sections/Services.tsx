import { FaKey, FaHome, FaChartLine, FaFileSignature, FaSearchLocation, FaBuilding } from "react-icons/fa";
import SectionHeading from "@/components/SectionHeading";

const services = [
  { icon: <FaHome />, title: "Buyer Representation", description: "Shortlisting, site visits, negotiation and closing — only properties that fit your needs and budget." },
  { icon: <FaBuilding />, title: "Selling Your Property", description: "Honest pricing advice, professional presentation and marketing to serious buyers." },
  { icon: <FaKey />, title: "Rental & Leasing", description: "Quality homes and offices for tenants, and reliable tenants for landlords." },
  { icon: <FaChartLine />, title: "Investment Advisory", description: "Guidance on locations, projects and resale or rental potential in Dhaka." },
  { icon: <FaFileSignature />, title: "Documentation Support", description: "Help understanding deeds, verification and registration steps with your lawyer." },
  { icon: <FaSearchLocation />, title: "Market Valuation", description: "A realistic view of what your property is worth in the current Dhaka market." },
];

const areas = ["Gulshan", "Banani", "Baridhara", "Bashundhara R/A", "Uttara", "Dhanmondi", "Mohammadpur", "Mirpur", "Motijheel"];

export default function Services() {
  return (
    <section id="services" className="bg-[#09090B] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="Real estate services, end to end"
          text="Whether you are buying your first flat, selling land or renting an office, I guide every step."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-gold/50">
              <div className="text-3xl text-gold">{s.icon}</div>
              <h3 className="mt-5 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-7 text-zinc-400">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-xs uppercase tracking-[4px] text-zinc-500">Areas I serve in Dhaka</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {areas.map((a) => (
              <span key={a} className="rounded-full border border-gold/30 px-4 py-2 text-sm text-zinc-300">{a}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
