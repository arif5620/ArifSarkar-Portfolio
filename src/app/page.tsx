import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import IntroLoader from "@/components/IntroLoader";
import Hero from "@/sections/Hero";
import Journey from "@/sections/Journey";
import About from "@/sections/About";
import Properties from "@/sections/Properties";
import ServiceAreas from "@/sections/ServiceAreas";
import Services from "@/sections/Services";
import EmiCalculator from "@/sections/EmiCalculator";
import WhyChoose from "@/sections/WhyChoose";
import Blog from "@/sections/blog";
import Faq, { faqs } from "@/sections/Faq";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileActionBar from "@/components/MobileActionBar";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <main className="min-h-[100svh] bg-ink text-fg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <IntroLoader />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Journey />
      <About />
      <Properties />
      <ServiceAreas />
      <Services />
      <EmiCalculator />
      <WhyChoose />
      <Blog />
      <Faq />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <MobileActionBar />
    </main>
  );
}
