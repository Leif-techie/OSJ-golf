/**
 * Hämtar öppen/stängd-status för golfbanor från golfstatus.nu
 * och uppdaterar src/courses.json.
 *
 * Körs av GitHub Action varje dag kl 05:00 UTC (07:00 CEST).
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "..", "src", "courses.json");

async function fetchOpenSlugs() {
  console.log("Hämtar öppna banor från golfstatus.nu...");
  const res = await fetch("https://golfstatus.nu", {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; golf-status-bot/1.0)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();

  // Extrahera alla /klubb/[slug] som förekommer på framsidan (= öppna banor)
  const slugSet = new Set();
  const regex = /\/klubb\/([a-z0-9\-]+)/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    slugSet.add(m[1]);
  }
  console.log(`Hittade ${slugSet.size} öppna banor.`);
  return slugSet;
}

async function main() {
  const openSlugs = await fetchOpenSlugs();

  const data = JSON.parse(readFileSync(DATA_PATH, "utf8"));
  let changed = 0;

  for (const course of data.courses) {
    if (!course.statusSlug) continue; // ingen golfstatus-koppling

    const isOpen = openSlugs.has(course.statusSlug);
    if (course.open !== isOpen) {
      console.log(
        `  ${course.name}: ${course.open === true ? "Öppen" : course.open === false ? "Stängd" : "Okänd"} → ${isOpen ? "Öppen" : "Stängd"}`
      );
      course.open = isOpen;
      changed++;
    }
  }

  // Uppdatera datum
  const today = new Date().toISOString().slice(0, 10);
  data.lastUpdated = today;

  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
  console.log(
    `\nKlart! ${changed} bana(or) fick ändrad status. Datum: ${today}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
