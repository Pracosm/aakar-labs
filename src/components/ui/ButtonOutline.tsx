import Link from "next/link";

export default function ButtonOutline({
  label,
  href,
  className = "",
}: {
  label: string;
  href?: string;
  className?: string;
}) {
  const baseClasses =
    "flex items-center justify-center gap-2 border border-border bg-transparent px-7 py-3 font-mono text-[13px] font-medium tracking-[1px] text-text-secondary transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-text-secondary hover:text-text-primary hover:shadow-xl active:scale-[0.98]";

  const finalClass = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={finalClass}>
        {label}
      </Link>
    );
  }

  return <button className={finalClass}>{label}</button>;
}
