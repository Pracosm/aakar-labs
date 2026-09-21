"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Code2,
  ImageIcon,
  Layers3,
  MonitorSmartphone,
  Palette,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ASSET = "/images/work/whyclub-case-study";

export function WhyClubCaseStudy({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".whyclub-hero-copy",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", delay: 0.08 },
      );

      gsap.utils.toArray<HTMLElement>(".whyclub-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="whyclub-case-study bg-[#f3f3f0] pb-24 text-[#10110f] md:pb-0">
      {children}
    </div>
  );
}

export function WhyClubEyebrow({
  index,
  label,
  inverse = false,
}: {
  index: string;
  label: string;
  inverse?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] ${
        inverse ? "text-white/55" : "text-[#6d706b]"
      }`}
    >
      <span className={inverse ? "text-[#bdd5bb]" : "text-[#3f624d]"}>{index}</span>
      <span className={`h-px w-7 ${inverse ? "bg-white/25" : "bg-black/15"}`} />
      <span>{label}</span>
    </div>
  );
}

export function WhyClubCaseStudyHero() {
  return (
    <header className="overflow-hidden bg-[#f4f4f0] text-[#10110f]">
      <div className="mx-auto grid max-w-[1500px] lg:min-h-[720px] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="whyclub-hero-copy order-2 flex flex-col justify-between px-5 pb-10 pt-8 sm:px-8 md:px-10 md:pb-14 lg:order-1 lg:px-14 lg:py-16">
          <div>
            <WhyClubEyebrow index="CASE 02 / 2026" label="D2C / E-COMMERCE" />
            <h1 className="mt-6 max-w-[620px] font-display text-[clamp(2.85rem,9vw,8.2rem)] font-bold leading-[0.84] tracking-[-0.085em]">
              A fashion store
              <br />
              built for <span className="text-[#58745f]">the drop.</span>
            </h1>
            <p className="mt-6 max-w-[430px] text-base leading-[1.65] text-[#5b605a] md:text-lg">
              WhyClub is a streetwear store with a clear point of view. We shaped
              the brand, the images, and the shopping experience from start to finish.
            </p>
          </div>

          <Link
            href="/#work"
            className="mt-10 hidden min-h-11 w-fit items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#545a53] transition-colors hover:text-[#10110f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3f624d] md:inline-flex"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to work
          </Link>
        </div>

        <div className="order-1 relative min-h-[min(40svh,360px)] overflow-hidden bg-[#d9e4d9] lg:order-2 lg:min-h-full">
          <Image
            src={`${ASSET}/storefront-mobile-hero.png`}
            alt="WhyClub mobile storefront with a rugby shirt hero image"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 1px"
            className="object-cover object-center lg:hidden"
          />
          <Image
            src={`${ASSET}/hero-desktop.webp`}
            alt="WhyClub campaign image for the Please I am a Star collection"
            fill
            priority
            sizes="(max-width: 1023px) 1px, 58vw"
            className="hidden object-cover object-center lg:block"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />
          <div className="absolute bottom-5 left-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/85 md:bottom-8 md:left-8">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md">
              <ArrowDown size={15} aria-hidden="true" />
            </span>
            Scroll to explore
          </div>
        </div>
      </div>
    </header>
  );
}

export function WhyClubProjectMeta() {
  const details = [
    { icon: Palette, label: "Brand", value: "Identity and art direction" },
    { icon: Smartphone, label: "Experience", value: "Mobile-first commerce" },
    { icon: Code2, label: "Build", value: "Storefront, checkout, admin" },
  ];

  return (
    <section id="overview" className="border-y border-black/10 bg-[#f4f4f0]">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-12 sm:px-8 md:px-10 md:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-14 lg:py-20">
        <div className="whyclub-reveal">
          <WhyClubEyebrow index="01" label="Overview" />
          <h2 className="mt-5 max-w-[480px] font-display text-[clamp(2.5rem,5vw,5.2rem)] font-bold leading-[0.88] tracking-[-0.08em]">
            One studio. Every layer.
          </h2>
        </div>
        <div className="whyclub-reveal">
          <p className="max-w-[650px] text-lg leading-[1.6] text-[#464b45] md:text-[1.35rem]">
            The work started with a name and a visual voice. It continued through
            product images, user flows, and the tools the team uses to run each drop.
          </p>
          <dl className="mt-9 grid gap-px overflow-hidden rounded-[1.5rem] border border-black/10 bg-black/10 sm:grid-cols-3">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="min-h-[152px] bg-[#fafaf7] p-5">
                <Icon size={20} strokeWidth={1.5} className="text-[#3f624d]" aria-hidden="true" />
                <dt className="mt-7 font-mono text-[9px] uppercase tracking-[0.16em] text-[#70766e]">
                  {label}
                </dt>
                <dd className="mt-2 text-sm leading-[1.45] text-[#232621]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

const navItems = [
  { href: "overview", label: "Overview", icon: Layers3 },
  { href: "brand", label: "Brand", icon: Palette },
  { href: "mobile", label: "Mobile", icon: Smartphone },
  { href: "build", label: "Build", icon: Code2 },
] as const;

export function WhyClubSectionNav() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const sections = navItems
      .map(({ href }) => document.getElementById(href))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.15, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav aria-label="WhyClub case study sections" className="hidden border-b border-black/10 bg-[#f4f4f0]/95 backdrop-blur-lg md:sticky md:top-[72px] md:z-30 md:block">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-7 px-10 py-3 lg:px-14">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3f624d]">WHY / 02</span>
          <div className="flex items-center gap-7">
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={`#${href}`}
                aria-current={activeSection === href ? "location" : undefined}
                onClick={() => setActiveSection(href)}
                className={`min-h-11 content-center font-mono text-[10px] uppercase tracking-[0.14em] transition-colors hover:text-[#10110f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3f624d] ${activeSection === href ? "text-[#10110f]" : "text-[#697069]"}`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <nav
        aria-label="WhyClub case study sections"
        className="fixed inset-x-3 bottom-3 z-50 rounded-[1.45rem] border border-white/65 bg-[#ecefe9]/78 px-1.5 pb-[calc(0.38rem+env(safe-area-inset-bottom))] pt-1.5 shadow-[0_14px_38px_rgba(22,32,24,0.16)] backdrop-blur-xl md:hidden"
      >
        <div className="grid grid-cols-4">
          {navItems.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={`#${href}`}
              aria-current={activeSection === href ? "location" : undefined}
              onClick={() => setActiveSection(href)}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl px-1 font-mono text-[8px] uppercase tracking-[0.08em] transition-[background-color,color,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f624d] ${activeSection === href ? "bg-white/75 text-[#182019] shadow-[0_1px_8px_rgba(22,32,24,0.08)]" : "text-[#4f5b50] active:bg-white/70"}`}
            >
              <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}

export function WhyClubSectionIntro({
  index,
  label,
  title,
  children,
  inverse = false,
}: {
  index: string;
  label: string;
  title: string;
  children: ReactNode;
  inverse?: boolean;
}) {
  return (
    <div className="whyclub-reveal mx-auto grid max-w-[1320px] gap-7 px-5 sm:px-8 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-14">
      <div>
        <WhyClubEyebrow index={index} label={label} inverse={inverse} />
      </div>
      <div>
        <h2 className={`max-w-[800px] font-display text-[clamp(2.45rem,5.2vw,5.5rem)] font-bold leading-[0.88] tracking-[-0.08em] ${inverse ? "text-white" : "text-[#10110f]"}`}>
          {title}
        </h2>
        <div className={`mt-5 max-w-[650px] text-base leading-[1.7] md:text-[1.08rem] ${inverse ? "text-white/65" : "text-[#5b605a]"}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function WhyClubImageFigure({
  src,
  alt,
  caption,
  number,
  tone = "light",
  width = 1600,
  height = 1200,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  number?: string;
  tone?: "light" | "dark";
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <figure className={`whyclub-reveal group overflow-hidden rounded-[1.45rem] border ${tone === "dark" ? "border-white/10 bg-[#182019]" : "border-black/10 bg-[#fafaf7]"} ${className}`}>
      <div className="overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="h-auto w-full object-cover transition-transform duration-200 ease-out motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.015]"
        />
      </div>
      <figcaption className={`flex items-start justify-between gap-5 px-4 py-3 font-mono text-[9px] uppercase leading-[1.5] tracking-[0.12em] md:px-5 md:py-4 ${tone === "dark" ? "text-white/55" : "text-[#6d706b]"}`}>
        <span>{caption}</span>
        {number ? <span className="shrink-0">{number}</span> : null}
      </figcaption>
    </figure>
  );
}

export function WhyClubGraphicSystem() {
  return (
    <div className="mx-auto mt-12 max-w-[1320px] px-5 sm:px-8 md:mt-16 md:px-10 lg:px-14">
      <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="whyclub-reveal rounded-[1.45rem] bg-[#182019] p-6 text-white md:p-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#bdd5bb]">The visual voice</span>
          <p className="mt-10 max-w-[520px] font-display text-[clamp(3.3rem,6.6vw,6.5rem)] font-bold leading-[0.82] tracking-[-0.09em]">
            Clear type.
            <br />
            Loud graphics.
          </p>
          <p className="mt-7 max-w-[470px] text-sm leading-[1.65] text-white/65 md:text-base">
            The store stays quiet so the clothes, art, and photography can speak first.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-2">
            {[
              ["#F4F4F0", "Canvas"],
              ["#78947A", "Garden"],
              ["#182019", "Ink"],
            ].map(([value, label]) => (
              <div key={value} className="rounded-xl border border-white/10 p-2.5">
                <div className="h-12 rounded-lg" style={{ backgroundColor: value }} />
                <span className="mt-2 block font-mono text-[8px] uppercase tracking-[0.12em] text-white/55">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <WhyClubImageFigure
          src={`${ASSET}/category-desktop.png`}
          alt="WhyClub category page with models in soft outdoor light"
          caption="Category imagery gives each collection its own setting"
          number="02 / 07"
          width={1700}
          height={883}
          className="self-start"
        />
      </div>
    </div>
  );
}

export function WhyClubMobileSpotlight() {
  const details = [
    [ImageIcon, "Campaign-led", "The first screen gives the image room to lead."],
    [ShoppingBag, "Easy to shop", "Key actions stay close to the thumb."],
    [Sparkles, "One system", "Type, colour, and motion stay consistent across the store."],
  ] as const;

  return (
    <div className="mx-auto mt-12 max-w-[1320px] px-5 sm:px-8 md:mt-16 md:px-10 lg:px-14">
      <div className="grid items-start gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
        <WhyClubImageFigure
          src={`${ASSET}/storefront-mobile-hero.png`}
          alt="WhyClub mobile hero with a full-screen product image"
          caption="A clear first screen for the campaign and the collection"
          number="03 / 07"
          width={532}
          height={894}
          className="mx-auto w-full max-w-[390px] lg:sticky lg:top-32"
        />
        <div className="whyclub-reveal rounded-[1.45rem] border border-black/10 bg-white/60 p-6 md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#78947a]/25 bg-[#e5ede2] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#3f624d]">
            <Smartphone size={13} aria-hidden="true" />
            Mobile first
          </div>
          <p className="mt-7 max-w-[600px] font-display text-[clamp(2.15rem,4.5vw,4.7rem)] font-bold leading-[0.9] tracking-[-0.07em]">
            Designed for the hand, not a smaller desktop.
          </p>
          <p className="mt-5 max-w-[590px] text-base leading-[1.7] text-[#5b605a] md:text-lg">
            On mobile, the campaign image, the next action, and the product path stay easy to read. The layout keeps familiar store patterns without losing WhyClub&apos;s character.
          </p>
          <dl className="mt-10 divide-y divide-black/10 border-y border-black/10">
            {details.map(([Icon, title, description], index) => (
              <div key={title} className="grid grid-cols-[32px_1fr] gap-4 py-5 md:grid-cols-[42px_1fr]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e5ede2] text-[#3f624d]">
                  <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <dt className="font-medium text-[#20231f]">{`0${index + 1}`} / {title}</dt>
                  <dd className="mt-1 max-w-[480px] text-sm leading-[1.6] text-[#676d65]">{description}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export function WhyClubResponsiveSystem() {
  return (
    <div className="mx-auto mt-12 max-w-[1320px] px-5 sm:px-8 md:mt-16 md:px-10 lg:px-14">
      <div className="grid items-start gap-5 lg:grid-cols-[1.22fr_0.78fr]">
        <WhyClubImageFigure
          src={`${ASSET}/storefront-desktop.png`}
          alt="WhyClub desktop storefront with campaign-led shopping layout"
          caption="Desktop opens the campaign out into a wide editorial frame"
          number="04 / 07"
          width={1700}
          height={883}
        />
        <WhyClubImageFigure
          src={`${ASSET}/storefront-mobile-collection.png`}
          alt="WhyClub mobile collection view with product browsing controls"
          caption="Mobile keeps browsing and navigation within reach"
          number="05 / 07"
          width={532}
          height={894}
          className="mx-auto w-full max-w-[390px] lg:mt-12"
        />
      </div>
    </div>
  );
}

export function WhyClubBuildGrid() {
  const items = [
    [Palette, "Brand and art", "Name, visual direction, campaign images, and graphics."],
    [MonitorSmartphone, "Product UX", "Store pages, product flows, and a checkout path built for mobile."],
    [Code2, "Store build", "A working storefront and the tools used to manage the catalogue."],
  ] as const;

  return (
    <div className="mx-auto mt-12 max-w-[1320px] px-5 sm:px-8 md:mt-16 md:px-10 lg:px-14">
      <div className="grid gap-5 lg:grid-cols-[0.96fr_1.04fr]">
        <WhyClubImageFigure
          src={`${ASSET}/products-desktop.png`}
          alt="WhyClub desktop product grid with rounded product cards"
          caption="A calm product grid lets each garment and graphic stay clear"
          number="06 / 07"
          width={1700}
          height={883}
          tone="dark"
        />
        <div className="whyclub-reveal grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {items.map(([Icon, title, description], index) => (
            <article key={title} className="rounded-[1.45rem] bg-[#253428] p-6 text-white md:p-8">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#d4e3d2]">
                  <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="font-mono text-[9px] tracking-[0.14em] text-white/45">0{index + 1}</span>
              </div>
              <h3 className="mt-8 font-display text-3xl font-bold leading-[0.9] tracking-[-0.06em]">{title}</h3>
              <p className="mt-3 max-w-[420px] text-sm leading-[1.65] text-white/65">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WhyClubClosing() {
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 md:px-10 md:py-24 lg:px-14 lg:py-28">
      <div className="whyclub-reveal overflow-hidden rounded-[1.8rem] bg-[#dce8da] px-6 py-10 md:px-12 md:py-14 lg:px-16 lg:py-20">
        <WhyClubEyebrow index="END / 02" label="The live store" />
        <div className="mt-7 grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h2 className="max-w-[720px] font-display text-[clamp(2.7rem,5.8vw,6.3rem)] font-bold leading-[0.86] tracking-[-0.085em]">
              Built to change with every drop.
            </h2>
            <p className="mt-5 max-w-[560px] text-base leading-[1.7] text-[#526052] md:text-lg">
              The live store keeps the brand clear across new products, campaigns, and customer journeys.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a
              href="https://whyclub.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1e3023] px-6 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-transform duration-150 ease-out hover:scale-[1.01] active:scale-[0.97] motion-reduce:transition-none"
            >
              Visit whyclub.in
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <Link
              href="/#work"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#315038]/25 px-6 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#244129] transition-colors hover:bg-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3f624d]"
            >
              More work
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
