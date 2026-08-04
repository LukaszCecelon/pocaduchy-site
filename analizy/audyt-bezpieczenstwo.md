# Audyt bezpieczeństwa pocaduchy.pl

Data audytu: 2026-08-04.

## Podsumowanie dla właściciela

Strona jest statyczna, nie ma własnego backendu, nie przyjmuje danych przez formularze i nie daje anonimowemu użytkownikowi miejsca do zapisu treści. To mocno ogranicza typowe ryzyka włamania przez formularz, konto użytkownika albo panel administracyjny. Linki zewnętrzne otwierane w nowej karcie są zabezpieczone przed dostępem do poprzedniej karty. W kodzie i w historii głównych plików konfiguracyjnych nie znalazłem haseł, tokenów ani prywatnych kluczy. Najważniejszy realny problem dotyczy prywatności: na produkcji przed kliknięciem zgody zapisuje się cookie Google `FCCDCF`, mimo że tekst polityki mówi, że przed zgodą nie zapisuje się żadne cookie. Drugi praktyczny temat to GitHub Actions: uprawnienia `pages: write` i `id-token: write` są ustawione globalnie, więc dostaje je też job budujący stronę. `npm audit` pokazuje podatności, ale sprawdzone drzewo zależności wskazuje, że są to głównie narzędzia budowania i lokalnego serwera, nie kod wysyłany użytkownikowi do przeglądarki. Obecne CSP w meta daje ograniczoną, ale realną ochronę dla `object-src`, `base-uri`, `form-action` i `upgrade-insecure-requests`; nie zastąpi jednak nagłówków HTTP. Nie widzę pilnego problemu typu krytyczne przejęcie strony, ale prywatność cookies i uprawnienia workflow warto poprawić jako pierwsze.

## Ustalenia

### 1. Cookie Google zapisuje się przed zgodą użytkownika

- **Waga**: średnia
- **Gdzie**: `docusaurus.config.js:65`, `docusaurus.config.js:67`, `content/prawne.json:90`, `src/components/BanerZgody.js:13`
- **Co jest nie tak**: produkcja zapisuje cookie `FCCDCF` na domenie `.pocaduchy.pl` przed kliknięciem zgody. To przeczy zdaniu w polityce prywatności: "dopóki nie wyrazisz zgody, serwis nie zapisuje na Twoim urządzeniu żadnego cookie".
- **Dowód sprawdzenia**:
  - `curl.exe -I https://pocaduchy.pl` potwierdził hosting z GitHub Pages i brak własnych nagłówków cookies w odpowiedzi głównej.
  - Test w czystym profilu Chrome przez Chrome DevTools Protocol, bez klikania banera, po 25 sekundach zwrócił:

```json
{
  "cookieCount": 1,
  "cookies": [
    {
      "name": "FCCDCF",
      "domain": ".pocaduchy.pl",
      "secure": false
    }
  ],
  "evals": {
    "localStorageKeys": "[]"
  }
}
```

  - `dataLayer` w tym samym teście miał domyślne odmowy: `ad_storage`, `ad_user_data`, `ad_personalization` i `analytics_storage` były `denied`, więc własny Consent Mode działał zgodnie z intencją. Cookie pochodzi z warstwy Google, najpewniej Funding Choices uruchamianego przez AdSense. Google opisuje `FCCDCF` jako cookie produktu Funding Choices w informacjach o cookies produktów reklamowych.
- **Dlaczego to ma znaczenie**: technicznie użytkownik dostaje cookie przed decyzją. To jest ryzyko zgodności z deklaracją w polityce prywatności i z oczekiwaniem, że przed zgodą nie ma żadnego zapisu cookie. Nie wygląda to na ryzyko przejęcia strony, ale jest realnym problemem prywatności.
- **Jak naprawić**: wybrać jedną z dwóch dróg:
  - jeśli AdSense i Google CMP mają działać od pierwszego wejścia, zaktualizować politykę prywatności i treść banera tak, aby jawnie mówiły o technicznym cookie Google Funding Choices przed zgodą;
  - jeśli wymóg "zero cookies przed zgodą" jest ważniejszy, nie ładować `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js...` przed decyzją użytkownika albo skonfigurować CMP Google tak, aby nie zapisywał `FCCDCF` przed zgodą. To trzeba przetestować ponownie na produkcji, bo zachowanie jest po stronie Google.
- **Koszt**: mały dla korekty tekstów, średni dla opóźnienia AdSense, bo może wpływać na weryfikację i reklamy.

### 2. Job budujący stronę ma za szerokie uprawnienia GitHub Actions

