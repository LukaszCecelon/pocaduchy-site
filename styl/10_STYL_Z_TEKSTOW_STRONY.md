# Styl Łukasza z tekstów strony

Źródło główne: 20 tekstów własnych Łukasza, 19 z `content/blog/*.json` i 1 z `content/wiedza/*.json`.

Zakres ekstrakcji: `title`, `description` jako lead/opis, treść bloków `type: "tekst"` z pola `body`, podpisy obrazów z pola `podpis`. Nie liczyłem FAQ, tabel, wzorów, ścieżek plików, kodu, pól `alt` bez podpisu ani danych z bloków nietekstowych.

Materiał kontrolny: `src/pages/o-mnie.js` i `src/pages/uslugi.js` wskazują na treści importowane z plików JSON, więc nie mieszałem ich z korpusem właściwym. Ten raport opiera się na tekstach z bloga i wiedzy.

## 1. Metryka korpusu

Korpus ma 20 tekstów, 13 870 słów i 1 044 zdania. Okres publikacji: od 2025-07-31 do 2026-08-07.

| Plik | Tytuł | Data | Słowa | Bloki |
| --- | --- | ---: | ---: | ---: |
| `bledy-w-projekcie-konstrukcyjnym.json` | Zrobiłem błąd - co teraz? (🥶😫 vs 💡🤨) | 2025-10-22 | 752 | 15 |
| `design-for-maintenance-przezbrojenia.json` | Design For Maintenance. Jak projektować, żeby łatwo przezbrajać? | 2025-08-26 | 766 | 15 |
| `dobor-sprzegla-do-aplikacji.json` | Jak odpowiednio dobrać sprzęgło do aplikacji? | 2026-08-02 | 552 | 20 |
| `elektrozawory-pneumatyczne-dobor.json` | ELEKTROZAWORY PNEUMATYCZNE - co dobrze jest wiedzieć? | 2025-07-31 | 705 | 23 |
| `elementy-znormalizowane-handlowki.json` | Elementy znormalizowane – czy warto korzystać z gotowych rozwiązań? | 2026-05-10 | 550 | 16 |
| `kick-off-projektu-konstrukcyjnego.json` | Jak zorganizować produktywny KICK-OFF projektu? | 2026-07-05 | 594 | 18 |
| `koszty-a-jakosc-w-projektowaniu-maszyn.json` | Koszty – jak osiągnąć równowagę między budżetem, a jakością? | 2026-05-24 | 610 | 17 |
| `narzedzia-pracy-konstruktora.json` | Narzędzia pracy - co, jak i dlaczego wybrać | 2026-06-07 | 683 | 21 |
| `onenote-notes-projektu.json` | Jak zorganizować OneNote projektu? | 2025-10-02 | 730 | 15 |
| `polaczenie-wal-piasta.json` | Połączenie wał-piasta - przegląd rozwiązań | 2026-01-07 | 1 170 | 19 |
| `pozornie-latwe-miejsca-projektu.json` | [Case study] Pozornie "łatwe" miejsca w projekcie - na co uważać? | 2025-11-26 | 538 | 14 |
| `projektowanie-wielobrylowe-case-study.json` | Projektowanie wielobryłowe - czym to jeść? (Część 2 - Case Study) | 2026-02-12 | 668 | 20 |
| `projektowanie-wielobrylowe-czesc-1.json` | Projektowanie wielobryłowe - czym to jeść? (Część 1) | 2026-02-04 | 490 | 13 |
| `projektowanie-z-niepelnymi-danymi.json` | Jak projektować kiedy masz niepełne dane? | 2025-09-10 | 1 019 | 16 |
| `standaryzacja-w-biurze-konstrukcyjnym.json` | Kopiuj-wklej po inżyniersku (krótko o standaryzacji) | 2026-07-19 | 636 | 19 |
| `szacowanie-czasu-projektowania.json` | Dobrze oszacuj czas projektowania | 2026-06-21 | 495 | 20 |
| `tuleje-taper-lock-dobor.json` | Tuleje Taper Lock / Taper Bush - co warto wiedzieć? | 2025-12-02 | 670 | 17 |
| `umiejetnosci-poczatkujacego-konstruktora.json` | Jakie umiejętności powinien rozwijać początkujący konstruktor? | 2026-01-14 | 954 | 20 |
| `weryfikacja-cad-przed-produkcja.json` | Weryfikacja CAD przed uruchomieniem produkcji | 2026-01-28 | 939 | 20 |
| `pozycjonowanie-czesci-w-maszynie.json` | 6 sposobów pozycjonowania części w budowie maszyn | 2026-08-07 | 349 | 25 |

## 2. Rytm zdania, na liczbach

| Metryka | Wynik | Co z tego wynika dla piszącego |
| --- | ---: | --- |
| Mediana długości zdania | 12 słów | Bazowe zdanie jest krótkie, ale nie telegramowe. Nowy tekst powinien celować w zdania ok. 10-15 słów jako domyślny rytm. |
| Q1-Q3 długości zdania | 7-18 słów | Typowy rozrzut mieści się w jednym oddechu. Akapity mogą mieszać krótkie dopowiedzenia z normalnymi zdaniami objaśniającymi. |
| P10-P90 długości zdania | 3-24 słowa | 80% zdań mieści się między bardzo krótkim hasłem a średnim objaśnieniem. Długie zdania są wyjątkiem, nie bazą. |
| Min-max długości zdania | 1-79 słów | Pojawiają się pojedyncze hasła, nagłówki i długie listy zdaniowe. Przy redakcji trzeba pilnować, żeby długie zdanie miało funkcję techniczną. |
| Zdania krótsze niż 6 słów | 205 z 1 044, 19,6% | Co piąte zdanie jest krótkim zatrzymaniem, pytaniem, hasłem albo pointą. Bez takich zdań tekst zaczyna brzmieć zbyt szkoleniowo. |
| Zdania dłuższe niż 25 słów | 82 z 1 044, 7,9% | Długie zdania są używane do osadzenia kontekstu, listy warunków albo decyzji. Nie powinny dominować. |
| Mediana długości akapitu | 2 zdania | Akapit zwykle ma jedno rozwinięcie po zdaniu głównym. Akapity po 4-5 zdań powinny mieć powód: lista, przykład albo wywód techniczny. |
| Q1-Q3 długości akapitu | 1-3 zdania | Łukasz często zostawia jednozdaniowe akapity. To narzędzie rytmu, nie błąd. |

W praktyce: tekst powinien mieć krótkie bloki, często 1-3 zdania. Jeżeli powstaje akapit na 6 zdań bez listy albo konkretnego przykładu, to zwykle nie brzmi jak ten korpus.

## 3. Otwarcia

### Wszystkie pierwsze zdania

