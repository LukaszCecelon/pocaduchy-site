# Audyt SEO pocaduchy.pl

Data audytu: 2026-08-04  
Zakres: build lokalny po `npm.cmd run build`, katalog `build/`, oraz produkcja `https://pocaduchy.pl`.

## Podsumowanie dla wlasciciela

Strona jest technicznie indeksowalna: build tworzy 27 publicznych stron, sitemap ma te same 27 adresow, `robots.txt` nie blokuje niczego przez pomylke poza `/admin/`. Wszystkie publiczne strony maja tytul, opis, jeden `H1`, canonical i podstawowe dane strukturalne. Najpowazniejszy problem techniczny to niespojnosc adresow: canonicale i sitemap wskazuja wersje bez koncowego ukosnika, a produkcja przekierowuje je na wersje z ukosnikiem. Najwazniejszy problem merytoryczny to tytuly czesci artykulow, ktore nadal brzmia bardziej jak tytuly wpisow social media niz odpowiedzi na realne zapytania konstruktora. Sekcja `/wiedza` obiecuje baze wiedzy, ale obecnie nie ma zadnych artykulow, wiec najwieksza szansa SEO lezy w dopelnieniu tej czesci strony. Linkowanie wewnetrzne nie ma sierot, ale kilka artykulow ma bardzo malo linkow przychodzacych. Dane strukturalne sa szerokie i spojne, bez osieroconych referencji `@id`; warto tylko dodac `VideoObject` do dwoch artykulow z wlasnymi plikami MP4. Obrazy glowne i obrazy w tresci maja opisowe alty i dobre nazwy plikow. Puste alty w sekcji "Przeczytaj tez" sa akceptowalne, bo miniatury sa dekoracyjne przy tekstowym linku.

## Metodyka

Sprawdzone polecenia:

```powershell
npm.cmd run build
Get-ChildItem -Path build -Recurse -Filter *.html
Get-Content build\sitemap.xml
Get-Content build\robots.txt
Select-String -Path content\blog\*.json -Pattern '"seoTitle"'
Select-String -Path content\blog\*.json -Pattern '### '
```

Dodatkowo uruchomilem skrypt Node na `build/**/*.html`, ktory zebral: `title`, `meta description`, canonicale, naglowki `H1-H6`, JSON-LD, obrazy, linki wewnetrzne, liczbe linkow przychodzacych i glebokosc klikniec od strony glownej. Produkcje sprawdzilem przez `fetch()` z `redirect: "manual"` dla adresow z sitemap i ich wariantow z ukosnikiem oraz bez.

Build zakonczyl sie poprawnie. W logu bylo: `build-content-pages OK: blog=19`, `Generated static files in "build"`, `PROD_SITEMAP_URLS 27`. Skrypt RSS YouTube zwrocil `RSS HTTP 404`, ale zostawil poprzedni `episodes.json`, wiec build nie zostal przerwany.

## Ustalenia

### 1. Canonicale i sitemap wskazuja adresy, ktore na produkcji robia 301

- **Waga**: wysoka
- **Gdzie**: `docusaurus.config.js:22`, `docusaurus.config.js:23`, `build/sitemap.xml:1`
- **Co jest nie tak**: Dla podstron canonical i sitemap wskazuja adresy bez koncowego ukosnika, np. `https://pocaduchy.pl/blog/bledy-w-projekcie-konstrukcyjnym`. Produkcja na GitHub Pages odpowiada dla tego adresu `301` do `https://pocaduchy.pl/blog/bledy-w-projekcie-konstrukcyjnym/`, a dopiero wersja z ukosnikiem ma `200`.
- **Dlaczego to ma znaczenie**: To nie tworzy duplikatu 200/200, wiec nie jest katastrofa. Tworzy jednak lancuch canonical -> redirect -> docelowy URL. Wyszukiwarka sobie z tym poradzi, ale sygnal kanoniczny jest slabszy niz powinien, a sitemap nie pokazuje faktycznych adresow serwowanych bez przekierowania.
- **Jak naprawic**: Ujednolicic polityke URL-i z realnym hostingiem. Najprostszy wariant dla GitHub Pages to ustawic w Docusaurus `trailingSlash: true`, zeby canonicale i sitemap generowaly adresy z ukosnikiem. Po zmianie sprawdzic, czy sitemap i canonicale maja np. `https://pocaduchy.pl/blog/bledy-w-projekcie-konstrukcyjnym/`.
- **Koszt**: niski. Zmiana konfiguracyjna plus build i kontrola sitemap/canonicali. Ryzyko niskie, ale warto sprawdzic Search Console po wdrozeniu.

