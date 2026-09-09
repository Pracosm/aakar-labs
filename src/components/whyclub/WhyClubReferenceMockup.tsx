import Image from "next/image";

const REFERENCE_SRC =
  "/images/work/whyclub-case-study/whyclub-handheld-reference.png";

type WhyClubReferenceMockupProps = {
  alt: string;
  className?: string;
  priority?: boolean;
  sizes: string;
};

export function WhyClubReferenceMockup({
  alt,
  className = "",
  priority = false,
  sizes,
}: WhyClubReferenceMockupProps) {
  return (
    <Image
      src={REFERENCE_SRC}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`whyclub-reference-image object-contain ${className}`}
    />
  );
}
