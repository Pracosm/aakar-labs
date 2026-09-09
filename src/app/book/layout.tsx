import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Book a call with Aakar Labs. Pick a time and we'll talk through your brand, product, or web project.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: `Book a Call | ${SITE_NAME}`,
    url: `${SITE_URL}/book`,
    type: "website",
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