Potwierdzone na produkcji:

| URL z sitemap/canonical | Produkcja | Docelowy URL |
|---|---:|---|
| `https://pocaduchy.pl/blog/bledy-w-projekcie-konstrukcyjnym` | 301 | `/blog/bledy-w-projekcie-konstrukcyjnym/` |
| `https://pocaduchy.pl/o-mnie` | 301 | `/o-mnie/` |
| `https://pocaduchy.pl/uslugi` | 301 | `/uslugi/` |
| `https://pocaduchy.pl/blog/` | 200 | bez przekierowania |
| `https://pocaduchy.pl/` | 200 | bez przekierowania |

### 2. Sekcja `/wiedza` nie ma jeszcze stron, ktore obiecuje tytul SEO

- **Waga**: wysoka
- **Gdzie**: `src/data/wiedza-wzory.json:1`, `src/data/wiedza-materialy.json:1`, `src/data/wiedza-elementy.json:1`, `src/pages/wiedza.js:36`, `src/pages/wiedza.js:80`
- **Co jest nie tak**: Trzy zrodla danych bazy wiedzy sa pustymi tablicami. Build generuje `/wiedza/`, ale nie generuje podstron kategorii ani artykulow wiedzy. Jednoczesnie tytul strony brzmi `Baza wiedzy dla konstruktorów - wzory, tabele i normy`.
- **Dlaczego to ma znaczenie**: To najwieksza niewykorzystana szansa SEO. Strona celuje w konstruktorow, a wlasnie frazy encyklopedyczne, tabelaryczne i obliczeniowe maja najwiekszy potencjal evergreen. Obecnie uzytkownik dostaje obietnice bazy wiedzy, ale nie dostaje materialu.
- **Jak naprawic**: Najpierw stworzyc male, konkretne strony pod zapytania narzedziowe, nie szerokie eseje. Priorytet:
  - tabela tolerancji i pasowan ISO,
  - pasowania otwor walek: jak dobrac,
  - chropowatosc Ra i Rz: tabela i oznaczenia,
  - gwinty metryczne: tabela srednic i skokow,
  - klasy srub i momenty dokrecania,
  - wpusty pryzmatyczne: tabela doboru,
  - lozyska kulkowe: podstawy doboru,
  - materialy konstrukcyjne: stal, aluminium, tworzywa,
  - oznaczenia spoin na rysunku technicznym,
  - symbole pneumatyczne 3/2, 5/2, 5/3.
- **Koszt**: sredni do wysokiego, bo to praca merytoryczna. Technicznie system juz ma miejsce na dane, ale trzeba stworzyc tresc i wygenerowac podstrony.

### 3. Czesc tytulow artykulow nie odpowiada wystarczajaco dobrze realnym zapytaniom

- **Waga**: wysoka
- **Gdzie**: `content/blog/*.json:3`
- **Co jest nie tak**: Wszystkie 19 artykulow ma unikalny `seoTitle`, ale kilka tytulow jest zbyt ogolnych, zbyt autorskich albo traci miejsce na slowa, ktorych uzytkownik raczej nie wpisze. To jest wazniejsze niz sama dlugosc tytulu, bo tytul decyduje, czy strona odpowiada na intencje wyszukiwania.
- **Dlaczego to ma znaczenie**: Google moze zrozumiec temat po tresci, ale wynik w SERP musi wygladac jak odpowiedz na konkretne pytanie. Tytul typu "pozornie latwe miejsca" jest dobry jako naglowek felietonu, ale slaby jako odpowiedz na zapytanie techniczne.
- **Jak naprawic**: Poprawic `seoTitle` tam, gdzie tytul nie zawiera najprawdopodobniejszej frazy. Nie trzeba zmieniac tonu `H1`, jesli autor chce zachowac socialowy styl na stronie, ale `seoTitle` powinien byc bardziej wyszukiwarkowy.
- **Koszt**: niski. Zmiana 5-8 pol `seoTitle`, bez przebudowy layoutu.