1. "`Podejdź na montaż - problem mamy` `Wpisałeś nie ten kod katalogowy do BOM` `Przewidziałeś za mało czasu na testy` Kto z nas przynajmniej kilka razy nie usłyszał takich albo podobnych zdań." (`bledy-w-projekcie-konstrukcyjnym.json`)
2. "Lata 20." (`design-for-maintenance-przezbrojenia.json`)
3. "Kiedy przechodziłem z „procesówki” do świata „mechaniki ożywionej”, zacząłem dostrzegać wiele dziedzin, w których potrzebowałem się podszkolić 😶‍🌫️." (`dobor-sprzegla-do-aplikacji.json`)
4. "Nie wiem jak Wam, ale do pewnego czasu etap doboru elektrozaworów był czymś, czego bardzo nie lubiłem robić." (`elektrozawory-pneumatyczne-dobor.json`)
5. "Kiedy projektujemy nasze maszyny, często przychodzi nam zaczynać od białej kartki 📝." (`elementy-znormalizowane-handlowki.json`)
6. "*„Zaczynamy nowy projekt!" (`kick-off-projektu-konstrukcyjnego.json`)
7. "Temat z tytułu tego artykułu przewija się moim zdaniem przez większość czasu naszej pracy." (`koszty-a-jakosc-w-projektowaniu-maszyn.json`)
8. "Otwierając w 2021 roku swoją firmę, która świadczy usługi inżynierskie, tak naprawdę sam musiałem od przysłowiowego zera wybrać, wycenić i kupić wszystko, czego potrzebowałem do pracy jako konstruktor." (`narzedzia-pracy-konstruktora.json`)
9. "Od dłuższego czasu w moich postach i Waszych komentarzach przewijał się temat prowadzenia Notesu Projektu." (`onenote-notes-projektu.json`)
10. "Po ostatnim artykule na temat tulei Taper Lock, zrozumiałem że temat osadzania piast na wałkach jest o wiele bardziej rozbudowany niż mogłoby się wydawać." (`polaczenie-wal-piasta.json`)
11. "W projektowaniu maszyn spotykamy się z wieloma wyzwaniami - szczególnie konstruując urządzenia `szyte na miarę`." (`pozornie-latwe-miejsca-projektu.json`)
12. "Mam nadzieję, że przynajmniej część z Was czekała na konkretne Case Study o projektowaniu w oparciu o modele wielobryłowe 🙃." (`projektowanie-wielobrylowe-case-study.json`)
13. "Dla początkujących użytkowników CAD hasło kojarzy się w większości z importowanymi modelami 3D, dla średniozaawansowanych - z czymś nie do końca użytecznym." (`projektowanie-wielobrylowe-czesc-1.json`)
14. "Nowy projekt, spotkanie kick-off, ustalony harmonogram..." (`projektowanie-z-niepelnymi-danymi.json`)
15. "Przy projektach „szytych na miarę” bardzo często jako konstruktorzy zaczynamy od tzw." (`standaryzacja-w-biurze-konstrukcyjnym.json`)
16. "Masz spotkanie kick-off i pada pytanie: ile czasu zajmie koncepcja, ile projekt szczegółowy, a ile dokumentacja?" (`szacowanie-czasu-projektowania.json`)
17. "Wiele razy pisałem w moich materiałach o potrzebie szukania standardowych rozwiązań przy projektowaniu maszyn." (`tuleje-taper-lock-dobor.json`)
18. "Całkiem niedawno, bo jakieś 10 lat temu (tak..." (`umiejetnosci-poczatkujacego-konstruktora.json`)
19. "Gdzieś kiedyś przeczytałem, że dopóki projekt jest jeszcze w CAD, każdy błąd jest o rzędy wielkości tańszy i mniej czasochłonny do poprawy niż kiedy pojawia się na hali." (`weryfikacja-cad-przed-produkcja.json`)
20. "6 rozwiązań z praktycznymi przykładami." (`pozycjonowanie-czesci-w-maszynie.json`)

### Powtarzalne chwyty

| Chwyt | Liczba | Pliki | Wniosek |
| --- | ---: | --- | --- |
| Osobista historia albo przyznanie ograniczenia | 7 | `dobor-sprzegla-do-aplikacji.json`, `elektrozawory-pneumatyczne-dobor.json`, `narzedzia-pracy-konstruktora.json`, `onenote-notes-projektu.json`, `polaczenie-wal-piasta.json`, `tuleje-taper-lock-dobor.json`, `umiejetnosci-poczatkujacego-konstruktora.json` | Dobry start często mówi: sam przez to przeszedłem, czegoś nie wiedziałem, coś zrozumiałem. |
| Szeroka obserwacja branżowa osadzona w pracy konstruktora | 6 | `design-for-maintenance-przezbrojenia.json`, `elementy-znormalizowane-handlowki.json`, `koszty-a-jakosc-w-projektowaniu-maszyn.json`, `pozornie-latwe-miejsca-projektu.json`, `projektowanie-wielobrylowe-czesc-1.json`, `standaryzacja-w-biurze-konstrukcyjnym.json` | Nie zaczyna od teorii, tylko od sytuacji znanej konstruktorowi. |
| Scena problemowa z projektu, montażu albo spotkania | 5 | `bledy-w-projekcie-konstrukcyjnym.json`, `kick-off-projektu-konstrukcyjnego.json`, `projektowanie-z-niepelnymi-danymi.json`, `szacowanie-czasu-projektowania.json`, `weryfikacja-cad-przed-produkcja.json` | Najmocniejsze otwarcia od razu pokazują napięcie: montaż, brak danych, koszt błędu, pytanie o czas. |
| Obietnica konkretu | 2 | `projektowanie-wielobrylowe-case-study.json`, `pozycjonowanie-czesci-w-maszynie.json` | W bazie wiedzy start może być krótszy i bardziej użytkowy. |

## 4. Zakończenia

### Wszystkie ostatnie akapity

