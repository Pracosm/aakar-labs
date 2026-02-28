import { ShieldCheck, Lock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SectionLabel from "./ui/SectionLabel";
import ButtonGhost from "./ui/ButtonGhost";
import Tag from "./ui/Tag";

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="flex w-full flex-col gap-12 px-5 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20"
    >
      {/* Header */}
      <div className="flex w-full flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-5">
          <SectionLabel code="AKR-003" label="SELECTED_WORK" />
          <h2 className="font-display text-2xl font-bold tracking-[-1px] text-text-primary md:text-3xl lg:text-[40px]">
            Recent projects.
          </h2>
        </div>
        <ButtonGhost label="ALL PROJECTS" />
      </div>

      {/* Work Cards */}
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <GradGuardCard />
        <DasmiCard />
      </div>
    </section>
  );
}

function GradGuardCard() {
  return (
    <Link
      href="/work/gradguard-ai"
      className="group flex flex-1 flex-col border border-border bg-bg-surface transition-shadow hover:shadow-[0_8px_30px_-4px_#00000010]"
    >
      {/* Thumbnail */}
      <div
        className="relative h-[260px] w-full overflow-hidden md:h-[320px] lg:h-[380px]"
        style={{
          background:
            "linear-gradient(145deg, #F5F0FF 0%, #EDE5FF 50%, #E8DEFF 100%)",
        }}
      >
        {/* Blurred deco */}
        <div
          className="absolute -left-10 top-[220px] hidden h-[180px] w-[180px] rounded-full opacity-30 md:block"
          style={{ background: "#C4B5FD", filter: "blur(60px)" }}
        />
        <div
          className="absolute left-[460px] top-[30px] hidden h-[140px] w-[140px] rounded-full opacity-25 md:block"
          style={{ background: "#F9A8D4", filter: "blur(50px)" }}
        />

        {/* Dots */}
        <div className="absolute left-[160px] top-[30px] hidden h-2.5 w-2.5 rounded-full bg-[#8B5CF6] md:block" />
        <div className="absolute left-[500px] top-[190px] hidden h-[7px] w-[7px] rounded-full bg-[#A78BFA] opacity-60 md:block" />
        <div className="absolute left-[80px] top-[330px] hidden h-3 w-3 rounded-full bg-[#C4B5FD] opacity-50 md:block" />

        {/* Phone mockups */}
        <div className="absolute left-[22px] top-[140px] hidden h-[736px] w-[340px] overflow-hidden rounded-3xl border border-[#E8E4F0] bg-white shadow-[0_16px_48px_-8px_#8B5CF620] md:block">
          <div className="flex h-full flex-col">
            {/* Phone header */}
            <div className="flex flex-col gap-4 p-5 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-[#6B7280]">Good morning</p>
                  <p className="text-base font-bold text-[#18181B]">Alex K.</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F4F4F5]">
                  <span className="text-sm">🔔</span>
                </div>
              </div>

              {/* Risk card */}
              <div className="flex items-center gap-4 rounded-3xl bg-[#8B5CF6] p-6">
                <div className="flex-1">
                  <p className="text-[10px] font-medium tracking-wider text-white/70">
                    RISK SCORE
                  </p>
                  <p className="text-3xl font-bold text-white">72</p>
                  <p className="text-[10px] text-white/60">Medium Risk</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                  <ShieldCheck size={24} className="text-white" />
                </div>
              </div>

              {/* Metric cards */}
              <div className="flex gap-3">
                <div className="flex-1 rounded-3xl bg-[#F4F4F5] p-5">
                  <p className="text-[10px] text-[#6B7280]">Posts Scanned</p>
                  <p className="text-xl font-bold text-[#18181B]">1,247</p>
                </div>
                <div className="flex-1 rounded-3xl bg-[#F4F4F5] p-5">
                  <p className="text-[10px] text-[#6B7280]">Flagged</p>
                  <p className="text-xl font-bold text-[#18181B]">23</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second phone (offset, partially hidden) */}
        <div className="absolute left-[382px] -top-[390px] hidden h-[736px] w-[340px] overflow-hidden rounded-3xl border border-[#E8E4F0] bg-white shadow-[0_16px_48px_-8px_#8B5CF620] md:block" />

        {/* Float badges */}
        <div
          className="absolute left-[50px] top-[60px] hidden flex-col items-center gap-1 rounded-xl bg-white px-3.5 py-2.5 shadow-[0_6px_20px_-4px_#8B5CF615] md:flex"
          style={{ transform: "rotate(-6deg)" }}
        >
          <ShieldCheck size={20} className="text-[#8B5CF6]" />
          <span className="text-[9px] font-semibold text-[#3B0764]">
            AI Scan
          </span>
        </div>
        <div
          className="absolute left-[420px] top-[100px] hidden items-center gap-1.5 rounded-[10px] bg-white px-3 py-2 shadow-[0_6px_20px_-4px_#8B5CF615] md:flex"
          style={{ transform: "rotate(5deg)" }}
        >
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
          <span className="text-[8px] font-semibold text-[#18181B]">
            5 Platforms
          </span>
        </div>
        <div
          className="absolute left-[425px] top-[261px] hidden items-center gap-1.5 rounded-[10px] bg-[#FEF2F2] px-3 py-2 shadow-[0_6px_20px_-4px_#EF444415] md:flex"
          style={{ transform: "rotate(-4deg)" }}
        >
          <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
          <span className="text-[8px] font-semibold text-[#DC2626]">
            3 High Risk
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-4 p-5 md:p-7">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-accent">
            01
          </span>
          <span className="font-mono text-[11px] font-medium tracking-[1px] text-text-tertiary">
            2025
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold tracking-[-0.5px] text-text-primary">
          GradGuard AI
        </h3>
        <p className="text-sm leading-[1.6] text-text-secondary">
          Mobile app design for an AI-powered social media risk auditing
          platform. 10 screens, onboarding flow, dashboard, and full design
          system.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Tag label="MOBILE APP" />
            <Tag label="UI/UX" />
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-[1px] text-accent transition-colors group-hover:text-accent-hover">
            VIEW CASE STUDY
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function DasmiCard() {
  return (
    <div className="flex flex-1 flex-col border border-border bg-bg-surface">
      {/* Thumbnail with lock overlay */}
      <div
        className="relative h-[260px] w-full overflow-hidden md:h-[320px] lg:h-[380px]"
        style={{
          background:
            "linear-gradient(155deg, #FFF8F0 0%, #F0F8FF 40%, #F5F0FF 70%, #FFF0F5 100%)",
        }}
      >
        {/* Blurred deco */}
        <div
          className="absolute left-0 top-[17px] hidden h-[200px] w-[200px] rounded-full opacity-20 md:block"
          style={{ background: "#FBBF24", filter: "blur(70px)" }}
        />
        <div
          className="absolute left-[470px] -top-[33px] hidden h-[160px] w-[160px] rounded-full opacity-25 md:block"
          style={{ background: "#A78BFA", filter: "blur(60px)" }}
        />
        <div
          className="absolute left-[500px] top-[247px] hidden h-[120px] w-[120px] rounded-full opacity-20 md:block"
          style={{ background: "#F9A8D4", filter: "blur(50px)" }}
        />

        {/* Deco stars */}
        <span
          className="absolute left-[250px] -top-[33px] hidden font-display text-[50px] font-bold text-[#FF5F1F] opacity-10 md:block"
          style={{ transform: "rotate(15deg)" }}
        >
          *
        </span>
        <span
          className="absolute left-[570px] top-[137px] hidden font-display text-[35px] font-bold text-[#FF5F1F] opacity-[0.08] md:block"
          style={{ transform: "rotate(-10deg)" }}
        >
          *
        </span>

        {/* Dots */}
        <div className="absolute left-[230px] top-3 hidden h-3 w-3 rounded-full bg-[#FF5F1F] md:block" />
        <div className="absolute left-[430px] -top-[13px] hidden h-2 w-2 rounded-full bg-[#A78BFA] opacity-70 md:block" />
        <div className="absolute left-[250px] top-[277px] hidden h-3.5 w-3.5 rounded-full bg-[#FBBF24] opacity-60 md:block" />

        {/* Plus */}
        <span className="absolute left-[350px] top-[117px] hidden font-display text-[30px] font-light text-[#D4D0E8] md:block">
          +
        </span>

        {/* Cutout cards */}
        <div
          className="absolute left-[80px] top-[67px] hidden h-[100px] w-[140px] flex-col gap-1.5 rounded-[14px] bg-[#FEF3C7] p-4 shadow-[0_6px_20px_-4px_#00000008] md:flex"
          style={{ transform: "rotate(-8deg)" }}
        >
          <span className="text-lg">☀️</span>
          <span className="font-display text-sm font-bold leading-[1.15] tracking-[-0.3px] text-[#78350F]">
            Lifestyle
            <br />
            by design.
          </span>
        </div>
        <div
          className="absolute left-[490px] top-[77px] hidden h-[90px] w-[130px] flex-col gap-1.5 rounded-[14px] bg-[#EDE9FE] p-4 shadow-[0_6px_20px_-4px_#00000008] md:flex"
          style={{ transform: "rotate(7deg)" }}
        >
          <span className="text-lg">🎨</span>
          <span className="font-display text-sm font-bold leading-[1.15] tracking-[-0.3px] text-[#3B0764]">
            Brand new
            <br />
            identity.
          </span>
        </div>
        <div
          className="absolute left-[110px] top-[217px] hidden h-20 w-[120px] flex-col gap-1 rounded-xl bg-[#DBEAFE] p-3.5 shadow-[0_6px_20px_-4px_#00000008] md:flex"
          style={{ transform: "rotate(10deg)" }}
        >
          <span className="font-display text-[13px] font-bold leading-[1.15] tracking-[-0.3px] text-[#1E3A5F]">
            Personal.
            <br />
            Polished.
          </span>
        </div>
        <div
          className="absolute left-[490px] top-[237px] hidden h-[75px] w-[110px] flex-col gap-1 rounded-xl bg-[#FFE4E6] p-3.5 shadow-[0_6px_20px_-4px_#00000008] md:flex"
          style={{ transform: "rotate(-6deg)" }}
        >
          <span className="text-base">❤️</span>
          <span className="font-display text-[13px] font-bold leading-[1.15] tracking-[-0.3px] text-[#9F1239]">
            Made with
            <br />
            care.
          </span>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#18181B] opacity-35" />

        {/* Lock Badge */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 rounded-2xl bg-white px-8 py-6 shadow-[0_8px_30px_-4px_#00000020]">
          <Lock size={28} className="text-[#18181B]" />
          <span className="font-mono text-xs font-semibold tracking-[3px] text-[#18181B]">
            COMING SOON
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-4 p-5 md:p-7">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-accent">
            02
          </span>
          <span className="font-mono text-[11px] font-medium tracking-[1px] text-text-tertiary">
            2025
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold tracking-[-0.5px] text-text-primary">
          Dasmi
        </h3>
        <p className="text-sm leading-[1.6] text-text-secondary">
          Brand identity and app design for a personal lifestyle platform.
          Visual language, component system, and end-to-end mobile experience.
        </p>
        <div className="flex gap-2">
          <Tag label="LIFESTYLE APP" />
          <Tag label="BRAND IDENTITY" />
        </div>
      </div>
    </div>
  );
}
