import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import About from "@/components/About";
import Leadership from "@/components/Leadership";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Home() {
  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col">
      {/* Dark veil — transparent over the hero, fades in as you reach the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0"
        style={{
          top: "100vh",
          bottom: 0,
          zIndex: -1,
          background:
            "linear-gradient(180deg, rgba(5,5,9,0) 0%, rgba(5,5,9,0.35) 40vh, rgba(5,5,9,0.5) 100vh, rgba(5,5,9,0.55) 100%)",
        }}
      />

      <Navbar />
      <Hero />
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
      <Footer />
    </div>
  );
}
