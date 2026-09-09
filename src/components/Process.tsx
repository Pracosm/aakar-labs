"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionLabel from "./ui/SectionLabel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    num: "01",
    title: "Discover",
    short: "Research, audits, a brief we can all stand behind.",
    desc: "Stakeholder workshops, user research, competitive audits, and a clear design brief.",
  },
  {
    num: "02",
    title: "Explore",
    short: "Directions fast. Test with real people before we polish.",
    desc: "Wireframes, moodboards, concept directions, and early prototype testing with real users.",
  },
  {
    num: "03",
    title: "Refine",
    short: "Hi-fi screens, motion, and the system that holds it.",
    desc: "High-fidelity screens, interaction design, design system components, and micro-animations.",
  },
  {
    num: "04",
    title: "Deliver",
    short: "Organised files. Specs. Handoff your engineers can build from.",
    desc: "Organised Figma files, annotated specs, asset exports, and a complete handoff to your dev team.",
  },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = root.current?.querySelectorAll(".process-card");
      if (!cards?.length) return;

      gsap.from(cards, {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="process"
      ref={root}
      className="relative w-full py-10 md:px-10 md:py-20 lg:px-14 lg:py-24"
      style={{ borderTop: "1px solid rgba(236,238,245,0.05)" }}
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-0">
        <div className="flex w-full flex-col gap-3 mb-6 md:gap-5 md:mb-12">
          <SectionLabel code="AKR-006" label="OUR_PROCESS" />
          <h2 className="section-heading g-rise">
            How we <span style={{ color: "var(--laptop-glow)" }}>work.</span>
          </h2>
          <p className="hidden body-copy max-w-[560px] md:block">
            Four phases. Clear deliverables at every stage. Nothing moves
            forward until the previous phase is signed off.
          </p>
          <p className="md:hidden font-mono text-[12px] tracking-[0.14em] uppercase text-[rgba(236,238,245,0.7)]">
            Four phases. Swipe.
          </p>
        </div>
      </div>

      <ol className="md:hidden flex list-none snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 pl-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {steps.map((step) => (
          <li
            key={step.num}
            className="process-card snap-center shrink-0 w-[78vw] max-w-[320px] rounded-2xl glass-panel p-6"
          >
            <span className="font-mono text-3xl font-medium text-[color:var(--coral)]">
              {step.num}
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.03em] text-[color:var(--rim-white)]">
              {step.title}
            </h3>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-[rgba(236,238,245,0.82)]">
              {step.short}
            </p>
          </li>
        ))}
      </ol>

      <div className="hidden max-w-[1160px] mx-auto w-full grid-cols-1 gap-5 md:grid md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.num}
            className="process-card flex flex-col gap-4 p-7 rounded-2xl glass-panel"
          >
            <span
              className="font-mono"
              style={{
                fontSize: 28,
                fontWeight: 500,
                color: "rgba(212,117,106,0.45)",
                letterSpacing: "-0.02em",
              }}
            >
              {step.num}
            </span>
            <h3
              className="font-display text-xl"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--rim-white)",
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: "Outfit",
                fontWeight: 300,
                fontSize: 14,
                color: "rgba(236,238,245,0.6)",
                lineHeight: 1.7,
              }}
            >
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
