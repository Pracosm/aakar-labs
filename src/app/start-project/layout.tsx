import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Build your scope with Aakar Labs. Pick brand identity, UX/UI, and development modules to get an indicative estimate, then send a brief — we reply within 24 hours.",
  alternates: { canonical: "/start-project" },
  openGraph: {
    title: `Start a Project | ${SITE_NAME}`,
    description:
      "Scope brand identity, UX/UI, and development with Aakar Labs. Get an indicative estimate and send a brief.",
    url: `${SITE_URL}/start-project`,
    type: "website",
  },
};

export default function StartProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Start a Project | Aakar Labs",
          url: `${SITE_URL}/start-project`,
          description:
            "Scope brand identity, UX/UI, and development work with Aakar Labs.",
          isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
          },
        }}
      />
      {children}
    </>
  );
}
