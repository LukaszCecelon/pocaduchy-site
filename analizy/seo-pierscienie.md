# SEO dla kalkulatora pierścieni osadczych

Data sprawdzenia: 2026-08-09.

Źródła w repozytorium:

- `src/lib/pierscienie/dane.json`
- `src/lib/pierscienie/oblicz.js`
- `content/wiedza-pasowania.json`
- `src/pages/narzedzia.js`
- `src/pages/narzedzia/pasowania.js`
- `src/components/BlogArticleTemplate.js`
- `scripts/build-content-pages.mjs`
- `docusaurus.config.js`
- `static/llms.txt`

## 1. Mapa fraz

Uwaga o kolumnie „czy już rankujemy”: nie mam dostępu do GSC. Sprawdziłem repozytorium i szybkie zapytania `site:pocaduchy.pl` dla fraz pierścieniowych. Wniosek traktuję jako ocenę pokrycia tematu przez istniejące strony, nie jako twarde dane z Search Console.

| Fraza | Intencja | Gdzie obsługujemy | Czy już rankujemy na coś podobnego |
| --- | --- | --- | --- |
| pierścienie Segera | informacyjna, narzędziowa | lead, H2 „Jak czytać oznaczenie pierścienia”, FAQ | Temat pojawia się tylko pośrednio jako „pierścienie zabezpieczające” w artykułach, brak dedykowanej strony. |
| pierścień osadczy | informacyjna | H1, lead, FAQ, tekst pod narzędziem | Podobna fraza występuje w `content/wiedza-pasowania.json`, ale nie jako główny temat. |
| DIN 471 | narzędziowa | H1, H2, UI trybu wałka, FAQ, JSON-LD | Brak dedykowanego adresu w repozytorium. |
| DIN 472 | narzędziowa | H1, H2, UI trybu otworu, FAQ, JSON-LD | Brak dedykowanego adresu w repozytorium. |
| rowek pod pierścień osadczy | narzędziowa | meta description, H1, lead, H2, tekst | Brak dedykowanego wyniku, dobra fraza główna dla narzędzia. |
| wymiary pierścieni Segera | narzędziowa | lead, UI „Wymiary pierścienia”, FAQ | Istnieją tylko wzmianki o pierścieniach w artykułach o wałach i handlówkach. |
| tolerancja rowka pierścienia | narzędziowa | UI „Tolerancje”, FAQ o H13, tekst o d2 | Najbliżej tematu jest `/narzedzia/pasowania/`, ale dotyczy pasowań ISO 286. |
| pierścień zabezpieczający na wałek | informacyjna, narzędziowa | H2 „DIN 471 czy DIN 472”, FAQ, zobacz też | Fraza jest semantycznie bliska artykułowi `polaczenie-wal-piasta.json`, gdzie występuje zabezpieczenie piasty pierścieniem. |
| kalkulator pierścieni osadczych | narzędziowa | `seoTitle`, H1, WebApplication | Nowa intencja, brak obecnego narzędzia w `/narzedzia/`. |
| rowek pod Segera na wałku | narzędziowa | FAQ, tekst o DIN 471 | Long tail do przejęcia przez FAQ. |
| rowek pod pierścień Segera w otworze | narzędziowa | FAQ, tekst o DIN 472 | Long tail do przejęcia przez FAQ i tryb otworu. |
| szerokość rowka pierścienia osadczego H13 | narzędziowa | FAQ o H13, UI „Szerokość rowka” | Brak pokrycia poza ogólnym kalkulatorem pasowań. |
| luz osiowy pierścienia osadczego | informacyjna, narzędziowa | H2 „Skąd bierze się luz osiowy”, UI, FAQ | Nowy temat, pasowania obsługują luz wałka i otworu, ale nie luz osiowy pierścienia. |
| odległość rowka od czoła wałka | informacyjna | H2 „Odległość od czoła to nie ozdoba”, UI | Dobre wsparcie dla zapytań warsztatowych i rysunkowych. |
| DIN 471 wymiary rowka | narzędziowa | H1, H2, UI trybu wałka | Brak dedykowanego rankingu. |
| DIN 472 wymiary rowka | narzędziowa | H1, H2, UI trybu otworu | Brak dedykowanego rankingu. |

## 2. Meta

`seoTitle`: `Kalkulator pierścieni osadczych DIN 471/472`

Długość: 43 znaki.

Uzasadnienie: zaczyna się od intencji narzędziowej, zawiera „pierścienie osadcze” i obie normy. Mieści się spokojnie w limicie 60 znaków, bez dokładania potocznego „Segera” kosztem czytelności.

`opis`: `Kalkulator rowka pod pierścień osadczy DIN 471 i DIN 472. Sprawdź średnicę, szerokość, głębokość rowka, tolerancje i luz osiowy bez szukania w tablicach.`

Długość: 153 znaki.

Uzasadnienie: opisuje konkretną robotę użytkownika: rowek, norma, wymiary i luz osiowy. Fraza „bez szukania w tablicach” pasuje do narzędzia i do realnego bólu konstruktora, ale nie obiecuje obliczeń wytrzymałościowych.

