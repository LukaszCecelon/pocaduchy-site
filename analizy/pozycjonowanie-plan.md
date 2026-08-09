# Plan pozycjonowania pocaduchy.pl

Data: 2026-08-07.  
Zakres: lokalny build po `npm.cmd run build`, katalog `build/`, produkcja `https://pocaduchy.pl`, wcześniejsze audyty z katalogu `analizy/`.

## Najkrótszy wniosek

Strona jest technicznie gotowa do indeksowania: sitemap ma 30 URL-i, produkcyjna sitemap też ma 30 URL-i, sprawdzone adresy produkcyjne odpowiadają 200, każda strona ma jeden H1, canonical, opis i parsowalne JSON-LD. Problem nie jest już w technice bazowej. Problem jest w tym, że autorytet domeny jest młody, a największe frazy konstruktorskie wymagają więcej stron narzędziowych, więcej linków z kanału YouTube i pierwszych sensownych linków z branży.

Nie mam dostępu do Google Search Console. Nie mogę więc sprawdzić realnych kliknięć, wyświetleń, pozycji, CTR, zapytań ani problemów indeksowania zgłoszonych przez Google. W raporcie piszę, co wynika z kodu i builda, a osobno wskazuję, co Łukasz musi sprawdzić w GSC.

## 1. Stan faktyczny po buildzie

### Podsumowanie liczbowe

| Obszar | Wynik przed poprawkami | Wynik po poprawkach |
|---|---:|---:|
| URL-e w `build/sitemap.xml` | 30 | 30 |
| Publiczne HTML-e z sitemapy w buildzie | 30 | 30 |
| URL-e w produkcyjnej sitemapie | 30 | 30 |
| Sprawdzone produkcyjne adresy z HTTP 200 | 5/5 | 5/5 |
| Strony bez dokładnie jednego H1 | 0 | 0 |
| Zduplikowane H1 | 0 | 0 |
| Title dłuższe niż 60 znaków | 13 | 0 |
| Description dłuższe niż 160 znaków | 12 | 0 |
| Strony poniżej 250 słów widocznej treści | 3 | 3 |
| Strony osierocone w linkowaniu wewnętrznym | 0 | 0 |
| Błędy parsowania JSON-LD | 0 | 0 |

Sprawdzone produkcyjnie: `/sitemap.xml`, `/`, `/blog/`, `/narzedzia/pasowania/`, `/wiedza/pozycjonowanie-czesci-w-maszynie/`. Wszystkie zwróciły 200.

### Tabela stron po poprawkach

