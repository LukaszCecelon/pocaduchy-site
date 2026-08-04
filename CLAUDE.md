# poCADuchy — instrukcje projektowe

## Model pracy (ustalony z Łukaszem, obowiązuje od 2026-07-27)

**Łukasz dostarcza materiały — Claude wykonuje wszystko na stronie samodzielnie, end-to-end.**

- Łukasz przysyła pliki (PDF, zdjęcia, HEIC, dokumenty, arkusze, zrzuty ekranu) albo opisuje pomysł.
- Claude sam: analizuje materiał, decyduje jak go pokazać, pisze kod/treść, weryfikuje w przeglądarce, commituje i publikuje.
- **Nie** wymagaj od Łukasza obsługi narzędzi ani plików konfiguracyjnych — on wysyła materiał, Claude robi resztę.
- Nie zasypuj pytaniami: podejmuj rozsądne decyzje projektowe samodzielnie, pytaj tylko gdy różne odczytania prowadzą do istotnie różnej pracy.

## Głos Łukasza (czytaj PRZED pisaniem czegokolwiek)

W katalogu **`styl/`** leżą dokumenty kalibracyjne opisujące, jak Łukasz pisze. To materiał od niego, oparty na analizie jego postów i artykułów. **Przeczytaj je przed napisaniem jakiejkolwiek treści na stronę** i streść ich wymagania w każdej specyfikacji zadania dla Codeksa, jeśli zadanie obejmuje pisanie tekstu.

- `styl/00_GLOS_I_STYL_KALIBRACJA.md` — podstawa: słownictwo, rytm, hooki, zakończenia, ton
- `styl/02_GLOS_I_STYL_OPERACYJNY.md` — skrót operacyjny do szybkiego sprawdzenia
- `styl/07_ANTYPRZYKLADY_I_FILTRY.md` — filtry jakości, checklista **po** napisaniu tekstu
- `styl/README.md` — jak przekładać te zasady z LinkedIna na stronę

W skrócie, ale to nie zastępuje lektury: Łukasz pisze jak praktyk projektowania maszyn, nie jak konsultant. Konkretnie, półformalnie, miejscami potocznie, z suchym humorem i bez korpomowy. Każdy tekst musi mieć techniczną kotwicę (CAD, montaż, dokumentacja, decyzja konstrukcyjna) i przejść filtr „czy to mógł napisać każdy?". Jeśli mógł, tekst wymaga zawężenia do realiów konstruktora.

Zakazane wprost: „w dzisiejszych czasach", „jako doświadczony konstruktor", „oto 5 lekcji", „kompleksowe rozwiązania", „pasjonat", motywacja bez technicznego wniosku, CTA typu „co o tym myślicie?".

**Każdy tekst ma być dostarczany w formie łatwej do edycji przez Łukasza** — czyli w plikach `content/*.json`, nigdy zaszyty w kodzie React.

## Styl tekstu (obowiązuje bezwzględnie)

**Nie stosuj myślnika em dash („—") w żadnym tekście widocznym na stronie.** Łukasz uznaje go za marker treści generowanej przez AI. Zamiast niego: dwukropek, przecinek, kropka albo przebudowane zdanie. Zasada dotyczy treści artykułów (`content/**/*.json`), tekstów w `src/pages/*.js`, `docusaurus.config.js` i `static/llms.txt`. Komentarze w kodzie są wyłączone spod tej reguły.

Ten sam zakaz **musi trafiać do każdej specyfikacji zadania dla Codeksa**, jeśli zadanie obejmuje pisanie lub redagowanie tekstu.

Przed publikacją sprawdź: `grep -rn "—" content src/pages docusaurus.config.js static/llms.txt`

## Publikowanie

Standardowa ścieżka po każdej zmianie: edycja → `npm run build` (sanity check) → podgląd/weryfikacja → `git commit` → `git push` na `main`. GitHub Actions sam publikuje na **pocaduchy.pl** (2–3 min). Nocny cron odświeża odcinki i licznik subskrybentów.

Przy większych zmianach: `git tag przed-<nazwa>` przed startem, żeby dało się wycofać (`git revert przed-<nazwa>..HEAD`).

## Praca z plikami od Łukasza

- **PDF** — czytaj przez Read (parametr `pages`); przy skanach użyj skilla `pdf`.
- **HEIC (zdjęcia z iPhone'a)** — konwersja: `pillow-heif` jest zainstalowane (`python -c "import pillow_heif; pillow_heif.register_heif_opener()"` + PIL). Przy gęstych tabelach kadruj i powiększaj, zanim przepiszesz dane.
- **Prawa autorskie** — nie reprodukuj skanów cudzych książek/poradników na stronie. Dane normatywne (DIN/ISO) i fakty są OK, ale przepisz je do **własnych** tabel i napisz oryginalny tekst.
- Zdjęcia do publikacji: `static/img/`, w razie potrzeby zmniejsz/skonwertuj (waga strony).

## Stan techniczny

- **Produkcja: gałąź `main`** — Docusaurus 3.10, wyłączone presety docs/blog, własne strony React w `src/pages/`, design system `--pc-*` w `src/css/custom.css`.
- Treść artykułów: `content/wiedza/<kategoria>/<slug>.json` i `content/blog/<slug>.json` — bloki renderowane przez `src/components/BlockRenderer.js` (typy: `tekst`, `obraz`, `galeria`, `tabela`, `wzor` KaTeX, `rysunek` SVG). `scripts/build-content-pages.mjs` sam generuje strony i listy przy buildzie.
- Dane automatyczne: `scripts/fetch-episodes.mjs` (odcinki z RSS YouTube), `scripts/fetch-subscribers.mjs` (licznik subskrybentów) — hooki `prestart`/`prebuild`.
- Decap CMS (`/admin`), pliki `.bat` i katalog roboczy `next-app/` zostały **usunięte** (decyzja Łukasza z 2026-08-04). Nie przywracaj ich bez wyraźnej prośby.
- Gałąź **`next-tina`** to zaparkowany eksperyment (Next.js + TinaCMS, edycja wizualna). To jedyne miejsce, gdzie ten kod istnieje. **Nie usuwać gałęzi.** Wracamy do tematu dopiero przy świadomej zmianie architektury.
- Pełny opis architektury i uzasadnienie decyzji: `ARCHITEKTURA.md`.