Ocena 19 tytulow:

| Artykul | Obecny `seoTitle` | Ocena | Lepsza propozycja |
|---|---|---|---|
| `bledy-w-projekcie-konstrukcyjnym` | Błędy w projekcie konstrukcyjnym: co robić? | dobry, ale mozna doprecyzowac intencje | Błędy w projekcie konstrukcyjnym: jak je wykrywać i ograniczać |
| `design-for-maintenance-przezbrojenia` | Design for maintenance: projektowanie pod przezbrojenia | dobry dla niszy, ale angielska fraza moze byc waska | Design for maintenance: jak projektować maszynę pod przezbrojenia |
| `dobor-sprzegla-do-aplikacji` | Jak dobrać sprzęgło do aplikacji? Rodzaje i dobór | dobry, ale powtarza "dobor" | Jak dobrać sprzęgło: rodzaje sprzęgieł i kryteria doboru |
| `elektrozawory-pneumatyczne-dobor` | Elektrozawory pneumatyczne: rodzaje i zastosowanie | dobry, warto dodac 3/2, 5/2, 5/3 | Elektrozawory pneumatyczne 3/2, 5/2 i 5/3: rodzaje i zastosowanie |
| `elementy-znormalizowane-handlowki` | Elementy znormalizowane: czy warto stosować handlówki? | sredni, "handlowki" to zargon | Elementy znormalizowane w budowie maszyn: zastosowanie i przykłady |
| `kick-off-projektu-konstrukcyjnego` | Kick-off projektu konstrukcyjnego: agenda i role | dobry | bez zmiany |
| `koszty-a-jakosc-w-projektowaniu-maszyn` | Koszty a jakość w projekcie maszyny: gdzie oszczędzać | dobry | bez zmiany |
| `narzedzia-pracy-konstruktora` | Narzędzia konstruktora: sprzęt, CAD i prototypowanie | dobry | Narzędzia pracy konstruktora: sprzęt, CAD i prototypowanie |
| `onenote-notes-projektu` | OneNote projektu: jak zorganizować notes konstruktora | sredni, skladnia malo naturalna | Jak zorganizować OneNote w projekcie konstrukcyjnym |
| `polaczenie-wal-piasta` | Połączenie wał-piasta: przegląd rozwiązań | dobry | Połączenie wał-piasta: wpust, Taper Lock i tuleje zaciskowe |
| `pozornie-latwe-miejsca-projektu` | Pozornie łatwe miejsca w projekcie maszyny | slaby, brak konkretnej frazy | Błędy projektowe w chwytaku: case study palców chwytaka |
| `projektowanie-wielobrylowe-case-study` | Projektowanie wielobryłowe w CAD: case study | dobry | bez zmiany |
| `projektowanie-wielobrylowe-czesc-1` | Projektowanie wielobryłowe w CAD: część 1 | sredni, "czesc 1" nie niesie intencji | Projektowanie wielobryłowe w CAD: kiedy stosować multi-body |
| `projektowanie-z-niepelnymi-danymi` | Projektowanie z niepełnymi danymi: 6 praktyk | dobry | Jak projektować maszynę przy niepełnych danych: 6 praktyk |
| `standaryzacja-w-biurze-konstrukcyjnym` | Standaryzacja w biurze konstrukcyjnym: jak zacząć | dobry | bez zmiany |
| `szacowanie-czasu-projektowania` | Jak oszacować czas projektowania? Cztery metody | dobry | Jak oszacować czas projektowania maszyny? 4 metody |
| `tuleje-taper-lock-dobor` | Tuleje Taper Lock: dobór i montaż | dobry | Tuleje Taper Lock (Taper Bush): dobór, montaż i zastosowanie |
| `umiejetnosci-poczatkujacego-konstruktora` | Umiejętności początkującego konstruktora maszyn | dobry | bez zmiany |
| `weryfikacja-cad-przed-produkcja` | Weryfikacja CAD przed produkcją: checklista błędów | dobry | Weryfikacja CAD przed produkcją: checklista konstruktora |

