import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import profile from "@/data/profile";
import MotionProvider from "@/components/MotionProvider";
import { Analytics } from "@vercel/analytics/next";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const title = "Arif | Real Estate Consultant & Realtor in Dhaka, Chattogram & Cumilla";
const description =
  "Buy, sell or rent apartments, houses, land and commercial property in Dhaka, Chattogram and Cumilla with Arif — a trusted Realtor in Bangladesh.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  title: { default: title, template: "%s | Arif, Realtor in Bangladesh" },
  description,
  keywords: [
    "real estate Dhaka",
    "Realtor in Dhaka",
    "apartment for sale in Dhaka",
    "flat for rent in Dhaka",
    "real estate Chattogram",
    "flat for sale in Chattogram",
    "property in Cumilla",
    "land for sale in Cumilla",
    "property consultant Bangladesh",
    "buy apartment Gulshan",
    "Bashundhara flat for sale",
    "Arif Sarkar",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: profile.website,
    siteName: "Arif — Real Estate",
    locale: "en_BD",
    type: "website",
    // The share image comes from app/opengraph-image.tsx.
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  authors: [{ name: profile.name, url: profile.website }],
  creator: profile.name,
  category: "Real Estate",
  // Google Search Console ownership (also verified by public/google0410effcd4624537.html).
  verification: { google: "IV7ofvZRcwgd_WFCUhswmhfGNpBdkIzFCS0bVssLXe0" },
};

// Browser UI colour matches the page background in each theme.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8f2" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

const agent = {
  "@type": "RealEstateAgent",
  "@id": `${profile.website}/#agent`,
  name: profile.name,
  alternateName: "Arif Sarkar",
  description,
  url: profile.website,
  image: `${profile.website}/profile.png`,
  telephone: profile.phone,
  email: profile.email,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  areaServed: ["Dhaka", "Chattogram", "Cumilla"],
  sameAs: Object.values(profile.social),
};

// WebSite entity tells Google the site's name for search results.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    agent,
    {
      "@type": "WebSite",
      "@id": `${profile.website}/#website`,
      url: profile.website,
      name: "Arif Sarkar",
      alternateName: ["Arif — Real Estate", "arifsarkar.com"],
      inLanguage: "en-BD",
      publisher: { "@id": `${profile.website}/#agent` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Before first paint: apply the saved light/dark choice, and skip the intro if it already played this session. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var d=document.documentElement,t=localStorage.getItem('theme');if(t==='dark'||t==='light')d.dataset.theme=t;if(sessionStorage.getItem('intro-seen'))d.classList.add('intro-seen');sessionStorage.setItem('intro-seen','1')}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
        {/* Visitor stats in the Vercel dashboard (Analytics tab). */}
        <Analytics />
      </body>
    </html>
  );
}
