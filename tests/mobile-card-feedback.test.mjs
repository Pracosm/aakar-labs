import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function source(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

test("magnetic wrappers keep layout without cursor-following motion", async () => {
  const magnetic = await source("../src/components/Magnetic.tsx");
  const hero = await source("../src/components/Hero.tsx");

  assert.doesNotMatch(magnetic, /requestAnimationFrame|mousemove|translate3d/);
  assert.match(hero, /mx-auto[\s\S]*items-center/);
  assert.match(hero, /max-w-\[18rem\]/);
  assert.match(hero, /pb-\[clamp\(1\.5rem,6vh,4rem\)\]/);
  assert.match(hero, /href="#work"/);
  assert.match(hero, /Scroll to view selected work/);
});

test("featured-work card actions and mobile image fades are centered", async () => {
  const selectedWork = await source("../src/components/SelectedWork.tsx");

  assert.match(
    selectedWork,
    /View the case study PDF[\s\S]*?<ArrowUpRight|justify-center[\s\S]*?View the case study PDF/,
  );
  assert.match(selectedWork, /from-\[#f3f3f0\][\s\S]*to-transparent[\s\S]*lg:hidden/);
});

test("WhyClub card uses concise copy and visible project metadata", async () => {
  const selectedWork = await source("../src/components/SelectedWork.tsx");

  assert.match(selectedWork, /brand, product experience, full-stack store/);
  assert.match(selectedWork, /<Storefront[\s\S]*Full-stack/);
  assert.match(selectedWork, /<CalendarBlank[\s\S]*2026/);
  assert.match(selectedWork, /<GlobeSimple[\s\S]*Live/);
  assert.doesNotMatch(selectedWork, /hidden grid-cols-3/);
});
