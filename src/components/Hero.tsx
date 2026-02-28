import {
  PenTool,
  Package,
  Sparkles,
  Lightbulb,
  ArrowUpRight,
  ChevronDown,
  MousePointer2,
  Square,
  Type,
  Layers,
  ArrowRight,
} from "lucide-react";
import ButtonPrimary from "./ui/ButtonPrimary";
import ButtonOutline from "./ui/ButtonOutline";

export default function Hero() {
  return (
    <section
      className="relative h-auto min-h-[600px] w-full overflow-hidden lg:h-[920px]"
      style={{
        background:
          "linear-gradient(to top, #F0F4F8 0%, #F5F1EB 60%, #FDF6EC 100%)",
      }}
    >
      {/* ---- Animated Glow Circles ---- */}
      <div
        className="animate-glow-1 absolute -left-[82px] top-[39px] h-[200px] w-[200px] rounded-full opacity-25 md:h-[380px] md:w-[380px]"
        style={{ background: "#FFE0B2", filter: "blur(100px)" }}
      />
      <div
        className="animate-glow-2 absolute -top-[40px] right-[-30px] h-[160px] w-[160px] rounded-full opacity-30 md:h-[260px] md:w-[260px]"
        style={{ background: "var(--cutout-blue)", filter: "blur(100px)" }}
      />
      <div
        className="animate-glow-3 absolute right-[-20px] top-[400px] h-[120px] w-[120px] rounded-full opacity-35 md:h-[160px] md:w-[160px] lg:top-[680px]"
        style={{ background: "var(--cutout-pink)", filter: "blur(100px)" }}
      />

      {/* ---- Animated Dots ---- */}
      <div
        className="animate-dot-breathe absolute left-[20%] top-[90px] h-3 w-3 rounded-full bg-accent md:h-[18px] md:w-[18px] lg:left-[280px]"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="animate-dot-breathe absolute right-[60px] top-[150px] h-2.5 w-2.5 rounded-full opacity-80 md:h-3 md:w-3 lg:left-[1100px] lg:right-auto"
        style={{ background: "var(--cutout-lilac)", animationDelay: "1s" }}
      />
      <div
        className="animate-dot-breathe absolute bottom-[60px] left-[12%] h-4 w-4 rounded-full opacity-70 md:h-6 md:w-6 lg:bottom-auto lg:left-[180px] lg:top-[620px]"
        style={{ background: "var(--cutout-green)", animationDelay: "2s" }}
      />
      <div
        className="animate-dot-breathe absolute right-[30px] top-[55%] h-2 w-2 rounded-full bg-accent md:h-2.5 md:w-2.5 lg:right-auto lg:left-[1320px] lg:top-[440px]"
        style={{ animationDelay: "0.5s" }}
      />

      {/* ---- Animated Stars ---- */}
      <span
        className="animate-star-pulse absolute left-[20px] top-[20px] font-display text-[40px] font-bold text-[#FF5C1B] md:left-[60px] md:text-[60px] lg:text-[80px]"
        style={{
          transform: "rotate(15deg)",
          "--star-base-opacity": "0.15",
          "--star-peak-opacity": "0.28",
        } as React.CSSProperties}
      >
        *
      </span>
      <span
        className="animate-star-pulse absolute right-[20px] top-[120px] font-display text-[30px] font-bold text-[#FF5C1B] md:text-[40px] lg:right-[100px] lg:top-[200px] lg:text-[50px]"
        style={{
          transform: "rotate(-10deg)",
          animationDelay: "2.5s",
          "--star-base-opacity": "0.12",
          "--star-peak-opacity": "0.22",
        } as React.CSSProperties}
      >
        *
      </span>

      {/* ---- Floating Cutout Cards (md+) ---- */}
      <div className="hidden md:block">
        <CutoutBrand />
        <CutoutUX />
        <CutoutDev />
        <CutoutLaunch />
        <CutoutMotion />
        <CutoutStrategy />
        <CutoutTiny />
      </div>

      {/* ---- Mobile/Tablet: animated text entrance ---- */}
      <div className="relative z-10 flex flex-col items-center px-5 pb-16 pt-12 md:px-10 md:pt-16 lg:hidden">
        <h1 className="animate-hero-entrance w-full text-center font-display text-3xl font-bold leading-[1.05] tracking-[-1px] text-text-primary md:text-5xl md:tracking-[-2px]">
          We design digital experiences that stand out.
        </h1>
        <p className="animate-hero-entrance-d1 mt-6 max-w-[560px] text-center font-body text-sm leading-[1.65] text-text-secondary md:text-base">
          A design studio crafting interfaces, brands, and systems —
          handover-ready at industry standards.
        </p>
        <div className="animate-hero-entrance-d2 mt-8 flex flex-col items-center gap-3.5 sm:flex-row">
          <ButtonPrimary label="LET'S CREATE" href="/start-project" />
          <ButtonOutline label="SEE OUR WORK" href="#work" />
        </div>
      </div>

      {/* ---- Desktop: animated headline entrance ---- */}
      <h1 className="animate-hero-entrance absolute left-1/2 top-[95px] z-10 hidden w-[812px] -translate-x-1/2 text-center font-display text-[64px] font-bold leading-[1.05] tracking-[-2.5px] text-text-primary lg:block">
        We design digital experiences that stand out.
      </h1>

      {/* ---- Desktop: animated subline entrance ---- */}
      <p className="animate-hero-entrance-d1 absolute left-1/2 top-[260px] z-10 hidden w-[560px] -translate-x-1/2 text-center font-body text-[17px] leading-[1.65] text-text-secondary lg:block">
        A design studio crafting interfaces, brands, and
        <br />
        systems — handover-ready at industry standards.
      </p>

      {/* ---- Desktop: animated CTA entrance ---- */}
      <div className="animate-hero-entrance-d2 absolute left-1/2 top-[330px] z-10 hidden -translate-x-1/2 items-center gap-3.5 lg:flex">
        <ButtonPrimary label="LET'S CREATE" href="/start-project" />
        <ButtonOutline label="SEE OUR WORK" href="#work" />
      </div>

      {/* ---- Deco Plus — desktop only ---- */}
      <span className="absolute left-[24%] top-[380px] hidden font-display text-[40px] font-light text-[#D0CCC4] lg:block">
        +
      </span>
      <span className="absolute right-[22%] top-[600px] hidden font-display text-[30px] font-light text-[#D0CCC4] lg:block">
        +
      </span>

      {/* ---- App Screen Mockup with animated cursor ---- */}
      <div className="hidden lg:block">
        <AppScreenMockup />
      </div>

      {/* ---- Zigzag — desktop only ---- */}
      <span className="absolute left-1/2 top-[850px] hidden -translate-x-1/2 text-2xl font-light tracking-[6px] text-[#E0DCD4] opacity-50 lg:block">
        ~ ~ ~
      </span>

      {/* ---- Scroll Hint — bouncing ---- */}
      <div className="animate-bounce-hint absolute left-1/2 top-[870px] hidden -translate-x-1/2 flex-col items-center gap-1.5 lg:flex">
        <ChevronDown size={16} className="text-text-tertiary" />
        <span className="font-mono text-[9px] font-medium tracking-[1.5px] text-text-tertiary">
          scroll to explore
        </span>
      </div>
    </section>
  );
}

