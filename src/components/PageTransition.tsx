"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useWorkCaseStudyTransition } from "./WorkCaseStudyTransition";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { skipPageReveal } = useWorkCaseStudyTransition();

  return (
    <div
      key={pathname}
      className={skipPageReveal ? "page-transition page-transition--instant" : "page-transition"}
    >
      {children}
    </div>
  );
}
