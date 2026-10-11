/**
 * Generuje strony Wiedzy i Bloga z plików danych w content/ oraz manifesty
 * list w src/data/. Uruchamiane automatycznie w prestart i prebuild.
 *
 * Jedynym źródłem prawdy są pliki w content/. Wygenerowanych stron w
 * src/pages/blog/ nikt nie edytuje ręcznie: każda taka zmiana zniknie
 * przy najbliższym budowaniu strony.
 */
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  unlinkSync,
} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const GENERATED_MARKER =
  '// AUTO-WYGENEROWANE przez scripts/build-content-pages.mjs - nie edytuj ręcznie.';

// Polskie znaki nie zawsze są poprawnie transliterowane przez CMS przy
// zapisie nazwy pliku (np. "ł" zostaje "ł", nie "l") - dlatego URL strony
// liczymy zawsze sami, niezależnie od tego, jak nazwał się plik na dysku.
const PL_MAP = {
  ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z',
};

function slugify(raw) {
  const lower = raw.toLowerCase().replace(/[ąćęłńóśźż]/g, (ch) => PL_MAP[ch]);
  return lower
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readJsonFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const file = f.replace(/\.json$/, ''); // dokładna nazwa pliku na dysku
      const slug = slugify(file); // czysty slug użyty w URL-u
      const data = JSON.parse(readFileSync(join(dir, f), 'utf8'));
      return {file, slug, ...data};
    });
}

// Usuwa pliki wygenerowane wcześniej, których artykuł źródłowy zniknął z
// content/ (np. usunięty w CMS-ie) - rozpoznawane wyłącznie po znaczniku
// na początku pliku, więc ręcznie pisane strony nigdy nie zostaną ruszone.
function cleanGenerated(pagesDir, expectedFiles) {
  if (!existsSync(pagesDir)) return;
  for (const f of readdirSync(pagesDir)) {
    if (!f.endsWith('.js') || expectedFiles.has(f)) continue;
    const content = readFileSync(join(pagesDir, f), 'utf8');
    if (content.startsWith(GENERATED_MARKER)) {
      unlinkSync(join(pagesDir, f));
    }
  }
}

// Wiedza jest plaska w adresach: artykuly leza wprost w content/wiedza/ i maja
// adresy /wiedza/<slug>. Dzialy istnieja tylko jako pole "kategoria" i sluza do
// grupowania na hubie. To celowe: adres nie zmienia sie, gdy artykul przenosimy
// miedzy dzialami, a raz zaindeksowany adres zostaje.
//
// Artykul bez pola "kategoria" trafia do dzialu "inne".
function writeWiedza() {
  const contentDir = join(ROOT, 'content', 'wiedza');
  const pagesDir = join(ROOT, 'src', 'pages', 'wiedza');
  const dataDir = join(ROOT, 'src', 'data');
  const articles = readJsonFiles(contentDir);

  mkdirSync(pagesDir, {recursive: true});
  mkdirSync(dataDir, {recursive: true});

  const expected = new Set();
  for (const a of articles) {
    const file = `${a.slug}.js`;
    expected.add(file);
    const page = `${GENERATED_MARKER}
import React from 'react';
import WiedzaArticleTemplate from '@site/src/components/WiedzaArticleTemplate';
import data from '@site/content/wiedza/${a.file}.json';

export default function Page() {
  return (
    <WiedzaArticleTemplate
      title={data.title}
      seoTitle={data.seoTitle}
      description={data.description}
      seoDescription={data.seoDescription}
      date={data.date}
      dateModified={data.dateModified}
      permalink="/wiedza/${a.slug}"
      linkedinUrl={data.linkedinUrl}
      blocks={data.blocks}
      faq={data.faq}
    />
  );
}
`;
    writeFileSync(join(pagesDir, file), page);
  }
  cleanGenerated(pagesDir, expected);

  const manifest = articles
    .map((a) => ({
      slug: a.slug,
      kategoria: a.kategoria || 'inne',
      // Slowa, ktorych ludzie uzywaja szukajac tego materialu, a ktore nie
      // musza padac w tytule. Zasilaja szukajke na /wiedza/.
      slowaKluczowe: a.slowaKluczowe || [],
      title: a.title,
      seoTitle: a.seoTitle || null,
      description: a.description || '',
      date: a.date || null,
    }))
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  writeFileSync(join(dataDir, 'wiedza-artykuly.json'), JSON.stringify(manifest, null, 2) + '\n');

  return manifest.length;
}

