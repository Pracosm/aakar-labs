export default function SectionLabel({
  code,
  label,
}: {
  code: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="font-mono text-[10px] font-medium tracking-[2px]"
        style={{ color: "var(--coral)" }}
      >
        {code}
      </span>
      <span className="block h-px w-8 bg-[rgba(236,238,245,0.18)]" />
      <span className="font-mono text-[10px] font-medium tracking-[2px] text-[rgba(236,238,245,0.45)]">
        {label}
      </span>
    </div>
  );
}