| URL | Title | Description | H1 | Słowa | Linki wchodzące | Strony linkujące | JSON-LD główne typy |
|---|---:|---:|---:|---:|---:|---:|---|
| `/` | 59 | 137 | 1 | 232 | 69 | 30 | Person, Organization, WebSite |
| `/blog/` | 43 | 119 | 1 | 803 | 102 | 30 | Blog, BlogPosting, BreadcrumbList |
| `/blog/bledy-w-projekcie-konstrukcyjnym/` | 55 | 147 | 1 | 1190 | 2 | 2 | BlogPosting, FAQPage |
| `/blog/design-for-maintenance-przezbrojenia/` | 56 | 145 | 1 | 1249 | 3 | 3 | BlogPosting, FAQPage |
| `/blog/dobor-sprzegla-do-aplikacji/` | 51 | 122 | 1 | 1110 | 6 | 6 | BlogPosting, FAQPage, HowTo |
| `/blog/elektrozawory-pneumatyczne-dobor/` | 49 | 141 | 1 | 1335 | 2 | 2 | BlogPosting, FAQPage, VideoObject |
| `/blog/elementy-znormalizowane-handlowki/` | 52 | 150 | 1 | 1040 | 12 | 9 | BlogPosting, FAQPage |
| `/blog/kick-off-projektu-konstrukcyjnego/` | 60 | 157 | 1 | 1044 | 12 | 9 | BlogPosting, FAQPage |
| `/blog/koszty-a-jakosc-w-projektowaniu-maszyn/` | 56 | 152 | 1 | 1281 | 9 | 6 | BlogPosting, FAQPage |
| `/blog/narzedzia-pracy-konstruktora/` | 54 | 122 | 1 | 1282 | 5 | 5 | BlogPosting, FAQPage |
| `/blog/onenote-notes-projektu/` | 46 | 142 | 1 | 1160 | 5 | 5 | BlogPosting, FAQPage |
| `/blog/polaczenie-wal-piasta/` | 53 | 143 | 1 | 2124 | 4 | 4 | BlogPosting, FAQPage |
| `/blog/pozornie-latwe-miejsca-projektu/` | 54 | 140 | 1 | 927 | 2 | 2 | BlogPosting, FAQPage, VideoObject |
| `/blog/projektowanie-wielobrylowe-case-study/` | 56 | 150 | 1 | 1158 | 3 | 2 | BlogPosting, FAQPage |
| `/blog/projektowanie-wielobrylowe-czesc-1/` | 53 | 145 | 1 | 868 | 4 | 3 | BlogPosting, FAQPage |
| `/blog/projektowanie-z-niepelnymi-danymi/` | 56 | 142 | 1 | 1513 | 5 | 5 | BlogPosting, FAQPage |
| `/blog/standaryzacja-w-biurze-konstrukcyjnym/` | 49 | 125 | 1 | 1113 | 8 | 7 | BlogPosting, FAQPage |
| `/blog/szacowanie-czasu-projektowania/` | 59 | 123 | 1 | 1115 | 8 | 6 | BlogPosting, FAQPage |
| `/blog/tuleje-taper-lock-dobor/` | 45 | 147 | 1 | 1116 | 6 | 4 | BlogPosting, FAQPage |
| `/blog/umiejetnosci-poczatkujacego-konstruktora/` | 59 | 140 | 1 | 1418 | 4 | 4 | BlogPosting, FAQPage |
| `/blog/weryfikacja-cad-przed-produkcja/` | 43 | 144 | 1 | 1434 | 6 | 6 | BlogPosting, FAQPage |
| `/narzedzia/` | 53 | 148 | 1 | 245 | 61 | 30 | CollectionPage, ItemList |
| `/narzedzia/pasowania/` | 47 | 132 | 1 | 836 | 3 | 3 | TechArticle, FAQPage |
| `/o-mnie/` | 55 | 127 | 1 | 693 | 79 | 30 | ProfilePage |
| `/odcinki/` | 53 | 131 | 1 | 540 | 61 | 30 | ItemList, VideoObject |
| `/polityka-prywatnosci/` | 42 | 135 | 1 | 1060 | 30 | 30 | WebPage |
| `/regulamin/` | 42 | 123 | 1 | 615 | 30 | 30 | WebPage |
| `/uslugi/` | 42 | 122 | 1 | 489 | 63 | 30 | ProfessionalService, FAQPage |
| `/wiedza/` | 48 | 139 | 1 | 129 | 63 | 30 | CollectionPage, ItemList |
| `/wiedza/pozycjonowanie-czesci-w-maszynie/` | 50 | 127 | 1 | 562 | 1 | 1 | TechArticle |

### Co z tych liczb wynika

1. Technika nie blokuje indeksowania: canonicale są z końcowym ukośnikiem, sitemap jest spójna z buildem, JSON-LD się parsuje.
2. Najsłabsze treściowo są listy: `/wiedza/`, `/narzedzia/` i strona główna. To nie jest krytyczny błąd, ale `/wiedza/` powinna szybko dostać więcej artykułów.
3. Najsłabsze linkowanie wśród stron merytorycznych ma `/wiedza/pozycjonowanie-czesci-w-maszynie/`: tylko 1 link z jednej strony. Ten materiał powinien dostać linki z przyszłych treści o kołkach, śrubach pasowanych, bazowaniu i montażu.
4. Po poprawkach nie ma już za długich title ani description według progu 60/160 znaków.

## 2. Frazy dla istniejących stron

Nie podaję wolumenów wyszukiwań, bo bez narzędzi typu GSC, Senuto, Ahrefs albo Semstorm byłyby zgadywaniem. Szereguję frazy względnie: bardzo wysoka konkurencja to zwykle ogólne tabele i kalkulatory, średnia konkurencja to konkretne elementy maszyn, niska konkurencja to długi ogon związany z praktyką konstruktora.

