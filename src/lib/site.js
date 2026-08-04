// Drobiazgi wspolne dla calej strony: adres witryny i formaty dat.
// Wczesniej kazdy komponent trzymal wlasna kopie, wiec zmiana adresu
// wymagalaby poprawki w kilku miejscach naraz.
export const SITE_URL = 'https://pocaduchy.pl';

// Dane strukturalne wymagaja adresow bezwzglednych, inaczej wyszukiwarka
// nie polaczy wezlow. Adres juz bezwzgledny przepuszczamy bez zmian, zeby
// dalo sie podac odnosnik do zewnetrznego serwisu.
export function absoluteSiteUrl(path = '') {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// Data slownie, do naglowkow i stopek dokumentow: 3 sierpnia 2026.
export function formatLongDatePl(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

// Data cyframi, do list i kart, gdzie liczy sie miejsce: 03.08.2026.
export function formatShortDatePl(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