/* ---- Cutout Card Sub-Components (with float animation) ---- */

function CutoutBrand() {
  return (
    <div
      className="animate-card-float absolute left-[-30px] top-[180px] flex h-[200px] w-[280px] flex-col gap-3.5 rounded-2xl p-6 shadow-[0_8px_30px_-4px_#00000010]"
      style={{
        background: "var(--cutout-yellow)",
        transform: "rotate(-14deg)",
        "--float-duration": "6s",
        "--float-delay": "0s",
      } as React.CSSProperties}
    >
      <span className="inline-flex self-start rounded-full bg-[#3D352033] px-2 py-[3px] text-[10px] font-semibold text-[#3D3520]">
        Brand Identity
      </span>
      <span className="font-display text-2xl font-bold leading-[1.15] tracking-[-0.5px] text-[#2C2410]">
        Logos, type
        <br />
        systems &amp; color.
      </span>
      <ArrowUpRight size={20} className="text-[#2C2410]" />
    </div>
  );
}

function CutoutUX() {
  return (
    <div
      className="animate-card-float absolute left-[140px] top-[520px] flex h-[280px] w-[240px] flex-col gap-2.5 rounded-2xl p-6 shadow-[0_8px_30px_-4px_#00000010]"
      style={{
        background: "var(--cutout-pink)",
        transform: "rotate(8deg)",
        "--float-duration": "7s",
        "--float-delay": "1s",
      } as React.CSSProperties}
    >
      <PenTool size={28} className="text-[#8B3A3A]" />
      <span className="font-display text-[22px] font-bold leading-[1.15] tracking-[-0.3px] text-[#5C2020]">
        UX that
        <br />
        feels right
      </span>
      <span className="text-xs leading-[1.5] text-[#8B5050]">
        Wireframes, flows,
        <br />
        prototypes &amp; testing.
      </span>
    </div>
  );
}

