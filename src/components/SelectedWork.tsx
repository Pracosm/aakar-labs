import { ShieldCheck, Lock, ArrowUpRight, Bell, Settings, Filter, Home, Search } from "lucide-react";
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
        className="relative flex w-full items-center justify-center overflow-hidden h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]"
        style={{
          background:
            "linear-gradient(145deg, #F5F0FF 0%, #EDE5FF 50%, #E8DEFF 100%)",
        }}
      >
        {/* Blurred deco */}
        <div
          className="absolute -bottom-10 -left-10 h-[180px] w-[180px] rounded-full opacity-40 blur-[50px] md:opacity-30 md:blur-[60px]"
          style={{ background: "#C4B5FD" }}
        />
        <div
          className="absolute -right-10 -top-10 h-[140px] w-[140px] rounded-full opacity-40 blur-[40px] md:opacity-25 md:blur-[50px]"
          style={{ background: "#F9A8D4" }}
        />

        {/* Scaler for phones & elements */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-[45%] scale-[0.30] items-start justify-center gap-8 sm:scale-[0.40] md:scale-[0.48] lg:scale-[0.52] xl:scale-[0.60]">

          {/* Dashboard Phone */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative h-[736px] w-[340px] overflow-hidden rounded-[40px] bg-[#FFFFFF] shadow-[0_32px_80px_-16px_#8B5CF640] border-[6px] border-[#F9F9F9]">
              <div className="flex h-full flex-col p-6">
                {/* Header */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Hey, Name 👋</p>
                    <p className="text-[22px] font-bold tracking-tight text-gray-900">Your Dashboard</p>
                  </div>
                  <Bell className="text-gray-400" size={20} />
                </div>

                {/* Big purple card */}
                <div className="relative mt-6 overflow-hidden rounded-[28px] bg-[#8B5CF6] p-6">
                  <div className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-medium text-white">Overall Risk</div>
                  <h2 className="mb-1 text-[40px] font-bold leading-none tracking-tight text-white">Medium</h2>
                  <p className="text-[11px] text-white/80">5 posts flagged · Last scan: Jan 24</p>
                  <ShieldCheck className="absolute right-6 top-[50%] -translate-y-1/2 text-white/40" size={48} strokeWidth={1.5} />
                </div>

                {/* Stat boxes */}
                <div className="mt-4 flex gap-4">
                  <div className="flex-1 rounded-[24px] bg-[#F8F9FA] p-5">
                    <h3 className="text-2xl font-bold text-gray-900">3</h3>
                    <p className="mt-1 text-xs text-gray-500">High Risk</p>
                  </div>
                  <div className="flex-1 rounded-[24px] bg-[#F8F9FA] p-5">
                    <h3 className="text-2xl font-bold text-gray-900">432</h3>
                    <p className="mt-1 text-xs text-gray-500">Posts Scanned</p>
                  </div>
                </div>

                {/* Platform breakdown */}
                <div className="mt-4 rounded-[28px] bg-[#F8F9FA] p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">Platform Breakdown</h4>
                    <span className="text-xs text-[#8B5CF6]">See all</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Instagram</span>
                      <span className="font-medium text-[#EF4444]">4 flagged</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Twitter / X</span>
                      <span className="font-medium text-[#F59E0B]">1 flagged</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">TikTok</span>
                      <span className="font-medium text-[#F59E0B]">1 flagged</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Nav */}
                <div className="mb-2 mt-auto flex justify-between gap-4">
                  <div className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#8B5CF6] py-3.5 text-white">
                    <Home size={16} />
                    <span className="text-sm font-medium">Home</span>
                  </div>
                  <div className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#F4F4F5] py-3.5 text-gray-600">
                    <Search size={16} />
                    <span className="text-sm font-medium">Audit</span>
                  </div>
                </div>
              </div>
            </div>
            <span className="font-mono text-[10px] font-semibold tracking-[4px] text-[#A78BFA]/70">HOME DASHBOARD</span>
          </div>

          {/* Audit Phone */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative h-[736px] w-[340px] overflow-hidden rounded-[40px] bg-[#FFFFFF] shadow-[0_32px_80px_-16px_#8B5CF640] border-[6px] border-[#F9F9F9]">
              <div className="flex h-full flex-col p-6">
                {/* Header */}
                <div className="mt-4 flex items-center justify-between">
                  <h1 className="text-[28px] font-bold tracking-tight text-gray-900">Audit</h1>
                  <Settings className="text-gray-400" size={20} />
                </div>

                {/* Risk boxes */}
                <div className="mt-6 flex gap-3">
                  <div className="flex flex-1 flex-col items-center justify-center rounded-[20px] bg-[#FEF2F2] py-4">
                    <span className="text-2xl font-bold text-[#DC2626]">3</span>
                    <span className="mt-1 text-[10px] font-medium text-[#DC2626]">High</span>
                  </div>
                  <div className="flex flex-1 flex-col items-center justify-center rounded-[20px] bg-[#FEF3C7] py-4">
                    <span className="text-2xl font-bold text-[#D97706]">1</span>
                    <span className="mt-1 text-[10px] font-medium text-[#D97706]">Medium</span>
                  </div>
                  <div className="flex flex-1 flex-col items-center justify-center rounded-[20px] bg-[#D1FAE5] py-4">
                    <span className="text-2xl font-bold text-[#059669]">1</span>
                    <span className="mt-1 text-[10px] font-medium text-[#059669]">Low</span>
                  </div>
                </div>

                {/* List header */}
                <div className="mt-6 flex items-center justify-between">
                  <h4 className="text-[15px] font-bold text-gray-900">5 Flagged Posts</h4>
                  <Filter className="text-gray-400" size={16} />
                </div>

                {/* Pills */}
                <div className="mt-4 flex gap-2">
                  <span className="rounded-full bg-[#8B5CF6] px-4 py-1.5 text-xs text-white">All</span>
                  <span className="rounded-full bg-[#F4F4F5] px-4 py-1.5 text-xs text-gray-600">High</span>
                  <span className="rounded-full bg-[#F4F4F5] px-4 py-1.5 text-xs text-gray-600">Medium</span>
                  <span className="rounded-full bg-[#F4F4F5] px-4 py-1.5 text-xs text-gray-600">Low</span>
                </div>

                {/* List items */}
                <div className="mt-5 flex flex-col gap-2.5">
                  <div className="flex items-center gap-3 rounded-2xl bg-[#FEF2F2]/60 p-4">
                    <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                    <span className="text-sm text-gray-800">Party photo with alcohol</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-[#FEF2F2]/60 p-4">
                    <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                    <span className="text-sm text-gray-800">Controversial political take</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-[#FEF2F2]/60 p-4">
                    <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                    <span className="text-sm text-gray-800">Inappropriate meme share</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-[#FEF3C7]/60 p-4">
                    <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                    <span className="text-sm text-gray-800">Questionable group photo</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-[#D1FAE5]/60 p-4">
                    <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                    <span className="text-sm text-gray-800">Old edgy tweet liked</span>
                  </div>
                </div>

                {/* View Audit Report & nav */}
                <div className="mb-2 mt-auto flex flex-col gap-4">
                  <button className="w-full rounded-[20px] bg-[#8B5CF6] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#7c3aed]">
                    View Audit Report
                  </button>

                  <div className="flex justify-between gap-4">
                    <div className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#F4F4F5] py-3.5 text-gray-600">
                      <Home size={16} />
                      <span className="text-sm font-medium">Home</span>
                    </div>
                    <div className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#8B5CF6] py-3.5 text-white">
                      <Search size={16} />
                      <span className="text-sm font-medium">Audit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className="font-mono text-[10px] font-semibold tracking-[4px] text-[#A78BFA]/70">AUDIT SCREEN</span>
          </div>
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
        className="relative flex h-[260px] w-full  items-center justify-center overflow-hidden sm:h-[320px] md:h-[380px] lg:h-[420px]"
        style={{
          background:
            "linear-gradient(155deg, #FFF8F0 0%, #F0F8FF 40%, #F5F0FF 70%, #FFF0F5 100%)",
        }}
      >
        {/* Blurred deco */}
        <div
          className="absolute -bottom-10 -left-10 h-[200px] w-[200px] rounded-full opacity-30 blur-[60px]"
          style={{ background: "#FBBF24" }}
        />
        <div
          className="absolute -right-10 -top-10 h-[160px] w-[160px] rounded-full opacity-35 blur-[50px]"
          style={{ background: "#A78BFA" }}
        />

        {/* Scaler for composition */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 scale-[0.45] sm:scale-[0.55] md:scale-[0.65] lg:scale-[0.75] xl:scale-[0.85]">

          {/* Deco stars */}
          <span
            className="absolute left-[100px] top-[50px] font-display text-[60px] font-bold text-[#FF5F1F] opacity-15"
            style={{ transform: "rotate(15deg)" }}
          >
            *
          </span>
          <span
            className="absolute left-[540px] top-[200px] font-display text-[45px] font-bold text-[#FF5F1F] opacity-10"
            style={{ transform: "rotate(-10deg)" }}
          >
            *
          </span>

          {/* Dots */}
          <div className="absolute left-[200px] top-[80px] h-4 w-4 rounded-full bg-[#FF5F1F]" />
          <div className="absolute left-[500px] top-[40px] h-3 w-3 rounded-full bg-[#A78BFA] opacity-80" />
          <div className="absolute left-[180px] top-[320px] h-4 w-4 rounded-full bg-[#FBBF24] opacity-70" />

          {/* Plus */}
          <span className="absolute left-[340px] top-[140px] font-display text-[40px] font-light text-[#D4D0E8]">
            +
          </span>

          {/* Cutout cards */}
          <div
            className="absolute left-[80px] top-[80px] flex h-[140px] w-[180px] flex-col gap-2 rounded-[20px] bg-[#FEF3C7] p-5 shadow-[0_8px_30px_-4px_#00000008]"
            style={{ transform: "rotate(-8deg)" }}
          >
            <span className="text-3xl">☀️</span>
            <span className="font-display text-lg font-bold leading-[1.15] tracking-[-0.3px] text-[#78350F]">
              Lifestyle
              <br />
              by design.
            </span>
          </div>
          <div
            className="absolute left-[480px] top-[100px] flex h-[120px] w-[160px] flex-col gap-2 rounded-[20px] bg-[#EDE9FE] p-5 shadow-[0_8px_30px_-4px_#00000008]"
            style={{ transform: "rotate(7deg)" }}
          >
            <span className="text-2xl">🎨</span>
            <span className="font-display text-base font-bold leading-[1.15] tracking-[-0.3px] text-[#3B0764]">
              Brand new
              <br />
              identity.
            </span>
          </div>
          <div
            className="absolute left-[140px] top-[300px] flex h-[100px] w-[150px] flex-col gap-1.5 rounded-[16px] bg-[#DBEAFE] p-4 shadow-[0_8px_30px_-4px_#00000008]"
            style={{ transform: "rotate(10deg)" }}
          >
            <span className="font-display text-sm font-bold leading-[1.15] tracking-[-0.3px] text-[#1E3A5F]">
              Personal.
              <br />
              Polished.
            </span>
          </div>
          <div
            className="absolute left-[450px] top-[320px] flex h-[100px] w-[140px] flex-col gap-1.5 rounded-[16px] bg-[#FFE4E6] p-4 shadow-[0_8px_30px_-4px_#00000008]"
            style={{ transform: "rotate(-6deg)" }}
          >
            <span className="text-2xl">❤️</span>
            <span className="font-display text-sm font-bold leading-[1.15] tracking-[-0.3px] text-[#9F1239]">
              Made with
              <br />
              care.
            </span>
          </div>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#18181B] opacity-35" />

        {/* Lock Badge */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 scale-[0.85] sm:scale-100 flex-col items-center gap-3 rounded-2xl bg-white px-8 py-6 shadow-[0_8px_30px_-4px_#00000020]">
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
