import SectionLabel from "./ui/SectionLabel";
import ButtonPrimary from "./ui/ButtonPrimary";
import ButtonOutline from "./ui/ButtonOutline";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="flex w-full flex-col items-center gap-10 bg-bg-page px-5 py-16 md:px-10 md:py-20 lg:px-16 lg:py-[100px]"
    >
      <SectionLabel code="AKR-005" label="GET_IN_TOUCH" />

      <h2 className="max-w-[800px] text-center font-display text-3xl font-bold leading-[1.15] tracking-[-1.5px] text-text-primary md:text-4xl lg:text-5xl">
        Ready to design something
        <br />
        your users will love?
      </h2>

      <p className="max-w-[500px] text-center text-sm leading-[1.7] text-text-secondary md:text-base">
        Tell us about your project. We respond within 24 hours
        with a scope, timeline, and deliverables outline.
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <ButtonPrimary label="START A PROJECT" href="/start-project" />
        <ButtonOutline label="BOOK A CALL" href="/start-project" />
      </div>

      <span className="font-mono text-[11px] font-medium tracking-[1px] text-text-tertiary">
        All deliverables are production-ready and handoff-ready.
      </span>
    </section>
  );
}
