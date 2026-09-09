"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Magnetic from "./Magnetic";
import Twinkles from "./Twinkles";
import BookCallButton from "./BookCallButton";

const HEADLINE = "we design digital identities that people remember";

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

      <div className="relative z-10 flex w-full max-w-[720px] flex-1 flex-col items-center max-md:justify-between">
        <div className="flex flex-col items-center">
          <p className="hero-rise mb-4 font-mono text-[11px] font-medium tracking-[0.22em] text-[rgba(236,238,245,0.72)] md:hidden">
            DESIGN STUDIO
          </p>
          <h1
            className="hero-title text-center lowercase max-w-[16ch] md:max-w-[18ch]"
            style={{ perspective: 600 }}
          >
            {HEADLINE.split(" ").map((word) => (
              <span key={word} className="hero-word inline-block">
                {word}&nbsp;
              </span>
            ))}
          </h1>

          <p className="hero-rise mt-4 font-mono text-[12px] font-medium tracking-[0.18em] uppercase text-[rgba(236,238,245,0.78)] md:hidden">
            Brand · UX/UI · Web
          </p>
          <p className="hero-rise body-copy mt-6 hidden text-center max-w-[640px] md:block">
            Branding, UX/UI, and web experiences for founders, studios, and
            growing teams — designed to industry standard, ready for handover.
          </p>
        </div>

        <div className="hero-rise mt-8 flex w-full max-w-[22rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center md:mt-8">
          <Magnetic strength={0.3} className="w-full sm:w-auto">
            <Link href="/start-project" className="btn-cta btn-cta-primary">
              Start a project
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </Magnetic>
          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <BookCallButton />
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
