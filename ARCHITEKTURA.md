# poCADuchy: architektura strony

Opis tego, jak strona jest zbudowana i **dlaczego tak**. Sam kod pokazuje „jak";
ten dokument istnieje po to, żeby za pół roku nikt nie cofnął decyzji, nie
znając powodu, dla którego zapadła.

Aktualizowany przy każdej zmianie, która narusza coś opisanego poniżej.
Ostatnia aktualizacja: 3 sierpnia 2026.

---

## 1. Czym jest ta strona

Witryna inżyniera konstruktora Łukasza Cecelona, prowadzącego kanał YouTube
poCADuchy. Trzy zadania, w tej kolejności ważności:

1. **Baza wiedzy dla konstruktorów maszyn.** Artykuły techniczne, docelowo
   tabele norm i kalkulatory. To ta część, która ma przyprowadzać ludzi
   z wyszukiwarki.
2. **Wizytówka zawodowa.** Sekcje o mnie i usługi, sygnały wiarygodności
   dla kogoś, kto rozważa współpracę.
3. **Przedłużenie kanału YouTube.** Lista odcinków, odsyłacze do subskrypcji.

Odbiorca: polski konstruktor, technolog, student mechaniki. Ktoś, kto ma
konkretny problem przy projekcie i szuka konkretnej odpowiedzi.

## 2. Wybory technologiczne i ich powody

| Element | Wybór | Dlaczego |
|---|---|---|
| Generator | Docusaurus 3.10 | Statyczny wynik, React pod spodem, gotowe SEO i sitemap |
| Presety docs i blog | **Wyłączone** | Narzucały własny układ i adresy; strona ma własny design, więc łatwiej napisać strony samodzielnie niż walczyć z motywem |
| Style | CSS Modules + zmienne `--pc-*` | Brak frameworka: strona ma około 10 typów widoków, framework byłby cięższy niż problem |
| Treść | `content/**/*.json` | Łukasz ma edytować teksty bez dotykania kodu |
| Hosting | GitHub Pages | Za darmo, wystarczająco szybko, zero utrzymania |
| CMS | **Brak** | Decap został usunięty 4 sierpnia 2026. Łukasz przysyła materiał, treść trafia na stronę przez pliki JSON, więc panel był warstwą, z której nikt nie korzystał |

### Cena hostingu statycznego

GitHub Pages **nie pozwala ustawiać własnych nagłówków HTTP**. To pojedyncze
ograniczenie tłumaczy kilka decyzji, które inaczej wyglądałyby na niechlujstwo:

- nagłówki bezpieczeństwa idą przez znaczniki `meta`, więc działa tylko ich
  część (patrz punkt 7),
- nie ma kontroli nad czasem życia pamięci podręcznej ani kompresją,
- przekierowanie z `http` na `https` zapewnia sama platforma, po włączeniu
  wymuszania HTTPS w ustawieniach repozytorium.

Wyjście z tego ograniczenia to postawienie przed stroną CDN typu Cloudflare.
Świadomie tego nie zrobiono: koszt konfiguracji jest większy niż zysk przy
obecnym ruchu.

## 3. Jak treść trafia na stronę

```
content/blog/<slug>.json          treść pisana przez Łukasza
        |
        v
scripts/build-content-pages.mjs   generuje src/pages/blog/<slug>.js
        |                          i manifest src/data/blog-posts.json
        v
src/components/BlogArticleTemplate.js
        |
        v
src/components/BlockRenderer.js   bloki -> widoki
```

**Plik z treścią jest jedynym źródłem prawdy.** Strony w `src/pages/blog/`
są generowane i mają w pierwszej linii ostrzeżenie, żeby ich nie edytować.

### Typy bloków

| Typ | Do czego | Uwagi |
|---|---|---|
| `tekst` | akapity, listy, śródtytuły `###` | markdown, linki zewnętrzne dostają `rel="noopener"` automatycznie |
| `obraz` | zdjęcia i schematy | `alt` obowiązkowy, `podpis` opcjonalny, wymiary z manifestu |
| `wideo` | nagrania mp4 | domyślnie zachowuje się jak gif: pętla, bez dźwięku; `petla: false` wymusza kliknięcie |
| `galeria` | siatka miniatur | przyjmuje listę adresów albo obiektów `{src, alt}` |
| `tabela` | zestawienia | markdown GFM; **HTML nie działa**, w tym `<br />` |
| `wzor` | wzory matematyczne | KaTeX |
| `rysunek` | schematy SVG | wstawiany bez sanityzacji, bo pochodzi wyłącznie z repo |

