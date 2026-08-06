# Audyt UX i UI kalkulatora pasowań

Analiza dotyczy obecnego kodu w `src/components/KalkulatorPasowan.js`, `src/components/KalkulatorPasowan.module.css`, `src/pages/narzedzia/pasowania.js`, `content/wiedza-pasowania.json` i `src/lib/pasowania/oblicz.js`.

## 1. Co dziś działa dobrze

- Kalkulator od razu pokazuje sensowny przykład, `⌀20 H7/g6`, więc użytkownik nie zaczyna od pustego formularza.
- Skróty popularnych pasowań są pogrupowane na luźne, mieszane i ciasne. To jest dobra ścieżka dla osób, które znają typowe symbole.
- Wynik mówi nie tylko ile wynosi luz albo wcisk, ale też co to znaczy przy montażu.
- Obecny kod ma już dwa małe rysunki detali, otwór i wałek, z wymiarami granicznymi oraz osobny przekrój pasowania. To jest dobry kierunek.
- Szczegóły techniczne są schowane w `details`, więc tabela i wykres nie zalewają pierwszego widoku.
- Silnik obliczeń rozróżnia błędy typu średnica poza zakresem, brak danych i zły zakres luzu. To daje dobre podstawy do lepszych komunikatów w UI.

## 2. Problemy UX, uszeregowane wg dotkliwości

### 1. Błąd w trybie pasowania zabiera użytkownikowi formularz

Co jest nie tak: gdy `policzPasowanie` zwróci błąd, komponent pokazuje tylko `<p className={styles.blad}>` zamiast panelu z polami. Dotyczy to złej średnicy, średnicy poza zakresem i kombinacji bez danych w tablicach.

Dla kogo to problem: dla każdego, kto wpisze `0`, `501`, wyczyści pole albo wybierze pole tolerancji bez danych.

Jaką decyzję psuje: użytkownik nie może poprawić tej samej decyzji, bo znika mu miejsce, w którym ją podjął. W praktyce narzędzie wygląda jak zepsute.

### 2. Wejście z Google wymaga zbyt dużo wiedzy przed pierwszą decyzją

Co jest nie tak: osoba trafiająca z frazy „kalkulator pasowań” widzi od razu dwa tryby i przełącznik „Zasada”, ale wyjaśnienie zasady stałego otworu i stałego wałka jest dopiero pod kalkulatorem. Nazwy „Wymiary na podstawie pasowania” i „Pasowanie na podstawie wymiarów” są poprawne technicznie, ale nie mówią po ludzku, czy mam symbol typu `H7/g6`, czy mam wymagany luz.

Dla kogo to problem: dla konstruktora mniej obytego z normą, technologa, studenta albo osoby, która ma tylko wymaganie montażowe.

Jaką decyzję psuje: użytkownik musi wybrać tryb i zasadę, zanim rozumie skutki. Najczęściej powinien zacząć od stałego otworu, ale UI nie mówi mu, że to domyślna, typowa ścieżka.

### 3. Wynik nie jest jeszcze wystarczająco gotowy do przepisania

Co jest nie tak: dwa rysunki detali pokazują już `20,000 / 20,021` i `19,980 / 19,993`, ale najważniejszy tekst wyniku nadal zaczyna się od „Luz od 7 do 41 µm” i werdyktu montażowego. Paragraf „Zapis na rysunku” w szczegółach podaje odchyłki w mm, nie pełne wymiary graniczne.

Dla kogo to problem: dla konstruktora, który chce szybko wkleić zapis do dokumentacji albo przepisać go na rysunek.

Jaką decyzję psuje: użytkownik widzi wartość funkcjonalną pasowania, ale musi sam zdecydować, które liczby są „do rysunku”, a które są tylko objaśnieniem.

### 4. Brakuje kopiowania wyniku

Co jest nie tak: nie ma przycisku kopiowania symbolu, wymiarów otworu, wymiarów wałka ani krótkiego podsumowania pasowania.

Dla kogo to problem: dla użytkownika pracującego równolegle w CAD, arkuszu kontroli jakości albo dokumencie technologicznym.

