import { ArrowRight } from "lucide-react";

export default function ButtonGhost({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 bg-transparent py-2 font-mono text-[11px] font-medium tracking-[1.5px] text-text-secondary transition-colors hover:text-text-primary">
      {label}
      <ArrowRight size={14} />
    </button>
  );
}