Nowy typ dodaje się **wyłącznie** w `BLOCK_COMPONENTS` w `BlockRenderer.js`.

### Dlaczego bloki, a nie markdown

Markdown byłby prostszy do pisania, ale nie niesie struktury. Blok obrazu wie,
że jest obrazem, więc może dostać wymiary z manifestu, trafić do danych
strukturalnych i wymusić opis alternatywny. Przy markdownie każda taka rzecz
wymagałaby parsowania tekstu.

## 4. Skrypty budujące

Wszystkie odpalają się automatycznie przed `start` i `build`
(`prestart`/`prebuild` w `package.json`), w tej kolejności:

| Skrypt | Co robi | Dlaczego przed buildem |
|---|---|---|
| `fetch-episodes.mjs` | pobiera odcinki z kanału YouTube (RSS) | lista odcinków ma być aktualna bez ręcznej pracy |
| `fetch-subscribers.mjs` | pobiera licznik subskrybentów | jak wyżej |
| `build-image-sizes.mjs` | mierzy obrazy, zapisuje `src/data/image-sizes.json` | wymiary muszą trafić do kodu strony, żeby treść nie przeskakiwała przy ładowaniu |
| `build-content-pages.mjs` | generuje strony artykułów i listy | routing z plików treści |

Po buildzie działa jeszcze `strip-ads-from-404.mjs`: usuwa skrypt reklamowy
ze strony błędu 404. Google zabrania wyświetlania reklam na stronach bez
treści, a 404 taką stroną jest.

Nocny harmonogram w GitHub Actions (`cron` o 4:00) przebudowuje stronę, żeby
odcinki i licznik odświeżały się same.

## 5. Analityka i zgody

Najbardziej wrażliwa część układanki. **Kolejność skryptów w `<head>` jest
krytyczna** i pilnuje jej kolejność wtyczek w `docusaurus.config.js`:

```
1. structuredData        dane strukturalne
2. consentModeDefaults   wszystkie zgody = denied
3. consentStored         odczyt decyzji z localStorage -> ewentualny update
4. googleAnalytics       dopiero teraz GA4
```

Odwrócenie punktów 2 i 4 unieważnia cały mechanizm zgód: GA4 wystartowałby
przed deklaracją i zdążył zapisać pliki cookie. Zdarzyło się to raz w trakcie
prac i zostało wychwycone dopiero na zbudowanym HTML-u, nie w kodzie.

### Dwa niezależne mechanizmy zgody

| Mechanizm | Czego dotyczy | Kiedy działa |
|---|---|---|
| `BanerZgody.js` (własny) | wyłącznie `analytics_storage` | od razu |
| CMP Google (Funding Choices) | zgody reklamowe | dopiero po zatwierdzeniu witryny w AdSense |

Własny baner powstał, bo baner Google nie pokazuje się, dopóki AdSense nie
zatwierdzi witryny, a do tego czasu analityka nie zbierałaby nic. Zgód
reklamowych **nie da się** obsłużyć własnym banerem: Google wymaga
certyfikowanego mechanizmu.

**Decyzja użytkownika siedzi w localStorage, nie w cookie.** Dzięki temu przed
wyrażeniem zgody strona nie zapisuje na urządzeniu żadnego pliku cookie, więc
konstrukcja broni się prawnie sama.

Przycisk wycofania zgody w polityce prywatności otwiera **oba** mechanizmy,
bo z punktu widzenia czytelnika to jedna sprawa.

### Odsłony w aplikacji jednostronicowej

Docusaurus nie przeładowuje strony przy przejściu między zakładkami, więc GA4
policzyłby tylko stronę wejścia. `src/clientModules/analityka.js` zgłasza
odsłonę przy każdej zmianie adresu, **po odrysowaniu strony**: tytuł dokumentu
podmienia się w kolejnej klatce animacji, a nie od razu (znany problem
Docusaurusa, zgłoszenie 7420). Bez tego opóźnienia każda podstrona nosiłaby
w raportach nazwę poprzedniej.

## 6. SEO

- **Dane strukturalne** budowane w trzech miejscach: graf wspólny dla witryny
  w `docusaurus.config.js` (Person, Organization, WebSite), dane artykułu
  w `BlogArticleTemplate.js` (BlogPosting, FAQPage, HowTo), okruszki
  w `Okruszki.js` (BreadcrumbList). Węzły spina wspólny identyfikator
  `https://pocaduchy.pl/#organizacja` i `#lukasz`.
- **`seoTitle`** jest osobnym polem od `title`, bo tytuł artykułu bywa dłuższy
  i mniej dosłowny niż to, czego ktoś szuka w wyszukiwarce. Limit 60 znaków.
