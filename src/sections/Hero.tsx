"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import CountUp from "react-countup";
import { FaMeta } from "react-icons/fa6";
import { FaWordpress } from "react-icons/fa";
import { SiGoogleads } from "react-icons/si";
import { RiRobot2Line } from "react-icons/ri";
import { TbSeo } from "react-icons/tb";

import AuroraStars from "@/components/AuroraStars";
import profile from "@/data/profile";

import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: .8,
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: .8,
    },
  },
};

const float: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "90px 90px",
        }}
      />

      <AuroraStars />

      {/* Aurora */}

      <div className="absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            x:[0,120,-60,0],
            y:[0,-80,40,0],
            scale:[1,1.2,1],
          }}
          transition={{
            duration:20,
            repeat:Infinity,
            ease:"easeInOut",
          }}
          className="
          absolute
          left-[-15%]
          top-[-15%]

          h-[720px]
          w-[720px]

          rounded-full

          bg-blue-500/20

          blur-[180px]
          "
        />

        <motion.div
          animate={{
            x:[0,-120,70,0],
            y:[0,60,-40,0],
            scale:[1,1.2,1],
          }}
          transition={{
            duration:24,
            repeat:Infinity,
            ease:"easeInOut",
          }}
          className="
          absolute

          right-[-15%]
          bottom-[-25%]

          h-[760px]
          w-[760px]

          rounded-full

          bg-cyan-400/20

          blur-[190px]
          "
        />

        <motion.div
          animate={{
            x:[0,90,-70,0],
            y:[0,80,-40,0],
            scale:[1,1.15,1],
          }}
          transition={{
            duration:30,
            repeat:Infinity,
            ease:"easeInOut",
          }}
          className="
          absolute

          left-1/2
          top-1/3

          h-[520px]
          w-[520px]

          -translate-x-1/2

          rounded-full

          bg-violet-500/15

          blur-[180px]
          "
        />

        <div
          className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_center,rgba(59,130,246,.08),transparent_70%)]
          "
        />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div
          className="
          grid

          min-h-screen

          items-center

          gap-12

          pt-25

          pb-16

          lg:grid-cols-2

          lg:gap-12
          "
        >

          {/* LEFT */}

          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            className="
            order-2

            text-center

            lg:order-1

            lg:text-left
            "
          >

            <span
              className="
              inline-flex

              rounded-full

              border

              border-blue-500/30

              bg-blue-500/10

              px-5

              py-2

              text-xs

              uppercase

              tracking-[4px]

              text-blue-400
              "
            >
              Digital Marketing Expert
            </span>

            <h1
              className="
              mt-8

              text-5xl

              font-black

              leading-tight

              sm:text-6xl

              lg:text-7xl
              "
            >
              {profile.fullName}
            </h1>
                        <h2
              className="
              mt-6

              text-lg

              font-semibold

              leading-8

              text-blue-400

              sm:text-xl

              lg:text-2xl
              "
            >
              Meta Ads Specialist • WordPress Website Designer • AI Solutions Expert
            </h2>

            <p
              className="
              mx-auto

              mt-8

              max-w-xl

              text-base

              leading-8

              text-gray-400

              lg:mx-0
              "
            >
              I help businesses generate more leads, increase sales and build
              premium digital experiences through
              <span className="font-semibold text-white">
                {" "}Meta Advertising
              </span>,
              <span className="font-semibold text-white">
                {" "}WordPress Development
              </span>,
              <span className="font-semibold text-white">
                {" "}SEO
              </span>
              &
              <span className="font-semibold text-white">
                {" "}AI Automation.
              </span>
            </p>

            {/* Buttons */}

            <div
              className="
              mt-10

              flex

              flex-wrap

              justify-center

              gap-4

              lg:justify-start
              "
            >

              <a
                href="#projects"
                className="
                rounded-full

                bg-blue-600

                px-8

                py-4

                font-semibold

                shadow-[0_0_35px_rgba(37,99,235,.45)]

                transition-all

                duration-300

                hover:-translate-y-1

                hover:bg-blue-700
                "
              >
                View My Work
              </a>

              <a
                href="#contact"
                className="
                rounded-full

                border

                border-white/15

                bg-white/5

                px-8

                py-4

                font-semibold

                backdrop-blur-xl

                transition-all

                duration-300

                hover:border-blue-500

                hover:bg-white

                hover:text-black
                "
              >
                Let's Talk
              </a>

            </div>

            {/* Social */}

            <div
              className="
              mt-10

              flex

              justify-center

              gap-4

              lg:justify-start
              "
            >

              <a
                href={profile.social.linkedin}
                target="_blank"
                className="
                rounded-full

                border

                border-white/10

                bg-white/5

                p-4

                backdrop-blur-xl

                transition-all

                hover:-translate-y-1

                hover:bg-blue-700
                "
              >
                <FaLinkedinIn size={20}/>
              </a>

              <a
                href={profile.social.github}
                target="_blank"
                className="
                rounded-full

                border

                border-white/10

                bg-white/5

                p-4

                backdrop-blur-xl

                transition-all

                hover:-translate-y-1

                hover:bg-white

                hover:text-black
                "
              >
                <FaGithub size={20}/>
              </a>

              <a
                href={profile.social.instagram}
                target="_blank"
                className="
                rounded-full

                border

                border-white/10

                bg-white/5

                p-4

                backdrop-blur-xl

                transition-all

                hover:-translate-y-1

                hover:bg-pink-600
                "
              >
                <FaInstagram size={20}/>
              </a>

              <a
                href={profile.social.x}
                target="_blank"
                className="
                rounded-full

                border

                border-white/10

                bg-white/5

                p-4

                backdrop-blur-xl

                transition-all

                hover:-translate-y-1

                hover:bg-zinc-700
                "
              >
                <FaXTwitter size={20}/>
              </a>

            </div>

            {/* Stats */}

            <div
              className="
              mt-12

              grid

              grid-cols-3

              gap-4
              "
            >

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

                <h3 className="text-3xl font-black text-blue-500">

                  <CountUp end={5}/>

                  +

                </h3>

                <p className="mt-2 text-xs text-gray-400">
                  Years Experience
                </p>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

                <h3 className="text-3xl font-black text-blue-500">

                  <CountUp end={100}/>

                  +

                </h3>

                <p className="mt-2 text-xs text-gray-400">
                  Projects
                </p>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

                <h3 className="text-3xl font-black text-blue-500">

                  <CountUp end={300}/>

                  +

                </h3>

                <p className="mt-2 text-xs text-gray-400">
                  Happy Clients
                </p>

              </div>

            </div>

          </motion.div>
                    {/* RIGHT */}

          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            className="
            order-1

            flex

            justify-center

            lg:order-2
            "
          >

            <motion.div
              animate={{
                y:[0,-12,0],
              }}
              transition={{
                duration:5,
                repeat:Infinity,
                ease:"easeInOut",
              }}
              className="relative"
            >

              {/* Glow */}

              <div
                className="
                absolute

                inset-0

                rounded-full

                bg-blue-500/20

                blur-[120px]
                "
              />

              {/* OUTER RING */}

              <motion.div
                animate={{
                  rotate:360,
                }}
                transition={{
                  duration:22,
                  repeat:Infinity,
                  ease:"linear",
                }}
                className="
                absolute

                left-1/2
                top-1/2

                h-[300px]
                w-[300px]

                -translate-x-1/2
                -translate-y-1/2

                rounded-full

                border

                border-blue-500/25

                sm:h-[360px]
                sm:w-[360px]

                lg:h-[500px]
                lg:w-[500px]
                "
              />
              {/* MIDDLE RING */}

              <motion.div
                animate={{
                  rotate:-360,
                }}
                transition={{
                  duration:30,
                  repeat:Infinity,
                  ease:"linear",
                }}
                className="
                absolute

                left-1/2
                top-1/2

                h-[260px]
                w-[260px]

                -translate-x-1/2
                -translate-y-1/2

                rounded-full

                border

                border-cyan-400/20

                sm:h-[320px]
                sm:w-[320px]

                lg:h-[430px]
                lg:w-[430px] 
                "
              />

              {/* INNER RING */}

              <motion.div
                animate={{
                  rotate:-360,
                }}
                transition={{
                  duration:30,
                  repeat:Infinity,
                  ease:"linear",
                }}
                className="
                absolute

                left-1/2
                top-1/2

                h-[260px]
                w-[260px]

                -translate-x-1/2
                -translate-y-1/2

                rounded-full

                border

                border-cyan-400/20

                sm:h-[320px]
                sm:w-[320px]

                lg:h-[380px]
                lg:w-[380px]
                "
              />

              {/* PROFILE */}

              <Image
                src="/profile.png"
                alt={profile.fullName}
                width={460}
                height={460}
                priority
                className="
                relative

                z-20

                w-[230px]

                rounded-full

                border-[5px]

                border-blue-500

                object-cover

                shadow-[0_0_70px_rgba(37,99,235,.45)]

                sm:w-[300px]

                md:w-[320px]

                lg:w-[370px]
                "
              />

              {/* META CARD */}

             <motion.div
  variants={float}
  animate="animate"
  className="
  absolute
  left-[-20px]
  top-[2%]

  h-15
  w-15

  rounded-2xl

  border
  border-white/10

  bg-white/10

  backdrop-blur-xl

  flex
  items-center
  justify-center

  shadow-[0_0_35px_rgba(37,99,235,.35)]

  hover:scale-110
  transition-all
