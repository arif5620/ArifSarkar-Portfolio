import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { PostCardView } from "@/components/PostGrid";
import { getPosts } from "@/data/posts";

export default async function Blog() {
  const posts = (await getPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative overflow-hidden bg-[#09090B] py-20 lg:py-28">
      <div className="animate-drift absolute -right-40 top-0 h-96 w-96 rounded-full bg-gold/10 blur-[150px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Insights"
          title="Guides before you decide"
          text="Practical advice on buying, selling, renting and investing in Dhaka, Chattogram and Cumilla."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => <PostCardView key={p.slug} post={p} index={i} />)}
        </div>
        <div className="mt-12 text-center">
          <Link href="/blog" className="glass inline-block rounded-full px-8 py-3.5 font-semibold text-gold transition hover:border-gold/60">
            View all articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