Jaką decyzję psuje: użytkownik musi ręcznie przepisywać liczby. Przy trzech miejscach po przecinku i mikrometrach łatwo o błąd.

### 5. Stan kalkulatora nie siedzi w adresie URL

Co jest nie tak: średnica, tryb, zasada, pola tolerancji i zakres luzu są tylko w stanie Reacta.

Dla kogo to problem: dla osoby, która chce wrócić do wyniku, wysłać go koledze albo wkleić link do komentarza w zadaniu.

Jaką decyzję psuje: nie da się udokumentować, z jakich danych powstał wynik. Po odświeżeniu wraca przykład domyślny.

### 6. Tryb doboru z luzu miesza brak wyniku z błędem wejścia

Co jest nie tak: `znajdzPasowania` rzuca błąd dla niepoprawnej średnicy albo zakresu `luzMin > luzMax`, ale UI łapie wszystko i pokazuje „Nie znalazłem pasowania w tym zakresie”.

Dla kogo to problem: dla użytkownika, który wpisał zły zakres luzu lub średnicę poza zakresem.

Jaką decyzję psuje: użytkownik może próbować poszerzać widełki, chociaż prawdziwy problem jest w błędnym wejściu.

### 7. Przełączanie trybów nie tłumaczy, co zostaje zachowane

Co jest nie tak: średnica i zasada zostają po przełączeniu, poprzedni symbol też wraca po powrocie do pierwszego trybu, ale UI tego nie komunikuje. Kliknięcie propozycji przenosi do trybu pasowania, co jest dobre, ale może zaskoczyć.

Dla kogo to problem: dla użytkownika testującego kilka wariantów.

Jaką decyzję psuje: trudno ocenić, czy narzędzie nadal liczy ten sam przypadek, czy zaczęło nowy.

### 8. Kolejność czytania jest bardziej „formularzowa” niż „wynikowa”

Co jest nie tak: na desktopie użytkownik najpierw skanuje lewy panel sterowania i skróty, a dopiero potem wynik. Na telefonie kolejność jest jeszcze bardziej sterująca: najpierw pola i przyciski, potem rezultat. Przy gotowym domyślnym wyniku bardziej użyteczne byłoby: co policzono, co wpisać na rysunek, dopiero potem jak zmienić dane.

Dla kogo to problem: dla wejścia z wyszukiwarki, gdzie użytkownik często chce szybko potwierdzić przykład.

Jaką decyzję psuje: pierwsze sekundy idą na rozszyfrowanie narzędzia, nie na ocenę wyniku.

## 3. Problemy UI

- Hierarchia wyniku jest częściowo odwrócona: „Luz od 7 do 41 µm” i werdykt montażowy są większe niż dane do dokumentacji. Docelowo blok z otworem, wałkiem i pasowaniem powinien być pierwszym czytanym wynikiem.
- Obecny układ rysunków to 168 px na dwa detale po lewej i przekrój po prawej. To oszczędza miejsce, ale nie daje trzem rysunkom równej wagi. Otwór i wałek wyglądają jak dopisek do pasowania.
- Małe przyciski skrótów mają około 4 px pionowego paddingu i font 10,5 px. Na telefonie są trudne do trafienia palcem.
- Etykiety w `var(--pc-text-faint)` mają 10,5 px i duże rozstrzelenie liter. Przy tej jasności kolor jest za słaby dla drobnego tekstu.
- Przełącznik zasady i trybów działa, ale aktywny stan opiera się głównie na ciemnym wypełnieniu. Dla osób szybko skanujących warto dodać wyraźniejszy tekstowy kontekst, np. krótki opis aktywnej zasady.
- Dane liczbowe są czytelne dzięki fontowi mono, ale format jest niespójny między miejscami. Rysunki używają przecinka, tabela używa kropki, a „Zapis na rysunku” pokazuje odchyłki w mm zamiast wymiarów granicznych.
- Tabela ma `min-width: 620px` i przewijanie poziome. To technicznie działa, ale na telefonie tabela jest materiałem audytowym, nie powinna być głównym sposobem odczytu wyniku.
- `details summary` ma tylko tekst i domyślny marker. Jest spójnie i lekko, ale klikalny obszar mógłby być większy, zwłaszcza gdy pod spodem są ważne dane kontrolne.
- Kolory są zasadniczo spójne z `--pc-*`, ale w komponencie jest sporo twardych odcieni tła: `#ffffff`, `#f7f6f4`, `#fbfaf8`, `#f2f1ee`, `#dfe3f0`. To nie jest krytyczny błąd, ale utrudnia późniejsze utrzymanie jasnego i ciemnego motywu.
- Na wąskim ekranie obecny kod schodzi do jednej kolumny dla `.rysunki`, a `.detale` robią dwie kolumny. To dobry kompromis, ale przy dłuższych opisach wymiarów trzeba pilnować, żeby podpisy SVG nie były za małe.

