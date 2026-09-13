/**
 * Pobiera listę filmów kanału poCADuchy z publicznego feedu RSS YouTube
 * (bez klucza API) i zapisuje do src/data/episodes.json.
 *
 * Uruchamiane automatycznie przed `npm run build` / `npm run start`
 * (prebuild/prestart). Gdy sieć zawiedzie, zostaje poprzedni JSON —
 * build nigdy się przez to nie wywala.
 *
 * Shortsy wykrywamy requestem HEAD na youtube.com/shorts/<id>:
 * dla shortsa YouTube odpowiada 200, dla zwykłego filmu przekierowuje.
 */
import {readFileSync, writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const CHANNEL_ID = 'UCatuUJWhqiOAiXhvb72wKOw'; // youtube.com/@pocaduchy
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '..', 'src', 'data', 'episodes.json');

function fail(msg) {
  if (existsSync(OUT_FILE)) {
    console.warn(`[fetch-episodes] ${msg} — zostawiam poprzedni episodes.json`);
    process.exit(0);
  }
  console.warn(`[fetch-episodes] ${msg} — zapisuję pustą listę`);
  writeOut([]);
  process.exit(0);
}

function writeOut(episodes) {
  mkdirSync(dirname(OUT_FILE), {recursive: true});
  writeFileSync(
    OUT_FILE,
    JSON.stringify({fetchedAt: new Date().toISOString(), channelId: CHANNEL_ID, episodes}, null, 2) + '\n',
  );
}

function wczytajArchiwum() {
  if (!existsSync(OUT_FILE)) return [];
  try {
    return JSON.parse(readFileSync(OUT_FILE, 'utf8')).episodes || [];
  } catch {
    return [];
  }
}

function decodeXml(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

// Tytuły transmisji na żywo. Łukasz nie chce ich w archiwum odcinków.
const JEST_TRANSMISJA = /transmisja na żywo|na żywo|live|livestream/i;

async function isShort(videoId) {
  try {
    const res = await fetch(`https://www.youtube.com/shorts/${videoId}`, {
      method: 'HEAD',
      redirect: 'manual',
      // SOCS=CAI omija stronę zgód UE, która przekierowuje wszystko na 302
      headers: {cookie: 'SOCS=CAI'},
    });
    return res.status === 200; // zwykły film → 303 na /watch
  } catch {
    return false; // w razie wątpliwości traktuj jak pełny odcinek
  }
}

async function main() {
  let xml;
  try {
    const res = await fetch(FEED_URL);
    if (!res.ok) return fail(`RSS HTTP ${res.status}`);
    xml = await res.text();
  } catch (e) {
    return fail(`brak sieci (${e.message})`);
  }

  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1]);
  if (entries.length === 0) return fail('feed bez wpisów');

  let pominieteTransmisje = 0;
  const episodes = [];
  for (const entry of entries) {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([^<]*)<\/title>/)?.[1];
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
    if (!id || !title || !published) continue;
    // Transmisje na żywo pomijamy całkowicie: mają robocze tytuły, nie wnoszą
    // treści do archiwum i psują listę odcinków oraz dane strukturalne.
    if (JEST_TRANSMISJA.test(decodeXml(title))) {
      pominieteTransmisje++;
      continue;
    }
    episodes.push({
      id,
      title: decodeXml(title),
      url: `https://www.youtube.com/watch?v=${id}`,
      published,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      isShort: await isShort(id),
    });
  }

  // RSS YouTube zwraca tylko kilkanaście najnowszych filmów. Starsze wypadają
  // z feedu, ale ich strony odcinków nadal istnieją i biorą stąd datę oraz
  // miniaturę do danych strukturalnych. Dlatego nie nadpisujemy archiwum,
  // tylko je aktualizujemy: to, co jest w feedzie, zastępuje zapisany rekord,
  // a to, czego w feedzie już nie ma, zostaje.
  const zFeedu = new Set(episodes.map((e) => e.id));
  const archiwum = wczytajArchiwum().filter((e) => e && e.id && !zFeedu.has(e.id));
  const wszystkie = [...episodes, ...archiwum];

  wszystkie.sort((a, b) => new Date(b.published) - new Date(a.published));
  writeOut(wszystkie);

  const full = wszystkie.filter((e) => !e.isShort).length;
  console.log(
    `[fetch-episodes] OK: ${wszystkie.length} filmów, w tym ${archiwum.length} z archiwum (${full} odcinków, ${wszystkie.length - full} shortsów` +
      `${pominieteTransmisje ? `, pominięto ${pominieteTransmisje} transmisji na żywo` : ''})`,
  );
}

main();