- **Waga**: średnia
- **Gdzie**: `.github/workflows/deploy.yml:11`, `.github/workflows/deploy.yml:12`, `.github/workflows/deploy.yml:13`, `.github/workflows/deploy.yml:14`, `.github/workflows/deploy.yml:29`, `.github/workflows/deploy.yml:30`
- **Co jest nie tak**: uprawnienia są ustawione globalnie dla całego workflow:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

  Job `build` uruchamia `npm ci` i `npm run build`, więc wykonuje kod z zależności i skryptów projektu. Przy globalnym `id-token: write` kod w jobie budującym może poprosić GitHuba o token OIDC. Do samego budowania wystarczy `contents: read`.
- **Dowód sprawdzenia**: workflow ma tylko zdarzenia `push`, `schedule` i `workflow_dispatch`, nie ma `pull_request`, więc nie znalazłem bezpośredniej ścieżki wykonania kodu z obcego PR. Problem dotyczy zawężenia uprawnień w razie błędu w skryptach, przejętej zależności albo złośliwego commita na `main`.
- **Dlaczego to ma znaczenie**: zasada najmniejszych uprawnień ogranicza skutki kompromitacji zależności lub skryptu builda. Tutaj kompromitowany krok builda ma więcej uprawnień niż potrzebuje.
- **Jak naprawić**: przenieść uprawnienia na poziom jobów:

```yaml
jobs:
  build:
    permissions:
      contents: read
    runs-on: ubuntu-latest
    steps:
      ...

  deploy:
    permissions:
      pages: write
      id-token: write
    needs: build
    runs-on: ubuntu-latest
    steps:
      ...
```

- **Koszt**: mały. Ryzyko regresji niskie, trzeba tylko sprawdzić jeden deploy po zmianie.

### 3. Akcje GitHub Actions są przypięte do tagów głównych, nie do SHA

- **Waga**: niska
- **Gdzie**: `.github/workflows/deploy.yml:24`, `.github/workflows/deploy.yml:25`, `.github/workflows/deploy.yml:31`, `.github/workflows/deploy.yml:32`, `.github/workflows/deploy.yml:44`
- **Co jest nie tak**: workflow używa `actions/checkout@v4`, `actions/setup-node@v4`, `actions/configure-pages@v4`, `actions/upload-pages-artifact@v3` i `actions/deploy-pages@v4`. To oficjalne akcje GitHuba, ale tagi major mogą wskazywać na inny commit w przyszłości.
- **Dowód sprawdzenia**: w `.github/workflows/deploy.yml` nie ma akcji przypiętych pełnym hashem commita. Nie ma też akcji z mało znanych źródeł.
- **Dlaczego to ma znaczenie**: ryzyko jest małe, bo to oficjalne akcje GitHuba, ale pin do SHA zmniejsza powierzchnię supply chain i daje powtarzalność buildów.
- **Jak naprawić**: przypiąć akcje do pełnych SHA commitów i włączyć Dependabot dla GitHub Actions, żeby aktualizacje były jawne w PR.
- **Koszt**: mały. Minusem jest drobna administracja aktualizacjami.

### 4. Blok SVG omija escapowanie Reacta i nie ma walidacji treści

- **Waga**: średnia
- **Gdzie**: `src/components/BlockRenderer.js:62`, `src/components/BlockRenderer.js:68`, `static/admin/config.yml:70`, `static/admin/config.yml:72`
- **Co jest nie tak**: `RysunekBlock` renderuje pole `svg` przez `dangerouslySetInnerHTML`. Pole w CMS jest zwykłym `widget: text`, więc osoba edytująca treść może wkleić dowolny kod SVG. Skan obecnych treści poleceniem `rg -n '"type"\s*:\s*"rysunek"|"svg"\s*:' content src` nie znalazł aktualnie użytych bloków SVG, więc na dzień audytu nie ma potwierdzonej wstrzykniętej treści.
- **Dowód sprawdzenia**: źródłem SVG nie jest użytkownik przeglądający stronę, tylko pliki `content/**/*.json` edytowane lokalnie przez CMS i commitowane do repozytorium. To zaufane źródło organizacyjnie, ale technicznie renderer przyjmie wszystko, co trafi do pola `svg`.
- **Dlaczego to ma znaczenie**: jeśli w przyszłości do pola SVG trafi kod z niepewnego generatora lub zewnętrznego pliku, można ominąć normalne zabezpieczenia Reacta. Przykładowe ryzykowne elementy to event handlery, `foreignObject`, zewnętrzne odwołania lub niechciane linki. Skutek wymaga prawa edycji treści, więc nie jest to podatność dla anonimowego czytelnika.
- **Jak naprawić**: dodać walidację lub sanitizację SVG przed renderowaniem albo w skrypcie generującym strony. Minimalny sensowny wariant to allowlista elementów i atrybutów potrzebnych do rysunków technicznych oraz odrzucanie `script`, `foreignObject`, atrybutów `on*`, `href` do zewnętrznych adresów i stylów z `url(...)`.
- **Koszt**: średni. Trzeba dobrać allowlistę tak, żeby nie zepsuć istniejących i przyszłych rysunków technicznych.

