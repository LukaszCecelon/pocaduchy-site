// Podpowiedz najblizszego istniejacego adresu dla strony 404.
//
// Asystenci AI cytuja strone o Segerze pod adresami, ktore sami wymyslili,
// np. /wiedza/rowki-pod-pierscienie-segera-segera-tabela/. Ktos, kto w taki
// link kliknie, ma od razu dostac wlasciwa strone zamiast samego bledu.
//
// Czysta funkcja bez zaleznosci od przegladarki, zeby dalo sie ja sprawdzic
// w Node (src/lib/podpowiedz404.test.mjs).

const PL = {ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z'};

// Slowa, ktore nic nie mowia o temacie strony.
const POMIJANE = new Set(['i', 'w', 'z', 'a', 'o', 'na', 'do', 'od', 'po', 'pod', 'dla', 'pocaduchy', 'html']);

function normalizuj(tekst) {
  return tekst
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (c) => PL[c])
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function segmenty(sciezka) {
  return normalizuj(sciezka)
    .split(/[?#]/)[0]
    .split('/')
    .filter(Boolean);
}

// Poczatek slowa wystarcza, zeby "segera" i "seger" albo "pierscieni"
// i "pierscienie" liczyly sie jako to samo slowo.
function rdzenie(slug) {
  return new Set(
    slug
      .split(/[^a-z0-9]+/)
      .filter((s) => s && !POMIJANE.has(s))
      .map((s) => s.slice(0, 4)),
  );
}

function levenshtein(a, b) {
  if (a === b) return 0;
  let poprz = Array.from({length: b.length + 1}, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const biez = [i];
    for (let j = 1; j <= b.length; j++) {
      biez[j] = Math.min(
        poprz[j] + 1,
        biez[j - 1] + 1,
        poprz[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    poprz = biez;
  }
  return poprz[b.length];
}

function podobienstwo(sciezka, url) {
  const s = segmenty(sciezka);
  const u = segmenty(url);
  const sSlug = s[s.length - 1] || '';
  const uSlug = u[u.length - 1] || '';

  const rs = rdzenie(sSlug);
  const ru = rdzenie(uSlug);
  let wspolne = 0;
  for (const r of rs) if (ru.has(r)) wspolne += 1;
  const dice = rs.size + ru.size ? (2 * wspolne) / (rs.size + ru.size) : 0;

  const dl = Math.max(sSlug.length, uSlug.length) || 1;
  const znaki = 1 - levenshtein(sSlug, uSlug) / dl;

  const dzial = s[0] && s[0] === u[0] ? 0.15 : 0;
  return 0.6 * dice + 0.4 * znaki + dzial;
}

// Zwraca do `ile` stron posortowanych od najlepiej pasujacej, tylko powyzej progu.
export function najblizszeStrony(sciezka, strony, {ile = 3, prog = 0.35} = {}) {
  return strony
    .map((s) => ({...s, wynik: podobienstwo(sciezka, s.url)}))
    .filter((s) => s.wynik >= prog)
    .sort((a, b) => b.wynik - a.wynik)
    .slice(0, ile);
}