1. "Na 100% znalazłoby się jeszcze więcej metod, ale wydaje mi się, że powyższe to taki must have. Oczywiście pracujemy w różnych branżach, więc każdy powinien wybrać taki rodzaj radzenia sobie z pomyłkami, który najbardziej przystaje do jego dziedziny." (`bledy-w-projekcie-konstrukcyjnym.json`)
2. "Jeśli projektujesz dla branż o wysokiej zmienności produkcji, z pewnością zetknąłeś się już z wyzwaniami opisanymi w tym artykule. Osobiście zebrałem tutaj kilka moim zdaniem dobrych praktyk. Oczywiście cały temat projektowania `ELASTYCZNYCH` maszyn jest naprawdę obszerny i ten artykuł nie opisuje wszystkich jego zakamarków." (`design-for-maintenance-przezbrojenia.json`)
3. "Mam nadzieję, że tym artykułem wprowadziłem Was w „świat sprzęgieł”. Tak jak wspominałem na początku, moim celem nie było wymienić wszystkich istniejących elementów tego typu - chciałem skupić się na praktycznym podejściu. Jeśli macie uwagi do tego, co napisałem, albo własne doświadczenia z doborem sprzęgieł - bardzo cenię sobie taki feedback. 💭" (`dobor-sprzegla-do-aplikacji.json`)
4. "Mam nadzieję, że tym tekstem chociaż w pewnym stopniu rozjaśniłem Wam, jak zabrać się za temat elektrozaworów. Nie jest to łatwe, ale moim zdaniem dla dobrego konstruktora - niezbędne. 💡⚡" (`elektrozawory-pneumatyczne-dobor.json`)
5. "Podziel się w komentarzu, które elementy znormalizowane pomogły Ci ostatnio przyspieszyć projekt i jakie masz własne triki na szybką integrację gotowych podzespołów! 😊" (`elementy-znormalizowane-handlowki.json`)
6. "Wdrażasz kick-offy u siebie w dziale i coś nie chce zaskoczyć? Napisz - chętnie podpowiem, co u mnie zadziałało, a co okazało się ślepą uliczką. Kontakt znajdziesz w zakładce Usługi." (`kick-off-projektu-konstrukcyjnego.json`)
7. "Mam nadzieję, że tym artykułem poruszyłem ważną kwestię. Jeśli masz własne doświadczenia z szukaniem tej równowagi - albo przykład oszczędności, która okazała się kosztowna - daj znać. Chętnie o tym podyskutuję. 🗯️" (`koszty-a-jakosc-w-projektowaniu-maszyn.json`)
8. "Mam nadzieję, że ten krótki artykuł pomoże Wam odpowiednio wybrać narzędzia swojej pracy. A jeśli masz w swoim zestawie coś, czego tu zabrakło, albo zakup, którego żałujesz - koniecznie daj znać." (`narzedzia-pracy-konstruktora.json`)
9. "Z elektronicznego Notesu Projektu korzystam już pewnie z 7 lat. Czy uważam, że jest to najlepsze rozwiązanie na świecie? Nie. Czy myślę, że każdy MUSI tak organizować swoją pracę? Nie. Jednak stwierdziłem, że podzielę się moim podejściem, bo wydaje mi się, że sam OneNote niesie wiele korzyści, jakikolwiek Notes Projektu jest gamechangerem, a ta aplikacja jest u 90% ludzi domyślnie w pakiecie Office. 😉" (`onenote-notes-projektu.json`)
10. "PS. W piątek przygotuję dla Was kompaktową ściągawkę na biurko, którą każdy będzie mógł pobrać 🚀" (`polaczenie-wal-piasta.json`)
11. "Mam nadzieję, że dotarliście do końca artykułu, a jego treść pomoże Wam bardziej krytycznie patrzeć na `łatwe` miejsca w projekcie." (`pozornie-latwe-miejsca-projektu.json`)
12. "Jak widzicie, projektowanie wielobryłowe może mieć realne zastosowanie w naszej codziennej pracy." (`projektowanie-wielobrylowe-case-study.json`)
13. "Polecę jak typowy inżynier: TO ZALEŻY - przeczytaj powyżej i sam zdecyduj (hehe). A tak serio to mam nadzieję, że ta część 1 pomogła Wam zobaczyć główne zalety i wady tego rodzaju projektowania części." (`projektowanie-wielobrylowe-czesc-1.json`)
14. "Mam nadzieję, że cały tekst i metody w nim podane pomogą Wam podnosić poziom swojej pracy i projektować wydajnie, nawet nie mając pełnych danych." (`projektowanie-z-niepelnymi-danymi.json`)
15. "Co sądzicie o tym podejściu? Może u Was standaryzacja jest już „ogarnięta”, a może dopiero zaczynacie? To jeden z tych tematów, w których najwięcej wynosi się z cudzych doświadczeń - dajcie znać, jak wygląda to u Was." (`standaryzacja-w-biurze-konstrukcyjnym.json`)
16. "Jeśli masz własny sposób na estymację - albo projekt, w którym szacunek rozjechał się z rzeczywistością tak, że do dziś to pamiętasz - chętnie posłucham. To temat, w którym najwięcej uczymy się od siebie nawzajem." (`szacowanie-czasu-projektowania.json`)
17. "Stay Tuned!" (`tuleje-taper-lock-dobor.json`)
18. "Stay Tuned!" (`umiejetnosci-poczatkujacego-konstruktora.json`)
19. "To myślę taki zestaw MUST HAVE, który każdy, kto czyta ten artykuł, bardzo łatwo mógłby rozbudować. W piątek będę chciał udostępnić Wam coś praktycznego - do zapisania albo wydrukowania - podobnie jak z osadzaniem piast na wałkach." (`weryfikacja-cad-przed-produkcja.json`)
20. "Same śruby możemy wybrać w katalogu Elesa+Ganter." (`pozycjonowanie-czesci-w-maszynie.json`)

### Typy domknięcia

| Typ zakończenia | Liczba | Proporcja | Co robić przy pisaniu |
| --- | ---: | ---: | --- |
| Wniosek, zastrzeżenie, ograniczenie zakresu | 8 | 40% | Najczęstszy finał: nie wielka puenta, tylko uczciwe domknięcie zakresu. |
| Pytanie, feedback albo dyskusja z czytelnikiem | 7 | 35% | Pytanie działa, kiedy dotyczy konkretnego doświadczenia: sprzęgieł, estymacji, standaryzacji, zakupów. |
| Zapowiedź kolejnego materiału albo ściągawki | 4 | 20% | Dobre, gdy tekst jest częścią serii lub prowadzi do praktycznego dodatku. |
| Puenta inżyniersko-humorystyczna | 1 | 5% | Rzadkie. Działa, bo jest osadzone w temacie, nie jako żart dla żartu. |

Wniosek: dokument `02` mówi, żeby kończyć konkretnym pytaniem do branży, ale w korpusie właściwym tylko 7 z 20 zakończeń ma taki charakter. Bardziej typowe jest domknięcie ostrożnym wnioskiem albo wskazaniem ograniczeń.

## 5. Słownik własny

### Słownictwo techniczne

| Słowo lub zwrot | Liczba | Cytat |
| --- | ---: | --- |
| projekt, projektowanie i formy pokrewne | 191 | "Tak naprawdę koszt projektowania jest jednym z większych przy ofertowaniu danej instalacji" (`szacowanie-czasu-projektowania.json`) |
| konstruktor i formy pokrewne | 53 | "Myślę, że niejeden konstruktor też zderza się z tym zagadnieniem" (`elektrozawory-pneumatyczne-dobor.json`) |
| wał i formy pokrewne | 57 | "sprzęgło to element budowy maszyn zapewniający połączenie dwóch niezależnych wałów" (`dobor-sprzegla-do-aplikacji.json`) |
| części | 45 | "Najpopularniejszy sposób pozycjonowania dwóch lub więcej skręcanych ze sobą części." (`pozycjonowanie-czesci-w-maszynie.json`) |
| moduł i formy pokrewne | 40 | "Wymiana całych modułów - jeśli chcesz, żeby przezbrojenie Twojej maszyny mierzone było w minutach" (`design-for-maintenance-przezbrojenia.json`) |
| otwór i formy pokrewne | 39 | "Dzięki temu łatwiej zauważysz niepasujące otwory." (`bledy-w-projekcie-konstrukcyjnym.json`) |
| piasta i formy pokrewne | 36 | "Co do budowy - składa się ono z 2 osobnych piast" (`dobor-sprzegla-do-aplikacji.json`) |
| sprzęgło i formy pokrewne | 34 | "Jedną z nich był dobór sprzęgła do danej aplikacji." (`dobor-sprzegla-do-aplikacji.json`) |
| montaż i formy pokrewne | 34 | "`Podejdź na montaż - problem mamy`" (`bledy-w-projekcie-konstrukcyjnym.json`) |
| CAD i formy pokrewne | 29 | "Korzystaj z narzędzi do analizy kolizji w programach CAD." (`bledy-w-projekcie-konstrukcyjnym.json`) |
| handlówki i formy pokrewne | 25 | "Przejrzyj ostatecznie BOM - złożenie po złożeniu, zweryfikuj kody katalogowe `handlówek`." (`bledy-w-projekcie-konstrukcyjnym.json`) |
| elektrozawór i formy pokrewne | 23 | "etap doboru elektrozaworów był czymś, czego bardzo nie lubiłem robić." (`elektrozawory-pneumatyczne-dobor.json`) |
| produkcja i formy pokrewne | 20 | "ograniczyć ryzyko problemów przed produkcją." (`bledy-w-projekcie-konstrukcyjnym.json`) |
| 3D | 19 | "Uruchamiaj produkcję TYLKO gdy masz KOMPLETNY model 3D." (`bledy-w-projekcie-konstrukcyjnym.json`) |
| złożenie i formy pokrewne | 19 | "wykonaj jedno z wielu takich samych złożeń fizycznie." (`bledy-w-projekcie-konstrukcyjnym.json`) |
| dokumentacja i formy pokrewne | 8 | "dokumentacja, które realnie skracają przezbrojenia maszyny." (`design-for-maintenance-przezbrojenia.json`) |
| BOM | 6 | "`Wpisałeś nie ten kod katalogowy do BOM`" (`bledy-w-projekcie-konstrukcyjnym.json`) |
| tolerancja i formy pokrewne | 5 | "Warto zwrócić tutaj uwagę na niedokładności obróbkowe oraz potencjalne pomyłki (tolerancje) w dokumentacji wykonawczej." (`polaczenie-wal-piasta.json`) |