### 4. Czesc tytulow i opisow moze byc ucinana w wynikach

- **Waga**: srednia
- **Gdzie**: `content/blog/*.json:3`, `src/pages/blog/index.js:45`, `src/pages/odcinki.js:88`, `src/pages/wiedza.js:46`, `content/uslugi.json:4`, `content/prawne.json:21`, `content/prawne.json:107`
- **Co jest nie tak**: Tytuly sa unikalne, ale 13 z 27 tytulow ma ponad 60 znakow po dopisaniu `| poCADuchy`. Opisy sa unikalne i obecne, ale 12 z 27 opisow ma ponad 160 znakow. To nie znaczy, ze Google zawsze je utnie, ale ryzyko jest realne.
- **Dlaczego to ma znaczenie**: Uciety tytul lub opis moze obnizyc CTR, szczegolnie gdy koncowka niesie konkret. Dla strony z mloda domena kazdy wynik powinien byc jak najbardziej jednoznaczny.
- **Jak naprawic**: Trzymac `seoTitle` zwykle w okolicach 45-55 znakow, bo Docusaurus doklada brand. Opisy skrocic do ok. 140-155 znakow dla stron, gdzie obecnie przekraczaja 170 znakow.
- **Koszt**: niski. Zmiany tekstowe w metadanych.

Najdluzsze tytuly po buildzie:

| URL | Znaki | Tytul |
|---|---:|---|
| `/blog` | 67 | Artykuły o konstruowaniu maszyn - praktyka konstruktora \| poCADuchy |
| `/blog/design-for-maintenance-przezbrojenia` | 67 | Design for maintenance: projektowanie pod przezbrojenia \| poCADuchy |
| `/blog/elementy-znormalizowane-handlowki` | 66 | Elementy znormalizowane: czy warto stosować handlówki? \| poCADuchy |
| `/blog/koszty-a-jakosc-w-projektowaniu-maszyn` | 65 | Koszty a jakość w projekcie maszyny: gdzie oszczędzać \| poCADuchy |
| `/blog/onenote-notes-projektu` | 65 | OneNote projektu: jak zorganizować notes konstruktora \| poCADuchy |
| `/odcinki` | 65 | Odcinki: filmy o konstruowaniu maszyn, CAD i druku 3D \| poCADuchy |
| `/wiedza` | 65 | Baza wiedzy dla konstruktorów - wzory, tabele i normy \| poCADuchy |

### 5. Na 14 stronach wystepuje przeskok naglowkow z `H1` na `H3`

- **Waga**: srednia
- **Gdzie**: `content/blog/bledy-w-projekcie-konstrukcyjnym.json:57`, `content/blog/design-for-maintenance-przezbrojenia.json:53`, `content/blog/elektrozawory-pneumatyczne-dobor.json:49`, `content/blog/onenote-notes-projektu.json:56`, `content/blog/polaczenie-wal-piasta.json:61`, `content/blog/pozornie-latwe-miejsca-projektu.json:49`, `content/blog/projektowanie-wielobrylowe-case-study.json:53`, `content/blog/projektowanie-wielobrylowe-czesc-1.json:49`, `content/blog/projektowanie-z-niepelnymi-danymi.json:57`, `content/blog/tuleje-taper-lock-dobor.json:57`, `content/blog/umiejetnosci-poczatkujacego-konstruktora.json:63`, `content/blog/weryfikacja-cad-przed-produkcja.json:61`, `src/pages/index.js:293`, `src/pages/uslugi.js:99`
- **Co jest nie tak**: Kazda strona ma dokladnie jeden `H1`, co jest dobre. Problemem jest to, ze na wymienionych stronach po `H1` pojawia sie od razu `H3`. W artykulach wynika to najczesciej z Markdowna zaczynajacego sekcje od `###`.
- **Dlaczego to ma znaczenie**: To nie blokuje indeksacji, ale oslabia strukture dokumentu. Robot i czytnik ekranu dostaja sygnal, jakby brakowalo poziomu sekcji. Przy dlugich artykulach technicznych porzadne `H2` pomagaja tez wyszukiwarce zrozumiec glowna strukture tematu.
- **Jak naprawic**: W artykulach zamienic pierwszopoziomowe sekcje z `###` na `##`, a `###` zostawic tylko dla podsekcji. Na stronie glownej zmienic naglowek najnowszego odcinka na `H2` albo dodac poprzedzajace `H2`. Na `/uslugi` dodac sekcje `H2` dla zakresu uslug przed kartami albo zmienic pierwsze tytuly kart tak, by nie przeskakiwaly struktury.
- **Koszt**: niski do sredniego. Zmiana Markdowna w 12 artykulach plus dwa drobne miejsca w komponentach.

