import SectionLabel from "./ui/SectionLabel";

const services = [
  {
    num: "01",
    title: "Research &\nStrategy",
    desc: "User interviews, competitive analysis, personas, journey maps, and product strategy.",
  },
  {
    num: "02",
    title: "UI & UX\nDesign",
    desc: "Wireframes, high-fidelity screens, interactive prototypes, and usability testing.",
  },
  {
    num: "03",
    title: "Design\nSystems",
    desc: "Component libraries, style guides, tokens, and documentation — built for scale.",
  },
  {
    num: "04",
    title: "Handoff &\nAssets",
    desc: "Pixel-perfect specs, redlines, exportable assets, and developer-ready documentation.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="flex w-full flex-col gap-12 border-y border-border-subtle bg-bg-surface px-5 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20"
    >
      {/* Header */}
      <div className="flex w-full flex-col gap-5">
        <SectionLabel code="AKR-002" label="WHAT_WE_DO" />
        <h2 className="font-display text-2xl font-bold tracking-[-1px] text-text-primary md:text-3xl lg:text-[40px]">
          End-to-end design, ready for handoff.
        </h2>
        <p className="max-w-[600px] text-sm leading-[1.7] text-text-secondary md:text-base">
          Every project follows our structured process — from research to
          final deliverables, packaged for seamless developer handover.
        </p>
      </div>

      {/* 4-Column Grid with 1px gap */}
      <div className="flex w-full flex-col gap-px bg-border md:flex-row md:flex-wrap lg:flex-nowrap">
        {services.map((svc) => (
          <div
            key={svc.num}
            className="flex w-full flex-col gap-5 border border-border bg-bg-panel p-8 md:w-[calc(50%-1px)] lg:w-auto lg:flex-1"
          >
            <span className="font-mono text-[11px] font-medium tracking-[2px] text-accent">
              {svc.num}
            </span>
            <h3 className="whitespace-pre-line font-display text-[22px] font-bold leading-[1.2] tracking-[-0.5px] text-text-primary">
              {svc.title}
            </h3>
            <p className="text-sm leading-[1.6] text-text-secondary">
              {svc.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
