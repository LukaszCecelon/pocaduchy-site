import indeks from '@site/src/data/strony-indeks.json';
import graf from '@site/src/data/powiazania.json';
import tresc from '@site/content/powiazania.json';

// Adresy porownujemy zawsze z koncowym ukosnikiem, bo tak sa zapisane
// w indeksie (trailingSlash: true w konfiguracji).
export function zUkosnikiem(url) {
  return url.endsWith('/') ? url : `${url}/`;
}

export function stronaPoAdresie(url) {
  return indeks.find((s) => s.url === zUkosnikiem(url)) || null;
}

// Partnerzy strony z grafu powiazan, z etykieta typu, gotowi do wyswietlenia.
// "pomin" to adresy, ktore strona pokazuje juz w innym bloku.
export function powiazaneDla(url, {pomin = [], typy = null} = {}) {
  const bez = new Set(pomin.map(zUkosnikiem));
  return (graf[zUkosnikiem(url)] || [])
    .filter((u) => !bez.has(u))
    .map(stronaPoAdresie)
    .filter(Boolean)
    .filter((s) => !typy || typy.includes(s.typ))
    .map((s) => ({
      url: s.url,
      typ: s.typ,
      tytul: s.tytul,
      etykieta: s.tag || tresc.etykiety[s.typ] || '',
      dane: s.dane || null,
    }));
}

export const tytulPowiazanych = tresc.tytul;
