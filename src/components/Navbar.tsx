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
    <nav className="sticky top-0 z-50 flex h-[72px] w-full items-center justify-between border-b border-border-subtle bg-bg-page px-5 md:px-10 lg:px-16">
      {/* Left — Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src={aakarLogo} alt="Aakar Labs" width={36} height={28} />
        <span className="font-display text-base font-bold tracking-[3px] text-text-primary">
          AAKAR LABS
        </span>
      </Link>

      {/* Center — Links (desktop) */}
      <div className="hidden items-center gap-10 lg:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`/#${link.toLowerCase()}`}
            className="font-mono text-[11px] font-medium tracking-[2px] text-text-secondary transition-colors hover:text-text-primary"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right — CTA (desktop) */}
      <a
        href="/start-project"
        className="hidden bg-accent px-7 py-3 font-mono text-[13px] font-semibold tracking-[1px] text-bg-page transition-all duration-300 ease-out hover:-translate-y-[2px] hover:bg-accent-hover hover:shadow-xl active:scale-[0.98] lg:block"
      >
        START PROJECT
      </a>

      {/* Hamburger (mobile/tablet) */}
      <button
        className="flex items-center justify-center lg:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? (
          <X size={24} className="text-text-primary" />
        ) : (
          <Menu size={24} className="text-text-primary" />
        )}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute left-0 top-[72px] z-40 flex w-full flex-col border-b border-border-subtle bg-bg-page px-5 pb-6 pt-4 md:px-10 lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`/#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="border-b border-border-subtle py-3 font-mono text-[11px] font-medium tracking-[2px] text-text-secondary transition-colors hover:text-text-primary"
            >
              {link}
            </a>
          ))}
          <a
            href="/start-project"
            onClick={() => setOpen(false)}
            className="mt-4 block w-full bg-accent px-7 py-3 text-center font-mono text-[13px] font-semibold tracking-[1px] text-bg-page transition-all duration-300 ease-out hover:-translate-y-[2px] hover:bg-accent-hover hover:shadow-xl active:scale-[0.98]"
          >
            START PROJECT
          </a>
        </div>
      )}
    </nav>
  );
}
