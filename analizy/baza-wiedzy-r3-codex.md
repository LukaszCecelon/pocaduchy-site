# Runda 3: SCAMPER i przeglad technologiczny (Codex)

Kontekst techniczny po sprawdzeniu repo:

- To jest Docusaurus 3.10.2, React 19, static export na GitHub Pages.
- Obecna tresc Wiedzy i Bloga jest w `content/**/*.json`.
- `scripts/build-content-pages.mjs` generuje strony JS w `src/pages/...` podczas `prestart` i `prebuild`.
- `src/components/BlockRenderer.js` renderuje blokowy model tresci: `tekst`, `obraz`, `rysunek`, `galeria`, `tabela`, `wzor`.
- `rysunek` przyjmuje dzisiaj gotowy string SVG i wkłada go przez `dangerouslySetInnerHTML`.
- `tabela` przyjmuje markdown i renderuje go przez `react-markdown` z `remark-gfm`.
- W `package.json` sa juz: `react-markdown`, `remark-gfm`, `remark-math`, `rehype-katex`, `katex`, Docusaurus, React. Nie ma bezposrednio `zod`, `yaml`, `pagefind`, `lunr`, `playwright`, `vitest`, `jest`, `ajv`, `svg.js`, `d3`, `pdfkit` ani `puppeteer`.
- W `package-lock.json` sa pakiety Algolii jako zaleznosci transytywne Docusaurusa, ale to nie znaczy, ze projekt ma skonfigurowane wyszukiwanie Algolia.
- Katalog `content/wiedza` aktualnie nie istnieje, mimo ze generator i CMS sa na niego gotowe. To wazne: architektura jest przygotowana, ale realna baza Wiedzy jeszcze nie ma danych.

## A. SCAMPER na modelu Mechabooka

### S: Substitute, czyli co podmienic

1. Podmienic anonimowa tabele na tabele z karta zaufania.

Mechabook daje liczbe. poCADuchy powinny dac liczbe plus status: zrodlo, data weryfikacji, zakres, typ danych. Nie chodzi o dlugi disclaimer, tylko o maly, powtarzalny blok nad lub obok tabeli.

Efekt: uzytkownik nadal szybko czyta wartosc, ale ma od razu odpowiedz na pytanie "czy moge to wpisac do rysunku zawodowo".

2. Podmienic recznie wklejony rysunek na rysunek pochodzacy z danych.

W Mechabooku rysunek jest dobra nawigacja, ale dla poCADuchow rysunek powinien byc czescia modelu danych. Nie w sensie uniwersalnego CAD-a w przegladarce, tylko w sensie: definicja wymiarow, etykiet i strzalek jest opisana w danych albo w lokalnym komponencie zwiazanym z tematem.

Efekt: mniej ryzyka, ze tabela mowi jedno, a rysunek drugie.

3. Podmienic "temat jako kafel" na "temat jako zadanie konstruktora".

Zamiast nazw typu "Pierscienie osadcze" lepsze sa wejscia typu "Dobierz rowek pod pierscien osadczy na wale". Nazwa normowa nadal jest potrzebna, ale nie musi byc jedynym punktem wejscia.

Efekt: lepsze SEO i lepsza obsluga uzytkownika, ktory nie pamieta dokladnej nazwy.

### C: Combine, czyli co polaczyc

1. Polaczyc szybka tabele z komentarzem praktyka.

Układ strony powinien miec dwie warstwy:

- na gorze: rysunek, selektor lub filtr i tabela z liczbami,
- nizej: "kiedy stosowac", "kiedy nie stosowac", "typowe bledy", "co sprawdzic w normie".

To laczy predkosc Mechabooka z przewaga autora. Sama tabela jest latwa do skopiowania przez konkurencje, komentarz konstruktora jest trudniejszy.

2. Polaczyc indeksowalnosc Google z interaktywnoscia uzytkownika.

Tabela musi istniec w HTML po buildzie. Interakcja moze tylko filtrowac, podswietlac i upraszczac widok po stronie klienta. Nie moze byc tak, ze dane pojawiaja sie dopiero po `useEffect`.

Efekt: Google widzi baze, uzytkownik dostaje wygode.

3. Polaczyc zgloszenie bledu z konkretnym rekordem.

Zamiast ogolnego "napisz maila" kazdy modul lub tabela moze miec link "Zglos blad w tym temacie", z parametrami w mailto albo formularzu: slug, tabela, rekord, kolumna, wersja danych.

Efekt: mniej pracy przy obsludze zgloszen i wieksze poczucie, ze proces korekty istnieje.

### A: Adapt, czyli co zaadaptowac

1. Zaadaptowac wzorzec "rysunek jako mapa" z Mechabooka, ale bez kopiowania jego wykonania.

Najlepszy element Mechabooka to wejscie przez geometrie. poCADuchy powinny zachowac ten wzorzec: rysunek techniczny jest pierwszym ekranem, etykiety wymiarow zgadzaja sie z kolumnami tabeli, klikniecie lub hover na kolumnie podswietla wymiar na rysunku.

Nie trzeba od razu robic pelnej interakcji. MVP: te same symbole wymiarow na rysunku i w tabeli.

2. Zaadaptowac "kafel nazwany zadaniem", ale z wieksza iloscia tekstu indeksowalnego.

Lista tematow w `/wiedza/elementy` powinna miec tytul, krotki opis, synonimy i zakres. Nie sam kafel graficzny. Mechabook przegrywa tu z Google, bo robot widzi za malo normalnego HTML-a.

3. Zaadaptowac lokalna edycje przez Decap CMS.

Obecny panel CMS zapisuje JSON lokalnie. To pasuje do jednoosobowego utrzymania. Nie trzeba panelu administracyjnego online ani backendu. Trzeba tylko dodac nowe typy blokow i pola do `static/admin/config.yml`.

