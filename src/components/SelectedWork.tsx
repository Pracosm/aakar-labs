"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import Magnetic from "./Magnetic";
import SectionLabel from "./ui/SectionLabel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const scope = [
  "Concept & positioning",
  "Brand identity",
  "UX & UI design",
  "Frontend & storefront build",
  "Checkout experience",
  "Admin dashboard",
  "Launch & handover",
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardRef.current) return;

      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "cubic-bezier(0.34, 1.1, 0.64, 1)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      if (previewRef.current) {
        gsap.to(previewRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.fromTo(
        cardRef.current.querySelectorAll(".scope-item"),
        { x: -10, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 65%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        padding: "6rem 0 8rem",
        borderTop: "1px solid rgba(236,238,245,0.05)",
      }}
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-10 lg:px-14">
        {/* Header */}
        <div className="mb-12 max-w-2xl flex flex-col gap-5">
          <SectionLabel code="AKR-003" label="FEATURED_WORK" />
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.06em",
              color: "var(--rim-white)",
              lineHeight: 1.05,
            }}
          >
            A streetwear brand,{" "}
            <span style={{ color: "var(--laptop-glow)" }}>
              shipped end-to-end.
            </span>
          </h2>
          <p
            style={{
              fontFamily: "Outfit",
              fontWeight: 300,
              fontSize: 16,
              color: "rgba(236,238,245,0.5)",
              lineHeight: 1.7,
            }}
          >
            We took WhyClub from a sketchpad idea to a live store — every layer
            of it.
          </p>
        </div>

        {/* Case card */}
        <div
          ref={cardRef}
          className="grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden"
          style={{
            borderRadius: "1.75rem",
            background: "rgba(26,29,46,0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(236,238,245,0.08)",
            boxShadow:
              "0 30px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(236,238,245,0.04)",
          }}
        >
          {/* Editorial graphic */}
          <div
            className="relative lg:col-span-3 overflow-hidden"
            style={{
              minHeight: 520,
              background: "#0a0a0a",
              borderRight: "1px solid rgba(236,238,245,0.05)",
            }}
          >
            <img
              ref={previewRef}
              src="/whyclub-hero.jpg"
              alt="WhyClub — Perfect is boring. Editorial poster"
              className="absolute inset-0 w-full object-cover"
              style={{
                height: "calc(100% + 60px)",
                top: -30,
                willChange: "transform",
              }}
            />

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,5,9,0) 60%, rgba(5,5,9,0.6) 100%)",
              }}
            />

            <div className="absolute bottom-5 left-6 flex items-center gap-2 z-10">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4a8c3f",
                  boxShadow: "0 0 12px rgba(74,140,63,0.9)",
                  animation: "rimPulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "Outfit",
                  fontWeight: 500,
                  fontSize: 10,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                Live at whyclub.in
              </span>
            </div>
          </div>

          {/* Content */}
          <div
            className="lg:col-span-2 flex flex-col"
            style={{ padding: "2.5rem 2.25rem" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span
                className="rounded-full"
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  padding: "4px 11px",
                  color: "var(--stem-green)",
                  background: "rgba(74,140,63,0.12)",
                  border: "1px solid rgba(74,140,63,0.25)",
                }}
              >
                D2C • E-commerce
              </span>
              <span
                style={{
                  fontFamily: "Outfit",
                  fontWeight: 400,
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(236,238,245,0.35)",
                }}
              >
                Feb 2026 — Apr 2026
              </span>
            </div>

            <h3
              className="font-display"
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                letterSpacing: "-0.06em",
                color: "var(--rim-white)",
                marginBottom: 6,
              }}
            >
              WhyClub
            </h3>
            <p
              style={{
                fontFamily: "Outfit",
                fontWeight: 400,
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--laptop-glow)",
                marginBottom: 18,
                opacity: 0.75,
              }}
            >
              &ldquo;Perfect is boring.&rdquo;
            </p>

            <p
              style={{
                fontFamily: "Outfit",
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.75,
                color: "rgba(236,238,245,0.6)",
                marginBottom: 24,
              }}
            >
              An Indian streetwear label built on rebellion. We owned the entire
              pipeline — naming, identity, art direction, the storefront, the
              checkout experience, and the admin dashboard the team runs
              operations from. One studio, every layer.
            </p>

            <div className="mb-6">
              <span
                className="block mb-3"
                style={{
                  fontFamily: "Outfit",
                  fontWeight: 500,
                  fontSize: 10,
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "rgba(236,238,245,0.35)",
                }}
              >
                Scope
              </span>
              <ul className="flex flex-col gap-2">
                {scope.map((item) => (
                  <li
                    key={item}
                    className="scope-item flex items-center gap-3"
                    style={{
                      fontFamily: "Outfit",
                      fontWeight: 300,
                      fontSize: 13,
                      color: "rgba(236,238,245,0.7)",
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "var(--laptop-glow)",
                        opacity: 0.7,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto self-start">
              <Magnetic strength={0.3}>
                <a
                  href="https://whyclub.in"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300"
                  style={{
                    padding: "12px 22px",
                    background: "var(--laptop-glow)",
                    color: "#000",
                    fontFamily: "Outfit",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  Visit the store
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
