/**
 * Hämtar öppen/stängd-status för golfbanor från golfstatus.nu
 * och uppdaterar src/courses.json.
 *
 * Körs av GitHub Action varje dag kl 05:00 UTC (07:00 CEST).
 *
 * Hämtar varje banas individuella sida för att få korrekt status –
 * framsidan på golfstatus.nu använder JavaScript-rendering och visar
 * bara en delmängd av öppna banor i den statiska HTML:en.
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "..", "src", "courses.json");

const DELAY_MS = 300; // paus mellan förfrågningar för att inte belasta servern

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchCourseStatus(slug) {
  const url = `https://golfstatus.nu/klubb/${slug}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; golf-status-bot/1.0)" },
  });
  if (!res.ok) {
    console.warn(`  Varning: HTTP ${res.status} för ${slug}`);
    return null;
  }
  const html = await res.text();

  // Individuella bansidor innehåller tydliga fraser i server-renderad HTML
  if (html.includes("öppen just nu")) return true;
  if (html.includes("stängd just nu") || html.includes("stängd för säsongen")) return false;

  // Fallback: leta efter "Öppen" respektive "Stängd" nära status-sektionen
  const statusMatch = html.match(/Status[\s\S]{0,200}?(Öppen|Stängd)/);
  if (statusMatch) return statusMatch[1] === "Öppen";

  return null; // okänd status
}

async function main() {
  const data = JSON.parse(readFileSync(DATA_PATH, "utf8"));
  let changed = 0;
  const courses = data.courses.filter((c) => c.statusSlug);

  console.log(`Kontrollerar status för ${courses.length} banor via golfstatus.nu...`);

  for (const course of courses) {
    const isOpen = await fetchCourseStatus(course.statusSlug);

    if (isOpen === null) {
      console.log(`  ${course.name}: status okänd – hoppar över`);
    } else if (course.open !== isOpen) {
      console.log(
        `  ${course.name}: ${course.open === true ? "Öppen" : course.open === false ? "Stängd" : "Okänd"} → ${isOpen ? "Öppen" : "Stängd"}`
      );
      course.open = isOpen;
      changed++;
    }

    await sleep(DELAY_MS);
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
