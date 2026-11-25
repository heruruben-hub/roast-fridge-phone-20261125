// SPDX-License-Identifier: MIT
// One Line, One Laugh: Roast Your Fridge — make.fun entry.
// This program writes a single original one-line roast of my own phone
// to /output/entry.txt.
//
// Why this line lands: it mocks one specific, recognisable detail instead
// of a generic insult — a camera roll hoarding exactly 4,000 meme
// screenshots the owner will never open again. The punchline turns on a
// twist in the last few words: the roll is not a gallery or an archive,
// it is "a museum of bad decisions", which reframes the hoarding as a
// self-own — the phone is full because its owner keeps collecting jokes
// instead of deleting them. Short, concrete, and it reads cleanly aloud.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ROAST =
  "My phone says storage full while hoarding 4,000 meme screenshots I'll never open again — my camera roll is just a museum of bad decisions.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, and exactly one line.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

function validateRoast(text: string): void {
  if (text.length < MIN_LENGTH || text.length > MAX_LENGTH) {
    throw new Error(
      `Roast must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${text.length}`,
    );
  }
  // Exactly one line: no line feed, no carriage return, and splitting on
  // "\n" must yield a single segment, so a trailing newline would fail too.
  if (text.includes("\n") || text.includes("\r") || text.split("\n").length !== 1) {
    throw new Error("Roast must be exactly one line");
  }
  if (text.trim().length === 0) {
    throw new Error("Roast must not be only white space");
  }
}

validateRoast(ROAST);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ROAST, "utf8");

// Prove the file on disk is the roast that passed the gate: read it back
// and validate it again, so a write failure or stray newline cannot slip
// through silently.
const written = readFileSync("/output/entry.txt", "utf8");
validateRoast(written);
if (written !== ROAST) {
  throw new Error("Written entry does not match the validated roast");
}
console.log(`Wrote ${ROAST.length} characters to /output/entry.txt`);
