import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  User,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetails({
  params,
}: PageProps) {
  const { slug } = await params;

  const title = slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

  return (
    <main className="min-h-screen bg-[#09090B] text-white">

      <section className="mx-auto max-w-5xl px-6 py-16">

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 transition hover:text-blue-400"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </Link>

        <div className="mt-10">

          <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            AI
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            {title}
          </h1>

          <div className="mt-8 flex flex-wrap gap-6 text-gray-400">

            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              July 10, 2026
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={18} />
              8 min read
            </div>

            <div className="flex items-center gap-2">
              <User size={18} />
              Arif Sarkar
            </div>

          </div>

        </div>
                {/* Featured Image */}

        <div className="relative mt-14 overflow-hidden rounded-3xl border border-white/10">

          <Image
            src="/blog/featured.jpg"
            alt={title}
            width={1400}
            height={800}
            priority
            className="h-[500px] w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        </div>

        {/* Article */}

        <div className="mx-auto mt-16 max-w-4xl">

          <p className="text-lg leading-9 text-gray-300">
            Artificial Intelligence has completely changed the digital
            marketing industry. From content creation to campaign
            optimization, AI tools are helping businesses grow faster
            while reducing manual work and increasing productivity.
          </p>

          <h2 className="mt-14 text-4xl font-bold">
            Why Every Digital Marketer Should Use AI
          </h2>

          <p className="mt-8 leading-9 text-gray-400">
            Whether you're running Meta Ads, building WordPress websites,
            writing SEO articles or generating leads, AI can save hours of
            work every single week. It allows marketers to automate
            repetitive tasks and focus on strategy instead of spending
            valuable time doing everything manually.
          </p>

          <div className="my-12 rounded-3xl border-l-4 border-blue-500 bg-white/5 p-8">

            <p className="text-2xl font-medium italic leading-10 text-white">
              “AI will not replace marketers.
              Marketers who use AI will replace those who don't.”
            </p>

          </div>

          <h2 className="mt-14 text-4xl font-bold">
            Key Benefits
          </h2>

          <ul className="mt-8 space-y-5 text-lg text-gray-300">

            <li>✅ Save hours every week</li>

            <li>✅ Create high-quality content faster</li>

            <li>✅ Optimize Meta Ads campaigns</li>

            <li>✅ Improve SEO performance</li>

            <li>✅ Increase business productivity</li>

          </ul>
                    {/* Inline Image */}

          <div className="my-16 overflow-hidden rounded-3xl border border-white/10">

            <Image
              src="/blog/meta-ads.jpg"
              alt="AI Marketing"
              width={1200}
              height={700}
              className="h-[420px] w-full object-cover"
            />

          </div>

          <h2 className="text-4xl font-bold">
            Final Thoughts
          </h2>

          <p className="mt-8 leading-9 text-gray-400">
            AI is no longer optional for digital marketers. Whether you're
            managing Meta Ads, building websites or writing SEO content,
            using the right AI tools can dramatically improve your
            productivity and business growth.
          </p>

          {/* Author */}

          <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8">

            <div className="flex items-center gap-5">

              <Image
                src="/profile.png"
                alt="Arif Sarkar"
                width={90}
                height={90}
                className="rounded-full border-2 border-blue-500"
              />

              <div>

                <h3 className="text-2xl font-bold">
                  Arif Sarkar
                </h3>

                <p className="mt-2 text-gray-400">
                  Digital Marketing Specialist, Meta Ads Expert,
                  SEO Strategist & WordPress Developer.
                </p>

              </div>

            </div>

          </div>

        </div>
{/* Related Articles */}

<div className="mt-24">

  <h2 className="text-3xl font-black">
    Related Articles
  </h2>

  <div className="mt-10 grid gap-8 md:grid-cols-3">

    {[
      {
        title: "5 Meta Ads Strategies That Generate More Leads",
        image: "/blog/meta-ads.jpg",
        slug: "meta-ads-guide",
      },
      {
        title: "How to Build a Fast WordPress Website",
        image: "/blog/wordpress.jpg",
        slug: "wordpress-speed",
      },
      {
        title: "10 Best AI Tools Every Digital Marketer Should Use",
        image: "/blog/featured.jpg",
        slug: "best-ai-tools",
      },
    ].map((item) => (

      <Link
        key={item.slug}
        href={`/blog/${item.slug}`}
        className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,.2)]"
      >

        <Image
          src={item.image}
          alt={item.title}
          width={500}
          height={320}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="p-6">

          <h3 className="text-xl font-bold transition group-hover:text-blue-400">
            {item.title}
          </h3>

          <span className="mt-5 inline-block font-semibold text-blue-400">
            Read Article →
          </span>

        </div>

      </Link>

    ))}

  </div>

</div>

{/* Newsletter */}

<div className="mt-24 overflow-hidden rounded-[32px] border border-blue-500/20 bg-gradient-to-r from-blue-600/20 to-cyan-500/10 p-10 text-center">

  <h2 className="text-4xl font-black">
    Join My Newsletter
  </h2>

  <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-300">
    Get the latest articles, AI tools, Meta Ads strategies,
    WordPress tutorials and SEO tips directly in your inbox.
  </p>

  <div className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">

    <input
      type="email"
      placeholder="Enter your email..."
      className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 outline-none placeholder:text-gray-400 focus:border-blue-500"
    />

    <button
      className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
    >
      Subscribe
    </button>

  </div>

</div>
      </section>
          </main>
  );
}