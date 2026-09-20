"use client";

import { useEffect, useRef } from "react";
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
import { WhyClubReferenceMockup } from "./whyclub/WhyClubReferenceMockup";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const foldingCompanyCardRef = useRef<HTMLElement>(null);
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
        <div className="mb-9 grid gap-5 md:mb-12 md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.72fr)] md:items-end md:gap-12">
          <div>
            <div className="mb-3 flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[0.24em] text-[#b9d5ce]">
              <span className="h-px w-7 bg-[#b9d5ce]" />
              SELECTED WORK
            </div>
            <h2 className="font-display text-[clamp(2.35rem,5.1vw,4.8rem)] font-bold leading-[0.96] tracking-[-0.065em] text-[color:var(--rim-white)]">
              Selected Work
            </h2>
          </div>
          <p className="max-w-[31ch] font-body text-base leading-relaxed text-white/70 md:pb-1 md:text-[1.05rem]">
            Brands, products, and experiences for a brighter tomorrow.
          </p>
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
                className="rounded-full px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{
                  color: "#075b4c",
                  background: "rgba(23,137,115,0.12)",
                  border: "1px solid rgba(23,137,115,0.25)",
                }}
              >
                Brand identity
              </span>
              <span className="font-body text-[10px] uppercase tracking-[0.23em] text-[#71827e] lg:text-white/45">
                Brand book
              </span>
            </div>

            <h3 className="mb-2 font-display text-[2.15rem] font-bold leading-[0.94] tracking-[-0.065em] text-[#071c19] sm:text-[2.7rem] lg:mb-3 lg:text-[clamp(2.65rem,3.2vw,3.85rem)] lg:text-[color:var(--rim-white)]">
              the folding
              <br />
              company
            </h3>
            <p className="mb-4 line-clamp-2 max-w-[35rem] font-body text-[15px] leading-relaxed text-[#647470] lg:mb-9 lg:line-clamp-none lg:text-base lg:text-white/65">
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
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#06201c] px-5 font-body text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#0d3b34] lg:bg-[#f5efe3] lg:text-[#06201c] lg:hover:bg-white"
              >
                Visit foldingcompany.design
                <ArrowUpRight size={17} weight="bold" />
              </a>
              <a
                href="/work/tfc-brand-book.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-8 items-center gap-2 font-body text-[10px] font-semibold uppercase tracking-[0.19em] text-[#677975] transition-colors hover:text-[#06201c] lg:mt-4 lg:min-h-9 lg:text-white/55 lg:hover:text-white"
              >
                View the case study PDF
                <ArrowUpRight size={15} weight="bold" />
              </a>
            </div>
          </div>
        </article>

        <article
          ref={cardRef}
          className="grid grid-cols-1 gap-0 overflow-hidden rounded-[1.25rem] lg:grid-cols-[1.17fr_0.83fr] lg:rounded-[1.75rem]"
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
            className="relative aspect-[4/3] overflow-hidden lg:aspect-auto"
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

          <div className="flex flex-col px-5 py-6 md:px-9 md:py-10">
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

            <p className="body-copy mb-6 hidden max-w-[34rem] text-[1.0625rem] md:block md:text-[14px] md:text-[rgba(236,238,245,0.6)]">
              An end-to-end fashion commerce experience, from identity to the
              storefront the team runs every day.
            </p>

            <div className="mb-7 hidden grid-cols-3 divide-x divide-white/15 md:grid">
              <div className="pr-3">
                <Storefront size={22} weight="light" className="mb-2 text-[#9ed7cb]" />
                <p className="font-body text-[12px] font-semibold leading-tight text-white">Commerce</p>
                <p className="mt-1 font-body text-[11px] text-white/50">Category</p>
              </div>
              <div className="px-3">
                <CalendarBlank size={22} weight="light" className="mb-2 text-[#9ed7cb]" />
                <p className="font-body text-[12px] font-semibold leading-tight text-white">2026</p>
                <p className="mt-1 font-body text-[11px] text-white/50">Year</p>
              </div>
              <div className="pl-3">
                <GlobeSimple size={22} weight="light" className="mb-2 text-[#9ed7cb]" />
                <p className="font-body text-[12px] font-semibold leading-tight text-white">Live</p>
                <p className="mt-1 font-body text-[11px] text-white/50">Storefront</p>
              </div>
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