### M: Modify, czyli co zmienic albo powiekszyc

1. Powiekszyc role metadanych przy temacie.

Dzisiejszy model artykulu ma `title`, `description`, `date` i `blocks`. Dla bazy inzynierskiej powinien dojsc pakiet:

- `verifiedAt`,
- `dataStatus`,
- `sources`,
- `scope`,
- `standards`,
- `synonyms`,
- `riskLevel`,
- `revisionNote`.

To nie jest dekoracja. To czesc produktu.

2. Zmienic blok `tabela` z markdown na blok danych.

Markdown jest dobry dla zwyklych artykulow, ale slaby dla danych normatywnych, bo nie da sie wygodnie testowac rekordow, zrodel i dat. Nowy typ powinien byc np. `tabelaDanych`, gdzie kolumny i wiersze sa tablicami obiektow.

Przyklad kierunku:

```json
{
  "type": "tabelaDanych",
  "id": "rowek-pierscien-wal",
  "unit": "mm",
  "columns": [
    {"key": "d", "label": "d", "kind": "dimension"},
    {"key": "m", "label": "m", "kind": "dimension"}
  ],
  "rows": [
    {
      "d": 10,
      "m": 1.1,
      "sourceRef": "din-471:2024",
      "verifiedAt": "2026-08-03"
    }
  ]
}
```

3. Zmienic `rysunek` z "wklej kod SVG" na dwa tryby.

Tryb pierwszy: `svg`, czyli obecny reczny kod dla bloga i prostych przypadkow.
Tryb drugi: `rysunekParametryczny`, czyli komponent/generator pod temat bazy wiedzy.

To pozwala nie rozwalac obecnej strony i jednoczesnie budowac lepszy silnik dla tabel.

### P: Put to Another Use, czyli wykorzystac inaczej

1. Te same dane wykorzystac do indeksu wyszukiwania.

Rekordy tabeli, synonimy, nazwy norm i opisy zakresu powinny generowac `src/data/wiedza-search.json` albo plik w `static/`. Wtedy wyszukiwarka lokalna moze znalezc "seger", "pierscien osadczy", "DIN 471", "rowek na wale" i prowadzic do tego samego tematu.

2. Te same dane wykorzystac do llms.txt lub AI summary.

Jezeli strona chce byc cytowana przez modele AI, mozna generowac krotkie, tekstowe streszczenia tematow z danych: tytul, zakres, zrodla, najwazniejsze tabele, ostrzezenia. To nie wymaga backendu.

3. Te same dane wykorzystac do checklisty korekty.

Z pliku tematu mozna generowac liste rzeczy do sprawdzenia przed publikacja: czy kazdy rekord ma zrodlo, czy kazda wartosc ma jednostke, czy data weryfikacji nie jest starsza niz X miesiecy.

4. Te same dane wykorzystac do pliku do pobrania.

Dla wybranych tematow mozna generowac CSV do pobrania. PDF lub plik CAD dopiero pozniej. CSV jest najtanszy i najbardziej uczciwy wobec danych tabelarycznych.

### E: Eliminate, czyli co usunac

1. Usunac strone powitalna jako domyslne wejscie do bazy.

`/wiedza` powinno byc indeksem zadań, kategorii, ostatnio dodanych tematow i wyszukiwarka. Nie manifestem. Manifest moze istniec nizej albo na osobnej stronie "o bazie".

2. Usunac dlugie wstepy przed tabela.

Pierwszy ekran tematu powinien dawac wartosc: zakres, rysunek, tabela albo wybor rozmiaru. SEO tekst idzie pod narzedzie. To jest jedna z najmocniejszych decyzji produktowych z rund 1 i 2.

3. Usunac reczne przepisywanie tej samej liczby w kilku miejscach.

Wartosc nie moze jednoczesnie siedziec w markdownowej tabeli, podpisie SVG, JSON-LD i opisie. Jedna liczba, jedno miejsce. Reszta jest generowana.

4. Usunac anonimowosc statusu danych.

Nie wystarczy "autor: Lukasz" globalnie. Przy danych wysokiego ryzyka potrzebny jest status przy temacie albo przy rekordzie. Brak statusu udaje pewnosc tam, gdzie moze jej nie byc.

5. Usunac komentarze pod tematami z MVP.

Komentarze beda produkowac szum i moderacje. Lepiej miec prosty kanal korekty: mail lub GitHub issue z gotowym tematem i identyfikatorem rekordu.

6. Usunac ambicje "pelnego kalkulatora wszystkiego".

Najpierw tabele zaufania i szybki odczyt. Kalkulator tylko tam, gdzie faktycznie redukuje blad lub czas. Inaczej baza stanie sie projektem narzedziowym bez konca.

### R: Reverse, czyli odwrocic zalozenie

1. Nie "najpierw artykul, potem tabela", tylko "najpierw decyzja, potem wyjasnienie".

Klasyczny artykul SEO zaczyna od definicji, zastosowan i historii. Tu powinno byc odwrotnie: najpierw odpowiedz robocza, potem warstwa zrozumienia.

2. Nie "uzytkownik szuka normy", tylko "uzytkownik opisuje problem".

Struktura wejsc powinna wspierac jezyk pracy:

- "rowek pod pierscien na wale",
- "jaki nakielek pod toczenie",
- "otwor pod gwint M8",
- "jak oznaczyc spoine pachwinowa".

Norma jest metadana i dowod zaufania, nie jedyny sposob nawigacji.

3. Nie "kompletnosc buduje zaufanie", tylko "jawny zakres buduje zaufanie".

Niekompletna tabela z jasnym zakresem jest bardziej wiarygodna niz rozlegla tabela bez historii zrodel. To wazne, bo jednoosobowy projekt nie wygra liczba rekordow od razu.