### 5. `npm audit` zgłasza podatności w zależnościach narzędziowych

- **Waga**: niska
- **Gdzie**: `package.json:24`, `package.json:26`, `package-lock.json:7274`, `package-lock.json:8182`, `package-lock.json:8511`, `package-lock.json:9771`, `package-lock.json:15463`, `package-lock.json:18210`, `package-lock.json:18593`, `package-lock.json:19765`, `package-lock.json:20010`
- **Co jest nie tak**: `npm.cmd audit --json` oraz `npm.cmd audit --omit=dev --json` zwróciły 24 zgłoszenia: 4 high i 20 moderate. Pakiety z high to `brace-expansion`, `fast-uri`, `postcss` i `serialize-javascript`. `npm.cmd outdated --json` pokazał też przestarzałe pakiety bez bezpośredniego alarmu bezpieczeństwa, między innymi `react` 19.2.7 do 19.2.8, `react-dom` 19.2.7 do 19.2.8, `katex` 0.16.47 do 0.18.1, `react-markdown` 9.1.0 do 10.1.0, `concurrently` 9.2.4 do 10.0.4 i `decap-server` 3.9.1 do 3.10.0.
- **Dowód sprawdzenia**: `npm.cmd ls brace-expansion fast-uri postcss serialize-javascript uuid sockjs webpack-dev-server copy-webpack-plugin css-minimizer-webpack-plugin --depth=6` pokazał, że:
  - `serialize-javascript`, `copy-webpack-plugin`, `css-minimizer-webpack-plugin` i `postcss` są pod `@docusaurus/bundler`, czyli pracują przy buildzie;
  - `webpack-dev-server`, `sockjs`, `uuid`, `fast-uri` i `brace-expansion` są pod `@docusaurus/core`, głównie dla lokalnego serwera lub obsługi builda;
  - nie znalazłem dowodu, że te konkretne paczki są wysyłane jako runtime JavaScript do przeglądarki czytelnika.
- **Dlaczego to ma znaczenie**: to nie jest potwierdzona podatność użytkownika strony w przeglądarce. To ryzyko dotyczy środowiska budowania, lokalnej edycji i supply chain. Realny skutek wymagałby złośliwego wejścia do narzędzi builda, przejętej zależności, złośliwego commita albo podobnego scenariusza.
- **Jak naprawić**: nie uruchamiać automatycznie `npm audit fix`, bo raport sugeruje dla części Docusaurusa dziwne cofnięcie do `3.5.2`. Bezpieczniej:
  - obserwować wydanie Docusaurus z poprawionymi zależnościami i zaktualizować `@docusaurus/*` razem;
  - wykonać osobny PR aktualizujący małe wersje `react` i `react-dom`;
  - rozważyć aktualizację `react-markdown` i `katex` w osobnym kroku, bo to może zmienić renderowanie treści.
- **Koszt**: mały dla patchy Reacta, średni dla `react-markdown` i `katex`, średni dla Docusaurusa, jeśli zmieni się graf zależności lub build.

### 6. Publiczny panel CMS ładuje zewnętrzny skrypt z pływającą wersją

- **Waga**: niska
- **Gdzie**: `static/admin/index.html:12`, `static/admin/config.yml:13`, `static/admin/config.yml:18`
- **Co jest nie tak**: `/admin/` jest publicznie dostępny na GitHub Pages i ładuje `https://unpkg.com/decap-cms@^3.3.3/dist/decap-cms.js` bez SRI. Konfiguracja używa `local_backend: true`, a komentarz w pliku mówi, że panel ma działać lokalnie z `npx decap-server`.
- **Dowód sprawdzenia**: `curl.exe -I https://pocaduchy.pl/admin/` zwrócił `HTTP/1.1 200 OK`. W `static/admin/config.yml` backend wskazuje repozytorium GitHub, ale bez własnego OAuth gateway nie potwierdziłem anonimowej możliwości zapisu do repozytorium.
- **Dlaczego to ma znaczenie**: to nie wygląda na drogę do przejęcia strony, ale publiczna strona `/admin/` wykonuje zewnętrzny, nieprzypięty skrypt. Gdyby ktoś wszedł w panel, wykonuje kod z CDN i aktualnej wersji pasującej do zakresu `^3.3.3`.
- **Jak naprawić**: jeśli panel ma być wyłącznie lokalny, nie publikować `static/admin/` na produkcji albo zastąpić publiczny `index.html` prostą informacją bez ładowania Decap CMS. Jeśli panel ma zostać publiczny, przypiąć dokładną wersję i dodać SRI, o ile CDN i proces aktualizacji na to pozwalają.
- **Koszt**: mały, jeśli panel nie jest potrzebny na produkcji. Średni, jeśli ma zostać jako realny publiczny panel edycji.

