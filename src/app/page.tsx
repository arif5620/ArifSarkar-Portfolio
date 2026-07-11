import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
// import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Facebook from "@/sections/Facebook";
import Services from "@/sections/Services";
import Experience from "@/sections/Experience";
import Blog from "@/sections/blog";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FacebookAds from "@/sections/Facebook";

export default function Home() {
  return (
    <main className="min-h-[100svh] bg-black text-white">
      <Navbar />
      <Hero />
      <About />
      {/* <Skills /> */}
      <Projects />
      <Facebook/>
      <Services />
      <Experience />
      <Blog />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}