### Słownictwo warsztatowe i potoczne

| Słowo lub zwrot | Liczba | Cytat |
| --- | ---: | --- |
| warto | 35 | "Jednak moim zdaniem warto pochylić się chwilę nad tym tematem" (`bledy-w-projekcie-konstrukcyjnym.json`) |
| coś | 32 | "To ma być coś, co każdemu z Was pomoże dokonać odpowiedniego wyboru" (`polaczenie-wal-piasta.json`) |
| temat | 24 | "ten temat stał się na tyle ważny, że postanowiłem usystematyzować sobie tę wiedzę." (`elektrozawory-pneumatyczne-dobor.json`) |
| tak naprawdę | 14 | "Tak naprawdę nasza praca jest bardzo obciążona potencjalnymi błędami" (`bledy-w-projekcie-konstrukcyjnym.json`) |
| moim zdaniem | 15 | "Jednak moim zdaniem warto pochylić się chwilę nad tym tematem" (`bledy-w-projekcie-konstrukcyjnym.json`) |
| po prostu | 7 | "Ten czas oczywiście będzie różnił się dla danej maszyny, ale miej go po prostu na uwadze." (`design-for-maintenance-przezbrojenia.json`) |
| w zasadzie | 2 | "W zasadzie ogranicza nas tutaj tylko sztywność wałka i technologia wykonania." (`polaczenie-wal-piasta.json`) |
| ogarniać i formy pokrewne | 3 | "nadal staram się je ogarniać na początku możliwie szybko" (`pozornie-latwe-miejsca-projektu.json`) |
| przeorane | 1 | "macie naprawdę `przeorane` tematy" (`bledy-w-projekcie-konstrukcyjnym.json`) |
| gamechanger | 1 | "jakikolwiek Notes Projektu jest gamechangerem" (`onenote-notes-projektu.json`) |
| ślepa uliczka | 1 | "co u mnie zadziałało, a co okazało się ślepą uliczką." (`kick-off-projektu-konstrukcyjnego.json`) |
| debugging | 1 | "lepiej zrobić `debugging` na pierwszej sztuce." (`bledy-w-projekcie-konstrukcyjnym.json`) |
| faulami | 1 | "może uratować projekt przed wieloma faulami." (`bledy-w-projekcie-konstrukcyjnym.json`) |
| drobnostek | 1 | "wracam do `drobnostek`." (`pozornie-latwe-miejsca-projektu.json`) |

### Czasowniki zamiast neutralnych

| Czasownik | Liczba | Co zastępuje | Cytat |
| --- | ---: | --- | --- |
| wyciągać | 9 | analizować, podsumować | "mogłem wyciągnąć wnioski" (`narzedzia-pracy-konstruktora.json`) |
| wypracować | 8 | przygotować, ustalić | "takich, które sam wypracowałem." (`bledy-w-projekcie-konstrukcyjnym.json`) |
| zderzać się | 8 | napotkać problem | "niejeden konstruktor też zderza się z tym zagadnieniem" (`elektrozawory-pneumatyczne-dobor.json`) |
| wrzucać | 5 | dodawać, umieszczać | "wrzucić do bazy wiedzy." (`bledy-w-projekcie-konstrukcyjnym.json`) |
| rozłożyć | 3 | zaplanować, podzielić | "Pozwoli to odpowiednio rozłożyć siły na początku." (`kick-off-projektu-konstrukcyjnego.json`) |
| odhaczać | 3 | zamykać punkty, śledzić status | "w miarę `odhaczania` punktów z listy niewiadomych" (`projektowanie-z-niepelnymi-danymi.json`) |
| ogarniać | 3 | opracować, doprowadzić | "staram się je ogarniać na początku możliwie szybko" (`pozornie-latwe-miejsca-projektu.json`) |
| uczulić | 1 | poinformować, ostrzec | "uczulcie monterów na sposób montażu tulei i koła." (`tuleje-taper-lock-dobor.json`) |
| złapać | 1 | zatrzymać się, przerwać pęd | "Złap oddech, przejrzyj go" (`bledy-w-projekcie-konstrukcyjnym.json`) |
| wypuszczać | 1 | przekazać do kolejnego etapu | "co trzeba sprawdzić przed `wypuszczeniem BOM`" (`weryfikacja-cad-przed-produkcja.json`) |

## 6. Osoba i dystans

Zliczenia są wskaźnikowe, oparte na jawnych zaimkach i typowych formach, nie na pełnym parserze fleksyjnym. Wyniki: pierwsza osoba liczby pojedynczej 142 wskazania, zwrot do czytelnika przez ty 228 wskazań, konstrukcje bezosobowe 88 wskazań.

| Tryb | Liczba | Typowe konstrukcje | Wniosek |
| --- | ---: | --- | --- |
| Pierwsza osoba liczby pojedynczej | 142 | "sam musiałem", "chciałem", "korzystam", "zderzam się", "wydaje mi się" | Autor nie ukrywa własnej praktyki. To nie jest neutralny podręcznik, tylko tekst człowieka, który coś sprawdził. |
| Ty i bezpośredni odbiorca | 228 | "Masz spotkanie kick-off", "Jeśli projektujesz", "możesz zacząć", "jeśli masz własny sposób" | Czytelnik jest wciągany w sytuację roboczą, często jako konstruktor lub lider projektu. |
| Bezosobowe i normatywne | 88 | "warto", "trzeba", "można", "da się", "powinno się" | Autor daje zalecenia, ale łagodzi je praktyką i zastrzeżeniami. |

Przykłady pierwszej osoby:

- "Otwierając w 2021 roku swoją firmę, która świadczy usługi inżynierskie, tak naprawdę sam musiałem od przysłowiowego zera wybrać, wycenić i kupić wszystko" (`narzedzia-pracy-konstruktora.json`)
- "Sam od lat zderzam się z tymi wyzwaniami i oczywiście też poprawiam swoje błędy..." (`weryfikacja-cad-przed-produkcja.json`)
- "Nie wiem jak Wam, ale do pewnego czasu etap doboru elektrozaworów był czymś, czego bardzo nie lubiłem robić." (`elektrozawory-pneumatyczne-dobor.json`)

Przykłady zwrotu do czytelnika:

- "Masz spotkanie kick-off i pada pytanie: ile czasu zajmie koncepcja, ile projekt szczegółowy, a ile dokumentacja?" (`szacowanie-czasu-projektowania.json`)
- "Jeśli projektujesz - pomyłki to coś co zdarza się każdemu." (`bledy-w-projekcie-konstrukcyjnym.json`)
- "Jeśli masz własny sposób na estymację - albo projekt, w którym szacunek rozjechał się z rzeczywistością" (`szacowanie-czasu-projektowania.json`)

Przykłady bezosobowości:

- "Taką bazę trzeba wykorzystywać przy każdym nowym projekcie" (`bledy-w-projekcie-konstrukcyjnym.json`)
- "Tak naprawdę można je wykorzystać w wielu miejscach maszyny" (`elementy-znormalizowane-handlowki.json`)
- "Dobrze wszystkie pomyłki podsumować przy zakończeniu projektu" (`bledy-w-projekcie-konstrukcyjnym.json`)

## 7. Konkret techniczny

| Plik | Kotwica techniczna | Pojawia się w zdaniu |
| --- | --- | ---: |
| `bledy-w-projekcie-konstrukcyjnym.json` | Montaż, błędny kod katalogowy w BOM i za mało czasu na testy jako realne skutki błędu. | 1 |
| `design-for-maintenance-przezbrojenia.json` | Modułowa konstrukcja przezbrojeniowa, kołki bazujące, złącza HARTING i wymiana po odkręceniu 2 śrub. | 9 |
| `dobor-sprzegla-do-aplikacji.json` | Dobór sprzęgła do konkretnej aplikacji po przejściu do automatyzacji i robotyzacji. | 2 |
| `elektrozawory-pneumatyczne-dobor.json` | Elektrozawór jako łącznik między sterownikiem PLC a siłownikiem. | 10 |
| `elementy-znormalizowane-handlowki.json` | Decyzja: projektować od zera czy użyć elementu znormalizowanego. | 4 |
| `kick-off-projektu-konstrukcyjnego.json` | Kick-off jako miejsce ustalenia, co zostało sprzedane i co trzeba skonstruować. | 11 |
| `koszty-a-jakosc-w-projektowaniu-maszyn.json` | Excel z budżetem i szukanie kompromisu między funkcją, estetyką, wydajnością i kosztem. | 3 |
| `narzedzia-pracy-konstruktora.json` | Dobór sprzętu, CAD, narzędzi do zarządzania projektem, prototypowania, pomiarów i bazy wiedzy. | 4 |
| `onenote-notes-projektu.json` | Notes Projektu jako narzędzie organizacji pracy i komunikacji projektowej. | 1 |
| `polaczenie-wal-piasta.json` | Osadzanie piast na wałkach i wybór najpopularniejszych rozwiązań połączeń. | 1 |
| `pozornie-latwe-miejsca-projektu.json` | Pryzmatyczny kształt palców chwytaka, który zawiódł przy uruchomieniu. | 5 |
| `projektowanie-wielobrylowe-case-study.json` | Prototyp bazy na detal, najpierw pod druk 3D, docelowo jako zespół z aluminium i POM-u. | 2 |
| `projektowanie-wielobrylowe-czesc-1.json` | Projektowanie wielobryłowe w CAD jako metoda ograniczania błędów i ułatwiania pracy. | 2 |
| `projektowanie-z-niepelnymi-danymi.json` | Brak layoutu, brak danych detali i odpowiedź klienta: jeszcze nie wiemy. | 2 |
| `standaryzacja-w-biurze-konstrukcyjnym.json` | Gotowe moduły i elementy handlowe jako realna oszczędność roboczogodzin. | 5 |
| `szacowanie-czasu-projektowania.json` | Pytanie z kick-offu: ile zajmie koncepcja, projekt szczegółowy i dokumentacja. | 1 |
| `tuleje-taper-lock-dobor.json` | Przejście od rozwiercania otworu i dłutowania wpustu do tulei Taper Lock. | 3 |
| `umiejetnosci-poczatkujacego-konstruktora.json` | Początkujący konstruktor i lista umiejętności twardych oraz miękkich potrzebnych na starcie. | 9 |
| `weryfikacja-cad-przed-produkcja.json` | Koszt błędu w CAD kontra koszt błędu wykrytego na hali. | 1 |
| `pozycjonowanie-czesci-w-maszynie.json` | Kołki walcowe, otwór H7, głębokość 2 x średnica kołka i fazy na wejściu otworu. | 4 |

Wniosek: 12 z 20 tekstów ma kotwicę techniczną w pierwszych 4 zdaniach. Tylko 3 teksty wchodzą w pełny konkret później niż w zdaniu 8: `design-for-maintenance-przezbrojenia.json`, `elektrozawory-pneumatyczne-dobor.json`, `kick-off-projektu-konstrukcyjnego.json`.

## 8. Humor i dystans do siebie

Poniżej są miejsca, w których humor albo samoograniczenie jest jawne, a nie tylko zasugerowane emoji.

| Mechanizm | Cytat |
| --- | --- |
| Nazwanie błędów bez patosu | "Tak naprawdę nasza praca jest bardzo obciążona potencjalnymi błędami czy niezgodnościami - jak to praca kreatywna." (`bledy-w-projekcie-konstrukcyjnym.json`) |
| Żart w nawiasie do sekcji technicznej | "Jak można unikać ich na etapie projektowania (gratka dla konstruktorów 😎)." (`bledy-w-projekcie-konstrukcyjnym.json`) |
| Luźne zaproszenie po liście praktyk | "Smacznego!" (`bledy-w-projekcie-konstrukcyjnym.json`) |
| Przyznanie braków kompetencyjnych | "zacząłem dostrzegać wiele dziedzin, w których potrzebowałem się podszkolić 😶‍🌫️." (`dobor-sprzegla-do-aplikacji.json`) |
| Autoironia wobec pierwszego doboru | "Stronka NORELEM, 10 rodzajów sprzęgieł i wielka rozkmina, co tu wybrać 🤯." (`dobor-sprzegla-do-aplikacji.json`) |
| Przyznanie niechęci do tematu | "etap doboru elektrozaworów był czymś, czego bardzo nie lubiłem robić." (`elektrozawory-pneumatyczne-dobor.json`) |
| Wspólnotowy żart z trudnych symboli | "Kto nie miał z nimi problemu na starcie, niech pierwszy rzuci kamieniem..." (`elektrozawory-pneumatyczne-dobor.json`) |
| Prowadzący pokaz, lekko teatralny ton | "Proszę Państwa, zapraszam na animację - jak czytać symbol zaworu 5/2!" (`elektrozawory-pneumatyczne-dobor.json`) |
| Przyznanie nietrafionych zakupów | "Nie obyło się oczywiście bez wpadek i nietrafionych zakupów" (`narzedzia-pracy-konstruktora.json`) |
| Krótka samoocena błędu zakupowego | "Naiwność w czystej postaci." (`narzedzia-pracy-konstruktora.json`) |
| Ograniczenie własnej metody | "Czy uważam, że jest to najlepsze rozwiązanie na świecie? Nie. Czy myślę, że każdy MUSI tak organizować swoją pracę? Nie." (`onenote-notes-projektu.json`) |
| Małe rozbrojenie technicznego porównania | "Jeszcze jeden warunek brzegowy hehe" (`polaczenie-wal-piasta.json`) |
| Cytat kolegi jako humor warsztatowy | "taką śrubeczką to można wiatraczek zabawkowy zabezpieczyć 😆." (`polaczenie-wal-piasta.json`) |
| Dialog z samym sobą | "Czyli kiedy projektować wielobryłowo, Łukasz! Powiedz! 😂" (`projektowanie-wielobrylowe-czesc-1.json`) |
| Inżynierska puenta | "Polecę jak typowy inżynier: TO ZALEŻY - przeczytaj powyżej i sam zdecyduj (hehe)." (`projektowanie-wielobrylowe-czesc-1.json`) |
| Dystans do projektu, który nie kończy w szufladzie | "Wrzucam też fotkę po wykonaniu prototypu - żeby nie było, że projekt do szuflady 🙃🙃" (`projektowanie-wielobrylowe-case-study.json`) |
| Żart z własnego wieku | "Całkiem niedawno, bo jakieś 10 lat temu (tak... w tym roku wybija mi trzydziecha 🙃)" (`umiejetnosci-poczatkujacego-konstruktora.json`) |
| Brutalnie szczera samoocena startu | "Co umiałem? Z dzisiejszej perspektywy - prawie nic." (`umiejetnosci-poczatkujacego-konstruktora.json`) |
| Dystans do złego projektowania części | "Jeśli dobrze poznasz te procesy - nie będziesz rysował herezji 🙃." (`umiejetnosci-poczatkujacego-konstruktora.json`) |
| Lekki komentarz do pracy montażu | "i tutaj o zgrozo klucz dynamometryczny jest niezbędny!" (`tuleje-taper-lock-dobor.json`) |
| Przyznanie, że stare nawyki długo trzymają | "nie będziecie czekali ze zmianą podejścia tak długo jak ja 🙃." (`tuleje-taper-lock-dobor.json`) |
| Realistyczne ograniczenie własnej bezbłędności | "poprawiam swoje błędy... Jednak dla mnie najważniejsze jest to, żeby OGRANICZAĆ własne pomyłki - nie do zera, jestem realistą" (`weryfikacja-cad-przed-produkcja.json`) |