## 4. Ocena planu z trzema rysunkami

Plan jest dobry, bo odpowiada dokładnie na główną potrzebę: konstruktor ma zobaczyć otwór, wałek i pasowanie jako trzy konkretne rzeczy, nie jako tabelę z odchyłkami. Otwór i wałek z wymiarami granicznymi zdejmują z użytkownika konieczność rozwijania szczegółów. Przekrój pasowania dalej tłumaczy sens montażowy, czyli luz, wcisk albo przypadek mieszany.

Ryzyko jest w zajętości miejsca. Jeden mały rysunek warsztatowy z kreskowaniem, osią, linią wymiarową i dwoma wymiarami granicznymi potrzebuje realnie około 150 do 190 px szerokości i 120 do 150 px wysokości, jeśli tekst ma zostać czytelny. Trzy rysunki obok siebie z odstępami zajmą około 500 do 620 px szerokości. To mieści się w kontenerze strony na desktopie, mieści się na tablecie po przejściu kalkulatora w jedną kolumnę, ale nie mieści się sensownie na telefonie 360 do 430 px.

Na telefonie nie warto wciskać trzech rysunków w jeden rząd. Są trzy rozsądne warianty:

1. Jeden rysunek pod drugim, najczytelniej, ale wyżej kosztuje pion.
2. Otwór i wałek w dwóch kolumnach, pasowanie pełną szerokością pod spodem. To najlepszy kompromis dla obecnej koncepcji.
3. Poziomy przewijany pasek trzech rysunków. Jest kompaktowy, ale łatwo ukrywa część wyniku, więc traktowałbym to jako gorszą opcję.

Aktualny kod jest już blisko wariantu 2, tylko robi to asymetrycznie: dwa detale są w wąskiej kolumnie, a pasowanie jest większe. Jeśli właściciel chce trzy rysunki „obok siebie”, na desktopie lepiej zrobić trzy równorzędne panele w jednym gridzie. Na telefonie można przejść do układu 2 plus 1 albo jednej kolumny.

Zdublowanie tabeli nie jest problemem, jeśli role są rozdzielone. Rysunki powinny być głównym wynikiem do przepisania. Tabela powinna zostać jako kontrola techniczna: ES, EI, es, ei, tolerancje i przedziały normowe. Wtedy sekcja rozwijana nadal ma sens, ale nie jako podstawowa ścieżka użycia.

Trzeba uważać, żeby rysunek nie zrobił się zbyt „ilustracyjny”. Ma być schematem warsztatowym: kreskowanie 45 stopni, oś kreska-kropka, linia wymiarowa u góry, strzałki na zewnątrz, symbol średnicy i wymiary graniczne. Bez ozdobników, bo tu liczy się przepisanie liczb.

## 5. Konkretne rekomendacje wg stosunku zysku do nakładu

1. Zostawić formularz widoczny przy błędzie i pokazać błąd pod konkretnym polem. Plik: `src/components/KalkulatorPasowan.js`, ewentualnie teksty w `content/wiedza-pasowania.json`. Uzasadnienie: to usuwa najpoważniejszy błąd ścieżki, bo użytkownik może poprawić dane bez restartu.

2. Rozdzielić „brak pasowania” od „złe dane wejściowe” w trybie doboru z luzu. Plik: `src/components/KalkulatorPasowan.js` i `content/wiedza-pasowania.json`. Uzasadnienie: użytkownik dostanie właściwą instrukcję, zamiast poszerzać zakres, gdy problemem jest np. `luzMin > luzMax`.

