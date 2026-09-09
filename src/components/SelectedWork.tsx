"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import Magnetic from "./Magnetic";
import SectionLabel from "./ui/SectionLabel";
import { WhyClubReferenceMockup } from "./whyclub/WhyClubReferenceMockup";

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

const foldingCompanyScope = [
  "Brand identity",
  "Logo system",
  "Colour & type",
  "Applications",
  "Brand book",
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const foldingCompanyCardRef = useRef<HTMLElement>(null);
  const foldingCompanyPreviewRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const desktop = window.matchMedia("(min-width: 768px)").matches;

      [foldingCompanyCardRef.current, cardRef.current]
        .filter((card): card is HTMLElement => Boolean(card))
        .forEach((card) => {
          gsap.fromTo(
            card,
            { y: desktop ? 60 : 28, opacity: 0, scale: desktop ? 1 : 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: desktop ? 1.1 : 0.6,
              ease: desktop ? "cubic-bezier(0.34, 1.1, 0.64, 1)" : "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                once: true,
              },
            },
          );
        });

      if (foldingCompanyPreviewRef.current && desktop) {
        gsap.to(foldingCompanyPreviewRef.current, {
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

      if (previewRef.current && desktop) {
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

      if (desktop && cardRef.current) {
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
              start: "top 75%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-10 md:py-24 lg:py-32"
      style={{
        borderTop: "1px solid rgba(236,238,245,0.05)",
      }}
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-10 lg:px-14">
        <div className="mb-8 max-w-2xl flex flex-col gap-4 md:mb-12 md:gap-5">
          <SectionLabel code="AKR-003" label="FEATURED_WORK" />
          <h2 className="section-heading">
            Identity systems that{" "}
            <span style={{ color: "var(--laptop-glow)" }}>
              move.
            </span>
          </h2>
          <p className="md:hidden text-[1.05rem] leading-relaxed text-[rgba(236,238,245,0.82)]">
            The Folding Company. Brand identity, visual system, and brand book.
          </p>
          <p className="body-copy hidden md:block">
            The Folding Company identity system — an expressive mark, flexible
            colour language, and a brand book built to travel.
          </p>
        </div>

        <article
          ref={foldingCompanyCardRef}
          className="group mb-8 grid grid-cols-1 gap-0 overflow-hidden rounded-[1.25rem] lg:mb-12 lg:grid-cols-5 lg:rounded-[1.75rem]"
          style={{
            background: "#06201c",
            border: "1px solid rgba(97, 219, 194, 0.24)",
            boxShadow:
              "0 30px 100px rgba(0,0,0,0.48), 0 0 0 1px rgba(236,238,245,0.04)",
          }}
        >
          <div
            className="relative h-[300px] overflow-hidden lg:col-span-3 lg:h-auto lg:min-h-[560px]"
            style={{ borderRight: "1px solid rgba(236,238,245,0.08)" }}
          >
            <div
              ref={foldingCompanyPreviewRef}
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.025] lg:h-[calc(100%+60px)] lg:-top-[30px]"
            >
              <Image
                src="/images/work/tfc-case-study/hero.webp"
                alt="The Folding Company identity over a teal mountain landscape"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 60vw"
                className="hidden object-cover object-center lg:block"
              />
              <Image
                src="/images/work/tfc-case-study/hero-mobile.webp"
                alt="The Folding Company identity over a teal mountain landscape"
                fill
                sizes="100vw"
                className="object-cover object-center lg:hidden"
              />
            </div>
          </div>

          <div className="flex flex-col px-5 py-7 md:px-9 md:py-10 lg:col-span-2">
            <div className="mb-5 flex flex-wrap items-center gap-2 md:mb-7">
              <span
                className="rounded-full px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{
                  color: "#67dec6",
                  background: "rgba(97,219,194,0.12)",
                  border: "1px solid rgba(97,219,194,0.28)",
                }}
              >
                Brand identity
              </span>
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-white/45">
                Brand book
              </span>
            </div>

            <h3 className="mb-3 font-display text-[2.1rem] font-bold leading-[0.98] tracking-[-0.06em] text-[color:var(--rim-white)] md:text-[2.8rem]">
              the folding
              <br />
              company
            </h3>
            <p className="mb-6 font-body text-sm leading-relaxed text-white/60 md:mb-8 md:text-[15px]">
              A flexible visual identity built around movement, structure, and
              a mark that can fold into many forms.
            </p>

            <div className="mb-7 hidden md:block md:mb-8">
              <span className="mb-3 block font-body text-[10px] font-medium uppercase tracking-[0.4em] text-white/35">
                Scope
              </span>
              <ul className="flex flex-col gap-2">
                {foldingCompanyScope.map((item) => (
                  <li
                    key={item}
                    className="scope-item inline-flex items-center gap-2 font-body text-[13px] text-white/70"
                  >
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ background: "#67dec6", opacity: 0.8 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto w-full self-stretch sm:self-start sm:w-auto">
              <Link
                href="/work/the-folding-company"
                className="btn-cta btn-cta-primary w-full sm:w-auto"
              >
                View the case study
                <ArrowUpRight size={16} weight="bold" />
              </Link>
              <a
                href="/work/tfc-brand-book.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center justify-center font-body text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-white sm:justify-start"
              >
                Open the brand book PDF
                <ArrowUpRight size={14} weight="bold" className="ml-2" />
              </a>
            </div>
          </div>
        </article>

        <article
          ref={cardRef}
          className="grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden rounded-[1.25rem] lg:rounded-[1.75rem]"
          style={{
            background: "rgba(26,29,46,0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(236,238,245,0.08)",
            boxShadow:
              "0 30px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(236,238,245,0.04)",
          }}
        >
          <div
            className="relative aspect-[4/3] overflow-hidden lg:col-span-3 lg:aspect-auto lg:h-auto lg:min-h-[520px]"
            style={{
              background: "#0a0a0a",
              borderRight: "1px solid rgba(236,238,245,0.05)",
            }}
          >
            <div
              ref={previewRef}
              className="absolute inset-0 lg:h-[calc(100%+60px)] lg:-top-[30px]"
            >
              <WhyClubReferenceMockup
                alt="WhyClub handheld phone mockup showing the Please I’m a Star storefront"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,5,9,0) 60%, rgba(5,5,9,0.6) 100%)",
              }}
            />

            <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10 md:bottom-5 md:left-6">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: "#4a8c3f",
                  boxShadow: "0 0 12px rgba(74,140,63,0.9)",
                  animation: "rimPulse 2s ease-in-out infinite",
                }}
              />
              <span className="font-body text-xs font-medium tracking-[0.12em] uppercase text-white/90 md:text-[10px] md:tracking-[0.35em]">
                Live at whyclub.in
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col px-5 py-6 md:px-9 md:py-10">
            <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-5">
              <span
                className="rounded-full text-[11px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1 md:text-[9px] md:tracking-[0.3em] md:px-[11px] md:py-1"
                style={{
                  color: "var(--stem-green)",
                  background: "rgba(74,140,63,0.12)",
                  border: "1px solid rgba(74,140,63,0.25)",
                }}
              >
                D2C • E-commerce
              </span>
              <span className="font-body text-xs tracking-[0.12em] uppercase text-[rgba(236,238,245,0.55)] md:text-[10px] md:tracking-[0.3em]">
                Feb 2026 — Apr 2026
              </span>
            </div>

            <h3 className="font-display text-[1.75rem] font-bold tracking-[-0.04em] text-[color:var(--rim-white)] mb-1.5 md:text-[2rem] md:tracking-[-0.06em]">
              WhyClub
            </h3>
            <p className="font-body text-sm tracking-[0.08em] uppercase text-[color:var(--laptop-glow)] mb-4 opacity-90 md:text-[13px] md:tracking-[0.15em] md:mb-[18px] md:opacity-75">
              &ldquo;Perfect is boring.&rdquo;
            </p>

            <p className="body-copy mb-5 hidden text-[1.0625rem] md:mb-6 md:block md:text-[14px] md:text-[rgba(236,238,245,0.6)]">
              An Indian streetwear label built on rebellion. We owned the entire
              pipeline — naming, identity, art direction, the storefront, the
              checkout experience, and the admin dashboard the team runs
              operations from. One studio, every layer.
            </p>

            <div className="mb-5 hidden md:block md:mb-6">
              <span className="block mb-3 font-body text-xs font-medium tracking-[0.16em] uppercase text-[rgba(236,238,245,0.55)] md:text-[10px] md:tracking-[0.4em] md:text-[rgba(236,238,245,0.35)]">
                Scope
              </span>
              <ul className="flex flex-wrap gap-2 md:flex-col md:gap-2">
                {scope.map((item) => (
                  <li
                    key={item}
                    className="scope-item inline-flex items-center gap-2 rounded-full border border-[rgba(236,238,245,0.12)] bg-[rgba(236,238,245,0.04)] px-3 py-1.5 text-sm text-[rgba(236,238,245,0.88)] md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0 md:text-[13px] md:text-[rgba(236,238,245,0.7)]"
                  >
                    <span
                      className="hidden h-1 w-1 rounded-full md:block"
                      style={{
                        background: "var(--laptop-glow)",
                        opacity: 0.7,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex w-full flex-col gap-3 self-stretch sm:flex-row sm:items-center sm:self-start">
              <Magnetic strength={0.3} className="w-full sm:w-auto">
                <Link
                  href="/work/whyclub"
                  className="btn-cta btn-cta-primary w-full sm:w-auto"
                >
                  View the case study
                  <ArrowUpRight size={16} weight="bold" />
                </Link>
              </Magnetic>
              <a
                href="https://whyclub.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center font-body text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-white sm:justify-start"
              >
                Visit the store
                <ArrowUpRight size={14} weight="bold" className="ml-2" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
