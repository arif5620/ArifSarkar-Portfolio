import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileActionBar from "@/components/MobileActionBar";
import ScrollProgress from "@/components/ScrollProgress";
import PostGrid from "@/components/PostGrid";
import { getPosts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Real Estate Insights",
  description: "Guides on buying, selling, renting and investing in property in Dhaka, Chattogram and Cumilla.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-ink text-fg">
      <ScrollProgress />
      <Navbar />
      <section className="relative overflow-hidden pb-24 pt-36">
        <div className="bg-grid absolute inset-0" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <p className="glass inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-[5px] text-gold">Insights</p>
            <h1 className="mt-6 text-5xl font-semibold sm:text-7xl">
              Real estate, <span className="text-shimmer italic">made simple</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl leading-8 text-mute">
              Practical guides on buying, selling, renting and investing in Dhaka, Chattogram and Cumilla.
            </p>
          </div>

          <PostGrid posts={posts} />
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
      <MobileActionBar />
    </main>
  );
}
