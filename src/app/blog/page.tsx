import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, Search } from "lucide-react";

const categories = [
  "All",
  "Meta Ads",
  "SEO",
  "WordPress",
  "AI",
];

const query = `*[_type=="post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "category": categories[0]->title
}`;

export default async function BlogPage() {

  const blogs = await client.fetch(query);

  return (
    <section className="min-h-screen bg-[#09090B] py-20 text-white">

      <div className="mx-auto max-w-7xl px-6">

        {/* Hero */}

        <div className="text-center">

          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[3px] text-blue-400">
            Blog
          </span>

          <h1 className="mt-6 text-5xl font-black">
            Latest Articles &
            <span className="text-blue-500">
              {" "}Insights
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-400">
            Practical guides about Meta Ads, AI,
            SEO, WordPress and Digital Marketing.
          </p>

        </div>
                {/* Search */}

        <div className="mx-auto mt-12 max-w-2xl">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search articles..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-5 text-white outline-none backdrop-blur-xl placeholder:text-gray-500"
            />

          </div>

        </div>

        {/* Categories */}

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          {categories.map((item) => (

            <button
              key={item}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                item === "All"
                  ? "border-blue-500 bg-blue-600 text-white"
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-blue-500"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

        {/* Blog Grid */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {blogs.map((blog: any) => (

            <Link
              key={blog._id}
              href={`/blog/${blog.slug.current}`}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_0_35px_rgba(59,130,246,.2)]"
            >

              <Image
                src={urlFor(blog.mainImage).url()}
                alt={blog.title}
                width={700}
                height={420}
                className="h-60 w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="p-6">

                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400">
                  {blog.category ?? "General"}
                </span>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">

                  <Clock size={15} />

                  {new Date(blog.publishedAt).toLocaleDateString()}

                </div>

                <h2 className="mt-5 text-2xl font-bold leading-snug transition group-hover:text-blue-400">

                  {blog.title}

                </h2>

                <div className="mt-6 flex items-center gap-2 font-semibold text-blue-400 group-hover:gap-4 transition-all">

                  Read Article

                  <ArrowRight size={18} />

                </div>

              </div>

            </Link>

          ))}

        </div>
                {/* Empty State */}

        {blogs.length === 0 && (
          <div className="mt-20 rounded-3xl border border-dashed border-white/10 p-16 text-center">

            <h2 className="text-3xl font-bold">
              No Blog Found
            </h2>

            <p className="mt-5 text-gray-400">
              Publish your first article from Sanity Studio.
            </p>

            <Link
              href="/studio"
              className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              Open Studio
            </Link>

          </div>
        )}

      </div>

    </section>
  );
}