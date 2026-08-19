import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

// Server-composed homepage. Every section renders to HTML on the server
// (readable with JS disabled, crawlable). No ssr:false, no boot animation.
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
