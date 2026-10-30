"use client";

import { FaWhatsapp } from "react-icons/fa";
import { waLink } from "@/data/profile";

export default function WhatsAppButton() {
  return (
    <a
      href={waLink("Hello Arif, I'd like to discuss a property.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 hidden h-14 w-14 md:flex items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-110 hover:bg-green-600"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}
