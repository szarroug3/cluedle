// Every screen module loads. They're only run in the browser, so this catches a file that won't
// even parse before it reaches the page.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";

for (const file of readdirSync(new URL("../src/ui/", import.meta.url)).filter((f) => f.endsWith(".js"))) {
  test(`src/ui/${file} loads`, async () => {
    await assert.doesNotReject(import(`../src/ui/${file}`));
  });
}
