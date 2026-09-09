export default function SectionLabel({
  code,
  label,
}: {
  code: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs font-medium tracking-[0.16em] text-[color:var(--coral)] md:text-[10px] md:tracking-[2px]">
        {code}
      </span>
      <span className="block h-px w-8 bg-[rgba(236,238,245,0.18)]" />
      <span className="font-mono text-xs font-medium tracking-[0.16em] text-[rgba(236,238,245,0.7)] md:text-[10px] md:tracking-[2px] md:text-[rgba(236,238,245,0.45)]">
        {label}
      </span>
    </div>
  );
}
