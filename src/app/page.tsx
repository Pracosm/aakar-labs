import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import About from "@/components/About";
import Leadership from "@/components/Leadership";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import JsonLd from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${SITE_NAME} — Branding, UX/UI & Digital Identity Studio`,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#studio` },
  primaryImageOfPage: `${SITE_URL}/hero-poster.jpg`,
};

export default function Home() {
  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col">
      <JsonLd data={pageJsonLd} />
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
      <main id="main">
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
      </main>
      <Footer />
    </div>
  );
}