function writeBlog() {
  const contentDir = join(ROOT, 'content', 'blog');
  const pagesDir = join(ROOT, 'src', 'pages', 'blog');
  const dataDir = join(ROOT, 'src', 'data');
  const posts = readJsonFiles(contentDir);

  mkdirSync(pagesDir, {recursive: true});
  mkdirSync(dataDir, {recursive: true});

  const expected = new Set();
  for (const p of posts) {
    const file = `${p.slug}.js`;
    expected.add(file);
    const page = `${GENERATED_MARKER}
import React from 'react';
import BlogArticleTemplate from '@site/src/components/BlogArticleTemplate';
import data from '@site/content/blog/${p.file}.json';

export default function Page() {
  return (
    <BlogArticleTemplate
      title={data.title}
      seoTitle={data.seoTitle}
      description={data.description}
      date={data.date}
      dateModified={data.dateModified}
      permalink="/blog/${p.slug}"
      image={data.image}
      linkedinUrl={data.linkedinUrl}
      tags={data.tags}
      related={data.related}
      narzedzia={data.narzedzia}
      faq={data.faq}
      howTo={data.howTo}
      blocks={data.blocks}
    />
  );
}
`;
    writeFileSync(join(pagesDir, file), page);
  }
  cleanGenerated(pagesDir, expected);

  const manifest = posts
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      seoTitle: p.seoTitle || null,
      description: p.description || '',
      date: p.date || null,
      image: p.image || null,
      tags: p.tags || [],
    }))
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  writeFileSync(join(dataDir, 'blog-posts.json'), JSON.stringify(manifest, null, 2) + '\n');

  return manifest.length;
}


// Strony pojedynczych odcinkow. Fakty o filmie (data, miniatura, adres) biora
// sie z danych pobranych z kanalu, wiec plik tresci trzyma wylacznie to, co
// zostalo napisane recznie: streszczenie, sekcje i wnioski.
function writeOdcinki() {
  const contentDir = join(ROOT, 'content', 'odcinki');
  const pagesDir = join(ROOT, 'src', 'pages', 'odcinki');
  const dataDir = join(ROOT, 'src', 'data');
  const odcinki = readJsonFiles(contentDir);

  mkdirSync(pagesDir, {recursive: true});
  mkdirSync(dataDir, {recursive: true});

  const expected = new Set();
  for (const o of odcinki) {
    const file = `${o.slug}.js`;
    expected.add(file);
    const page = `${GENERATED_MARKER}
import React from 'react';
import OdcinekTemplate from '@site/src/components/OdcinekTemplate';
import data from '@site/content/odcinki/${o.file}.json';

export default function Page() {
  return (
    <OdcinekTemplate
      videoId={data.videoId}
      title={data.title}
      seoTitle={data.seoTitle}
      description={data.description}
      permalink="/odcinki/${o.slug}/"
      lead={data.lead}
      czasTrwania={data.czasTrwania}
      czegoSieDowiesz={data.czegoSieDowiesz}
      sekcje={data.sekcje}
      wnioski={data.wnioski}
      narzedzia={data.narzedzia}
      related={data.related}
    />
  );
}
`;
    writeFileSync(join(pagesDir, file), page);
  }
  cleanGenerated(pagesDir, expected);

  // Manifest pozwala liscie odcinkow rozpoznac, ktore filmy maja juz wlasna
  // strone, i skierowac kafelek tam zamiast prosto na YouTube.
  const manifest = odcinki.map((o) => ({
    slug: o.slug,
    videoId: o.videoId,
    title: o.title,
    description: o.description || '',
  }));
  writeFileSync(join(dataDir, 'odcinki-strony.json'), JSON.stringify(manifest, null, 2) + '\n');

  return manifest.length;
}

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, 'utf8'));
}

// Strony przelicznika maja wlasne adresy, ktore nie zawsze pokrywaja sie
// z nazwa pliku tresci. Ta sama lista co STRONY_WYMIAROW w szablonie.
const PRZELICZNIK_SLUGI = {
  cisnienie: 'cisnienie',
  dlugosc: 'dlugosc',
  moment: 'moment-obrotowy',
  sila: 'sila',
  temperatura: 'temperatura',
  moc: 'moc',
};

// Strony zbiorcze. Potrzebne tylko podpowiedziom na stronie 404, zeby ktos,
// kto wpisal np. /narzedzie/, trafil na liste narzedzi.
const HUBY = [
  {url: '/wiedza/', tytul: 'Baza wiedzy'},
  {url: '/narzedzia/', tytul: 'Narzędzia'},
  {url: '/przelicznik/', tytul: 'Przelicznik jednostek'},
  {url: '/blog/', tytul: 'Artykuły'},
  {url: '/odcinki/', tytul: 'Odcinki'},
  {url: '/uslugi/', tytul: 'Usługi'},
  {url: '/o-mnie/', tytul: 'O mnie'},
];

