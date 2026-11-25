// Unsent: The Micro-Confession Sprint
// Writes one two-part micro-confession to /output/entry.txt.
// Deterministic: no input, no network, no randomness, no time.
// The entry is a single fixed string: a To: line naming who it was
// meant for, then the unsent message itself, exactly as it was typed.
// Nothing is added after the message — no explanation, no sign-off.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry, exactly as submitted. Keep byte-identical across edits:
// the To: line and the message need each other — the tap, the March
// promise and the fear of not being renewed only make sense together.
const ENTRY_TEXT =
  "To: my landlord\n" +
  "The tap you said you'd fix in March still drips at 3 a.m. and I stopped asking because I can't afford to be the tenant you don't renew.\n";

// The gate allows 1 to 260 characters; fail loudly instead of
// silently writing an entry the scorer would refuse.
if (ENTRY_TEXT.length < 1 || ENTRY_TEXT.length > 260) {
  throw new Error(`entry is ${ENTRY_TEXT.length} characters, outside the 1-260 gate`);
}

const outPath = process.argv[2] ?? process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY_TEXT, "utf8");
