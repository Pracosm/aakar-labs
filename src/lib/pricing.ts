export type Module = {
  id: string;
  name: string;
  desc: string;
  min: number;
  max: number;
};

export type TrackId = "brand" | "product" | "dev";

export type Track = {
  id: TrackId;
  label: string;
  code: string;
  blurb: string;
  modules: Module[];
};

export const TRACKS: Track[] = [
  {
    id: "brand",
    label: "Brand Identity",
    code: "TRK-01",
    blurb: "Visual system and assets for your product.",
    modules: [
      {
        id: "brand_digital",
        name: "Logo + type + color",
        desc: "Logo, typography pairing and color system — sized for digital use.",
        min: 50000,
        max: 75000,
      },
      {
        id: "brand_full",
        name: "Full brand identity",
        desc: "Everything: audit, logo, type, color, iconography, illustration system, guidelines and production-ready exports.",
        min: 130000,
        max: 180000,
      },
    ],
  },
  {
    id: "product",
    label: "Product Design (UI/UX)",
    code: "TRK-02",
    blurb: "Designed product surfaces, ready for engineering.",
    modules: [
      {
        id: "product_screens",
        name: "Hi-fi screens",
        desc: "Polished UI screens for your core flows. Static, handoff-ready.",
        min: 75000,
        max: 110000,
      },
      {
        id: "product_full",
        name: "Full UX + interactive prototype",
        desc: "Everything: UX audit, journey maps, IA, wireframes, screens, clickable prototype, design system and dev handoff.",
        min: 150000,
        max: 200000,
      },
    ],
  },
  {
    id: "dev",
    label: "Development",
    code: "TRK-03",
    blurb: "Engineer the design into a production-ready product.",
    modules: [
      {
        id: "dev_frontend",
        name: "Frontend build",
        desc: "Next.js / React implementation, 1:1 with the design system.",
        min: 100000,
        max: 150000,
      },
      {
        id: "dev_full",
        name: "Full development",
        desc: "Everything: frontend, backend, APIs, authentication, deployment, performance and accessibility.",
        min: 220000,
        max: 320000,
      },
    ],
  },
];

export const TIMELINE_OPTIONS = [
  { id: "standard", label: "Standard · 4–6 weeks", multiplier: 1 },
  { id: "rush", label: "Rush · 2–3 weeks", multiplier: 1.2 },
  { id: "flexible", label: "Flexible · 6+ weeks", multiplier: 0.95 },
] as const;

export const BUNDLE_DISCOUNT = 30000;

const ALL_MODULES = TRACKS.flatMap((t) =>
  t.modules.map((m) => ({ ...m, trackId: t.id })),
);

export function findModule(id: string) {
  return ALL_MODULES.find((m) => m.id === id);
}

export function computeEstimate(selectedIds: string[], timelineId: string) {
  let min = 0;
  let max = 0;
  let brandCount = 0;
  let productCount = 0;
  let devCount = 0;

  selectedIds.forEach((id) => {
    const m = findModule(id);
    if (!m) return;
    min += m.min;
    max += m.max;
    if (m.trackId === "brand") brandCount += 1;
    else if (m.trackId === "product") productCount += 1;
    else devCount += 1;
  });

  const bundle = brandCount > 0 && productCount > 0;
  if (bundle) {
    min = Math.max(0, min - BUNDLE_DISCOUNT);
    max = Math.max(0, max - BUNDLE_DISCOUNT);
  }

  const mult = TIMELINE_OPTIONS.find((t) => t.id === timelineId)?.multiplier ?? 1;
  min = Math.round(min * mult);
  max = Math.round(max * mult);

  return {
    min,
    max,
    bundle,
    brandCount,
    productCount,
    devCount,
    moduleCount: selectedIds.length,
  };
}
