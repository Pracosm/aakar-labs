import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("Cal buttons use Aakar's 15-minute namespaced booking embed", async () => {
  const button = await readFile(
    new URL("../src/components/BookCallButton.tsx", import.meta.url),
    "utf8",
  );
  const provider = await readFile(
    new URL("../src/components/CalProvider.tsx", import.meta.url),
    "utf8",
  );

  assert.match(button, /data-cal-link=\{CAL_LINK\}/);
  assert.match(button, /data-cal-namespace=\{CAL_NAMESPACE\}/);
  assert.match(button, /useSlotsViewOnSmallScreen/);
  assert.match(provider, /CAL_NAMESPACE/);
  assert.match(provider, /forwardQueryParams = true/);
  assert.doesNotMatch(button, /rick-get-rick-rolled|rick\/get-rick-rolled/);
});
