"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    year: "June 2023 - Present",
    title: "Digital Marketing Manager",
    company: "Fortune Construction Ltd.",
    current: true,
    description:
      "Planned and executed data-driven digital marketing campaigns focused on Meta Ads, SEO, lead generation and brand growth. Worked closely with the sales team to improve online visibility, attract qualified prospects and strengthen the company's digital presence.",
  },
  {
    year: "April 2022 - May 2023",
    title: "Digital Marketing Manager",
    company: "Radiant IT",
    current: false,
    description:
      "Managed SEO & SEM campaigns, developed WordPress websites and improved client ROI through data-driven advertising strategies.",
  },
  {
    year: "January 2019 - March 2022",
    title: "Social Media Manager",
    company: "FruvitaBD",
    current: false,
    description:
      "Managed Facebook, Instagram and YouTube marketing. Increased social engagement by more than 200% and executed seasonal campaigns that boosted sales.",
  },
  {
    year: "2018 - Present",
    title: "Freelance Digital Marketing Specialist",
    company: "Global Clients",
    current: false,
    description:
      "Successfully completed 250+ projects for local and international clients. Specialized in Meta Ads, SEO, Lead Generation, Email Marketing and WordPress Website Development.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#09090B] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="text-center"
        >

          <p className="text-sm uppercase tracking-[5px] text-blue-400">
            Experience
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
            My Career
            <span className="text-blue-500"> Journey</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-400">
            More than 5 years of experience in Digital Marketing,
            WordPress Development, Meta Ads and AI-powered business solutions.
          </p>

        </motion.div>

        <div className="relative mt-16 border-l border-blue-500/30 pl-7 sm:pl-10">
                  {experiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                type: "spring",
                stiffness: 90,
              }}
              className="relative mb-14"
            >
              {/* Timeline Dot */}
              <motion.div
                animate={
                  item.current
                    ? {
                        scale: [1, 1.3, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute -left-[39px] top-2 h-6 w-6 rounded-full border-4 border-black bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,.7)] sm:-left-[52px]"
              />

              {/* Year */}
              <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                {item.year}
              </span>

              {/* Card */}
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                }}
                className="group relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-blue-500 hover:shadow-[0_0_45px_rgba(59,130,246,.28)]"
              >
                {/* Glow */}
                <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-blue-500/20" />

                {/* Shine */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                <div className="relative flex flex-wrap items-center justify-between gap-4">

                  <div>
                    <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-blue-400">
                      {item.title}
                    </h3>

                    <p className="mt-2 font-semibold text-blue-400">
                      {item.company}
                    </p>
                  </div>

                  {item.current && (
                    <span className="rounded-full bg-green-500/15 px-4 py-2 text-sm font-semibold text-green-400 ring-1 ring-green-500/30">
                      ● Current
                    </span>
                  )}

                </div>

                <p className="relative mt-6 leading-8 text-gray-400">
                  {item.description}
                </p>
                

              </motion.div>
            </motion.div>
          ))}

        </div>
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mt-20 flex justify-center"
>
  <a
    href="/Arif-CV.pdf"
    download
    className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(59,130,246,.6)]"
  >
    📄 Download Resume
    <span className="transition-transform duration-300 group-hover:translate-y-1">
      ↓
    </span>
  </a>
</motion.div>
      </div>
    </section>
  );
}