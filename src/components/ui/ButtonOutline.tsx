import Link from "next/link";

export default function ButtonOutline({
  label,
  href,
}: {
  label: string;
  href?: string;
}) {
  const className =
    "flex items-center justify-center gap-2 border border-border bg-transparent px-7 py-3 font-mono text-[13px] font-medium tracking-[1px] text-text-secondary transition-colors hover:border-text-secondary";

  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return <button className={className}>{label}</button>;
}
