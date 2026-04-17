// Generates data.json + schedule.md from data.js + details.js
// Run: node build-data.mjs
import { readFileSync, writeFileSync } from "node:fs";

const evalJs = (path) => {
  const src = readFileSync(path, "utf8");
  const exports = {};
  new Function("exports", src.replace(/^const /gm, "exports.").replace(/;$/gm, ";"))(exports);
  return exports;
};

const { TRACKS, TALKS } = evalJs("./data.js");
const { DETAILS } = evalJs("./details.js");

const enriched = TALKS.map((t) => {
  const d = DETAILS?.[t.id];
  return d?.desc ? { ...t, desc: d.desc } : t;
});

writeFileSync(
  "./data.json",
  JSON.stringify({ conference: "CityJS London 2026", day: "Day 3", date: "2026-04-17", venue: "Kensington Town Hall, London W8 7NX", tracks: TRACKS, talks: enriched }, null, 2) + "\n"
);

const lines = ["# CityJS London 2026 — Day 3 (Fri 17 April)", "", "Venue: Kensington Town Hall, London W8 7NX", ""];
for (const [num, tr] of Object.entries(TRACKS)) {
  lines.push(`## Track ${num} — ${tr.name} (${tr.location})`, "");
  for (const t of enriched.filter((x) => x.track == num)) {
    const speaker = t.speaker ? ` — **${t.speaker}**${t.org ? ` (${t.org})` : ""}` : "";
    lines.push(`- \`${t.start}–${t.end}\` ${t.title}${speaker}`);
    if (t.desc) lines.push(`  > ${t.desc.replace(/\n/g, " ")}`);
  }
  lines.push("");
}
writeFileSync("./schedule.md", lines.join("\n"));

console.log(`wrote data.json (${enriched.length} talks) + schedule.md`);
