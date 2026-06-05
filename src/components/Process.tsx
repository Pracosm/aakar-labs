import SectionLabel from "./ui/SectionLabel";

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "Stakeholder workshops, user research, competitive audits, and a clear design brief.",
  },
  {
    num: "02",
    title: "Explore",
    desc: "Wireframes, moodboards, concept directions, and early prototype testing with real users.",
  },
  {
    num: "03",
    title: "Refine",
    desc: "High-fidelity screens, interaction design, design system components, and micro-animations.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "Organised Figma files, annotated specs, asset exports, and a complete handoff to your dev team.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative w-full px-5 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24"
      style={{ borderTop: "1px solid rgba(236,238,245,0.05)" }}
    >
      <div className="max-w-[1160px] mx-auto">
        <div className="flex w-full flex-col gap-5 mb-12">
          <SectionLabel code="AKR-006" label="OUR_PROCESS" />
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
            How we{" "}
            <span style={{ color: "var(--laptop-glow)" }}>work.</span>
          </h2>
          <p
            className="max-w-[560px]"
            style={{
              fontFamily: "Outfit",
              fontWeight: 300,
              fontSize: 16,
              color: "rgba(236,238,245,0.5)",
              lineHeight: 1.7,
            }}
          >
            Four phases. Clear deliverables at every stage. Nothing moves
            forward until the previous phase is signed off.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex flex-col gap-4 p-7 rounded-2xl glass-panel"
            >
              <span
                className="font-mono"
                style={{
                  fontSize: 28,
                  fontWeight: 500,
                  color: "rgba(212,117,106,0.45)",
                  letterSpacing: "-0.02em",
                }}
              >
                {step.num}
              </span>
              <h3
                className="font-display text-xl"
                style={{
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--rim-white)",
                }}
              >
                {step.title}
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
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