3. Zmienić nazwy trybów na bardziej zadaniowe: „Mam symbol pasowania” i „Dobierz z wymaganego luzu”. Plik: `content/wiedza-pasowania.json`. Uzasadnienie: to tania zmiana, która od razu pomaga osobom z wejścia z Google.

4. Dodać krótki opis przy zasadzie: „Najczęściej wybierz stały otwór H. Stały wałek h ma sens, gdy jeden wał przyjmuje różne elementy”. Plik: `content/wiedza-pasowania.json` i `src/components/KalkulatorPasowan.js`. Uzasadnienie: decyzja o zasadzie przestaje wymagać przewijania pod kalkulator.

5. Przenieść dane do rysunku na sam szczyt wyniku: otwór `⌀20 H7 20,000 / 20,021`, wałek `⌀20 g6 19,980 / 19,993`, pasowanie `luz 7 do 41 µm`. Plik: `src/components/KalkulatorPasowan.js`. Uzasadnienie: użytkownik od razu widzi to, co przepisze do dokumentacji.

6. Dodać przyciski kopiowania dla otworu, wałka i pełnego podsumowania. Plik: `src/components/KalkulatorPasowan.js` i `src/components/KalkulatorPasowan.module.css`. Uzasadnienie: mały nakład, duży spadek ryzyka błędnego przepisania liczb.

7. Ujednolicić format liczb: przecinek dziesiętny w UI, zawsze trzy miejsca dla wymiarów granicznych, mikrometry bez udawanej nadmiarowej precyzji. Plik: `src/components/KalkulatorPasowan.js`. Uzasadnienie: obecnie różne miejsca wyglądają jak różne konwencje zapisu.

8. Przebudować `.rysunki` na trzy równorzędne rysunki w gridzie na desktopie, a na telefonie użyć układu otwór plus wałek w dwóch kolumnach i pasowanie pod spodem. Plik: `src/components/KalkulatorPasowan.js` i `src/components/KalkulatorPasowan.module.css`. Uzasadnienie: realizuje plan właściciela, ale nie niszczy czytelności na małym ekranie.

9. Zostawić tabelę w `details`, ale nazwać ją jako kontrolę danych, nie główny wynik. Plik: `content/wiedza-pasowania.json` i `src/components/KalkulatorPasowan.js`. Uzasadnienie: po dodaniu rysunków tabela jest nadal potrzebna do audytu, ale nie powinna dublować pierwszej ścieżki.

10. Dodać stan w URL: średnica, tryb, zasada, otwór, wałek, luz minimalny i luz maksymalny. Plik: `src/components/KalkulatorPasowan.js`, ewentualnie `src/pages/narzedzia/pasowania.js` tylko jeśli inicjalizacja ma zależeć od strony. Uzasadnienie: wynik da się zapisać, wysłać i odtworzyć.

11. Powiększyć cele kliknięcia dla skrótów i przełączników, minimum około 36 do 40 px wysokości, na telefonie bliżej 44 px. Plik: `src/components/KalkulatorPasowan.module.css`. Uzasadnienie: skróty są główną ścieżką wyboru, więc muszą być wygodne na dotyk.

12. Podnieść kontrast drobnych etykiet albo zwiększyć ich rozmiar. Plik: `src/components/KalkulatorPasowan.module.css`. Uzasadnienie: `var(--pc-text-faint)` przy 10,5 px jest za słabe dla ważnych etykiet formularza.

13. Ograniczyć twarde kolory tła w komponencie i oprzeć je na tokenach `--pc-*` albo kilku lokalnych zmiennych komponentu. Plik: `src/components/KalkulatorPasowan.module.css`. Uzasadnienie: kalkulator będzie łatwiejszy do utrzymania razem z resztą strony.

14. Po kliknięciu propozycji z trybu doboru pokazać krótkie potwierdzenie, że wybrano pasowanie i przeliczono wynik. Plik: `src/components/KalkulatorPasowan.js`. Uzasadnienie: przejście między trybami będzie zrozumiałe, a użytkownik nie pomyśli, że zgubił dane.
