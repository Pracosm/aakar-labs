import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Download,
} from "lucide-react";
import type { ReactNode } from "react";

const CASE_STUDY_ASSET = "/images/work/tfc-case-study";

export function TfcEyebrow({
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
        inverse ? "text-white/60" : "text-[#49635c]"
      }`}
    >
      <span className={inverse ? "text-[#1CD1AD]" : "text-[#0b9b83]"}>
        {index}
      </span>
      <span
        className={`h-px w-8 ${inverse ? "bg-white/25" : "bg-[#b7c8c1]"}`}
      />
      <span>{label}</span>
    </div>
  );
}

export function TfcCaseStudyHero() {
  return (
    <header className="overflow-hidden bg-[#041713] text-white">
      <div className="mx-auto grid max-w-[1500px] lg:min-h-[720px] lg:grid-cols-[0.78fr_1.22fr]">
        <div className="order-2 flex flex-col justify-between px-5 pb-12 pt-10 md:px-10 md:pb-16 md:pt-14 lg:order-1 lg:px-14 lg:py-20">
          <div>
            <TfcEyebrow index="CASE 01 / 2026" label="Brand identity" inverse />
            <h1 className="mt-8 max-w-[620px] font-display text-[clamp(3.6rem,8vw,7.6rem)] font-bold leading-[0.82] tracking-[-0.09em] text-white">
              the folding
              <br />
              <span className="text-[#1CD1AD]">company</span>
            </h1>
            <p className="mt-7 max-w-[390px] text-base leading-[1.6] text-white/65 md:text-lg">
              A flexible identity built around one gesture: give the form room
              to move.
            </p>
          </div>

          <Link
            href="/#work"
            className="mt-12 inline-flex min-h-11 w-fit items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-white/65 transition-colors hover:text-[#1CD1AD]"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to work
          </Link>
        </div>

        <div className="order-1 relative min-h-[430px] md:min-h-[560px] lg:order-2 lg:min-h-full">
          <Image
            src={`${CASE_STUDY_ASSET}/hero.webp`}
            alt="The Folding Company identity over a teal mountain landscape"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 65vw"
            className="hidden object-cover object-center lg:block"
          />
          <Image
            src={`${CASE_STUDY_ASSET}/hero-mobile.webp`}
            alt="The Folding Company identity over a teal mountain landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center lg:hidden"
          />
          <div className="absolute bottom-5 left-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 md:bottom-8 md:left-8">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-[#041713]/20 backdrop-blur-sm">
              <ArrowDown size={15} aria-hidden="true" />
            </span>
            Scroll to explore
          </div>
        </div>
      </div>
    </header>
  );
}

export function TfcProjectMeta() {
  const details = [
    ["Client", "The Folding Company"],
    ["Discipline", "Brand identity"],
    ["Deliverables", "Logo, visual system, applications, brand book"],
    ["Studio", "Aakar Labs"],
  ] as const;

  return (
    <section className="border-b border-[#dce8e1] bg-[#f4f8f4] text-[#041713]">
      <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-10 md:px-10 md:py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-14 lg:py-16">
        <div>
          <TfcEyebrow index="01" label="The project" />
          <h2 className="mt-5 max-w-[470px] font-display text-[clamp(2rem,4vw,4rem)] font-bold leading-[0.95] tracking-[-0.07em]">
            One fold. Many places to land.
          </h2>
        </div>

        <dl className="grid content-start grid-cols-1 border-t border-[#c8d9d1]">
          {details.map(([term, description]) => (
            <div
              key={term}
              className="grid grid-cols-[110px_1fr] gap-5 border-b border-[#c8d9d1] py-4 md:grid-cols-[140px_1fr] md:py-5"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#648078]">
                {term}
              </dt>
              <dd className="text-sm leading-[1.6] text-[#17352c] md:text-base">
                {description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function TfcSectionNav() {
  const links = [
    ["approach", "The idea"],
    ["system", "The system"],
    ["applications", "Applications"],
    ["digital", "Digital"],
  ] as const;

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-[64px] z-30 overflow-x-auto border-b border-[#dce8e1] bg-[#f4f8f4]/95 backdrop-blur-md md:top-[72px]"
    >
      <div className="mx-auto flex min-w-max max-w-[1320px] items-center justify-between gap-7 px-5 py-3 md:px-10 lg:px-14">
        <span className="mr-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0b9b83]">
          TFC / 01
        </span>
        <div className="flex items-center gap-6">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={`#${href}`}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#648078] transition-colors hover:text-[#041713]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function TfcSectionIntro({
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
    <div className="mx-auto grid max-w-[1320px] gap-7 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-14">
      <div>
        <TfcEyebrow index={index} label={label} inverse={inverse} />
      </div>
      <div>
        <h2
          className={`max-w-[800px] font-display text-[clamp(2.2rem,5vw,5.2rem)] font-bold leading-[0.94] tracking-[-0.075em] ${
            inverse ? "text-white" : "text-[#041713]"
          }`}
        >
          {title}
        </h2>
        <div
          className={`mt-6 max-w-[650px] text-base leading-[1.75] md:text-[1.08rem] ${
            inverse ? "text-white/65" : "text-[#49635c]"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function TfcImageFigure({
  src,
  alt,
  caption,
  number,
  tone = "light",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 75vw",
  width = 1703,
  height = 1200,
}: {
  src: string;
  alt: string;
  caption: string;
  number?: string;
  tone?: "light" | "dark";
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure
      className={`overflow-hidden border ${
        tone === "dark"
          ? "border-white/10 bg-[#06241e]"
          : "border-[#d8e5de] bg-white"
      }`}
    >
      <div className="w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full transition-transform duration-700 hover:scale-[1.015]"
        />
      </div>
      <figcaption
        className={`flex items-start justify-between gap-5 px-4 py-3 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.12em] md:px-5 md:py-4 ${
          tone === "dark" ? "text-white/55" : "text-[#648078]"
        }`}
      >
        <span>{caption}</span>
        {number ? <span className="shrink-0">{number}</span> : null}
      </figcaption>
    </figure>
  );
}

export function TfcLogoSystem() {
  return (
    <div className="mx-auto mt-14 max-w-[1320px] px-5 md:mt-20 md:px-10 lg:px-14">
      <div className="grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
        <TfcImageFigure
          src={`${CASE_STUDY_ASSET}/lockups.webp`}
          alt="The Folding Company logo lockups and geometric studies on dark and light backgrounds"
          caption="Primary lockups, contrast tests, and the TFC initials"
          number="02 / 07"
          priority
          sizes="(max-width: 768px) 100vw, 65vw"
          width={1703}
          height={1770}
        />
        <TfcImageFigure
          src={`${CASE_STUDY_ASSET}/fold-sculpture.png`}
          alt="Abstract folded paper sculpture in folded black and unfolding teal"
          caption="The idea as an object: two planes, one opening"
          number="01 / 07"
          tone="dark"
          sizes="(max-width: 768px) 100vw, 35vw"
          width={1536}
          height={1024}
        />
      </div>

      <TfcImageFigure
        src={`${CASE_STUDY_ASSET}/geometry.webp`}
        alt="The Folding Company logo construction grid with anchor points and wordmark geometry"
        caption="The mark and wordmark resolved as a system of repeatable proportions"
        number="03 / 07"
        tone="dark"
        sizes="(max-width: 1024px) 100vw, 80vw"
        width={1703}
        height={1120}
      />
    </div>
  );
}

const palette = [
  { name: "Unfolding Teal", value: "#1CD1AD", className: "bg-[#1CD1AD]" },
  { name: "Folded Black", value: "#041713", className: "bg-[#041713]" },
  { name: "White", value: "#FFFFFF", className: "bg-white" },
  { name: "Soft Grey", value: "#BFBFBF", className: "bg-[#BFBFBF]" },
  { name: "Mid Grey", value: "#808080", className: "bg-[#808080]" },
  { name: "Ink", value: "#000000", className: "bg-black" },
] as const;

export function TfcPaletteAndType() {
  return (
    <div className="mx-auto mt-14 max-w-[1320px] px-5 md:mt-20 md:px-10 lg:px-14">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border border-white/10 bg-[#06241e] p-5 md:p-8">
          <div className="mb-7 flex items-center justify-between gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1CD1AD]">
              Palette
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              06 colours
            </span>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
            {palette.map((swatch) => (
              <div key={swatch.value} className="bg-[#06241e] p-3 md:p-4">
                <div className={`h-20 w-full ${swatch.className}`} />
                <div className="mt-3 flex flex-col gap-1">
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/65">
                    {swatch.name}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.08em] text-[#1CD1AD]">
                    {swatch.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <TfcImageFigure
          src={`${CASE_STUDY_ASSET}/palette-type.webp`}
          alt="The Folding Company colour palette and Instrument Sans type specimen"
          caption="Unfolding Teal, Folded Black, and Instrument Sans keep the system clear"
          number="04 / 07"
          tone="light"
          sizes="(max-width: 1024px) 100vw, 55vw"
          width={1703}
          height={1660}
        />
      </div>
    </div>
  );
}

export function TfcApplications() {
  return (
    <div className="mx-auto mt-14 max-w-[1320px] px-5 md:mt-20 md:px-10 lg:px-14">
      <div className="grid gap-5 lg:grid-cols-2">
        <TfcImageFigure
          src={`${CASE_STUDY_ASSET}/applications-a.webp`}
          alt="The Folding Company identity applied to packaging, a hanging sign, and a mobile icon"
          caption="Packaging, event signage, and the smallest digital touchpoint"
          number="05 / 07"
          tone="light"
          sizes="(max-width: 1024px) 100vw, 50vw"
          width={1703}
          height={2350}
        />
        <TfcImageFigure
          src={`${CASE_STUDY_ASSET}/applications-b.webp`}
          alt="The Folding Company identity applied to a lightbox, textured fabric, and building signage"
          caption="Light, texture, and the built environment"
          number="06 / 07"
          tone="dark"
          sizes="(max-width: 1024px) 100vw, 50vw"
          width={1703}
          height={2350}
        />
      </div>
    </div>
  );
}

export function TfcDigitalWork() {
  return (
    <div className="mx-auto mt-14 max-w-[1320px] px-5 md:mt-20 md:px-10 lg:px-14">
      <TfcImageFigure
        src={`${CASE_STUDY_ASSET}/digital.webp`}
        alt="The Folding Company storefront interface, laptop mockup, and die-cut shopping bag system"
        caption="The system travels into digital products and the objects that carry them"
        number="07 / 07"
        tone="light"
        sizes="(max-width: 1024px) 100vw, 90vw"
        width={1703}
        height={1883}
      />
      <div className="mt-5 grid gap-px border border-[#d8e5de] bg-[#d8e5de] sm:grid-cols-2">
        <div className="bg-[#f4f8f4] p-5 md:p-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0b9b83]">
            01 / Storefront
          </span>
          <p className="mt-3 font-display text-xl font-bold leading-[1.05] tracking-[-0.05em] text-[#041713] md:text-2xl">
            Quiet structure.
          </p>
        </div>
        <div className="bg-[#1CD1AD] p-5 md:p-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#041713]/70">
            02 / Objects
          </span>
          <p className="mt-3 font-display text-xl font-bold leading-[1.05] tracking-[-0.05em] text-[#041713] md:text-2xl">
            Built to travel.
          </p>
        </div>
      </div>
    </div>
  );
}

export function TfcBrandBookCta() {
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-16 md:px-10 md:py-24 lg:px-14 lg:py-32">
      <div className="relative overflow-hidden border border-[#1CD1AD]/30 bg-[#06241e] px-6 py-10 md:px-12 md:py-14 lg:px-20 lg:py-20">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-[#1CD1AD]/25 md:h-96 md:w-96" />
        <div className="pointer-events-none absolute -bottom-40 right-16 h-80 w-80 rounded-full border border-[#1CD1AD]/15" />
        <div className="relative z-10 max-w-[740px]">
          <TfcEyebrow index="END / 01" label="The full brand book" inverse />
          <h2 className="mt-6 font-display text-[clamp(2.4rem,5.4vw,5.4rem)] font-bold leading-[0.92] tracking-[-0.075em] text-white">
            Take the whole system with you.
          </h2>
          <p className="mt-6 max-w-[520px] text-base leading-[1.75] text-white/60 md:text-lg">
            See the complete identity in one long-form brand book, from the
            first fold to the final application.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/work/tfc-brand-book.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1CD1AD] px-6 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#041713] transition-transform hover:-translate-y-0.5"
            >
              Open brand book
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a
              href="/work/tfc-brand-book.pdf"
              download="the-folding-company-brand-book.pdf"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              Download PDF
              <Download size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
          Aakar Labs / The Folding Company
        </span>
        <Link
          href="/#work"
          className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/65 transition-colors hover:text-[#1CD1AD]"
        >
          More work
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
