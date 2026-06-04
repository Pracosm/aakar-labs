"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SectionLabel from "@/components/ui/SectionLabel";

// ─── Pricing model ─────────────────────────────────────────────────────────
// Anchored to the Yodhai proposal: Brand ₹70K–1L, UI/UX ₹80K–1L,
// Brand+UI/UX bundle ₹1.8L–2.5L. Dev is "available on request".
// Each module carries a [min, max] range in INR. The form sums what the user
// picks, applies a bundle discount when both tracks are meaningfully selected,
// and a rush multiplier for tight timelines.

type Module = {
  id: string;
  name: string;
  desc: string;
  min: number;
  max: number;
};

type Track = {
  id: "brand" | "product" | "dev";
  label: string;
  code: string;
  blurb: string;
  modules: Module[];
};

const TRACKS: Track[] = [
  {
    id: "brand",
    label: "Brand Identity",
    code: "TRK-01",
    blurb: "Visual system, positioning, and the assets to apply it.",
    modules: [
      {
        id: "brand_audit",
        name: "Brand audit & positioning",
        desc: "Audit of current assets, tone, and visual territory.",
        min: 10000,
        max: 15000,
      },
      {
        id: "logo",
        name: "Logo design / refinement",
        desc: "Two to three directions, refinement to a final mark.",
        min: 20000,
        max: 30000,
      },
      {
        id: "color_type",
        name: "Color & typography system",
        desc: "Palette, type pairing, scale, usage rules.",
        min: 10000,
        max: 15000,
      },
      {
        id: "icons",
        name: "Iconography & graphic language",
        desc: "Icon style, base set, supporting graphic motifs.",
        min: 15000,
        max: 20000,
      },
      {
        id: "illustration",
        name: "Illustration system",
        desc: "Abstract illustration / lattice motifs over literal imagery.",
        min: 10000,
        max: 15000,
      },
      {
        id: "guidelines",
        name: "Brand guidelines document",
        desc: "PDF guidelines + production-ready asset exports.",
        min: 5000,
        max: 10000,
      },
    ],
  },
  {
    id: "product",
    label: "Product Design (UI/UX)",
    code: "TRK-02",
    blurb: "From journey maps to a clickable prototype and dev handoff.",
    modules: [
      {
        id: "ux_audit",
        name: "UX audit & journey maps",
        desc: "Audit of current flows, revised journeys for key personas.",
        min: 10000,
        max: 15000,
      },
      {
        id: "ia",
        name: "Information architecture & wireframes",
        desc: "Sitemap, IA, low-fi wireframes for key flows.",
        min: 15000,
        max: 20000,
      },
      {
        id: "ui_small",
        name: "Hi-fi UI — small (1–5 screens)",
        desc: "Polished UI on top of wireframes for a focused surface.",
        min: 20000,
        max: 25000,
      },
      {
        id: "ui_medium",
        name: "Hi-fi UI — medium (6–15 screens)",
        desc: "Landing, console, dashboard, and key product flows.",
        min: 35000,
        max: 45000,
      },
      {
        id: "ui_large",
        name: "Hi-fi UI — large (16+ screens)",
        desc: "Full product surface with responsive states.",
        min: 50000,
        max: 60000,
      },
      {
        id: "prototype",
        name: "Interactive prototype",
        desc: "Clickable prototype for internal review and usability.",
        min: 10000,
        max: 15000,
      },
      {
        id: "design_system",
        name: "Design system & dev handoff",
        desc: "Reusable component library, tokens, handoff docs.",
        min: 15000,
        max: 20000,
      },
    ],
  },
  {
    id: "dev",
    label: "Development",
    code: "TRK-03",
    blurb: "Engineer the design into a production-ready product.",
    modules: [
      {
        id: "dev_frontend",
        name: "Frontend build (Next.js / React)",
        desc: "Component library translated 1:1 from the design system.",
        min: 60000,
        max: 90000,
      },
      {
        id: "dev_backend",
        name: "Backend & API wiring",
        desc: "API integration, data models, server-side logic.",
        min: 40000,
        max: 60000,
      },
      {
        id: "dev_auth",
        name: "Authentication & accounts",
        desc: "Sign-in, sessions, role-based access.",
        min: 15000,
        max: 25000,
      },
      {
        id: "dev_deploy",
        name: "Deployment, perf & a11y",
        desc: "Production deploy, perf budgets, accessibility checks.",
        min: 10000,
        max: 15000,
      },
    ],
  },
];

