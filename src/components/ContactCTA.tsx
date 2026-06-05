import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import SectionLabel from "./ui/SectionLabel";
import Magnetic from "./Magnetic";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="relative w-full px-5 py-20 md:px-10 md:py-24 lg:px-14 lg:py-28"
      style={{ borderTop: "1px solid rgba(236,238,245,0.05)" }}
    >
      <div className="max-w-[1160px] mx-auto flex flex-col items-center gap-10 text-center">
        <SectionLabel code="AKR-007" label="GET_IN_TOUCH" />

        <h2
          className="font-display max-w-[860px]"
          style={{
            fontSize: "clamp(2.25rem, 5vw, 4rem)",
            fontWeight: 700,
            letterSpacing: "-0.06em",
            color: "var(--rim-white)",
            lineHeight: 1.05,
          }}
        >
          Ready to design something
          <br />
          <span style={{ color: "var(--laptop-glow)" }}>
            your users will love?
          </span>
        </h2>

        <p
          className="max-w-[520px]"
          style={{
            fontFamily: "Outfit",
            fontWeight: 300,
            fontSize: 16,
            color: "rgba(236,238,245,0.55)",
            lineHeight: 1.7,
          }}
        >
          Tell us about your project. We respond within 24 hours with a scope,
          timeline, and deliverables outline.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row mt-2">
          <Magnetic strength={0.3}>
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300"
              style={{
                padding: "14px 26px",
                background: "var(--laptop-glow)",
                color: "#000",
                fontFamily: "Outfit",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Start a project
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href="mailto:hello@aakarlabs.art?subject=Project%20inquiry"
              className="inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300"
              style={{
                padding: "14px 26px",
                background: "transparent",
                color: "var(--rim-white)",
                border: "1px solid rgba(236,238,245,0.18)",
                fontFamily: "Outfit",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Email us
            </a>
          </Magnetic>
        </div>

        <span
          className="font-mono mt-4"
          style={{
            fontSize: 10,
            letterSpacing: "0.15em",
            color: "rgba(236,238,245,0.35)",
          }}
        >
          All deliverables are production-ready and handoff-ready.
        </span>
      </div>
    </section>
  );
}
