# Zebatka3D: pomiar

Data kontroli: 2026-08-04.

## Geometria

- Liczba trojkatow: 672.
- Limit ze specyfikacji: ponizej 6000 trojkatow.
- Sposob liczenia: `indices.length / 3` dla bryly, bez linii obrysowych WebGL `LINES`.

## Waga

- Waga w produkcyjnym buildzie strony: 0 kB, bo komponent nie jest jeszcze importowany przez strone glowna i bundler nie dolacza go do plikow w `build/`.
- Waga samodzielnych plikow komponentu przed integracja: 22.46 kB surowo, 6.12 kB gzip.
- Pliki liczone: `src/components/Zebatka3D.js` i `src/components/Zebatka3D.module.css`.

## Kontrola

- `npm.cmd run build`: przeszedl.
- `npm run build`: nie zostal uruchomiony przez wrapper PowerShell, bo lokalna polityka blokuje `npm.ps1`. Ta sama komenda przeszla przez `npm.cmd`.
- Sprawdzenie w przegladarce: niezweryfikowane wizualnie. Dostepna sesja in-app Browser zwrocila brak przegladarki `iab`, a komponent zgodnie ze specyfikacja nie zostal wpiety w `src/pages/index.js`.
