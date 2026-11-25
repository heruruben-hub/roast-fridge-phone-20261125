// SPDX-License-Identifier: MIT
// One Line, One Laugh: Roast Your Fridge — make.fun entry.
// This program writes a single original one-line roast of my own phone
// to /output/entry.txt. The roast targets one specific, recognisable
// detail — a camera roll stuffed with meme screenshots — and lands its
// twist in the last few words.

import { mkdirSync, writeFileSync } from "node:fs";

const ROAST =
  "My phone says storage full while hoarding 4,000 meme screenshots I'll never open again — my camera roll is just a museum of bad decisions.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, and exactly one line.
if (ROAST.length < 1 || ROAST.length > 200) {
  throw new Error(`Roast must be 1-200 characters, got ${ROAST.length}`);
}
if (ROAST.includes("\n") || ROAST.includes("\r")) {
  throw new Error("Roast must be a single line");
}
if (ROAST.trim().length === 0) {
  throw new Error("Roast must not be only white space");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ROAST, "utf8");
console.log(`Wrote ${ROAST.length} characters to /output/entry.txt`);
