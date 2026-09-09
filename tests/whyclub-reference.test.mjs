import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const assetPath = fileURLToPath(
  new URL(
    "../public/images/work/whyclub-case-study/whyclub-handheld-reference.png",
    import.meta.url,
  ),
);

test("handheld reference asset keeps its 4:3 frame for both responsive views", async () => {
  const png = await readFile(assetPath);
  assert.equal(png.toString("ascii", 1, 4), "PNG");
  assert.equal(png.readUInt32BE(16), 1448);
  assert.equal(png.readUInt32BE(20), 1086);
  assert.ok(Math.abs(png.readUInt32BE(16) / png.readUInt32BE(20) - 4 / 3) < 0.01);
  assert.equal(path.basename(assetPath), "whyclub-handheld-reference.png");
});
