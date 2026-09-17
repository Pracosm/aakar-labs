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
  assert.match(selectedWork, /Visit foldingcompany\.design/);
  assert.match(selectedWork, /bg-\[#1CD1AD\]/);
  assert.doesNotMatch(selectedWork, /href="\/work\/the-folding-company"/);
});

test("long-form case study stays URL-only and out of the sitemap", async () => {
  const page = await source("../src/app/work/the-folding-company/page.tsx");
  const sitemap = await source("../src/app/sitemap.ts");

  assert.match(page, /index:\s*false/);
  assert.match(page, /follow:\s*false/);
  assert.doesNotMatch(sitemap, /work\/the-folding-company/);
});

test("hero image frames preserve each supplied asset ratio", async () => {
  const selectedWork = await source("../src/components/SelectedWork.tsx");
  const caseStudy = await source("../src/components/tfc/TfcCaseStudy.tsx");

  assert.match(selectedWork, /aspect-\[950\/1200\].*lg:aspect-\[1703\/1200\]/s);
  assert.match(caseStudy, /aspect-\[950\/1200\].*lg:aspect-\[1703\/1200\]/s);
});
