import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("leadership carousel reveals readable descriptions and respects motion timing", async () => {
  const leadership = await readFile(
    new URL("../src/components/Leadership.tsx", import.meta.url),
    "utf8",
  );

  assert.match(leadership, /Design engineer focused on interface, code, craft, and taste/);
  assert.match(leadership, /const FIRST_CARD_DELAY = 2500/);
  assert.match(leadership, /const FOLLOWING_CARD_DELAY = 6500/);
  assert.match(leadership, /IntersectionObserver/);
  assert.match(leadership, /scrollIntoView\(\{[\s\S]*behavior: "smooth"/);
  assert.match(leadership, /prefers-reduced-motion/);
  assert.match(leadership, /leadership-description/);
});
