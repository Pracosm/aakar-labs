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
      className="relative w-full px-5 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24"
      style={{
        borderTop: "1px solid rgba(236,238,245,0.05)",
      }}
    >
      <div className="max-w-[1160px] mx-auto">
        {/* Header */}
        <div className="flex w-full flex-col gap-5 mb-12">
          <SectionLabel code="AKR-002" label="WHAT_WE_DO" />
          <p
            className="max-w-[600px]"
            style={{
              fontFamily: "Outfit",
              fontWeight: 300,
              fontSize: 16,
              color: "rgba(236,238,245,0.5)",
              lineHeight: 1.7,
            }}
          >
            Every project follows our structured process — from research to
            final deliverables, packaged for seamless developer handover.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid w-full grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden glass-panel">
          {services.map((svc) => (
            <div
              key={svc.num}
              className="flex flex-col gap-5 p-8 transition-colors"
              style={{
                background: "rgba(26,29,46,0.35)",
              }}
            >
              <span
                className="font-mono text-[11px] font-medium tracking-[2px]"
                style={{ color: "var(--coral)" }}
              >
                {svc.num}
              </span>
              <h3
                className="whitespace-pre-line font-display text-[22px] font-bold leading-[1.15] tracking-[-0.5px]"
                style={{ color: "var(--rim-white)" }}
              >
                {svc.title}
              </h3>
              <p
                style={{
                  fontFamily: "Outfit",
                  fontWeight: 300,
                  fontSize: 14,
                  color: "rgba(236,238,245,0.6)",
                  lineHeight: 1.7,
                }}
              >
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
