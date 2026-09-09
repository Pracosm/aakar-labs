"use client";

import Image from "next/image";
import Link from "next/link";
import { Asterisk, ArrowDown, ArrowLeft, ArrowUpRight, ShoppingBag } from "lucide-react";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WhyClubReferenceMockup } from "./WhyClubReferenceMockup";

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

    const hoverCleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".whyclub-hero-copy > *",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.12,
        },
      );

      gsap.fromTo(
        ".whyclub-hero-image",
        { scale: 1.08 },
        { scale: 1, duration: 1.5, ease: "power3.out" },
      );

      gsap.utils.toArray<HTMLElement>(".whyclub-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      gsap.to(".whyclub-marquee-track", {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });

      gsap.utils.toArray<HTMLElement>("[data-whyclub-hover]").forEach((element) => {
        const image = element.querySelector<HTMLElement>("[data-whyclub-hover-image]");
        if (!image) return;

        const enter = () => gsap.to(image, { scale: 1.045, duration: 0.8, ease: "power2.out" });
        const leave = () => gsap.to(image, { scale: 1, duration: 0.8, ease: "power2.out" });
        element.addEventListener("mouseenter", enter);
        element.addEventListener("mouseleave", leave);
        hoverCleanups.push(() => {
          element.removeEventListener("mouseenter", enter);
          element.removeEventListener("mouseleave", leave);
        });
      });
    }, root);

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="whyclub-case-study">
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
      className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] ${
        inverse ? "text-white/55" : "text-[#6f6f69]"
      }`}
    >
      <span className={inverse ? "text-[#d9ff3f]" : "text-[#111111]"}>{index}</span>
      <span className={`h-px w-8 ${inverse ? "bg-white/25" : "bg-black/20"}`} />
      <span>{label}</span>
    </div>
  );
}

export function WhyClubCaseStudyHero() {
  return (
    <header className="overflow-hidden bg-[#f3f3f0] text-[#0a0a0a]">
      <div className="mx-auto grid max-w-[1500px] lg:min-h-[740px] lg:grid-cols-[0.78fr_1.22fr]">
        <div className="whyclub-hero-copy order-2 flex flex-col justify-between px-5 pb-12 pt-10 md:px-10 md:pb-16 md:pt-14 lg:order-1 lg:px-14 lg:py-20">
          <div>
            <WhyClubEyebrow index="CASE 02 / 2026" label="D2C / E-COMMERCE" />
            <h1 className="mt-8 max-w-[620px] font-display text-[clamp(4.5rem,10vw,9rem)] font-bold leading-[0.78] tracking-[-0.1em]">
              why
              <br />
              <span className="text-[#6f6f69]">club</span>
            </h1>
            <p className="mt-8 max-w-[370px] text-base leading-[1.6] text-[#4d4d48] md:text-lg">
              A rebellious Indian streetwear world built around one rule: perfect
              is boring.
            </p>
          </div>

          <Link
            href="/#work"
            className="mt-12 inline-flex min-h-11 w-fit items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#4d4d48] transition-colors hover:text-black"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to work
          </Link>
        </div>

        <div className="whyclub-reference-wrap order-1 relative aspect-[4/3] overflow-hidden bg-[#e5e5e1] md:aspect-[4/3] lg:order-2 lg:aspect-auto lg:min-h-full">
          <div className="absolute inset-0">
            <WhyClubReferenceMockup
              alt="WhyClub handheld phone mockup showing the Please I’m a Star storefront"
              priority
              sizes="(max-width: 1023px) 100vw, 65vw"
            />
          </div>
          <div className="absolute bottom-5 left-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-black/60 md:bottom-8 md:left-8">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/25 bg-white/35 backdrop-blur-sm">
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
    ["Client", "WhyClub"],
    ["Discipline", "Brand identity + commerce"],
    ["Deliverables", "Naming, art direction, storefront, checkout, admin"],
    ["Studio", "Aakar Labs"],
  ] as const;

  return (
    <section className="border-b border-black/10 bg-[#f3f3f0] text-[#0a0a0a]">
      <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-10 md:px-10 md:py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-14 lg:py-16">
        <div>
          <WhyClubEyebrow index="01" label="The project" />
          <h2 className="mt-5 max-w-[470px] font-display text-[clamp(2.3rem,4.5vw,4.5rem)] font-bold leading-[0.88] tracking-[-0.08em]">
            Rebellion, packaged for the scroll.
          </h2>
        </div>

        <dl className="grid content-start grid-cols-1 border-t border-black/15">
          {details.map(([term, description]) => (
            <div
              key={term}
              className="grid grid-cols-[110px_1fr] gap-5 border-b border-black/15 py-4 md:grid-cols-[140px_1fr] md:py-5"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#777770]">
                {term}
              </dt>
              <dd className="text-sm leading-[1.6] text-[#292925] md:text-base">
                {description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function WhyClubSectionNav() {
  const links = [
    ["brief", "The brief"],
    ["world", "The world"],
    ["interfaces", "Two modes"],
    ["motion", "Motion"],
  ] as const;

  return (
    <nav
      aria-label="WhyClub case study sections"
      className="sticky top-[64px] z-30 overflow-x-auto border-b border-black/10 bg-[#f3f3f0]/95 backdrop-blur-md md:top-[72px]"
    >
      <div className="mx-auto flex min-w-max max-w-[1320px] items-center justify-between gap-7 px-5 py-3 md:px-10 lg:px-14">
        <span className="mr-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#111111]">
          WHY / 02
        </span>
        <div className="flex items-center gap-6">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={`#${href}`}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#777770] transition-colors hover:text-black"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
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
    <div className="whyclub-reveal mx-auto grid max-w-[1320px] gap-7 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-14">
      <div>
        <WhyClubEyebrow index={index} label={label} inverse={inverse} />
      </div>
      <div>
        <h2
          className={`max-w-[800px] font-display text-[clamp(2.4rem,5.2vw,5.4rem)] font-bold leading-[0.88] tracking-[-0.08em] ${
            inverse ? "text-white" : "text-[#0a0a0a]"
          }`}
        >
          {title}
        </h2>
        <div
          className={`mt-6 max-w-[650px] text-base leading-[1.75] md:text-[1.08rem] ${
            inverse ? "text-white/60" : "text-[#5f5f58]"
          }`}
        >
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
}: {
  src: string;
  alt: string;
  caption: string;
  number?: string;
  tone?: "light" | "dark";
  width?: number;
  height?: number;
}) {
  return (
    <figure
      data-whyclub-hover
      className={`whyclub-reveal overflow-hidden border ${
        tone === "dark"
          ? "border-white/10 bg-[#111111]"
          : "border-black/10 bg-white"
      }`}
    >
      <div className="overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 1024px) 100vw, 70vw"
          data-whyclub-hover-image
          className="h-auto w-full object-cover"
        />
      </div>
      <figcaption
        className={`flex items-start justify-between gap-5 px-4 py-3 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.12em] md:px-5 md:py-4 ${
          tone === "dark" ? "text-white/50" : "text-[#777770]"
        }`}
      >
        <span>{caption}</span>
        {number ? <span className="shrink-0">{number}</span> : null}
      </figcaption>
    </figure>
  );
}

