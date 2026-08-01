/**
 * Usuwa skrypt AdSense ze strony błędu 404 (uruchamiane po buildzie).
 *
 * Polityka Google AdSense zabrania wyświetlania reklam na ekranach bez
 * treści wydawcy — strony błędu są wymienione wprost. Docusaurus wstrzykuje
 * skrypt z `scripts:` w konfiguracji do KAŻDEJ strony, więc trafia też do
 * 404.html. Statyczne wycięcie po buildzie jest tu najbezpieczniejsze:
 * wszystkie realne strony zachowują skrypt w <head> (weryfikacja AdSense
 * działa bez zmian), a strona błędu go nie ma.
 */
import {readFileSync, writeFileSync, existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = join(__dirname, '..', 'build', '404.html');

if (!existsSync(FILE)) {
  console.warn('[strip-ads-404] brak build/404.html — pomijam');
  process.exit(0);
}

const html = readFileSync(FILE, 'utf8');

// Wycinamy dowolny <script ...adsbygoogle...></script> (Docusaurus minifikuje
// HTML, więc atrybuty bywają bez cudzysłowów — wzorzec jest na to odporny).
const cleaned = html.replace(/<script[^>]*adsbygoogle[^>]*>\s*<\/script>/gi, '');

if (cleaned === html) {
  console.log('[strip-ads-404] OK: 404.html nie zawierało skryptu reklam');
} else {
  writeFileSync(FILE, cleaned);
  console.log('[strip-ads-404] OK: usunięto skrypt AdSense z 404.html');
}