Przeskoki wykryte w buildzie:

| URL | Pierwszy przeskok |
|---|---|
| `/` | `H1 -> H3`: Konstruktorze - RUSZ ROBOTEM... |
| `/blog/bledy-w-projekcie-konstrukcyjnym` | `H1 -> H3`: 1. Mentalne podejście do problemów/błędów |
| `/blog/design-for-maintenance-przezbrojenia` | `H1 -> H3`: Sześć zasad skracających przestoje międzyprodukcyjne |
| `/blog/elektrozawory-pneumatyczne-dobor` | `H1 -> H3`: 1. Elektrozawory - przede wszystkim co to i po co? |
| `/blog/onenote-notes-projektu` | `H1 -> H3`: 1. Przemyśl jak wyglądają Twoje projekty |
| `/blog/polaczenie-wal-piasta` | `H1 -> H3`: GRUPA I - połączenia bezpośrednie |
| `/blog/pozornie-latwe-miejsca-projektu` | `H1 -> H3`: "Łatwe" do narysowania palce chwytaka |
| `/blog/projektowanie-wielobrylowe-case-study` | `H1 -> H3`: Winowajcy, czyli dlaczego poszedłem w stronę "wielobryłówki" |
| `/blog/projektowanie-wielobrylowe-czesc-1` | `H1 -> H3`: Część wielobryłowa - co to w ogóle za stworzenie? |
| `/blog/projektowanie-z-niepelnymi-danymi` | `H1 -> H3`: 6 praktyk, które nie zamrożą Was w miejscu |
| `/blog/tuleje-taper-lock-dobor` | `H1 -> H3`: Czym w ogóle jest tuleja Taper Lock? |
| `/blog/umiejetnosci-poczatkujacego-konstruktora` | `H1 -> H3`: 10 umiejętności, które powinieneś rozwijać |
| `/blog/weryfikacja-cad-przed-produkcja` | `H1 -> H3`: 1. Musisz wiedzieć DLACZEGO |
| `/uslugi` | `H1 -> H3`: Projektowanie |

### 6. Linkowanie wewnetrzne jest poprawne, ale nierowne

- **Waga**: srednia
- **Gdzie**: `build/blog/umiejetnosci-poczatkujacego-konstruktora/index.html:1`, `build/blog/elektrozawory-pneumatyczne-dobor/index.html:1`, `build/blog/pozornie-latwe-miejsca-projektu/index.html:1`
- **Co jest nie tak**: Nie ma stron sierot. Wszystkie publiczne strony sa osiagalne od strony glownej, a artykuly maja glebokosc 2 klikniec. Kilka artykulow ma jednak bardzo malo linkow przychodzacych. Najslabszy jest wpis o umiejetnosciach poczatkujacego konstruktora, ktory ma tylko 1 link wewnetrzny w buildzie.
- **Dlaczego to ma znaczenie**: Artykuly z mala liczba linkow wewnetrznych dostaja slabszy sygnal waznosci. Dla mlodej bazy artykulow sekcja "Przeczytaj tez" powinna wzmacniac najwazniejsze tematy, a nie tylko przypadkowo laczyc wpisy.
- **Jak naprawic**: Dopisac reczne `related` w tematycznie pasujacych artykulach. Wpis o umiejetnosciach powinien dostac linki z tekstow o narzedziach konstruktora, weryfikacji CAD i bledach projektowych. Wpis o elektrozaworach powinien byc linkowany z artykulow o narzedziach, doborze sprzegla lub przyszlych wpisow o pneumatyce.
- **Koszt**: niski. Kilka zmian w polach `related` w JSON-ach.

