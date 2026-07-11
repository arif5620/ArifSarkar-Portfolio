"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const projects = [
  
  {
    title: "ArifSarkar.com",
    category: "Personal Portfolio",
    description:
      "My personal portfolio showcasing my skills, experience and completed projects.",
    image: "/projects/arif.jpg",
    link: "https://arifsarkar.com",
  },
  {
    title: "Fortune Construction",
    category: "Real Estate Website",
    description:
      "Professional real estate company website with modern UI and project showcase.",
    image: "/projects/fcl.png",
    link: "https://fortuneconstruction.com.bd",
  },
  {
    title: "Orvix Real Estate",
    category: "Real Estate Brokerage",
    description:
      "Property buying, selling and brokerage company website.",
    image: "/projects/orvix.png",
    link: "https://orvixrealestate.com",
  },
  {
    title: "Obazar",
    category: "E-commerce Website",
    description:
      "Modern e-commerce platform for electronic gadgets and devices",
    image: "/projects/obazar.png",
    link: "https://obazar.online",
  },
  {
    title: "Radiant IT",
    category: "WordPress Website",
    description:
      "A digital agency website offering digital marketing services, website development and digital products.",
    image: "/projects/rit.png",
    link: "https://radiantit.online",
  },
  {
    title: "Fruvita",
    category: "Organic Food E-commerce",
    description:
      "Online organic food store with a clean shopping experience.",
    image: "/projects/fruvitabd.png",
    link: "https://fruvitabd.com",
  },
  
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-black py-16 text-white sm:py-20 lg:py-24"
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
            Portfolio
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
            Featured
            <span className="text-blue-500"> Projects</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-400 sm:text-lg">
            Some of my recent projects built with WordPress,
            Digital Marketing and Modern Web Technologies.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {projects.map((project, index) => (

            <motion.a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
              whileHover={{
                y: -12,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 transition-all duration-500 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20"
            >

              <div className="relative overflow-hidden">

                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={360}
                  className="h-60 w-full object-cover transition-all duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              </div>

              <div className="p-6">

                <p className="text-sm font-medium text-blue-400">
                  {project.category}
                </p>

                <h3 className="mt-3 text-2xl font-bold transition-colors duration-300 group-hover:text-blue-400">
                  {project.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  {project.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 font-medium text-blue-400">

                  <span className="transition-all duration-300 group-hover:translate-x-1">
                    View Project
                  </span>

                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />

                </div>

              </div>

            </motion.a>

          ))}

        </div>

      </div>
    </section>
  );
}