- **`static/llms.txt`** opisuje każdy artykuł dla modeli językowych. To nie jest
  standard, ale kosztuje jeden plik, a bywa czytany przez narzędzia AI.
- **Linkowanie krzyżowe** przez pole `related` w plikach treści, z zapasowym
  dopasowaniem po tagach. Nowe artykuły dostają odnośniki także **od** starych,
  ręcznie, bo ruch przychodzi głównie na te starsze.

## 7. Bezpieczeństwo

Co jest ustawione i czego świadomie brakuje:

| Zabezpieczenie | Stan | Uwagi |
|---|---|---|
| HTTPS z przekierowaniem | działa | wymuszone w ustawieniach GitHub Pages |
| `Content-Security-Policy` | częściowo | w `meta` działają `object-src`, `base-uri`, `form-action`, `upgrade-insecure-requests` |
| `Referrer-Policy` | działa | przez `meta` |
| `X-Content-Type-Options` | **brak** | w `meta` nie działa, wymaga nagłówka HTTP |
| `Permissions-Policy` | **brak** | jak wyżej |
| Ochrona przed osadzeniem w ramce | **brak** | `frame-ancestors` nie działa w `meta` |

**CSP celowo nie ogranicza `script-src`, `img-src` ani `frame-src`.** AdSense
ładuje skrypty z wielu domen Google i zmienia je w czasie, więc sztywna lista
prędzej czy później zablokowałaby reklamy. Blokujemy za to klasy ataków, które
z reklamami nie mają nic wspólnego.

`dangerouslySetInnerHTML` występuje w jednym miejscu: blok `rysunek`
w `BlockRenderer.js`. Treść pochodzi wyłącznie z plików w repozytorium,
czyli ze źródła zaufanego. Gdyby kiedykolwiek pojawiła się możliwość dodawania
treści przez kogoś z zewnątrz, ten blok wymaga sanityzacji.

## 8. Zasady pisania treści

Opisane szczegółowo w `CLAUDE.md` i katalogu `styl/`. Trzy najważniejsze:

1. **Zakaz myślnika em dash** w tekstach widocznych na stronie. Łukasz uznaje
   go za marker treści generowanej przez sztuczną inteligencję.
2. **Każdy tekst w plikach `content/*.json`**, nigdy zaszyty w kodzie React.
3. **Techniczna kotwica w każdym tekście.** Jeśli tekst mógłby napisać ktoś,
   kto nigdy nie projektował maszyny, wymaga zawężenia do realiów konstruktora.

## 9. Publikacja

```
edycja -> npm run build (kontrola) -> podgląd -> git commit -> git push
```

Wypchnięcie na `main` uruchamia GitHub Actions, publikacja trwa 2 do 3 minut.
Przy większych zmianach warto oznaczyć punkt wyjścia tagiem, żeby dało się
wycofać.

## 10. Czego tu nie ma i dlaczego

- **Zakładka Wiedza jest pusta.** Szablon widoku istnieje
  (`WiedzaArticleTemplate.js`, listy w `src/pages/wiedza/`), ale katalogu
  `content/wiedza/` jeszcze nie ma, bo nie ma treści. Wymaga rozstrzygnięcia,
  co wolno publikować z norm DIN i ISO. Zapis analizy: `analizy/baza-wiedzy-r*`.
- **Brak testów.** Strona jest statyczna, a najczęstsze błędy (brakujący plik,
  zła ścieżka, zbyt długi tytuł) wychodzą przy budowaniu albo w skryptach
  kontrolnych. Testy jednostkowe komponentów widoku dałyby tu mało.
- **Brak trybu ciemnego.** Przełącznik jest wyłączony, bo strona ma dopracowany
  jeden motyw, a drugi wymagałby przejrzenia wszystkich widoków.
- **Brak panelu do edycji treści.** Decap CMS istniał pod `/admin` i został
  usunięty 4 sierpnia 2026. Model pracy wygląda inaczej: Łukasz przysyła
  materiał, treść trafia do plików JSON, panel był warstwą pośrednią, której
  nikt nie używał.
- **Eksperyment z Next.js i TinaCMS** (edycja wizualna prosto na podglądzie
  strony) żyje wyłącznie na gałęzi **`next-tina`**. Katalog roboczy
  `next-app/` usunięto, bo zawierał już tylko wynik budowania. Gałęzi nie
  kasować: to jedyne miejsce, gdzie ten kod istnieje. Temat wraca dopiero
  przy świadomej zmianie architektury.