4. Nie "rysunek ilustruje tabele", tylko "tabela jest odczytem rysunku".

W mentalnym modelu konstruktora geometria jest pierwsza. Dlatego projekt danych powinien zaczynac od wymiarow i relacji na rysunku, a tabela jest ich liczbowym wypelnieniem.

5. Nie "bledy trzeba ukrywac", tylko "proces korekty jest dowodem wiarygodnosci".

Widoczna data poprawki i krotka historia zmian nie obniza autorytetu. Przy danych inzynierskich moze go podnosic, bo pokazuje, ze baza jest utrzymywana.

## Ocena sprzecznosci TRIZ z rundy 2

Nie zgadzam sie automatycznie z calym rozwiazaniem z rundy 2.

### Sprzecznosc 1: Google chce tekstu, konstruktor nie chce tekstu

Rozwiazanie "tabela na gorze, tresc pod nia" jest zasadniczo dobre. Nie usuwa jednak calej sprzecznosci, bo Google nie ocenia tylko obecnosci tekstu. Ocenia tez intencje strony, linkowanie, naglowki, powtarzalnosc fraz, unikalnosc tresci i zachowanie uzytkownika. Jesli tabela na gorze bedzie technicznie widoczna, ale opis pod nia bedzie cienki albo generyczny, problem wroci.

Korekta: tresc pod tabela musi byc nie "SEO", tylko blokiem decyzji i zaufania. Powinna miec stale sekcje: zakres, kiedy stosowac, kiedy nie stosowac, typowe bledy, zrodla.

### Sprzecznosc 2: nazwisko autora pod liczba, a liczb ma byc duzo

Segmentacja na dane normatywne i komentarz praktyka jest dobra, ale testy jednostkowe nie rozwiazuja problemu prawdziwosci danych. Test sprawdzi, czy wartosc nie zmienila sie przypadkiem, ale nie udowodni, ze pierwotnie byla dobrze przepisana z normy.

Korekta: potrzebny jest rezim weryfikacji danych, nie tylko testy kodowe. Minimum: podwojne sprawdzenie wybranych wartosci, probki kontrolne, zrodlo przy rekordzie, data weryfikacji i jawny zakres.

### Sprzecznosc 3: rysunek jest najlepsza nawigacja, a obrazki sa niewidoczne

"SVG generowany z tych samych danych" jest kierunkowo dobre, ale w wersji doslownej moze byc za drogie. Rysunek techniczny nie zawsze da sie sensownie wygenerowac z tej samej tablicy wymiarow, bo potrzebuje geometrii, skali, linii pomocniczych, miejsc na etykiety i kompromisow wizualnych.

Korekta: rekomenduje hybryde. Dane tabeli sa jednym zrodlem wartosci i etykiet, ale geometria rysunku moze byc lokalnym komponentem React/SVG dla danego typu tematu. To nadal ogranicza rozjazd, a nie wymaga budowy uniwersalnego CAD-a.

### Sprzecznosc 4: strona ma byc statyczna, a dane maja byc zywe

Plik JSON jako jedno zrodlo prawdy pasuje do obecnego repo. Tu zgoda. Trzeba tylko doprecyzowac, ze nie wszystko musi byc w jednym pliku fizycznym. Dla utrzymania lepszy moze byc jeden plik tematu plus opcjonalne wspolne slowniki zrodel i synonimow.

### Sprzecznosc 5: kompletnosc buduje autorytet, a niekompletnosc jest jedyna realna

Rozwiazanie przez jawny zakres jest dobre. Dodałbym twarde pole `coverage`, bo sam opis w tekście bedzie pomijany i trudny do testowania.

### Sprzecznosc 6: AdSense chce tresci, narzedzie ma byc czyste

To nie jest w pelni ta sama sprzecznosc co numer 1. AdSense moze miec dodatkowe oczekiwania: unikalna tresc, brak "thin content", polityki reklam, sensowna nawigacja, strony kontaktowe i prywatnosc. Samo przeniesienie tekstu pod tabele moze nie wystarczyc.

Korekta: dla AdSense trzeba dbac o wartosc strony jako calosci, ale bez poswiecania pierwszego ekranu. Decyduja kompletne tematy, nie dlugosc akapitow.

## B. Przeglad technologiczny z kompromisami

### Decyzja 1: jak generowac rysunek SVG z danych

#### Opcja 1: recznie pisany komponent React/SVG na typ tematu

Podejscie: dodac komponenty typu `StandardPartDrawing`, np. `RetainingRingGrooveDrawing`, ktore przyjmuja dane wymiarow i rysuja SVG w JSX. W `BlockRenderer.js` dochodzi blok `rysunekParametryczny`, ktory wybiera komponent po `variant`.

Czy jest w projekcie: czesciowo. React i Docusaurus juz sa. Trzeba dodac nowe komponenty, bez nowej biblioteki.

Koszt wdrozenia: 8-14 h dla pierwszego typu rysunku, potem 3-6 h na kolejny podobny typ.

Zalety:

- najlepsze dopasowanie do obecnego `BlockRenderer`,
- brak nowej zaleznosci,
- SVG jest SSR/static friendly,
- latwo utrzymac styl rysunkow,
- dobre dla technicznych rysunkow, gdzie layout musi byc kontrolowany.

Wady:

- kazdy nowy typ geometrii wymaga kodu,
- latwo zrobic za duzo logiki wizualnej w komponencie,
- trzeba samodzielnie rozwiazac strzalki, linie wymiarowe i rozmieszczenie etykiet.

Co sie zepsuje, jesli wybierzemy zle: powstanie biblioteka quasi-CAD utrzymywana recznie, a kazdy temat bedzie kosztowal za duzo godzin. To zabije pre-mortem scenariusz 1.

