# Audyt SEO po dodaniu zakładki Narzędzia

Data sprawdzenia: 2026-08-06.

Zakres: cała wygenerowana witryna w `build/`, ze szczególnym naciskiem na `/narzedzia/`, `/narzedzia/pasowania/` i redirect z `/wiedza/pasowania/`.

## Co sprawdziłem i jest dobrze

### Build i indeksowalne adresy

- `npm.cmd run build` przechodzi. Użyłem `npm.cmd`, bo PowerShell blokuje lokalne uruchomienie `npm.ps1`.
- `build/sitemap.xml:1` zawiera:
  - `https://pocaduchy.pl/narzedzia/`,
  - `https://pocaduchy.pl/narzedzia/pasowania/`.
- `build/sitemap.xml:1` nie zawiera `https://pocaduchy.pl/wiedza/pasowania/`, czyli redirect nie trafia do mapy witryny.
- Stary adres występuje tylko w konfiguracji redirectu: `docusaurus.config.js:122`. Nie znalazłem linków do `/wiedza/pasowania` w `content/`, `src/` ani `static/` poza tą konfiguracją.

### Meta nowych stron

Po poprawkach nowe strony mieszczą się w rozsądnych długościach:

| Adres | Title | Długość title | Długość description | Canonical |
|---|---:|---:|---:|---|
| `/narzedzia/` | `Kalkulatory inżynierskie dla konstruktora \| poCADuchy` | 53 | 148 | `https://pocaduchy.pl/narzedzia/` |
| `/narzedzia/pasowania/` | `Kalkulator pasowań ISO: luz i wcisk \| poCADuchy` | 47 | 132 | `https://pocaduchy.pl/narzedzia/pasowania/` |

Źródła: `content/narzedzia.json:4`, `content/narzedzia.json:5`, `content/wiedza-pasowania.json:4`, `content/wiedza-pasowania.json:5`.

### Canonicale i redirect

- `/narzedzia/pasowania/` ma canonical absolutny: `https://pocaduchy.pl/narzedzia/pasowania/`.
- `/narzedzia/` ma canonical absolutny: `https://pocaduchy.pl/narzedzia/`.
- Strona redirectująca `build/wiedza/pasowania/index.html:1` ma canonical wskazujący na nową stronę: `/narzedzia/pasowania/`. To jest canonical relatywny wygenerowany przez `@docusaurus/plugin-client-redirects` na podstawie `docusaurus.config.js:122`.

### Dane strukturalne JSON-LD

- Globalny graf `Person`, `Organization`, `WebSite` jest obecny i nowe strony odwołują się do:
  - `https://pocaduchy.pl/#lukasz`,
  - `https://pocaduchy.pl/#organizacja`,
  - `https://pocaduchy.pl/#strona`.
- `/narzedzia/` ma `CollectionPage` i `ItemList`, a `@id` są sklejone z końcowym ukośnikiem przed hashem:
  - `https://pocaduchy.pl/narzedzia/#kolekcja`,
  - `https://pocaduchy.pl/narzedzia/#lista`.
  Źródło: `src/pages/narzedzia.js:11`, `src/pages/narzedzia.js:21`, `src/pages/narzedzia.js:30`.
- `/narzedzia/pasowania/` ma `TechArticle` i `FAQPage`, również z poprawnym hashem po końcowym ukośniku:
  - `https://pocaduchy.pl/narzedzia/pasowania/#artykul`,
  - `https://pocaduchy.pl/narzedzia/pasowania/#pytania`.
  Źródło: `src/pages/narzedzia/pasowania.js:13`, `src/pages/narzedzia/pasowania.js:43`, `src/pages/narzedzia/pasowania.js:53`.
