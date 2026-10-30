import { FaPhoneAlt, FaWhatsapp, FaHome } from "react-icons/fa";
import Link from "next/link";
import profile, { waLink } from "@/data/profile";

// Thumb-reach quick actions on phones; replaces the floating WhatsApp button there.
export default function MobileActionBar() {
  const item = "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium";
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 flex rounded-2xl border border-line bg-ink/95 shadow-2xl backdrop-blur md:hidden" aria-label="Quick actions">
      <Link href="/#properties" className={`${item} text-soft`}><FaHome size={18} /> Properties</Link>
      <a href={`tel:${profile.phone}`} className={`${item} text-gold`}><FaPhoneAlt size={17} /> Call</a>
      <a
        href={waLink("Hello Arif, I'd like to discuss a property.")}
        target="_blank"
        rel="noopener noreferrer"
        className={`${item} text-green-400`}
      >
        <FaWhatsapp size={19} /> WhatsApp
      </a>
    </nav>
  );
}
