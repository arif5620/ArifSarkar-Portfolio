# Arif Sarkar — Real Estate

Website for Arif, a Realtor in Dhaka, Chattogram and Cumilla. Built with Next.js (App Router), Tailwind CSS,
Framer Motion and react-three-fiber, with blog posts from Sanity.

## Getting started

Create `.env.local` with your Sanity project:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

Then:

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Where things live

- `src/data/profile.ts`: name, phone, email, social links and the site URL (used for SEO, sitemap and robots).
- `src/data/properties.ts`: featured listings (sample stock photos; replace with real inventory).
- `src/data/articles.ts`: built-in articles. More posts come from Sanity, edited at `/studio`.
- `src/data/deals.ts`: closed deals shown as pins on the service-area map.
- `src/sections/`: the sections of the home page.

Pages that read Sanity revalidate hourly, so new posts appear without a redeploy.
