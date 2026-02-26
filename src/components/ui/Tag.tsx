export default function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center border border-border bg-transparent px-2.5 py-1 font-mono text-[10px] font-medium tracking-[1.5px] text-text-secondary">
      {label}
    </span>
  );
}
