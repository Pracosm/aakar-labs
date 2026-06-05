"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import aakarLogo from "@/assets/aakar-logo.png";
import { Menu, X } from "lucide-react";

const NAV_LINKS = ["WORK", "ABOUT", "PROCESS", "CONTACT"] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex h-[72px] w-full items-center justify-between px-5 md:px-10 lg:px-14 backdrop-blur-md bg-[rgba(5,5,9,0.35)] border-b border-[rgba(236,238,245,0.05)]">
      {/* Left — Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <Image
          src={aakarLogo}
          alt="Aakar Labs"
          width={42}
          height={32}
          priority
        />
        <span className="font-display text-[17px] font-bold tracking-[2px] text-white drop-shadow-md">
          AAKAR LABS
        </span>
      </Link>

      {/* Center — Links (desktop) */}
      <div className="hidden items-center gap-9 lg:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`/#${link.toLowerCase()}`}
            className="text-[11px] uppercase font-sans font-medium tracking-[0.16em] text-white/75 hover:text-white transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right — CTA (desktop) */}
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

      {/* Hamburger (mobile/tablet) */}
      <button
        className="flex items-center justify-center lg:hidden text-white/80"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute left-0 top-[72px] z-40 flex w-full flex-col bg-[rgba(5,5,9,0.92)] backdrop-blur-md px-5 pb-6 pt-4 md:px-10 lg:hidden border-b border-[rgba(236,238,245,0.08)]">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`/#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="border-b border-[rgba(236,238,245,0.06)] py-3 text-[10px] uppercase font-sans tracking-[0.25em] text-white/60 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
          <Link
            href="/start-project"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-[11px] uppercase font-sans font-semibold tracking-[0.22em]"
            style={{ background: "var(--laptop-glow)", color: "#000" }}
          >
            START PROJECT
          </Link>
        </div>
      )}
    </nav>
  );
}
