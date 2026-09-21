import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function source(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

test("global typography uses IBM Plex Sans with readable measurements", async () => {
  const layout = await source("../src/app/layout.tsx");
  const css = await source("../src/app/globals.css");
  const navbar = await source("../src/components/Navbar.tsx");
  const footer = await source("../src/components/Footer.tsx");
  const process = await source("../src/components/Process.tsx");

  assert.match(layout, /IBM_Plex_Sans/);
  assert.match(layout, /--font-ibm-plex-sans/);
  assert.match(layout, /weight:\s*"variable"/);
  assert.match(css, /--font-body:\s*var\(--font-ibm-plex-sans\)/);
  assert.match(css, /max-width:\s*65ch/);
  assert.match(css, /line-height:\s*1\.65/);
  assert.doesNotMatch(layout, /Outfit/);
  assert.doesNotMatch(navbar, /font-sans/);
  assert.doesNotMatch(footer, /Outfit/);
  assert.doesNotMatch(process, /Outfit/);
});

test("background video can run on mobile with safe fallbacks", async () => {
  const background = await source("../src/components/BackgroundLayer.tsx");
  const css = await source("../src/app/globals.css");

  assert.doesNotMatch(background, /max-width:\s*767px/);
  assert.match(background, /prefers-reduced-motion/);
  assert.match(background, /connection\?\.saveData/);
  assert.match(background, /canPlayType\("video\/mp4"\)/);
  assert.match(background, /autoPlay/);
  assert.match(background, /loop/);
  assert.match(background, /muted/);
  assert.match(background, /playsInline/);
  assert.match(background, /preload="auto"/);
  assert.match(background, /video\s*\.play\(\)/);
  assert.match(background, /video\.pause\(\)/);
  assert.match(background, /IntersectionObserver/);
  assert.match(background, /getElementById\("work"\)/);
  assert.match(background, /workVisible/);
  assert.match(background, /videoReady/);
  assert.match(background, /videoError/);
  assert.match(css, /height:\s*100lvh/);
});
