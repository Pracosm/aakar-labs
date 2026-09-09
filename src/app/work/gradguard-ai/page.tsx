import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Globe,
  TriangleAlert,
  Bell,
  Settings,
  Home,
  Search,
  Filter,
} from "lucide-react";

/* Light-theme section label local to this case study page,
   since the global SectionLabel is themed for the dark site shell. */
function SectionLabel({ code, label }: { code: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] font-medium tracking-[2px] text-[#FF5C1B]">
        {code}
      </span>
      <span className="block h-px w-8 bg-[#E0DCD4]" />
      <span className="font-mono text-[10px] font-medium tracking-[2px] text-[#9A948E]">
        {label}
      </span>
    </div>
  );
}

export const metadata: Metadata = {
  title: "GradGuard AI Case Study — Social Media Audit App UX/UI",
  description:
    "Case study: Aakar Labs designed GradGuard AI, an AI-powered social media auditing app that scans Instagram, Reddit, X, LinkedIn, and YouTube for high-risk content.",
  alternates: { canonical: "/work/gradguard-ai" },
  openGraph: {
    type: "article",
    title: "GradGuard AI Case Study — Social Media Audit App UX/UI",
    description:
      "End-to-end UX/UI for an AI social media auditing platform covering five networks, 40 screens, and a production-ready handoff.",
    url: `${SITE_URL}/work/gradguard-ai`,
  },
};

const caseStudyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "GradGuard AI — Case Study",
      description:
        "An AI-powered social media auditing platform that scans posts across Instagram, Reddit, X, LinkedIn, and YouTube.",
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      mainEntityOfPage: `${SITE_URL}/work/gradguard-ai`,
      about: "UX/UI design for a mobile social media audit product",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Work",
          item: `${SITE_URL}/#work`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "GradGuard AI",
          item: `${SITE_URL}/work/gradguard-ai`,
        },
      ],
    },
  ],
};

export default function GradGuardCaseStudy() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <JsonLd data={caseStudyJsonLd} />
      <Navbar />
      <main id="main">
        <CaseStudyHero />
        <ProjectOverview />
        <Challenge />
        <Solution />
        <ScreenShowcase />
        <Results />
        <CTASection />
      </main>
      <CaseStudyFooter />
    </div>
  );
}

/* ============================================================
   HERO
   ============================================================ */

