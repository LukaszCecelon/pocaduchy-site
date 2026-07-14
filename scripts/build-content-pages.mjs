/**
 * Generuje strony Wiedzy/Bloga z plików danych w content/ (edytowanych przez
 * panel CMS pod /admin, tryb lokalny) oraz manifesty list kategorii w
 * src/data/. Uruchamiane automatycznie w prestart/prebuild — Łukasz nigdy
 * nie tworzy ani nie edytuje wygenerowanych stron w src/pages ręcznie,
 * tylko pliki danych w content/ (przez CMS albo wprost).
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
  '// AUTO-WYGENEROWANE przez scripts/build-content-pages.mjs — nie edytuj ręcznie.';

// Polskie znaki nie zawsze są poprawnie transliterowane przez CMS przy
// zapisie nazwy pliku (np. "ł" zostaje "ł", nie "l") — dlatego URL strony
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
// content/ (np. usunięty w CMS-ie) — rozpoznawane wyłącznie po znaczniku
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

function writeWiedzaCategory(category, categoryLabel) {
  const contentDir = join(ROOT, 'content', 'wiedza', category);
  const pagesDir = join(ROOT, 'src', 'pages', 'wiedza', category);
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
import data from '@site/content/wiedza/${category}/${a.file}.json';

export default function Page() {
  return (
    <WiedzaArticleTemplate
      title={data.title}
      description={data.description}
      categoryLabel="${categoryLabel}"
      categoryHref="/wiedza/${category}"
      blocks={data.blocks}
    />
  );
}
`;
    writeFileSync(join(pagesDir, file), page);
  }
  cleanGenerated(pagesDir, expected);

  const manifest = articles
    .map((a) => ({slug: a.slug, title: a.title, description: a.description || ''}))
    .sort((a, b) => a.title.localeCompare(b.title, 'pl'));
  writeFileSync(
    join(dataDir, `wiedza-${category}.json`),
    JSON.stringify(manifest, null, 2) + '\n',
  );

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
      description={data.description}
      date={data.date}
      linkedinUrl={data.linkedinUrl}
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
      description: p.description || '',
      date: p.date || null,
    }))
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  writeFileSync(join(dataDir, 'blog-posts.json'), JSON.stringify(manifest, null, 2) + '\n');

  return manifest.length;
}

const counts = {
  wzory: writeWiedzaCategory('wzory', 'Wzory i tabele'),
  materialy: writeWiedzaCategory('materialy', 'Materiały konstrukcyjne'),
  elementy: writeWiedzaCategory('elementy', 'Elementy standardowe'),
  blog: writeBlog(),
};

console.log(
  `[build-content-pages] OK: wzory=${counts.wzory}, materialy=${counts.materialy}, ` +
    `elementy=${counts.elementy}, blog=${counts.blog}`,
);