- `BreadcrumbList` powstaje dla obu nowych stron. Po poprawce ścieżki mają końcowe ukośniki:
  - `/narzedzia/`: `https://pocaduchy.pl/`, `https://pocaduchy.pl/narzedzia/`,
  - `/narzedzia/pasowania/`: `https://pocaduchy.pl/`, `https://pocaduchy.pl/narzedzia/`, `https://pocaduchy.pl/narzedzia/pasowania/`.
  Źródło: `src/components/Okruszki.js:24`, `src/lib/site.js:14`.

### Treść widoczna dla robota

- `build/narzedzia/pasowania/index.html:1` nie jest pusty dla robota. Po usunięciu skryptów i tagów zostaje około 701 słów i 4452 znaki tekstu.
- Treści z `<details>` są w HTML. Są dwa bloki:
  - odchyłki, wymiary graniczne i zapis na rysunku,
  - praktyczne znaczenie pasowania.
- Ważny niuans: SSR pokazuje domyślny stan kalkulatora dla `H7/g6` i tekst statyczny pod kalkulatorem. Robot nie zobaczy natomiast wszystkich wariantów wyników powstających dopiero po interakcji. Konkret do rozważenia jest w sekcji decyzji właściciela.

### Treść strony `/narzedzia/`

- Strona ma naturalne pokrycie fraz: `kalkulator pasowań`, `kalkulatory inżynierskie`, `narzędzia dla konstruktora`, bez upychania słów kluczowych.
- Najważniejszy link do kalkulatora jest w karcie narzędzia: `content/narzedzia.json:11` do `content/narzedzia.json:17`.
- Tekst jest praktyczny i pasuje do tonu autora: narzędzie do użycia w trakcie pracy nad modelem, nie opis marketingowy.

### `robots.txt` i `llms.txt`

- `static/robots.txt:6` i kolejne reguły pozwalają indeksować witrynę.
- `static/robots.txt:62` wskazuje `https://pocaduchy.pl/sitemap.xml`.
- `static/llms.txt:52` ma stronę `/narzedzia`, a `static/llms.txt:57` i `static/llms.txt:59` mają sekcję Narzędzia oraz kalkulator pasowań. To jest spójne z nową strukturą.

### Ograniczenia tekstowe

- W `content/**` i `static/llms.txt` nie znalazłem zakazanego em dash ani fraz: `w dzisiejszych czasach`, `kompleksowe rozwiązania`, `pasjonat`, `oto 5 lekcji`.
- W `src/pages/**` i `docusaurus.config.js` em dash występuje tylko w komentarzach, które spec wyłącza spod tej reguły. Przykłady: `docusaurus.config.js:20`, `src/pages/index.js:25`.

## Co poprawiłem

### Skrócone meta dla nowych stron

Problem: title nowych stron po dodaniu sufiksu `| poCADuchy` przekraczał okolice 60 znaków, a opis kalkulatora miał 172 znaki.

Poprawki:

- `content/narzedzia.json:4`: skrócony title strony zbiorczej do `Kalkulatory inżynierskie dla konstruktora`.
- `content/wiedza-pasowania.json:4`: skrócony title kalkulatora do `Kalkulator pasowań ISO: luz i wcisk`.
- `content/wiedza-pasowania.json:5`: skrócony description kalkulatora do 132 znaków.

### Uporządkowane URL-e w JSON-LD i okruszkach

Problem: nowe `@id` były sklejane jako `/narzedzia#...` i `/narzedzia/pasowania#...`, a okruszki miały URL-e bez końcowego ukośnika. Przy `trailingSlash: true` lepiej trzymać jeden wariant adresów.

Poprawki:

- `src/lib/site.js:14`: dodałem `absolutePageUrl()`, helper do absolutnych adresów stron z końcowym ukośnikiem.
- `src/components/Okruszki.js:24`: `BreadcrumbList` używa teraz `absolutePageUrl()`.
- `src/pages/narzedzia.js:11`, `src/pages/narzedzia.js:21`, `src/pages/narzedzia.js:30`, `src/pages/narzedzia.js:36`: JSON-LD strony zbiorczej używa poprawnych adresów.
- `src/pages/narzedzia/pasowania.js:13`, `src/pages/narzedzia/pasowania.js:43`, `src/pages/narzedzia/pasowania.js:53`: JSON-LD kalkulatora używa poprawnych adresów.