#### Opcja 2: generator parametryczny w Node podczas `build:content`

Podejscie: skrypt w `scripts/` generuje string SVG z danych i zapisuje go do wygenerowanej strony albo manifestu. `BlockRenderer` nadal renderuje zwykly blok `rysunek`.

Czy jest w projekcie: czesciowo. Prebuild juz istnieje. Trzeba dopisac generator SVG.

Koszt wdrozenia: 10-18 h dla pierwszego generatora, 4-8 h na kolejny wariant.

Zalety:

- gotowy SVG w HTML po buildzie,
- mozna walidowac wygenerowany SVG przed publikacja,
- mniej JS w przegladarce,
- mocno pasuje do static exportu.

Wady:

- trudniejsze debugowanie niz React komponent w devtools,
- powielanie logiki generowania JSX/SVG w stringach albo w helperach,
- jesli chce sie interakcje hover rysunek-tabela, trzeba dodac warstwe React i tak.

Co sie zepsuje, jesli wybierzemy zle: generator stanie sie osobnym, nieczytelnym systemem obok `BlockRenderer`, a zmiany rysunku beda wolniejsze niz reczna edycja.

#### Opcja 3: biblioteka SVG, np. `@svgdotjs/svg.js`

Podejscie: uzyc biblioteki do tworzenia SVG programowo.

Czy jest w projekcie: nie, trzeba dodac.

Koszt wdrozenia: 12-20 h pierwsze wdrozenie, bo trzeba nauczyc sie API, ustalic SSR lub build-time rendering i napisac warstwe wymiarowania.

Zalety:

- wygodne API do geometrii,
- potencjalnie mniej recznego skladania `path`,
- dobre przy bardziej zlozonych transformacjach.

Wady:

- nowa zaleznosc,
- biblioteka nie rozwiazuje sama problemu rysunku technicznego,
- trzeba nadal napisac strzalki, odsuniecia, etykiety i style,
- moze byc nadmiarowa dla prostych rysunkow.

Co sie zepsuje, jesli wybierzemy zle: dojdzie zaleznosc, ale trudne elementy i tak zostana po naszej stronie. Koszt utrzymania wzrosnie bez realnego zysku.

#### Opcja 4: biblioteka wykresowa, np. `d3`

Podejscie: uzyc `d3` do generowania SVG.

Czy jest w projekcie: nie, trzeba dodac.

Koszt wdrozenia: 16-28 h, bo D3 jest mocne, ale nie jest biblioteka do rysunku technicznego.

Zalety:

- swietne do skali, osi, mapowania danych na geometrię,
- duzy ekosystem.

Wady:

- nadmiarowe dla rysunkow mechanicznych,
- mentalnie przesuwa projekt w strone data visualization, nie dokumentacji technicznej,
- wieksza krzywa uczenia.

Co sie zepsuje, jesli wybierzemy zle: rysunki beda projektowane pod narzedzie, a nie pod potrzeby konstruktora.

#### Rekomendacja

Wybrac opcje 1 na MVP: recznie pisane komponenty React/SVG na typ tematu, bez nowej biblioteki. Dodac maly lokalny helper do wymiarowania:

- `DimensionLine`,
- `ExtensionLine`,
- `ArrowMarker`,
- `Label`,
- `LeaderLine`.

Biblioteka albo generator parametryczny ma sens dopiero po 3-5 tematach, gdy widac powtarzalny wzor geometrii. Teraz najwiekszym ryzykiem nie jest brak automatyzacji, tylko przepalenie godzin na uniwersalny silnik.

Minimalne wpasowanie w repo:

- dodac blok `rysunekParametryczny` w `BlockRenderer.js`,
- dodac komponenty w `src/components/knowledge/drawings/`,
- dane bloku trzymac w JSON razem z tabela,
- zachowac obecny blok `rysunek` dla recznych SVG.

### Decyzja 2: format pliku danych

#### Opcja 1: JSON, rozszerzony obecny model

Podejscie: zostac przy `content/wiedza/<kategoria>/<slug>.json`, ale dodac nowe pola i nowe typy blokow.

Czy jest w projekcie: tak. To obecny standard repo i Decap CMS.

Koszt wdrozenia: 4-8 h na schemat MVP, 6-12 h z walidacja i aktualizacja CMS.

Zalety:

- najnizszy koszt,
- pasuje do `build-content-pages.mjs`,
- Decap CMS juz zapisuje JSON,
- import JSON do stron Docusaurusa juz dziala,
- latwy static export.

Wady:

- reczna edycja duzych tabel JSON-em jest mniej wygodna niz CSV,
- bez walidatora latwo zrobic literowke w kluczu,
- komentarze w JSON nie istnieja.

Co sie zepsuje, jesli wybierzemy zle: jesli zostaniemy przy luznym JSON bez schematu, bedzie zludzenie struktury. Literowka w `verifiedAt` albo `sourceRef` przejdzie do produkcji.

#### Opcja 2: YAML

Podejscie: przejsc na `.yml` dla tematow wiedzy.

Czy jest w projekcie: nie jako zaleznosc root. Trzeba dodac parser, np. `yaml`.

Koszt wdrozenia: 8-16 h, bo trzeba zmienic generator, CMS i przyzwyczajenia edycji.

Zalety:

- bardziej czytelny recznie,
- mozna dodawac komentarze,
- mniej znakow wokol danych.

Wady:

- nowa zaleznosc,
- wiecej ryzyka bledow w wcieciach,
- migracja istniejącego modelu CMS,
- gorsze dopasowanie do obecnego repo.

Co sie zepsuje, jesli wybierzemy zle: autor zacznie walczyc ze skladnia i wcieciami zamiast uzupelniac dane. Generator stanie sie bardziej wrazliwy na format.

