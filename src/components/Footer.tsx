"use client";

import { motion } from "framer-motion";
import profile from "@/data/profile";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505]">

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-14">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="flex flex-col items-center text-center"
        >

          {/* Logo */}

          <h2 className="flex items-center gap-2 text-3xl font-black text-white">

            {profile.name}

            <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse"></span>

          </h2>

          {/* Description */}

          <p className="mt-5 max-w-xl leading-8 text-gray-400">

            Helping businesses grow through
            Digital Marketing, WordPress Development
            and AI-powered solutions.

          </p>
                    {/* Social Icons */}

          <div className="mt-8 flex items-center gap-4">

            {[
              {
                icon: <FaFacebookF />,
                url: profile.social.facebook,
              },
              {
                icon: <FaLinkedinIn />,
                url: profile.social.linkedin,
              },
              {
                icon: <FaGithub />,
                url: profile.social.github,
              },
              {
                icon: <FaInstagram />,
                url: profile.social.instagram,
              },
              {
                icon: <FaXTwitter />,
                url: profile.social.x,
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -5,
                  scale: 1.08,
                  rotate: 8,
                }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,.4)]"
              >
                {social.icon}
              </motion.a>
            ))}

          </div>

          {/* Back To Top */}

          <motion.a
            href="#home"
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 rounded-full border border-blue-500/20 bg-blue-500/10 px-6 py-3 font-semibold text-blue-400 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-[0_0_25px_rgba(59,130,246,.35)]"
          >
            ↑ Back To Top
          </motion.a>

        </motion.div>

        {/* Bottom */}

        <div className="mt-12 border-t border-white/10 pt-6 text-center">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {profile.fullName}. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}