function CutoutDev() {
  return (
    <div
      className="animate-card-float absolute right-[18px] top-[553px] flex h-[220px] w-[300px] flex-col gap-3 rounded-2xl p-6 shadow-[0_8px_30px_-4px_#00000010]"
      style={{
        background: "var(--cutout-blue)",
        transform: "rotate(-7deg)",
        "--float-duration": "5.5s",
        "--float-delay": "0.5s",
      } as React.CSSProperties}
    >
      <span className="font-mono text-xs font-semibold tracking-[3px] text-[#2B4A6B]">
        GRID
      </span>
      <span className="font-display text-[26px] font-bold leading-[1.15] tracking-[-0.5px] text-[#1A3550]">
        Layout &amp;
        <br />
        composition.
      </span>
      <span className="text-xs leading-[1.5] text-[#4A6A8A]">
        Grids, spacing, and hierarchy
        <br />
        that guide every pixel.
      </span>
    </div>
  );
}

function CutoutLaunch() {
  return (
    <div
      className="animate-card-float absolute right-[50px] top-[340px] flex h-[190px] w-[250px] flex-col gap-2.5 rounded-2xl p-6 shadow-[0_8px_30px_-4px_#00000010]"
      style={{
        background: "var(--cutout-green)",
        transform: "rotate(12deg)",
        "--float-duration": "6.5s",
        "--float-delay": "1.5s",
      } as React.CSSProperties}
    >
      <Package size={24} className="text-[#2D5E2D]" />
      <span className="font-display text-[28px] font-bold tracking-[-0.5px] text-[#1A3D1A]">
        Deliver.
      </span>
      <span className="text-xs leading-[1.5] text-[#3D6B3D]">
        Dev-ready assets, specs &amp;
        <br />
        organised handoff packages.
      </span>
    </div>
  );
}

function CutoutMotion() {
  return (
    <div
      className="animate-card-float absolute right-[40px] top-[100px] flex h-[170px] w-[220px] flex-col gap-2.5 rounded-2xl p-5 shadow-[0_6px_24px_-4px_#00000010]"
      style={{
        background: "var(--cutout-lilac)",
        transform: "rotate(-5deg)",
        "--float-duration": "5s",
        "--float-delay": "0.3s",
      } as React.CSSProperties}
    >
      <Sparkles size={22} className="text-[#5B3D7A]" />
      <span className="font-display text-xl font-bold leading-[1.15] tracking-[-0.3px] text-[#3D2060]">
        Motion &amp;
        <br />
        interaction
      </span>
      <span className="text-[11px] leading-[1.5] text-[#6B4D8A]">
        Transitions and micro-
        <br />
        interactions, fully specced.
      </span>
    </div>
  );
}

function CutoutStrategy() {
  return (
    <div
      className="animate-card-float absolute left-[47%] top-[660px] flex h-[160px] w-[200px] flex-col gap-2 rounded-2xl p-5 shadow-[0_6px_24px_-4px_#00000010]"
      style={{
        background: "var(--cutout-peach)",
        transform: "rotate(16deg)",
        "--float-duration": "7.5s",
        "--float-delay": "2s",
      } as React.CSSProperties}
    >
      <Lightbulb size={20} className="text-[#8B6020]" />
      <span className="font-display text-lg font-bold leading-[1.15] tracking-[-0.3px] text-[#5C3D10]">
        Research first,
        <br />
        design second.
      </span>
    </div>
  );
}

function CutoutTiny() {
  return (
    <div
      className="animate-card-float absolute -left-5 top-[560px] flex h-[120px] w-[160px] flex-col gap-1.5 rounded-xl p-4 shadow-[0_6px_20px_-4px_#00000010]"
      style={{
        background: "var(--cutout-yellow)",
        transform: "rotate(-20deg)",
        "--float-duration": "6s",
        "--float-delay": "0.8s",
      } as React.CSSProperties}
    >
      <span className="font-display text-xl font-bold leading-[1.1] tracking-[-0.3px] text-[#2C2410]">
        Pixel
        <br />
        perfect.
      </span>
      <span className="text-[11px] font-medium text-[#6B6030]">Always.</span>
    </div>
  );
}

/* ---- App Screen Mockup with animated cursor ---- */