// Jeden indeks wszystkich stron z trescia: adres, typ, tytul i data ostatniej
// zmiany. Korzystaja z niego blok "Powiazane", strona 404 (podpowiedz
// najblizszego adresu) i sitemapa (lastmod).
function writeIndeksStron() {
  const strony = [];

  for (const p of readJsonFiles(join(ROOT, 'content', 'blog'))) {
    strony.push({
      url: `/blog/${p.slug}/`,
      typ: 'artykul',
      tytul: p.seoTitle || p.title,
      zmiana: p.dateModified || p.date || null,
    });
  }
  for (const a of readJsonFiles(join(ROOT, 'content', 'wiedza'))) {
    strony.push({
      url: `/wiedza/${a.slug}/`,
      typ: 'wiedza',
      tytul: a.title,
      zmiana: a.dateModified || a.date || null,
    });
  }

  // Odcinek bez wlasnej daty zmiany dostaje date publikacji filmu.
  const filmy = readJson(join(ROOT, 'src', 'data', 'episodes.json'), {episodes: []}).episodes || [];
  for (const o of readJsonFiles(join(ROOT, 'content', 'odcinki'))) {
    const film = filmy.find((e) => e.id === o.videoId);
    strony.push({
      url: `/odcinki/${o.slug}/`,
      typ: 'odcinek',
      tytul: o.title,
      zmiana: o.dateModified || (film ? film.published.slice(0, 10) : null),
    });
  }

  const narzedzia = readJson(join(ROOT, 'content', 'narzedzia.json'), {narzedzia: []});
  for (const n of narzedzia.narzedzia || []) {
    strony.push({url: n.url, typ: 'narzedzie', tytul: n.tytul, tag: n.tag, dane: n.dane, zmiana: null});
  }

  for (const [plik, slug] of Object.entries(PRZELICZNIK_SLUGI)) {
    const t = readJson(join(ROOT, 'content', 'przelicznik', `${plik}.json`), null);
    if (!t) continue;
    strony.push({url: `/przelicznik/${slug}/`, typ: 'przelicznik', tytul: t.meta.tytul, zmiana: null});
  }

  for (const h of HUBY) {
    if (!strony.some((s) => s.url === h.url)) strony.push({...h, typ: 'hub', zmiana: null});
  }

  writeFileSync(
    join(ROOT, 'src', 'data', 'strony-indeks.json'),
    JSON.stringify(strony, null, 2) + '\n',
  );
  return strony;
}

// Graf powiazan miedzy stronami roznych typow. Zrodla:
//  1. pary wpisane recznie w content/powiazania.json,
//  2. pola "related" i "narzedzia" odcinkow, odwrocone: odcinek linkuje do
//     artykulu, wiec artykul dostaje link zwrotny do odcinka.
// Wynik: adres -> lista adresow partnerow. Szablon sam pomija partnerow,
// ktorych juz pokazuje w innym bloku.
function writePowiazania(strony) {
  const znane = new Set(strony.map((s) => s.url));
  const graf = {};
  const dodaj = (a, b) => {
    if (a === b) return;
    graf[a] = graf[a] || [];
    if (!graf[a].includes(b)) graf[a].push(b);
  };

  const plik = readJson(join(ROOT, 'content', 'powiazania.json'), {pary: []});
  for (const para of plik.pary || []) {
    for (const url of para) {
      if (!znane.has(url)) {
        throw new Error(`[build-content-pages] content/powiazania.json: nieznany adres ${url}`);
      }
    }
    dodaj(para[0], para[1]);
    dodaj(para[1], para[0]);
  }

  for (const o of readJsonFiles(join(ROOT, 'content', 'odcinki'))) {
    const odcinek = `/odcinki/${o.slug}/`;
    for (const slug of o.related || []) {
      const url = `/blog/${slug}/`;
      if (znane.has(url)) dodaj(url, odcinek);
    }
    for (const url of o.narzedzia || []) {
      if (znane.has(url)) dodaj(url, odcinek);
    }
  }

  writeFileSync(
    join(ROOT, 'src', 'data', 'powiazania.json'),
    JSON.stringify(graf, null, 2) + '\n',
  );
  return Object.keys(graf).length;
}

const counts = {
  wiedza: writeWiedza(),
  blog: writeBlog(),
  odcinki: writeOdcinki(),
};
const strony = writeIndeksStron();
const powiazane = writePowiazania(strony);

console.log(
  `[build-content-pages] OK: wiedza=${counts.wiedza}, blog=${counts.blog}, odcinki=${counts.odcinki}, indeks=${strony.length}, powiazania=${powiazane}`,
);
