export default function SectionLabel({
  code,
  label,
}: {
  code: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] font-medium tracking-[2px] text-accent">
        {code}
      </span>
      <span className="block h-px w-8 bg-border" />
      <span className="font-mono text-[10px] font-medium tracking-[2px] text-text-tertiary">
        {label}
      </span>
    </div>
  );
}
