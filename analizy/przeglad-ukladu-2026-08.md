# Przegląd układu strony, sierpień 2026

## Wniosek w skrócie

Znalazłem trzy rzeczy wymagające decyzji:

1. `/social/` nie istnieje. Lokalny build i produkcja zwracają stronę 404 przy każdej badanej szerokości.
2. Przy 375 px wszystkie 19 właściwych wpisów blogowych przewijają się w bok. W zależności od wpisu szerokość dokumentu wynosi od 393 do 647 px zamiast maksymalnie 375 px.
3. Przypisy pod tabelą gwintów są w tym samym poziomym przewijaku co tabela. Po przesunięciu tabeli do prawej krawędzi przypisy całkowicie znikają z widoku przy 375 px.

Nie znalazłem ponownego przypadku rozciągnięcia obrazu przez atrybuty `width` i `height`. Obecna poprawka logo w pasku działa. Wszystkie sprawdzone reguły wymiarujące obrazy mają parę `width` i `height`, przy czym drugim wymiarem bywa świadome `auto`.

Nie wprowadzałem poprawek. Propozycje są opisane przy każdym problemie.

## Jak sprawdzałem

- `npm run build` zakończyło się poprawnie w kopii repozytorium poza katalogiem projektu.
- Build utworzył 52 trasy. Skrypt wymiarów zmierzył 91 plików rastrowych. Trzy pominięte pliki to favicon i dwa pliki MP4, a nie obrazy bez rozpoznanych wymiarów.
- W Chromium 151 sprawdziłem 27 wymaganych adresów przy szerokościach 375, 768 i 1280 px. Wysokość okna wynosiła 900 px.
- Dodatkowo sprawdziłem wszystkie 19 wpisów blogowych przy 375 px, ponieważ pięć pierwszych próbek miało wspólny błąd.
- Dla obrazów przeszedłem wszystkie 52 trasy: 259 renderowanych wystąpień, 94 unikalne adresy źródłowe. Każde wystąpienie miało oba atrybuty wymiarów.
- W produkcji potwierdziłem dwa reprezentatywne przypadki bloga oraz `/social/`.
- Wartości w tabelach poniżej mają postać `scrollWidth / innerWidth`. Błąd zachodzi, gdy pierwsza wartość jest większa od drugiej. Wartość 360 przy oknie 375 px i 753 przy oknie 768 px wynika z miejsca zajętego przez pionowy pasek przewijania i jest prawidłowa.

## Błędy widoczne od razu

### 1. Brak strony `/social/`

Zakres:

- lokalny podgląd: `/social/`, 375, 768 i 1280 px;
- produkcja: `https://pocaduchy.pl/social/`.

Pomiar:

- 375 px: tytuł `Strona nie została znaleziona | poCADuchy`, układ `360 / 375`;
- 768 px: ten sam tytuł, układ `753 / 768`;
- 1280 px: ten sam tytuł, układ `1280 / 1280`;
- produkcja zwraca HTTP 404.

To nie jest błąd szerokości. Żądana strona po prostu nie istnieje.

Proponowana poprawka:

- jeżeli `/social/` ma być osobną stroną, dodać `src/pages/social.js`;
- jeżeli ma być skrótem do innego miejsca, dodać jawne przekierowanie w konfiguracji `@docusaurus/plugin-client-redirects`;
- najpierw trzeba zdecydować, jaki ma być adres docelowy. Tego nie da się bezpiecznie wywnioskować z obecnego kodu.

### 2. Wszystkie wpisy blogowe przewijają się w bok przy 375 px

Oczekiwanie: `document.documentElement.scrollWidth <= 375`.

Rzeczywisty wynik:

| Grupa wpisów | `scrollWidth` | Element narzucający szerokość |
| --- | ---: | --- |
| 16 wpisów wymienionych niżej | 393 px | `.articleWrap`, którego minimalną szerokość podnosi `.discussBox` i `.discussBtn` |
| `/blog/standaryzacja-w-biurze-konstrukcyjnym/` | 486 px | tabela w `.tabela` oraz wspólny kontener `.articleWrap` |
| `/blog/elektrozawory-pneumatyczne-dobor/` | 626 px | tabela w `.tabela` rozszerza `.articleWrap` do 625,9 px |
| `/blog/polaczenie-wal-piasta/` | 647 px | tabela w `.tabela` rozszerza `.articleWrap` do 647,0 px |

