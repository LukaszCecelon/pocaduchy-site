/**
 * Wyłącza reklamy AdSense na stronie błędu 404 (uruchamiane po buildzie).
 *
 * Polityka Google AdSense zabrania wyświetlania reklam na ekranach bez
 * treści wydawcy — strony błędu są wymienione wprost. Skrypt reklam nie jest
 * wpięty na sztywno: ładuje go loader window.pcReklamy z <head>
 * (docusaurus.config.js), dopiero po zgodzie na reklamy. Loader trafia na
 * KAŻDĄ stronę, więc w 404.html wstawiamy na początku <head> flagę
 * window.pcBezReklam, która go blokuje, także po kliknięciu zgody w banerze.
 * Dla pewności wycinamy też każdy statyczny <script ...adsbygoogle...>.
 */
import {readFileSync, writeFileSync, existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = join(__dirname, '..', 'build', '404.html');
const FLAGA = '<script>window.pcBezReklam=true</script>';

if (!existsSync(FILE)) {
  console.warn('[strip-ads-404] brak build/404.html — pomijam');
  process.exit(0);
}

const html = readFileSync(FILE, 'utf8');

// Docusaurus minifikuje HTML, więc atrybuty bywają bez cudzysłowów — wzorzec
// jest na to odporny.
let cleaned = html.replace(/<script[^>]*adsbygoogle[^>]*>\s*<\/script>/gi, '');

if (!cleaned.includes(FLAGA)) {
  const head = cleaned.match(/<head[^>]*>/i);
  if (!head) {
    console.error('[strip-ads-404] BŁĄD: brak <head> w 404.html');
    process.exit(1);
  }
  cleaned = cleaned.replace(head[0], head[0] + FLAGA);
}

writeFileSync(FILE, cleaned);
console.log('[strip-ads-404] OK: reklamy wyłączone w 404.html (flaga pcBezReklam)');