function AppScreenMockup() {
  return (
    <div
      className="animate-mockup-rise absolute left-1/2 top-[400px] flex h-[400px] w-[640px] flex-col overflow-hidden rounded-2xl border border-[#E8E4DE] bg-white"
      style={{
        boxShadow: "0 24px 80px -8px #00000015, 0 1px 8px 0 #00000008",
      }}
    >
      {/* App Bar */}
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-border-subtle bg-[#FAFAF8] px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFD93D]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#6BCB77]" />
        </div>
        <span className="text-[11px] font-medium text-text-tertiary">
          Aakar Studio
        </span>
        <div className="flex items-center gap-3">
          <MousePointer2 size={14} className="text-text-tertiary" />
          <Square size={14} className="text-text-tertiary" />
          <Type size={14} className="text-text-tertiary" />
        </div>
      </div>

      {/* Canvas */}
      <div className="relative flex-1 bg-[#F7F5F0]">
        {/* Card */}
        <div className="absolute left-[30px] top-[30px] flex h-[140px] w-[200px] flex-col gap-2.5 rounded-xl border border-border-subtle bg-white p-4 shadow-[0_4px_12px_#00000008]">
          <span className="font-display text-sm font-bold tracking-[-0.3px] text-text-primary">
            App Redesign
          </span>
          <div className="h-1.5 w-full rounded-sm bg-border-subtle">
            <div className="h-full w-[120px] rounded-sm bg-accent" />
          </div>
          <span className="text-[10px] font-medium text-text-tertiary">
            In progress
          </span>
        </div>

        {/* Gradient Rectangle */}
        <div
          className="absolute left-[260px] top-[40px] h-[90px] w-[120px] rounded-[10px]"
          style={{
            background: "linear-gradient(135deg, #FF5C1B, #FFB347)",
            transform: "rotate(-3deg)",
            boxShadow: "0 4px 16px #FF5C1B20",
          }}
        />

        {/* Green Circle */}
        <div
          className="absolute left-[400px] top-[20px] h-20 w-20 rounded-full"
          style={{
            background: "radial-gradient(circle, #6BCB77, #2D8B4E)",
            boxShadow: "0 4px 12px #6BCB7720",
          }}
        />

        {/* Aa Text */}
        <span className="absolute left-[500px] top-[40px] font-display text-5xl font-bold text-text-primary opacity-60">
          Aa
        </span>

        {/* Animated Selection Box */}
        <div className="animate-selection-pulse absolute left-[257px] top-[37px] h-24 w-[126px] border-[1.5px] border-[#5B7FFF]" />
        {/* Selection Handles */}
        <div className="animate-selection-pulse absolute left-[253px] top-[33px] h-2 w-2 rounded-[1px] border-[1.5px] border-[#5B7FFF] bg-white" />
        <div className="animate-selection-pulse absolute left-[380px] top-[33px] h-2 w-2 rounded-[1px] border-[1.5px] border-[#5B7FFF] bg-white" />
        <div className="animate-selection-pulse absolute left-[253px] top-[130px] h-2 w-2 rounded-[1px] border-[1.5px] border-[#5B7FFF] bg-white" />
        <div className="animate-selection-pulse absolute left-[380px] top-[130px] h-2 w-2 rounded-[1px] border-[1.5px] border-[#5B7FFF] bg-white" />

        {/* Size Label */}
        <span className="absolute left-[290px] top-[140px] rounded-[3px] bg-[#5B7FFF] px-1.5 py-0.5 font-mono text-[9px] font-medium text-white">
          120 × 90
        </span>

        {/* Swatch Row */}
        <div className="absolute left-[30px] top-[200px] flex gap-2">
          {["#FF5C1B", "#1A1816", "#6BCB77", "#5B7FFF", "#FFD93D"].map(
            (c) => (
              <div
                key={c}
                className="h-9 w-9 rounded-lg"
                style={{ background: c }}
              />
            )
          )}
        </div>

        {/* Accent line */}
        <div className="absolute left-[260px] top-[160px] h-0.5 w-[180px] bg-accent opacity-50" />

        {/* Grid dots */}
        <span className="absolute left-[430px] top-[150px] text-sm leading-8 tracking-[8px] text-[#D0CCC4]">
          {"· · · · ·\n· · · · ·\n· · · · ·"}
        </span>

        {/* View project button */}
        <div className="absolute left-[260px] top-[190px] flex h-11 w-[140px] items-center justify-center gap-2 rounded-[10px] bg-text-primary shadow-[0_4px_12px_#1A181620]">
          <span className="text-[13px] font-semibold text-white">
            View project
          </span>
          <ArrowRight size={14} className="text-white" />
        </div>

        {/* Purple triangle shape */}
        <div
          className="absolute left-[440px] top-[180px] h-[60px] w-[60px] rounded"
          style={{
            background: "linear-gradient(45deg, #5B7FFF, #8B5CF6)",
            transform: "rotate(15deg)",
            boxShadow: "0 3px 10px #5B7FFF20",
          }}
        />

        {/* Layer label */}
        <div className="absolute left-[500px] top-[270px] flex items-center gap-1 rounded bg-text-primary px-2 py-1">
          <Layers size={12} className="text-white" />
          <span className="text-[9px] font-medium text-white">8 layers</span>
        </div>

        {/* ---- ANIMATED CURSOR ---- */}
        <div className="animate-cursor-wander absolute left-[190px] top-[260px]">
          <MousePointer2 size={18} className="text-text-primary" />
          <span className="absolute left-[15px] top-[15px] rounded-lg bg-accent px-2 py-[3px] text-[9px] font-semibold text-white">
            You
          </span>
        </div>
      </div>
    </div>
  );
}