| Strona | Fraza główna | Dopasowanie treści | Realność teraz | Realność za 6 miesięcy |
|---|---|---|---|---|
| `/` | `poCADuchy` | bardzo dobre, strona główna ma sens głównie brandowo | realne | realne |
| `/blog/` | `artykuły o konstruowaniu maszyn` | dobre jako lista, słabe jako fraza z ruchem | niska | średnia, jeśli artykułów będzie więcej |
| `/blog/bledy-w-projekcie-konstrukcyjnym/` | `błędy w projekcie konstrukcyjnym` | dobre, tekst odpowiada na intencję praktyczną | średnia w długim ogonie | średnia |
| `/blog/design-for-maintenance-przezbrojenia/` | `design for maintenance przezbrojenia` | dobre, nisza jest wąska | średnia | średnia |
| `/blog/dobor-sprzegla-do-aplikacji/` | `dobór sprzęgła` | dobre, ale konkurencja katalogów jest mocna | niska | średnia po dodaniu kalkulatora lub tabeli |
| `/blog/elektrozawory-pneumatyczne-dobor/` | `elektrozawory 3/2 5/2 5/3` | dobre, fraza jest konkretna | średnia | średnia do dobrej po stronie o symbolach pneumatycznych |
| `/blog/elementy-znormalizowane-handlowki/` | `elementy znormalizowane w budowie maszyn` | dobre, ale temat jest szeroki | niska | średnia po linkach z artykułów Wiedzy |
| `/blog/kick-off-projektu-konstrukcyjnego/` | `kick-off projektu konstrukcyjnego` | dobre, fraza niszowa | średnia w małym ruchu | średnia |
| `/blog/koszty-a-jakosc-w-projektowaniu-maszyn/` | `koszty w projektowaniu maszyn` | dobre, bardziej zarządcze niż narzędziowe | niska | średnia w długim ogonie |
| `/blog/narzedzia-pracy-konstruktora/` | `narzędzia pracy konstruktora` | dobre | średnia | średnia |
| `/blog/onenote-notes-projektu/` | `OneNote w projekcie konstrukcyjnym` | dobre i niszowe | średnia | średnia |
| `/blog/polaczenie-wal-piasta/` | `połączenie wał piasta` | bardzo dobre, tekst jest długi i techniczny | średnia | dobra po dodaniu strony o wpustach |
| `/blog/pozornie-latwe-miejsca-projektu/` | `błędy projektowe chwytaka` | częściowe, tekst jest case study, nie poradnik pod frazę | niska | średnia po dopisaniu linków z treści o chwytakach |
| `/blog/projektowanie-wielobrylowe-case-study/` | `projektowanie wielobryłowe w CAD` | dobre, temat niszowy | średnia | średnia |
| `/blog/projektowanie-wielobrylowe-czesc-1/` | `projektowanie wielobryłowe w CAD` | dobre, ale dzieli intencję z częścią 2 | średnia | średnia |
| `/blog/projektowanie-z-niepelnymi-danymi/` | `projektowanie z niepełnymi danymi` | dobre, ale zapytanie ma mały ogon | średnia w małym ruchu | średnia |
| `/blog/standaryzacja-w-biurze-konstrukcyjnym/` | `standaryzacja w biurze konstrukcyjnym` | dobre | średnia | średnia |
| `/blog/szacowanie-czasu-projektowania/` | `szacowanie czasu projektowania` | dobre | średnia | średnia |
| `/blog/tuleje-taper-lock-dobor/` | `tuleje Taper Lock dobór` | dobre, konkretna fraza zakupowo-techniczna | średnia | dobra po stronie tabelarycznej |
| `/blog/umiejetnosci-poczatkujacego-konstruktora/` | `początkujący konstruktor maszyn umiejętności` | dobre, bardziej karierowe niż techniczne | średnia | średnia |
| `/blog/weryfikacja-cad-przed-produkcja/` | `weryfikacja CAD przed produkcją` | dobre | średnia | średnia |
| `/narzedzia/` | `kalkulatory inżynierskie dla konstruktora` | częściowe, bo jest tylko jeden kalkulator | niska | średnia po 3-4 narzędziach |
| `/narzedzia/pasowania/` | `kalkulator pasowań` | bardzo dobre | średnia | dobra po linkach z YouTube i artykułów ISO |
| `/o-mnie/` | `Łukasz Cecelon` | bardzo dobre, strona brandowa | realne | realne |
| `/odcinki/` | `poCADuchy odcinki` | dobre brandowo | realne | realne |
| `/polityka-prywatnosci/` | `pocaduchy polityka prywatności` | dobre, prawne | realne, ale bez celu SEO | realne |
| `/regulamin/` | `pocaduchy regulamin` | dobre, prawne | realne, ale bez celu SEO | realne |
| `/uslugi/` | `usługi konstrukcyjne projektowanie maszyn` | częściowe, konkurencja lokalna i firmowa | niska | średnia po referencjach i linkach zewnętrznych |
| `/wiedza/` | `baza wiedzy dla konstruktorów maszyn` | słabe jako samodzielna fraza, bo lista jest krótka | niska | średnia po 8-10 artykułach |
| `/wiedza/pozycjonowanie-czesci-w-maszynie/` | `pozycjonowanie części w budowie maszyn` | dobre, ale strona ma tylko 562 słowa i PDF | średnia | dobra po linkach z wpisów o kołkach i bazowaniu |

