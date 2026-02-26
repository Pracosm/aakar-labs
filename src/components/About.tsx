import SectionLabel from "./ui/SectionLabel";
import ButtonGhost from "./ui/ButtonGhost";

const specs = [
  { key: "TEAM_SIZE", value: "8 designers" },
  { key: "FOUNDED", value: "2024" },
  { key: "BASED", value: "Remote-first" },
  { key: "TOOLS", value: "Figma, Framer, After Effects" },
  { key: "HANDOFF", value: "Figma Dev Mode, Zeplin" },
  { key: "PROCESS", value: "2-week sprints" },
  { key: "DELIVERABLES", value: "Production-ready files" },
];

export default function About() {
  return (
    <section
      id="about"
      className="flex w-full flex-col gap-10 border-y border-border-subtle bg-bg-surface px-5 py-12 md:px-10 md:py-16 lg:flex-row lg:gap-16 lg:px-16 lg:py-20"
    >
      {/* Left — Text */}
      <div className="flex flex-1 flex-col gap-8">
        <SectionLabel code="AKR-004" label="THE_STUDIO" />
        <h2 className="font-display text-2xl font-bold leading-[1.15] tracking-[-1px] text-text-primary md:text-3xl lg:text-[40px]">
          A studio built on
          <br />
          craft and clarity.
        </h2>
        <p className="text-sm leading-[1.7] text-text-secondary md:text-base">
          Aakar Labs is a design studio. We partner with founders, product
          teams, and established brands to design interfaces and systems that
          hold up in the real world.
          <br />
          <br />
          Every project is delivered to industry-standard specifications —
          organised files, documented components, and assets ready for your
          engineering team to build from. No guesswork, no loose ends.
        </p>
        <ButtonGhost label="MORE ABOUT US" />
      </div>

      {/* Right — Specs Panel */}
      <div className="flex w-full shrink-0 flex-col border border-border bg-bg-panel p-7 lg:w-[420px]">
        {/* Spec Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="font-mono text-[10px] font-medium tracking-[2px] text-text-tertiary">
            STUDIO DETAILS
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        </div>

        {/* Spec Rows */}
        {specs.map((spec) => (
          <div
            key={spec.key}
            className="flex items-center justify-between border-b border-border-subtle py-3.5"
          >
            <span className="font-mono text-[11px] font-medium tracking-[1px] text-text-tertiary">
              {spec.key}
            </span>
            <span className="text-sm text-text-primary">{spec.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
