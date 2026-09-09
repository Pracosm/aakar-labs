import SectionLabel from "./ui/SectionLabel";

const specs = [
  { key: "TEAM_SIZE", value: "8 designers" },
  { key: "FOUNDED", value: "Dec 2025" },
  { key: "BASED", value: "Remote-first" },
  { key: "TOOLS", value: "Figma, Framer, After Effects" },
  { key: "HANDOFF", value: "Figma Dev Mode, Zeplin" },
  { key: "PROCESS", value: "2-week sprints" },
  { key: "DELIVERABLES", value: "Production-ready files" },
];

const mobileStats = [
  { key: "Team", value: "8" },
  { key: "Sprints", value: "2 wks" },
  { key: "Handoff", value: "Dev-ready" },
  { key: "Base", value: "Remote" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full px-5 py-10 md:px-10 md:py-20 lg:px-14 lg:py-24"
      style={{ borderTop: "1px solid rgba(236,238,245,0.05)" }}
    >
      <div className="max-w-[1160px] mx-auto flex flex-col gap-8 lg:flex-row lg:gap-16 lg:items-start">
        <div className="flex flex-1 flex-col gap-4 md:gap-8">
          <SectionLabel code="AKR-004" label="THE_STUDIO" />
          <h2 className="section-heading g-rise">
            A studio built on
            <br />
            <span style={{ color: "var(--laptop-glow)" }}>
              craft and clarity.
            </span>
          </h2>
          <p className="md:hidden text-[1.05rem] leading-relaxed text-[rgba(236,238,245,0.82)]">
            Interfaces and identities, shipped to industry spec.
          </p>
          <div className="body-copy hidden flex-col gap-4 md:flex">
            <p>
              Aakar Labs is a design studio. We partner with founders, product
              teams, and established brands to design brand identities,
              interfaces, and systems that hold up in the real world.
            </p>
            <p>
              Every project is delivered to industry-standard specifications —
              organised files, documented components, and assets ready for your
              engineering team to build from. No guesswork, no loose ends.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:hidden">
          {mobileStats.map((s) => (
            <div key={s.key} className="g-rise rounded-2xl glass-panel p-4">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-[rgba(236,238,245,0.55)]">
                {s.key}
              </p>
              <p className="mt-1 font-display text-xl font-bold tracking-[-0.03em] text-[color:var(--rim-white)]">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <dl className="hidden w-full shrink-0 flex-col p-5 rounded-2xl glass-panel md:flex md:p-7 lg:w-[420px]">
          <div
            className="flex items-center justify-between pb-4"
            style={{
              borderBottom: "1px solid rgba(236,238,245,0.08)",
            }}
          >
            <dt className="font-mono text-xs font-medium tracking-[0.16em] text-[rgba(236,238,245,0.7)] md:text-[10px] md:tracking-[0.2em] md:text-[rgba(236,238,245,0.45)]">
              STUDIO DETAILS
            </dt>
            <dd className="m-0">
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{
                  background: "var(--stem-green)",
                  boxShadow: "0 0 12px rgba(74,140,63,0.9)",
                  animation: "rimPulse 2s ease-in-out infinite",
                }}
              />
            </dd>
          </div>

          {specs.map((spec) => (
            <div
              key={spec.key}
              className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-center sm:justify-between"
              style={{
                borderBottom: "1px solid rgba(236,238,245,0.05)",
              }}
            >
              <dt className="font-mono text-[11px] font-medium tracking-[0.12em] text-[rgba(236,238,245,0.62)] md:text-[11px] md:text-[rgba(236,238,245,0.45)]">
                {spec.key}
              </dt>
              <dd className="m-0 font-body text-[15px] font-medium text-[color:var(--rim-white)] md:text-[13px] md:font-normal">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
