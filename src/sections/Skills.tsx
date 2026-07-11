"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";

const skills = [
  { name: "Digital Marketing", level: 95 },
  { name: "Meta Ads", level: 96 },
  { name: "WordPress", level: 95 },
  { name: "SEO", level: 90 },
  { name: "Elementor", level: 94 },
  { name: "AI Website Creation", level: 92 },
  { name: "AI Video Creation", level: 90 },
  { name: "Content Strategy", level: 88 },
];

export default function Skills() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  return (
    <section
      id="skills"
      className="bg-[#09090B] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-[4px] text-blue-400 sm:text-base sm:tracking-[5px]">
            My Skills
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
            Skills &
            <span className="text-blue-500"> Expertise</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-400 sm:text-lg">
            I specialize in Digital Marketing, WordPress Website Design,
            Meta Ads, SEO and AI-powered business solutions.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-2"
        >
                    {skills.map((skill, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
                duration: 0.6,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20"
            >

              <div className="mb-4 flex items-center justify-between">

                <h3 className="font-semibold text-white">
                  {skill.name}
                </h3>

                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + index * 0.12 }}
                  className="font-semibold text-blue-400"
                >
                  <CountUp
                    start={0}
                    end={skill.level}
                    duration={2}
                  />
                  %
                </motion.span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: isInView ? `${skill.level}%` : 0,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.45)]"
                />

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}
// import Skills from "@/sections/Skills";