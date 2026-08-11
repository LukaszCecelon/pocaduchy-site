import imageSizes from '@site/src/data/image-sizes.json';

// Wymiary lokalnych obrazow zmierzone przy buildzie przez
// scripts/build-image-sizes.mjs. Deklarowanie ich w HTML rezerwuje miejsce
// zanim obraz sie wczyta, wiec uklad strony nie skacze.
export function wymiaryObrazu(src) {
  if (!src) return {};
  const size = imageSizes[src];
  return size ? {width: size.w, height: size.h} : {};
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
