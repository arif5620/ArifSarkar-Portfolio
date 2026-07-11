"use client";

import { motion } from "framer-motion";
import profile from "@/data/profile";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaPaperPlane,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: .8 },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: .8 },
  },
};

export default function Contact() {

  return (

<section
id="contact"
className="relative overflow-hidden bg-[#09090B] py-20 text-white lg:py-24"
>

<div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[140px]" />

<div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />

<div className="relative mx-auto max-w-7xl px-4 sm:px-6">

<motion.div
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{duration:.8}}
className="text-center"
>

<p className="text-sm uppercase tracking-[5px] text-blue-400">
Contact
</p>

<h2 className="mt-4 text-4xl font-black md:text-5xl">
Let's Work
<span className="text-blue-500"> Together</span>
</h2>

<p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-400">
Have an idea or project in mind?
Let's build something amazing together.
I'm always available for freelance work and business collaboration.
</p>

</motion.div>

<div className="mt-16 grid gap-10 lg:grid-cols-2">
  {/* LEFT SIDE */}

<motion.div
variants={fadeLeft}
initial="hidden"
whileInView="show"
viewport={{ once: true, amount: 0.3 }}
className="space-y-6"
>

  {/* Available */}

  <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 p-6 backdrop-blur-xl">

    <div className="flex items-center gap-3">

      <span className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></span>

      <h3 className="text-xl font-bold">
        Available For Freelance
      </h3>

    </div>

    <p className="mt-3 leading-7 text-gray-400">
      Currently available for freelance projects,
      business collaborations and long-term partnerships.
    </p>

    <div className="mt-6 grid grid-cols-2 gap-4">

      <div className="rounded-2xl bg-white/5 p-4">

        <p className="text-sm text-gray-400">
          Response Time
        </p>

        <h4 className="mt-2 text-lg font-bold text-blue-400">
          Within 24 Hours
        </h4>

      </div>

      <div className="rounded-2xl bg-white/5 p-4">

        <p className="text-sm text-gray-400">
          Experience
        </p>

        <h4 className="mt-2 text-lg font-bold text-blue-400">
          5+ Years
        </h4>

      </div>

    </div>

  </div>

  {/* Phone */}

  {[

    {
      icon: <FaPhoneAlt />,
      title: "Phone",
      value: profile.phone,
    },

    {
      icon: <FaEnvelope />,
      title: "Email",
      value: profile.email,
    },

    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: profile.location,
    },

  ].map((item, index) => (

    <motion.div
      key={index}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * .15 }}
      whileHover={{
        y: -5,
      }}
      className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_35px_rgba(59,130,246,.2)]"
    >

      <div className="rounded-2xl bg-blue-600/10 p-4 text-2xl text-blue-400 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">

        {item.icon}

      </div>

      <div>

        <p className="text-gray-400">

          {item.title}

        </p>

        <h3 className="mt-1 text-lg font-semibold">

          {item.value}

        </h3>

      </div>

    </motion.div>

  ))}

  {/* Social */}

  <div className="flex flex-wrap gap-4 pt-3">

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
          y: -6,
          scale: 1.08,
          rotate: 8,
        }}
        className="rounded-full border border-white/10 bg-white/5 p-4 text-xl transition-all duration-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
      >

        {social.icon}

      </motion.a>

    ))}

  </div>

</motion.div>
{/* RIGHT SIDE */}

<motion.form
  variants={fadeRight}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.3 }}
  className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
>

  <div className="space-y-5">

    <input
      type="text"
      placeholder="Your Name"
      className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-5 py-4 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
    />

    <input
      type="email"
      placeholder="Your Email"
      className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-5 py-4 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
    />

    <input
      type="text"
      placeholder="Subject"
      className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-5 py-4 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
    />

    <textarea
      rows={6}
      placeholder="Write your message..."
      className="w-full resize-none rounded-2xl border border-white/10 bg-zinc-900 px-5 py-4 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
    />

    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.97,
      }}
      type="submit"
      className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,.35)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(59,130,246,.55)]"
    >
      <FaPaperPlane className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

      Send Message
    </motion.button>

  </div>

</motion.form>

</div>

</div>

</section>

  );
}