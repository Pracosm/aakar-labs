"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import aakarLogo from "@/assets/aakar-logo.png";
import { Menu, X } from "lucide-react";
import BookCallButton from "./BookCallButton";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("nav-open");
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    const links = document.querySelectorAll("#mobile-nav .nav-line");
    if (
      links.length &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.fromTo(
        links,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: "power3.out" },
      );
    }

    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("nav-open");
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const menu =
    open && typeof document !== "undefined"
      ? createPortal(
          <div
            id="mobile-nav"
            className="fixed inset-x-0 top-[64px] bottom-0 z-[60] flex w-full flex-col overflow-y-auto px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-6 md:top-[72px] lg:hidden"
            style={{ background: "#050509" }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="nav-line flex min-h-14 items-center border-b border-[rgba(236,238,245,0.1)] font-display text-[1.75rem] font-bold tracking-[-0.03em] text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="nav-line mt-8 flex flex-col gap-3">
              <BookCallButton className="btn-cta btn-cta-primary" />
              <Link
                href="/start-project"
                onClick={() => setOpen(false)}
                className="btn-cta btn-cta-ghost"
              >
                Start a project
              </Link>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <nav
      className="sticky top-0 z-[70] flex h-[64px] w-full items-center justify-between px-4 backdrop-blur-md bg-[rgba(5,5,9,0.72)] border-b border-[rgba(236,238,245,0.08)] md:h-[72px] md:px-10 md:bg-[rgba(5,5,9,0.35)] md:border-[rgba(236,238,245,0.05)] lg:px-14"
      aria-label="Primary"
    >
      <Link
        href="/"
        className="flex items-center gap-2 min-h-11"
        onClick={() => setOpen(false)}
      >
        <Image
          src={aakarLogo}
          alt="Aakar Labs"
          width={42}
          height={21}
          priority
        />
        <span className="font-display text-[15px] font-bold tracking-[1.5px] text-white md:text-[17px] md:tracking-[2px]">
          AAKAR LABS
        </span>
      </Link>

      <div className="hidden items-center gap-9 lg:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[11px] uppercase font-sans font-medium tracking-[0.16em] text-white/75 hover:text-white transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      <Link
        href="/start-project"
        className="hidden lg:inline-flex items-center justify-center rounded-full px-5 py-2 text-[10px] uppercase font-sans font-semibold tracking-[0.22em] transition-all duration-300"
        style={{
          background: "var(--laptop-glow)",
          color: "#000",
        }}
      >
        START PROJECT
      </Link>

      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center lg:hidden text-white"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menu}
    </nav>
  );
}
