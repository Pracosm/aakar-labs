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
      <footer
        className="relative w-full px-5 py-12 md:px-10 lg:px-14"
        style={{
          borderTop: "1px solid rgba(236,238,245,0.06)",
          background: "rgba(5,5,9,0.45)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-[1160px] mx-auto flex flex-col gap-12">
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:justify-between lg:gap-0">
            <div className="flex w-full flex-col gap-4 lg:w-[300px]">
              <div className="flex items-center gap-2">
                <Image
                  src={aakarLogo}
                  alt="Aakar Labs"
                  width={36}
                  height={18}
                />
                <span className="font-display text-base font-bold tracking-[3px] text-white">
                  AAKAR LABS
                </span>
              </div>
              <p className="body-copy text-[15px] md:text-[13px] md:text-[rgba(236,238,245,0.55)]">
                Design studio.
                <br />
                Industry-standard deliverables.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <FooterColumn title="NAVIGATION">
                {["Work", "Process", "About", "Contact"].map((link) => (
                  <FooterLink key={link} href={`/#${link.toLowerCase()}`}>
                    {link}
                  </FooterLink>
                ))}
              </FooterColumn>

              <FooterColumn title="CONNECT">
                {[
                  { name: "Instagram", href: "https://www.instagram.com/aakarlabs/" },
                  { name: "LinkedIn", href: "https://www.linkedin.com/company/aakar-labs/" },
                  { name: "Twitter / X", href: "#" },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.href !== "#" ? "_blank" : undefined}
                    rel={link.href !== "#" ? "noopener noreferrer" : undefined}
                    onClick={link.href === "#" ? handleWipClick : undefined}
                    style={{
                      fontFamily: "Outfit",
                      fontWeight: 400,
                      fontSize: 15,
                      color: "rgba(236,238,245,0.78)",
                    }}
                    className="min-h-11 inline-flex items-center hover:text-white transition-colors md:min-h-0 md:text-[13px] md:text-[rgba(236,238,245,0.6)]"
                  >
                    {link.name}
                  </a>
                ))}
              </FooterColumn>

              <FooterColumn title="LEGAL">
                {["Privacy Policy", "Terms of Service"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    onClick={handleWipClick}
                    style={{
                      fontFamily: "Outfit",
                      fontWeight: 400,
                      fontSize: 15,
                      color: "rgba(236,238,245,0.78)",
                    }}
                    className="min-h-11 inline-flex items-center hover:text-white transition-colors md:min-h-0 md:text-[13px] md:text-[rgba(236,238,245,0.6)]"
                  >
                    {link}
                  </a>
                ))}
              </FooterColumn>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="flex w-full flex-col items-start gap-2 pt-6 md:flex-row md:items-center md:justify-between md:gap-0"
            style={{ borderTop: "1px solid rgba(236,238,245,0.05)" }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.1em",
                color: "rgba(236,238,245,0.4)",
              }}
            >
              © 2026 Aakar Labs. All rights reserved.
            </span>
            <div className="flex items-center gap-2">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--stem-green)",
                  boxShadow: "0 0 12px rgba(74,140,63,0.9)",
                  animation: "rimPulse 2s ease-in-out infinite",
                }}
              />
              <span
                className="font-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  color: "rgba(236,238,245,0.55)",
                }}
              >
                ACCEPTING PROJECTS
              </span>
            </div>
          </div>
        </div>
      </footer>

      {showPopup && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
              <div
                className="relative flex w-full max-w-[400px] flex-col items-center gap-5 rounded-2xl p-8 text-center glass-panel"
                style={{
                  animation: "aetherisReveal 0.5s cubic-bezier(0.34, 1.1, 0.64, 1) both",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  aria-label="Close"
                  className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col gap-2">
                  <h3
                    className="font-display"
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: "var(--rim-white)",
                    }}
                  >
                    Build in process
                  </h3>
                  <p
                    style={{
                      fontFamily: "Outfit",
                      fontWeight: 300,
                      fontSize: 13,
                      color: "rgba(236,238,245,0.6)",
                      lineHeight: 1.6,
                    }}
                  >
                    This section is currently under construction. Stay tuned for
                    updates.
                  </p>
                </div>

                <button
                  onClick={() => setShowPopup(false)}
                  className="mt-2 w-full rounded-full px-6 py-3"
                  style={{
                    background: "var(--laptop-glow)",
                    color: "#000",
                    fontFamily: "Outfit",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
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

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <span
        className="font-mono"
        style={{
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.2em",
          color: "rgba(236,238,245,0.4)",
        }}
      >
        {title}
      </span>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      style={{
        fontFamily: "Outfit",
        fontWeight: 400,
        fontSize: 15,
        color: "rgba(236,238,245,0.78)",
      }}
      className="min-h-11 inline-flex items-center hover:text-white transition-colors md:min-h-0 md:text-[13px] md:text-[rgba(236,238,245,0.6)]"
    >
      {children}
    </a>
  );
}