## Czego nie warto robić

- **Nie warto przepisywać hostingu tylko po to, żeby mieć nagłówki HTTP.** `curl.exe -I https://pocaduchy.pl` pokazał odpowiedź z `Server: GitHub.com`, `Access-Control-Allow-Origin: *`, `Cache-Control: max-age=600` i bez `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options` oraz `Permissions-Policy`. Na GitHub Pages nie ma miejsca, w którym ta strona może ustawić własne nagłówki. Cloudflare lub inny CDN przed stroną rozwiązałby to technicznie, ale to jest decyzja infrastrukturalna, nie szybka poprawka w repo.

- **Nie warto dodawać `frame-ancestors` do obecnego meta CSP.** MDN dokumentuje, że `frame-ancestors` nie działa w elemencie `<meta>`. Specyfikacja CSP Level 3 wskazuje też, że w meta nie działają `report-uri`, `frame-ancestors` i `sandbox`. Obecne dyrektywy z `docusaurus.config.js:48-51`, czyli `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` i `upgrade-insecure-requests`, nie są martwe tylko dlatego, że są w meta. Ograniczenie polega na tym, że meta CSP nie zastępuje nagłówka HTTP i nie daje ochrony przed clickjackingiem.

- **Nie warto blokować sztywno `script-src`, `img-src` i `frame-src` listą domen Google bez testu reklam.** Produkcyjny HTML faktycznie ładuje GA4, AdSense i zasoby Google. Przy AdSense lista domen potrafi się zmieniać, więc taka poprawka może zepsuć reklamy, a nie usunąć realnie potwierdzony problem.

- **Nie warto traktować wyników `npm audit` jako podatności w przeglądarce czytelnika.** Sprawdzone ścieżki zależności prowadzą głównie do Docusaurusa, webpacka, PostCSS i lokalnego serwera developerskiego. To trzeba monitorować i aktualizować, ale nie jest to dowód, że użytkownik pocaduchy.pl pobiera podatny kod.

- **Nie warto przerabiać linków z markdowna.** `src/components/BlockRenderer.js:19-25` dodaje `target="_blank"` oraz `rel="noopener noreferrer"` dla linków `http` i `https`. Produkcyjny test artykułu `https://pocaduchy.pl/blog/design-for-maintenance-przezbrojenia` pokazał linki z treści markdown, na przykład do Elesa Ganter i Festo, z `target=_blank rel="noopener noreferrer"`. Skan literalnych `<a target="_blank">` w repo nie znalazł brakującego `noopener`.

- **Nie warto szukać formularzy, których strona publiczna nie ma.** Skan `rg` po `src`, `static`, `content`, `scripts` i `docusaurus.config.js` znalazł tylko odczyt i zapis `localStorage` dla zgody, odczyt `location.search` w module analityki oraz skrypty buildowe pobierające publiczne dane z YouTube. Nie znalazłem formularzy publicznej strony ani zapisu danych użytkownika do backendu.

- **Nie warto usuwać publicznego e-maila i NIP jako "wycieku sekretu".** Skan bieżących plików i historii znalazł `RA-Engineering@outlook.com`, wcześniejsze `kontakt@pocaduchy.pl` oraz NIP w treściach prawnych. To są dane publikowane świadomie w kontakcie, danych strukturalnych i dokumentach prawnych, nie klucze ani tokeny. Skan historii głównych plików konfiguracyjnych nie znalazł haseł, prywatnych kluczy, tokenów GitHuba, kluczy OpenAI, AWS ani `_authToken`.

- **Nie warto zakładać, że pull request z zewnątrz uruchomi deploy.** Workflow nie ma zdarzenia `pull_request`. Kod buduje się na `push` do `main`, harmonogramie i ręcznym `workflow_dispatch`. To nie usuwa sensu zawężenia uprawnień jobów, ale nie znalazłem bezpośredniej ścieżki wstrzyknięcia kodu przez sam PR.

## Użyte źródła zewnętrzne

- MDN, `Content-Security-Policy`: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy
- MDN, `frame-ancestors`: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors
- W3C CSP Level 3, obsługa CSP w meta: https://www.w3.org/TR/CSP3/
- Google, informacje o cookies produktów reklamowych: https://business.safety.google/adscookies/