Mechanizm humoru: żart idzie w sytuację, proces, własną niewiedzę albo inżynierski stereotyp. Nie ma w korpusie żartów z konkretnych osób, klientów ani zespołów. Nawet kiedy pojawia się "kierownik projektu, który umie tylko zarządzać hehe" (`umiejetnosci-poczatkujacego-konstruktora.json`), to jest żart z roli i komunikacji, nie personalny atak.

## 9. Czego w korpusie nie ma

Wyszukane i zliczone przez skrypt oraz dodatkową normalizację fraz CTA.

| Element | Liczba | Gdzie występuje |
| --- | ---: | --- |
| Wykrzykniki | 26 | W 18 plikach. Najwięcej: `kick-off-projektu-konstrukcyjnego.json` 4, `onenote-notes-projektu.json` 4. |
| Emotki i symbole piktograficzne | 146 | W 18 plikach. Najwięcej: `elementy-znormalizowane-handlowki.json` 28, `bledy-w-projekcie-konstrukcyjnym.json` 15, `onenote-notes-projektu.json` 13. |
| Em dash | 0 | Nie występuje w korpusie. |
| "Drodzy" | 0 | Nie występuje. |
| "Szanowni" | 0 | Nie występuje. |
| "Kochani" | 0 | Nie występuje. |
| "Proszę Państwa" | 1 | "Proszę Państwa, zapraszam na animację - jak czytać symbol zaworu 5/2!" (`elektrozawory-pneumatyczne-dobor.json`) |
| "kompleksowe rozwiązania" | 0 | Nie występuje. |
| "w dzisiejszych czasach" | 0 | Nie występuje. |
| "synergia" | 0 | Nie występuje. |
| "dynamicznie zmieniającym się" | 0 | Nie występuje. |
| "co o tym myślicie" | 0 | Nie występuje. |
| "Co sądzicie" | 1 | "Co sądzicie o tym podejściu?" (`standaryzacja-w-biurze-konstrukcyjnym.json`) |
| "dajcie znać" | 1 | "dajcie znać, jak wygląda to u Was." (`standaryzacja-w-biurze-konstrukcyjnym.json`) |
| "Podziel się" | 1 | "Podziel się w komentarzu..." (`elementy-znormalizowane-handlowki.json`) |
| "Napisz" | 2 | 2 razy w `kick-off-projektu-konstrukcyjnego.json` |
| "Kontakt znajdziesz" | 1 | "Kontakt znajdziesz w zakładce Usługi." (`kick-off-projektu-konstrukcyjnego.json`) |
| "udostępnij" | 0 | Nie występuje. |

Wniosek: korpomowa jest praktycznie wyzerowana, ale CTA jednak występują. Nie są dominujące, lecz nie można mówić, że ich w tekstach strony nie ma.

## 10. Dwadzieścia par "nie tak / tak"