Tabela linkowania wewnetrznego:

| Strona | Linki przychodzace | Rozne strony z linkiem | Glebokosc od `/` |
|---|---:|---:|---:|
| `/` | 61 | 27 | 0 |
| `/blog` | 96 | 27 | 1 |
| `/o-mnie` | 73 | 27 | 1 |
| `/odcinki` | 55 | 27 | 1 |
| `/polityka-prywatnosci` | 27 | 27 | 1 |
| `/regulamin` | 27 | 27 | 1 |
| `/uslugi` | 57 | 27 | 1 |
| `/wiedza` | 54 | 27 | 1 |
| `/blog/bledy-w-projekcie-konstrukcyjnym` | 3 | 3 | 2 |
| `/blog/design-for-maintenance-przezbrojenia` | 4 | 4 | 2 |
| `/blog/dobor-sprzegla-do-aplikacji` | 5 | 5 | 2 |
| `/blog/elektrozawory-pneumatyczne-dobor` | 2 | 2 | 2 |
| `/blog/elementy-znormalizowane-handlowki` | 13 | 9 | 2 |
| `/blog/kick-off-projektu-konstrukcyjnego` | 12 | 9 | 2 |
| `/blog/koszty-a-jakosc-w-projektowaniu-maszyn` | 9 | 6 | 2 |
| `/blog/narzedzia-pracy-konstruktora` | 6 | 6 | 2 |
| `/blog/onenote-notes-projektu` | 5 | 5 | 2 |
| `/blog/polaczenie-wal-piasta` | 3 | 3 | 2 |
| `/blog/pozornie-latwe-miejsca-projektu` | 2 | 2 | 2 |
| `/blog/projektowanie-wielobrylowe-case-study` | 3 | 2 | 2 |
| `/blog/projektowanie-wielobrylowe-czesc-1` | 4 | 3 | 2 |
| `/blog/projektowanie-z-niepelnymi-danymi` | 5 | 5 | 2 |
| `/blog/standaryzacja-w-biurze-konstrukcyjnym` | 7 | 6 | 2 |
| `/blog/szacowanie-czasu-projektowania` | 9 | 7 | 2 |
| `/blog/tuleje-taper-lock-dobor` | 6 | 4 | 2 |
| `/blog/umiejetnosci-poczatkujacego-konstruktora` | 1 | 1 | 2 |
| `/blog/weryfikacja-cad-przed-produkcja` | 5 | 5 | 2 |

### 7. Dwa artykuly maja wideo w tresci, ale nie maja `VideoObject`

- **Waga**: niska
- **Gdzie**: `content/blog/elektrozawory-pneumatyczne-dobor.json:132`, `content/blog/pozornie-latwe-miejsca-projektu.json:67`, `src/components/BlogArticleTemplate.js:35`, `src/components/BlogArticleTemplate.js:46`
- **Co jest nie tak**: `/odcinki` ma `ItemList` z 7 zagniezdzonymi `VideoObject`, ale dwa artykuly blogowe z wlasnymi plikami MP4 nie dodaja `VideoObject` do JSON-LD artykulu.
- **Dlaczego to ma znaczenie**: Jezeli te nagrania maja pomagac w rozumieniu tematu, Google moze lepiej je zinterpretowac po `VideoObject`. Bez tego sa tylko elementem HTML, a dane strukturalne artykulu widza glownie obrazy.
- **Jak naprawic**: Rozszerzyc `articleJsonLd()` o przetwarzanie blokow `type: "wideo"` i dodawanie `VideoObject` z `name`, `description`, `thumbnailUrl`, `contentUrl`, `uploadDate` lub `datePublished` artykulu oraz `isPartOf`.
- **Koszt**: niski do sredniego. Trzeba uwazac, zeby nie oznaczac jako wideo materialow dekoracyjnych, ale obecne dwa MP4 wygladaja na merytoryczne.

## Kontrola tytulow, opisow, naglowkow i danych strukturalnych

