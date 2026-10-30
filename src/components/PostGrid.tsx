"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock, Search } from "lucide-react";
import type { PostCard } from "@/data/posts";
import { formatDate } from "@/data/articles";

export function PostCardView({ post, index = 0 }: { post: PostCard; index?: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="glass card-glow group block h-full overflow-hidden rounded-3xl transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_70px_-15px_rgba(201,164,76,.4)]"
      >
        <div className="relative h-56 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-black">
            {post.category}
          </span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-mute-2">
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1"><Clock size={13} /> {post.readMinutes} min read</span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold leading-snug transition group-hover:text-gold">{post.title}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-mute">{post.excerpt}</p>
          <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-gold transition-all group-hover:gap-4">
            Read article <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PostGrid({ posts }: { posts: PostCard[] }) {
  const [category, setCategory] = useState("All");
  const [q, setQ] = useState("");
  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const shown = posts.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (p.title + p.excerpt).toLowerCase().includes(q.trim().toLowerCase()),
  );

  return (
    <>
      <div className="mx-auto mt-12 max-w-2xl">
        <div className="relative">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-mute-2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles..."
            aria-label="Search articles"
            className="glass w-full rounded-full py-4 pl-14 pr-5 text-fg outline-none transition placeholder:text-mute-2 focus:border-gold"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              c === category ? "bg-gold text-black" : "glass text-soft hover:text-gold"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => <PostCardView key={p.slug} post={p} index={i % 3} />)}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 && <p className="mt-16 text-center text-mute-2">No articles match your search.</p>}
    </>
  );
}
