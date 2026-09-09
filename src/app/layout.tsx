import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Outfit, Roboto_Mono } from "next/font/google";
import "./globals.css";
import BackgroundLayer from "@/components/BackgroundLayer";
import LenisProvider from "@/components/LenisProvider";
import PageTransition from "@/components/PageTransition";
import JsonLd from "@/components/JsonLd";
import CalProvider from "@/components/CalProvider";
import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_SAME_AS,
  SITE_SERVICES,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Branding, UX/UI & Digital Identity Studio`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "design",
  keywords: [
    "Aakar Labs",
    "design studio",
    "brand identity",
    "UX UI design",
    "web design",
    "design systems",
    "digital identity",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Branding, UX/UI & Digital Identity Studio`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Branding, UX/UI & Digital Identity Studio`,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050509",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      email: SITE_EMAIL,
      sameAs: [...SITE_SAME_AS],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#studio`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/hero-poster.jpg`,
      description: SITE_DESCRIPTION,
      email: SITE_EMAIL,
      areaServed: "Worldwide",
      serviceType: [...SITE_SERVICES],
      slogan: SITE_TAGLINE,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} ${robotoMono.variable} antialiased`}
      >
        <JsonLd data={jsonLd} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <BackgroundLayer />
        <LenisProvider />
        <CalProvider />
        <div className="relative z-10">
          <PageTransition>{children}</PageTransition>
        </div>
      </body>
    </html>
  );
}
