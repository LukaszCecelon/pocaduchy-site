# Audyt wydajnosci

Data pomiaru: 2026-08-04. Repozytorium: `D:\poCADychy_STRONA\pocaduchy-site`. Produkcja: `https://pocaduchy.pl/`.

## Podsumowanie dla wlasciciela

Strona buduje sie poprawnie, generuje 27 publicznych stron i nie ma problemu z przesuwaniem ukladu w podstawowym pomiarze. Najwiekszy koszt pierwszej odslony nie pochodzi z obrazow strony glownej, tylko ze skryptow Google, fontow i runtime Docusaurusa. AdSense, GA4 i Funding Choices sa asynchroniczne, wiec nie blokuja parsera, ale realnie dodaja okolo 650-680 kB transferu na zimnej odslonie. Obrazy sa ogolnie nieduze jak na tresci inzynierskie, ale przejscie na WebP daloby okolo 2,7 MB oszczednosci w calym katalogu JPG/PNG. Nie nalezy zamieniac CAD-owych PNG na JPEG, bo tekst i linie straca ostrosc. Najslabszym technicznym detalem jest leniwe ladowanie pierwszego obrazu artykulu, ktory jest LCP. Fonty maja `font-display: swap`, ale sa ladowane przez `@import`, a to wydluza lancuch render-blocking CSS. Hosting jest statyczny na GitHub Pages, wiec naglowki cache i kompresja nie sa miejscem do napraw w repo.

## Pomiary bazowe

Polecenia i narzedzia:

- Build: `npm.cmd run build`, zmierzony `System.Diagnostics.Stopwatch` w PowerShellu.
- Artefakty: Node.js, `fs.statSync`, `zlib.gzipSync`.
- Produkcja: Chromium 139 przez tymczasowy Playwright z `Network.setCacheDisabled`, viewport mobilny 390 x 844, cache wylaczony.
- Obrazy: `sharp@0.33.5` poza repo, konwersja testowa do WebP w katalogu tymczasowym.
- PageSpeed Insights API zwrocilo HTTP 429, wiec CWV ponizej sa pomiarem laboratoryjnym w Chromium, nie danymi CrUX.

Build:

| Metryka | Wynik |
| --- | ---: |
| Czas `npm run build` | 67,937 s |
| HTML wygenerowane lacznie | 29 |
| Publiczne strony bez `404.html` i `admin/index.html` | 27 |
| Artykuly bloga | 19 |
| JS w `build/assets/js` | 32 pliki, 1171,4 kB raw, 377,0 kB gzip |
| CSS w `build/assets/css` | 1 plik, 99,0 kB raw, 18,5 kB gzip |

Najwieksze paczki JS z builda:

| Plik | Raw | Gzip |
| --- | ---: | ---: |
| `build/assets/js/common.df6efea4.js` | 456,9 kB | 133,1 kB |
| `build/assets/js/main.d193bd0b.js` | 450,9 kB | 143,3 kB |
| `build/assets/js/e8cc30f7.3f35d072.js` | 18,3 kB | 5,9 kB |
| `build/assets/js/c4f5d8e4.02053bd7.js` | 13,9 kB | 5,0 kB |

Pierwsza odslona produkcji, unikalne URL-e, cache wylaczony:

| Strona | Transfer laczny | Zasoby wlasne | Zasoby zewnetrzne | JS | CSS | Fonty | Obrazy |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 1019,2 kB | 342,1 kB | 677,1 kB | 769,8 kB | 24,9 kB | 159,2 kB | 51,3 kB |
| `/blog/polaczenie-wal-piasta` | 1211,9 kB | 557,7 kB | 654,2 kB | 777,2 kB | 24,9 kB | 159,2 kB | 231,4 kB |

CWV, pomiar lab w Chromium:

| Strona | LCP | Najwiekszy element | CLS | Syntetyczna reakcja klikniecia |
| --- | ---: | --- | ---: | ---: |
| `/`, mediana z 3 powtorzen | 484 ms | akapit hero `Rysunki, CAD...` | 0 | 32 ms |
| `/blog/polaczenie-wal-piasta` | 788 ms | okladka artykulu `/img/blog/polaczenie-wal-piasta-okladka.jpg` | 0 | 16 ms |

Rozklad `static/img`:

| Typ | Liczba | Waga |
| --- | ---: | ---: |
| JPG | 45 | 4249,6 kB |
| PNG | 26 | 1994,9 kB |
| MP4 | 2 | 1760,7 kB |
| ICO | 1 | 3,5 kB |

Najciezsze pliki w `static/img`:

| Plik | Waga |
| --- | ---: |
| `static/img/blog/pozornie-latwe-miejsca-projektu-test-palcow-chwytaka.mp4` | 1753,0 kB |
| `static/img/blog/projektowanie-wielobrylowe-czesc-1-zespol-z-czesci-wielobrylowej.png` | 236,2 kB |
| `static/img/blog/weryfikacja-cad-przed-produkcja-kolizje-i-bledy-cad.jpg` | 219,4 kB |
| `static/img/blog/polaczenie-wal-piasta-tuleja-zaciskowa-bez-przesuniecia.png` | 161,6 kB |
| `static/img/blog/polaczenie-wal-piasta-tuleja-zaciskowa-z-przesunieciem.png` | 160,4 kB |

## Ustalenia

### 1. Skrypty Google dominuja transfer pierwszej odslony

- **Waga**: srednia
- **Gdzie**: `docusaurus.config.js:65`, `docusaurus.config.js:67`, `docusaurus.config.js:221`, `docusaurus.config.js:226`
- **Co jest nie tak**: produkcyjna strona glowna pobrala 677,1 kB zasobow zewnetrznych przy 342,1 kB zasobow wlasnych. Najwieksze zewnetrzne pliki w pomiarze to AdSense `show_ads_impl.js` 185,0 kB, GA4 `gtag/js` 165,5 kB, Funding Choices 70,5 kB i `adsbygoogle.js` 65,0 kB. Wszystkie byly non-blocking, ale konkuruja o transfer i CPU z wlasnym JS.
- **Dlaczego to ma znaczenie**: uzytkownik na wolnym laczu placi za reklamy i analityke zanim zacznie korzystac ze strony. To nie psuje CLS i nie blokuje parsera, ale jest najwiekszym skladnikiem zimnej odslony.
- **Jak naprawic**: nie usuwac AdSense, jesli reklamy maja dzialac. Do rozwazenia tylko swiadomie: opoznic AdSense do `load` albo po pierwszej interakcji, mierzac czy nie psuje to weryfikacji i przychodow. GA4 jest mniejszym problemem biznesowo, ale nadal mozna zostawic obecny Consent Mode, bo skrypt jest async.
- **Koszt**: 0,5-1 dnia na eksperyment i pomiar porownawczy. Ryzyko srednie, bo zmiana moze wplynac na reklamy i pomiar ruchu.

### 2. Runtime Docusaurusa i Reacta jest duzy jak na statyczna strone tresciowa

- **Waga**: srednia
- **Gdzie**: build `build/assets/js/common.df6efea4.js`, build `build/assets/js/main.d193bd0b.js`
- **Co jest nie tak**: sam build ma 1171,4 kB JS raw i 377,0 kB gzip. Dwa glowne pliki to `common` 456,9 kB raw i `main` 450,9 kB raw. Na produkcyjnej stronie glownej wlasne zasoby maja 342,1 kB transferu, z czego najwieksze sa `main` 144,6 kB i `common` 134,6 kB.
- **Dlaczego to ma znaczenie**: to jest staly koszt kazdej zimnej wizyty. Na telefonie slaby procesor musi pobrac, sparsowac i uruchomic SPA nawet dla strony, ktora w duzej mierze jest statycznym HTML-em.
- **Jak naprawic**: krotkoterminowo nie ma malej poprawki w jednym pliku. Realna redukcja wymagalaby ograniczenia globalnych zaleznosci albo innej architektury renderowania statycznej tresci. W obecnym projekcie sensowniejsze sa mniejsze kroki: lazy load rzadkich komponentow i pilnowanie, zeby nowe funkcje nie trafialy do globalnego bundle.
- **Koszt**: od 1 dnia dla pojedynczych lazy importow do wielu dni dla zmiany architektury. Ryzyko wysokie przy przepisywaniu, niskie przy kontroli nowych zaleznosci.

### 3. Fonty maja `swap`, ale sa ladowane przez render-blocking `@import`

- **Waga**: srednia
- **Gdzie**: `src/css/custom.css:6`, `src/css/custom.css:18`, `src/css/custom.css:32`, `src/css/custom.css:33`
- **Co jest nie tak**: CSS importuje Google Fonts przez `@import`. Produkcyjny pomiar pokazal 1,3 kB transferu CSS z Google Fonts, 159,2 kB fontow WOFF2 oraz `renderBlockingStatus: blocking` dla CSS fontow. CSS z Google zawiera 40 reguł `@font-face` i 40 razy `font-display: swap`, wiec same fonty nie powinny blokowac tekstu, ale lancuch CSS jest blokujacy.
- **Dlaczego to ma znaczenie**: przegladarka musi pobrac lokalny CSS, potem CSS z Google Fonts, zanim zbuduje pelny CSSOM. Dodatkowo font swap moze zmienic metryki tekstu. W pomiarze artykulu zaobserwowalem zrodlo layout shift na `H1.articleTitle_XLYC`, choc finalny CLS wyniosl 0.
- **Jak naprawic**: przeniesc font stylesheet z `@import` do `docusaurus.config.js` jako `preconnect` do `fonts.gstatic.com` i zwykly `<link rel="stylesheet">`, albo self-hostowac tylko potrzebne subsety i wagi. Jesli wyglad pozwala, ograniczyc liczbe rodzin lub wag, np. zostawic Rajdhani 700, IBM Plex Sans 400/600/700 i IBM Plex Mono 500.
- **Koszt**: 0,5-1 dnia plus wizualna kontrola typografii. Ryzyko niskie, jesli zostana te same kroje.