Wpisy z wynikiem 393 px:

- `/blog/bledy-w-projekcie-konstrukcyjnym/`
- `/blog/design-for-maintenance-przezbrojenia/`
- `/blog/dobor-sprzegla-do-aplikacji/`
- `/blog/elementy-znormalizowane-handlowki/`
- `/blog/kick-off-projektu-konstrukcyjnego/`
- `/blog/koszty-a-jakosc-w-projektowaniu-maszyn/`
- `/blog/narzedzia-pracy-konstruktora/`
- `/blog/onenote-notes-projektu/`
- `/blog/pozornie-latwe-miejsca-projektu/`
- `/blog/projektowanie-wielobrylowe-case-study/`
- `/blog/projektowanie-wielobrylowe-czesc-1/`
- `/blog/projektowanie-z-niepelnymi-danymi/`
- `/blog/szacowanie-czasu-projektowania/`
- `/blog/tuleje-taper-lock-dobor/`
- `/blog/umiejetnosci-poczatkujacego-konstruktora/`
- `/blog/weryfikacja-cad-przed-produkcja/`

Przyczyna wspólna dla 16 wpisów:

- dostępna szerokość treści w prawidłowo zwężonym artykule wynosi 296 px;
- `.discussBtn` ma `white-space: nowrap` i minimalną szerokość 269 px;
- `.discussBox` dodaje po 30 px odstępu z obu stron, więc jego minimalna zawartość ma 329 px;
- `.articleWrap` dodaje po 32 px, więc cały kontener wybiera 393 px;
- zmierzony `.articleWrap`: `393 x 8104,4 px` w przykładowym wpisie OneNote;
- zmierzony `.discussBtn`: `269 x 52,8 px`.

Przyczyna dodatkowa w trzech wpisach z tabelami:

- `.tabela` ma `overflow-x: auto`, ale rodzic `.articleWrap` nie ma jawnych `width: 100%` i `min-width: 0`;
- rodzic wybiera więc szerokość minimalną tabeli, zanim przewijak dostanie szansę ograniczyć się do ekranu;
- efekt jest taki, że przewija się cała strona, a nie tylko pudełko tabeli.

Produkcja potwierdza błąd:

- `https://pocaduchy.pl/blog/onenote-notes-projektu/`: `393 / 375`;
- `https://pocaduchy.pl/blog/elektrozawory-pneumatyczne-dobor/`: `626 / 375`.

Proponowana poprawka w `src/pages/blog/blog.module.css`:

```css
.articleWrap {
  width: 100%;
  min-width: 0;
}
```

Jako dodatkowe zabezpieczenie przycisku można rozważyć:

```css
@media (max-width: 640px) {
  .discussBtn {
    min-width: 0;
    white-space: normal;
    text-align: center;
  }
}
```

Pierwszą regułę zasymulowałem w przeglądarce bez zmiany pliku. Wyniki reprezentatywne:

- elektrozawory: `626 -> 360 px`;
- OneNote: `393 -> 360 px`;
- wał-piasta: `647 -> 360 px`;
- pozornie łatwe miejsca: `393 -> 360 px`.

Następnie zasymulowałem ją na wszystkich 19 wpisach. Po zmianie żaden nie miał `scrollWidth` większego od 375 px.

## Błąd widoczny po wykonaniu konkretnej czynności

### 3. Przypisy tabeli gwintów odjeżdżają razem z tabelą

Adres: `/wiedza/gwinty-metryczne-tabela/`.

Selektory: `.tabelaPierscieniWrap` i znajdująca się w nim `.przypisy`.

Przy 375 px:

- przewijak: lewa krawędź 32 px, prawa 328 px, szerokość użytkowa 294 px;
- szerokość zawartości przewijaka: 851 px;
- maksymalne przesunięcie poziome: 557 px;
- przypisy przed przesunięciem: od 33 do 327 px, widoczne 294 px;
- przypisy po przesunięciu tabeli do prawej: od -524 do -230 px, widoczne 0 px.

Przy 768 px po maksymalnym przesunięciu widać 524 z 687 px listy. Przy 1280 px widać 786 z 818 px. Najbardziej czytelny błąd występuje więc na telefonie.

Sama tabela przewija się prawidłowo we własnym pudełku. Problemem jest tylko umieszczenie zwykłego tekstu przypisów wewnątrz tego samego przewijaka.

