import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import { ArrowLeft } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type Post = {
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(query, { slug });
  return { title: post?.title ?? "Article", alternates: { canonical: `/blog/${slug}` } };
}

export default async function BlogDetails({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(query, { slug });
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-400 transition hover:text-gold">
          <ArrowLeft size={18} /> Back to Insights
        </Link>

        {post.category && (
          <span className="mt-10 block text-xs uppercase tracking-[4px] text-gold">{post.category}</span>
        )}
        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">{post.title}</h1>
        {post.publishedAt && (
          <p className="mt-4 text-zinc-500">{new Date(post.publishedAt).toLocaleDateString("en-GB", { dateStyle: "long" })}</p>
        )}

        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).width(1200).url()}
            alt={post.title}
            width={1200}
            height={700}
            className="mt-10 w-full rounded-3xl object-cover"
          />
        )}

        <div className="prose prose-invert mt-10 max-w-none prose-a:text-gold">
          {post.body && <PortableText value={post.body} />}
        </div>
      </article>
    </main>
  );
}