const TIMELINE_OPTIONS = [
  { id: "standard", label: "Standard · 4–6 weeks", multiplier: 1 },
  { id: "rush", label: "Rush · 2–3 weeks", multiplier: 1.2 },
  { id: "flexible", label: "Flexible · 6+ weeks", multiplier: 0.95 },
];

// Bundle: meaningful Brand (≥3 modules) + meaningful Product (≥3 modules)
// triggers the package discount the proposal hints at.
const BUNDLE_THRESHOLD = 3;
const BUNDLE_DISCOUNT = 15000;

const ALL_MODULES = TRACKS.flatMap((t) =>
  t.modules.map((m) => ({ ...m, trackId: t.id })),
);

function findModule(id: string) {
  return ALL_MODULES.find((m) => m.id === id);
}

// ─── Currencies & regional pricing ─────────────────────────────────────────
// INR is the base. Every other region pays the equivalent + 25% premium.
// `rate` is "1 of that currency, in INR" (e.g. 1 USD ≈ 83 INR).
// `round` snaps converted values to clean increments for psychological pricing.

type Currency = {
  code: "INR" | "USD" | "EUR" | "GBP" | "AED";
  symbol: string;
  region: string;
  flag: string;
  rate: number;
  markup: number;
  round: number;
  locale: string;
};

const CURRENCIES: Currency[] = [
  { code: "INR", symbol: "₹", region: "India",          flag: "🇮🇳", rate: 1,     markup: 1,    round: 500,  locale: "en-IN" },
  { code: "USD", symbol: "$", region: "United States",  flag: "🇺🇸", rate: 83,    markup: 1.25, round: 25,   locale: "en-US" },
  { code: "EUR", symbol: "€", region: "Europe",         flag: "🇪🇺", rate: 90,    markup: 1.25, round: 25,   locale: "en-IE" },
  { code: "GBP", symbol: "£", region: "United Kingdom", flag: "🇬🇧", rate: 105,   markup: 1.25, round: 25,   locale: "en-GB" },
  { code: "AED", symbol: "AED", region: "UAE",          flag: "🇦🇪", rate: 22.6,  markup: 1.25, round: 100,  locale: "en-AE" },
];

const REGION_TO_CURRENCY: Record<string, Currency["code"]> = {
  IN: "INR",
  US: "USD", CA: "USD", AU: "USD", NZ: "USD", SG: "USD", HK: "USD",
  GB: "GBP",
  AE: "AED", SA: "AED", QA: "AED", KW: "AED", OM: "AED", BH: "AED",
  // Eurozone
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR", BE: "EUR",
  AT: "EUR", PT: "EUR", IE: "EUR", FI: "EUR", GR: "EUR", LU: "EUR",
};

function detectCurrency(): Currency["code"] {
  if (typeof navigator === "undefined") return "USD";
  try {
    const locale = navigator.language || "en-US";
    const region = new Intl.Locale(locale).region;
    if (region && REGION_TO_CURRENCY[region]) return REGION_TO_CURRENCY[region];
  } catch {
    // ignore
  }
  return "USD"; // default for international visitors
}

function convertFromINR(inrValue: number, currency: Currency): number {
  if (currency.code === "INR") return inrValue;
  const converted = (inrValue / currency.rate) * currency.markup;
  return Math.round(converted / currency.round) * currency.round;
}

