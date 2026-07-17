/**
 * Pobiera liczbe subskrybentow kanalu poCADuchy ze strony YouTube
 * (bez klucza API) i zapisuje do src/data/subscribers.json.
 *
 * Uruchamiane automatycznie przed `npm run build` / `npm run start`
 * (prebuild/prestart). Gdy siec albo parsowanie zawiedzie, zostaje
 * poprzedni JSON, a przy pierwszym uruchomieniu zapisujemy seed.
 */
import {writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const CHANNEL_URL = 'https://www.youtube.com/channel/UCatuUJWhqiOAiXhvb72wKOw';
const SEED_COUNT = 707;

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'src', 'data', 'subscribers.json');

function fail(msg) {
  if (existsSync(OUT_FILE)) {
    console.warn(`[fetch-subscribers] ${msg} - zostawiam poprzedni subscribers.json`);
    process.exit(0);
  }
  console.warn(`[fetch-subscribers] ${msg} - zapisuje seed`);
  try {
    writeOut({count: SEED_COUNT, display: String(SEED_COUNT)});
  } catch (e) {
    console.warn(`[fetch-subscribers] nie udalo sie zapisac seedu (${e.message})`);
  }
  process.exit(0);
}

function writeOut(data) {
  mkdirSync(dirname(OUT_FILE), {recursive: true});
  writeFileSync(
    OUT_FILE,
    JSON.stringify({...data, fetchedAt: new Date().toISOString()}, null, 2) + '\n',
  );
}

function decodeJsonString(s) {
  try {
    return JSON.parse(`"${s}"`);
  } catch {
    return s;
  }
}

function parseSubscriberCount(display) {
  const normalized = display.toLowerCase().replace(/\u00a0/g, ' ').trim();
  const match = normalized.match(/^([\d\s,.]+?)\s*(tys\.?|mln)?(?:\s|$)/u);
  if (!match) return null;

  const rawNumber = match[1].replace(/\s/g, '').replace(',', '.');
  const value = Number(rawNumber);
  if (!Number.isFinite(value)) return null;

  if (match[2]?.startsWith('tys')) return Math.round(value * 1000);
  if (match[2] === 'mln') return Math.round(value * 1000000);
  if (!/^\d+$/.test(rawNumber)) return null;
  return value;
}

async function main() {
  let html;
  try {
    const res = await fetch(CHANNEL_URL, {
      // SOCS=CAI omija strone zgod UE, ktora przekierowuje zamiast oddac HTML kanalu
      headers: {cookie: 'SOCS=CAI'},
    });
    if (!res.ok) return fail(`YouTube HTTP ${res.status}`);
    html = await res.text();
  } catch (e) {
    return fail(`brak sieci (${e.message})`);
  }

  const content = html.match(/"content":"([^"]*subskryb[^"]*)"/i)?.[1];
  if (!content) return fail('nie znaleziono liczby subskrybentow');

  const display = decodeJsonString(content);
  const count = parseSubscriberCount(display);
  if (!Number.isInteger(count)) return fail(`nie rozpoznano formatu liczby subskrybentow: ${display}`);

  writeOut({count, display});
  console.log(`[fetch-subscribers] OK: ${display} (${count})`);
}

main().catch((e) => fail(`blad skryptu (${e.message})`));
