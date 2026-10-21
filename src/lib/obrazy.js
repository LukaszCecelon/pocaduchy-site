import imageSizes from '@site/src/data/image-sizes.json';

// Wymiary lokalnych obrazow zmierzone przy buildzie przez
// scripts/build-image-sizes.mjs. Deklarowanie ich w HTML rezerwuje miejsce
// zanim obraz sie wczyta, wiec uklad strony nie skacze.
export function wymiaryObrazu(src) {
  if (!src) return {};
  const size = imageSizes[src];
  return size ? {width: size.w, height: size.h} : {};
}

// Okladki blogow maja obok pelnego pliku kopie 640 px (`-okladka-640.jpg`).
// Gdy kopia istnieje, karta w kolumnie ok. 300-400 px dostaje srcset i nie
// pobiera obrazu 1280 px. Bez kopii zwracamy sam adres, jak dotad.
export function atrybutyOkladki(src, sizes = '(max-width: 700px) 92vw, 400px') {
  if (!src) return {};
  const kopia = src.replace(/-okladka\.jpg$/, '-okladka-640.jpg');
  const pelny = imageSizes[src];
  if (kopia === src || !imageSizes[kopia] || !pelny) return {src, ...wymiaryObrazu(src)};
  return {
    src,
    srcSet: `${kopia} 640w, ${src} ${pelny.w}w`,
    sizes,
    ...wymiaryObrazu(src),
  };
}

// Miniatury z YouTube nie sa w repozytorium, wiec mierzymy je z nazwy pliku.
// Wszystkie warianty maja stale wymiary opisane przez API YouTube.
const MINIATURY_YT = {
  default: {width: 120, height: 90},
  mqdefault: {width: 320, height: 180},
  hqdefault: {width: 480, height: 360},
  sddefault: {width: 640, height: 480},
  maxresdefault: {width: 1280, height: 720},
};

export function wymiaryMiniaturyYt(url) {
  if (!url) return {};
  const m = /\/(default|mqdefault|hqdefault|sddefault|maxresdefault)\.jpg/.exec(url);
  return m ? MINIATURY_YT[m[1]] : {};
}
