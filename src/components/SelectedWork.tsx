"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BookOpen,
  CalendarBlank,
  Folders,
  GlobeSimple,
  Storefront,
} from "@phosphor-icons/react";
import Magnetic from "./Magnetic";
import { useWorkCaseStudyTransition } from "./WorkCaseStudyTransition";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const foldingCompanyCardRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const whyClubPanelRef = useRef<HTMLDivElement>(null);
  const { startCaseStudyTransition } = useWorkCaseStudyTransition();

  const handleWhyClubCaseStudyClick = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.detail === 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    ) {
      return;
    }

    const panel = whyClubPanelRef.current;
    if (panel && startCaseStudyTransition(panel, "/work/whyclub")) {
      event.preventDefault();
    }
  };

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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full overflow-hidden border-y border-white/10 bg-[rgba(5,18,16,0.38)] py-16 text-[color:var(--rim-white)] backdrop-blur-md md:py-24 lg:py-32"
    >
      <div className="max-w-[1160px] mx-auto px-5 md:px-10 lg:px-14">
        <div className="mb-9 md:mb-12">
          <h2 className="font-display text-balance text-[clamp(2.35rem,5.1vw,4.8rem)] font-bold leading-[0.96] tracking-[-0.065em] text-[color:var(--rim-white)]">
            Selected Work
          </h2>
        </div>

        <article
          ref={foldingCompanyCardRef}
          className="group mb-12 overflow-hidden rounded-[1.5rem] border border-[#d7e2de] bg-[#f9fbfa] shadow-[0_24px_70px_rgba(7,28,25,0.12)] lg:mb-16 lg:grid lg:grid-cols-[1.17fr_0.83fr] lg:rounded-[1.8rem]"
        >
          <div className="relative overflow-hidden bg-[#06241e] lg:order-1 lg:border-r lg:border-white/10">
            <div
              className="relative aspect-[4/3] overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto"
            >
              <Image
                src="/images/work/tfc-case-study/hero.webp"
                alt="The Folding Company identity over a teal mountain landscape"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 60vw"
                className="hidden object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025] lg:block"
              />
              <Image
                src="/images/work/tfc-case-study/hero-mobile.webp"
                alt="The Folding Company identity over a teal mountain landscape"
                fill
                sizes="100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025] lg:hidden"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f9fbfa] to-transparent lg:hidden" />
            </div>
          </div>

          <div className="flex flex-col bg-[#f9fbfa] px-5 py-5 sm:px-7 sm:py-7 lg:order-2 lg:bg-[#06201c] lg:px-10 lg:py-10 xl:px-12 xl:py-12">
            <div className="mb-4 flex flex-wrap items-center gap-2 lg:mb-8">
              <span
                className="whitespace-nowrap rounded-full px-2.5 py-1 font-body text-[11px] font-semibold tracking-[0.04em]"
                style={{
                  color: "#075b4c",
                  background: "rgba(23,137,115,0.12)",
                  border: "1px solid rgba(23,137,115,0.25)",
                }}
              >
                Brand identity
              </span>
              <span className="whitespace-nowrap font-body text-[11px] tracking-[0.04em] text-[#71827e] lg:text-white/45">
                Brand book
              </span>
            </div>

            <h3 className="mb-2 font-display text-balance text-[2.15rem] font-bold leading-[0.94] tracking-[-0.065em] text-[#071c19] sm:text-[2.7rem] lg:mb-3 lg:text-[clamp(2.65rem,3.2vw,3.85rem)] lg:text-[color:var(--rim-white)]">
              the folding
              <br />
              company
            </h3>
            <p className="mb-4 line-clamp-2 max-w-[35rem] font-body text-pretty text-[15px] leading-relaxed text-[#647470] lg:mb-9 lg:line-clamp-none lg:text-base lg:text-white/65">
              A flexible visual identity built around movement, structure, and
              a mark that can fold into many forms.
            </p>

            <div className="mb-6 grid grid-cols-3 divide-x divide-[#d9e2df] lg:mb-10 lg:divide-white/15">
              <div className="pr-3">
                <Folders size={22} weight="light" className="mb-2 text-[#075b4c] lg:text-[#9ed7cb]" />
                <p className="font-body text-[12px] font-semibold leading-tight text-[#071c19] lg:text-white">Brand identity</p>
                <p className="mt-1 hidden font-body text-[11px] text-[#758682] lg:block lg:text-white/50">Category</p>
              </div>
              <div className="px-3">
                <CalendarBlank size={22} weight="light" className="mb-2 text-[#075b4c] lg:text-[#9ed7cb]" />
                <p className="font-body text-[12px] font-semibold leading-tight text-[#071c19] lg:text-white">2024</p>
                <p className="mt-1 hidden font-body text-[11px] text-[#758682] lg:block lg:text-white/50">Year</p>
              </div>
              <div className="pl-3">
                <BookOpen size={22} weight="light" className="mb-2 text-[#075b4c] lg:text-[#9ed7cb]" />
                <p className="font-body text-[12px] font-semibold leading-tight text-[#071c19] lg:text-white">Available</p>
                <p className="mt-1 hidden font-body text-[11px] text-[#758682] lg:block lg:text-white/50">Brand book</p>
              </div>
            </div>

            <div className="mt-auto w-full">
              <a
                href="https://foldingcompany.design/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#06201c] px-5 font-body text-[11px] font-semibold text-white transition-[transform,background-color,color] duration-150 ease-out hover:bg-[#0d3b34] active:scale-[0.96] lg:bg-[#f5efe3] lg:text-[#06201c] lg:hover:bg-white"
              >
                Visit <span className="break-words font-mono text-[11px] font-medium tracking-[0.03em]">foldingcompany.design</span>
                <ArrowUpRight size={17} weight="bold" />
              </a>
              <a
                href="/work/tfc-brand-book.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap text-center font-body text-[11px] font-medium text-[#677975] transition-[transform,color] duration-150 ease-out hover:text-[#06201c] active:scale-[0.96] lg:mt-4 lg:text-white/55 lg:hover:text-white"
              >
                View the case study PDF
                <ArrowUpRight size={15} weight="bold" />
              </a>
            </div>
          </div>
        </article>

        <article
          ref={cardRef}
          className="why-club-work-card group overflow-hidden rounded-[1.5rem] border border-[#d9ddd4] bg-[#f3f3f0] shadow-[0_24px_70px_rgba(7,28,25,0.12)] lg:grid lg:grid-cols-[1.17fr_0.83fr] lg:rounded-[1.8rem]"
          style={{
            boxShadow: "0 30px 90px rgba(2, 20, 16, 0.22)",
          }}
        >
          <div
            className="relative aspect-[4/3] overflow-hidden bg-[#e9eee6] lg:aspect-auto lg:border-r lg:border-black/10"
            style={{
              background: "#e9eee6",
            }}
          >
            <div
              ref={previewRef}
              className="absolute inset-0 lg:h-[calc(100%+60px)] lg:-top-[30px]"
            >
              <div className="why-club-work-media absolute inset-0">
                <Image
                  src="/images/work/whyclub-case-study/hero-desktop.webp"
                  alt="WhyClub model wearing the Please I’m a Star T-shirt"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-[62%_center] lg:object-center"
                />
              </div>
            </div>

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,5,9,0) 58%, rgba(5,5,9,0.28) 100%)",
              }}
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-[#f3f3f0] to-transparent lg:hidden" />

            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 md:bottom-5 md:left-6">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: "#4a8c3f",
                  boxShadow: "0 0 12px rgba(74,140,63,0.9)",
                  animation: "rimPulse 2s ease-in-out infinite",
                }}
              />
              <span className="font-body text-[11px] font-semibold tracking-[0.04em] text-[#17351a] lg:text-white/90">
                Live at whyclub.in
              </span>
            </div>
          </div>

          <div
            ref={whyClubPanelRef}
            className="why-club-work-panel flex flex-col bg-[#f3f3f0] px-5 py-5 text-[#0a0a0a] sm:px-7 sm:py-7 lg:px-10 lg:py-10 xl:px-12 xl:py-12"
          >
            <div className="why-club-work-panel-content flex flex-1 flex-col">
              <div className="mb-4 flex flex-wrap items-center gap-2 lg:mb-8">
                <span
                  className="whitespace-nowrap rounded-full px-2.5 py-1 font-body text-[11px] font-semibold tracking-[0.04em]"
                  style={{
                    color: "#356934",
                    background: "rgba(74,140,63,0.12)",
                    border: "1px solid rgba(74,140,63,0.24)",
                  }}
                >
                  D2C • E-commerce
                </span>
                <span className="whitespace-nowrap font-body text-[11px] tracking-[0.04em] text-[#70706a]">
                  Digital product
                </span>
              </div>

              <h3 className="mb-2 font-display text-balance text-[2.15rem] font-bold leading-[0.94] tracking-[-0.065em] text-[#0a0a0a] sm:text-[2.7rem] lg:mb-3 lg:text-[clamp(2.65rem,3.2vw,3.85rem)]">
                WhyClub
              </h3>

              <p className="mb-5 max-w-[35rem] font-body text-pretty text-[15px] leading-relaxed text-[#62625c] lg:mb-9 lg:text-base">
                We shaped the brand, product experience, full-stack store, and
                every image customers see.
              </p>

              <div className="mb-6 grid grid-cols-3 divide-x divide-black/15 lg:mb-10">
                <div className="pr-3">
                  <Storefront size={22} weight="light" className="mb-2 text-[#356934]" />
                  <p className="font-body text-[12px] font-semibold leading-tight text-[#0a0a0a]">Full-stack</p>
                  <p className="mt-1 hidden font-body text-[11px] text-[#777770] lg:block">Scope</p>
                </div>
                <div className="px-3">
                  <CalendarBlank size={22} weight="light" className="mb-2 text-[#356934]" />
                  <p className="font-body text-[12px] font-semibold leading-tight text-[#0a0a0a]">2026</p>
                  <p className="mt-1 hidden font-body text-[11px] text-[#777770] lg:block">Year</p>
                </div>
                <div className="pl-3">
                  <GlobeSimple size={22} weight="light" className="mb-2 text-[#356934]" />
                  <p className="font-body text-[12px] font-semibold leading-tight text-[#0a0a0a]">Live</p>
                  <p className="mt-1 hidden font-body text-[11px] text-[#777770] lg:block">Storefront</p>
                </div>
              </div>

              <div className="mt-auto w-full">
                <Magnetic strength={0.3} className="w-full">
                  <Link
                    href="/work/whyclub"
                    onClick={handleWhyClubCaseStudyClick}
                    className="case-study-trigger inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#0a0a0a] px-5 font-body text-[11px] font-semibold text-[#f3f3f0]"
                  >
                    View the case study
                    <ArrowUpRight size={16} weight="bold" />
                  </Link>
                </Magnetic>
                <a
                  href="https://whyclub.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap font-body text-[11px] font-medium text-[#6a6a64] transition-[transform,color] duration-150 ease-out hover:text-[#0a0a0a] active:scale-[0.96] lg:mt-4"
                >
                  Visit the store
                  <ArrowUpRight size={14} weight="bold" className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