#### Opcja 3: CSV dla tabel plus JSON dla metadanych

Podejscie: temat jest JSON-em, a duza tabela jest w osobnym CSV.

Czy jest w projekcie: nie. Trzeba dodac parser CSV albo napisac prosty parser tylko dla kontrolowanego formatu, czego nie rekomenduje.

Koszt wdrozenia: 10-18 h.

Zalety:

- wygodne masowe wprowadzanie tabel,
- latwo otworzyc w Excelu,
- dobre dla szerokich tabel wymiarowych.

Wady:

- rozbija jedno zrodlo prawdy na dwa pliki,
- trudniej trzymac zrodlo i date przy rekordzie,
- CSV slabo przechowuje zagniezdzone dane, zakresy, notatki i statusy,
- Decap CMS bedzie mniej wygodny.

Co sie zepsuje, jesli wybierzemy zle: tabela i metadane zaczna sie rozjezdzac. Wroci sprzecznosc z rundy 2: dane osobno, rysunek osobno, zrodla osobno.

#### Opcja 4: MDX z komponentami

Podejscie: pisac strony Wiedzy jako MDX i osadzac komponenty React bez generatora JSON.

Czy jest w projekcie: MDX jest w Docusaurusie, ale obecny model Wiedzy idzie przez JSON i generator.

Koszt wdrozenia: 12-24 h, bo trzeba zmienic przeplyw tresci i prawdopodobnie ominac Decap CMS.

Zalety:

- wygodne dla developera,
- latwo mieszac tekst i komponenty,
- naturalne dla Docusaurusa.

Wady:

- gorsze dla lokalnej edycji przez CMS,
- dane moga trafic do kodu,
- trudniej testowac rekordy jako dane,
- grozi powstaniem stron specjalnych zamiast spójnej bazy.

Co sie zepsuje, jesli wybierzemy zle: utrzymanie przejdzie z "edycja danych" na "edycja kodu", czyli dokladnie ryzyko z inwersji.

#### Rekomendacja

Zostac przy JSON. Dodac jawny schemat i nowe bloki danych. Dla zrodla i daty weryfikacji stosowac dwa poziomy:

- domyslne metadane tabeli: `defaultSourceRef`, `defaultVerifiedAt`,
- mozliwe nadpisanie przy rekordzie: `sourceRef`, `verifiedAt`, `note`.

Przyklad:

```json
{
  "title": "Rowek pod pierscien osadczy na wale",
  "description": "Wymiary rowka pod pierscien osadczy z zakresem stosowania i zrodlem danych.",
  "verifiedAt": "2026-08-03",
  "dataStatus": "verified",
  "sources": [
    {
      "id": "din-471",
      "label": "DIN 471",
      "kind": "standard",
      "access": "reference-only"
    }
  ],
  "synonyms": ["seger", "pierscien segera", "rowek na wale", "DIN 471"],
  "blocks": [
    {
      "type": "tabelaDanych",
      "id": "main",
      "unit": "mm",
      "defaultSourceRef": "din-471",
      "defaultVerifiedAt": "2026-08-03",
      "columns": [
        {"key": "d", "label": "d", "role": "nominal"},
        {"key": "m", "label": "m", "role": "dimension"}
      ],
      "rows": [
        {"d": 10, "m": 1.1}
      ]
    }
  ]
}
```

### Decyzja 3: HTML przy buildzie plus interaktywny kalkulator

#### Opcja 1: renderowac wszystko Reactem w Docusaurusie z danych importowanych statycznie

Podejscie: wygenerowana strona JS importuje JSON i przekazuje dane do `WiedzaArticleTemplate`. Komponent tabeli renderuje normalny `<table>` podczas builda Docusaurusa. Interakcja uzywa `useState` do filtrowania juz wyrenderowanych danych.

Czy jest w projekcie: tak, fundament juz istnieje.

Koszt wdrozenia: 8-16 h dla pierwszego bloku `tabelaDanych` plus prosty filtr.

Zalety:

- pasuje do Docusaurusa,
- HTML powstaje w static export,
- nie wymaga backendu,
- minimalna zmiana architektury,
- mozna utrzymac obecny `BlockRenderer`.

Wady:

- trzeba uwazac na hydration mismatch,
- duze tabele moga zwiekszac HTML,
- zaawansowana interakcja moze skomplikowac komponent.

Co sie zepsuje, jesli wybierzemy zle: jesli komponent zacznie renderowac tabele dopiero po stronie klienta, Google i uzytkownicy bez JS zobacza mniej tresci. To powtorzy blad Mechabooka.

#### Opcja 2: generowac surowy HTML tabel w `build-content-pages.mjs`

Podejscie: prebuild zamienia dane na HTML string i zapisuje go w wygenerowanej stronie lub JSON-ie.

Czy jest w projekcie: nie wprost, ale generator istnieje.

Koszt wdrozenia: 10-18 h.

Zalety:

- maksymalna pewnosc, ze tabela jest statycznym HTML-em,
- mozna generowac dodatkowe pliki, np. `static/wiedza-search.json`,
- mniej logiki w React.

Wady:

- dubluje odpowiedzialnosc `BlockRenderer`,
- generowanie HTML stringow jest podatne na escape i XSS, nawet jesli zrodlo jest lokalne,
- trudniejsza interakcja i stylowanie.

Co sie zepsuje, jesli wybierzemy zle: build script stanie sie drugim rendererem. Kazda zmiana wygladu tabeli bedzie wymagala grzebania w generatorze zamiast w komponencie.

#### Opcja 3: client-only widget

Podejscie: tabela i kalkulator renderuja sie dopiero w przegladarce.