export function WhyClubWorldSystem() {
  return (
    <div className="mx-auto mt-14 max-w-[1320px] px-5 md:mt-20 md:px-10 lg:px-14">
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="whyclub-reveal bg-[#0a0a0a] p-6 text-white md:p-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d9ff3f]">
            The attitude
          </span>
          <p className="mt-12 max-w-[560px] font-display text-[clamp(3.2rem,6vw,6.6rem)] font-bold leading-[0.82] tracking-[-0.09em]">
            Perfect
            <br />
            is boring.
          </p>
          <div className="mt-14 grid grid-cols-2 gap-px border border-white/15 bg-white/15 sm:grid-cols-4">
            {[
              ["#0A0A0A", "Black"],
              ["#F3F3F0", "Canvas"],
              ["#B3C9F3", "Drop blue"],
              ["#D9FF3F", "Signal"],
            ].map(([value, label]) => (
              <div key={value} className="bg-[#0a0a0a] p-3 md:p-4">
                <div className="h-16 w-full" style={{ backgroundColor: value }} />
                <span className="mt-3 block font-mono text-[9px] uppercase tracking-[0.12em] text-white/60">
                  {label}
                </span>
                <span className="mt-1 block font-mono text-[10px] text-[#d9ff3f]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <WhyClubImageFigure
          src={`${ASSET}/product-bad-touch.webp`}
          alt="WhyClub Bad Touch graphic tee photographed on a model"
          caption="Graphic language that feels found, not polished"
          number="02 / 06"
        />
      </div>
    </div>
  );
}

export function WhyClubCategoryGrid() {
  const categories = [
    ["category-tees.webp", "Tees", "Oversized graphics"],
    ["category-hoodies.webp", "Hoodies", "Layer the attitude"],
    ["category-bottoms.webp", "Bottoms", "Colour in motion"],
    ["category-accessories.webp", "Accessories", "Small signal, big read"],
  ] as const;

  return (
    <div className="mx-auto mt-14 max-w-[1320px] px-5 md:mt-20 md:px-10 lg:px-14">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map(([file, label, description], index) => (
          <figure
            key={file}
            data-whyclub-hover
            className="whyclub-reveal group relative overflow-hidden bg-[#f3f3f0]"
          >
            <Image
              src={`${ASSET}/${file}`}
              alt={`WhyClub ${label.toLowerCase()} category visual`}
              width={900}
              height={1100}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              data-whyclub-hover-image
              className="aspect-[0.82] h-auto w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-20 text-white">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
                0{index + 1} / Explore
              </span>
              <strong className="mt-2 block font-display text-3xl uppercase leading-none tracking-[-0.05em]">
                {label}
              </strong>
              <span className="mt-1 block text-sm text-white/70">{description}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function WhyClubInterfacePair() {
  return (
    <div className="mx-auto mt-14 grid max-w-[1320px] items-start gap-6 px-5 md:mt-20 md:px-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12 lg:px-14">
      <WhyClubImageFigure
        src={`${ASSET}/desktop-home-capture.png`}
        alt="WhyClub desktop storefront homepage captured from the live site"
        caption="Desktop: a wide editorial drop with the product doing the talking"
        number="04 / 06"
        width={1470}
        height={850}
        tone="dark"
      />
      <div className="whyclub-reveal lg:sticky lg:top-32">
        <WhyClubImageFigure
          src={`${ASSET}/mobile-home-capture.png`}
          alt="WhyClub mobile storefront homepage captured from the live site"
          caption="Mobile: a swipeable hero, fixed dock, and a different rhythm"
          number="05 / 06"
          width={390}
          height={844}
        />
      </div>
    </div>
  );
}

export function WhyClubMotionBand() {
  return (
    <div className="overflow-hidden bg-[#d9ff3f] py-5 text-[#0a0a0a]">
      <div className="whyclub-marquee-track flex min-w-max items-center gap-10 whitespace-nowrap font-display text-4xl font-bold uppercase leading-none tracking-[-0.04em] md:text-6xl">
        {Array.from({ length: 2 }, (_, group) => (
          <div key={group} className="flex items-center gap-10">
            <span>bold graphics</span>
            <Asterisk size={24} strokeWidth={1.5} aria-hidden="true" className="text-black/30" />
            <span>oversized fits</span>
            <Asterisk size={24} strokeWidth={1.5} aria-hidden="true" className="text-black/30" />
            <span>perfect is boring</span>
            <Asterisk size={24} strokeWidth={1.5} aria-hidden="true" className="text-black/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhyClubBuildGrid() {
  return (
    <div className="mx-auto mt-14 max-w-[1320px] px-5 md:mt-20 md:px-10 lg:px-14">
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <WhyClubImageFigure
          src={`${ASSET}/product-system.webp`}
          alt="WhyClub F*ck The System graphic apparel photographed on a model"
          caption="Art direction carries from campaign image to product card"
          number="06 / 06"
          tone="dark"
        />
        <div className="whyclub-reveal grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-1">
          {[
            ["01", "Identity", "A name, a mark, and a point of view that never apologises."],
            ["02", "Storefront", "A calm commerce shell that lets the graphics stay loud."],
            ["03", "Operations", "Checkout and admin flows built for a real drop cycle."],
          ].map(([index, title, description]) => (
            <div key={index} className="bg-[#111111] p-6 md:p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d9ff3f]">
                {index}
              </span>
              <h3 className="mt-8 font-display text-3xl font-bold uppercase leading-none tracking-[-0.05em] text-white">
                {title}
              </h3>
              <p className="mt-3 max-w-[420px] text-sm leading-[1.65] text-white/55">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WhyClubBrandBookCta() {
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-16 md:px-10 md:py-24 lg:px-14 lg:py-32">
      <div className="relative overflow-hidden border border-[#d9ff3f]/25 bg-[#111111] px-6 py-10 md:px-12 md:py-14 lg:px-20 lg:py-20">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-[#d9ff3f]/20 md:h-96 md:w-96" />
        <div className="relative z-10 max-w-[760px]">
          <WhyClubEyebrow index="END / 02" label="The live storefront" inverse />
          <h2 className="mt-6 font-display text-[clamp(2.7rem,5.4vw,5.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.08em] text-white">
            Go where perfect is boring.
          </h2>
          <p className="mt-6 max-w-[540px] text-base leading-[1.75] text-white/60 md:text-lg">
            The live store is still the best way to feel the drop: wide on desktop,
            swipe-first on mobile, and always a little unexpected.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="https://whyclub.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#d9ff3f] px-6 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a0a0a] transition-transform hover:-translate-y-0.5"
            >
              Visit whyclub.in
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <Link
              href="/#work"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 px-6 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75 transition-colors hover:border-white/50 hover:text-white"
            >
              More work
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
          Aakar Labs / WhyClub
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
          <ShoppingBag size={13} aria-hidden="true" />
          D2C / INDIA
        </span>
      </div>
    </section>
  );
}
