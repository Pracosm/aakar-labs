"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  CURRENCIES,
  convertFromINR,
  currencyFromCountry,
  currencyFromLocale,
  formatMoney,
  getCurrency,
  type CurrencyCode,
} from "@/lib/currency";
import {
  BUNDLE_DISCOUNT,
  TIMELINE_OPTIONS,
  TRACKS,
  computeEstimate,
  findModule,
} from "@/lib/pricing";

type Step = 1 | 2 | 3;

const STORAGE_KEY = "aakar-start-project-v1";

const STEPS: { id: Step; code: string; label: string }[] = [
  { id: 1, code: "01", label: "Scope" },
  { id: 2, code: "02", label: "Timeline" },
  { id: 3, code: "03", label: "Estimate" },
];

const inputClass =
  "border-b border-[rgba(236,238,245,0.18)] bg-transparent py-2.5 font-body text-[15px] text-[color:var(--rim-white)] outline-none transition-colors placeholder:text-[rgba(236,238,245,0.55)] focus:border-[color:var(--coral)]";

const labelClass =
  "font-mono text-[11px] font-medium tracking-[1.5px] text-[rgba(236,238,245,0.72)]";

async function detectCurrencyFromIp(): Promise<CurrencyCode | null> {
  try {
    const res = await fetch("/api/geo", { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as { currency: CurrencyCode | null };
      if (data.currency) return data.currency;
    }
  } catch {
    // fall through to a browser-side IP lookup (covers local dev)
  }

  try {
    const res = await fetch("https://api.country.is/", {
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { country?: string };
    return currencyFromCountry(data.country ?? null);
  } catch {
    return null;
  }
}

export default function StartProjectPage() {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [details, setDetails] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [timeline, setTimeline] = useState("standard");
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>("INR");
  const [currencyTouched, setCurrencyTouched] = useState(false);
  const [company, setCompany] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const currencyTouchedRef = useRef(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as {
          step?: Step;
          name?: string;
          email?: string;
          projectName?: string;
          details?: string;
          selected?: string[];
          timeline?: string;
          currencyCode?: CurrencyCode;
          currencyTouched?: boolean;
        };
        if (saved.step === 1 || saved.step === 2 || saved.step === 3) setStep(saved.step);
        if (saved.name) setName(saved.name);
        if (saved.email) setEmail(saved.email);
        if (saved.projectName) setProjectName(saved.projectName);
        if (saved.details) setDetails(saved.details);
        if (Array.isArray(saved.selected)) setSelected(new Set(saved.selected));
        if (saved.timeline) setTimeline(saved.timeline);
        if (saved.currencyTouched && saved.currencyCode) {
          setCurrencyCode(saved.currencyCode);
          setCurrencyTouched(true);
          currencyTouchedRef.current = true;
        }
      }
    } catch {
      // ignore bad session data
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        step,
        name,
        email,
        projectName,
        details,
        selected: Array.from(selected),
        timeline,
        currencyCode,
        currencyTouched,
      }),
    );
  }, [
    hydrated,
    step,
    name,
    email,
    projectName,
    details,
    selected,
    timeline,
    currencyCode,
    currencyTouched,
  ]);

  useEffect(() => {
    if (!hydrated || currencyTouchedRef.current) return;

    let cancelled = false;
    (async () => {
      const detected = await detectCurrencyFromIp();
      if (cancelled || currencyTouchedRef.current) return;
      setCurrencyCode(detected ?? currencyFromLocale());
    })();

    return () => {
      cancelled = true;
    };
  }, [hydrated]);

  const currency = getCurrency(currencyCode);
  const selectedIds = useMemo(() => Array.from(selected), [selected]);
  const estimate = useMemo(
    () => computeEstimate(selectedIds, timeline),
    [selectedIds, timeline],
  );
  const timelineLabel =
    TIMELINE_OPTIONS.find((t) => t.id === timeline)?.label ?? timeline;

  function toggle(id: string) {
    setError("");
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        return next;
      }
      const picked = findModule(id);
      if (picked) {
        const sameTrack = TRACKS.find((t) => t.id === picked.trackId);
        sameTrack?.modules.forEach((m) => {
          if (m.id !== id) next.delete(m.id);
        });
      }
      next.add(id);
      return next;
    });
  }

  function goNext() {
    if (step === 1 && selected.size === 0) {
      setError("Pick at least one module so we know what you need.");
      return;
    }
    setError("");
    if (step < 3) setStep((step + 1) as Step);
  }

  function goBack() {
    setError("");
    if (step > 1) setStep((step - 1) as Step);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selected.size === 0) {
      setError("Pick at least one module so we know what you need.");
      setStep(1);
      return;
    }
    setSending(true);
    setError("");

    const tracksUsed = [
      estimate.brandCount && "Brand",
      estimate.productCount && "Product",
      estimate.devCount && "Development",
    ]
      .filter(Boolean)
      .join(" + ");

    const selectedNames = selectedIds
      .map((id) => findModule(id)?.name)
      .filter(Boolean)
      .join(", ");

    const displayMin = convertFromINR(estimate.min, currency);
    const displayMax = convertFromINR(estimate.max, currency);
    const budgetStr = `${formatMoney(displayMin, currency)} – ${formatMoney(displayMax, currency)} ${currency.code}${estimate.bundle ? " (bundle)" : ""}`;

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
      sessionStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: -1, background: "rgba(5,5,9,0.72)" }}
      />

      <Navbar />

      <main
        id="main"
        className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col px-5 py-10 pb-28 md:px-10 md:py-20"
      >
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

            <ol className="mb-8 flex items-center gap-2 sm:gap-4" aria-label="Progress">
              {STEPS.map((s, i) => {
                const active = step === s.id;
                const done = step > s.id;
                return (
                  <li key={s.id} className="flex items-center gap-2 sm:gap-4">
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="h-px w-6 bg-[rgba(236,238,245,0.16)] sm:w-10"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (s.id < step) {
                          setError("");
                          setStep(s.id);
                        }
                      }}
                      disabled={s.id > step}
                      className={`flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors ${
                        active
                          ? "text-[color:var(--laptop-glow)]"
                          : done
                            ? "text-text-primary"
                            : "text-[rgba(236,238,245,0.4)]"
                      }`}
                      aria-current={active ? "step" : undefined}
                    >
                      <span>{s.code}</span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <h1 className="section-heading mb-5 md:text-[clamp(2.25rem,5vw,3.75rem)]">
              {step === 1 && (
                <>
                  What do you need?
                  <br />
                  <span style={{ color: "var(--laptop-glow)" }}>Pick your modules.</span>
                </>
              )}
              {step === 2 && (
                <>
                  When do you need it?
                  <br />
                  <span style={{ color: "var(--laptop-glow)" }}>Choose a pace.</span>
                </>
              )}
              {step === 3 && (
                <>
                  Here&apos;s your range.
                  <br />
                  <span style={{ color: "var(--laptop-glow)" }}>Send the brief.</span>
                </>
              )}
            </h1>
            <p className="body-copy mb-10 max-w-[560px] md:mb-12">
              {step === 1 &&
                "Brand identity, UX/UI, and development. One option per track. You can combine tracks."}
              {step === 2 &&
                "Rush adds 20%. A looser timeline takes 5% off. You can change this after you see the estimate."}
              {step === 3 &&
                "Indicative range from your scope. Final pricing depends on screen count, feedback rounds and complexity."}
            </p>

            <form id="scope-form" onSubmit={handleSubmit} className="flex flex-col gap-10">
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

              {step === 1 && (
                <div className="flex flex-col gap-12">
                  {TRACKS.map((track) => (
                    <section
                      key={track.id}
                      className="flex flex-col gap-5"
                      aria-labelledby={`track-${track.id}`}
                    >
                      <div className="flex flex-col gap-1.5">
                        <SectionLabel
                          code={track.code}
                          label={track.label.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}
                        />
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
                              className={`group flex min-h-[7.5rem] flex-col gap-2 rounded-xl border p-5 text-left transition-all backdrop-blur-md md:min-h-0 md:p-4 ${
                                isSelected
                                  ? "border-[color:var(--coral)] bg-[rgba(212,117,106,0.08)] shadow-[0_0_0_1px_var(--coral)]"
                                  : "border-[rgba(236,238,245,0.08)] bg-[rgba(26,29,46,0.4)] hover:border-[rgba(236,238,245,0.25)]"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <span className="font-display text-[15px] font-semibold leading-[1.3] text-text-primary">
                                  {m.name}
                                </span>
                                <span
                                  className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border transition-colors ${
                                    isSelected
                                      ? "border-[color:var(--coral)] bg-[color:var(--coral)] text-black"
                                      : "border-[rgba(236,238,245,0.3)] bg-transparent"
                                  }`}
                                  aria-hidden="true"
                                >
                                  {isSelected && (
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
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
                </div>
              )}

              {step === 2 && (
                <section className="flex flex-col gap-4">
                  <SectionLabel code="TRK-04" label="TIMELINE" />
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {TIMELINE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setError("");
                          setTimeline(opt.id);
                        }}
                        className={`min-h-12 rounded-full border px-5 py-3 text-left font-mono text-[13px] font-medium tracking-[0.5px] transition-colors ${
                          timeline === opt.id
                            ? "border-[color:var(--laptop-glow)] bg-[color:var(--laptop-glow)] text-black"
                            : "border-[rgba(236,238,245,0.18)] bg-transparent text-[rgba(236,238,245,0.7)] hover:border-[rgba(236,238,245,0.4)]"
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
              )}

              {step === 3 && (
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
                  <section className="flex flex-col gap-6">
                    <SectionLabel code="TRK-05" label="ABOUT_YOU" />

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className={labelClass}>
                          YOUR NAME
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Doe"
                          className={inputClass}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className={labelClass}>
                          EMAIL
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@company.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="projectName" className={labelClass}>
                        PROJECT NAME
                      </label>
                      <input
                        id="projectName"
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Project Yodhai"
                        className={inputClass}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="details" className={labelClass}>
                        TELL US ABOUT YOUR PROJECT
                      </label>
                      <textarea
                        id="details"
                        rows={4}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="A brief overview of what you're building and what you need help with..."
                        className={`resize-none ${inputClass} leading-[1.6]`}
                      />
                    </div>
                  </section>

                  <aside className="lg:sticky lg:top-24 lg:self-start">
                    <div className="flex flex-col gap-5 rounded-2xl p-6 glass-panel">
                      <div className="flex items-center justify-between gap-3">
                        <span className={labelClass}>ESTIMATE</span>
                        {estimate.bundle && (
                          <span className="font-mono text-[10px] font-medium tracking-[1.2px] text-accent">
                            BUNDLE −
                            {formatMoney(convertFromINR(BUNDLE_DISCOUNT, currency), currency)}
                          </span>
                        )}
                      </div>

                      <label className="flex flex-col gap-1.5">
                        <span className="font-mono text-[10px] font-medium tracking-[1.2px] text-[rgba(236,238,245,0.72)]">
                          BILLING REGION
                        </span>
                        <select
                          value={currency.code}
                          onChange={(e) => {
                            currencyTouchedRef.current = true;
                            setCurrencyTouched(true);
                            setCurrencyCode(e.target.value as CurrencyCode);
                          }}
                          className="appearance-none rounded-md border border-[rgba(236,238,245,0.12)] bg-[rgba(5,5,9,0.6)] px-3 py-2 pr-8 font-mono text-[12px] tracking-[0.5px] text-[color:var(--rim-white)] outline-none transition-colors hover:border-[rgba(236,238,245,0.3)] focus:border-[color:var(--coral)]"
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

                      <div className="flex flex-col gap-2 font-mono text-[11px] tracking-[0.5px] text-text-secondary">
                        <div className="flex justify-between">
                          <span>Brand modules</span>
                          <span className="text-text-primary">{estimate.brandCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Product modules</span>
                          <span className="text-text-primary">{estimate.productCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dev modules</span>
                          <span className="text-text-primary">{estimate.devCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Timeline</span>
                          <span className="text-text-primary">
                            {timelineLabel.split(" · ")[0]}
                          </span>
                        </div>
                      </div>

                      <div className="h-px w-full bg-border-subtle" />

                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[10px] font-medium tracking-[1.2px] text-[rgba(236,238,245,0.72)]">
                          FROM · {currency.code}
                        </span>
                        <span className="font-display text-[26px] font-bold leading-tight tracking-[-1px] text-text-primary">
                          {formatMoney(convertFromINR(estimate.min, currency), currency)}
                          <span className="text-[rgba(236,238,245,0.72)]"> – </span>
                          {formatMoney(convertFromINR(estimate.max, currency), currency)}
                        </span>
                      </div>

                      <p className="text-[11px] leading-[1.55] text-[rgba(236,238,245,0.72)]">
                        Go back to change scope or timeline — the range updates with you.
                      </p>
                    </div>
                  </aside>
                </div>
              )}

              {error && (
                <p className="font-mono text-[12px] text-[#ff8a7e]" role="alert">
                  {error}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="min-h-11 font-mono text-[13px] font-medium tracking-[1.5px] text-[rgba(236,238,245,0.72)] transition-colors hover:text-text-primary"
                  >
                    BACK
                  </button>
                ) : (
                  <Link
                    href="/"
                    className="min-h-11 inline-flex items-center font-mono text-[13px] font-medium tracking-[1.5px] text-[rgba(236,238,245,0.72)] transition-colors hover:text-text-primary"
                  >
                    BACK TO HOME
                  </Link>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="btn-cta btn-cta-primary sm:w-auto"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-cta btn-cta-primary sm:w-auto disabled:opacity-60"
                  >
                    {sending ? "Sending..." : "Send brief"}
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