## 3. Luki treściowe

Maksymalnie 8 tematów, które dają najlepszy stosunek ruchu do wysiłku. Biorę pod uwagę `analizy/wiedza-plan.md`, oba research pliki oraz to, że kalkulator pasowań już istnieje.

| Priorytet | Proponowany adres | Fraza główna | Decyzja względem starego planu | Uzasadnienie |
|---:|---|---|---|---|
| 1 | `/wiedza/pasowania-h7-g6/` | `H7 g6` | przesunąć wyżej | Jest już kalkulator, więc krótka strona statyczna o H7/g6 najłatwiej wzmocni `/narzedzia/pasowania/`. |
| 2 | `/wiedza/tolerancje-i-pasowania-tabela/` | `tolerancje i pasowania tabela` | przesunąć wyżej | Fraza jest narzędziowa, a strona może linkować do kalkulatora i odwrotnie. |
| 3 | `/wiedza/wpusty-pryzmatyczne-tabela/` | `wpust pryzmatyczny wymiary` | zostawić wysoko | Naturalnie podpina się pod mocny artykuł o połączeniu wał-piasta. |
| 4 | `/wiedza/kolki-ustalajace-bazujace/` | `kołki ustalające` | przesunąć wyżej | Nowa strona o pozycjonowaniu części już daje temat i obrazy, ale potrzebuje bardziej wyszukiwarkowej strony satelickiej. |
| 5 | `/wiedza/gwinty-metryczne-tabela/` | `otwór pod gwint M8` | zostawić wysoko | Temat jest szybki do wdrożenia i ma jasną intencję warsztatową. |
| 6 | `/wiedza/chropowatosc-ra-rz/` | `Ra Rz przelicznik` | zostawić w środku | Ważny temat, ale trzeba mocno pilnować zastrzeżenia, że to nie jest prosty przelicznik. |
| 7 | `/wiedza/sruby-pasowane/` | `śruby pasowane` | dodać jako osobny temat | Wynika z istniejącej strony o pozycjonowaniu i ma konkretną intencję doboru oraz rysunku. |
| 8 | `/narzedzia/sila-silownika-pneumatycznego/` | `kalkulator siły silownika pneumatycznego` | przesunąć wyżej niż profile i nitonakrętki | Ma bardzo jasny wzór, łączy się z elektrozaworami i jako kalkulator może zdobywać linki. |

Co przesunąłbym niżej: `profile aluminiowe`, `nitonakrętki i nity`, `momenty dokręcania`. Profile i nitonakrętki są dobre, ale wymagają pilnowania konkretnych rodzin producentów. Momenty dokręcania mają duży popyt, lecz największe ryzyko błędnego użycia. Nie zaczynałbym od nich przy młodej stronie.

## 4. Plan działań

### A. Co robi Łukasz sam, poza kodem

