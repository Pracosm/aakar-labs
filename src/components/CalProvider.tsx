"use client";

import { useEffect } from "react";
import { CAL_EMBED_JS, CAL_ORIGIN } from "@/lib/cal";

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  q?: unknown[];
  ns?: Record<string, CalApi>;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

export default function CalProvider() {
  useEffect(() => {
    const w = window;
    const push = (api: CalApi, args: unknown[]) => {
      api.q = api.q || [];
      api.q.push(args);
    };

    if (!w.Cal) {
      const cal = function calFn(...args: unknown[]) {
        const self = w.Cal as CalApi;
        if (!self.loaded) {
          self.ns = {};
          self.q = self.q || [];
          const s = document.createElement("script");
          s.src = CAL_EMBED_JS;
          s.async = true;
          document.head.appendChild(s);
          self.loaded = true;
        }
        push(self, args);
      } as CalApi;
      cal.q = [];
      cal.ns = {};
      w.Cal = cal;
    }

    w.Cal("init", { origin: CAL_ORIGIN });
    w.Cal("ui", {
      theme: "dark",
      cssVarsPerTheme: {
        dark: { "cal-brand": "#d4756a" },
      },
    });
  }, []);

  return null;
}
