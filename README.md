# Arif — Real Estate Consultant & Realtor

Website for Arif, a Realtor serving Dhaka, Chattogram and Cumilla. Built with Next.js (App Router), Tailwind CSS v4, Framer Motion, React Three Fiber (3D hero) and Sanity (blog CMS at `/studio`).

## Run locally

```bash
cp .env.example .env.local   # add the Sanity project ID and dataset
npm install
npm run dev                  # http://localhost:3000
```

`npm run build` and `npm run lint` should both pass before deploying.

## Where things live

| What | Where |
| --- | --- |
| Name, phone, email, domain, social links | `src/data/profile.ts` (the domain also drives canonical URLs, sitemap and robots) |
| Featured listings (sample data for now) | `src/data/properties.ts` |
| Closed deals shown on the map | `src/data/deals.ts` |
| Built-in articles | `src/data/articles.ts` (more posts can be added in Sanity Studio) |
| Home page sections | `src/sections/` |
| Share image for social links | `src/app/opengraph-image.tsx` |

Pages that read Sanity (home, `/blog`, posts, sitemap) refresh every hour, so new posts appear without a redeploy.
