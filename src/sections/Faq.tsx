import SectionHeading from "@/components/SectionHeading";

export const faqs = [
  {
    q: "Which areas do you cover?",
    a: "Dhaka (Gulshan, Banani, Bashundhara, Uttara, Dhanmondi, Purbachal and more), Chattogram (Khulshi, Nasirabad, Panchlaish, Agrabad) and Cumilla (Kandirpar, Kotbari, Tomsom Bridge and nearby).",
  },
  {
    q: "What documents should I check before buying?",
    a: "The title deed (dolil) and previous deeds, khatian records, mutation (namjari), up-to-date land tax receipts, the RAJUK or local authority approved plan, and the land-owner and developer agreement for new projects. Always have a lawyer verify them — I help you collect and organise everything.",
  },
  {
    q: "How do your fees work?",
    a: "My fee is agreed with you in writing before we start, so there are no hidden charges or surprises later.",
  },
  {
    q: "Can I sell or rent out my property through you?",
    a: "Yes. I give you an honest price estimate, present your property well and bring serious, screened buyers or tenants.",
  },
  {
    q: "I live abroad. Can I still buy property in Bangladesh?",
    a: "Yes. Many buyers start remotely — I can share video tours over WhatsApp and work with your family member or legal representative in Bangladesh through each step.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Questions people ask me" />
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0} className="glass group rounded-2xl px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-semibold sm:text-2xl">
                {f.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold transition duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-7 text-mute">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