| Strona | Tytul znaki | Opis znaki | H1 | JSON-LD glowne typy |
|---|---:|---:|---:|---|
| `/` | 59 | 186 | 1 | Person, Organization, WebSite |
| `/blog` | 67 | 165 | 1 | Blog, BreadcrumbList, Person, Organization, WebSite |
| `/blog/bledy-w-projekcie-konstrukcyjnym` | 55 | 147 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/design-for-maintenance-przezbrojenia` | 67 | 145 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/dobor-sprzegla-do-aplikacji` | 61 | 165 | 1 | BlogPosting, BreadcrumbList, FAQPage, HowTo, Person, Organization, WebSite |
| `/blog/elektrozawory-pneumatyczne-dobor` | 62 | 141 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/elementy-znormalizowane-handlowki` | 66 | 150 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/kick-off-projektu-konstrukcyjnego` | 60 | 157 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/koszty-a-jakosc-w-projektowaniu-maszyn` | 65 | 152 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/narzedzia-pracy-konstruktora` | 64 | 176 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/onenote-notes-projektu` | 65 | 142 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/polaczenie-wal-piasta` | 53 | 143 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/pozornie-latwe-miejsca-projektu` | 54 | 140 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/projektowanie-wielobrylowe-case-study` | 56 | 150 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/projektowanie-wielobrylowe-czesc-1` | 53 | 145 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/projektowanie-z-niepelnymi-danymi` | 56 | 142 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/standaryzacja-w-biurze-konstrukcyjnym` | 61 | 174 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/szacowanie-czasu-projektowania` | 59 | 174 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/tuleje-taper-lock-dobor` | 45 | 147 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/umiejetnosci-poczatkujacego-konstruktora` | 59 | 140 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/blog/weryfikacja-cad-przed-produkcja` | 62 | 144 | 1 | BlogPosting, BreadcrumbList, FAQPage, Person, Organization, WebSite |
| `/o-mnie` | 55 | 173 | 1 | ProfilePage, BreadcrumbList, Person, Organization, WebSite |
| `/odcinki` | 65 | 181 | 1 | ItemList, VideoObject, BreadcrumbList, Person, Organization, WebSite |
| `/polityka-prywatnosci` | 42 | 183 | 1 | WebPage, BreadcrumbList, Person, Organization, WebSite |
| `/regulamin` | 42 | 187 | 1 | WebPage, BreadcrumbList, Person, Organization, WebSite |
| `/uslugi` | 64 | 188 | 1 | ProfessionalService, FAQPage, BreadcrumbList, Person, Organization, WebSite |
| `/wiedza` | 65 | 171 | 1 | BreadcrumbList, Person, Organization, WebSite |

## Dane strukturalne

W buildzie znalazlem i sparsowalem JSON-LD bez bledow. Liczby wezlow z pelnego skanu:

| Typ | Liczba |
|---|---:|
| `Person` | 28 |
| `Organization` | 28 |
| `WebSite` | 27 |
| `BlogPosting` | 38 |
| `BreadcrumbList` | 26 |
| `FAQPage` | 20 |
| `HowTo` | 1 |
| `HowToStep` | 4 |
| `ItemList` | 1 |
| `VideoObject` | 7 |
| `ProfilePage` | 1 |
| `ProfessionalService` | 1 |
| `WebPage` | 2 |

Weryfikacja referencji `@id`: brak nierozwiazanych referencji. `BlogPosting` wskazuje autora `https://pocaduchy.pl/#lukasz`, publishera `https://pocaduchy.pl/#organizacja` i `isPartOf` `https://pocaduchy.pl/#strona`; te wezly sa obecne na stronach przez globalny graf. Nie znalazlem osieroconych referencji, czyli takich, ktore wskazuja na nieistniejacy `@id`.

## Sitemap i robots.txt

Wynik: poprawne z uwaga o ukosnikach opisana w ustaleniu 1.

| Element | Wynik |
|---|---|
| Liczba publicznych HTML-i w buildzie, bez `404` i `/admin/` | 27 |
| Liczba URL-i w `build/sitemap.xml` | 27 |
| Braki w sitemap wzgledem builda | 0 |
| Nadmiarowe URL-e w sitemap wzgledem builda | 0 |
| Produkcyjna sitemap | 27 URL-i |
| `robots.txt` blokuje `/admin/` | tak |
| `robots.txt` blokuje publiczne strony | nie |
| `robots.txt` wskazuje sitemap | tak |

