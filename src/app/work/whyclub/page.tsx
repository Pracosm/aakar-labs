import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import WhyClub from "@/content/whyclub.mdx";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageUrl = `${SITE_URL}/work/whyclub`;

export const metadata: Metadata = {
  title: "WhyClub — D2C Streetwear Case Study",
  description:
    "Aakar Labs built WhyClub's rebellious identity and commerce system, from naming and art direction to the storefront, checkout, and operations dashboard.",
  alternates: { canonical: "/work/whyclub" },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: "WhyClub — D2C Streetwear Case Study",
    description:
      "A streetwear world built around one rule: perfect is boring.",
    images: [
      {
        url: `${SITE_URL}/images/work/whyclub-case-study/hero-desktop.webp`,
        width: 2754,
        height: 1536,
        alt: "WhyClub model wearing the Please I'm a Star collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhyClub — D2C Streetwear Case Study",
    description:
      "A streetwear world built around one rule: perfect is boring.",
    images: [`${SITE_URL}/images/work/whyclub-case-study/hero-desktop.webp`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "WhyClub — D2C Streetwear Case Study",
      description:
        "WhyClub's identity, art direction, storefront, checkout, and operations system by Aakar Labs.",
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      mainEntityOfPage: pageUrl,
      image: `${SITE_URL}/images/work/whyclub-case-study/hero-desktop.webp`,
      about: "D2C streetwear identity and commerce system for WhyClub",
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
          name: "WhyClub",
          item: pageUrl,
        },
      ],
    },
  ],
};

export default function WhyClubPage() {
  return (
    <div className="whyclub-page flex min-h-screen w-full flex-col">
      <JsonLd data={jsonLd} />
      <Navbar />
      <main id="main">
        <article className="whyclub-content">
          <WhyClub />
        </article>
      </main>
      <Footer />
    </div>
  );
}
