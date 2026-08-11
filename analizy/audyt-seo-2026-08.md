# Audyt SEO i widoczności w modelach językowych, sierpień 2026

Stan jest wyraźnie lepszy niż 4 i 6 sierpnia 2026. Witryna ma teraz 48 publicznych adresów, kompletną sitemapę, spójne adresy z ukośnikiem, unikalne metadane, po jednym `h1` oraz statycznie wyrenderowane tabele. Nie znalazłem problemu, który blokowałby indeksowanie całej witryny. Znalazłem natomiast **2 problemy krytyczne, 6 ważnych i 7 drobnych**. Oba problemy krytyczne dotyczą wiarygodnego cytowania liczb przez człowieka lub model: część zastrzeżeń istnieje tylko w podpowiedzi po najechaniu, a trzy nowe zestawy danych inżynierskich nie mają wystarczająco dokładnej, widocznej bibliografii. Kierunek zmian od poprzednich audytów jest zdecydowanie dobry, ale warstwa źródłowa nie nadążyła za szybkim wzrostem liczby tabel.

Data sprawdzenia: 11 sierpnia 2026.

## Jak wykonałem audyt i gdzie są granice oceny

Przed sprawdzeniem przeczytałem `analizy/audyt-seo.md` z 4 sierpnia oraz `analizy/audyt-seo-narzedzia.md` z 6 sierpnia. Następnie zbudowałem witrynę i skanowałem wynikowy katalog `build/`.

Użyłem polecenia:

```powershell
npm.cmd --ignore-scripts run build
```

Polecenie uruchomiło właściwy skrypt `build`, czyli `docusaurus build`, i zakończyło się powodzeniem. Opcja `--ignore-scripts` była konieczna z powodu zakazu zmiany innych plików: pełny cykl `npm run build` uruchamia w `prebuild` pobieranie odcinków i subskrybentów oraz generatory zapisujące dane w `src/`. Audyt korzysta więc z danych już zapisanych w repozytorium. Wybrane strony produkcyjne, produkcyjne `sitemap.xml`, `robots.txt` i `llms.txt` porównałem z buildem. Nie znalazłem rozbieżności treści na sprawdzonych adresach.

Automatyczny skan objął:

- 53 pliki HTML: 48 stron publicznych, 4 strony przekierowujące po stronie klienta i `404.html`;
- tytuły, opisy, canonicale, nagłówki, linki, obrazy i JSON-LD;
- kompletność sitemap oraz osiągalność stron od strony głównej;
- statyczną zawartość tabel i kalkulatorów bez uruchamiania JavaScriptu;
- produkcyjne odpowiedzi HTTP dla adresów z ukośnikiem, bez ukośnika, starych adresów i `/admin`;
- aktualne na dzień audytu dokumentacje właścicieli botów OpenAI, Anthropic, Perplexity, Google i Apple.

Progi 60 znaków dla `title` i 160 znaków dla `description` są w tym raporcie progami ostrzegawczymi, nie twardą regułą Google. Wynik może zostać ucięty albo przepisany zależnie od szerokości znaków, urządzenia i zapytania.

Nie mam dostępu do Google Search Console, Bing Webmaster Tools, logów serwera ani danych terenowych Core Web Vitals. Nie oceniam więc jako faktu:

- czy dwie strony rzeczywiście konkurują o to samo zapytanie;
- które boty faktycznie odwiedziły witrynę;
- jakie są CTR, wyświetlenia, pozycje i stan indeksacji konkretnych adresów;
- jakie są rzeczywiste LCP, CLS i INP u użytkowników.

## Zmiany wobec audytów z 4 i 6 sierpnia

| Ustalenie z poprzedniego audytu | Status dzisiaj | Komentarz |
|---|---|---|
| Canonicale i sitemap wskazywały adresy bez końcowego ukośnika, które robiły 301 | **Naprawione** | Wszystkie 48 publicznych canonicali są samowskazujące, absolutne i kończą się ukośnikiem. Sitemap używa tych samych adresów. Produkcja zwraca 301 z wariantu bez ukośnika do wariantu z ukośnikiem. |
| `/wiedza/` obiecywała bazę wiedzy, ale nie miała artykułów | **Naprawione** | Są cztery strony Wiedzy: jedna o pozycjonowaniu i trzy duże opracowania tablicowe o rowkach, gwintach i chropowatości. Wszystkie są w sitemapie i mają link z huba. |
| Część tytułów bloga nie odpowiadała dobrze intencji wyszukiwania | **Otwarte** | Poprawiono między innymi tytuł OneNote i skrócono wiele tytułów. Nadal słabe są `Pozornie łatwe miejsca w projekcie maszyny` oraz końcówka `część 1` w artykule o projektowaniu wielobryłowym. Bez danych o zapytaniach z Search Console nie da się uczciwie rozstrzygnąć, czy zmiana zwiększy ruch. |
| 13 z 27 tytułów i 12 z 27 opisów przekraczało progi ostrzegawcze | **Naprawione** | Wszystkie konkretne odstępstwa wymienione 4 i 6 sierpnia zostały usunięte. Obecne 2 za długie tytuły i 6 opisów dotyczą nowych stron, głównie odcinków. |
| Na 14 stronach występował przeskok `h1` do `h3` | **Otwarte** | Naprawiono wszystkie 12 artykułów blogowych. Zostały tylko strona główna i `/uslugi/`. |
| Linkowanie bloga było nierówne, a artykuł o umiejętnościach miał jeden link przychodzący | **Naprawione** | Po wyłączeniu nawigacji i stopki artykuł o umiejętnościach ma linki z 5 różnych stron, elektrozawory z 3, a pozornie łatwe miejsca z 3. Nowe słabe punkty dotyczą strony o pozycjonowaniu i stron odcinków. |
| Dwa artykuły z MP4 nie miały `VideoObject` | **Naprawione** | Oba filmy są teraz opisane w JSON-LD. Nowy, osobny błąd dotyczy `VideoObject` na siedmiu stronach odcinków. |
| `/narzedzia/` i kalkulator pasowań miały poprawne meta, canonicale i strukturę | **Naprawione** | Stan został utrzymany po dodaniu trzeciego kafelka. `/narzedzia/` ma `CollectionPage` i `ItemList`, a oba kalkulatory mają `TechArticle` i `FAQPage`. |
| Stary `/wiedza/pasowania/` był przekierowaniem klientowym z kodem 200 | **Pogorszone** | Mechanizm nadal jest kompromisem GitHub Pages, ale takich adresów są już cztery. Wszystkie zwracają 200 z `meta refresh`, zamiast prawdziwego 301. |
| Kalkulator pasowań pokazywał robotowi tylko domyślny wynik `H7/g6` | **Otwarte** | Domyślny wynik nadal jest statyczny, pozostałe wyniki powstają po interakcji. Tak samo działa nowy kalkulator pierścieni. Strony wymiarów przelicznika łagodzą problem przez statyczne tablice przeliczeń. |
| `llms.txt` zawierał strony Narzędzi | **Pogorszone** | Nowe narzędzia i artykuły zostały dodane, lecz plik zawiera nieaktualne zdanie o Wiedzy jako sekcji w budowie, nie obejmuje siedmiu stron odcinków i urósł do 29 119 bajtów. |
| Starsze widoczne teksty pozostawały w komponentach React | **Otwarte** | To nadal kwestia utrzymania treści, a nie bezpośredni błąd SEO. Nie należy jej mieszać z indeksowalnością, bo tekst jest poprawnie renderowany do HTML. |

