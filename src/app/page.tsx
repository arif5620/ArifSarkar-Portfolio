import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import IntroLoader from "@/components/IntroLoader";
import Hero from "@/sections/Hero";
import DealStory from "@/sections/DealStory";
import About from "@/sections/About";
import Properties from "@/sections/Properties";
import ServiceAreas from "@/sections/ServiceAreas";
import Services from "@/sections/Services";
import EmiCalculator from "@/sections/EmiCalculator";
import WhyChoose from "@/sections/WhyChoose";
import Blog from "@/sections/blog";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileActionBar from "@/components/MobileActionBar";

export default function Home() {
  return (
    <main className="min-h-[100svh] bg-black text-white">
      <IntroLoader />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <DealStory />
      <About />
      <Properties />
      <ServiceAreas />
      <Services />
      <EmiCalculator />
      <WhyChoose />
      <Blog />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <MobileActionBar />
    </main>
  );
}