| Nie tak | Tak |
| --- | --- |
| W projektach konstrukcyjnych błędy są naturalnym elementem procesu i warto nimi zarządzać w dojrzały sposób. | "Tak naprawdę nasza praca jest bardzo obciążona potencjalnymi błędami czy niezgodnościami - jak to praca kreatywna." (`bledy-w-projekcie-konstrukcyjnym.json`) |
| Warto korzystać z systematycznej bazy doświadczeń projektowych, aby ograniczać powtarzalność błędów. | "Taką bazę trzeba wykorzystywać przy każdym nowym projekcie, jeśli jest podobny to koniecznie wyciągnąć tę bazę na Kick-Off." (`bledy-w-projekcie-konstrukcyjnym.json`) |
| Modułowa konstrukcja umożliwia znaczące ograniczenie czasu przezbrojeń. | "Wymiana całych modułów - jeśli chcesz, żeby przezbrojenie Twojej maszyny mierzone było w minutach, a nie godzinach, dobrym podejściem będzie modułowa konstrukcja." (`design-for-maintenance-przezbrojenia.json`) |
| Dokumentacja powinna być przygotowana w sposób przystępny i ograniczający liczbę zapytań serwisowych. | "Mamy model 3D, mamy maszynę na żywo - przygotujmy dokumentację tak, aby ograniczyć późniejsze telefony od UR albo być w stanie odesłać klienta do odpowiedniego miejsca w instrukcji w 90% przypadków." (`design-for-maintenance-przezbrojenia.json`) |
| Dobór sprzęgieł może być trudny dla osób zaczynających pracę w automatyzacji. | "Stronka NORELEM, 10 rodzajów sprzęgieł i wielka rozkmina, co tu wybrać 🤯." (`dobor-sprzegla-do-aplikacji.json`) |
| Sprzęgła to standardowe elementy maszyn, których samodzielne projektowanie zazwyczaj nie jest uzasadnione. | "Sprzęgło to zresztą podręcznikowy przykład elementu znormalizowanego, którego nie ma sensu projektować samemu." (`dobor-sprzegla-do-aplikacji.json`) |
| Elektrozawory są niezbędnym elementem układów pneumatycznych sterowanych elektrycznie. | "Ano maszyna, żeby działała tak jak chcemy, MUSI BYĆ STEROWANA, a do tego konieczne są właśnie elektrozawory - to swego rodzaju łącznik między sterownikiem PLC a np siłownikami w maszynie." (`elektrozawory-pneumatyczne-dobor.json`) |
| Symbole elektrozaworów bywają problematyczne dla początkujących konstruktorów. | "Kto nie miał z nimi problemu na starcie, niech pierwszy rzuci kamieniem..." (`elektrozawory-pneumatyczne-dobor.json`) |
| Gotowe komponenty katalogowe pozwalają redukować czas projektowania i koszt wykonania. | "Tak naprawdę można je wykorzystać w wielu miejscach maszyny, oszczędzając czas ⏱️ i środki w budżecie 💰 - czy to na wykonanie części, czy na czas konstruktora 👷." (`elementy-znormalizowane-handlowki.json`) |
| Konstruktor powinien świadomie rozstrzygać, czy projektować element od podstaw, czy użyć standardowego komponentu. | "Projektować czy wziąć handlówkę?" (`elementy-znormalizowane-handlowki.json`) |
| Nowy projekt wymaga odpowiedniego rozpoczęcia oraz spójnego ustalenia założeń technicznych. | "To tam dowiadujemy się, co zostało sprzedane i co trzeba skonstruować." (`kick-off-projektu-konstrukcyjnego.json`) |
| Podczas projektowania należy równoważyć funkcjonalność, estetykę, wydajność i ograniczenia budżetowe. | "Jednak zaraz nasz wzrok kieruje się na Excela z budżetem i zaczynamy zastanawiać się, gdzie szukać kompromisów." (`koszty-a-jakosc-w-projektowaniu-maszyn.json`) |
| Zakup komputera do pracy CAD wyłącznie na podstawie parametrów gamingowych może być nietrafiony. | "Błędne założenie, z którego wyszedłem, było takie: *kupię komputer gamingowy - ma świetne parametry i naprawdę przystępną cenę*." (`narzedzia-pracy-konstruktora.json`) |
| Narzędzie projektowe działa tylko wtedy, gdy zespół faktycznie korzysta z niego w codziennej pracy. | "Jak powszechnie wiadomo, nawet najlepsze narzędzie nie będzie działać - jeśli nie będzie się go używać..." (`onenote-notes-projektu.json`) |
| Połączenia wał-piasta należy dobierać zależnie od kosztu, geometrii, montażu i wymaganej funkcji. | "Każde z tych rozwiązań rozbiłem na 5 `podpunktów`: opis, minimalna średnica wałka i piasty, dedykowane zastosowania, cena i zdjęcie z przykładem." (`polaczenie-wal-piasta.json`) |
| Z pozoru proste moduły mogą generować problemy dopiero podczas uruchomienia maszyny. | "Okazuje się jednak, że te pozornie `łatwe` moduły mogą przy uruchomieniu sprawić nam dużo problemów." (`pozornie-latwe-miejsca-projektu.json`) |
| Projektowanie wielobryłowe ułatwia utrzymanie relacji przestrzennych między współpracującymi elementami. | "Docelowo to złożenie będzie miało pewnie około 7-9 elementów i dzięki temu, że zaprojektowałem je wielobryłowo, bardzo łatwo będzie mi teraz dokonać kolejnych podziałów oraz pilnować wzajemnego położenia części." (`projektowanie-wielobrylowe-case-study.json`) |
| Przy niepełnych danych warto projektować w przybliżonej formie i nie tracić czasu na detale. | "Nie trać czasu na początkowym etapie na docinanie profili, otworowanie, promienie i fazy." (`projektowanie-z-niepelnymi-danymi.json`) |
| Standaryzacja elementów pozwala odzyskać czas i pieniądze w dziale konstrukcyjnym. | "jeśli zaczynamy każdy projekt od zera i nie mamy żadnych gotowych modułów ani wybranych i gotowych do umieszczenia w modelu elementów handlowych, to oddajemy konkurencji dziesiątki roboczogodzin i tysiące złotych." (`standaryzacja-w-biurze-konstrukcyjnym.json`) |
| Błędy wykryte przed produkcją są tańsze niż błędy znalezione na hali. | "Gdzieś kiedyś przeczytałem, że dopóki projekt jest jeszcze w CAD, każdy błąd jest o rzędy wielkości tańszy i mniej czasochłonny do poprawy niż kiedy pojawia się na hali." (`weryfikacja-cad-przed-produkcja.json`) |

## 11. Checklista przed publikacją

1. Czy techniczna kotwica pojawia się najpóźniej w pierwszych 4 zdaniach, a jeśli później, czy wynika to z potrzebnego kontekstu?
2. Czy mediana zdań w roboczym fragmencie jest blisko 10-15 słów, bez serii długich zdań jedno po drugim?
3. Czy co najmniej jeden akapit na początku ma 1-2 zdania?
4. Czy tekst zawiera konkretny obiekt lub decyzję: CAD, BOM, montaż, dokumentację, tolerancję, moduł, wał, piastę, sprzęgło, elektrozawór, koszt, czas albo narzędzie?
5. Czy przynajmniej jedno zdanie opiera się na własnej praktyce: "sam", "u mnie", "moim zdaniem", "z mojego doświadczenia", "kiedy pracowałem", "zderzyłem się"?
6. Czy zalecenia są formułowane przez "warto", "trzeba", "można" albo konkretny tryb rozkazujący, a nie przez korporacyjne hasła?
7. Czy w tekście nie ma fraz: "w dzisiejszych czasach", "kompleksowe rozwiązania", "synergia", "dynamicznie zmieniającym się"?
8. Czy CTA, jeśli występuje, pyta o konkretne doświadczenie techniczne, a nie brzmi tylko "co o tym myślicie"?
9. Czy humor, jeśli występuje, dotyczy sytuacji, procesu albo własnego błędu, a nie ludzi lub klienta?
10. Czy akapit końcowy jest jednym z trzech typów: wniosek z ograniczeniem zakresu, konkretne pytanie do praktyków, zapowiedź praktycznego dodatku?
11. Czy nie ma znaku em dash i czy myślniki są zwykłymi dywizami?
12. Czy tekst ma przynajmniej jeden cytowalny konkret, którego nie mógłby napisać ogólny konsultant od produktywności?

## 12. Sprzeczności z dokumentami kalibracyjnymi

1. `02_GLOS_I_STYL_OPERACYJNY.md` mówi: "Kończyć konkretnym pytaniem do branży." Korpus pokazuje: tylko 7 z 20 zakończeń ma pytanie, feedback albo CTA. 8 z 20 kończy się wnioskiem lub zastrzeżeniem, 4 z 20 zapowiedzią kolejnego materiału, 1 z 20 puentą humorystyczną.

2. `00_GLOS_I_STYL_KALIBRACJA.md` i `02_GLOS_I_STYL_OPERACYJNY.md` sugerują oszczędne emoji w nowym podejściu. Korpus strony ma 146 symboli piktograficznych w 18 z 20 tekstów. To nie jest śladowe użycie. Najwięcej ma `elementy-znormalizowane-handlowki.json`: 28.

3. `07_ANTYPRZYKLADY_I_FILTRY.md` wskazuje jako złe CTA "Dajcie znać w komentarzu." Korpus zawiera bliskie formy: "dajcie znać, jak wygląda to u Was" w `standaryzacja-w-biurze-konstrukcyjnym.json`, "Podziel się w komentarzu..." w `elementy-znormalizowane-handlowki.json`, "koniecznie daj znać" w `narzedzia-pracy-konstruktora.json` oraz "Kontakt znajdziesz w zakładce Usługi" w `kick-off-projektu-konstrukcyjnego.json`. To razem co najmniej 5 jawnych CTA, choć nadal bez frazy "co o tym myślicie".

