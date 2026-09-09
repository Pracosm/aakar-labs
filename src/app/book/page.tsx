"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import SectionLabel from "@/components/ui/SectionLabel";
import { CAL_LINK } from "@/lib/cal";

export default function BookPage() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    const cal = window.Cal;
    if (!el || !cal) return;

    el.innerHTML = "";
    cal("inline", {
      elementOrSelector: el,
      calLink: CAL_LINK,
      config: { theme: "dark", layout: "month_view" },
    });
  }, []);

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
        className="mx-auto flex w-full max-w-[960px] flex-1 flex-col px-5 py-10 md:px-10 md:py-16"
      >
        <SectionLabel code="AKR-008" label="BOOK_A_CALL" />
        <h1 className="section-heading mt-4 mb-3">
          Fifteen minutes.
          <br />
          <span style={{ color: "var(--laptop-glow)" }}>No pitch deck.</span>
        </h1>
        <p className="body-copy mb-8 max-w-[42ch]">
          Pick a slot. Demo calendar for now — swap in Aakar&apos;s Cal.com
          link when it&apos;s live.
        </p>
        <div
          ref={mount}
          className="min-h-[640px] w-full overflow-auto rounded-2xl bg-[rgba(26,29,46,0.45)]"
        />
      </main>
    </div>
  );
}
