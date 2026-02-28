import Link from "next/link";

export default function ButtonPrimary({
  label,
  href,
  className = "",
}: {
  label: string;
  href?: string;
  className?: string;
}) {
  const baseClasses =
    "flex items-center justify-center gap-2 bg-accent px-7 py-3 font-mono text-[13px] font-semibold tracking-[1px] text-bg-page transition-all duration-300 ease-out hover:-translate-y-[2px] hover:bg-accent-hover hover:shadow-xl active:scale-[0.98]";

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