4. `00_GLOS_I_STYL_KALIBRACJA.md` i `02_GLOS_I_STYL_OPERACYJNY.md` wymieniają charakterystyczne frazy typu "ultra", "także lecimy", "to lecimy", "biedne 3D", "leci do kosza", "rozklepać temat", "wąskie gardło", "gaszenie pożarów". W korpusie strony wyszukanie tych fraz daje 0 wystąpień, poza "serio", które występuje 3 razy, i "Noi", które występuje 1 raz. To znaczy, że profil ze strony jest spokojniejszy i mniej linkedinowy niż dokumenty kalibracyjne.

5. `README.md` mówi, że na stronie emoji są jeszcze oszczędniejsze niż w postach. Korpus właściwy przeczy temu liczbowo: 146 symboli piktograficznych. Trzeba odróżnić zasadę redakcyjną na przyszłość od aktualnego stylu historycznych tekstów.

## Wynik skryptu

Polecenie:

```text
node analizy/policz-styl.mjs
```

Wynik:

```text
METRYKA KORPUSU
teksty: 20
okres: 2025-07-31 do 2026-08-07
slowa: 13870
zdania: 1044
akapity: 468
bloki lacznie: 363
bloki tekstowe: 272

RYTM ZDANIA
mediana slow w zdaniu: 12
q1-q3 slow w zdaniu: 7-18
p10-p90 slow w zdaniu: 3-24
min-max slow w zdaniu: 1-79
zdania krotsze niz 6 slow: 205 (19.6%)
zdania dluzsze niz 25 slow: 82 (7.9%)
mediana zdan w akapicie: 2
q1-q3 zdan w akapicie: 1-3

TABELA ARTYKULOW
plik | data | slowa | zdania | bloki | tytul
content\blog\bledy-w-projekcie-konstrukcyjnym.json | 2025-10-22 | 752 | 60 | 15 | Zrobiłem błąd - co teraz? (🥶😫 vs 💡🤨)
content\blog\design-for-maintenance-przezbrojenia.json | 2025-08-26 | 766 | 53 | 15 | Design For Maintenance. Jak projektować, żeby łatwo przezbrajać?
content\blog\dobor-sprzegla-do-aplikacji.json | 2026-08-02 | 552 | 50 | 20 | Jak odpowiednio dobrać sprzęgło do aplikacji?
content\blog\elektrozawory-pneumatyczne-dobor.json | 2025-07-31 | 705 | 60 | 23 | ELEKTROZAWORY PNEUMATYCZNE - co dobrze jest wiedzieć?
content\blog\elementy-znormalizowane-handlowki.json | 2026-05-10 | 550 | 33 | 16 | Elementy znormalizowane – czy warto korzystać z gotowych rozwiązań?
content\blog\kick-off-projektu-konstrukcyjnego.json | 2026-07-05 | 594 | 45 | 18 | Jak zorganizować produktywny KICK-OFF projektu?
content\blog\koszty-a-jakosc-w-projektowaniu-maszyn.json | 2026-05-24 | 610 | 38 | 17 | Koszty – jak osiągnąć równowagę między budżetem, a jakością?
content\blog\narzedzia-pracy-konstruktora.json | 2026-06-07 | 683 | 56 | 21 | Narzędzia pracy - co, jak i dlaczego wybrać
content\blog\onenote-notes-projektu.json | 2025-10-02 | 730 | 74 | 15 | Jak zorganizować OneNote projektu?
content\blog\polaczenie-wal-piasta.json | 2026-01-07 | 1170 | 95 | 19 | Połączenie wał-piasta - przegląd rozwiązań
content\blog\pozornie-latwe-miejsca-projektu.json | 2025-11-26 | 538 | 44 | 14 | [Case study] Pozornie "łatwe" miejsca w projekcie - na co uważać?
content\blog\projektowanie-wielobrylowe-case-study.json | 2026-02-12 | 668 | 45 | 20 | Projektowanie wielobryłowe - czym to jeść? (Część 2 - Case Study)
content\blog\projektowanie-wielobrylowe-czesc-1.json | 2026-02-04 | 490 | 31 | 13 | Projektowanie wielobryłowe - czym to jeść? (Część 1)
content\blog\projektowanie-z-niepelnymi-danymi.json | 2025-09-10 | 1019 | 75 | 16 | Jak projektować kiedy masz niepełne dane?
content\blog\standaryzacja-w-biurze-konstrukcyjnym.json | 2026-07-19 | 636 | 53 | 19 | Kopiuj-wklej po inżyniersku (krótko o standaryzacji)
content\blog\szacowanie-czasu-projektowania.json | 2026-06-21 | 495 | 30 | 20 | Dobrze oszacuj czas projektowania
content\blog\tuleje-taper-lock-dobor.json | 2025-12-02 | 670 | 49 | 17 | Tuleje Taper Lock / Taper Bush - co warto wiedzieć?
content\blog\umiejetnosci-poczatkujacego-konstruktora.json | 2026-01-14 | 954 | 76 | 20 | Jakie umiejętności powinien rozwijać początkujący konstruktor?
content\blog\weryfikacja-cad-przed-produkcja.json | 2026-01-28 | 939 | 48 | 20 | Weryfikacja CAD przed uruchomieniem produkcji
content\wiedza\pozycjonowanie-czesci-w-maszynie.json | 2026-08-07 | 349 | 31 | 25 | 6 sposobów pozycjonowania części w budowie maszyn

OSOBA I DYSTANS
1 os. lp, wskazniki: 142
ty, wskazniki: 228
bezosobowe, wskazniki: 88

FRAZY SLEDZONE
tak naprawdę: 14
moim zdaniem: 15
po prostu: 7
w zasadzie: 2
z mojego doświadczenia: 3
z mojej perspektywy: 0
na koniec: 2
w praktyce: 3
w projekcie: 9
w pracy konstruktora: 0
na montażu: 0
na etapie: 7
model 3d: 2
rysunek 2d: 0
model cad: 0
dokumentacja: 4
baza wiedzy: 3
kick-off: 13
warto: 35
trzeba: 22
można: 28
da się: 3

TOP SLOWA PO STOPLIST
części: 45
projektu: 42
też: 41
projektowania: 41
jednak: 38
warto: 35
coś: 32
gdzie: 31
dlatego: 30
naprawdę: 27
lub: 27
cad: 27
pracy: 26
tylko: 25
tutaj: 25
czas: 24
temat: 24
wałka: 24
czasu: 23
moim: 23
trzeba: 22
projekt: 22
maszyny: 22
dobrze: 21
masz: 21
konstruktor: 21
kilka: 20
sam: 20
wam: 20
elementów: 20
zawsze: 19
takich: 18
było: 18
jakie: 18
elementy: 18
łatwo: 18
przykład: 18
dzięki: 17
jeszcze: 17
oczywiście: 17

FORMY DO SPRAWDZENIA
wykrzykniki: 26
em dash: 0
emoji i symbole piktograficzne: 146
Drodzy: 0
kompleksowe rozwiązania: 0
w dzisiejszych czasach: 0
synergia: 0
co o tym myślicie: 0
dajcie znać w komentarzach: 0
dajcie znać w komentarzu: 0
udostępnij: 0
dynamicznie zmieniającym się: 0
```
