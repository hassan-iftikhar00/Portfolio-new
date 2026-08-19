import Navbar from "@/components/layout/Navbar";
import Marquee from "@/components/layout/Marquee";
import Footer from "@/components/layout/Footer";
import GridLines from "@/components/layout/GridLines";
import Cursor from "@/components/motion/Cursor";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Work from "@/components/sections/Work";
import ProjectIndex from "@/components/sections/ProjectIndex";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Reach from "@/components/sections/Reach";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

// Server-composed homepage. Every section renders to HTML on the server
// (readable with JS disabled, crawlable). No ssr:false, no boot animation.
// Cursor is a decorative client island (pointer-fine only), never in the LCP path.
export default function HomePage() {
  return (
    <>
      <Cursor />
      <GridLines />
      <div className="relative z-10">
        <Navbar />
        <Marquee />
        <main id="main">
          <Hero />
          <Stats />
          <Work />
          <ProjectIndex />
          <Experience />
          <Skills />
          <Reach />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