| Priorytet | Co zrobić | Ile czasu | Czego się spodziewać | Kiedy sprawdzić efekt |
|---:|---|---:|---|---|
| 1 | W Google Search Console sprawdzić `Indeksowanie > Strony`: czy 30 URL-i z sitemapy jest wykrytych, które są `Zaindeksowano`, a które `Odkryto, obecnie nie zaindeksowano`. | 20 min | Lista konkretnych adresów, które trzeba dopchnąć linkami albo treścią. | od razu, potem co 2 tygodnie |
| 2 | W GSC użyć `Sprawdzenie adresu URL` dla `/narzedzia/pasowania/`, `/wiedza/pozycjonowanie-czesci-w-maszynie/`, `/blog/polaczenie-wal-piasta/`, `/blog/tuleje-taper-lock-dobor/` i poprosić o indeksowanie, jeśli Google ich nie ma. | 20 min | Szybsze wejście najważniejszych stron do kolejki. | 3-14 dni |
| 3 | W GSC w raporcie `Skuteczność` ustawić 28 dni i spisać zapytania, które mają wyświetlenia bez kliknięć. | 30 min | Lista fraz do korekty tytułów i opisów, bez zgadywania. | co miesiąc |
| 4 | Dodać do opisów filmów YouTube linki do najbliższych stron: pasowania do filmów o tolerancjach, Taper Lock do filmów o napędach, artykuły CAD do filmów CAD. Link ma być w pierwszych 2-3 liniach opisu. | 1-2 h na pierwszą rundę | Pierwsze mocne linki z własnego kanału i więcej wejść z widowni, która już ufa autorowi. | 2-6 tygodni |
| 5 | Do nowych filmów dodawać jedną stałą sekcję: `Materiały z odcinka` z linkiem do artykułu albo kalkulatora. | 5 min na film | Każdy nowy film wzmacnia jedną stronę, zamiast rozpraszać uwagę. | po 3-5 filmach |
| 6 | Na LinkedIn wrzucać pierwszy komentarz z jednym linkiem do strony, nie trzema. Opis: czego dotyczy link i kiedy się przyda przy projekcie. | 3 min na post | Więcej kliknięć i czytelniejszy sygnał, które treści są ważne. | po 4 postach |
| 7 | Zdobyć 5 pierwszych linków branżowych: odpowiedź na forum lub grupie tylko tam, gdzie link rozwiązuje konkretny problem, wpis gościnny u dystrybutora, link od producenta po użyciu jego katalogu, profil firmowy R&A Engineering, wpis w katalogu lokalnych usług technicznych. | 4-8 h | Nie chodzi o masę linków, tylko o pierwsze sygnały z miejsc związanych z CAD, automatyką i projektowaniem. | 1-3 miesiące |
| 8 | Kadencja publikacji: 1 strona Wiedzy albo 1 kalkulator miesięcznie, plus 2 posty LinkedIn linkujące do tej strony z różnym kontekstem. | 6-12 h miesięcznie | Po 6 miesiącach powstaje 6 mocnych URL-i, które wzajemnie się linkują. | po 3 i 6 miesiącach |

### B. Co robić w kodzie i treści strony

| Priorytet | Działanie | Zysk | Nakład | Status |
|---:|---|---|---|---|
| 1 | Skrócić za długie title i description. | Lepszy CTR, mniej uciętych snippetów. | niski | zrobione |
| 2 | Dodać `seoTitle` dla artykułów Wiedzy, żeby H1 mógł zostać autorski, a title SEO był krótszy. | Lepsza kontrola SERP bez zmiany treści autora. | niski | zrobione |
| 3 | Wzmocnić linkowanie do słabych artykułów przez `related`. | Więcej linków do stron, które wcześniej miały 1-2 wejścia wewnętrzne. | niski | zrobione |
| 4 | Dodać linki do strony Wiedzy o pozycjonowaniu części z przyszłych artykułów o kołkach, śrubach pasowanych i bazowaniu. | Ta strona ma tylko 1 link przychodzący. | niski | do zrobienia przy nowych treściach |
| 5 | Rozbudować `/wiedza/pozycjonowanie-czesci-w-maszynie/` o krótką sekcję tekstową nad PDF: kiedy użyć którego rozwiązania, tabela wyboru i linki do przyszłych tematów. | Strona ma dobry temat, ale 562 słowa i mało linków. | średni | bezpieczne po decyzji autora |
| 6 | Dodać statyczną stronę `H7/g6` linkującą do kalkulatora pasowań. | Najszybsze wzmocnienie fraz `H7 g6`, `pasowania ISO 286`, `kalkulator pasowań`. | średni | rekomendowane jako pierwszy nowy temat |
| 7 | Dodać 3 przykłady statyczne pod kalkulatorem pasowań: H7/g6, H7/h6, H7/p6. | Google i czytelnik dostają więcej treści bez interakcji. | średni | nie robiłem, bo spec zakazał ruszania kalkulatora |
| 8 | Przenieść pozostałe starsze widoczne teksty z Reacta do `content/*.json`. | Spójność z zasadami projektu. | średni | osobna runda, bo to refactor |

