import Image from "next/image";
import aakarLogo from "@/assets/aakar-logo.png";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col gap-12 border-t border-border bg-bg-surface px-5 py-12 md:px-10 lg:px-16">
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
  );
}
