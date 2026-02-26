"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SectionLabel from "@/components/ui/SectionLabel";

const SERVICE_OPTIONS = [
  "UI/UX Design",
  "Brand Identity",
  "Design System",
  "Full Package",
];

const BUDGET_OPTIONS = ["< $5K", "$5K–$15K", "$15K–$50K", "$50K+"];

const TIMELINE_OPTIONS = ["ASAP", "1–2 Months", "3+ Months", "Flexible"];

function PillSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="font-mono text-[11px] font-medium tracking-[1.5px] text-text-tertiary">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`rounded-full border px-4 py-2 font-mono text-[12px] font-medium tracking-[0.5px] transition-colors ${
              value === opt
                ? "border-accent bg-accent text-bg-page"
                : "border-border bg-transparent text-text-secondary hover:border-text-secondary"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function StartProjectPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [timeline, setTimeline] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, budget, details, timeline }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-bg-page">
      <Navbar />

      <main className="mx-auto flex w-full max-w-[640px] flex-1 flex-col px-5 py-16 md:px-10 md:py-20">
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
            <p className="max-w-[400px] text-sm leading-[1.7] text-text-secondary">
              Thanks for reaching out. We&apos;re excited to learn more about
              your project.
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

            <h1 className="mb-10 font-display text-3xl font-bold leading-[1.15] tracking-[-1.5px] text-text-primary md:text-4xl">
              Let&apos;s build something great.
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Name */}
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

              {/* Email */}
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

              {/* Service */}
              <PillSelect
                label="WHAT DO YOU NEED?"
                options={SERVICE_OPTIONS}
                value={service}
                onChange={setService}
              />

              {/* Budget */}
              <PillSelect
                label="BUDGET RANGE"
                options={BUDGET_OPTIONS}
                value={budget}
                onChange={setBudget}
              />

              {/* Project Details */}
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

              {/* Timeline */}
              <PillSelect
                label="TIMELINE"
                options={TIMELINE_OPTIONS}
                value={timeline}
                onChange={setTimeline}
              />

              {/* Error */}
              {error && (
                <p className="font-mono text-[12px] text-red-600">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="mt-4 w-full bg-accent py-3.5 font-mono text-[13px] font-semibold tracking-[1px] text-bg-page transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto sm:px-10"
              >
                {sending ? "SENDING..." : "SEND IT"}
              </button>
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
