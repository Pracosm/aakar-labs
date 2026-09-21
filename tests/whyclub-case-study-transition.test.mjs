import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function source(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

test("WhyClub case-study link uses a persistent panel expansion with native fallbacks", async () => {
  const selectedWork = await source("../src/components/SelectedWork.tsx");

  assert.match(selectedWork, /useWorkCaseStudyTransition/);
  assert.match(selectedWork, /whyClubPanelRef/);
  assert.match(selectedWork, /onClick=\{handleWhyClubCaseStudyClick\}/);
  assert.match(selectedWork, /event\.detail === 0/);
  assert.match(selectedWork, /event\.metaKey \|\| event\.ctrlKey \|\| event\.shiftKey \|\| event\.altKey/);
});

test("persistent transition provider covers the route change and honors reduced motion", async () => {
  const provider = await source("../src/components/WorkCaseStudyTransition.tsx");
  const layout = await source("../src/app/layout.tsx");
  const css = await source("../src/app/globals.css");
  const caseStudy = await source("../src/components/whyclub/WhyClubCaseStudy.tsx");

  assert.match(provider, /router\.prefetch\("\/work\/whyclub"\)/);
  assert.match(provider, /source\.getBoundingClientRect\(\)/);
  assert.match(provider, /window\.matchMedia\("\(prefers-reduced-motion: reduce\)"\)\.matches/);
  assert.match(provider, /isTransitioningRef\.current/);
  assert.match(provider, /if \(isTransitioningRef\.current\) \{\s*return true;\s*\}/s);
  assert.match(provider, /overlay\.animate\(/);
  assert.match(provider, /translate3d\(/);
  assert.match(provider, /scale\(/);
  assert.match(provider, /router\.push\(transition\.href\)/);
  assert.match(provider, /pathname !== transition\.href/);
  assert.match(provider, /setTransition\(null\)/);
  assert.match(provider, /aria-hidden="true"/);
  assert.match(layout, /<WorkCaseStudyTransitionProvider>/);
  assert.match(layout, /<PageTransition>\{children\}<\/PageTransition>/);
  assert.match(css, /\.work-case-study-transition-overlay[\s\S]*background:\s*#f3f3f0/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.page-transition/);
  assert.match(caseStudy, /bg-\[#f3f3f0\]/);
});

test("WhyClub route skips the generic page fade while its overlay is active", async () => {
  const provider = await source("../src/components/WorkCaseStudyTransition.tsx");
  const pageTransition = await source("../src/components/PageTransition.tsx");
  const selectedWork = await source("../src/components/SelectedWork.tsx");

  assert.match(provider, /skipPageRevealPath/);
  assert.match(provider, /skipPageReveal:/);
  assert.match(pageTransition, /useWorkCaseStudyTransition/);
  assert.match(pageTransition, /page-transition--instant/);
  assert.match(
    selectedWork,
    /ref=\{previewRef\}[\s\S]*?<div className="why-club-work-media absolute inset-0">/,
  );
});