## 3. Struktura nagłówków

H1:

- `Pierścienie osadcze: kalkulator rowka DIN 471 i DIN 472`
  Frazy: pierścienie osadcze, kalkulator rowka, DIN 471, DIN 472.

H2 w kolejności:

- `DIN 471 czy DIN 472`
  Frazy: DIN 471, DIN 472, pierścień na wałek, pierścień do otworu.
- `Skąd bierze się luz osiowy`
  Frazy: luz osiowy pierścienia osadczego, szerokość rowka, grubość pierścienia.
- `Odległość od czoła to nie ozdoba`
  Frazy: odległość rowka od czoła wałka, minimalna odległość od czoła.
- `Jak czytać oznaczenie pierścienia`
  Frazy: wymiary pierścieni Segera, oznaczenie DIN 471, oznaczenie DIN 472.
- `Wykonanie normalne i wzmocnione`
  Frazy: pierścień osadczy normalny, pierścień osadczy wzmocniony.
- `Zobacz też`
  Frazy: linkowanie pomocnicze, połączenie wał-piasta, elementy znormalizowane.

## 4. Dane strukturalne

Metoda powinna być taka sama jak w `src/pages/narzedzia/pasowania.js`: funkcja `daneStrukturalne()` zwraca obiekt, a w `<Head>` idzie `JSON.stringify(daneStrukturalne())`. Poniżej gotowy kod do późniejszego wstawienia do strony React. Nie wstawiałem go do kodu.

