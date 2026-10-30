import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import { ArrowLeft, Clock } from "lucide-react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { articles, formatDate } from "@/data/articles";
import { getPosts } from "@/data/posts";
import profile, { waLink } from "@/data/profile";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedSection from "@/components/AnimatedSection";
import MobileActionBar from "@/components/MobileActionBar";
import { PostCardView } from "@/components/PostGrid";

type SanityPost = {
  title: string;
  publishedAt?: string;
  category?: string;
  mainImage?: Parameters<typeof urlFor>[0];
  body?: Parameters<typeof PortableText>[0]["value"];
};

const query = `*[_type=="post" && slug.current==$slug][0]{
  title, publishedAt, mainImage, body, "category": categories[0]->title
}`;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

async function load(slug: string) {
  const local = articles.find((a) => a.slug === slug);
  if (local) return { ...local, body: undefined };
  const p = await client.fetch<SanityPost | null>(query, { slug });
  if (!p) return null;
  return {
    slug,
    title: p.title,
    excerpt: "",
    category: p.category ?? "Insights",
    date: p.publishedAt ?? "",
    readMinutes: 5,
    image: p.mainImage ? urlFor(p.mainImage).width(1600).url() : articles[0].image,
    sections: [],
    body: p.body,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await load(slug);
  return {
    title: post?.title ?? "Article",
    description: post?.excerpt || undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: post ? { images: [post.image], type: "article" } : undefined,
  };
}

export default async function BlogDetails({ params }: Props) {
  const { slug } = await params;
  const post = await load(slug);
  if (!post) notFound();
  const related = (await getPosts()).filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-black text-white">
      <ScrollProgress />
      <Navbar />

      <header className="relative flex min-h-[70svh] items-end overflow-hidden">
        <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="relative mx-auto w-full max-w-4xl px-6 pb-14 pt-40">
          <Link href="/blog" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:text-gold">
            <ArrowLeft size={16} /> All insights
          </Link>
          <AnimatedSection>
            <span className="mt-8 inline-block rounded-full bg-gold px-3 py-1 text-xs font-semibold text-black">{post.category}</span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <span className="text-gold">By {profile.name}</span>
              <span>{formatDate(post.date)}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {post.readMinutes} min read</span>
            </div>
          </AnimatedSection>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-16">
        {post.excerpt && (
          <AnimatedSection>
            <p className="border-l-2 border-gold pl-6 font-display text-2xl leading-relaxed text-zinc-200">{post.excerpt}</p>
          </AnimatedSection>
        )}

        {post.sections.map((s) => (
          <AnimatedSection key={s.heading} className="mt-12">
            <h2 className="text-3xl font-semibold text-gold-soft">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p} className="mt-4 text-lg leading-8 text-zinc-300">{p}</p>
            ))}
            {s.points && (
              <ul className="mt-5 space-y-3">
                {s.points.map((pt) => (
                  <li key={pt} className="glass flex gap-3 rounded-2xl px-5 py-3 text-zinc-200">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /> {pt}
                  </li>
                ))}
              </ul>
            )}
          </AnimatedSection>
        ))}

        {post.body && (
          <div className="prose prose-invert prose-lg mt-10 max-w-none prose-headings:font-display prose-a:text-gold">
            <PortableText value={post.body} />
          </div>
        )}

        <AnimatedSection className="glass card-glow mt-16 flex flex-col items-center gap-6 rounded-[2rem] p-8 text-center sm:flex-row sm:text-left">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-gold">
            <Image src="/profile.png" alt={profile.name} fill sizes="96px" className="object-cover" />
          </div>
          <div className="flex-1">
            <p className="font-display text-3xl font-semibold">Need help with your next move?</p>
            <p className="mt-2 text-zinc-400">I&apos;m {profile.name}, a Realtor in Dhaka, Chattogram and Cumilla. Ask me anything — it&apos;s free.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
              <a href={waLink(`Hello Arif, I just read "${post.title}" and have a question.`)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white hover:bg-green-600">
                <FaWhatsapp /> WhatsApp
              </a>
              <a href={`tel:${profile.phone}`} className="glass flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold hover:text-gold">
                <FaPhoneAlt size={12} /> Call
              </a>
            </div>
          </div>
        </AnimatedSection>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
          <h2 className="text-center text-4xl font-semibold">Keep reading</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => <PostCardView key={p.slug} post={p} index={i} />)}
          </div>
        </section>
      )}

      <Footer />
      <MobileActionBar />
    </main>
  );
}