function CaseStudyHero() {
  return (
    <section
      className="relative h-auto min-h-[520px] w-full overflow-hidden lg:h-[753px]"
      style={{
        background:
          "linear-gradient(160deg, #F5F0FF 0%, #FFF0F5 40%, #F0F0FF 70%, #FFF8F3 100%)",
      }}
    >
      {/* Blurred gradient circles */}
      <div
        className="absolute -left-[60px] top-[50px] h-[200px] w-[200px] rounded-full opacity-20 md:h-[360px] md:w-[360px]"
        style={{ background: "#D8B4FE", filter: "blur(100px)" }}
      />
      <div
        className="absolute -top-[30px] right-[-30px] h-[160px] w-[160px] rounded-full opacity-25 md:h-[280px] md:w-[280px]"
        style={{ background: "#F9A8D4", filter: "blur(100px)" }}
      />
      <div
        className="absolute right-[-20px] top-[600px] hidden h-[200px] w-[200px] rounded-full opacity-20 lg:block"
        style={{ background: "#93C5FD", filter: "blur(80px)" }}
      />

      {/* Dots */}
      <div className="absolute left-[300px] top-[80px] hidden h-4 w-4 rounded-full bg-[#8B5CF6] lg:block" />
      <div className="absolute right-[60px] top-[120px] hidden h-2.5 w-2.5 rounded-full bg-[#F472B6] opacity-70 lg:block" />
      <div className="absolute left-[200px] top-[650px] hidden h-5 w-5 rounded-full bg-[#A78BFA] opacity-60 lg:block" />
      <div className="absolute right-[140px] top-[380px] hidden h-3 w-3 rounded-full bg-[#8B5CF6] lg:block" />

      {/* Stars */}
      <span
        className="absolute left-[20px] top-[20px] font-display text-[40px] font-bold text-[#8B5CF6] opacity-[0.12] md:left-[80px] md:text-[70px]"
        style={{ transform: "rotate(12deg)" }}
      >
        *
      </span>
      <span
        className="absolute right-[100px] top-[160px] hidden font-display text-[45px] font-bold text-[#8B5CF6] opacity-[0.10] lg:block"
        style={{ transform: "rotate(-8deg)" }}
      >
        *
      </span>

      {/* Plus signs */}
      <span className="absolute left-[360px] top-[340px] hidden font-display text-4xl font-light text-[#D4D0E8] lg:block">
        +
      </span>
      <span className="absolute right-[380px] top-[550px] hidden font-display text-[28px] font-light text-[#D4D0E8] lg:block">
        +
      </span>

      {/* Floating cutout cards — desktop */}
      <div className="hidden lg:block">
        <div
          className="animate-card-float absolute right-[380px] top-[80px] flex h-[180px] w-[240px] flex-col gap-2.5 rounded-2xl bg-[#EDE9FE] p-6 shadow-[0_8px_30px_-4px_#00000010]"
          style={
            {
              transform: "rotate(-8deg)",
              "--float-duration": "6s",
              "--float-delay": "0s",
            } as React.CSSProperties
          }
        >
          <ShieldCheck size={28} className="text-[#7C3AED]" />
          <span className="font-display text-[22px] font-bold leading-[1.15] tracking-[-0.3px] text-[#3B0764]">
            AI-powered
            <br />
            risk scanning
          </span>
          <span className="text-[11px] leading-[1.5] text-[#6B21A8]">
            5 platforms. Real-time
            <br />
            flagging and categorisation.
          </span>
        </div>

        <div
          className="animate-card-float absolute right-[20px] top-[260px] flex h-[140px] w-[200px] flex-col gap-2 rounded-2xl bg-[#DBEAFE] p-5 shadow-[0_8px_30px_-4px_#00000010]"
          style={
            {
              transform: "rotate(-5deg)",
              "--float-duration": "5.5s",
              "--float-delay": "0.5s",
            } as React.CSSProperties
          }
        >
          <Globe size={22} className="text-[#1D4ED8]" />
          <span className="font-display text-[16px] font-bold leading-[1.2] tracking-[-0.3px] text-[#1E3A5F]">
            Instagram, X,
            <br />
            Reddit, LinkedIn,
            <br />
            YouTube
          </span>
        </div>

        <div
          className="animate-card-float absolute -left-[10px] top-[500px] flex h-[130px] w-[180px] flex-col gap-2 rounded-2xl bg-[#FEF3C7] p-5 shadow-[0_6px_24px_-4px_#00000010]"
          style={
            {
              transform: "rotate(10deg)",
              "--float-duration": "7s",
              "--float-delay": "1s",
            } as React.CSSProperties
          }
        >
          <TriangleAlert size={20} className="text-[#B45309]" />
          <span className="font-display text-[18px] font-bold leading-[1.15] tracking-[-0.3px] text-[#78350F]">
            High, Medium
            <br />& Low risk.
          </span>
        </div>

        <div
          className="animate-card-float absolute left-[52%] top-[437px] flex h-[100px] w-[160px] flex-col gap-1.5 rounded-xl bg-[#F0FDF4] p-4 shadow-[0_6px_20px_-4px_#00000010]"
          style={
            {
              transform: "rotate(-12deg)",
              "--float-duration": "6.5s",
              "--float-delay": "1.5s",
            } as React.CSSProperties
          }
        >
          <span className="font-display text-[18px] font-bold leading-[1.15] tracking-[-0.3px] text-[#14532D]">
            40 screens.
            <br />
            Full system.
          </span>
          <span className="text-[11px] font-medium text-[#166534]">
            Dev-ready.
          </span>
        </div>
      </div>

      {/* Back link */}
      <Link
        href="/#work"
        className="absolute left-4 top-6 z-[50] flex min-h-11 items-center gap-2 rounded-full border border-[#D1D5DB]/40 bg-white/80 px-4 py-2.5 font-mono text-[12px] font-semibold tracking-[1.5px] text-[#374151] shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all hover:bg-white hover:text-[#111827] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] active:scale-[0.98] md:left-10 md:top-10 md:text-[11px] lg:left-16"
      >
        <ArrowLeft size={16} />
        BACK TO WORK
      </Link>

      {/* Hero text */}
      <div className="relative z-10 flex flex-col gap-8 px-5 pt-24 md:px-10 lg:w-[560px] lg:px-0 lg:pl-[120px] lg:pt-[160px]">
        <SectionLabel code="PRJ-001" label="CASE_STUDY" />

        <h1 className="font-display text-[2.15rem] font-bold leading-[1.12] tracking-[-0.04em] text-[#1A1816] md:text-5xl md:leading-[1.05] md:tracking-[-2px] lg:text-[64px] lg:tracking-[-2.5px]">
          GradGuard AI
        </h1>

        <p className="max-w-[520px] font-body text-[1.0625rem] leading-[1.7] text-[#4A453F] lg:text-[18px] lg:text-[#6B6560]">
          An AI-powered social media auditing platform that scans posts across
          Instagram, Reddit, X, LinkedIn, and YouTube — flagging high-risk
          content before it becomes a problem.
        </p>

        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
          {["MOBILE APP", "UI/UX DESIGN", "DESIGN SYSTEM"].map((tag) => (
            <span
              key={tag}
              className="border border-[#E0DCD4] px-2.5 py-1 font-mono text-[10px] font-medium tracking-[1.5px] text-[#6B6560]"
            >
              {tag}
            </span>
          ))}
          <span className="font-mono text-[11px] font-medium tracking-[1px] text-[#9A948E]">
            2025
          </span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROJECT OVERVIEW
   ============================================================ */

function ProjectOverview() {
  return (
    <section className="flex w-full flex-col gap-10 border-y border-[#EBE8E2] bg-[#FAF8F4] px-5 py-12 md:px-10 md:py-16 lg:flex-row lg:gap-20 lg:px-[120px] lg:py-20">
      {/* Left column */}
      <div className="flex flex-1 flex-col gap-6">
        <SectionLabel code="PRJ-001" label="OVERVIEW" />
        <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-1px] text-[#1A1816] lg:text-4xl">
          Protecting futures,
          <br />
          one post at a time.
        </h2>
        <div className="flex flex-col gap-4 text-[1.0625rem] leading-[1.7] text-[#4A453F] md:text-[15px] lg:text-base lg:text-[#6B6560]">
          <p>
            GradGuard AI helps students and professionals audit their social
            media presence before job applications, college admissions, or public
            appearances. The platform uses AI to scan posts across five major
            platforms, categorise risk levels, and generate comprehensive audit
            reports.
          </p>
          <p>
            We designed the complete mobile experience — from onboarding to
            audit results — with a focus on making a potentially stressful
            process feel approachable and clear.
          </p>
        </div>
      </div>

      {/* Right column — project specs */}
      <div className="w-full shrink-0 border border-[#E0DCD4] bg-white lg:w-[374px]">
        <div className="flex items-center justify-between border-b border-[#E0DCD4] px-6 py-4">
          <span className="font-mono text-[10px] font-medium tracking-[2px] text-[#9A948E]">
            PROJECT DETAILS
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5C1B]" />
        </div>
        {(
          [
            ["CLIENT", "GradGuard Inc."],
            ["TIMELINE", "8 weeks"],
            ["PLATFORMS", "iOS, Android"],
            ["SCREENS", "10 unique screens"],
            ["SCOPE", "End-to-end UI/UX"],
            ["TOOLS", "Figma, Protopie"],
            ["HANDOFF", "Dev-ready specs"],
          ] as const
        ).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between border-b border-[#EBE8E2] px-6 py-3.5 last:border-b-0"
          >
            <span className="font-mono text-[11px] font-medium tracking-[1px] text-[#9A948E]">
              {key}
            </span>
            <span className="font-body text-sm text-[#1A1816]">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   CHALLENGE
   ============================================================ */

function Challenge() {
  return (
    <section className="flex w-full flex-col gap-12 border-b border-[#EBE8E2] bg-[#F5F1EB] px-5 py-12 md:px-10 md:py-16 lg:px-[120px] lg:py-20">
      <div className="flex flex-col gap-5">
        <SectionLabel code="PRJ-001" label="THE_CHALLENGE" />
        <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-1px] text-[#1A1816] lg:text-4xl">
          Social media is a minefield
          <br className="hidden md:block" />
          for future professionals.
        </h2>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="font-display text-xl font-bold tracking-[-0.5px] text-[#1A1816]">
            The problem
          </h3>
          <p className="text-[1.0625rem] leading-[1.7] text-[#4A453F] md:text-[15px] md:text-[#6B6560]">
            Students and early-career professionals have years of unfiltered
            social media history. A single controversial post can derail a job
            application or college admission — and most people don&apos;t know
            what&apos;s lurking in their feed.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="font-display text-xl font-bold tracking-[-0.5px] text-[#1A1816]">
            Why it matters
          </h3>
          <p className="text-[1.0625rem] leading-[1.7] text-[#4A453F] md:text-[15px] md:text-[#6B6560]">
            70% of employers screen candidates&apos; social media. Manual
            auditing across 5+ platforms is tedious, inconsistent, and easy to
            miss. Users needed a tool that&apos;s fast, thorough, and
            doesn&apos;t feel like a compliance form.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SOLUTION
   ============================================================ */

function Solution() {
  const items = [
    {
      num: "01",
      title: "Calming colour system",
      desc: "Purple as the primary colour communicates trust and intelligence. Red is reserved only for genuine high-risk flags — keeping the interface calm by default.",
    },
    {
      num: "02",
      title: "Dashboard-first experience",
      desc: "Users land on a clear risk score with platform breakdown — no hunting for information. One glance tells you where you stand.",
    },
    {
      num: "03",
      title: "Actionable audit flow",
      desc: "Every flagged post comes with a risk level, platform source, and date — so users can act immediately. Filter by severity and generate a full report in one tap.",
    },
  ];

  return (
    <section className="flex w-full flex-col gap-12 border-y border-[#EBE8E2] bg-[#FAF8F4] px-5 py-12 md:px-10 md:py-16 lg:px-[120px] lg:py-20">
      <div className="flex flex-col gap-5">
        <SectionLabel code="PRJ-001" label="OUR_APPROACH" />
        <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-1px] text-[#1A1816] lg:text-4xl">
          Design that makes a stressful
          <br className="hidden md:block" />
          process feel effortless.
        </h2>
        <p className="max-w-[680px] text-base leading-[1.7] text-[#6B6560]">
          We designed GradGuard AI to be reassuring, not alarming. Every
          decision — from colour to copy to interaction — was made to help users
          feel in control of their digital footprint.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {items.map((item) => (
          <div
            key={item.num}
            className="flex flex-1 flex-col gap-4 border border-[#E0DCD4] bg-white p-8"
          >
            <span className="font-mono text-[11px] font-semibold tracking-[2px] text-[#FF5C1B]">
              {item.num}
            </span>
            <h3 className="font-display text-xl font-bold tracking-[-0.5px] text-[#1A1816]">
              {item.title}
            </h3>
            <p className="text-sm leading-[1.6] text-[#6B6560]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   SCREEN SHOWCASE
   ============================================================ */

function ScreenShowcase() {
  return (
    <section className="flex w-full flex-col items-center gap-12 bg-[#F5F1EB] px-5 py-12 md:px-10 md:py-16 lg:px-[120px] lg:py-20">
      <SectionLabel code="PRJ-001" label="SCREEN_GALLERY" />

      <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-center md:gap-10">
        <div className="flex flex-col items-center gap-4">
          <DashboardPhone />
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-[#9A948E]">
            Home Dashboard
          </span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <AuditPhone />
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-[#9A948E]">
            Audit Screen
          </span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   RESULTS
   ============================================================ */

function Results() {
  const stats = [
    { num: "40", label: "Unique screens\ndesigned" },
    { num: "5", label: "Platform integrations\ncovered" },
    { num: "8", label: "Weeks from\nkickoff to handoff" },
    { num: "100%", label: "Dev-ready\nhandoff package" },
  ];

  return (
    <section className="flex w-full flex-col gap-12 bg-[#F5F1EB] px-5 py-12 md:px-10 md:py-16 lg:px-[120px] lg:py-20">
      <div className="flex flex-col gap-5">
        <SectionLabel code="PRJ-001" label="RESULTS" />
        <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-1px] text-[#1A1816] lg:text-4xl">
          Delivered on time.
          <br />
          Designed to last.
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.num}
            className={`flex flex-col gap-2 py-8 pr-7 ${i < 3 ? "lg:border-r lg:border-[#E0DCD4]" : ""}`}
          >
            <span className="font-display text-4xl font-bold tracking-[-2px] text-[#FF5C1B] md:text-5xl">
              {stat.num}
            </span>
            <span className="whitespace-pre-line text-sm leading-[1.5] text-[#6B6560]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   CTA SECTION
   ============================================================ */

function CTASection() {
  return (
    <section
      className="flex w-full flex-col items-center gap-8 px-5 py-16 md:px-10 md:py-20 lg:py-[120px]"
      style={{
        background: "linear-gradient(180deg, #FFF8F3 0%, #F5F1EB 100%)",
      }}
    >
      <span className="font-body text-xs font-semibold tracking-[3px] text-[#FF5C1B]">
        INTERESTED IN WORKING TOGETHER?
      </span>
      <h2 className="max-w-[800px] text-center font-body text-3xl font-bold text-[#1A1816] md:text-4xl lg:text-5xl">
        Let&apos;s design your next product.
      </h2>
      <p className="max-w-[640px] text-center text-base leading-[1.6] text-[#6B6560]">
        We bring ideas to life with polished interfaces, structured design
        systems, and pixel-perfect handoff — ready for your engineering team.
      </p>
      <div className="flex w-full max-w-[22rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
        <Link
          href="/start-project"
          className="inline-flex min-h-12 w-full items-center justify-center bg-[#FF5C1B] px-7 py-3 font-mono text-[14px] font-semibold tracking-[1px] text-[#F5F1EB] transition-colors hover:bg-[#FF7A42] sm:w-auto md:text-[13px]"
        >
          START A PROJECT
        </Link>
        <Link
          href="/#work"
          className="inline-flex min-h-12 w-full items-center justify-center border border-[#E0DCD4] px-7 py-3 font-mono text-[14px] font-medium tracking-[1px] text-[#4A453F] transition-colors hover:border-text-secondary sm:w-auto md:text-[13px] md:text-[#6B6560]"
        >
          VIEW MORE WORK
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function CaseStudyFooter() {
  return (
    <footer className="flex w-full flex-col items-center justify-between gap-4 bg-text-primary px-5 py-8 md:flex-row md:px-10 lg:px-[120px]">
      <span className="font-body text-sm font-bold tracking-[2px] text-[#F5F1EB]">
        AAKAR LABS
      </span>
      <span className="text-[13px] text-[#9A948E]">
        Design studio. Industry-standard deliverables.
      </span>
    </footer>
  );
}

/* ============================================================
   PHONE MOCKUPS
   ============================================================ */

function DashboardPhone() {
  return (
    <div className="flex h-[600px] w-[280px] flex-col overflow-hidden rounded-3xl border border-[#E8E4F0] bg-white shadow-[0_16px_48px_-8px_#8B5CF620] md:h-[736px] md:w-[340px]">
      <div className="flex flex-1 flex-col gap-5 overflow-hidden p-5">
        {/* Header */}
        <div className="flex items-center justify-between pt-8">
          <div>
            <p className="text-[11px] text-[#9A948E]">Hey, Name 👋</p>
            <h3 className="font-display text-lg font-bold text-[#1A1816]">
              Your Dashboard
            </h3>
          </div>
          <Bell size={18} className="text-[#9A948E]" />
        </div>

        {/* Risk card */}
        <div className="flex items-center justify-between rounded-3xl bg-[#8B5CF6] p-5 text-white">
          <div className="flex flex-col gap-2">
            <span className="self-start rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-medium">
              Overall Risk
            </span>
            <p className="text-3xl font-bold">Medium</p>
            <p className="text-[10px] opacity-70">
              5 posts flagged &middot; Last scan: Jan 24
            </p>
          </div>
          <ShieldCheck size={32} className="shrink-0 opacity-60" />
        </div>

        {/* Stats row */}
        <div className="flex gap-3">
          <div className="flex flex-1 flex-col rounded-2xl bg-[#F4F4F5] p-3.5">
            <span className="text-2xl font-bold text-[#1A1816]">3</span>
            <span className="text-[10px] text-[#6B6560]">High Risk</span>
          </div>
          <div className="flex flex-1 flex-col rounded-2xl bg-[#F4F4F5] p-3.5">
            <span className="text-2xl font-bold text-[#1A1816]">432</span>
            <span className="text-[10px] text-[#6B6560]">
              Posts Scanned
            </span>
          </div>
        </div>

        {/* Platform breakdown */}
        <div className="flex flex-col gap-3 rounded-3xl bg-[#F4F4F5] p-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-bold text-[#1A1816]">
              Platform Breakdown
            </span>
            <span className="text-[10px] font-medium text-[#8B5CF6]">
              See all
            </span>
          </div>
          {[
            { name: "Instagram", count: "4 flagged", color: "#E11D48" },
            { name: "Twitter / X", count: "1 flagged", color: "#F59E0B" },
            { name: "TikTok", count: "1 flagged", color: "#F59E0B" },
          ].map((p) => (
            <div key={p.name} className="flex items-center justify-between">
              <span className="text-xs text-[#6B6560]">{p.name}</span>
              <span
                className="text-[10px] font-medium"
                style={{ color: p.color }}
              >
                {p.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center justify-center gap-2 px-5 pb-7 pt-3">
        <div className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#8B5CF6] px-4 py-2.5">
          <Home size={14} className="text-white" />
          <span className="text-[11px] font-medium text-white">Home</span>
        </div>
        <div className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#F4F4F5] px-4 py-2.5">
          <Search size={14} className="text-[#6B6560]" />
          <span className="text-[11px] font-medium text-[#6B6560]">
            Audit
          </span>
        </div>
      </div>
    </div>
  );
}

function AuditPhone() {
  const posts = [
    { text: "Party photo with alcohol", risk: "high" as const },
    { text: "Controversial political take", risk: "high" as const },
    { text: "Inappropriate meme share", risk: "high" as const },
    { text: "Questionable group photo", risk: "medium" as const },
    { text: "Old edgy tweet liked", risk: "low" as const },
  ];

  const riskColors = {
    high: { bg: "bg-[#FEF2F2]", dot: "bg-[#E11D48]" },
    medium: { bg: "bg-[#FFFBEB]", dot: "bg-[#F59E0B]" },
    low: { bg: "bg-[#F0FDF4]", dot: "bg-[#10B981]" },
  };

  return (
    <div className="flex h-[600px] w-[280px] flex-col overflow-hidden rounded-3xl border border-[#E8E4F0] bg-white shadow-[0_16px_48px_-8px_#8B5CF620] md:h-[736px] md:w-[340px]">
      <div className="flex flex-1 flex-col gap-5 overflow-hidden px-5 pt-8">
        {/* Header */}
        <div className="flex items-center justify-between pt-5">
          <h3 className="font-display text-2xl font-bold text-[#1A1816]">
            Audit
          </h3>
          <Settings size={18} className="text-[#9A948E]" />
        </div>

        {/* Stat badges */}
        <div className="flex gap-2.5">
          <div className="flex flex-1 flex-col items-center rounded-2xl bg-[#FEE2E2] py-3">
            <span className="text-2xl font-bold text-[#E11D48]">3</span>
            <span className="text-[10px] text-[#E11D48]">High</span>
          </div>
          <div className="flex flex-1 flex-col items-center rounded-2xl bg-[#FEF3C7] py-3">
            <span className="text-2xl font-bold text-[#F59E0B]">1</span>
            <span className="text-[10px] text-[#F59E0B]">Medium</span>
          </div>
          <div className="flex flex-1 flex-col items-center rounded-2xl bg-[#D1FAE5] py-3">
            <span className="text-2xl font-bold text-[#10B981]">1</span>
            <span className="text-[10px] text-[#10B981]">Low</span>
          </div>
        </div>

        {/* Title + filter */}
        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-bold text-[#1A1816]">
            5 Flagged Posts
          </span>
          <Filter size={14} className="text-[#9A948E]" />
        </div>

        {/* Filter chips */}
        <div className="flex gap-1.5">
          {["All", "High", "Medium", "Low"].map((chip, i) => (
            <span
              key={chip}
              className={`rounded-full px-3 py-1 text-[10px] font-medium ${i === 0 ? "bg-[#8B5CF6] text-white" : "bg-[#F4F4F5] text-[#6B6560]"}`}
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Post list */}
        <div className="flex flex-col gap-2">
          {posts.map((post) => (
            <div
              key={post.text}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 ${riskColors[post.risk].bg}`}
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${riskColors[post.risk].dot}`}
              />
              <span className="text-xs text-[#1A1816]">{post.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto pb-2">
          <div className="w-full rounded-2xl bg-[#8B5CF6] py-3.5 text-center text-sm font-semibold text-white">
            View Audit Report
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center justify-center gap-2 px-5 pb-7 pt-3">
        <div className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#F4F4F5] px-4 py-2.5">
          <Home size={14} className="text-[#6B6560]" />
          <span className="text-[11px] font-medium text-[#6B6560]">
            Home
          </span>
        </div>
        <div className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#8B5CF6] px-4 py-2.5">
          <Search size={14} className="text-white" />
          <span className="text-[11px] font-medium text-white">Audit</span>
        </div>
      </div>
    </div>
  );
}
