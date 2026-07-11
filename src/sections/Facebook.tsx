"use client";

import { motion } from "framer-motion";
import {
  FaBullseye,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

const campaigns = [
  {
    title: "Real Estate Lead Generation",
    company: "Fortune Construction Ltd.",
    objective: "Lead Generation",
    result: "120+ Qualified Leads",
    budget: "৳20,000",
    icon: <FaBullseye className="text-3xl text-blue-500" />,
  },
  {
    title: "Digital Product Sales",
    company: "Radiant IT",
    objective: "Sales Campaign",
    result: "High Conversion Rate",
    budget: "৳15,000",
    icon: <FaChartLine className="text-3xl text-blue-500" />,
  },
  {
    title: "Brand Awareness",
    company: "Meta Ads",
    objective: "Awareness Campaign",
    result: "250K+ People Reached",
    budget: "৳10,000",
    icon: <FaUsers className="text-3xl text-blue-500" />,
  },
];

export default function Facebook() {
  return (
    <section
      id="facebook-ads"
      className="bg-[#050505] py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="text-center"
        >

          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[3px] text-blue-400">
            Meta Ads
          </span>

          <h2 className="mt-6 text-3xl font-black sm:text-4xl md:text-5xl">
            Meta Ads Case Studies
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-400">
            Helping businesses grow with data-driven Meta advertising strategies,
            including lead generation, sales campaigns, remarketing,
            and brand awareness.
          </p>

        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.title}
              initial={{ opacity: 0, y: 70, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                type: "spring",
                stiffness: 90,
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.30)]"
            >
              {/* Animated Glow */}
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-blue-500/20" />

              {/* Icon */}
              <motion.div
                whileHover={{
                  rotate: [0, -10, 10, 0],
                  scale: 1.15,
                }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4"
              >
                {campaign.icon}
              </motion.div>

              <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-blue-400">
                {campaign.title}
              </h3>

              <p className="mt-2 text-blue-400">
                {campaign.company}
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-gray-400">Objective</span>
                  <span className="font-medium text-white">
                    {campaign.objective}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-gray-400">Budget</span>
                  <span className="font-medium text-white">
                    {campaign.budget}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Results</span>

                  <span className="font-semibold text-green-400 transition-all duration-300 group-hover:scale-110 group-hover:text-green-300">
                    {campaign.result}
                  </span>
                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}