Proponowana poprawka w `TabelaGwintowBlock`:

```jsx
<div className={styles.tabelaPierscieniWrap}>
  <table>{/* tabela */}</table>
</div>
<ListaPrzypisow lista={przypisy.lista} prefiks={prefiks} />
```

Lista powinna być rodzeństwem przewijaka, a nie jego dzieckiem. Dla tabel chropowatości obecnie nie ma widocznego problemu, bo te tabele nie wymagają poziomego przesuwania przy żadnej badanej szerokości.

## Obrazy z atrybutami wymiarów

### Wynik pełnej inwentaryzacji

- 259 renderowanych wystąpień obrazów na 52 trasach;
- 94 unikalne adresy obrazów;
- 259 z 259 ma oba atrybuty `width` i `height`;
- 0 rozbieżności między proporcją atrybutów a proporcją rzeczywistego pliku;
- 0 niecelowych rozciągnięć większych niż 2 procent;
- dwa obrazy nie zostały pobrane przez mechanizm `loading="lazy"` w jednym zbiorczym przebiegu, więc sprawdziłem je bezpośrednio na dysku: `852 x 685` i `1192 x 258`, dokładnie jak w atrybutach.

Wniosek dla szukanego mechanizmu: nie ma obecnie obrazu, dla którego końcowy zestaw reguł CSS ustawia tylko jeden wymiar i pozostawia drugi pod kontrolą liczbowego atrybutu HTML. Każda reguła `width` lub `height` ma parę w postaci drugiego wymiaru albo `auto`.

Wspólna reguła Infimy `img { max-width: 100% }` jedynie ogranicza maksymalny rozmiar i sama nie narzuca szerokości. Żaden element `img` nie ma osobnej, liczbowej reguły CSS `aspect-ratio`. Przeglądarka pokazuje dla nich `auto W / H`, czyli proporcję wynikającą z atrybutów. Jawne proporcje 16:9 są ustawione na pudełkach miniatur, między innymi `.latestThumb`, `.thumb`, `.postThumb` i `.relatedThumb`, a obraz wypełnia pudełko przez `width: 100%`, `height: 100%` i `object-fit: cover`.

### Sprawdzone role obrazów

