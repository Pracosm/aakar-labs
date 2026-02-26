import Link from "next/link";

export default function ButtonPrimary({
  label,
  href,
}: {
  label: string;
  href?: string;
}) {
  const className =
    "flex items-center justify-center gap-2 bg-accent px-7 py-3 font-mono text-[13px] font-semibold tracking-[1px] text-bg-page transition-colors hover:bg-accent-hover";

  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return <button className={className}>{label}</button>;
}
