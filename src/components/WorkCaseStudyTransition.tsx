"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type TransitionPhase = "expanding" | "covering";

type WorkCaseStudyTransition = {
  id: number;
  href: string;
  phase: TransitionPhase;
  rect: DOMRect;
  scaleX: number;
  scaleY: number;
};

type WorkCaseStudyTransitionContextValue = {
  startCaseStudyTransition: (source: HTMLElement, href: string) => boolean;
  skipPageReveal: boolean;
};

const WorkCaseStudyTransitionContext =
  createContext<WorkCaseStudyTransitionContextValue | null>(null);

const EXPAND_DURATION = 560;
const FADE_DURATION = 180;

export function WorkCaseStudyTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const transitionIdRef = useRef(0);
  const [transition, setTransition] = useState<WorkCaseStudyTransition | null>(
    null,
  );
  const [skipPageRevealPath, setSkipPageRevealPath] = useState<string | null>(
    null,
  );

  useEffect(() => {
    router.prefetch("/work/whyclub");
  }, [router]);

  useEffect(() => {
    if (
      !skipPageRevealPath ||
      pathname === skipPageRevealPath ||
      transition?.href === skipPageRevealPath
    ) {
      return;
    }

    const reset = window.setTimeout(() => {
      setSkipPageRevealPath(null);
    }, 0);

    return () => window.clearTimeout(reset);
  }, [pathname, skipPageRevealPath, transition?.href]);

  const startCaseStudyTransition = useCallback(
    (source: HTMLElement, href: string) => {
      if (isTransitioningRef.current) {
        return true;
      }

      if (
        typeof window === "undefined" ||
        typeof source.animate !== "function" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return false;
      }

      const rect = source.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (!rect.width || !rect.height || !viewportWidth || !viewportHeight) {
        return false;
      }

      isTransitioningRef.current = true;
      transitionIdRef.current += 1;
      setTransition({
        id: transitionIdRef.current,
        href,
        phase: "expanding",
        rect,
        scaleX: viewportWidth / rect.width,
        scaleY: viewportHeight / rect.height,
      });

      return true;
    },
    [],
  );

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay || transition?.phase !== "expanding") return;

    let active = true;
    let completed = false;
    const { rect, scaleX, scaleY } = transition;
    const animation = overlay.animate(
      [
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1, 1)" },
        {
          opacity: 1,
          transform: `translate3d(${-rect.left}px, ${-rect.top}px, 0) scale(${scaleX}, ${scaleY})`,
        },
      ],
      {
        duration: EXPAND_DURATION,
        easing: "cubic-bezier(0.19, 1, 0.22, 1)",
        fill: "forwards",
      },
    );

    animation.finished
      .then(() => {
        if (!active) return;

        completed = true;
        setTransition((current) =>
          current?.id === transition.id
            ? { ...current, phase: "covering" }
            : current,
        );
        setSkipPageRevealPath(transition.href);
        router.push(transition.href);
      })
      .catch(() => undefined);

    return () => {
      active = false;
      if (!completed) animation.cancel();
    };
  }, [router, transition]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (
      !overlay ||
      transition?.phase !== "covering" ||
      pathname !== transition.href
    ) {
      return;
    }

    let active = true;
    let animation: Animation | undefined;
    const frame = requestAnimationFrame(() => {
      animation = overlay.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        {
          duration: FADE_DURATION,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          fill: "forwards",
        },
      );

      animation.finished
        .then(() => {
          if (!active) return;
          isTransitioningRef.current = false;
          setTransition(null);
        })
        .catch(() => undefined);
    });

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      animation?.cancel();
    };
  }, [pathname, transition]);

  return (
    <WorkCaseStudyTransitionContext.Provider
      value={{
        startCaseStudyTransition,
        skipPageReveal: skipPageRevealPath === pathname,
      }}
    >
      {children}
      {transition ? (
        <div
          ref={overlayRef}
          aria-hidden="true"
          className="work-case-study-transition-overlay"
          style={{
            left: transition.rect.left,
            top: transition.rect.top,
            width: transition.rect.width,
            height: transition.rect.height,
          }}
        />
      ) : null}
    </WorkCaseStudyTransitionContext.Provider>
  );
}

export function useWorkCaseStudyTransition() {
  const context = useContext(WorkCaseStudyTransitionContext);

  if (!context) {
    throw new Error(
      "useWorkCaseStudyTransition must be used inside WorkCaseStudyTransitionProvider.",
    );
  }

  return context;
}