### 4. KaTeX CSS laduje sie na kazdej stronie, mimo ze build nie wygenerowal wzorow

- **Waga**: niska
- **Gdzie**: `docusaurus.config.js:75`, `docusaurus.config.js:77`, `src/components/BlockRenderer.js:159`
- **Co jest nie tak**: `npm run build` wypisal `wzory=0`, ale produkcyjna strona glowna i artykul pobieraja `katex.min.css`. Transfer to 3,6-4,1 kB, po rozpakowaniu 22,8 kB, a `renderBlockingStatus` w Chromium to `blocking`.
- **Dlaczego to ma znaczenie**: koszt jest maly w kB, ale to zewnetrzny, render-blocking stylesheet na kazdej stronie, takze tam, gdzie nie ma ani jednego wzoru.
- **Jak naprawic**: dopoki nie ma blokow `wzor`, usunac globalny stylesheet KaTeX. Gdy wzory wroca, ladowac CSS tylko na stronach zawierajacych blok `wzor` albo self-hostowac go razem z reszta CSS.
- **Koszt**: 1-2 godziny. Ryzyko niskie, ale trzeba sprawdzic przyszle artykuly ze wzorami.

### 5. Okladka artykulu jest LCP, ale dostaje `loading="lazy"`

- **Waga**: srednia
- **Gdzie**: `src/components/BlockRenderer.js:56`, `src/components/BlogArticleTemplate.js:277`
- **Co jest nie tak**: `BlockRenderer` ustawia `loading="lazy"` dla kazdego bloku obrazu. W przykladowym artykule pierwszym blokiem jest okladka, a pomiar LCP wskazal wlasnie `/img/blog/polaczenie-wal-piasta-okladka.jpg` jako najwiekszy element. Obraz mimo `lazy` zaladowal sie szybko w laboratorium, LCP 788 ms, ale priorytet jest ustawiony odwrotnie do roli elementu.
- **Dlaczego to ma znaczenie**: na wolniejszym laczu przegladarka moze opoznic obraz, ktory decyduje o LCP. To typowy przypadek, gdzie `lazy` jest dobre dla dalszych obrazow, ale zle dla pierwszego ekranu.
- **Jak naprawic**: przekazac do `BlockRenderer` informacje, ze pierwszy obraz artykulu ma byc `loading="eager"` i `fetchPriority="high"`, albo wyrenderowac okladke jako osobny element przed blokami. Pozostale obrazy zostawic jako `lazy`.
- **Koszt**: 2-4 godziny. Ryzyko niskie, wymaga sprawdzenia kilku artykulow.

### 6. WebP daje realna oszczednosc, ale PNG z CAD nie powinny isc do JPEG

- **Waga**: srednia
- **Gdzie**: `static/img/**`, `src/components/BlockRenderer.js:56`, `src/pages/blog/index.js:74`, `src/components/BlogArticleTemplate.js:182`
- **Co jest nie tak**: testowa konwersja 71 plikow JPG/PNG do WebP dala spadek z 6244,6 kB do 3517,1 kB, czyli 2727,5 kB oszczednosci i 43,7 procent. Dla JPG oszczednosc wyniosla 1828,6 kB, dla PNG 898,9 kB przy WebP lossless. Przykladowa okladka artykulu spadla ze 111,5 kB do 69,9 kB, a `og-pocaduchy.jpg` z 98,3 kB do 34,0 kB.
- **Dlaczego to ma znaczenie**: pierwsza odslona artykulu pobrala 231,4 kB obrazow, a po dluzszym oczekiwaniu przegladarka zaczyna dobierac kolejne lazy images. WebP zmniejsza koszt czytania artykulow bez ruszania tresci.
- **Jak naprawic**: dodac warianty WebP i renderowac przez `<picture>` z fallbackiem JPG/PNG. Dla CAD-owych PNG uzywac WebP lossless albo zostawic PNG, nie JPEG. Najpierw przerobic najciezsze pliki i okladki, bo tam zysk jest najwiekszy.
- **Koszt**: 0,5-1 dnia na skrypt generujacy warianty plus kontrola wizualna. Ryzyko srednie, bo trzeba dobrze obsluzyc fallbacki i nie pogorszyc czytelnosci rysunkow.

