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

function decodeXml(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

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

  const episodes = [];
  for (const entry of entries) {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([^<]*)<\/title>/)?.[1];
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
    if (!id || !title || !published) continue;
    episodes.push({
      id,
      title: decodeXml(title),
      url: `https://www.youtube.com/watch?v=${id}`,
      published,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      isShort: await isShort(id),
    });
  }

  episodes.sort((a, b) => new Date(b.published) - new Date(a.published));
  writeOut(episodes);

  const full = episodes.filter((e) => !e.isShort).length;
  console.log(
    `[fetch-episodes] OK: ${episodes.length} filmów (${full} odcinków, ${episodes.length - full} shortsów)`,
  );
}

main();
