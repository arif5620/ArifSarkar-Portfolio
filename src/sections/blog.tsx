"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaClock, FaCalendarAlt } from "react-icons/fa";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type BlogPost = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt: string;
  mainImage: SanityImageSource | null;
  category: string;
};

const query = `*[_type=="post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  "category": categories[0]->title
}`;

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await client.fetch<BlogPost[]>(query);
        setPosts(data);
      } catch (error) {
        console.error("Failed to load blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const featured = posts[0];
  const blogs = posts.slice(1, 4);

  if (loading) {
    return null;
  }

  if (!featured) {
    return null;
  }

  return (
    <section
      id="blog"
      className="relative overflow-hidden bg-black py-20 text-white lg:py-24"
    >
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[3px] text-blue-400">
            Blog
          </span>

          <h2 className="mt-6 text-4xl font-black md:text-5xl">
            Latest Articles
            <span className="text-blue-500"> & Insights</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-400">
            Practical articles about SEO, AI, Meta Ads, WordPress and Digital
            Marketing to help businesses grow online.
          </p>
        </motion.div>

        <div className="mt-16 space-y-10">
                    {/* Featured Article */}

          <motion.article
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,.25)]"
          >
            <div className="grid lg:grid-cols-2">

              {/* Image */}

              <div className="relative overflow-hidden">
                {featured.mainImage ? (
                  <img
                    src={urlFor(featured.mainImage).width(900).height(600).url()}
                    alt={featured.title}
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-full"
                  />
                ) : (
                  <div className="flex h-72 w-full items-center justify-center bg-slate-900 text-gray-400 lg:h-full">
                    No image available
                  </div>
                )}

                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                    Featured
                  </span>
                </div>

              </div>

              {/* Content */}

              <div className="flex flex-col justify-center p-8 lg:p-10">

                <span className="w-fit rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400">
                  {featured.category}
                </span>

                <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-500">

                  <span className="flex items-center gap-2">
                    <FaCalendarAlt />
                    {new Date(featured.publishedAt).toLocaleDateString()}
                  </span>

                  <span className="flex items-center gap-2">
                    <FaClock />
                    5 min read
                  </span>

                </div>

                <h3 className="mt-6 text-3xl font-black leading-tight transition-colors duration-300 group-hover:text-blue-400">
                  {featured.title}
                </h3>

                <p className="mt-6 leading-8 text-gray-400">
                  {featured.excerpt}
                </p>

                <a
                  href={`/blog/${featured.slug.current}`}
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-blue-400 transition-all duration-300 hover:gap-4"
                >
                  Read Article
                  <FaArrowRight />
                </a>

              </div>

            </div>

          </motion.article>

          {/* Articles Grid */}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {blogs.map((blog, index) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-blue-500 hover:shadow-[0_0_35px_rgba(59,130,246,.2)]"
              >
                                {/* Thumbnail */}

                <div className="overflow-hidden">
                  {blog.mainImage ? (
                    <img
                      src={urlFor(blog.mainImage).width(600).height(400).url()}
                      alt={blog.title}
                      className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-56 w-full items-center justify-center bg-slate-900 text-gray-400">
                      No image available
                    </div>
                  )}
                </div>

                {/* Content */}

                <div className="p-6">

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400">
                    {blog.category}
                  </span>

                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">

                    <span className="flex items-center gap-2">
                      <FaCalendarAlt />
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </span>

                    <span className="flex items-center gap-2">
                      <FaClock />
                      5 min read
                    </span>

                  </div>

                  <h3 className="mt-5 text-xl font-bold leading-snug transition-colors duration-300 group-hover:text-blue-400">
                    {blog.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-400">
                    {blog.excerpt}
                  </p>

                  <a
                    href={`/blog/${blog.slug.current}`}
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-400 transition-all duration-300 group-hover:gap-4"
                  >
                    Read Article
                    <FaArrowRight />
                  </a>

                </div>

              </motion.article>
            ))}

          </div>
                    {/* View All Button */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center pt-12"
          >
            <a
              href="/blog"
              className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-[0_0_25px_rgba(59,130,246,.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,.55)]"
            >
              View All Articles
            </a>
          </motion.div>

        </div>

      </div>

    </section>
  );
}