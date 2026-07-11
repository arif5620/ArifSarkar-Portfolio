"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 xl:py-32"
    >
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute right-0 bottom-20 h-96 w-96 rounded-full bg-purple-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* ================= Header ================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >

          <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-400 backdrop-blur-xl">
            ABOUT ME
          </span>

          <h2
            className="
              mt-6
              text-3xl
              sm:text-4xl
              lg:text-5xl
              xl:text-[56px]
              font-bold
              leading-[1.15]
              tracking-tight
              text-white
            "
          >
            Turning Ideas Into{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">
              High-Converting
            </span>
            <br />
            Digital Experiences
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-gray-400
              sm:text-base
              lg:text-lg
              lg:leading-8
            "
          >
            I'm a passionate Web Designer & Digital Marketer focused on
            building premium websites that don't just look beautiful—they
            generate leads, increase conversions, and grow businesses.
          </p>

        </motion.div>

        {/* ================= Main Grid ================= */}

        <div
          className="
            mx-auto
            mt-16
            grid
            max-w-6xl
            gap-8
            lg:grid-cols-2
            xl:gap-10
            items-stretch
          "
        >
                    {/* ================= Left : Intro Video ================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{
              y: -6,
              scale: 1.01,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="
              relative
              flex
              h-full
              items-center
              justify-center
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-4
              backdrop-blur-2xl
            "
          >
            {/* Glow */}
            <div className="absolute -left-10 top-0 h-44 w-44 rounded-full bg-cyan-500/20 blur-[80px]" />

            <div className="relative z-10 w-full overflow-hidden rounded-2xl">
<p className="text-red-500 text-center">VIDEO TEST</p>
              <video
  key="video-v2"
  src="/videos/video.mp4"
  controls
  preload="auto"
  className="w-full h-[340px] rounded-2xl bg-black"
/>

            </div>

          </motion.div>

          {/* ================= Right : Career Timeline ================= */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{
              y: -6,
              scale: 1.01,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="
              relative
              flex
              h-full
              flex-col
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-5
              sm:p-6
              lg:p-8
              backdrop-blur-2xl
            "
          >

            {/* Glow */}

            <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-purple-500/20 blur-[90px]" />

            <div className="relative z-10">

              <h3 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
                Career Timeline
              </h3>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">

                {[
                  {
                    year: "2018",
                    title: "Started My Digital Journey",
                  },
                  {
                    year: "2020",
                    title: "Digital Marketing",
                  },
                  {
                    year: "2022",
                    title: "WordPress Website Designer",
                  },
                  {
                    year: "2023",
                    title: "Meta Ads Specialist",
                  },
                  {
                    year: "2024",
                    title: "SEO & Lead Generation",
                  },
                  {
                    year: "2025",
                    title: "AI Solutions Expert",
                  },
                ].map((item, index) => (

                  <motion.div
                    key={item.year}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.05,
                    }}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-3
                      sm:p-4
                      backdrop-blur-xl
                      transition-all
                      duration-300
                    "
                  >

                    <h4
                      className="
                        bg-gradient-to-r
                        from-cyan-400
                        to-blue-500
                        bg-clip-text
                        text-xl
                        font-bold
                        text-transparent
                        sm:text-2xl
                        lg:text-3xl
                      "
                    >
                      {item.year}
                    </h4>

                    <p
                      className="
                        mt-2
                        text-[11px]
                        leading-5
                        text-gray-300
                        sm:text-xs
                        lg:text-sm
                      "
                    >
                      {item.title}
                    </p>

                  </motion.div>

                ))}

              </div>

            </div>

          </motion.div>

        </div>

        {/* ================= Skills ================= */}
        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="mt-16 sm:mt-20 lg:mt-28"
>
  <div className="mb-12 text-center">

    <span className="text-sm uppercase tracking-[4px] text-cyan-400">
      MY EXPERTISE
    </span>

    <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
      Skills & Technologies
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
      Combining modern web technologies with digital marketing strategies to
      build high-converting websites and online business solutions.
    </p>

  </div>

  <div className="grid gap-8 lg:grid-cols-2">

    {/* Left */}

    <div className="space-y-8">

      {[
        ["Web Design", 95],
        ["UI / UX Design", 92],
        ["WordPress", 98],
        ["Elementor", 98],
      ].map(([skill, value], index) => (

        <motion.div
          key={skill as string}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.12,
          }}
        >

          <div className="mb-3 flex items-center justify-between">

            <span className="font-medium text-white">
              {skill}
            </span>

            <span className="font-semibold text-cyan-400">
              {value}%
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${value}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 1.3,
                delay: index * 0.2,
              }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            />

          </div>

        </motion.div>

      ))}

    </div>

    {/* Right */}

    <div className="space-y-8">

      {[
        ["Digital Marketing", 95],
        ["Meta Ads", 96],
        ["SEO", 90],
        ["AI Automation", 88],
      ].map(([skill, value], index) => (

        <motion.div
          key={skill as string}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.12,
          }}
        >

          <div className="mb-3 flex items-center justify-between">

            <span className="font-medium text-white">
              {skill}
            </span>

            <span className="font-semibold text-cyan-400">
              {value}%
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${value}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 1.3,
                delay: index * 0.2,
              }}
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400"
            />

          </div>

        </motion.div>

      ))}

    </div>

  </div>

