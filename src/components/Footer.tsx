import profile from "@/data/profile";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const social = [
  { icon: <FaFacebookF />, url: profile.social.facebook, label: "Facebook" },
  { icon: <FaLinkedinIn />, url: profile.social.linkedin, label: "LinkedIn" },
  { icon: <FaInstagram />, url: profile.social.instagram, label: "Instagram" },
  { icon: <FaXTwitter />, url: profile.social.x, label: "X" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-14 text-center">
        <h2 className="text-3xl font-semibold tracking-[3px]">
          ARIF <span className="text-gold">SARKAR</span>
        </h2>
        <p className="mt-2 text-sm uppercase tracking-[4px] text-gold">{profile.title}</p>
        <p className="mt-5 max-w-xl leading-8 text-zinc-400">
          Buy, sell and rent property in Dhaka, Bangladesh — with honest advice and personal service from first
          call to final handover.
        </p>

        <div className="mt-8 flex gap-4">
          {social.map((s) => (
            <a
              key={s.label}
              href={s.url}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 p-3 transition hover:border-gold hover:text-gold"
            >
              {s.icon}
            </a>
          ))}
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-sm text-zinc-500">
          © {new Date().getFullYear()} {profile.fullName} · Real Estate Consultant & Realtor · {profile.location}
        </p>
      </div>
    </footer>
  );
}
