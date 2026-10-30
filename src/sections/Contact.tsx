"use client";

import profile, { waLink } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const field =
  "w-full rounded-2xl border border-line bg-ink px-5 py-4 text-fg outline-none transition focus:border-gold focus:shadow-[0_0_25px_rgba(201,164,76,.25)]";

const info = [
  { icon: <FaPhoneAlt />, title: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
  { icon: <FaEnvelope />, title: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: <FaMapMarkerAlt />, title: "Location", value: profile.location },
];

export default function Contact() {
  // No backend: the inquiry is sent to Arif's WhatsApp, prefilled.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = `Hello Arif, I'm ${f.get("name")} (${f.get("phone")}). I want to ${f.get("interest")}. ${f.get("message") ?? ""}`;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="bg-ink-2 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's find your property"
          text="Tell me what you are looking for. I usually reply within a few hours."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            {info.map((i) => {
              const body = (
                <>
                  <div className="rounded-full border border-gold/40 p-4 text-gold">{i.icon}</div>
                  <div>
                    <p className="text-sm text-mute-2">{i.title}</p>
                    <p className="mt-1 text-lg">{i.value}</p>
                  </div>
                </>
              );
              const cls = "glass flex items-center gap-5 rounded-3xl p-5";
              return i.href ? (
                <a key={i.title} href={i.href} className={`${cls} transition hover:border-gold/50`}>{body}</a>
              ) : (
                <div key={i.title} className={cls}>{body}</div>
              );
            })}

            <a
              href={waLink("Hello Arif, I'd like to discuss a property.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-full bg-green-500 py-4 font-semibold text-white transition hover:bg-green-600"
            >
              <FaWhatsapp size={22} /> Chat on WhatsApp
            </a>
          </div>

          <form onSubmit={onSubmit} className="glass card-glow space-y-5 rounded-3xl p-6 sm:p-8">
            <input name="name" required placeholder="Your name" className={field} />
            <input name="phone" required type="tel" placeholder="Phone / WhatsApp number" className={field} />
            <select name="interest" className={field} defaultValue="buy a property">
              <option value="buy a property">I want to buy</option>
              <option value="sell my property">I want to sell</option>
              <option value="rent a property">I want to rent</option>
              <option value="list my property for rent">I want to list a rental</option>
            </select>
            <textarea name="message" rows={5} placeholder="Area, budget, size, any details..." className={`${field} resize-none`} />
            <button type="submit" className="w-full rounded-full bg-gold py-4 font-semibold text-black transition hover:bg-gold-soft">
              Send Inquiry via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
