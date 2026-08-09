import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_DIRS = ['content/blog', 'content/wiedza'];

const STOPWORDS = new Set([
  'a', 'aby', 'ale', 'albo', 'ani', 'bardzo', 'bez', 'bo', 'by', 'byc', 'być',
  'byl', 'byla', 'bylo', 'były', 'będzie', 'będą', 'ci', 'co', 'czy', 'dla',
  'do', 'gdy', 'go', 'i', 'ich', 'im', 'jak', 'jako', 'je', 'jego', 'jej',
  'jest', 'jestem', 'jesteśmy', 'jeśli', 'już', 'każdy', 'kiedy', 'która',
  'które', 'którego', 'której', 'który', 'których', 'ma', 'mam', 'mamy',
  'mieć', 'między', 'mnie', 'może', 'można', 'na', 'nad', 'nam', 'nas',
  'nasze', 'naszych', 'nie', 'nich', 'nim', 'no', 'o', 'od', 'oraz', 'po',
  'pod', 'potem', 'przed', 'przez', 'przy', 'również', 'są', 'się', 'sobie',
  'tak', 'takie', 'taki', 'te', 'tego', 'tej', 'ten', 'to', 'trochę', 'tu',
  'tych', 'tym', 'u', 'w', 'we', 'według', 'więc', 'więcej', 'wtedy', 'z',
  'za', 'ze', 'że', 'żeby'
]);

const TRACKED_PHRASES = [
  'tak naprawdę',
  'moim zdaniem',
  'po prostu',
  'w zasadzie',
  'z mojego doświadczenia',
  'z mojej perspektywy',
  'na koniec',
  'w praktyce',
  'w projekcie',
  'w pracy konstruktora',
  'na montażu',
  'na etapie',
  'model 3d',
  'rysunek 2d',
  'model cad',
  'dokumentacja',
  'baza wiedzy',
  'kick-off',
  'warto',
  'trzeba',
  'można',
  'da się'
];

const FORBIDDEN = [
  'Drodzy',
  'kompleksowe rozwiązania',
  'w dzisiejszych czasach',
  'synergia',
  'co o tym myślicie',
  'dajcie znać w komentarzach',
  'dajcie znać w komentarzu',
  'udostępnij',
  'dynamicznie zmieniającym się'
];

function listJsonFiles() {
  return CONTENT_DIRS.flatMap((dir) => {
    const fullDir = path.join(ROOT, dir);
    return fs.readdirSync(fullDir)
      .filter((name) => name.endsWith('.json'))
      .sort((a, b) => a.localeCompare(b, 'pl'))
      .map((name) => path.join(dir, name));
  });
}

