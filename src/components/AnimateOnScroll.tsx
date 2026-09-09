"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AnimateOnScroll({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = container.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const bits = el.querySelectorAll(".g-rise");

      gsap.fromTo(
        bits.length ? bits : el,
        { opacity: 0, y: mobile ? 28 : 50 },
        {
          opacity: 1,
          y: 0,
          duration: mobile ? 0.55 : 1.2,
          stagger: bits.length ? 0.05 : 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: mobile ? "top 88%" : "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: container },
  );

  return <div ref={container}>{children}</div>;
}