```js
const SCIEZKA = '/narzedzia/pierscienie-osadcze';
const PAGE_URL = absolutePageUrl(SCIEZKA);

function daneStrukturalne() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${PAGE_URL}#kalkulator`,
        name: tresc.seoTitle,
        description: tresc.opis,
        url: PAGE_URL,
        inLanguage: 'pl-PL',
        applicationCategory: 'EngineeringApplication',
        operatingSystem: 'Any',
        isAccessibleForFree: true,
        creator: {'@id': `${SITE_URL}/#lukasz`},
        publisher: {'@id': `${SITE_URL}/#organizacja`},
        isPartOf: {'@id': `${SITE_URL}/#strona`},
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#pytania`,
        mainEntity: tresc.faq.map((pytanie) => ({
          '@type': 'Question',
          name: pytanie.pytanie,
          acceptedAnswer: {
            '@type': 'Answer',
            text: pytanie.odpowiedz,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#okruszki`,
        itemListElement: [
          {'@type': 'ListItem', position: 1, name: 'Strona główna', item: absolutePageUrl('/')},
          {'@type': 'ListItem', position: 2, name: 'Narzędzia', item: absolutePageUrl('/narzedzia')},
          {'@type': 'ListItem', position: 3, name: 'Pierścienie osadcze', item: PAGE_URL},
        ],
      },
    ],
  };
}
```

Jeżeli strona użyje komponentu `Okruszki`, trzeba uważać na duplikację `BreadcrumbList`, bo `Okruszki` już generuje breadcrumb JSON-LD. Najczystsze rozwiązanie: albo polegać na `Okruszki`, albo zostawić breadcrumb w jednej funkcji na stronie, ale nie w obu miejscach naraz.

## 5. Linkowanie wewnętrzne

Nie zmieniałem artykułów. To są przedruki publikacji z LinkedIna, więc linkowanie do narzędzia powinno iść przez pole `narzedzia`, które obsługuje `NarzedziaDoTematu` w `src/components/BlogArticleTemplate.js:185`. Skrypt `scripts/build-content-pages.mjs:151` przekazuje `data.narzedzia` do szablonu bloga.

Warunek techniczny: zanim te wartości trafią do artykułów, nowe narzędzie powinno być dopisane do `content/narzedzia.json` z tym samym adresem, bo komponent wyszukuje opis narzędzia po `url`.

Proponowane zmiany, bez wdrażania:

| Plik | Pole | Proponowana wartość | Anchor z karty narzędzia |
| --- | --- | --- | --- |
| `content/blog/polaczenie-wal-piasta.json` | `narzedzia` | `["/narzedzia/pasowania/", "/narzedzia/pierscienie-osadcze/"]` | `Pierścienie osadcze: rowek DIN 471/472` |
| `content/blog/weryfikacja-cad-przed-produkcja.json` | `narzedzia` | `["/narzedzia/pasowania/", "/narzedzia/pierscienie-osadcze/"]` | `Pierścienie osadcze: rowek DIN 471/472` |
| `content/blog/narzedzia-pracy-konstruktora.json` | `narzedzia` | `["/narzedzia/pierscienie-osadcze/"]` | `Pierścienie osadcze: rowek DIN 471/472` |
| `content/blog/elementy-znormalizowane-handlowki.json` | `narzedzia` | `["/narzedzia/pierscienie-osadcze/"]` | `Pierścienie osadcze: rowek DIN 471/472` |
| `content/blog/tuleje-taper-lock-dobor.json` | `narzedzia` | `["/narzedzia/pierscienie-osadcze/"]` | `Pierścienie osadcze: rowek DIN 471/472` |

Uwaga praktyczna: obecnie istniejące wpisy w `narzedzia` i `content/narzedzia.json` używają adresów bez końcowego ukośnika. Dla nowego narzędzia warto od razu przejść na wariant z ukośnikiem, ale wtedy trzeba zadbać, żeby `content/narzedzia.json` i artykuły miały identyczny string.

## 6. Wpis do `static/llms.txt`

Gotowy fragment, dopisany w sekcji „Narzędzia”:

```md
- [Kalkulator pierścieni osadczych DIN 471/472](https://pocaduchy.pl/narzedzia/pierscienie-osadcze/): dobiera wymiary rowka pod pierścień osadczy na wałek DIN 471 albo do otworu DIN 472. Użytkownik podaje średnicę nominalną, a narzędzie zwraca średnicę rowka z klasą tolerancji, szerokość rowka H13, głębokość, minimalną odległość od czoła oraz luz osiowy. Obejmuje dane tabelaryczne dostępne w kalkulatorze: DIN 471 od 3 do 100 mm i DIN 472 od 10 do 100 mm. Pierścienie Segera są nazwą potoczną, nie nazwą normy. Kalkulator nie liczy dopuszczalnego obciążenia osiowego.
```

## 7. Sitemap i przekierowania

W `docusaurus.config.js:29` ustawione jest `trailingSlash: true`. `absolutePageUrl()` w `src/lib/site.js` też normalizuje adresy stron do końcowego ukośnika. Po utworzeniu właściwej strony `src/pages/narzedzia/pierscienie-osadcze.js` adres powinien wejść do sitemapy automatycznie przez preset Docusaurus classic. Sam plik `content/narzedzia-pierscienie.json` nie tworzy jeszcze strony, więc sam z siebie nie doda adresu do sitemapy.

Nie znalazłem w repozytorium starego adresu dla tego narzędzia ani przekierowania związanego z pierścieniami. Na ten moment nie ma czego przekierowywać. Jeżeli w GSC pojawią się warianty bez ukośnika, powinny kanonikalizować się do `/narzedzia/pierscienie-osadcze/`. Bez dostępu do GSC nie mogę potwierdzić, czy takie warianty już istnieją.

## 8. Audyt `/narzedzia/` i `/narzedzia/pasowania/`

Usterki i ryzyka do decyzji:

- `src/pages/narzedzia/pasowania.js:52`: strona generuje `FAQPage`, ale nie renderuje sekcji FAQ w widocznej treści. Dane strukturalne FAQ powinny odpowiadać treści widocznej dla użytkownika.
- `src/pages/narzedzia/pasowania.js:42`: kalkulator pasowań opisany jest jako `TechArticle`, mimo że główną funkcją strony jest narzędzie. Warto rozważyć `WebApplication` plus ewentualnie `FAQPage`.
- `content/wiedza-pasowania.json:149` i `content/wiedza-pasowania.json:153`: linki wewnętrzne w `zobaczTez` nie mają końcowego ukośnika, mimo `trailingSlash: true`.
- `content/narzedzia.json:15`, `content/narzedzia.json:39`, `content/narzedzia.json:43`: linki wewnętrzne też są zapisane bez końcowego ukośnika. Docusaurus zwykle to obsłuży, ale format treści nie jest spójny z kanonicznym adresem.
- `content/wiedza-pasowania.json`: meta description ma 132 znaki. Nie jest błędem krytycznym, ale jest krótszy niż zakres 140 do 158 przyjęty dla nowego narzędzia.
- `src/components/KalkulatorPasowan.js:755`: oznaczenie pasowania uprzywilejowanego używa `title` na znaku `★`. To jest słabsze dla czytników ekranu niż jawny tekst ukryty wizualnie albo `aria-label`.
- `src/pages/narzedzia.js:53`: znak SVG na kafelku jest `aria-hidden`, więc nie ma własnego opisu. To jest poprawne, jeśli traktujemy go jako dekorację, ale wtedy cały sens karty musi pozostać w tekście linku. Obecnie jest w H2 i danych, więc nie widzę błędu blokującego.

Elementy bez uwag blokujących:

- `/narzedzia/` ma jeden H1 i logiczne H2 dla kart oraz sekcji.
- `/narzedzia/` ma `CollectionPage` i `ItemList`, generowane z `content/narzedzia.json`.
- `/narzedzia/pasowania/` ma jeden H1 i H2 generowane z treści.
- Rysunki SVG w `KalkulatorPasowan.js` mają `role="img"` i techniczne `aria-label` na głównych wizualizacjach.

## 9. Czego nie zmieniałem

- Nie zmieniałem żadnego pliku React ani CSS.
- Nie zmieniałem `content/blog/` ani `content/wiedza/`.
- Nie dopisywałem nowego narzędzia do `content/narzedzia.json`, bo bez strony `src/pages/narzedzia/pierscienie-osadcze.js` taki link mógłby zostać uznany za broken link przy buildzie.
- Nie dodawałem przekierowań w `docusaurus.config.js`, bo w repozytorium nie ma starego adresu dla tego narzędzia.