function formatMoney(value: number, currency: Currency): string {
  const formatted = new Intl.NumberFormat(currency.locale, {
    maximumFractionDigits: 0,
  }).format(value);
  // AED reads better with the code after the number; symbol currencies stay prefixed.
  if (currency.code === "AED") return `${formatted} ${currency.symbol}`;
  return `${currency.symbol}${formatted}`;
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function StartProjectPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [details, setDetails] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [timeline, setTimeline] = useState("standard");
  const [currencyCode, setCurrencyCode] = useState<Currency["code"]>("INR");
  // Snapshot taken at the moment "Calculate" is hit. Live selection is wiped,
  // so users can't diff pricing by toggling one module at a time.
  const [revealedEstimate, setRevealedEstimate] = useState<{
    selectedIds: string[];
    min: number;
    max: number;
    bundle: boolean;
    brandCount: number;
    productCount: number;
    devCount: number;
    timelineLabel: string;
  } | null>(null);
  const [company, setCompany] = useState(""); // honeypot

  // Auto-detect on mount. SSR renders INR; we only switch client-side to
  // avoid hydration mismatches.
  useEffect(() => {
    setCurrencyCode(detectCurrency());
  }, []);

  const currency =
    CURRENCIES.find((c) => c.code === currencyCode) ?? CURRENCIES[0];

  // ─── Live estimate ───────────────────────────────────────────────────────
  const estimate = useMemo(() => {
    const ids = Array.from(selected);
    let min = 0;
    let max = 0;
    const brandSelected: Module[] = [];
    const productSelected: Module[] = [];
    const devSelected: Module[] = [];

    ids.forEach((id) => {
      const m = findModule(id);
      if (!m) return;
      min += m.min;
      max += m.max;
      if (m.trackId === "brand") brandSelected.push(m);
      else if (m.trackId === "product") productSelected.push(m);
      else devSelected.push(m);
    });

    const bundle =
      brandSelected.length >= BUNDLE_THRESHOLD &&
      productSelected.length >= BUNDLE_THRESHOLD;
    if (bundle) {
      min = Math.max(0, min - BUNDLE_DISCOUNT);
      max = Math.max(0, max - BUNDLE_DISCOUNT);
    }

    const mult =
      TIMELINE_OPTIONS.find((t) => t.id === timeline)?.multiplier ?? 1;
    min = Math.round(min * mult);
    max = Math.round(max * mult);

    const displayMin = convertFromINR(min, currency);
    const displayMax = convertFromINR(max, currency);

    return {
      min,
      max,
      displayMin,
      displayMax,
      bundle,
      brandCount: brandSelected.length,
      productCount: productSelected.length,
      devCount: devSelected.length,
      moduleCount: ids.length,
    };
  }, [selected, timeline, currency]);

  function toggle(id: string) {
    setRevealedEstimate(null);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // UI tiers are mutually exclusive — pick one screen tier at a time.
        const uiTiers = ["ui_small", "ui_medium", "ui_large"];
        if (uiTiers.includes(id)) {
          uiTiers.filter((t) => t !== id).forEach((t) => next.delete(t));
        }
      }
      return next;
    });
  }

  function handleTimelineChange(id: string) {
    setRevealedEstimate(null);
    setTimeline(id);
  }

  function handleCalculate() {
    setError("");
    if (estimate.moduleCount === 0) {
      setError("Pick at least one module so we know what you need.");
      return;
    }
    const timelineLabel =
      TIMELINE_OPTIONS.find((t) => t.id === timeline)?.label.split(" · ")[0] ??
      "Standard";
    setRevealedEstimate({
      selectedIds: Array.from(selected),
      min: estimate.min,
      max: estimate.max,
      bundle: estimate.bundle,
      brandCount: estimate.brandCount,
      productCount: estimate.productCount,
      devCount: estimate.devCount,
      timelineLabel,
    });
    setSelected(new Set()); // wipe so users can't diff pricing
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!revealedEstimate) {
      setError("Calculate your estimate before sending.");
      return;
    }
    setSending(true);
    setError("");

    const tracksUsed = [
      revealedEstimate.brandCount && "Brand",
      revealedEstimate.productCount && "Product",
      revealedEstimate.devCount && "Development",
    ]
      .filter(Boolean)
      .join(" + ");

    const selectedNames = revealedEstimate.selectedIds
      .map((id) => findModule(id)?.name)
      .filter(Boolean)
      .join(", ");

    const timelineLabel =
      TIMELINE_OPTIONS.find((t) => t.id === timeline)?.label ?? timeline;

    const displayMin = convertFromINR(revealedEstimate.min, currency);
    const displayMax = convertFromINR(revealedEstimate.max, currency);
    const budgetStr = `${formatMoney(displayMin, currency)} – ${formatMoney(displayMax, currency)} ${currency.code}${revealedEstimate.bundle ? " (bundle)" : ""}`;

    const detailsPayload = [
      projectName && `Project: ${projectName}`,
      `Selected modules: ${selectedNames}`,
      details && `Notes: ${details}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          service: tracksUsed,
          budget: budgetStr,
          timeline: timelineLabel,
          details: detailsPayload,
          company,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen w-full flex-col bg-bg-page">
      <Navbar />

      <main className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col px-5 py-16 md:px-10 md:py-20">
        {submitted ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
            <span className="font-mono text-[11px] font-medium tracking-[2px] text-accent">
              RECEIVED
            </span>
            <h1 className="font-display text-3xl font-bold leading-[1.15] tracking-[-1.5px] text-text-primary md:text-4xl">
              We&apos;ll be in touch
              <br />
              within 24 hours.
            </h1>
            <p className="max-w-[420px] text-sm leading-[1.7] text-text-secondary">
              Thanks for reaching out. We&apos;ve received your scope and
              estimate — we&apos;ll come back with a tailored proposal.
            </p>
            <Link
              href="/"
              className="mt-4 font-mono text-[13px] font-semibold tracking-[1px] text-accent transition-colors hover:text-accent-hover"
            >
              BACK TO HOME
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <SectionLabel code="AKR-007" label="START_PROJECT" />
            </div>

            <h1 className="mb-4 font-display text-3xl font-bold leading-[1.15] tracking-[-1.5px] text-text-primary md:text-5xl">
              Build your scope.
              <br />
              We&apos;ll show your estimate.
            </h1>
            <p className="mb-12 max-w-[560px] text-[15px] leading-[1.7] text-text-secondary">
              Pick the modules you need. Your indicative range updates on the
              right — final pricing depends on screen count, feedback rounds
              and complexity.
            </p>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]"
            >
              <div className="flex flex-col gap-12">
                {/* Honeypot */}
                <div
                  className="absolute -left-[9999px] opacity-0"
                  aria-hidden="true"
                >
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                {/* Tracks */}
                {TRACKS.map((track) => (
                  <section
                    key={track.id}
                    className="flex flex-col gap-5"
                    aria-labelledby={`track-${track.id}`}
                  >
                    <div className="flex flex-col gap-1.5">
                      <SectionLabel code={track.code} label={track.label.toUpperCase().replace(/[^A-Z0-9]+/g, "_")} />
                      <h2
                        id={`track-${track.id}`}
                        className="mt-2 font-display text-2xl font-bold tracking-[-0.5px] text-text-primary"
                      >
                        {track.label}
                      </h2>
                      <p className="text-[14px] leading-[1.6] text-text-secondary">
                        {track.blurb}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {track.modules.map((m) => {
                        const isSelected = selected.has(m.id);
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => toggle(m.id)}
                            aria-pressed={isSelected}
                            className={`group flex flex-col gap-2 rounded-lg border p-4 text-left transition-all ${
                              isSelected
                                ? "border-accent bg-accent/5 shadow-[0_0_0_1px_var(--accent)]"
                                : "border-border bg-bg-panel hover:border-text-tertiary"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="font-display text-[15px] font-semibold leading-[1.3] text-text-primary">
                                {m.name}
                              </span>
                              <span
                                className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border transition-colors ${
                                  isSelected
                                    ? "border-accent bg-accent text-bg-page"
                                    : "border-border bg-transparent"
                                }`}
                                aria-hidden="true"
                              >
                                {isSelected && (
                                  <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                  >
                                    <path
                                      d="M1.5 5.2L4 7.5L8.5 2.5"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </span>
                            </div>
                            <span className="text-[13px] leading-[1.55] text-text-secondary">
                              {m.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                ))}

                {/* Timeline */}
                <section className="flex flex-col gap-4">
                  <SectionLabel code="TRK-04" label="TIMELINE" />
                  <div className="flex flex-wrap gap-2">
                    {TIMELINE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleTimelineChange(opt.id)}
                        className={`rounded-full border px-4 py-2 font-mono text-[12px] font-medium tracking-[0.5px] transition-colors ${
                          timeline === opt.id
                            ? "border-accent bg-accent text-bg-page"
                            : "border-border bg-transparent text-text-secondary hover:border-text-secondary"
                        }`}
                      >
                        {opt.label}
                        {opt.multiplier !== 1 && (
                          <span className="ml-1.5 opacity-70">
                            {opt.multiplier > 1
                              ? `+${Math.round((opt.multiplier - 1) * 100)}%`
                              : `−${Math.round((1 - opt.multiplier) * 100)}%`}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Contact details */}
                <section className="flex flex-col gap-6 border-t border-border pt-10">
                  <SectionLabel code="TRK-05" label="ABOUT_YOU" />

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="name"
                        className="font-mono text-[11px] font-medium tracking-[1.5px] text-text-tertiary"
                      >
                        YOUR NAME
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="border-b border-border bg-transparent py-2.5 font-body text-[15px] text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="email"
                        className="font-mono text-[11px] font-medium tracking-[1.5px] text-text-tertiary"
                      >
                        EMAIL
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@company.com"
                        className="border-b border-border bg-transparent py-2.5 font-body text-[15px] text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="projectName"
                      className="font-mono text-[11px] font-medium tracking-[1.5px] text-text-tertiary"
                    >
                      PROJECT NAME
                    </label>
                    <input
                      id="projectName"
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Project Yodhai"
                      className="border-b border-border bg-transparent py-2.5 font-body text-[15px] text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="details"
                      className="font-mono text-[11px] font-medium tracking-[1.5px] text-text-tertiary"
                    >
                      TELL US ABOUT YOUR PROJECT
                    </label>
                    <textarea
                      id="details"
                      rows={4}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="A brief overview of what you're building and what you need help with..."
                      className="resize-none border-b border-border bg-transparent py-2.5 font-body text-[15px] leading-[1.6] text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
                    />
                  </div>
                </section>
              </div>

              {/* ─── RIGHT: sticky estimate ───────────────────────────── */}
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="flex flex-col gap-5 rounded-xl border border-border bg-bg-panel p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] font-medium tracking-[1.5px] text-text-tertiary">
                      ESTIMATE
                    </span>
                    {revealedEstimate?.bundle && (
                      <span className="font-mono text-[10px] font-medium tracking-[1.2px] text-accent">
                        BUNDLE −{formatMoney(convertFromINR(BUNDLE_DISCOUNT, currency), currency)}
                      </span>
                    )}
                  </div>

                  {/* Currency dropdown */}
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] font-medium tracking-[1.2px] text-text-tertiary">
                      BILLING REGION
                    </span>
                    <select
                      value={currency.code}
                      onChange={(e) =>
                        setCurrencyCode(e.target.value as Currency["code"])
                      }
                      className="appearance-none rounded-md border border-border bg-bg-page px-3 py-2 pr-8 font-mono text-[12px] tracking-[0.5px] text-text-primary outline-none transition-colors hover:border-text-secondary focus:border-accent"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%239A948E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                      }}
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.region} · {c.symbol} {c.code}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Scope counters — show snapshot if revealed, else live */}
                  {(() => {
                    const view = revealedEstimate ?? {
                      brandCount: estimate.brandCount,
                      productCount: estimate.productCount,
                      devCount: estimate.devCount,
                      timelineLabel:
                        TIMELINE_OPTIONS.find((t) => t.id === timeline)?.label.split(
                          " · ",
                        )[0] ?? "Standard",
                    };
                    return (
                      <div className="flex flex-col gap-2 font-mono text-[11px] tracking-[0.5px] text-text-secondary">
                        <div className="flex justify-between">
                          <span>Brand modules</span>
                          <span className="text-text-primary">{view.brandCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Product modules</span>
                          <span className="text-text-primary">{view.productCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dev modules</span>
                          <span className="text-text-primary">{view.devCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Timeline</span>
                          <span className="text-text-primary">{view.timelineLabel}</span>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="h-px w-full bg-border-subtle" />

                  {/* Price reveal — gated behind Calculate. Snapshot-based. */}
                  {revealedEstimate ? (
                    <>
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[10px] font-medium tracking-[1.2px] text-text-tertiary">
                          FROM · {currency.code}
                        </span>
                        <span className="font-display text-[26px] font-bold leading-tight tracking-[-1px] text-text-primary">
                          {formatMoney(
                            convertFromINR(revealedEstimate.min, currency),
                            currency,
                          )}
                          <span className="text-text-tertiary"> – </span>
                          {formatMoney(
                            convertFromINR(revealedEstimate.max, currency),
                            currency,
                          )}
                        </span>
                      </div>

                      <p className="text-[11px] leading-[1.55] text-text-tertiary">
                        Indicative range based on your snapshot. To rework it,
                        select your modules again from scratch.
                      </p>

                      {error && (
                        <p className="font-mono text-[12px] text-red-600">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full bg-accent py-3.5 font-mono text-[13px] font-semibold tracking-[1px] text-bg-page transition-colors hover:bg-accent-hover disabled:opacity-60"
                      >
                        {sending ? "SENDING..." : "SEND BRIEF"}
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-[12px] leading-[1.55] text-text-secondary">
                        {estimate.moduleCount === 0
                          ? "Pick the modules you need, then calculate. Selections clear after calculating."
                          : "Hit calculate to reveal your range. Heads up: your selections will clear after."}
                      </p>

                      {error && (
                        <p className="font-mono text-[12px] text-red-600">
                          {error}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={handleCalculate}
                        className="w-full border border-text-primary bg-bg-page py-3.5 font-mono text-[13px] font-semibold tracking-[1px] text-text-primary transition-colors hover:bg-text-primary hover:text-bg-page disabled:opacity-60"
                      >
                        CALCULATE ESTIMATE
                      </button>
                    </>
                  )}
                </div>
              </aside>
            </form>

            <Link
              href="/"
              className="mt-12 self-center font-mono text-[11px] font-medium tracking-[1.5px] text-text-tertiary transition-colors hover:text-text-primary"
            >
              BACK TO HOME
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