"
>

<FaMeta
size={44}
className="text-blue-500"
/>

</motion.div>

              {/* WORDPRESS */}

              <motion.div
variants={float}
animate="animate"
transition={{delay:1}}

className="
absolute

right-[-30px]
top-[7%]

h-15
w-15

rounded-2xl

border
border-white/10

bg-white/10

backdrop-blur-xl

flex
items-center
justify-center

shadow-[0_0_35px_rgba(37,99,235,.35)]
"

>

<FaWordpress
size={42}
className="text-blue-500"
/>

</motion.div>

              {/* AI */}

             <motion.div
variants={float}
animate="animate"
transition={{delay:3}}

className="
absolute

left-[-20%]
bottom-[20%]

h-15
w-15

rounded-2xl

border
border-white/10

bg-white/10

backdrop-blur-xl

flex
items-center
justify-center

shadow-[0_0_35px_rgba(37,99,235,.35)]
"

>

<RiRobot2Line
size={40}
className="text-cyan-400"
/>

</motion.div>

              {/* SEO */}

              <motion.div
variants={float}
animate="animate"
transition={{delay:4}}

className="
absolute

left-30
bottom-[-50px]

-translate-x-1/2

h-15
w-15

rounded-full

border-2
border-green-500

bg-black/60

backdrop-blur-xl