</motion.div>

{/* ================= Stats ================= */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="mt-16 sm:mt-20 lg:mt-28"
>
  <div className="mb-12 text-center">

    <span className="text-sm uppercase tracking-[4px] text-cyan-400">
      MY ACHIEVEMENTS
    </span>

    <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
      Numbers That Matter
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
      Every project is focused on performance, quality, and measurable business growth.
    </p>

  </div>

  <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">

    {[
      {
        value: "100+",
        title: "Projects Completed",
      },
      {
        value: "300+",
        title: "Happy Clients",
      },
      {
        value: "5+",
        title: "Years Experience",
      },
      {
        value: "100%",
        title: "Client Satisfaction",
      },
    ].map((item, index) => (

      <motion.div
        key={item.title}
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          delay: index * 0.1,
        }}
        whileHover={{
          y: -8,
          scale: 1.03,
        }}
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-5
          sm:p-6
          lg:p-8
          backdrop-blur-2xl
        "
      >

        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10">

          <h3
            className="
              bg-gradient-to-r
              from-cyan-400
              via-sky-400
              to-blue-500
              bg-clip-text
              text-4xl
              font-bold
              text-transparent
              sm:text-5xl
            "
          >
            {item.value}
          </h3>

          <p className="mt-4 text-sm leading-6 text-gray-400 sm:text-base">
            {item.title}
          </p>

        </div>

      </motion.div>

    ))}

  </div>

</motion.div>

{/* ================= CTA ================= */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="
    relative
    mt-20
    overflow-hidden
    rounded-[32px]
    border
    border-white/10
    bg-white/5
    p-6
    backdrop-blur-2xl
    sm:mt-24
    sm:p-8
    lg:mt-32
    lg:p-16
  "
>
  {/* Glow */}
  <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
  <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-purple-500/20 blur-[120px]" />

  <div className="relative z-10 text-center">

    <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium tracking-[3px] text-cyan-400">
      LET'S BUILD SOMETHING AMAZING
    </span>

    <h2 className="mt-8 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
      Ready To Grow{" "}
      <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">
        Your Business?
      </span>
    </h2>

    <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base lg:text-lg lg:leading-8">
      Whether you need a premium website, digital marketing strategy,
      SEO, Meta Ads or AI-powered business solutions,
      I'm ready to help you grow online.
    </p>

    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

      <a
        href="#contact"
        className="
          w-full
          rounded-full
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          px-8
          py-4
          text-center
          font-semibold
          text-white
          transition
          duration-300
          hover:scale-105
          hover:shadow-[0_0_35px_rgba(6,182,212,.45)]
          sm:w-auto
        "
      >
        Start a Project
      </a>

    </div>

  </div>

</motion.div>

      </div>
    </section>
  );
}