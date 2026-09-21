"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Magnetic from "./Magnetic";
import Twinkles from "./Twinkles";
import BookCallButton from "./BookCallButton";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const words = root.current?.querySelectorAll(".hero-word");
      const rest = root.current?.querySelectorAll(".hero-rise");
      if (!words?.length || !rest?.length) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(words, {
        y: 32,
        opacity: 0,
        duration: 0.7,
        stagger: 0.045,
      });
      tl.from(
        rest,
        { y: 18, opacity: 0, duration: 0.55, stagger: 0.08 },
        "-=0.35",
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="hero relative min-h-[100dvh] w-full flex flex-col items-center justify-start px-5 pt-[8vh] pb-[max(5.5rem,env(safe-area-inset-bottom))] overflow-hidden md:px-14 md:pt-[14vh] md:pb-12"
      style={{ isolation: "isolate" }}
    >
      <div aria-hidden className="hero-veil pointer-events-none absolute inset-0" />
      <Twinkles />

      <div className="relative z-10 flex w-full max-w-[720px] flex-1 flex-col items-center">
        <div className="flex flex-col items-center">
          <p className="hero-rise mb-4 font-mono text-[11px] font-medium tracking-[0.22em] text-[rgba(236,238,245,0.72)] md:hidden">
            DESIGN STUDIO
          </p>
          <h1
            className="hero-title hero-title-lockup w-full text-center lowercase"
            style={{ perspective: 600 }}
          >
            <span className="hero-word block whitespace-nowrap">
              we design digital identities
            </span>
            <span className="hero-word block whitespace-nowrap">
              that people remember
            </span>
          </h1>

          <p className="hero-rise mt-4 font-mono text-[12px] font-medium tracking-[0.18em] uppercase text-[rgba(236,238,245,0.78)] md:hidden">
            Brand · UX/UI · Web
          </p>
          <p className="hero-rise body-copy mt-6 hidden text-center max-w-[640px] md:block">
            Branding, UX/UI, and web experiences for founders, studios, and
            growing teams — designed to industry standard, ready for handover.
          </p>
        </div>

        <div className="mt-auto flex w-full flex-col items-center pb-[clamp(1.5rem,6vh,4rem)] md:mt-8 md:pb-0">
          <div className="hero-rise mx-auto flex w-full max-w-[22rem] flex-col items-center gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <Magnetic strength={0.3} className="w-full max-w-[18rem] sm:w-auto sm:max-w-none">
              <Link href="/start-project" className="btn-cta btn-cta-primary">
                Start a project
                <ArrowUpRight size={16} weight="bold" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25} className="w-full max-w-[18rem] sm:w-auto sm:max-w-none">
              <BookCallButton />
            </Magnetic>
          </div>

          <a
            href="#work"
            className="hero-rise mt-5 inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[rgba(236,238,245,0.7)] transition-colors duration-200 hover:text-[rgba(236,238,245,0.95)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:hidden"
          >
            Scroll to view selected work
            <ArrowDown aria-hidden size={14} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
}
