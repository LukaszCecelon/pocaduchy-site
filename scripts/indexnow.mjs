/**
 * IndexNow: zglasza Bingowi (i innym wyszukiwarkom z IndexNow) adresy,
 * ktore zmienily sie w tym wdrozeniu. Google IndexNow nie obsluguje, ale
 * Bing zasila tez czesc asystentow AI, a domeny nie mial w indeksie wcale.
 *
 * Dwa tryby, oba bez zaleznosci z npm:
 *
 *   node scripts/indexnow.mjs lista
 *     Porownuje build/sitemap.xml z sitemapa na produkcji (przed wdrozeniem).
 *     Zmieniony adres = nowy albo z innym <lastmod>. Wynik: tablica JSON na
 *     stdout, a w GitHub Actions takze wyjscie "adresy" kroku.
 *
 *   ADRESY='[...]' node scripts/indexnow.mjs wyslij
 *     Wysyla liste do api.indexnow.org. Blad API nie wywraca wdrozenia:
 *     strona juz jest opublikowana, a zgloszenie to tylko przyspieszenie.
 *
 * Klucz jest publiczny z definicji: ten sam ciag lezy w static/<klucz>.txt
 * i tak wyszukiwarka sprawdza, ze zgloszenie przyszlo od wlasciciela domeny.
 */
import {readFileSync, appendFileSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HOST = 'pocaduchy.pl';
const KLUCZ = '06d9d483577565b11501c52b452ef8fc';

function wpisySitemapy(xml) {
  const wpisy = new Map();
  for (const [, blok] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = /<loc>([^<]+)<\/loc>/.exec(blok)?.[1];
    const lastmod = /<lastmod>([^<]+)<\/lastmod>/.exec(blok)?.[1] || null;
    if (loc) wpisy.set(loc.trim(), lastmod);
  }
  return wpisy;
}

async function lista() {
  const plik = join(ROOT, 'build', 'sitemap.xml');
  if (!existsSync(plik)) throw new Error('Brak build/sitemap.xml. Najpierw npm run build.');
  const nowa = wpisySitemapy(readFileSync(plik, 'utf8'));

  let stara = new Map();
  try {
    const odp = await fetch(`https://${HOST}/sitemap.xml`, {signal: AbortSignal.timeout(15000)});
    if (odp.ok) stara = wpisySitemapy(await odp.text());
  } catch (e) {
    // Bez starej sitemapy kazdy adres wyglada na nowy. Zglaszamy wszystkie,
    // limit IndexNow to 10 000 adresow na raz, wiec nic sie nie stanie.
    console.error(`[indexnow] nie udalo sie pobrac sitemapy z produkcji: ${e.message}`);
  }

  const zmienione = [...nowa]
    .filter(([url, lastmod]) => !stara.has(url) || stara.get(url) !== lastmod)
    .map(([url]) => url);

  const json = JSON.stringify(zmienione);
  console.log(json);
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `adresy=${json}\n`);
  console.error(`[indexnow] zmienione adresy: ${zmienione.length} z ${nowa.size}`);
}

async function wyslij() {
  const adresy = JSON.parse(process.env.ADRESY || '[]');
  if (!adresy.length) {
    console.log('[indexnow] brak zmienionych adresow, nic nie wysylam');
    return;
  }
  try {
    const odp = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({
        host: HOST,
        key: KLUCZ,
        keyLocation: `https://${HOST}/${KLUCZ}.txt`,
        urlList: adresy,
      }),
      signal: AbortSignal.timeout(30000),
    });
    // 200 i 202 to przyjecie zgloszenia. 403 znaczy, ze plik klucza jeszcze
    // nie jest widoczny pod adresem; wtedy pomoze kolejne wdrozenie.
    console.log(`[indexnow] HTTP ${odp.status}, adresow: ${adresy.length}`);
    if (odp.status >= 300) console.log(await odp.text());
  } catch (e) {
    console.log(`[indexnow] zgloszenie nieudane: ${e.message}`);
  }
}

const tryb = process.argv[2];
if (tryb === 'lista') await lista();
else if (tryb === 'wyslij') await wyslij();
else {
  console.error('Uzycie: node scripts/indexnow.mjs lista|wyslij');
  process.exit(1);
}
