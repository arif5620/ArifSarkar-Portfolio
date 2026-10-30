import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Properties from "@/sections/Properties";
import Services from "@/sections/Services";
import WhyChoose from "@/sections/WhyChoose";
import Blog from "@/sections/blog";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-[100svh] bg-black text-white">
      <Navbar />
      <Hero />
      <About />
      <Properties />
      <Services />
      <WhyChoose />
      <Blog />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