Czy jest w projekcie: technicznie mozliwe, ale niezgodne z celem.

Koszt wdrozenia: 6-12 h dla prostego widgetu.

Zalety:

- szybkie do zrobienia jako aplikacja,
- latwe filtry i stany,
- malo HTML-a w buildzie.

Wady:

- SEO i dostepnosc slabsze,
- ryzyko pustej strony dla crawlera,
- sprzeczne z pre-mortem scenariusz 4.

Co sie zepsuje, jesli wybierzemy zle: baza bedzie wygodna wizualnie, ale niewidoczna dla Google. To jest błąd strategiczny, nie detal techniczny.

#### Rekomendacja

Opcja 1. Rozszerzyc `BlockRenderer.js` o blok `tabelaDanych` i opcjonalnie `kalkulatorDanych`. Dane pozostaja w JSON. Docusaurus wyrenderuje tabele jako HTML w buildzie. Interakcja ma byc progresywna:

- bez JS: widoczna tabela, zrodla, zakres, opis,
- z JS: filtr, szybki wybor rozmiaru, podswietlenie kolumny i wymiaru.

Nie ruszac na razie w strone client-only app.

### Decyzja 4: jak testowac dane

#### Opcja 1: testy w Node przez wbudowany `node:test`

Podejscie: napisac `scripts/validate-knowledge-data.mjs` i testy oparte o `node:test` oraz `node:assert/strict`. Uruchamiac w `prebuild` przed generowaniem stron albo jako osobny skrypt `npm run validate:knowledge`.

Czy jest w projekcie: Node >=20 juz wymagany. Nie trzeba dodawac zaleznosci.

Koszt wdrozenia: 6-12 h dla walidatora MVP i pierwszych asercji.

Zalety:

- zero nowych pakietow,
- szybkie,
- wystarczy do sprawdzenia struktury, dat, zrodel, unikalnosci kluczy i probek danych,
- dobrze pasuje do jednoosobowego projektu.

Wady:

- mniej wygodny DX niz Vitest,
- trzeba samemu napisac komunikaty bledow,
- brak snapshotow i watch mode z pudelka.

Co sie zepsuje, jesli wybierzemy zle: jesli testy beda zbyt prymitywne albo nie beda uruchamiane przed buildem, falszywe poczucie bezpieczenstwa zostanie, a blad w liczbie przejdzie do publikacji.

#### Opcja 2: `vitest`

Podejscie: dodac Vitest i pisac testy danych oraz helperow SVG.

Czy jest w projekcie: nie, trzeba dodac.

Koszt wdrozenia: 8-14 h.

Zalety:

- wygodne testy,
- dobry watch mode,
- latwe testowanie helperow,
- czytelniejsze raportowanie.

Wady:

- nowa zaleznosc,
- konfiguracja w Docusaurusie moze wymagać dopasowania ESM,
- moze byc nadmiarowe na start.

Co sie zepsuje, jesli wybierzemy zle: narzedzia testowe zjedza czas, zanim powstanie pierwszy kompletny temat.

#### Opcja 3: JSON Schema przez `ajv`

Podejscie: zdefiniowac schemat JSON i walidowac pliki przez `ajv`.

Czy jest w projekcie: nie, trzeba dodac.

Koszt wdrozenia: 8-16 h.

Zalety:

- formalny schemat danych,
- dobre wykrywanie brakujacych pol i typow,
- mozna uzyc w CMS jako dokumentacje struktury.

Wady:

- waliduje typy, nie sens inzynierski,
- schemat dla blokow moze szybko urosnac,
- nowa zaleznosc.

Co sie zepsuje, jesli wybierzemy zle: mozna miec perfekcyjnie poprawny JSON z blednymi wymiarami. To nie wystarczy jako system zaufania.

#### Opcja 4: testy reczne w checklistach

Podejscie: autor sprawdza temat przed publikacja wedlug listy.

Czy jest w projekcie: nie wymaga zaleznosci.

Koszt wdrozenia: 1-2 h na checklistę, ale koszt powtarzalny przy kazdym temacie.

Zalety:

- najtansze na start,
- lapie rzeczy, ktorych automat nie rozumie,
- naturalne przy danych normatywnych.

Wady:

- latwo pominac,
- brak bramki w CI/buildzie,
- nie chroni przed przypadkowa zmiana pozniej.

Co sie zepsuje, jesli wybierzemy zle: po kilku miesiacach dyscyplina spadnie, a baza bedzie miala niewidoczne regresje.

#### Rekomendacja

MVP: polaczyc opcje 1 i 4.

Dodac `scripts/validate-knowledge-data.mjs` bez nowych zaleznosci. Uruchamiac go w `prebuild` przed `build-content-pages.mjs`. Zakres asercji:

- kazdy temat ma `title`, `description`, `verifiedAt`, `dataStatus`, `sources`,
- kazde `sourceRef` wskazuje na istniejace zrodlo,
- kazda tabela danych ma `id`, `unit`, `columns`, `rows`,
- kazdy rekord ma wartosci dla wymaganych kolumn,
- daty maja format `YYYY-MM-DD`,
- `verifiedAt` rekordu nie jest pozniejsze niz dzisiejsza data,
- klucze kolumn sa unikalne,
- wybrane probki kontrolne maja oczekiwane wartosci.

Liczba asercji: minimum 10-20 asercji strukturalnych globalnie plus 3-5 probek kontrolnych na tabele w MVP. Dla danych wysokiego ryzyka: probki kontrolne dla pierwszego, srodkowego i ostatniego rekordu zakresu.

Wazne: testy danych nie udowadniaja prawdziwosci danych. One pilnuja integralnosci po weryfikacji. Proces weryfikacji zrodla musi byc osobny.

### Decyzja 5: wyszukiwanie w bazie i po synonimach