function stripMarkdown(text) {
  return String(text || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[\s>*-]*[-*+]\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function getBlocks(json) {
  return json.blocks || json.bloki || [];
}

function extractTextParts(json) {
  const parts = [];
  if (json.title) parts.push({ kind: 'title', text: json.title });
  if (json.lead) parts.push({ kind: 'lead', text: json.lead });
  if (json.opis) parts.push({ kind: 'opis', text: json.opis });
  if (json.description) parts.push({ kind: 'description', text: json.description });

  for (const block of getBlocks(json)) {
    if (block.type === 'tekst') {
      if (block.naglowek) parts.push({ kind: 'naglowek', text: block.naglowek });
      if (block.tresc) parts.push({ kind: 'tresc', text: block.tresc });
      if (block.body) parts.push({ kind: 'body', text: block.body });
    }
    if (block.type === 'obraz' && block.podpis) {
      parts.push({ kind: 'podpis', text: block.podpis });
    }
  }
  return parts.map((part) => ({ ...part, text: stripMarkdown(part.text) })).filter((part) => part.text);
}

function bodyTextParts(json) {
  return getBlocks(json)
    .filter((block) => block.type === 'tekst')
    .flatMap((block) => [block.naglowek, block.tresc, block.body].filter(Boolean))
    .map(stripMarkdown)
    .filter(Boolean);
}

function words(text) {
  return String(text || '').match(/[\p{L}\p{M}\d]+(?:[-/][\p{L}\p{M}\d]+)*/gu) || [];
}

function sentences(text) {
  const normalized = String(text || '')
    .replace(/\bnp\./gi, 'np')
    .replace(/\bitp\./gi, 'itp')
    .replace(/\bipt\./gi, 'ipt')
    .replace(/\bm\.in\./gi, 'm in')
    .replace(/\s+/g, ' ')
    .trim();
  if (!normalized) return [];
  const matched = normalized.match(/[^.!?…]+(?:[.!?…]+|$)/g) || [];
  return matched.map((s) => s.trim()).filter((s) => words(s).length > 0);
}

function paragraphs(parts) {
  return parts
    .flatMap((text) => String(text || '').split(/\n{2,}/g))
    .map(stripMarkdown)
    .filter((p) => words(p).length > 0);
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function percentile(values, p) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return sorted[index];
}

function countRegex(text, regex) {
  return [...String(text || '').matchAll(regex)].length;
}

function countPhrase(text, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return countRegex(text, new RegExp(`(?<![\\p{L}\\p{M}\\d])${escaped}(?![\\p{L}\\p{M}\\d])`, 'giu'));
}

const files = listJsonFiles();
const articles = files.map((file) => {
  const json = JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
  const parts = extractTextParts(json);
  const fullText = parts.map((part) => part.text).join('\n\n');
  const bodyParts = bodyTextParts(json);
  const bodyText = bodyParts.join('\n\n');
  const articleSentences = sentences(fullText);
  const articleParagraphs = paragraphs(bodyParts);
  return {
    file,
    title: json.title || '',
    date: json.date || '',
    blocks: getBlocks(json).length,
    textBlocks: getBlocks(json).filter((block) => block.type === 'tekst').length,
    words: words(fullText).length,
    sentences: articleSentences.length,
    paragraphs: articleParagraphs.length,
    text: fullText,
    bodyText
  };
});

const allText = articles.map((article) => article.text).join('\n\n');
const allSentences = sentences(allText);
const sentenceLengths = allSentences.map((sentence) => words(sentence).length);
const allParagraphs = articles.flatMap((article) => paragraphs(bodyTextParts(JSON.parse(fs.readFileSync(path.join(ROOT, article.file), 'utf8')))));
const paragraphSentenceLengths = allParagraphs.map((paragraph) => sentences(paragraph).length).filter(Boolean);
const dates = articles.map((article) => article.date).filter(Boolean).sort();

const wordFrequency = new Map();
for (const word of words(allText).map((word) => word.toLocaleLowerCase('pl'))) {
  if (word.length < 3 || STOPWORDS.has(word)) continue;
  wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
}
const topWords = [...wordFrequency.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40);

const firstPerson = /\b(ja|mój|moja|moje|mojego|mojej|moim|mnie|mi|mną|sam|samemu|zrobiłem|chciałem|chcę|korzystam|używam|pracuję|widzę|lubię|uważam|myślę|polecam|opublikowałem|wypracowałem|spotkałem|pamiętam|zakładam|staram)\b/giu;
const secondPerson = /\b(ty|twój|twoja|twoje|twojego|twojej|twoim|ciebie|tobie|ci|zobaczysz|zrobisz|wybierasz|masz|możesz|musisz|chcesz|projektujesz|korzystasz|wracasz|zauważysz|pomyślisz|sprawdzisz|ustalisz|dodasz|weźmiesz)\b/giu;
const impersonal = /\b(warto|trzeba|należy|można|da się|powinno się|przyjmuje się|stosuje się|wykorzystuje się|robi się|dobrze jest)\b/giu;

console.log('METRYKA KORPUSU');
console.log(`teksty: ${articles.length}`);
console.log(`okres: ${dates[0]} do ${dates[dates.length - 1]}`);
console.log(`slowa: ${words(allText).length}`);
console.log(`zdania: ${allSentences.length}`);
console.log(`akapity: ${allParagraphs.length}`);
console.log(`bloki lacznie: ${articles.reduce((sum, article) => sum + article.blocks, 0)}`);
console.log(`bloki tekstowe: ${articles.reduce((sum, article) => sum + article.textBlocks, 0)}`);
console.log('');

console.log('RYTM ZDANIA');
console.log(`mediana slow w zdaniu: ${median(sentenceLengths)}`);
console.log(`q1-q3 slow w zdaniu: ${percentile(sentenceLengths, 25)}-${percentile(sentenceLengths, 75)}`);
console.log(`p10-p90 slow w zdaniu: ${percentile(sentenceLengths, 10)}-${percentile(sentenceLengths, 90)}`);
console.log(`min-max slow w zdaniu: ${Math.min(...sentenceLengths)}-${Math.max(...sentenceLengths)}`);
console.log(`zdania krotsze niz 6 slow: ${sentenceLengths.filter((n) => n < 6).length} (${(100 * sentenceLengths.filter((n) => n < 6).length / sentenceLengths.length).toFixed(1)}%)`);
console.log(`zdania dluzsze niz 25 slow: ${sentenceLengths.filter((n) => n > 25).length} (${(100 * sentenceLengths.filter((n) => n > 25).length / sentenceLengths.length).toFixed(1)}%)`);
console.log(`mediana zdan w akapicie: ${median(paragraphSentenceLengths)}`);
console.log(`q1-q3 zdan w akapicie: ${percentile(paragraphSentenceLengths, 25)}-${percentile(paragraphSentenceLengths, 75)}`);
console.log('');

console.log('TABELA ARTYKULOW');
console.log('plik | data | slowa | zdania | bloki | tytul');
for (const article of articles) {
  console.log(`${article.file} | ${article.date} | ${article.words} | ${article.sentences} | ${article.blocks} | ${article.title}`);
}
console.log('');

console.log('OSOBA I DYSTANS');
console.log(`1 os. lp, wskazniki: ${countRegex(allText, firstPerson)}`);
console.log(`ty, wskazniki: ${countRegex(allText, secondPerson)}`);
console.log(`bezosobowe, wskazniki: ${countRegex(allText, impersonal)}`);
console.log('');

console.log('FRAZY SLEDZONE');
for (const phrase of TRACKED_PHRASES) {
  console.log(`${phrase}: ${countPhrase(allText.toLocaleLowerCase('pl'), phrase)}`);
}
console.log('');

console.log('TOP SLOWA PO STOPLIST');
for (const [word, count] of topWords) {
  console.log(`${word}: ${count}`);
}
console.log('');

console.log('FORMY DO SPRAWDZENIA');
console.log(`wykrzykniki: ${countRegex(allText, /!/g)}`);
console.log(`em dash: ${countRegex(allText, /—/g)}`);
console.log(`emoji i symbole piktograficzne: ${countRegex(allText, /\p{Extended_Pictographic}/gu)}`);
for (const phrase of FORBIDDEN) {
  console.log(`${phrase}: ${countPhrase(allText, phrase)}`);
}