| Miejsce | Atrybuty i plik | CSS wpływający na rozmiar | Pomiar i ocena |
| --- | --- | --- | --- |
| Logo w pasku, wszystkie strony | `504 x 504`, plik `504 x 504` | Infima: `.navbar__logo img { height: 100% }`; projekt: `.navbar__logo img { width: auto; object-fit: cover }`; globalnie `max-width: 100%` | `32 x 32 px` przy 375 i 1280 px. Poprawka działa. Bez `width: auto` wróciłby opisany błąd. |
| Logo w stopce | brak elementu `img` | `footer` w `docusaurus.config.js` ma tylko kolumny linków i copyright | Nie da się zmierzyć, bo w obecnej stopce nie ma logo. Nie ma też ryzyka rozciągnięcia. |
| Hero strony głównej | atrybuty `252 x 252`, plik `504 x 504`, proporcja w obu 1:1 | `.heroBadge img { width: 100%; height: 100%; object-fit: cover }` | `196 x 196 px` przy 375 px, `252 x 252 px` przy 1280 px. Bez zniekształcenia. |
| Najnowszy odcinek na głównej | `480 x 360`, YouTube `480 x 360` | `.latestThumb img { width: 100%; height: 100%; object-fit: cover }`, rodzic 16:9 | `294 x 165,4 px` przy 375 px i `501,3 x 282,0 px` przy 1280 px. Różnica proporcji 33,3 procent jest celowym kadrowaniem 4:3 do 16:9. |
| Lista `/odcinki/` | każda miniatura `480 x 360`, rzeczywiście `480 x 360` | `.thumb img { width: 100%; height: 100%; object-fit: cover }`, rodzic 16:9 | `294 x 165,4`, `332,5 x 187,0` i `356,7 x 200,6 px`. Różnica 33,3 procent jest celowa. |
| Avatar na `/o-mnie/` | `504 x 504`, plik `504 x 504` | `.avatar { width: 168px; height: 168px; object-fit: contain }`, na telefonie oba wymiary 116 px | `116 x 116 px` przy 375 px, `168 x 168 px` przy 1280 px. Poprawnie. |
| Avatar autora pod wpisami | `504 x 504`, plik `504 x 504` | `.authorAvatar { width: 72px; height: 72px; object-fit: contain }` | `72 x 72 px` przy każdej szerokości. Poprawnie. |
| Okładki na `/blog/` | atrybuty zgodne z każdym plikiem, najczęściej `1280 x 720` | `.postThumb img { width: 100%; height: 100%; object-fit: cover }` | 19 obrazów, `294 x 165,4 px` przy 375 px i `356,7 x 200,6 px` przy 1280 px. Bez niecelowego rozciągnięcia. |
| Miniatury powiązanych wpisów | atrybuty zgodne z plikami | `.relatedThumb img { width: 100%; height: 100%; object-fit: cover }` | `559,9 x 315,0 px` przy 375 px i `206 x 115,9 px` przy 1280 px. Kadrowanie jest świadome. |
| Obrazy w treści artykułów | różne wymiary, wszystkie zgodne z plikami | `.obraz img { width: 100%; height: auto }`, globalnie `max-width: 100%` | Proporcje zachowane przy wszystkich trzech szerokościach. |
| Galerie w artykule o pozycjonowaniu | 14 plików, atrybuty zgodne | `.galeriaImg { width: 100%; height: 180px; object-fit: cover }` | `296 x 180 px` przy 375 px i `404 x 180 px` przy 1280 px. Kadrowanie jest celową decyzją galerii. |
| Plakaty i nagrania MP4 | `244 x 240` oraz `1428 x 1310`; plakat, atrybuty i naturalny rozmiar wideo są zgodne | `.wideo video { width: 100%; height: auto }` | Pierwsze nagranie: `561,9 x 552,7 px` przy 375 px i `656 x 645,3 px` przy 1280 px. Proporcja zachowana. Drugie zachowuje się tak samo. |
| Obrazy pierścieni na `/narzedzia/` | `408 x 553` i `464 x 581`, zgodne z plikami | `.znakFoto img { width: auto; height: 100%; max-width: 44%; object-fit: contain }` | Pierwszy `60,9 x 82,6 px`. Drugi wymiar jest jawnie `auto`, więc atrybut szerokości nie rozciąga obrazu. |
| Zdjęcie w kalkulatorze pierścieni | `551 x 612`, plik `551 x 612` | `.foto img { width: 100%; height: auto; object-fit: contain }` | `128 x 142,2 px`. Poprawnie. |

### Jeden pomiar ponad próg 2 procent, ale bez deformacji

Adres: `/blog/onenote-notes-projektu/`, obraz `onenote-notes-projektu-agenda-spotkania.png`.

- naturalny rozmiar i atrybuty: `1192 x 258`, proporcja 4,620;
- `getBoundingClientRect()`: `329 x 72,766 px`, różnica 2,1 procent;
- obraz ma ramkę 1 px z każdej strony i `box-sizing: border-box`;
- po odjęciu ramki proporcja pola z obrazem wynosi 4,621.

To nie jest rozciągnięcie. Próg przekracza wyłącznie ramka wliczona przez `getBoundingClientRect()` do bardzo niskiego obrazu. Proponowana poprawka: żadna. W automatycznym teście warto porównywać pole treści po odjęciu obramowania.

## Układ na żywo

### Poziome przewijanie na wymaganych adresach