#### Opcja 1: prosty lokalny indeks JSON plus filtrowanie w React

Podejscie: `build-content-pages.mjs` generuje `src/data/wiedza-search.json` z tytulow, opisow, kategorii, synonimow, norm i wybranych slow z blokow. Strona `/wiedza` ma input i filtruje wynik w przegladarce.

Czy jest w projekcie: czesciowo. Manifesty kategorii juz sa generowane do `src/data`. Trzeba dodac nowy manifest i komponent wyszukiwarki.

Koszt wdrozenia: 6-12 h.

Zalety:

- brak nowych zaleznosci,
- szybkie,
- pelna kontrola synonimow,
- wystarczy dla pierwszych kilkudziesieciu tematow,
- dziala na GitHub Pages.

Wady:

- prosty scoring,
- brak literowek i odmiany jezyka,
- przy setkach tematow moze byc slabsze.

Co sie zepsuje, jesli wybierzemy zle: przy zbyt prostym dopasowaniu uzytkownik wpisze "seger" i nie znajdzie "pierscien osadczy", jesli synonimy nie beda dobrze wpisane w danych.

#### Opcja 2: Pagefind

Podejscie: dodac `pagefind`, po buildzie indeksowac statyczny HTML i osadzic UI wyszukiwarki.

Czy jest w projekcie: nie, trzeba dodac.

Koszt wdrozenia: 8-16 h.

Zalety:

- bardzo dobre dopasowanie do statycznych stron,
- indeksuje finalny HTML,
- brak backendu,
- sensowne wyniki dla wiekszej liczby stron.

Wady:

- nowa zaleznosc i krok postbuild,
- synonimy wymagaja dodatkowego obejscia przez ukryte/semantyczne teksty albo wlasny indeks,
- integracja z Docusaurusem wymaga dopracowania sciezki na GitHub Pages.

Co sie zepsuje, jesli wybierzemy zle: wyszukiwarka znajdzie tekst artykulow, ale niekoniecznie jezyk roboczy konstruktora. Job 8 wymaga synonimow, nie tylko indeksowania HTML.

#### Opcja 3: Algolia DocSearch

Podejscie: skonfigurowac Docusaurus `themeConfig.algolia` i indeks Algolii.

Czy jest w projekcie: nie skonfigurowane. Zaleznosci sa transytywnie w locku przez Docusaurusa, ale nie nalezy tego traktowac jako gotowego wdrozenia.

Koszt wdrozenia: 8-20 h plus proces uzyskania i konfiguracji indeksu.

Zalety:

- bardzo dobre UX,
- standardowy kierunek dla Docusaurusa,
- skaluje sie dobrze.

Wady:

- zalezność od uslugi zewnetrznej,
- konfiguracja i limity,
- synonimy i polskie terminy trzeba utrzymywac w Algolii lub danych,
- na MVP moze byc za ciezkie.

Co sie zepsuje, jesli wybierzemy zle: baza zacznie zalezec od zewnetrznego indeksu, zanim bedzie wiadomo, czy pierwsze tematy maja ruch.

#### Opcja 4: Lunr albo FlexSearch

Podejscie: dodac lokalna biblioteke wyszukiwania, np. `lunr` albo `flexsearch`, z indeksem budowanym z danych.

Czy jest w projekcie: nie, trzeba dodac.

Koszt wdrozenia: 8-14 h.

Zalety:

- lepszy scoring niz prosty filtr,
- dziala offline i statycznie,
- mozna wzbogacic indeks synonimami.

Wady:

- nowa zaleznosc,
- polska odmiana i terminy inzynierskie nadal wymagaja recznego slownika,
- moze byc przedwczesne.

Co sie zepsuje, jesli wybierzemy zle: narzedzie da pozor "prawdziwej wyszukiwarki", ale bez dobrze opracowanych synonimow nadal nie rozwiaze joba 8.

#### Rekomendacja

MVP: opcja 1. Generowac prosty `wiedza-search.json` z danych, bez nowej zaleznosci.

Minimalny rekord indeksu:

```json
{
  "title": "Rowek pod pierscien osadczy na wale",
  "href": "/wiedza/elementy/rowek-pod-pierscien-osadczy-na-wale",
  "category": "Elementy standardowe",
  "description": "...",
  "synonyms": ["seger", "pierscien segera", "DIN 471", "rowek na wale"],
  "standards": ["DIN 471"],
  "tasks": ["dobor rowka", "zabezpieczenie osiowe"]
}
```

Po 30-50 tematach mozna rozwazyc Pagefind. Algolia dopiero wtedy, gdy baza ma realny ruch i potrzebe lepszego UX.

### Decyzja 6: generowanie PDF albo plikow do CAD z tych samych danych

#### Opcja 1: CSV do pobrania

Podejscie: build generuje plik CSV dla tabeli danych i linkuje go w temacie.

Czy jest w projekcie: nie, ale mozna zrobic bez zaleznosci Node.

Koszt wdrozenia: 3-6 h dla prostego eksportu.

Zalety:

- najtanszy eksport,
- inzynier moze otworzyc w Excelu,
- latwo porownac z danymi zrodlowymi,
- nie wymaga renderowania dokumentow.

Wady:

- CSV nie przenosi rysunku ani komentarza,
- trzeba uwazac na separator, przecinek dziesietny i kodowanie.

Co sie zepsuje, jesli wybierzemy zle: niewlasciwe formatowanie liczb moze spowodowac bledne odczyty w Excelu, np. przecinek/kropka albo rozbicie kolumn.

#### Opcja 2: PDF generowany z HTML przez Playwright lub Puppeteer

Podejscie: po buildzie otworzyc strone i drukowac do PDF.

Czy jest w projekcie: nie. Trzeba dodac `playwright` albo `puppeteer`.

