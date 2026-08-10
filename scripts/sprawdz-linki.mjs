#!/usr/bin/env node
/**
 * Kontrola adresow wewnetrznych.
 *
 * Konfiguracja ma trailingSlash: true, wiec kazdy adres wewnetrzny musi konczyc
 * sie ukosnikiem. Odnosnik bez ukosnika dziala, ale prowadzi przez
 * przekierowanie. Google odnotowuje wtedy "Strona zawiera przekierowanie"
 * i taki adres nie trafia do indeksu, a budzet indeksowania sie marnuje.
 *
 * Skrypt czyta zrodla i pliki tresci, nie zbudowana strone, zeby dalo sie go
 * uruchomic przed buildem.
 */
import {readFileSync, readdirSync, statSync} from 'node:fs';
import {join, extname} from 'node:path';

const KATALOGI = ['src', 'content', 'static/llms.txt', 'docusaurus.config.js'];
const ROZSZERZENIA = new Set(['.js', '.jsx', '.json', '.md', '.txt']);

// Adresy, ktore z zalozenia nie maja ukosnika na koncu.
const WYJATKI = [
  /^\/$/,
  /^\/[a-z0-9/-]*\.(png|jpg|jpeg|svg|webp|pdf|ico|xml|txt|json)$/i,
  /^\/admin/,
];

function pliki(sciezka) {
  const wynik = [];
  const stan = statSync(sciezka, {throwIfNoEntry: false});
  if (!stan) return wynik;
  if (stan.isFile()) return ROZSZERZENIA.has(extname(sciezka)) ? [sciezka] : [];
  for (const wpis of readdirSync(sciezka)) {
    if (wpis === 'node_modules' || wpis.startsWith('.')) continue;
    wynik.push(...pliki(join(sciezka, wpis)));
  }
  return wynik;
}

const WZORCE = [
  /\bto="(\/[^"#?]*)"/g,
  /\bhref="(\/[^"#?]*)"/g,
  /"url":\s*"(\/[^"#?]*)"/g,
  // Pole 'from' w przekierowaniach celowo zostaje bez ukosnika: to sa stare
  // adresy, ktore maja pozostac dokladnie takie, jakie byly.
  /\bto:\s*'(\/[^'#?]*)'/g,
  /"(\/narzedzia\/[a-z0-9-]*)"/g,
  /\]\((https:\/\/pocaduchy\.pl\/[^)#?]*)\)/g,
];

const znalezione = [];
for (const katalog of KATALOGI) {
  for (const plik of pliki(katalog)) {
    const tresc = readFileSync(plik, 'utf8');
    const linie = tresc.split('\n');
    linie.forEach((linia, i) => {
      for (const wzor of WZORCE) {
        wzor.lastIndex = 0;
        let m;
        while ((m = wzor.exec(linia)) !== null) {
          let adres = m[1].replace('https://pocaduchy.pl', '') || '/';
          if (adres.endsWith('/')) continue;
          if (WYJATKI.some((w) => w.test(adres))) continue;
          znalezione.push({plik, linia: i + 1, adres, kontekst: linia.trim().slice(0, 90)});
        }
      }
    });
  }
}

if (znalezione.length === 0) {
  console.log('Wszystkie adresy wewnetrzne koncza sie ukosnikiem.');
  process.exit(0);
}

console.log(`Adresy bez koncowego ukosnika: ${znalezione.length}\n`);
for (const z of znalezione) {
  console.log(`${z.plik}:${z.linia}  ${z.adres}`);
  console.log(`    ${z.kontekst}`);
}
process.exit(1);
