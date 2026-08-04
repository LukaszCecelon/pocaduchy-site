# pocaduchy.pl

Strona inżyniera konstruktora Łukasza Cecelona, prowadzącego kanał YouTube
poCADuchy. Docusaurus 3 z wyłączonymi presetami docs i blog, własne strony
React, treść w plikach JSON.

Opis architektury i uzasadnienie decyzji projektowych: [ARCHITEKTURA.md](ARCHITEKTURA.md).
Zasady pracy i pisania treści: [CLAUDE.md](CLAUDE.md) oraz katalog [`styl/`](styl/).

## Uruchomienie

```bash
npm install
npm run start
```

Serwer deweloperski działa pod `http://localhost:3000` i odświeża się przy
zapisie plików.

## Publikacja

```bash
npm run build
```

Po kontrolnym budowaniu: `git commit` i `git push` na gałąź `main`. Publikacja
przez GitHub Actions trwa 2 do 3 minut. Osobny harmonogram przebudowuje stronę
w nocy, żeby odświeżyć listę odcinków i licznik subskrybentów.

## Gdzie leży treść

| Co | Gdzie |
|---|---|
| Artykuły | `content/blog/<slug>.json` |
| Strona o mnie | `content/o-mnie.json` |
| Usługi | `content/uslugi.json` |
| Odcinki: wstęp i opisy | `content/odcinki.json` |
| Polityka prywatności, regulamin | `content/prawne.json` |

**Nie edytuj plików w `src/pages/blog/`**: są generowane przy budowaniu strony
i każda ręczna zmiana zostanie nadpisana.

Typy bloków dostępne w artykułach: `tekst`, `obraz`, `wideo`, `galeria`,
`tabela`, `wzor`, `rysunek`. Opisane w [ARCHITEKTURA.md](ARCHITEKTURA.md).

## Pliki generowane automatycznie

Powstają przy `npm run start` i `npm run build`, nie edytuj ich ręcznie:

| Plik | Skąd pochodzi |
|---|---|
| `src/data/episodes.json` | RSS kanału YouTube |
| `src/data/subscribers.json` | licznik subskrybentów |
| `src/data/image-sizes.json` | wymiary plików z `static/img/` |
| `src/data/blog-posts.json` | manifest artykułów |
| `src/pages/blog/*.js` | strony artykułów |

## Edycja przez CMS

Alternatywna, rzadziej używana ścieżka: `Edytuj-Strone.bat` uruchamia serwer
razem z panelem Decap pod `/admin`, `Publikuj-Zmiany.bat` publikuje zmiany.
Panel działa wyłącznie lokalnie i nie jest dostępny na produkcji.

## Audyty i analizy

Katalog `analizy/` zawiera raporty z audytów bezpieczeństwa, wydajności i SEO
oraz zapisy prac koncepcyjnych nad bazą wiedzy.