Koszt wdrozenia: 12-24 h dla stabilnego procesu.

Zalety:

- PDF wyglada jak strona,
- mozna dac uzytkownikowi sciage offline,
- dobry material do udostepniania w firmie.

Wady:

- ciezka zaleznosc,
- problemy z fontami, paginacja i CI,
- dodatkowy czas builda,
- moze odwrocic uwage od samej bazy.

Co sie zepsuje, jesli wybierzemy zle: eksport PDF stanie sie drugim produktem do utrzymania. Zamiast publikowac tematy, autor bedzie poprawial lamanie stron.

#### Opcja 3: PDF przez `pdfkit` albo `pdfmake`

Podejscie: generowac PDF programowo z danych.

Czy jest w projekcie: nie, trzeba dodac.

Koszt wdrozenia: 16-30 h, jesli ma wygladac profesjonalnie.

Zalety:

- pelna kontrola nad dokumentem,
- niezalezne od CSS strony,
- mozna zrobic zwarte karty tabel.

Wady:

- trzeba od nowa projektowac layout,
- rysunki SVG i fonty moga byc problematyczne,
- drugi renderer obok strony.

Co sie zepsuje, jesli wybierzemy zle: powstanie rozjazd miedzy strona a PDF-em. To lustrzane odbicie problemu "tabela osobno, rysunek osobno".

#### Opcja 4: DXF albo plik CAD

Podejscie: generowac proste szkice lub profile, np. DXF rowka.

Czy jest w projekcie: nie, trzeba dodac biblioteke albo napisac generator.

Koszt wdrozenia: 20-50 h w zaleznosci od formatu i ambicji.

Zalety:

- potencjalnie unikalna funkcja,
- moze byc bardzo wartosciowa przy powtarzalnych geometriach.

Wady:

- duze ryzyko odpowiedzialnosci za blad,
- formaty CAD sa bardziej wymagajace niz tabele,
- latwo wejsc w obietnice, ktorej jednoosobowy projekt nie utrzyma,
- rozprasza od joba "znalezc liczbe".

Co sie zepsuje, jesli wybierzemy zle: uzytkownik moze wstawic bledna geometrie do projektu. Skutek jest ciezszy niz bledna informacja na stronie, bo plik CAD trafia prosto do dokumentacji.

#### Rekomendacja

Na MVP tylko CSV, i to dopiero po pierwszym dzialajacym bloku `tabelaDanych`. PDF odlozyc. DXF/CAD odlozyc zdecydowanie.

Najlepsza kolejnosc:

1. HTML tabela z danych.
2. Walidacja danych.
3. Lokalna wyszukiwarka z synonimami.
4. CSV do pobrania dla tabel.
5. PDF tylko, jesli uzytkownicy realnie prosza o sciagi offline.
6. CAD tylko jako osobny eksperyment dla jednego bezpiecznego typu geometrii.

## Rekomendowany kierunek architektury MVP

Nie budowac nowej aplikacji obok Docusaurusa. Rozszerzyc istniejacy model.

### Nowe elementy

1. `content/wiedza/<kategoria>/<slug>.json`

Jeden plik tematu, ale z mocniejszym schematem danych.

2. `BlockRenderer.js`

Dopisac nowe typy blokow:

- `kartaZaufania`,
- `tabelaDanych`,
- `rysunekParametryczny`,
- `ostrzezenia`,
- `zakres`.

3. `scripts/build-content-pages.mjs`

Rozszerzyc generator:

- przekazywac nowe pola metadanych do `WiedzaArticleTemplate`,
- generowac manifest wyszukiwarki `src/data/wiedza-search.json`,
- opcjonalnie generowac CSV do `static/downloads/wiedza/...`.

4. `scripts/validate-knowledge-data.mjs`

Walidowac pliki przed buildem.

5. `static/admin/config.yml`

Dodac pola Decap CMS dla nowych blokow, ale nie probowac robic z CMS-a pelnego edytora tabel normatywnych. Dla duzych tabel wygodniejsza moze byc reczna edycja JSON w repo albo import z arkusza w pozniejszym etapie.

## Co zrobic jako pierwsze

Pierwszy temat powinien byc waski i mechaniczny, z jedna tabela i jednym rysunkiem. Nie zaczynalbym od pasowan ISO 286 ani tematu z duza liczba wariantow.

Zakres techniczny pierwszego wdrozenia:

- jeden plik JSON tematu,
- jeden blok `kartaZaufania`,
- jeden blok `tabelaDanych`,
- jeden reczny komponent React/SVG dla `rysunekParametryczny`,
- walidator danych w Node bez nowych zaleznosci,
- prosty indeks wyszukiwania po tytule, opisie i synonimach.

Szacunkowy koszt pierwszego pionowego wycinka: 24-40 h, jesli celem jest jakosc publikacyjna, nie prototyp.

Po tym dopiero mierzyc:

- czy strona sie buduje bez bledow,
- czy tabela jest widoczna w statycznym HTML,
- czy Google moze zaindeksowac tresc,
- czy temat da sie znalezc po synonimach,
- ile czasu zajmuje dodanie drugiego tematu.

## Najwazniejsza decyzja

Najwiekszy blad bylby technologicznie elegancki: zbudowac uniwersalny silnik rysunkow i kalkulatorow przed pierwsza prawdziwa tabela.

Najlepszy ruch jest mniej efektowny: zostac przy JSON, Docusaurusie i `BlockRenderer`, dodac tylko tyle struktury, zeby jedna liczba miala zrodlo, date, test, rysunek i HTML. Jezeli drugi temat powstanie szybciej niz pierwszy, architektura jest dobra. Jezeli drugi temat znowu wymaga przebudowy silnika, architektura jest zla.
