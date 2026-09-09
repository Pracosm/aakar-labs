import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import TheFoldingCompany from "@/content/the-folding-company.mdx";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageUrl = `${SITE_URL}/work/the-folding-company`;

export const metadata: Metadata = {
  title: "The Folding Company — Brand Identity Case Study",
  description:
    "Aakar Labs built a flexible identity system for The Folding Company, from a geometric monogram and wordmark to applications and a complete brand book.",
  alternates: { canonical: "/work/the-folding-company" },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: "The Folding Company — Brand Identity Case Study",
    description:
      "A flexible identity system built from a single idea: give the form room to move.",
    images: [
      {
        url: `${SITE_URL}/images/work/tfc-case-study/hero.webp`,
        width: 1703,
        height: 1200,
        alt: "The Folding Company identity over a teal mountain landscape",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Folding Company — Brand Identity Case Study",
    description:
      "A flexible identity system built from a single idea: give the form room to move.",
    images: [`${SITE_URL}/images/work/tfc-case-study/hero.webp`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "The Folding Company — Brand Identity Case Study",
      description:
        "A flexible identity system built from a geometric monogram, a clear wordmark, and a visual language that moves across physical and digital touchpoints.",
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      mainEntityOfPage: pageUrl,
      image: `${SITE_URL}/images/work/tfc-case-study/hero.webp`,
      about: "Brand identity system for The Folding Company",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Work",
          item: `${SITE_URL}/#work`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "The Folding Company",
          item: pageUrl,
        },
      ],
    },
  ],
};

export default function TheFoldingCompanyPage() {
  return (
    <div className="tfc-page flex min-h-screen w-full flex-col">
      <JsonLd data={jsonLd} />
      <Navbar />
      <main id="main">
        <article className="tfc-content">
          <TheFoldingCompany />
        </article>
      </main>
      <Footer />
    </div>
  );
}
