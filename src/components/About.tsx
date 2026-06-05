import SectionLabel from "./ui/SectionLabel";

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
      className="relative w-full px-5 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24"
      style={{ borderTop: "1px solid rgba(236,238,245,0.05)" }}
    >
      <div className="max-w-[1160px] mx-auto flex flex-col gap-10 lg:flex-row lg:gap-16 lg:items-start">
        {/* Left — Text */}
        <div className="flex flex-1 flex-col gap-8">
          <SectionLabel code="AKR-004" label="THE_STUDIO" />
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.06em",
              color: "var(--rim-white)",
              lineHeight: 1.05,
            }}
          >
            A studio built on
            <br />
            <span style={{ color: "var(--laptop-glow)" }}>
              craft and clarity.
            </span>
          </h2>
          <p
            style={{
              fontFamily: "Outfit",
              fontWeight: 300,
              fontSize: 16,
              color: "rgba(236,238,245,0.6)",
              lineHeight: 1.75,
            }}
          >
            Aakar Labs is a design studio. We partner with founders, product
            teams, and established brands to design interfaces and systems that
            hold up in the real world.
            <br />
            <br />
            Every project is delivered to industry-standard specifications —
            organised files, documented components, and assets ready for your
            engineering team to build from. No guesswork, no loose ends.
          </p>
        </div>

        {/* Right — Specs Panel */}
        <div
          className="flex w-full shrink-0 flex-col p-7 rounded-2xl glass-panel lg:w-[420px]"
        >
          <div
            className="flex items-center justify-between pb-4"
            style={{
              borderBottom: "1px solid rgba(236,238,245,0.08)",
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.2em",
                color: "rgba(236,238,245,0.45)",
              }}
            >
              STUDIO DETAILS
            </span>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--stem-green)",
                boxShadow: "0 0 12px rgba(74,140,63,0.9)",
                animation: "rimPulse 2s ease-in-out infinite",
              }}
            />
          </div>

          {specs.map((spec) => (
            <div
              key={spec.key}
              className="flex items-center justify-between py-3.5"
              style={{
                borderBottom: "1px solid rgba(236,238,245,0.05)",
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  color: "rgba(236,238,245,0.45)",
                }}
              >
                {spec.key}
              </span>
              <span
                style={{
                  fontFamily: "Outfit",
                  fontSize: 13,
                  fontWeight: 400,
                  color: "var(--rim-white)",
                }}
              >
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
