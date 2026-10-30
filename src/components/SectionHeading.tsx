"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <motion.div
      className="mx-auto max-w-3xl text-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.p
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6 }}
        className="glass inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-[5px] text-gold"
      >
        {eyebrow}
      </motion.p>

      {/* Each word rises out of its own mask, one after another. */}
      <h2 className="mt-5 text-4xl font-semibold sm:text-6xl">
        {title.split(" ").map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-2 align-top">
            <motion.span
              className="inline-block bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent"
              variants={{ hidden: { y: "110%", rotate: 6 }, show: { y: 0, rotate: 0 } }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease }}
            >
              {w}&nbsp;
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.div
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
        transition={{ duration: 1.2, delay: 0.4, ease }}
        className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent"
      />
      {text && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 leading-8 text-zinc-400"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}