### Widoczne napisy przeniesione do `content/*.json`

Problem: nowe strony miały kilka widocznych napisów zaszytych w React, co łamało ograniczenie ze specyfikacji.

Poprawki:

- `content/nawigacja.json:3`, `content/nawigacja.json:4`: wspólne teksty okruszków przeniesione do JSON.
- `src/components/Okruszki.js:15`, `src/components/Okruszki.js:33`: komponent okruszków czyta teksty z JSON.
- `content/narzedzia.json:28` do `content/narzedzia.json:39`: linki z sekcji `Zobacz też` przeniesione do JSON.
- `src/pages/narzedzia.js:85` do `src/pages/narzedzia.js:93`: strona renderuje linki z JSON.
- `content/wiedza-pasowania.json:125` do `content/wiedza-pasowania.json:156`: FAQ, tabela zastosowań i sekcja `Zobacz też` przeniesione do JSON.
- `src/pages/narzedzia/pasowania.js:54`, `src/pages/narzedzia/pasowania.js:104` do `src/pages/narzedzia/pasowania.js:111`, `src/pages/narzedzia/pasowania.js:131` do `src/pages/narzedzia/pasowania.js:139`: strona kalkulatora renderuje te teksty z JSON.

### Linkowanie wewnętrzne do kalkulatora

Problem: artykuły o tolerancjach i połączeniach nie prowadziły naturalnie do nowego kalkulatora.

Poprawki:

- `content/blog/polaczenie-wal-piasta.json:62`: dodałem link do kalkulatora przy fragmencie o tolerancjach i osadzeniu piasty na wale.
- `content/blog/weryfikacja-cad-przed-produkcja.json:119`: dodałem link do kalkulatora w punkcie checklisty dotyczącym tolerancji na rysunkach.

## Co wymaga decyzji właściciela

### Meta tytuły i opisy poza nową zakładką

Audyt całej witryny pokazuje, że nowe strony są już poprawione, ale część starszych stron nadal ma title albo description poza przyjętym zakresem. Nie zmieniałem ich hurtowo, bo to oznacza przepisywanie istniejących snippetów wielu stron, a zadanie dotyczyło przede wszystkim migracji kalkulatora i zakładki Narzędzia.

| Adres | Problem w buildzie | Źródło do decyzji |
|---|---|---|
| `/` | description 186 znaków | `src/pages/index.js:537` |
| `/404.html` | brak description | `build/404.html:1`, strona generowana przez Docusaurus |
| `/blog/` | title 67 znaków | `src/pages/blog/index.js:35` |
| `/blog/design-for-maintenance-przezbrojenia/` | title 67 znaków | `content/blog/design-for-maintenance-przezbrojenia.json:3` |
| `/blog/dobor-sprzegla-do-aplikacji/` | title 61 znaków | `content/blog/dobor-sprzegla-do-aplikacji.json:3` |
| `/blog/elektrozawory-pneumatyczne-dobor/` | title 62 znaki | `content/blog/elektrozawory-pneumatyczne-dobor.json:3` |
| `/blog/elementy-znormalizowane-handlowki/` | title 66 znaków | `content/blog/elementy-znormalizowane-handlowki.json:3` |
| `/blog/koszty-a-jakosc-w-projektowaniu-maszyn/` | title 65 znaków | `content/blog/koszty-a-jakosc-w-projektowaniu-maszyn.json:3` |
| `/blog/narzedzia-pracy-konstruktora/` | title 64 znaki, description 176 znaków | `content/blog/narzedzia-pracy-konstruktora.json:3`, `content/blog/narzedzia-pracy-konstruktora.json:4` |
| `/blog/onenote-notes-projektu/` | title 65 znaków | `content/blog/onenote-notes-projektu.json:3` |
| `/blog/standaryzacja-w-biurze-konstrukcyjnym/` | title 61 znaków, description 174 znaki | `content/blog/standaryzacja-w-biurze-konstrukcyjnym.json:3`, `content/blog/standaryzacja-w-biurze-konstrukcyjnym.json:4` |
| `/blog/szacowanie-czasu-projektowania/` | description 174 znaki | `content/blog/szacowanie-czasu-projektowania.json:4` |
| `/blog/weryfikacja-cad-przed-produkcja/` | title 62 znaki | `content/blog/weryfikacja-cad-przed-produkcja.json:3` |
| `/o-mnie/` | description 173 znaki | `content/o-mnie.json:5` |
| `/odcinki/` | title 65 znaków, description 181 znaków | `src/pages/odcinki.js:80`, `src/pages/odcinki.js:81` |
| `/polityka-prywatnosci/` | description 183 znaki | `content/prawne.json:22` |
| `/regulamin/` | description 187 znaków | `content/prawne.json:108` |
| `/uslugi/` | title 64 znaki, description 188 znaków | `content/uslugi.json:4`, `content/uslugi.json:5` |
| `/wiedza/` | title 65 znaków, description 171 znaków | `src/pages/wiedza.js:46`, `src/pages/wiedza.js:47` |