## Stan bazowy po rozbudowie

### Strony, sitemap, adresy i canonicale

| Kontrola | Wynik |
|---|---:|
| Publiczne adresy kanoniczne | 48 |
| Adresy w `build/sitemap.xml` | 48 |
| Braki w sitemapie | 0 |
| Nadmiarowe lub nieistniejące adresy w sitemapie | 0 |
| Publiczne strony bez canonicala | 0 |
| Publiczne strony z canonicalem innym niż własny adres | 0 |
| Publiczne canonicale bez końcowego ukośnika | 0 |
| Wewnętrzne linki do stron bez końcowego ukośnika | 0 |
| Niedziałające linki wewnętrzne | 0 |
| Strony osierocone | 0 |

Produkcja potwierdza politykę adresów. Przykładowo `/przelicznik` zwraca 301 do `/przelicznik/`, a adres docelowy zwraca 200. Produkcyjna sitemap ma te same 48 adresów co build.

### Nowe strony i metadane

| Grupa | Wynik |
|---|---|
| Hub i sześć stron przelicznika | Wszystkie mają unikalny tytuł, opis, jeden `h1`, samowskazujący canonical i linki między stronami wymiarów. Tytuły mają 39 do 57 znaków, opisy 141 do 148. |
| Cztery strony Wiedzy | Wszystkie mają unikalny tytuł, opis, jeden `h1` i `TechArticle`. Tylko tytuł gwintów ma 61 znaków. |
| Hub i siedem stron odcinków | Każda strona ma unikalny tytuł, opis, jeden `h1`, canonical i statyczny opis filmu. Sześć opisów przekracza 160 znaków. |
| `/narzedzia/` po dodaniu trzeciego kafelka | Tytuł 53 znaki, opis 148 znaków, jedno `h1`, poprawny `CollectionPage` i kompletna lista trzech narzędzi. |

## Nowe ustalenia: SEO klasyczne

### Ważne

#### SEO-1. Siedem stron odcinków ma błędne wartości w `VideoObject`

**Dotyczy:** wszystkich siedmiu adresów pod `/odcinki/`, z wyłączeniem huba.