## Obrazy

Wynik: bez istotnego problemu SEO.

Obrazy glowne i obrazy merytoryczne w artykulach maja opisowe `alt`, np. okładki artykulow, schematy CAD, przekroje i zdjecia montazowe. Nazwy plikow sa opisowe i zgodne ze slugami, np. `elektrozawory-pneumatyczne-dobor-zawor-5-2-schemat.jpg`, `polaczenie-wal-piasta-tuleja-taper-lock.jpg`, `weryfikacja-cad-przed-produkcja-kolizje-i-bledy-cad.jpg`. `BlogPosting.image` zawiera okladke oraz obrazy z blokow `type: "obraz"`, wiec glowne grafiki artykulow sa obecne w danych strukturalnych.

Puste alty wystepuja po 3 na kazdej stronie artykulu w sekcji `Przeczytaj tez`, zrodlo: `src/components/BlogArticleTemplate.js:182`. To jest akceptowalne, bo miniatura jest dekoracyjna, a obok niej znajduje sie tekstowy link z tytulem artykulu.

## Czego brakuje calkowicie

Najbardziej brakuje realnej bazy wiedzy dla konstruktorow. Obecne 19 artykulow jest dobre jako blog ekspercki, ale nie zastepuje stron narzedziowych, ktore ktos zapisze, zacytuje albo znajdzie przez konkretne zapytanie w pracy.

Priorytetowe braki:

| Brakujaca strona | Dlaczego warto |
|---|---|
| Tabela tolerancji i pasowan ISO | Bardzo czesta potrzeba konstruktorow, silna intencja narzedziowa |
| Pasowanie otwor walek | Naturalne rozszerzenie pod frazy praktyczne i rysunkowe |
| Chropowatosc powierzchni Ra/Rz | Dobre pod rysunek techniczny i dokumentacje wykonawcza |
| Gwinty metryczne tabela | Evergreen, szybka odpowiedz, latwe linkowanie z artykulow |
| Klasy srub i momenty dokrecania | Praktyczne zapytanie warsztatowo-projektowe |
| Wpusty pryzmatyczne tabela | Pasuje do obecnego artykulu o polaczeniu wal-piasta |
| Taper Lock tabela doboru | Naturalne rozwiniecie istniejacego artykulu |
| Lozyska kulkowe dobór podstawowy | Temat bazowy dla konstruktorow maszyn |
| Materialy konstrukcyjne: stal, aluminium, tworzywa | Fundament pod przyszle artykuly i linkowanie |
| Symbole pneumatyczne 3/2, 5/2, 5/3 | Pasuje do artykulu o elektrozaworach |
| Oznaczenia spoin na rysunku | Fraza praktyczna dla dokumentacji |
| Checklista wypuszczenia dokumentacji | Naturalne rozwiniecie wpisu o weryfikacji CAD |

## Czego nie warto robic

- Nie warto przenosic tresci z `content/**/*.json` do kodu. Obecny model jest spojny z wymaganiem latwej edycji i nie jest przyczyna problemow SEO.
- Nie warto usuwac `/admin/` z builda tylko dlatego, ze jest w katalogu `build/`. Jest zablokowany w `robots.txt`, a panel CMS nie jest publiczna podstrona SEO.
- Nie warto walczyc z pustymi altami miniaturek w `Przeczytaj tez`. W tym miejscu puste `alt=""` sa poprawnym wzorcem, bo obraz dubluje tekstowy link.
- Nie warto proponowac naglowkow HTTP typu HSTS lub zaawansowanych polityk serwerowych bez zmiany hostingu albo CDN. GitHub Pages nie daje tu wlasnej kontroli naglowkow.
- Nie warto sztywno ograniczac CSP pod AdSense. Obecny kontekst projektu zaklada, ze reklamy Google maja dzialac, a sztywna lista domen dla skryptow i ramek latwo je popsuje.
- Nie warto masowo zmieniac wszystkich tytulow tylko po to, zeby byly krotsze. Najpierw poprawilbym intencje wyszukiwania w kilku slabszych artykulach, potem dopiero skracal opisy i tytuly o najwyzszym ryzyku uciecia.
