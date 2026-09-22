"use client";

import { useEffect, useRef, useState } from "react";
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
    desc: "Design engineer focused on interface, code, craft, and taste.",
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

const FIRST_CARD_DELAY = 2500;
const FOLLOWING_CARD_DELAY = 6500;

export default function Leadership() {
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const [activeMobileCard, setActiveMobileCard] = useState(0);

  useEffect(() => {
    const scroller = mobileCarouselRef.current;
    if (!scroller || members.length < 2) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const cards = Array.from(
      scroller.querySelectorAll<HTMLElement>("[data-leadership-card]"),
    );
    if (cards.length < 2 || !("IntersectionObserver" in window)) return;

    let advanceTimer: number | null = null;
    let scrollEndTimer: number | null = null;
    let isVisible = false;
    let userPaused = false;

    const getNearestCardIndex = () => {
      const viewportCenter = scroller.scrollLeft + scroller.clientWidth / 2;
      return cards.reduce(
        (nearestIndex, card, index) => {
          const nearestDistance = Math.abs(
            cards[nearestIndex].offsetLeft +
              cards[nearestIndex].offsetWidth / 2 -
              viewportCenter,
          );
          const cardDistance = Math.abs(
            card.offsetLeft + card.offsetWidth / 2 - viewportCenter,
          );
          return cardDistance < nearestDistance ? index : nearestIndex;
        },
        0,
      );
    };

    const clearAdvanceTimer = () => {
      if (advanceTimer !== null) {
        window.clearTimeout(advanceTimer);
        advanceTimer = null;
      }
    };

    const scheduleAdvance = (delay?: number) => {
      clearAdvanceTimer();
      if (!isVisible || userPaused) return;

      const currentIndex = getNearestCardIndex();
      advanceTimer = window.setTimeout(
        advance,
        delay ??
          (currentIndex === 0 ? FIRST_CARD_DELAY : FOLLOWING_CARD_DELAY),
      );
    };

    const advance = () => {
      const nextIndex = (getNearestCardIndex() + 1) % cards.length;
      setActiveMobileCard(nextIndex);
      cards[nextIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      scheduleAdvance(FOLLOWING_CARD_DELAY);
    };

    const pauseForInteraction = () => {
      userPaused = true;
      clearAdvanceTimer();
    };

    const resumeAfterInteraction = () => {
      if (!userPaused) return;
      userPaused = false;
      scheduleAdvance(FOLLOWING_CARD_DELAY);
    };

    const handleScroll = () => {
      if (scrollEndTimer !== null) window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        setActiveMobileCard(getNearestCardIndex());
      }, 80);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearAdvanceTimer();
      } else {
        scheduleAdvance();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          scheduleAdvance();
        } else {
          clearAdvanceTimer();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(scroller);
    scroller.addEventListener("scroll", handleScroll, { passive: true });
    scroller.addEventListener("pointerdown", pauseForInteraction);
    scroller.addEventListener("pointerup", resumeAfterInteraction);
    scroller.addEventListener("pointercancel", resumeAfterInteraction);
    scroller.addEventListener("focusin", pauseForInteraction);
    scroller.addEventListener("focusout", resumeAfterInteraction);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearAdvanceTimer();
      if (scrollEndTimer !== null) window.clearTimeout(scrollEndTimer);
      observer.disconnect();
      scroller.removeEventListener("scroll", handleScroll);
      scroller.removeEventListener("pointerdown", pauseForInteraction);
      scroller.removeEventListener("pointerup", resumeAfterInteraction);
      scroller.removeEventListener("pointercancel", resumeAfterInteraction);
      scroller.removeEventListener("focusin", pauseForInteraction);
      scroller.removeEventListener("focusout", resumeAfterInteraction);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section
      className="relative w-full px-5 py-10 md:px-10 md:py-20 lg:px-14 lg:py-24"
      style={{ borderTop: "1px solid rgba(236,238,245,0.05)" }}
    >
      <div className="max-w-[1160px] mx-auto">
        <div className="flex w-full flex-col gap-4 mb-8 md:gap-6 md:mb-12">
          <SectionLabel code="AKR-005" label="LEADERSHIP" />
          <h2 className="section-heading max-w-[600px]">
            The people behind
            <br />
            <span style={{ color: "var(--laptop-glow)" }}>the pixels.</span>
          </h2>
          <p className="md:hidden font-mono text-[12px] tracking-[0.14em] uppercase text-[rgba(236,238,245,0.7)]">
            Swipe the team.
          </p>
        </div>

        <div
          ref={mobileCarouselRef}
          role="region"
          aria-label="Leadership team"
          className="leadership-carousel md:hidden -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {members.map((m, index) => (
            <article
              key={`${m.name}-m`}
              data-leadership-card
              className={`leadership-card g-rise flex w-[78vw] max-w-[300px] shrink-0 snap-center flex-col gap-3 rounded-2xl glass-panel p-4 ${activeMobileCard === index ? "leadership-card--active" : ""}`}
            >
              <div
                className="relative h-44 w-full overflow-hidden rounded-xl"
                style={{ background: "rgba(5,5,9,0.5)" }}
              >
                <Image
                  src={m.photo}
                  alt={`${m.name}, ${m.role.toLowerCase()} at Aakar Labs`}
                  fill
                  sizes="78vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-[color:var(--rim-white)]">
                {m.name}
              </h3>
              <p className="font-mono text-[11px] font-medium tracking-[0.16em] text-[color:var(--coral)]">
                {m.role}
              </p>
              <p className="leadership-description body-copy text-[1rem] text-[rgba(236,238,245,0.82)]">
                {m.desc}
              </p>
              <div className="flex items-center gap-2">
                {m.socials.map(({ href, label, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} on ${label}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                    style={{
                      background: "rgba(236,238,245,0.04)",
                      border: "1px solid rgba(236,238,245,0.12)",
                      color: "rgba(236,238,245,0.85)",
                    }}
                  >
                    <Icon size={16} weight="regular" />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="hidden w-full grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {members.map((m) => (
            <article
              key={m.name}
              className="leadership-card flex flex-row gap-4 rounded-2xl glass-panel p-4 md:flex-col md:gap-4 md:p-5"
            >
              <div
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl md:h-[260px] md:w-full lg:h-[300px]"
                style={{ background: "rgba(5,5,9,0.5)" }}
              >
                <Image
                  src={m.photo}
                  alt={`${m.name}, ${m.role.toLowerCase()} at Aakar Labs`}
                  fill
                  sizes="(max-width: 768px) 96px, (max-width: 1160px) 50vw, 25vw"
                  className="object-cover"
                  style={{
                    filter: "saturate(0.85) contrast(1.05)",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none hidden md:block"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(5,5,9,0) 55%, rgba(5,5,9,0.45) 100%)",
                  }}
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-[color:var(--rim-white)] md:text-xl">
                  {m.name}
                </h3>
                <p className="font-mono text-[11px] font-medium tracking-[0.16em] text-[color:var(--coral)] md:text-[10px] md:tracking-[0.2em]">
                  {m.role}
                </p>
                <p className="leadership-description body-copy text-[0.95rem] md:text-[15px] md:text-[rgba(236,238,245,0.82)]">
                  {m.desc}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-2">
                  {m.socials.map(({ href, label, Icon }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on ${label}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-[background-color,border-color,color] duration-300 md:h-8 md:w-8"
                      style={{
                        background: "rgba(236,238,245,0.04)",
                        border: "1px solid rgba(236,238,245,0.12)",
                        color: "rgba(236,238,245,0.85)",
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
                        e.currentTarget.style.color = "rgba(236,238,245,0.85)";
                      }}
                    >
                      <Icon size={16} weight="regular" />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
