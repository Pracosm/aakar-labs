"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import aakarLogo from "@/assets/aakar-logo.png";
import { X } from "lucide-react";

export default function Footer() {
  const [showPopup, setShowPopup] = useState(false);

  const handleWipClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <>
      <footer className="relative flex w-full flex-col gap-12 border-t border-border bg-bg-surface px-5 py-12 md:px-10 lg:px-16">
        {/* Top */}
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:justify-between lg:gap-0">
          {/* Brand */}
          <div className="flex w-full flex-col gap-4 lg:w-[300px]">
            <div className="flex items-center gap-2">
              <Image src={aakarLogo} alt="Aakar Labs" width={36} height={28} />
              <span className="font-display text-base font-bold tracking-[3px] text-text-primary">
                AAKAR LABS
              </span>
            </div>
            <p className="text-[13px] leading-[1.6] text-text-secondary">
              Design studio.
              <br />
              Industry-standard deliverables.
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {/* Navigation Column */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] font-medium tracking-[2px] text-text-tertiary">
                NAVIGATION
              </span>
              {["Work", "Services", "Process", "About"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-[13px] text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Connect Column */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] font-medium tracking-[2px] text-text-tertiary">
                CONNECT
              </span>
              {["Twitter / X", "LinkedIn", "Dribbble"].map((link) => (
                <a
                  key={link}
                  href="#"
                  onClick={handleWipClick}
                  className="text-[13px] text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Legal Column */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] font-medium tracking-[2px] text-text-tertiary">
                LEGAL
              </span>
              {["Privacy Policy", "Terms of Service"].map((link) => (
                <a
                  key={link}
                  href="#"
                  onClick={handleWipClick}
                  className="text-[13px] text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex w-full flex-col items-start gap-2 border-t border-border-subtle pt-6 md:flex-row md:items-center md:justify-between md:gap-0">
          <span className="font-mono text-[10px] font-medium tracking-[1px] text-text-tertiary">
            © 2025 Aakar Labs. All rights reserved.
          </span>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4CAF50]" />
            <span className="font-mono text-[10px] font-medium tracking-[1px] text-text-tertiary">
              ACCEPTING PROJECTS
            </span>
          </div>
        </div>
      </footer>

      {/* WIP Popup (Portaled to body for true full screen overlay) */}
      {showPopup && typeof document !== "undefined"
        ? createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
            <div className="animate-hero-entrance relative flex w-full max-w-[320px] flex-col items-center gap-5 rounded-2xl bg-white p-8 text-center shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)] md:max-w-[400px]">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute right-4 top-4 text-text-tertiary transition-colors hover:text-text-primary"
              >
                <X size={20} />
              </button>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cutout-peach text-accent">
                <Image src={aakarLogo} alt="Logo" width={24} height={20} className="opacity-80 grayscale" />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl font-bold tracking-[-0.5px] text-text-primary">
                  Build in process
                </h3>
                <p className="text-[13px] leading-[1.6] text-text-secondary">
                  This section is currently under construction. Stay tuned for updates!
                </p>
              </div>

              <button
                onClick={() => setShowPopup(false)}
                className="mt-2 w-full rounded-[8px] bg-accent px-6 py-3 font-mono text-[13px] font-semibold tracking-[1px] text-white shadow-[0_4px_12px_rgba(255,92,27,0.3)] transition-all hover:-translate-y-[2px] hover:bg-accent-hover hover:shadow-xl active:scale-[0.98]"
              >
                OK
              </button>
            </div>
          </div>,
          document.body
        )
        : null}
    </>
  );
}
