import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import About from "@/components/About";
import Leadership from "@/components/Leadership";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col bg-bg-page">
      <Navbar />
      <Hero />
      <AnimateOnScroll>
        <Services />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <SelectedWork />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Process />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <About />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Leadership />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <ContactCTA />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Footer />
      </AnimateOnScroll>
    </div>
  );
}
