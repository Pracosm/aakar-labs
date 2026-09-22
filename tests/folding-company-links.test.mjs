import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function source(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

test("featured work points to the PDF and live Folding Company site", async () => {
  const selectedWork = await source("../src/components/SelectedWork.tsx");

  assert.match(selectedWork, /href="\/work\/tfc-brand-book\.pdf"/);
  assert.match(selectedWork, /View the case study PDF/);
  assert.match(selectedWork, /href="https:\/\/foldingcompany\.design\/"/);
  assert.match(selectedWork, /Visit [\s\S]*foldingcompany\.design/);
  assert.match(selectedWork, /bg-\[#f5efe3\]/);
  assert.doesNotMatch(selectedWork, /href="\/work\/the-folding-company"/);
});

test("selected work copy uses sentence case and identifies the external URL", async () => {
  const selectedWork = await source("../src/components/SelectedWork.tsx");

  assert.doesNotMatch(selectedWork, /SELECTED WORK/);
  assert.doesNotMatch(selectedWork, /\buppercase\b/);
  assert.match(
    selectedWork,
    /font-mono text-\[11px\] font-medium tracking-\[0\.03em\]">foldingcompany\.design<\/span>/,
  );
});

test("long-form case study stays URL-only and out of the sitemap", async () => {
  const page = await source("../src/app/work/the-folding-company/page.tsx");
  const sitemap = await source("../src/app/sitemap.ts");

  assert.match(page, /index:\s*false/);
  assert.match(page, /follow:\s*false/);
  assert.doesNotMatch(sitemap, /work\/the-folding-company/);
});

test("Folding Company card uses the compact shared project-image ratio on mobile", async () => {
  const selectedWork = await source("../src/components/SelectedWork.tsx");
  const caseStudy = await source("../src/components/tfc/TfcCaseStudy.tsx");

  assert.match(selectedWork, /aspect-\[4\/3\].*lg:absolute.*lg:inset-0/s);
  assert.match(caseStudy, /aspect-\[950\/1200\].*lg:aspect-\[1703\/1200\]/s);
});

test("hero headline has a deliberate two-line lockup", async () => {
  const hero = await source("../src/components/Hero.tsx");

  assert.match(hero, /hero-title-lockup/);
  assert.match(hero, /we design digital identities/);
  assert.match(hero, /that people remember/);
  assert.match(hero, /block whitespace-nowrap/);
});

test("work section keeps the motion layer visible behind a light blur", async () => {
  const selectedWork = await source("../src/components/SelectedWork.tsx");

  assert.match(selectedWork, /bg-\[rgba\(5,18,16,0\.38\)\]/);
  assert.match(selectedWork, /backdrop-blur-md/);
});
