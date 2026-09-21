import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

async function source(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

test("WhyClub case study uses the mobile-first sections and mobile glass navigation", async () => {
  const content = await source("../src/content/whyclub.mdx");
  const component = await source("../src/components/whyclub/WhyClubCaseStudy.tsx");

  assert.match(content, /Graphic system/);
  assert.match(content, /Mobile spotlight/);
  assert.match(content, /Responsive system/);
  assert.match(content, /From campaign image to checkout/);
  assert.match(component, /fixed inset-x-3 bottom-3/);
  assert.match(component, /backdrop-blur-xl/);
  assert.match(component, /safe-area-inset-bottom/);
  assert.match(component, /min-h-12/);
  assert.match(component, /navItems/);
  assert.match(component, /IntersectionObserver/);
  assert.match(component, /aria-current/);
});

test("WhyClub case study uses local current-store captures and reduced-motion-safe reveal behavior", async () => {
  const component = await source("../src/components/whyclub/WhyClubCaseStudy.tsx");

  assert.match(component, /prefers-reduced-motion: reduce/);
  assert.match(component, /storefront-desktop\.png/);
  assert.match(component, /category-desktop\.png/);
  assert.match(component, /products-desktop\.png/);
  assert.match(component, /storefront-mobile-hero\.png/);
  assert.match(component, /storefront-mobile-collection\.png/);
  assert.doesNotMatch(component, /whyclub-marquee-track/);
  assert.doesNotMatch(component, /d9ff3f/);

  await Promise.all([
    "storefront-desktop.png",
    "category-desktop.png",
    "products-desktop.png",
    "storefront-mobile-hero.png",
    "storefront-mobile-collection.png",
  ].map((file) => access(new URL(`../public/images/work/whyclub-case-study/${file}`, import.meta.url))),
  );
});
