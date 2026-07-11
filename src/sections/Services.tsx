"use client";

import { motion } from "framer-motion";
import {
  FaBullhorn,
  FaWordpress,
  FaSearch,
  FaRobot,
  FaVideo,
} from "react-icons/fa";
import { MdAdsClick } from "react-icons/md";

const services = [
  {
    icon: <FaBullhorn size={34} />,
    title: "Digital Marketing",
    description:
      "Grow your business with result-driven digital marketing strategies.",
  },
  {
    icon: <FaWordpress size={34} />,
    title: "WordPress Website",
    description:
      "Modern, fast and responsive WordPress websites for businesses.",
  },
  {
    icon: <MdAdsClick size={34} />,
    title: "Meta Ads",
    description:
      "Facebook & Instagram advertising that generates real leads and sales.",
  },
  {
    icon: <FaSearch size={34} />,
    title: "SEO Optimization",
    description:
      "Improve your Google rankings and increase organic traffic.",
  },
  {
    icon: <FaRobot size={34} />,
    title: "AI Website",
    description:
      "Build AI-powered websites with modern automation and smart features.",
  },
  {
    icon: <FaVideo size={34} />,
    title: "AI Video Creation",
    description:
      "Create engaging AI-generated videos for marketing and branding.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-black py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-[5px] text-blue-400">
            My Services
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
            What Can I Do
            <span className="text-blue-500"> For You?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-400">
            I provide complete digital solutions to help businesses grow,
            increase online visibility, generate leads and build a strong
            digital presence.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -14,
                scale: 1.03,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-blue-500 hover:shadow-[0_0_45px_rgba(59,130,246,0.35)]"
            >
              {/* Glow Effect */}
              <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-blue-500/20" />

              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              {/* Icon */}
              <motion.div
                whileHover={{
                  rotate: [0, -12, 12, -12, 0],
                  scale: 1.15,
                }}
                transition={{ duration: 0.6 }}
                className="relative mb-6 inline-flex rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-blue-400 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white"
              >
                {service.icon}
              </motion.div>

              <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-blue-400">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                {service.description}
              </p>

              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-blue-400 transition-colors duration-300 group-hover:text-white"
              >
                <motion.span
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Let's Work Together
                </motion.span>

                <motion.span
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  →
                </motion.span>
              </a>

              {/* Bottom Border Animation */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}