Moja rekomendacja: osobna, mała runda na same meta tytuły i opisy. To da się zrobić bez zmian układu, ale warto ocenić każdy snippet ręcznie, bo część tytułów przekracza limit tylko o 1 do 5 znaków.

### Redirect `/wiedza/pasowania/`

`build/wiedza/pasowania/index.html:1` jest stroną redirectującą wygenerowaną przez plugin. Nie ma własnego title ani description, ale ma canonical do `/narzedzia/pasowania/` i nie ma jej w sitemapie.

Decyzja: jeśli ma być idealnie pod roboty, lepszy byłby prawdziwy redirect 301 na poziomie hostingu albo CDN. Przy GitHub Pages i obecnym pluginie klientowy redirect jest praktycznym kompromisem.

### Więcej treści statycznej dla kalkulatora

`build/narzedzia/pasowania/index.html:1` ma treść statyczną i domyślny wynik kalkulatora, więc nie jest pusty. Robot nie zobaczy jednak wyników dla innych pasowań, bo powstają po interakcji.

Konkretny kierunek bez psucia układu: dodać pod tabelą małą, statyczną sekcję w JSON z kilkoma przykładami typu `H7/g6`, `H7/h6`, `H7/p6`, `H8/u8`, każdy z krótkim opisem: charakter pasowania, typowy montaż, typowe miejsce użycia. Wizualnie może to zostać zwykłą tabelą lub blokiem `<details>`, ale treść powinna być w HTML od razu. Źródłowo pasuje to do `content/wiedza-pasowania.json` obok `zastosowania`, a render do `src/pages/narzedzia/pasowania.js`.

### Widoczne napisy w starszych komponentach

Przy okazji audytu nowych stron przeniosłem napisy okruszków i nowe napisy z `/narzedzia/` oraz `/narzedzia/pasowania/` do JSON. W repo nadal istnieją starsze widoczne teksty zaszyte w React poza zakładką Narzędzia, na przykład:

- `src/pages/wiedza.js:46` do `src/pages/wiedza.js:47`,
- `src/pages/blog/index.js:35` do `src/pages/blog/index.js:36`,
- `src/components/BlogArticleTemplate.js:119`, `src/components/BlogArticleTemplate.js:134`, `src/components/BlogArticleTemplate.js:276`, `src/components/BlogArticleTemplate.js:311`.

Decyzja: czy egzekwujemy zasadę `każdy widoczny tekst w content/*.json` tylko dla nowych i edytowanych stron, czy robimy osobny refactor starszych komponentów.

