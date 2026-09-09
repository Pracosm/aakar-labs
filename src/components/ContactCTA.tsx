import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import SectionLabel from "./ui/SectionLabel";
import Magnetic from "./Magnetic";
import BookCallButton from "./BookCallButton";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="relative w-full px-5 py-14 md:px-10 md:py-24 lg:px-14 lg:py-28"
      style={{ borderTop: "1px solid rgba(236,238,245,0.05)" }}
    >
      <div className="max-w-[1160px] mx-auto flex flex-col items-center gap-5 text-center md:gap-10">
        <SectionLabel code="AKR-007" label="GET_IN_TOUCH" />

        <h2 className="section-heading g-rise max-w-[14ch] md:max-w-[860px]">
          Ready when{" "}
          <span style={{ color: "var(--laptop-glow)" }}>you are.</span>
        </h2>

        <p className="hidden body-copy max-w-[520px] md:block">
          Tell us about your project. We respond within 24 hours with a scope,
          timeline, and deliverables outline.
        </p>

        <div className="mt-2 flex w-full max-w-[22rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <Magnetic strength={0.3} className="w-full sm:w-auto">
            <BookCallButton className="btn-cta btn-cta-primary" />
          </Magnetic>
          <Magnetic strength={0.2} className="w-full sm:w-auto">
            <Link href="/start-project" className="btn-cta btn-cta-ghost">
              Start a project
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
