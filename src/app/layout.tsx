import type { Metadata } from "next";
import { Space_Grotesk, Outfit, Roboto_Mono } from "next/font/google";
import "./globals.css";
import BackgroundLayer from "@/components/BackgroundLayer";
import LenisProvider from "@/components/LenisProvider";
import PageTransition from "@/components/PageTransition";

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
  title: "Aakar Labs — Design Studio",
  description:
    "A design studio crafting interfaces, brands, and systems — handover-ready at industry standards.",
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
        <BackgroundLayer />
        <LenisProvider />
        <div className="relative z-10">
          <PageTransition>{children}</PageTransition>
        </div>
      </body>
    </html>
  );
}