### 7. Zapetlone wideo pobiera poster i poczatek MP4 bez przewijania

- **Waga**: niska
- **Gdzie**: `src/components/BlockRenderer.js:120`, `src/components/BlockRenderer.js:138`, `src/components/BlockRenderer.js:140`, `content/blog/pozornie-latwe-miejsca-projektu.json:68`
- **Co jest nie tak**: najwiekszy plik w `static/img` to `pozornie-latwe-miejsca-projektu-test-palcow-chwytaka.mp4`, 1753,0 kB. Na produkcyjnej stronie artykulu bez przewijania Chromium pobral poster 154,2 kB oraz dwa zakresy MP4: 0,3 kB i 25,3 kB. Kod ustawia `autoPlay`, `loop` i `preload="auto"` dla zapetlonych nagran.
- **Dlaczego to ma znaczenie**: obecnie koszt pierwszej odslony tej strony to glownie poster, nie caly film, ale przegladarki moga roznie traktowac `preload="auto"`. Poster 153,9 kB jest wiekszy niz wiele okladek.
- **Jak naprawic**: zmniejszyc poster, najlepiej WebP/JPG zoptymalizowany pod 16:9 albo faktyczny kadr, oraz rozwazyc `preload="metadata"` dla wideo ponizej pierwszego ekranu. Autoplay zostawic tylko tam, gdzie nagranie jest argumentem tekstu i jest widoczne od razu.
- **Koszt**: 2-4 godziny. Ryzyko niskie.

### 8. Animacje strony glownej sa prawie dobrze zrobione, ale parallax nie ma throttlingu

- **Waga**: niska
- **Gdzie**: `src/pages/index.js:171`, `src/pages/index.js:184`, `src/pages/index.js:195`, `src/pages/index.module.css:35`, `src/pages/index.module.css:40`, `src/pages/index.module.css:52`, `src/pages/index.module.css:180`
- **Co jest nie tak**: animacje CSS uzywaja glownie `transform` i `opacity`, a `prefers-reduced-motion` jest obslugiwane. Slabszy detal jest w `useHeroParallax`: na kazdy `mousemove` kod wywoluje `getBoundingClientRect()` i od razu ustawia zmienne CSS, bez `requestAnimationFrame`. W pomiarze mobilnym nie bylo dlugich zadan na stronie glownej po powtorzeniach, ale desktopowy ruch mysza moze wywolac niepotrzebny koszt.
- **Dlaczego to ma znaczenie**: czeste odczyty geometrii i zapisy stylow w obsludze ruchu kursora moga wymuszac przeliczanie ukladu albo zwiekszac koszt klatek na slabszym laptopie. To nie jest pilne, bo hero dziala na transformach i nie wystapil mierzony problem INP.
- **Jak naprawic**: zapisac ostatnia pozycje kursora, aktualizowac CSS w `requestAnimationFrame`, a wymiary hero odswiezac przy `pointerenter` i `resize`, nie przy kazdym ruchu. Mozna tez zmienic `mousemove` na `pointermove`.
- **Koszt**: 2-3 godziny. Ryzyko niskie.

## Czego nie warto robic

- Nie warto proponowac napraw przez naglowki HTTP w repo. Produkcja jest na GitHub Pages, a pomiar HTML pokazal `Cache-Control: max-age=600`; wlasne naglowki cache, HSTS albo kompresja wymagalyby warstwy typu Cloudflare lub zmiany hostingu.
- Nie warto usuwac AdSense jako rekomendacji wydajnosciowej, bo z kontekstu wynika, ze reklamy maja dzialac. Mozna tylko swiadomie mierzyc wariant opoznionego ladowania.
- Nie warto zamieniac CAD-owych PNG na JPEG. Pomiar oszczednosci trzeba robic dla WebP lossless albo zostawic PNG, bo JPEG rozmywa tekst i cienkie linie.
- Nie warto przepisywac calej strony z Docusaurusa tylko po to, zeby zbic kilkaset kB JS. To duzy koszt i ryzyko, a obecne lab CWV sa dobre: LCP ponizej 1 s, CLS 0 i syntetyczne klikniecie 16-32 ms.
- Nie warto traktowac KaTeX jako glownego problemu transferu. Jest render-blocking i niepotrzebny przy `wzory=0`, ale jego transfer to tylko okolo 4 kB, znacznie mniej niz Google Ads, GA4, fonty i runtime aplikacji.