### C. Czego nie robić

| Czego nie robić | Dlaczego |
|---|---|
| Nie kupować pakietów linków SEO. | Młoda domena techniczna łatwo złapie linki bez sensu tematycznego, a zysk będzie krótkotrwały albo żaden. |
| Nie pisać 20 krótkich tekstów po 300 słów. | Dla konstruktora liczy się tabela, rysunek, przykład i ograniczenia, nie sama liczba URL-i. |
| Nie zaczynać od momentów dokręcania jako pierwszej tabeli. | To temat z największym ryzykiem błędnego zastosowania i mocnymi różnicami między źródłami. |
| Nie przepisywać artykułów z LinkedIn tylko pod SEO. | Ich siłą jest głos autora. Lepiej zmieniać `seoTitle`, opis i tworzyć osobne strony Wiedzy. |
| Nie robić osobnych stron pod każdą drobną odmianę frazy. | Przy tej skali lepsza jest jedna mocna strona `H7/g6` niż pięć cienkich stron o tym samym. |
| Nie tracić czasu na kolejne narzędzia SEO bez GSC. | GSC już pokaże prawdziwe zapytania, indeksację i CTR dla tej konkretnej domeny. |
| Nie wrzucać linku do strony w każdym poście bez kontekstu. | Link musi rozwiązywać konkretny problem z posta albo filmu. Inaczej będzie ignorowany. |

## 5. Co już poprawiłem

1. Skróciłem title i description tak, że po buildzie wynik wynosi: 0 title powyżej 60 znaków i 0 description powyżej 160 znaków.
2. Doprecyzowałem `seoTitle` dla stron: design for maintenance, dobór sprzęgła, elektrozawory, elementy znormalizowane, koszty projektu, narzędzia konstruktora, OneNote, standaryzacja, weryfikacja CAD, usługi i odcinki.
3. Skróciłem opisy SEO dla: strony głównej, bloga, doboru sprzęgła, narzędzi konstruktora, standaryzacji, szacowania czasu, O mnie, Odcinków, Usług, polityki prywatności, regulaminu i strony Wiedzy o pozycjonowaniu części.
4. Dodałem obsługę `seoTitle` w artykułach Wiedzy: szablon może mieć krótszy title SEO bez zmiany H1.
5. Dołożyłem linkowanie wewnętrzne przez `related` do artykułu o umiejętnościach początkującego konstruktora: wcześniej miał 1 link z 1 strony, po poprawce ma 4 linki z 4 stron.
6. Dołożyłem linkowanie przez `related` do artykułu o elektrozaworach: wcześniej miał 1 link z 1 strony, po poprawce ma 2 linki z 2 stron.
7. Uruchomiłem `npm.cmd run build` po zmianach. Build przechodzi.

## 6. Pierwsze 30 dni

1. Dzień 1: w GSC sprawdzić indeksację 30 URL-i i ręcznie zgłosić 4 najważniejsze strony: kalkulator pasowań, pozycjonowanie części, połączenie wał-piasta, Taper Lock.
2. Dzień 1-2: dodać link do `/narzedzia/pasowania/` w opisach filmów, które dotykają tolerancji, wałów, piast, montażu albo rysunku.
3. Tydzień 1: opublikować post LinkedIn z jednym linkiem do kalkulatora pasowań i konkretnym przykładem `H7/g6`.
4. Tydzień 2-3: zrobić stronę `/wiedza/pasowania-h7-g6/`.
5. Tydzień 4: w GSC sprawdzić zapytania i CTR dla kalkulatora oraz nowych opisów. Zmieniać title dopiero po danych, nie po przeczuciu.