| Adres | 375 px | 768 px | 1280 px | Ocena |
| --- | ---: | ---: | ---: | --- |
| `/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/wiedza/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/wiedza/chropowatosc-powierzchni/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/wiedza/gwinty-metryczne-tabela/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze, tabela przewija się lokalnie |
| `/wiedza/pozycjonowanie-czesci-w-maszynie/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/wiedza/rowki-pod-pierscienie-osadcze-seger/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze, tabela przewija się lokalnie tylko gdy jest za szeroka |
| `/narzedzia/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/narzedzia/pasowania/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/narzedzia/pierscienie-osadcze/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/przelicznik/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/przelicznik/cisnienie/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze, tabela przewija się lokalnie |
| `/przelicznik/dlugosc/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/przelicznik/moc/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/przelicznik/moment-obrotowy/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/przelicznik/sila/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/przelicznik/temperatura/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/blog/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/blog/elektrozawory-pneumatyczne-dobor/` | 626 / 375 | 753 / 768 | 1265 / 1280 | błąd przy 375 px |
| `/blog/onenote-notes-projektu/` | 393 / 375 | 753 / 768 | 1265 / 1280 | błąd przy 375 px |
| `/blog/polaczenie-wal-piasta/` | 647 / 375 | 753 / 768 | 1265 / 1280 | błąd przy 375 px |
| `/blog/pozornie-latwe-miejsca-projektu/` | 393 / 375 | 753 / 768 | 1265 / 1280 | błąd przy 375 px |
| `/blog/projektowanie-wielobrylowe-case-study/` | 393 / 375 | 753 / 768 | 1265 / 1280 | błąd przy 375 px |
| `/odcinki/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/odcinki/ruchomy-model-robota-ilogic/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/uslugi/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/o-mnie/` | 360 / 375 | 753 / 768 | 1265 / 1280 | dobrze |
| `/social/` | 360 / 375 | 753 / 768 | 1280 / 1280 | układ 404 się mieści, ale strony brak |

### Tabele

Tabela chropowatości, obie części Ra i Rz:

| Szerokość okna | Tabela | Pudełko | Przewijanie wewnętrzne |
| ---: | ---: | ---: | --- |
| 375 px | 294 px | 294 px | nie, całość się mieści |
| 768 px | 687 px | 687 px | nie |
| 1280 px | 818 px | 818 px | nie |

To spełnia wymaganie. Pozostałe cztery zwykłe tabele w tym artykule również nie rozszerzają dokumentu.

Tabela gwintów:

| Szerokość okna | Tabela | Widoczna część pudełka | Wewnętrzna szerokość przewijaka |
| ---: | ---: | ---: | ---: |
| 375 px | 850,9 px | 294 px | 851 px |
| 768 px | 850,9 px | 687 px | 851 px |
| 1280 px | 850,9 px | 818 px | 851 px |

Dokument nie przewija się w bok. Przewija się tylko pudełko tabeli. Dodatkowe 33 px przewijania przy 1280 px wynika z dłuższych nagłówków z jednostkami dodanych w `cc0e261` i jest akceptowalne.

Tabele rowków DIN 471 i DIN 472:

| Szerokość okna | Tabela | Pudełko | Ocena |
| ---: | ---: | ---: | --- |
| 375 px | 640 px | 294 px | prawidłowe przewijanie w pudełku |
| 768 px | 687 px | 687 px | mieści się bez przewijania |
| 1280 px | 818 px | 818 px | mieści się bez przewijania |

Tabele sześciu przeliczników wymiarów:

- przy 375 px pudełko ma 318 px, a tabele od 560 do 1102 px, więc przewijają się lokalnie;
- przy 768 px tylko ciśnienie i moment nadal wymagają przewijania;
- przy 1280 px tylko ciśnienie jest szersze od pudełka: 1102 wobec 854 px;
- na żadnej stronie nie rozszerzają całego dokumentu.

### Rysunek `sticky` przy tabelach rowków

Selektor: `.odniesienieRowka`, obliczone `position: sticky`, `top: 68px`.

| Szerokość | Pozycja przed dojściem do progu | Pozycja po przewinięciu o 350 px | Wynik |
| ---: | ---: | ---: | --- |
| 375 px | 119,6 px | 68,0 px | przykleja się prawidłowo |
| 768 px | 120,4 px | 68,0 px | przykleja się prawidłowo |
| 1280 px | 120,4 px | 68,0 px | przykleja się prawidłowo |

Po drugim pomiarze dolna krawędź własnego `figure` pozostawała od 1971 do 2013 px poniżej góry okna, więc element nie był jeszcze sztucznie zatrzymany przez koniec sekcji. Rysunek rzeczywiście towarzyszył przewijaniu.

Przy wysokości okna poniżej 640 px CSS świadomie wyłącza `sticky`. Nie uznaję tego za błąd, bo jest to jawna reguła dla niskiego ekranu.

### Nachodzenie elementów i wychodzenie z pudełek

Automatyczny pomiar przecięć sąsiednich, widocznych bloków nie znalazł żadnego nachodzenia na 27 adresach i trzech szerokościach. Nie znalazłem też wyjścia obrazu poza jego kontener.

Jedynym wyjściem poza szerokość dokumentu jest opisany kontener wpisów blogowych. Celowe warstwy, takie jak przycisk odtwarzania nad miniaturą i kadrowanie `object-fit: cover`, zostały wyłączone z listy błędów.

## Dwa commity z 11 sierpnia

### `1c1e3e2`: przypisy pod tabelami

Zmiana jest poprawna semantycznie i w większości poprawna układowo:

- tabela gwintów ma 11 odsyłaczy do 6 unikalnych przypisów;
- tabela Ra ma 5 odsyłaczy do 5 przypisów;
- tabela Rz ma 1 odsyłacz do 1 przypisu;
- identyfikatory są unikalne;
- `sup` ma `line-height: 0`, więc numer nie podnosi wysokości wiersza;
- przy 375 px przypisy gwintów mają `294 x 211,1 px`, przypisy Ra `294 x 266,5 px`, a Rz `294 x 65,3 px`;
- listy nie mają własnego przepełnienia i nie rozszerzają dokumentu.

Jedyny problem tej rundy to położenie przypisów gwintów wewnątrz poziomego przewijaka, opisane wcześniej. Proponowana zmiana to przeniesienie listy poza `.tabelaPierscieniWrap`.

### `cc0e261`: atrybuty obrazów

Commit wprowadził realne ryzyko dla elementów, którym CSS narzuca tylko wysokość. W obecnym drzewie ryzyko jest opanowane:

- `docusaurus.config.js` daje logo `504 x 504`;
- Infima daje tylko `height: 100%`;
- `src/css/custom.css` dopowiada `width: auto`;
- wynik to stabilne `32 x 32 px`.

Proponowana poprawka: nie zmieniać obecnej reguły. Warto dodać prosty test regresji, który na dowolnej stronie sprawdzi, że `.navbar__logo img` ma szerokość i wysokość 32 px.

### `cc0e261`: `span` zmieniony na `h2` na stronie głównej

Selektor: `.latestLabel`.

Przy 375, 768 i 1280 px wynik jest identyczny:

- pole nagłówka: `166,6 x 13 px`;
- font: IBM Plex Mono 13 px;
- grubość 400;
- wysokość linii 13 px;
- margines 0;
- wysokość całego `.latestHead`: 22 px, czyli tyle co rdzawy pasek.

Dodane `font-weight: 400`, `line-height: 1` i `margin: 0` prawidłowo neutralizują domyślne style `h2`. Zmiana nie przesunęła sekcji.

Proponowana poprawka: żadna.

### `cc0e261`: `h3` zmienione na `h2` w usługach

Selektor: `.cardTitle`, trzy kafelki.

Zmierzony bieżący `h2` i zasymulowany `h3` z tą samą klasą miały identyczny wynik:

- 375 px: `238 x 28,8 px`;
- 768 px: `631 x 28,8 px`;
- 1280 px: `300,7 x 28,8 px`.

W obu przypadkach font ma 23 px, grubość 700, wysokość linii 28,75 px i margines 0. Zmiana poziomu nagłówka nie zmieniła układu.

Proponowana poprawka: żadna.

### `cc0e261`: ukryty `caption` w przelicznikach

Selektor: `.tabelaPodpisUkryty`.

Pomiar na `/przelicznik/cisnienie/`:

- pole na ekranie: `1 x 1 px`;
- `position: absolute`;
- `clip: rect(0, 0, 0, 0)`;
- `display: block`;
- `visibility: visible`;
- brak `aria-hidden`.

W drzewie dostępności Chromium:

- tabela ma rolę `table` i pełny tekst podpisu jako nazwę;
- podpis ma rolę `caption` i `ignored: false`;
- tekst podpisu ma rolę `StaticText` i `ignored: false`.

Podpis nie wpływa na szerokość ani wysokość tabeli i pozostaje dostępny dla czytnika ekranu. Widoczny akapit nad tabelą ma `aria-hidden="true"`, więc tekst nie jest czytany dwa razy.

Proponowana poprawka: żadna.

## Kolejność proponowanych prac

1. Ustalić przeznaczenie `/social/` i dodać stronę albo przekierowanie.
2. Dodać `width: 100%` i `min-width: 0` do `.articleWrap`, potem ponownie zmierzyć wszystkie 19 wpisów przy 375 px.
3. Przenieść `.przypisy` tabeli gwintów poza poziomy przewijak.
4. Dodać test regresji rozmiaru logo `32 x 32 px` i test `scrollWidth <= innerWidth` dla wpisu z szeroką tabelą.
