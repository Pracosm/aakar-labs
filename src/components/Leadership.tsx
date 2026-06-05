"use client";

import Image from "next/image";
import {
  LinkedinLogo,
  XLogo,
  InstagramLogo,
  Globe,
} from "@phosphor-icons/react";
import SectionLabel from "./ui/SectionLabel";

type Social = {
  href: string;
  label: string;
  Icon: typeof LinkedinLogo;
};

const members: Array<{
  photo: string;
  name: string;
  role: string;
  desc: string;
  socials: Social[];
}> = [
  {
    photo: "/images/team/shardul.jpg",
    name: "Shardul Nandedkar",
    role: "FOUNDER",
    desc: "Vision, direction, and the relentless pursuit of clarity in every pixel.",
    socials: [
      {
        href: "https://www.linkedin.com/in/sharduln/",
        label: "LinkedIn",
        Icon: LinkedinLogo,
      },
      {
        href: "https://x.com/pracosm",
        label: "X (Twitter)",
        Icon: XLogo,
      },
    ],
  },
  {
    photo: "/images/team/soumik.png",
    name: "Soumik Halder",
    role: "CO-FOUNDER",
    desc: "Operations, partnerships, and the engine behind every smooth delivery.",
    socials: [
      {
        href: "https://www.linkedin.com/in/soumik7/",
        label: "LinkedIn",
        Icon: LinkedinLogo,
      },
      {
        href: "https://x.com/soumikkhalder",
        label: "X (Twitter)",
        Icon: XLogo,
      },
    ],
  },
  {
    photo: "/images/team/revathi.jpg",
    name: "Revathi Santosh",
    role: "CHIEF DESIGN OFFICER",
    desc: "Systems thinking, interface craft, and the guardian of design standards.",
    socials: [
      {
        href: "https://www.linkedin.com/in/revathi-s-740268274/",
        label: "LinkedIn",
        Icon: LinkedinLogo,
      },
      {
        href: "https://revign.co.in/",
        label: "Personal site",
        Icon: Globe,
      },
    ],
  },
  {
    photo: "/images/team/karun.jpg",
    name: "Karun Thapa",
    role: "CHIEF BRANDING OFFICER",
    desc: "Leads Kwirks, our in-house brother studio for branding — partnering with us on identity work end-to-end.",
    socials: [
      {
        href: "https://www.instagram.com/kwirks_studio/",
        label: "Instagram (Kwirks)",
        Icon: InstagramLogo,
      },
    ],
  },
];

export default function Leadership() {
  return (
    <section
      className="relative w-full px-5 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24"
      style={{ borderTop: "1px solid rgba(236,238,245,0.05)" }}
    >
      <div className="max-w-[1160px] mx-auto">
        <div className="flex w-full flex-col gap-6 mb-12">
          <SectionLabel code="AKR-005" label="LEADERSHIP" />
          <h2
            className="font-display max-w-[600px]"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.06em",
              color: "var(--rim-white)",
              lineHeight: 1.05,
            }}
          >
            The people behind
            <br />
            <span style={{ color: "var(--laptop-glow)" }}>the pixels.</span>
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {members.map((m) => (
            <div
              key={m.name}
              className="flex flex-col gap-4 p-5 rounded-2xl glass-panel"
            >
              <div
                className="relative h-[240px] w-full overflow-hidden rounded-xl md:h-[260px] lg:h-[300px]"
                style={{ background: "rgba(5,5,9,0.5)" }}
              >
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1160px) 50vw, 25vw"
                  className="object-cover"
                  style={{
                    filter: "saturate(0.85) contrast(1.05)",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(5,5,9,0) 55%, rgba(5,5,9,0.45) 100%)",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span
                  className="font-display text-xl"
                  style={{
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--rim-white)",
                  }}
                >
                  {m.name}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    color: "var(--coral)",
                  }}
                >
                  {m.role}
                </span>
                <p
                  style={{
                    fontFamily: "Outfit",
                    fontWeight: 300,
                    fontSize: 13,
                    color: "rgba(236,238,245,0.6)",
                    lineHeight: 1.6,
                  }}
                >
                  {m.desc}
                </p>
              </div>

              {/* Socials */}
              <div className="mt-auto flex items-center gap-2 pt-2">
                {m.socials.map(({ href, label, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} on ${label}`}
                    className="inline-flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      width: 32,
                      height: 32,
                      background: "rgba(236,238,245,0.04)",
                      border: "1px solid rgba(236,238,245,0.12)",
                      color: "rgba(236,238,245,0.7)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(212,117,106,0.12)";
                      e.currentTarget.style.borderColor =
                        "rgba(212,117,106,0.45)";
                      e.currentTarget.style.color = "var(--coral)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(236,238,245,0.04)";
                      e.currentTarget.style.borderColor =
                        "rgba(236,238,245,0.12)";
                      e.currentTarget.style.color = "rgba(236,238,245,0.7)";
                    }}
                  >
                    <Icon size={14} weight="regular" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