flex
items-center
justify-center

shadow-[0_0_35px_rgba(34,197,94,.45)]
"

>

<TbSeo
size={36}
className="text-green-400"
/>

</motion.div>
                            {/* Analytics */}

              <motion.div
variants={float}
animate="animate"
transition={{delay:2}}

className="
absolute

right-[-10%]
bottom-[10%]

h-15
w-15

rounded-2xl

border
border-white/10

bg-white/10

backdrop-blur-xl

flex
items-center
justify-center

shadow-[0_0_35px_rgba(37,99,235,.35)]
"

>

<SiGoogleads
size={40}
/>

</motion.div>

              {/* Small Orbit Dot */}

              <motion.div
                animate={{
                  rotate:360,
                }}
                transition={{
                  duration:16,
                  repeat:Infinity,
                  ease:"linear",
                }}
                className="
                absolute

                inset-0
                "
              >

                <div
                  className="
                  absolute

                  left-1/2

                  top-[-12px]

                  h-4

                  w-4

                  -translate-x-1/2

                  rounded-full

                  bg-cyan-400

                  shadow-[0_0_20px_rgba(34,211,238,.9)]
                  "
                />

              </motion.div>

            </motion.div>

          </motion.div>

        </div>

      </div>

      {/* Scroll Down */}

      <motion.div
        animate={{
          y:[0,10,0],
        }}
        transition={{
          duration:2,
          repeat:Infinity,
        }}
        className="
        absolute

        bottom-8

        left-1/2

        -translate-x-1/2

        text-xs

        uppercase

        tracking-[5px]

        text-gray-500
        "
      >

        Scroll Down

      </motion.div>

    </section>
  );
}