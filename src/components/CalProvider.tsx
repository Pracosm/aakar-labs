"use client";

import { useEffect } from "react";
import { CAL_EMBED_JS, CAL_NAMESPACE, CAL_ORIGIN } from "@/lib/cal";

type CalApi = ((...args: unknown[]) => void) & {
  config?: { forwardQueryParams?: boolean };
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

        if (args[0] === "init" && typeof args[1] === "string") {
          const namespace = args[1];
          const api = ((...namespaceArgs: unknown[]) => {
            push(api, namespaceArgs);
          }) as CalApi;
          api.q = api.q || [];
          self.ns = self.ns || {};
          self.ns[namespace] = self.ns[namespace] || api;
          push(self.ns[namespace], args);
          push(self, ["initNamespace", namespace]);
          return;
        }

        push(self, args);
      } as CalApi;
      cal.q = [];
      cal.ns = {};
      w.Cal = cal;
    }

    w.Cal.config = w.Cal.config || {};
    w.Cal.config.forwardQueryParams = true;
    w.Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
    w.Cal.ns?.[CAL_NAMESPACE]?.("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return null;
}
