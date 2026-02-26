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
      className="flex w-full flex-col gap-12 border-y border-border-subtle bg-bg-surface px-5 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20"
    >
      {/* Header */}
      <div className="flex w-full flex-col gap-5">
        <SectionLabel code="AKR-006" label="OUR_PROCESS" />
        <h2 className="font-display text-2xl font-bold tracking-[-1px] text-text-primary md:text-3xl lg:text-[40px]">
          How we work.
        </h2>
        <p className="max-w-[560px] text-sm leading-[1.7] text-text-secondary md:text-base">
          Four phases. Clear deliverables at every stage.
          Nothing moves forward until the previous phase is signed off.
        </p>
      </div>

      {/* Steps */}
      <div className="flex w-full flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row">
        {steps.map((step, i) => (
          <div
            key={step.num}
            className={`flex flex-1 flex-col gap-4 px-0 py-6 md:px-7 md:py-8 ${
              i < steps.length - 1
                ? "border-b border-border md:border-b-0 md:border-r"
                : ""
            } ${
              i === 1 ? "md:border-r-0 lg:border-r" : ""
            }`}
          >
            <span className="font-mono text-2xl font-medium text-accent-dim lg:text-[32px]">
              {step.num}
            </span>
            <h3 className="font-display text-xl font-bold tracking-[-0.3px] text-text-primary">
              {step.title}
            </h3>
            <p className="text-sm leading-[1.6] text-text-secondary">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
