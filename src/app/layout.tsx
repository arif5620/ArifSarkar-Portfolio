import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import profile from "@/data/profile";
import CursorGlow from "@/components/CursorGlow";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
    images: ["/profile.png"],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/profile.png"] },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: profile.name,
  description,
  url: profile.website,
  image: `${profile.website}/profile.png`,
  telephone: profile.phone,
  email: profile.email,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  areaServed: ["Dhaka", "Chattogram", "Cumilla"],
  sameAs: Object.values(profile.social),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <CursorGlow />
        <SmoothScroll />
      </body>
    </html>
  );
}
