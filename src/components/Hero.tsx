"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import Magnetic from "./Magnetic";
import Twinkles from "./Twinkles";

export default function Hero() {
  return (
    <section
      className="hero relative min-h-[100dvh] w-full flex flex-col items-center justify-start px-6 md:px-14 pt-[12vh] md:pt-[14vh] pb-12 overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      {/* Subtle veil — sits over the video only, behind text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 0,
          background:
            "linear-gradient(180deg, rgba(5,5,9,0.30) 0%, rgba(5,5,9,0.28) 60%, rgba(5,5,9,0.18) 85%, rgba(5,5,9,0) 100%)",
        }}
      />
      <Twinkles />

      {/* All visible content sits above the veil */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1
          className="font-display text-center"
          style={{
            fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.06em",
            color: "var(--rim-white)",
            textTransform: "lowercase",
            maxWidth: "18ch",
          }}
        >
          we design digital identities that people remember
        </h1>

        <p
          className="mt-6 text-center max-w-[640px]"
          style={{
            fontFamily: "Outfit",
            fontWeight: 300,
            fontSize: 16,
            lineHeight: 1.65,
            color: "rgba(236,238,245,0.65)",
            letterSpacing: "0.01em",
          }}
        >
          Branding, UX/UI, and web experiences for founders, studios, and
          growing teams.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Magnetic strength={0.3}>
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300"
              style={{
                padding: "13px 24px",
                background: "var(--laptop-glow)",
                color: "#000",
                fontFamily: "Outfit",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--rim-white)";
                e.currentTarget.style.boxShadow =
                  "0 0 22px rgba(240,232,213,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--laptop-glow)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Start a project
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300"
              style={{
                padding: "13px 24px",
                background: "rgba(236,238,245,0.04)",
                color: "var(--rim-white)",
                border: "1px solid rgba(236,238,245,0.22)",
                fontFamily: "Outfit",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(236,238,245,0.1)";
                e.currentTarget.style.borderColor = "rgba(236,238,245,0.4)";
                e.currentTarget.style.boxShadow =
                  "0 0 22px rgba(236,238,245,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(236,238,245,0.04)";
                e.currentTarget.style.borderColor = "rgba(236,238,245,0.22)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              View work
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