W `src/components/OdcinekTemplate.js:31` czas jest wpisywany jako tekst widoczny dla człowieka, na przykład `11 min`. W JSON-LD `duration` powinien mieć format ISO 8601. W `src/components/OdcinekTemplate.js:32` pole `contentUrl` wskazuje stronę YouTube `watch?v=...`, a nie bezpośredni plik wideo. Według [dokumentacji Google dla VideoObject](https://developers.google.com/search/docs/appearance/structured-data/video) `contentUrl` ma prowadzić do bajtów pliku, a gdy takiego adresu nie ma, należy podać `embedUrl`. Poprawny `embedUrl` już istnieje.

| Adres | Obecne `duration` | Poprawna wartość |
|---|---:|---:|
| `/odcinki/aplikacja-dla-firmy-bez-programowania/` | `8 min` | `PT8M` |
| `/odcinki/baza-pod-hot-stamping-maly-detal/` | `13 min` | `PT13M` |
| `/odcinki/bazy-na-stole-obrotowym/` | `18 min` | `PT18M` |
| `/odcinki/chwytak-robota-tool-changer/` | `16 min` | `PT16M` |
| `/odcinki/czym-zajmuje-sie-konstruktor/` | `11 min` | `PT11M` |
| `/odcinki/kalibracja-bambulab-h2s/` | `10 min` | `PT10M` |
| `/odcinki/ruchomy-model-robota-ilogic/` | `14 min` | `PT14M` |

**Co zrobić:** oddzielić tekst wyświetlany od wartości schematu, przeliczyć czas na `PT...M`, usunąć `contentUrl` z obiektów YouTube i zostawić `embedUrl`. Nie wpisywać jako `contentUrl` innego adresu strony oglądania.

#### SEO-2. 104 wystąpienia obrazów nie deklarują wymiarów

Skan treści po wyłączeniu nawigacji i stopki znalazł 190 elementów `img`. Każdy ma `alt`, ale 104 wystąpienia z 27 różnych źródeł nie mają kompletu `width` i `height`. Najczęstsze przypadki to:

- `/img/pocaduchy-logo-transparent.png`, 20 wystąpień;
- okładki artykułów na listach i w sekcjach powiązanych;
- siedem miniaturek YouTube `hqdefault.jpg` na stronie odcinków.

Brak wymiarów może powodować przesunięcia układu podczas ładowania, czyli pogorszyć CLS. To ryzyko, nie zmierzony wynik, ponieważ nie mam danych terenowych. Ładowanie jest poza tym ustawione rozsądnie: 168 obrazów ma `loading="lazy"`, 20 `eager`, a 2 nie mają jawnej wartości. Największy lokalny plik rastrowy w buildzie ma około 242 kB, więc sama masa obrazów nie jest obecnie problemem krytycznym.

**Co zrobić:** wykorzystać istniejące dane rozmiarów dla lokalnych obrazów i deklarować rzeczywiste `width` oraz `height`. Dla miniaturek YouTube zachować stałe proporcje 4:3 i zadeklarować wymiary zgodne z pobieranym wariantem. Najpierw poprawić listę bloga, sekcje powiązane, avatar na `/o-mnie/` i hub odcinków.

#### SEO-3. Cztery stare adresy nie wykonują prawdziwego przekierowania HTTP

Produkcja zwraca kod 200 i mały dokument z `meta refresh` dla:

| Stary adres | Cel |
|---|---|
| `/blog/warsztat-zamiast-biura/` | `/o-mnie/` |
| `/wiedza/elementy/` | `/wiedza/` |
| `/wiedza/elementy/pozycjonowanie-czesci-w-maszynie/` | `/wiedza/pozycjonowanie-czesci-w-maszynie/` |
| `/wiedza/pasowania/` | `/narzedzia/pasowania/` |

Canonical wskazuje cel, a starych adresów nie ma w sitemapie ani linkach wewnętrznych. To ogranicza szkodę, ale prawdziwy 301 przekazuje zmianę adresu czytelniej i szybciej.

**Co zrobić:** jeśli przed GitHub Pages pojawi się CDN albo hosting z regułami przekierowań, przenieść te cztery mapowania do warstwy HTTP. Przy samym GitHub Pages zostawić obecny mechanizm, ponieważ usunięcie go byłoby gorsze niż obecny kompromis.

### Drobne

#### SEO-4. Dwa tytuły i sześć opisów przekracza progi ostrzegawcze

Wszystkie 48 publicznych stron mają tytuł i opis. Wszystkie tytuły są unikalne, wszystkie opisy również. Odstępstwa są następujące:

| Typ | Adres | Obecna wartość | Znaki | Propozycja | Znaki |
|---|---|---|---:|---|---:|
| `title` | `/odcinki/czym-zajmuje-sie-konstruktor/` | `Czym zajmuje się konstruktor? Cztery specjalizacje \| poCADuchy` | 62 | `Czym zajmuje się konstruktor? Specjalizacje \| poCADuchy` | 55 |
| `title` | `/wiedza/gwinty-metryczne-tabela/` | `Gwinty metryczne: tabela skoków, kluczy i DIN 931 \| poCADuchy` | 61 | `Gwinty metryczne: skoki, klucze i DIN 931 \| poCADuchy` | 53 |
| `description` | `/odcinki/baza-pod-hot-stamping-maly-detal/` | `Detal bez osi i płaszczyzn symetrii, z rysunkiem klienta, na którym tolerowane są tylko niektóre wymiary. Jak wybierałem powierzchnie bazowe i dlaczego dwa pierwsze pomysły odpadły.` | 181 | `Jak wybrać powierzchnie bazowe dla detalu bez osi symetrii. Trzy warianty bazowania, kryteria odrzucenia i rozwiązanie zastosowane w hot stampingu.` | 147 |
| `description` | `/odcinki/bazy-na-stole-obrotowym/` | `Jak zaprojektowałem bazy na stół obrotowy do hot stampingu: mocowanie na magnesach, złącze obrotowe, identyfikacja baz i pułapka przy łączeniu części spawanych z frezowanymi.` | 174 | `Projekt baz na stół obrotowy do hot stampingu: magnesy, złącze obrotowe, identyfikacja baz i pułapka przy łączeniu części spawanych z frezowanymi.` | 146 |
| `description` | `/odcinki/chwytak-robota-tool-changer/` | `Projekt chwytaka od kiści robota przez adapter i tool changer po ssawki. W środku błąd, który kosztował sporo szukania: czujnik pokazywał próżnię, której nie było.` | 163 | `Projekt chwytaka robota: adapter, tool changer, ssawki oraz błąd czujnika próżni, który utrudnił uruchomienie układu.` | 117 |
| `description` | `/odcinki/czym-zajmuje-sie-konstruktor/` | `Konstruktor produktu, form wtryskowych, maszyn produkcyjnych i konstrukcji stalowych. Czym się różnią, co ich łączy i dlaczego rzeczy wokół nas wyglądają tak, a nie inaczej.` | 173 | `Czym różni się konstruktor produktu, form wtryskowych, maszyn i konstrukcji stalowych. Zakres pracy, wspólne zadania i wymagane kompetencje.` | 140 |
| `description` | `/odcinki/kalibracja-bambulab-h2s/` | `Nitkowanie, gródki na obrysie, wymiar 99,6 zamiast 100 i jakość powierzchni. Co trzeba było ustawić w Bambu Lab H2S, żeby wydruki nadawały się do zastosowań mechanicznych.` | 171 | `Jak skalibrować Bambu Lab H2S: nitkowanie, gródki, skurcz wymiaru i jakość powierzchni w wydrukach do zastosowań mechanicznych.` | 127 |
| `description` | `/odcinki/ruchomy-model-robota-ilogic/` | `Formularz iLogic z suwakami do sterowania osiami robota w Inventorze. Kiedy taki model ma sens, czego potrzebujesz i jak powiązać parametry, żeby nie przeliczać kątów.` | 167 | `Formularz iLogic do sterowania osiami robota w Inventorze: kiedy ruchomy model ma sens i jak powiązać parametry bez ręcznego przeliczania kątów.` | 144 |

**Co zrobić:** zmienić tylko wymienione wartości. Nie skracać pozostałych 40 opisów i 46 tytułów tylko po to, aby osiągnąć jednakową długość.

#### SEO-5. Dwa stare przeskoki w hierarchii nagłówków nadal są otwarte

Każda z 48 stron ma dokładnie jedno `h1`. Nie ma przeskoków na nowych stronach przelicznika, Wiedzy ani odcinków. Zostały:

- `/`: `h1` do `h3`, nagłówek `Czy robot DOSIĘGNIE? Ruchomy model w Autodesk Inventor + iLogic`;
- `/uslugi/`: `h1` do `h3`, nagłówek `Projektowanie`.

**Co zrobić:** użyć `h2` dla tych dwóch pierwszych sekcji albo dodać obejmujące je `h2`. Nie jest to problem blokujący indeksowanie.

#### SEO-6. Nowe klastry nie mają sierot, lecz dwie grupy są słabo podparte kontekstowo

Po pominięciu menu i stopki liczba różnych stron linkujących wygląda tak:

| Strona lub grupa | Różne źródła linku |
|---|---:|
| `/przelicznik/` | 9 |
| Każda z 6 stron wymiarów | 6 |
| Chropowatość | 2 |
| Gwinty | 3 |
| Rowki pod pierścienie | 4 |
| Pozycjonowanie części | 1 |
| Każda z 7 stron odcinków | 1 |

Przelicznik jest spójnym klastrem: hub prowadzi do wymiarów, wymiary do siebie nawzajem, a Wiedza linkuje do odpowiednich zastosowań. Tablica rowków i kalkulator pierścieni są połączone w obie strony. Słabsza jest strona o pozycjonowaniu, do której prowadzi tylko hub Wiedzy. Strony odcinków mają tylko link z archiwum, chociaż same linkują dalej do artykułów i narzędzi.

**Co zrobić:** dodać jeden lub dwa merytoryczne linki do pozycjonowania z artykułów o bazowaniu, montażu lub weryfikacji CAD. Dla odcinków łączyć wyłącznie te strony, które rzeczywiście rozwijają temat artykułu albo narzędzia. Nie tworzyć sztucznej siatki linków między wszystkimi filmami.

#### SEO-7. Strony odcinków mają podwójny `BreadcrumbList`

Na każdej z siedmiu stron odcinka są dwa identyczne zestawy okruszków w JSON-LD. Jeden powstaje w `src/components/OdcinekTemplate.js:39`, drugi w komponencie `Okruszki`. Pierwszy ma `@id`, drugi jest anonimowy. Dane nie są sprzeczne, ale dublują ten sam byt.

**Co zrobić:** pozostawić tylko JSON-LD generowany przez `Okruszki` albo usunąć generowanie danych strukturalnych z tego komponentu na stronach odcinków. Widoczne okruszki zostawić.

#### SEO-8. KaTeX i zewnętrzne fonty blokują pierwszy etap malowania na stronach, które ich nie potrzebują

Największa strona HTML, tablica rowków, ma 72 964 bajty bez kompresji i 20 594 bajty przesłane z produkcji z gzip. Chropowatość ma odpowiednio 49 216 i 15 958 bajtów. To rozsądne rozmiary jak na duże tablice.

Główny plik JavaScript ma 470 846 bajtów bez kompresji i 149 909 bajtów z gzip, a główny CSS 145 911 i 28 776 bajtów. Skrypty własne są ładowane z `defer`, a AdSense z `async`, więc kluczowa treść HTML nie czeka na JavaScript. Renderowanie wizualne czeka jednak na arkusze CSS Google Fonts, własny CSS i globalny arkusz KaTeX z CDN. KaTeX jest dodawany w `docusaurus.config.js:101` do każdej strony, również tam, gdzie nie ma wzorów.

**Co zrobić:** ładować KaTeX tylko na stronach, które zawierają wzory, albo włączyć potrzebny CSS lokalnie do odpowiednich paczek strony. Fonty i AdSense oceniać dopiero po pomiarze Lighthouse lub danych terenowych. Nie da się na podstawie samej masy plików stwierdzić, że Core Web Vitals są złe.

## Kontrola danych strukturalnych

Skan znalazł 120 bloków JSON-LD we wszystkich dokumentach HTML. Wszystkie dały się sparsować, nie było pustych ciągów ani pustych tablic. Na publicznych stronach nie znalazłem odwołania `@id` bez odpowiadającego mu węzła.

| Typ strony | Obecne typy i ocena |
|---|---|
| Cała witryna | `Person`, `Organization`, `WebSite`; wspólne identyfikatory są używane konsekwentnie, z wyjątkiem adresu profilu opisanego dalej. |
| Blog | Hub ma `Blog`; 19 wpisów ma `BlogPosting`, `BreadcrumbList` i widoczne FAQ zgodne z `FAQPage`. Jeden wpis ma `HowTo`. Dwa wpisy z MP4 mają `VideoObject`. |
| Wiedza | Cztery strony mają `TechArticle`; trzy strony z faktycznym FAQ mają `FAQPage`. Treść FAQ jest widoczna i zgodna z JSON-LD. |
| Narzędzia | Hub ma `CollectionPage` i `ItemList`; kalkulatory pasowań i pierścieni mają `TechArticle` oraz `FAQPage`. |
| Przelicznik | Hub ma `WebApplication` i `FAQPage`; sześć stron wymiarów ma `TechArticle` i `FAQPage`. To poprawny rozdział: aplikacja jest na hubie, strony wymiarów są objaśnieniami i tablicami. |
| Odcinki | Hub ma `ItemList` z filmami; strony szczegółowe mają `VideoObject`. Błędy czasu i `contentUrl` oraz podwójne okruszki opisano w SEO-1 i SEO-7. |
| O mnie | `ProfilePage` rozwija globalną encję `Person`; konflikt wariantów adresu opisano w LLM-5. |

Nie należy oczekiwać, że samo `FAQPage` da rozszerzony wynik w Google. Znacznik jest jednak zgodny z widoczną treścią i nie ma powodu usuwać go tylko dlatego, że dany typ wyniku może nie być wyświetlany.

## Treść i ryzyko kanibalizacji

Na podstawie struktury strony nie widzę obecnie poważnej kanibalizacji.

- `/przelicznik/` odpowiada na szerokie zapytanie o przelicznik jednostek, a sześć stron wymiarów na konkretne zapytania o ciśnienie, długość, moment, siłę, temperaturę i moc. Tytuły, `h1`, canonicale oraz statyczne tabele rozróżniają intencję.
- Hub przelicznika renderuje domyślnie ciśnienie i ma pytania o bar, at i atmosferę. To stwarza możliwe nakładanie z `/przelicznik/cisnienie/`, ale nie dowodzi kanibalizacji.
- Artykuł o rowkach służy do czytania i porównywania tablic, a kalkulator pierścieni do uzyskania jednego wyniku. Strony mówią o tym wprost i linkują do siebie.
- Chropowatość odsyła do kalkulatora pasowań tylko w kontekście luzu i wcisku. Nie próbuje być kalkulatorem ISO 286.

Rozstrzygnięcie wymaga w Search Console zestawienia zapytań i stron docelowych, szczególnie dla pary `/przelicznik/` oraz `/przelicznik/cisnienie/`, a także tablicy rowków oraz kalkulatora pierścieni. Bez tych danych nie zalecam zmiany adresów, canonicali ani domyślnego wymiaru przelicznika.

## Nowe ustalenia: widoczność w modelach językowych

### Krytyczne

#### LLM-1. Siedemnaście zastrzeżeń do liczb jest dostępnych tylko przez `title`

W `src/components/BlockRenderer.js:385`, `:396`, `:414` i `:452` gwiazdka jest elementem `abbr`, a wyjaśnienie znajduje się tylko w atrybucie `title`. Człowiek używający myszy może je zobaczyć po najechaniu. Ekstraktor tekstu, czytnik tabel, model lub użytkownik klawiatury może dostać sam znak `*` bez wyjaśnienia.

Dotyczy to 6 pól w tablicach chropowatości i 11 pól w tablicy gwintów. Przykłady informacji, które mogą zniknąć:

- wartość `0,34` jest wynikiem pomiaru ze źródła, a nie granicą możliwości metody;
- jedna górna granica opisuje pełną obwiednię z poradników, a nie typowy wynik;
- M14x1,25 w ISO 261 ma zastrzeżenie dotyczące świec zapłonowych;
- klucze M10, M12, M14 i M22 różnią się między ISO i starym DIN;
- skok 6 mm dla M72 i większych znajduje się w kolumnie skoku zwykłego, ale według ISO 261 jest drobny.

To jest bezpośrednie ryzyko błędnego cytatu: model może powtórzyć liczbę, a pominąć warunek zmieniający jej sens.

**Co zrobić:** nadać przypisom numery i pokazać pełne treści bezpośrednio pod każdą tabelą. Numer w komórce powinien prowadzić do widocznego przypisu przez zwykły link i `aria-describedby`. Powtarzające się zastrzeżenie M72 do M100 może mieć jeden wspólny przypis, ale musi być częścią tekstu HTML, nie tylko dymkiem.

#### LLM-2. Liczby w nowych tablicach nie mają wystarczająco dokładnej, widocznej proweniencji

Strony nazywają normy i producentów, co jest lepsze niż brak źródeł, ale nie pozwala odtworzyć drogi konkretnej liczby:

- chropowatość wymienia SKF, Parker, Timken, THK, Trelleborg, Kemet i innych, lecz nie podaje tytułu dokumentu, wersji, numeru tabeli lub strony ani linku;
- gwinty wymieniają ISO 261, DIN 13, DIN 931, PN-82101, ISO 4032 i DIN 934, ale bez wydania i mapowania kolumn na źródła;
- tablica rowków mówi o DIN 471 i DIN 472, ale nie podaje wydania. W `src/lib/pierscienie/dane.json:794` znajduje się wewnętrzna informacja, że dla `d1 = 9` grubość `s` została zmieniona z 1,00 na 0,80 z powodu sprzeczności w tabeli źródłowej. Ta korekta i jej pochodzenie nie są widoczne na stronie;
- przelicznik definiuje 157 jednostek, w tym jednostki historyczne i anglosaskie, lecz nie ma widocznej listy źródeł współczynników i przyjętych definicji.

W przypadku danych dla konstruktora samo zdanie `według DIN` jest zbyt słabe. Model nie odróżni wartości przepisanej z normy, obliczonej wzorem, zaokrąglonej, poprawionej przez autora i przyjętej jako praktyczny punkt startowy.

**Co zrobić:** na każdej stronie tablicowej dodać widoczną sekcję `Źródła i zakres danych`. Dla każdej grupy kolumn podać oznaczenie i wydanie normy albo dokładny dokument producenta, numer tabeli lub strony i datę dostępu. Rozdzielić etykiety `przepisano`, `obliczono`, `zaokrąglono`, `punkt startowy autora` i `korekta autora`. Dla płatnych norm wystarczy precyzyjny opis źródła, bez kopiowania chronionego dokumentu. Korektę `d1 = 9` trzeba ujawnić osobno wraz z uzasadnieniem i drugim źródłem potwierdzającym, jeśli jest dostępne.

### Ważne

#### LLM-3. `llms.txt` ma poprawny szkielet, ale zawiera nieprawdę i zbyt wiele szczegółów

`static/llms.txt` ma 29 119 bajtów, około 3656 słów i 39 różnych linków do pocaduchy.pl. Ma jeden `h1`, streszczenie w bloku cytatu, sekcje `h2` i listy linków, więc spełnia podstawowy format. Aktualna [propozycja llms.txt v2](https://llmstxt.org/) zaleca jednak krótki przewodnik mieszczący się w kontekście oraz szczegóły za linkami, najlepiej w czystych wersjach Markdown.

Konkretne problemy:

- wiersz 51 opisuje `/wiedza/` jako `sekcja w budowie`, choć istnieją już cztery artykuły;
- wiersz 82 twierdzi, że każdy artykuł najpierw ukazuje się na LinkedIn i pod każdym jest link do oryginału. Nie jest to prawdą dla trzech nowych opracowań tablicowych;
- plik nie podaje daty ostatniej aktualizacji;
- siedem stron odcinków nie jest wymienionych. Dwie strony prawne również nie są wymienione, ale ich brak jest akceptowalny w pliku kuratorskim;
- wieloakapitowe streszczenia bloga przepisują bardzo dużo szczegółów. To zwiększa ryzyko rozjazdu po każdej zmianie strony;
- witryna nie oferuje wersji `.md` stron ani relacji `rel="alternate" type="text/markdown"` i `rel="describedby"`, rekomendowanych w wersji 2 propozycji.

29 kB nie jest rozmiarem, który sam w sobie zaszkodzi nowoczesnemu modelowi. Problemem jest koszt utrzymania, nie kara za liczbę bajtów.

**Co zrobić:** najpierw usunąć dwa nieprawdziwe zdania i dodać `Ostatnia aktualizacja: 2026-08-11`. Skrócić opisy artykułów do dwóch lub trzech zdań zawierających temat, zakres oraz najważniejsze ograniczenie. Strony odcinków dodać do sekcji `Optional` tylko wtedy, gdy mają być osobnymi źródłami cytatu. Następnie rozważyć generowanie czystych wersji Markdown dla stron z tabelami. Nie robić z `llms.txt` drugiej sitemapy ani kopii całej witryny.

#### LLM-4. Część tabel traci jednostkę i znaczenie po wyjęciu z otaczającego tekstu

Nowe zestawienia są prawdziwymi tabelami HTML. Główne tabele generowane z danych mają `thead`, nagłówki `th` i `scope`, a tabele przelicznika rozwijają symbol jednostki nazwą. To bardzo dobry fundament.

Słabe miejsca:

| Strona | Problem ekstrakcji | Konkretna zmiana |
|---|---|---|
| `/wiedza/chropowatosc-powierzchni/` | Cztery tabele zastosowań mają nagłówek `Typowe Ra`, bez `µm`; tabele Markdown nie mają `caption` ani `scope`. | Zmienić na `Typowe Ra [µm]`, dodać podpis opisujący grupę zastosowań i `scope="col"`. |
| `/wiedza/gwinty-metryczne-tabela/` | Nagłówki `Skok gwintu`, `Długość gwintu` i `Klucz` nie niosą jednostki w każdej kolumnie. Informacja, że wszystko jest w milimetrach, znajduje się w tekście i podpisie poza komórkami. | Użyć `Skok zwykły [mm]`, `Skok drobnozwojny [mm]`, `b [mm]` oraz `Klucz [mm]`. |
| `/wiedza/rowki-pod-pierscienie-osadcze-seger/` | Kolumny `d1`, `s`, `d2`, `m`, `t`, `n` wymagają znajomości podpisu pod tabelą. | Dodać jednostkę do każdego nagłówka, na przykład `d2 [mm]`, oraz krótkie rozwinięcie symboli w `caption`. |
| Sześć stron wymiarów przelicznika | Jednostki w nagłówkach są czytelne, ale żadna tabela nie ma `caption`. | Dodać podpis, na przykład `Przeliczenie 1 jednostki ciśnienia na kPa, MPa, GPa, N/mm², bar i mbar`. |

**Co zrobić:** traktować każdą tabelę jak samodzielny wycinek, który może zostać pobrany bez poprzedzającego akapitu. Jednostka, znaczenie symbolu, zakres normy i najważniejsze ograniczenie powinny być w nagłówku lub podpisie tabeli.

#### LLM-5. Autor jest rozpoznawalny, lecz jego encja używa trzech wariantów adresu

Mocne strony są istotne: globalny `Person` ma stały `@id` `https://pocaduchy.pl/#lukasz`, imię i nazwisko, stanowisko, obszary wiedzy oraz `sameAs` do YouTube, LinkedIn i TikTok. `/o-mnie/` dodaje doświadczenie, wykształcenie, certyfikaty, miejsce pracy i widoczny biogram. Artykuły bloga i Wiedzy mają widoczne autorstwo.

Niespójność:

- globalny `Person.url` to `https://pocaduchy.pl`;
- szczegółowy `Person.url` na `/o-mnie/` to `https://pocaduchy.pl/o-mnie`, bez ukośnika;
- `ProfilePage.@id` to `https://pocaduchy.pl/o-mnie#profil`, również bez ukośnika przed `#`;
- canonical strony to `https://pocaduchy.pl/o-mnie/`.

Ponieważ `@id` osoby jest ten sam, graf da się scalić. Pole `url` opisujące osobę jest jednak raz stroną główną, raz wariantem profilu robiącym 301. Na przeliczniku, kalkulatorach i stronach odcinków nazwisko autora nie jest równie wyraźne w widocznym tekście jak na artykułach.

**Co zrobić:** ustalić `https://pocaduchy.pl/o-mnie/` jako jeden adres profilu w obu definicjach, a `ProfilePage.@id` jako `https://pocaduchy.pl/o-mnie/#profil`. Na stronach zawierających własne dane techniczne dodać krótki widoczny blok `Opracowanie: Łukasz Cecelon` z linkiem do profilu oraz odnośnikiem do źródeł i metody. Nie tworzyć drugiej encji autora.

### Drobne

#### LLM-6. Wyniki kalkulatorów są statyczne tylko dla stanu domyślnego

Bez JavaScriptu model otrzymuje:

- w kalkulatorze pasowań wynik `H7/g6` oraz jego dwuwierszową tabelę;
- w kalkulatorze pierścieni jeden domyślny wynik i tabelę czterech parametrów;
- na hubie przelicznika domyślny stan ciśnienia oraz listę wyników dla wszystkich 19 jednostek tego wymiaru;
- na sześciu stronach wymiarów pełne statyczne tablice: 19 wierszy ciśnienia, 13 długości, 8 momentu, 8 siły, 4 temperatury i 7 mocy.

Inne wyniki pasowań, pierścieni i dowolnych wartości przelicznika powstają po interakcji i nie są cytowalne z pierwotnego HTML. To normalne dla kalkulatora i nie należy próbować renderować wszystkich kombinacji.

**Co zrobić:** pozostawić logikę interaktywną, ale dodać po kilka statycznych, opisanych przykładów dla najczęstszych pytań, jeśli dane z Search Console pokażą na nie popyt. Dla pasowań sensowne przykłady to `H7/g6`, `H7/h6`, `H7/p6` i `H8/u8`. Nie generować stron dla każdej pary wejściowej.

#### LLM-7. `robots.txt` wpuszcza wszystkie boty AI, ale deklaracje są częściowo przestarzałe i omijają blokadę `/admin`

Polityka jest bardzo otwarta. `User-agent: *` ma `Allow: /`, więc wszystkie boty, również niewymienione i przyszłe, mogą pobierać publiczną witrynę. Jawnie wymieniono boty wyszukiwawcze, użytkownika, treningowe oraz tokeny kontroli użycia danych.

| Rodzina | Wpuszczane dzisiaj | Sposób |
|---|---|---|
| OpenAI | `OAI-SearchBot`, `GPTBot`, `ChatGPT-User` | Jawne `Allow: /` |
| OpenAI, pozostałe | `OAI-AdsBot` i przyszłe nazwy | Niejawnie przez `User-agent: *` |
| Anthropic | `ClaudeBot`, `Claude-SearchBot` | Jawne `Allow: /` |
| Anthropic, pobranie na żądanie | `Claude-User` | Niejawnie przez `User-agent: *` |
| Perplexity | `PerplexityBot`, `Perplexity-User` | Jawne `Allow: /` |
| Google | `Googlebot`, a użycie danych dla Gemini przez token `Google-Extended` | Jawne `Allow: /` |
| Apple | `Applebot`, a użycie danych treningowych przez token `Applebot-Extended` | Jawne `Allow: /` |
| Pozostałe wymienione | `Bytespider`, `meta-externalagent`, `cohere-ai` | Jawne `Allow: /` |
| Wszystkie pozostałe | każdy agent zgodny z ogólną grupą | Niejawnie przez `User-agent: *` |

Aktualne dokumentacje potwierdzają odrębne role botów [OpenAI](https://developers.openai.com/api/docs/bots), [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers), [Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) i [Apple](https://support.apple.com/en-us/119829). `Google-Extended` i `Applebot-Extended` są tokenami kontroli użycia danych, a nie osobnymi crawlerami pobierającymi strony. Aktualna dokumentacja Anthropic wymienia `ClaudeBot`, `Claude-User` i `Claude-SearchBot`; obecne w pliku `Claude-Web` oraz `anthropic-ai` wyglądają na nazwy historyczne.

Ważny szczegół składni: zgodnie z [interpretacją robots.txt przez Google](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec) grupa dla konkretnego user-agenta nie jest łączona z grupą `*`. W rezultacie jawnie wymienione boty widzą tylko własne `Allow: /` i nie stosują późniejszego `Disallow: /admin`. Niewymienione boty łączą dwie grupy `*` i blokadę stosują. `/admin` zwraca obecnie 404, więc skutek jest mały, lecz komentarz w pliku nie opisuje rzeczywistej polityki dla nazwanych botów.

**Co zrobić:** najpierw zdecydować osobno o wyszukiwaniu i cytowaniu oraz o treningu modeli. Jeżeli intencją pozostaje pełne zezwolenie, najprostszy plik może opierać się na jednej grupie `*` z `Disallow: /admin`, a komentarz może opisywać świadomą decyzję. Jeśli grupy jawne mają zostać, powtórzyć w każdej `Disallow: /admin` i zaktualizować nazwy Anthropic. Pozwolenie w `robots.txt` nie dowodzi, że bot odwiedził stronę. Pobrania inicjowane przez użytkownika, na przykład `ChatGPT-User` i `Perplexity-User`, mogą dodatkowo nie stosować klasycznych reguł tak samo jak automatyczny crawler.

## Statyczny HTML i ekstrahowalność, wyniki szczegółowe

### Co model dostaje bez hydratacji

| Adres | Treść dostępna w pierwotnym HTML |
|---|---|
| `/wiedza/chropowatosc-powierzchni/` | Sześć tabel, tablice Ra i Rz, 55 zastosowań, objaśnienia i FAQ |
| `/wiedza/gwinty-metryczne-tabela/` | Tabela 43 średnic, druga tabela czterech różnic pod klucz, objaśnienia i FAQ |
| `/wiedza/rowki-pod-pierscienie-osadcze-seger/` | 44 wiersze DIN 471, 24 wiersze DIN 472, tabela klas tolerancji, przykład i FAQ |
| `/wiedza/pozycjonowanie-czesci-w-maszynie/` | Pełny tekst sześciu metod, obrazy, PDF i opisy, bez tabeli danych |
| Sześć stron wymiarów przelicznika | Pełne tabele przeliczeń oraz FAQ |
| Kalkulator pasowań | Opis, FAQ i domyślny wynik `H7/g6` |
| Kalkulator pierścieni | Opis, FAQ i domyślny wynik |

Wartości nie są schowane wyłącznie w paczce JavaScript. To jedna z najmocniejszych stron obecnej implementacji. Duże tabele nie powinny być przenoszone do renderowania wyłącznie po stronie klienta.

### Ryzyko przekłamania w miejscach wskazanych do szczególnego sprawdzenia

| Temat | Ocena ryzyka | Dlaczego |
|---|---|---|
| Ra kontra Rz | Niskie | Jest osobny, jednoznaczny nagłówek `Ra to nie Rz i nie ma między nimi przelicznika`, wyjaśnienie ograniczeń reguły 4 do 7 oraz ostrzeżenie, że relacje mogą sięgać 4 do 10. |
| Ra i Rz w dwóch tabelach | Niskie | Tekst mówi wprost, że zestawienia są niezależne, dotyczą tej samej metody, ale nie tej samej próbki. Tego ostrzeżenia nie usuwać ani nie skracać. |
| Wymiary pod klucz w dwóch normach | Niskie do średniego | Różnice M10, M12, M14 i M22 są widoczne w osobnej tabeli. Część gwiazdek w głównej tabeli nadal zależy jednak od `title`. |
| Skok 6 mm powyżej M68 | Średnie | Pełne wyjaśnienie jest widoczne w akapicie. W samym wierszu tabeli model widzi 6 mm w kolumnie zwykłej i gwiazdkę bez treści, więc ekstrakcja samej tabeli może zgubić wyjątek. |
| Korekta `s = 0,80` dla `d1 = 9` w DIN 471 | Wysokie | Korekta i konflikt w źródle istnieją tylko w pliku danych. Strona przedstawia wynik jako zwykłą wartość DIN, bez informacji o ingerencji autora. |
| Zastrzeżenia do granic procesów chropowatości | Wysokie | Sześć uwag rozróżniających pomiar, pełną obwiednię i niepotwierdzoną wartość jest dostępnych tylko po najechaniu. |

### Cytowalność tekstu

Tekst jest na ogół dobrze przygotowany do cytowania. Nagłówki `Jak czytać tabelę`, `Co wpisać na rysunku`, `Skok zwykły kontra drobnozwojny`, `Ra to nie Rz` oraz pytania FAQ odpowiadają na konkretne potrzeby. Wiele akapitów zawiera podmiot, jednostkę i ograniczenie, więc nie wymaga poprzednich trzech sekcji do zrozumienia.

Najlepszym wzorcem jest zdanie, które podaje wartość, warunki i pierwszeństwo dokumentacji producenta w jednym fragmencie. Słabszym wzorcem są zdania typu `jak w tabeli powyżej` oraz same symbole bez rozwinięcia. Przy przyszłych artykułach warto utrzymać zasadę: pierwszy akapit pod nagłówkiem powinien samodzielnie odpowiadać na pytanie, a dopiero kolejne rozwijać tok rozumowania.

## Czego nie robić

- Nie przenosić tabel do `div`, canvasa, obrazka ani renderowania wyłącznie po hydratacji. Obecne prawdziwe tabele HTML są dużą przewagą dla wyszukiwarki, czytnika ekranu i modelu.
- Nie tworzyć osobnej strony dla każdej z 157 jednostek. Bez unikalnego zastosowania i treści powstałaby duża liczba cienkich, konkurujących stron. Obecny podział na hub i sześć mocnych wymiarów jest rozsądny.
- Nie kopiować pełnych tablic ani wszystkich akapitów do `llms.txt`. Plik ma wskazywać źródła i ograniczenia, a nie zastępować strony.
- Nie usuwać widocznych ostrzeżeń o Ra i Rz oraz nie dodawać kalkulatora `Rz = k × Ra`. Taki pozorny skrót zwiększyłby ryzyko błędnej decyzji konstrukcyjnej.
- Nie uznawać atrybutu `title` za wystarczający przypis. Jednocześnie nie usuwać gwiazdek bez zastąpienia ich widocznym objaśnieniem.
- Nie poprawiać pustych `alt=""` na 59 dekoracyjnych miniaturach i obrazach, jeżeli obok znajduje się ten sam tekstowy link. Pusty alt jest tam prawidłowy.
- Nie usuwać `FAQPage` tylko dlatego, że Google nie gwarantuje rozszerzonego wyniku. Dane są zgodne z widocznym FAQ i pomagają opisać strukturę treści.
- Nie zakładać, że zezwolenie botowi treningowemu jest warunkiem cytowania. `GPTBot` i `OAI-SearchBot`, podobnie jak `ClaudeBot` i `Claude-SearchBot`, pełnią różne role. Decyzja o treningu powinna być osobną decyzją właściciela.
- Nie zmieniać canonicala huba przelicznika na stronę ciśnienia ani odwrotnie bez dowodu z Search Console. Obecna architektura rozróżnia szeroką aplikację i szczegółowy wymiar.

## Trzy rzeczy do zrobienia w pierwszej kolejności

### 1. Pokazać wszystkie zastrzeżenia przy liczbach i dopisać jednostki do nagłówków

To najszybciej zmniejszy ryzyko, że model lub konstruktor wyrwie liczbę z warunku, który zmienia jej sens. Obejmuje 17 obecnych podpowiedzi `title`, widoczne przypisy, `caption` oraz jednostki w nagłówkach gwintów, rowków i chropowatości. Jest to ważniejsze niż skracanie metadanych, bo dotyczy poprawności technicznej odpowiedzi.

### 2. Dodać precyzyjne źródła i dziennik pochodzenia danych

Każda tablica powinna pozwalać ustalić, która liczba pochodzi z jakiego wydania normy lub katalogu, która została obliczona, a która poprawiona przez autora. Najpierw należy udokumentować korektę `d1 = 9`, źródła Ra i Rz, różnice kluczy oraz granicę M68. To buduje wiarygodność dla człowieka, wyszukiwarki i modelu jednocześnie.

### 3. Odchudzić i zaktualizować `llms.txt`

Plik jest bezpośrednim przewodnikiem dla agentów, a obecnie podaje dwie nieprawdziwe informacje. Najpierw trzeba poprawić fakty i dodać datę, potem skrócić streszczenia i zdecydować, czy strony odcinków mają trafić do `Optional`. Jest to wyższy priorytet niż rozbudowa o kolejne sekcje, bo błędny przewodnik zwiększa ryzyko błędnej odpowiedzi nawet wtedy, gdy docelowe strony są dobre.

Po tych trzech zadaniach kolejną małą rundą powinny być: poprawa `VideoObject`, prawdziwe 301 przy najbliższej zmianie hostingu, wymiary obrazów oraz dwa przeskoki nagłówków.

## Wniosek końcowy

Rozbudowa nie zepsuła fundamentów SEO. Sitemap, canonicale, trailing slash, `h1`, statyczne renderowanie i linkowanie przelicznika są wykonane dobrze. Największy postęp względem 4 sierpnia to realna baza Wiedzy i narzędzia, które wyszukiwarka oraz model mogą przeczytać bez wykonywania JavaScriptu.

Największa luka nie jest już luką ilościową. Jest nią dowodzenie pochodzenia i warunków liczb. Przy treściach technicznych widoczny przypis, jednostka i konkretne źródło są częścią wartości, a nie dodatkiem redakcyjnym. Dopiero po uporządkowaniu tej warstwy warto zwiększać liczbę kolejnych tablic.
