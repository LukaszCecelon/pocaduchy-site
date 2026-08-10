# Przelicznik jednostek: cztery koncepcje interfejsu

Dokument dotyczy wyłącznie modelu interakcji. Nie zakłada nowych komponentów, stron ani CSS.

Punkt wyjścia jest prosty: przelicznik nie może być pustym formularzem. Strona pary ma mieć odpowiedź, tabelę typowych wartości, wzór i notatkę kontekstową już w statycznym HTML. Interfejs ma tylko skrócić drogę do własnej liczby.

Istniejące narzędzia ustawiają dobry kierunek:

- kalkulator pasowań używa skrótów do typowych pasowań, a nie każe wybierać wszystkiego od zera,
- kalkulator pierścieni pozwala wpisać liczbę w miejscu, które wygląda jak rysunek techniczny,
- oba narzędzia pokazują wynik od razu i nie chowają sensu narzędzia za wieloetapowym kreatorem,
- teksty są konkretne: "Wpisz średnicę", "Nie znalazłem pasowania", "Najbliższe średnice", bez miękkiej korpomowy.

## Założenia wspólne

We wszystkich koncepcjach działa ten sam komponent na trzech typach stron:

| Typ strony | Rola statycznej treści | Rola interfejsu |
| --- | --- | --- |
| Hub `/przelicznik/` | lista 21 wymiarów, najczęstsze pary, opis zakresu | szybkie wejście w wymiar, parę albo wyszukiwarkę jednostek |
| Strona wymiaru, np. `/przelicznik/cisnienie/` | tabela krzyżowa i najczęstsze pary ciśnienia | wybór pary w ramach jednego wymiaru |
| Strona pary, np. `/przelicznik/bar-na-psi/` | H1 z odpowiedzią, tabela wartości, wzór, para odwrotna | pole wartości z ustawionymi jednostkami i możliwość szybkiej zmiany |

Wspólna zasada: duża lista 150 jednostek nie może być główną kontrolką. Lista rozwijana z setką pozycji jest zła, bo na telefonie wymaga przewijania, ukrywa kontekst wymiaru i przerzuca na użytkownika rozpoznanie jednostek. Może istnieć jako awaryjna lista tekstowa bez JavaScriptu, ale nie jako główna ścieżka.

## Koncepcja 1: Para najpierw

Jedno zdanie: strona pary pokazuje wynik od razu, a interfejs ma jedno pole wartości i dwa małe przyciski do zamiany lub zmiany jednostek.

To jest najbliższe architekturze SEO. Zakłada, że użytkownik często trafia z Google na konkretną parę, a nie przychodzi budować przelicznik od zera.

### Układ i model interakcji

Na stronie pary pierwszy ekran ma:

- wynik referencyjny z HTML, np. "1 bar to 14,5038 psi",
- pole `Wartość` z domyślną wartością `1`,
- jednostki jako dwie stałe kapsuły: `bar` i `psi`,
- przycisk `Zamień`,
- link lub przycisk `Zmień jednostkę`,
- pod spodem kilka typowych wartości z tabeli, nie chowanych w zakładce.

Na stronie wymiaru ten sam komponent startuje bez pary, ale pokazuje najpierw "Najczęściej w ciśnieniu": `bar na psi`, `MPa na bar`, `kPa na bar`, `bar na Pa`, `at na bar`. Hub pokazuje najpierw 21 wymiarów jako zwięzłą siatkę i pole wyszukiwania.

### Scenariusz 1: "mam 5 barów, ile to psi", telefon, wejście z Google na stronę pary

1. Użytkownik otwiera `/przelicznik/bar-na-psi/`.
2. Widzi w HTML wynik `1 bar to 14,5038 psi` oraz tabelę, w której jest też `5 bar`.
3. Jeżeli wystarczy mu tabela, kończy bez interakcji.
4. Jeżeli chce własną wartość w polu, dotyka `Wartość`.
5. Wpisuje `5`.
6. Wynik pod polem zmienia się na `5 bar to 72,519 psi`.

Kliknięcia i wpisy:

- przy odczycie z tabeli: 0 kliknięć, 0 wpisów,
- przy użyciu pola: 1 kliknięcie, 1 wpis.

### Scenariusz 2: "mam moment 50 lbf ft z instrukcji, chcę Nm", komputer, wejście przez hub

1. Użytkownik otwiera hub `/przelicznik/`.
2. Klika wymiar `Moment obrotowy`.
3. Na stronie wymiaru klika parę `lbf ft na Nm`, widoczną w najczęstszych parach.
4. Na stronie pary klika pole `Wartość`.
5. Wpisuje `50`.
6. Odczytuje wynik.

Kliknięcia i wpisy: 3 kliknięcia, 1 wpis.

Jeżeli para nie jest w skrótach, ścieżka wydłuża się o otwarcie zmiany jednostki i wybór z ograniczonej listy momentu: 5 kliknięć, 1 wpis.

### Scenariusz 3: "nie pamiętam, jak nazywa się jednostka, wiem tylko, że to coś z ciśnieniem"

1. Użytkownik otwiera hub albo stronę wymiaru ciśnienia.
2. Klika `Ciśnienie`.
3. Widzi grupy jednostek: metryczne, techniczne, atmosferyczne i anglosaskie.
4. Skanuje krótkie opisy: `bar`, `at`, `atm`, `psi`, `mmHg`, `mmH2O`.
5. Klika rozpoznaną jednostkę albo parę.

Kliknięcia i wpisy: zwykle 2 kliknięcia, 0 wpisów. Gdy musi wejść w zmianę drugiej jednostki: 3 do 4 kliknięć, 0 wpisów.

### Wybór spośród 150 jednostek

Rozwiązaniem jest zawężanie kontekstem, nie długa lista.

Na hubie użytkownik wybiera najpierw jeden z 21 wymiarów. Po tym widzi tylko jednostki z tego wymiaru, zwykle 4 do 12 pozycji. Na stronie pary wybór jednostki otwiera nie globalny select, tylko panel "Zmień w ciśnieniu" z jednostkami tego samego wymiaru oraz linkiem "Szukaj w innych wymiarach".

Dodatkowo każda jednostka ma aliasy: `lbf ft`, `lb ft`, `ft lb`, `funtostopa`, `pound foot`. Wpisanie aliasu w huba kieruje do odpowiedniego wymiaru lub pary. Główna ścieżka nadal nie wymaga szukania.

### Bez JavaScriptu

Użytkownik widzi pełną stronę pary: odpowiedź dla 1 jednostki, tabelę typowych wartości w obie strony, wzór, notatkę kontekstową, link do pary odwrotnej i linki do sąsiednich par. Pole formularza może być zwykłym formularzem z metodą GET tylko jako progresywne ulepszenie, ale nie jest potrzebne do zrozumienia strony.

Na hubie i stronie wymiaru bez JavaScriptu widzi linki do wymiarów i par. Nie ma dynamicznego filtrowania, ale nawigacja działa.

### Telefon i klawiatura

Pole wartości musi być w pierwszym ekranie, a wynik bezpośrednio pod nim. Po pojawieniu się klawiatury nie wolno chować wyniku poniżej folda. Najbezpieczniejszy układ to:

- nagłówek pary zostaje krótki,
- pole i wynik tworzą jeden zwarty blok,
- tabela typowych wartości zaczyna się niżej,
- panel zmiany jednostki nie otwiera się automatycznie przy fokusie pola.

Gdy klawiatura zasłania połowę ekranu, użytkownik nadal widzi pole `5`, parę `bar -> psi` i wynik. Nie widzi tabeli, ale jej wtedy nie potrzebuje.

### Dla kogo najlepsza i najgorsza

Najlepsza dla użytkownika z Google, który ma konkretną parę i chce tylko podstawić inną liczbę. Dobra też dla konstruktora przy maszynie, bo najczęściej wymaga jednego dotknięcia i jednego wpisu.

Najgorsza dla użytkownika, który nie zna wymiaru ani symbolu. Wtedy musi wrócić do huba albo skorzystać z wyszukiwarki.

### Koszt budowy

Koszt: 2/5.

Uzasadnienie: najprostszy stan komponentu, mało niestandardowej logiki, bardzo dobra zgodność ze statycznym HTML. Trzeba porządnie przygotować skróty par i panel zmiany jednostek w ramach wymiaru, ale nie trzeba budować złożonego kreatora.

## Koncepcja 2: Wyszukiwarka jednostek z odpowiedzią

Jedno zdanie: użytkownik wpisuje fragment problemu, np. `50 lbf ft Nm`, a interfejs rozpoznaje wartość, jednostkę źródłową i jednostkę docelową.

To jest model dla użytkownika, który myśli frazą z instrukcji albo z Google, a nie strukturą formularza.

### Układ i model interakcji

Na hubie pierwszy element to pojedyncze pole:

`Wpisz wartość albo jednostkę`

Pod polem stoją podpowiedzi:

- `5 bar na psi`,
- `50 lbf ft na Nm`,
- `cal na mm`,
- `MPa na N/mm2`.

Po wpisaniu tekstu parser próbuje rozpoznać:

- liczbę,
- jednostkę wejściową,
- jednostkę wyjściową,
- wymiar.

Wynik pojawia się pod polem. Jeżeli zapytanie jest niepełne, np. `ciśnienie at`, interfejs pokazuje pasujące jednostki i pary.

### Scenariusz 1: "mam 5 barów, ile to psi", telefon, wejście z Google na stronę pary

1. Użytkownik otwiera `/przelicznik/bar-na-psi/`.
2. Widzi gotową odpowiedź i tabelę.
3. Dotyka pola zapytania, w którym podpowiedź brzmi `np. 5 bar na psi`.
4. Wpisuje `5`.
5. Wynik zostaje przeliczony w ustawionej parze.

Kliknięcia i wpisy:

- przy odczycie z tabeli: 0 kliknięć, 0 wpisów,
- przy użyciu pola: 1 kliknięcie, 1 wpis.

### Scenariusz 2: "mam moment 50 lbf ft z instrukcji, chcę Nm", komputer, wejście przez hub

1. Użytkownik otwiera hub.
2. Klika pole wyszukiwania.
3. Wpisuje `50 lbf ft Nm` albo `50 lbf ft na Nm`.
4. Odczytuje wynik.

Kliknięcia i wpisy: 1 kliknięcie, 1 wpis.

To jest najmocniejszy scenariusz tej koncepcji. Nie ma wyboru wymiaru, nie ma przejścia na stronę momentu, nie ma dwóch list jednostek.

### Scenariusz 3: "nie pamiętam, jak nazywa się jednostka, wiem tylko, że to coś z ciśnieniem"

1. Użytkownik klika pole wyszukiwania.
2. Wpisuje `ciśnienie`.
3. Widzi listę jednostek ciśnienia pogrupowaną praktycznie: układ SI, techniczne, atmosferyczne, anglosaskie.
4. Klika jednostkę albo parę.

Kliknięcia i wpisy: 2 kliknięcia, 1 wpis.

Jeżeli zaczyna ze strony wymiaru ciśnienia, odpada wpis `ciśnienie`: 1 do 2 kliknięć, 0 wpisów.

### Wybór spośród 150 jednostek

Wybór jest rozwiązany przez parser i wyszukiwarkę aliasów. Użytkownik nie widzi 150 pozycji naraz. Wpisuje `lbf`, `funt`, `psi`, `at`, `kgf`, `obr`, a interfejs pokazuje krótką listę pasujących jednostek.

To wymaga dobrych aliasów. Bez nich koncepcja się sypie, bo użytkownik wpisze `ft lb`, a dane będą miały tylko `lbf ft`. Warto traktować aliasy jako część modelu danych, nie jako ozdobę UI.

### Bez JavaScriptu

Bez JavaScriptu pole wyszukiwarki nie daje wyniku na żywo. Strona nadal ma statyczną odpowiedź, tabelę, wzór i linki. Na hubie trzeba dać zwykłą listę wymiarów i popularnych par, żeby strona nie zamieniła się w martwe pole.

To jest słabszy fallback niż w koncepcji 1, bo główny model interakcji zależy od JavaScriptu. Treść nadal istnieje, ale główna wygoda nie.

### Telefon i klawiatura

Na telefonie pole zajmuje sensowną wysokość, ale klawiatura od razu zasłania część ekranu. Dlatego wynik musi pojawiać się nad listą podpowiedzi albo wklejać się tuż pod polem, nie pod długą listą wyników wyszukiwania.

Przy niepełnym zapytaniu lista podpowiedzi powinna mieć maksymalnie 5 pozycji. Więcej pozycji przy klawiaturze robi ten sam problem, co select ze 100 jednostkami, tylko w ładniejszym ubraniu.

### Dla kogo najlepsza i najgorsza

Najlepsza dla użytkownika na komputerze, który ma tekst z instrukcji albo katalogu i chce szybko przepisać fragment. Najlepsza też dla huba, bo daje najkrótszą drogę do wyniku: 1 kliknięcie, 1 wpis.

Najgorsza dla użytkownika przy maszynie, jedną ręką, który nie chce pisać `lbf ft` na ekranowej klawiaturze. Słabsza również dla osób, które nie znają symbolu i nie wiedzą, czego szukać.

### Koszt budowy

Koszt: 4/5.

Uzasadnienie: trzeba zbudować parser liczb, separatorów dziesiętnych, aliasów i kierunku `na`, `do`, `w`. Do tego dochodzą błędy rozpoznawania. Przykład: `Nm` może znaczyć niutonometr w praktyce, ale `nm` w długości to nanometr. Bez ostrożnych reguł wynik będzie szybki, ale czasem błędny.

## Koncepcja 3: Kafelki wymiaru i jednostki

Jedno zdanie: użytkownik najpierw wybiera wymiar, potem jednostkę źródłową i docelową z krótkich grup, bez globalnego pola wyszukiwania.

To jest model najbardziej przewidywalny. Zamiast zgadywać intencję, prowadzi użytkownika przez dwie decyzje, ale każda decyzja jest mała.

### Układ i model interakcji

Hub pokazuje 21 wymiarów jako kafelki. Każdy kafelek ma 3 do 5 przykładów jednostek:

- `Ciśnienie: bar, MPa, psi, at`,
- `Moment: Nm, Nmm, lbf ft, lbf in`,
- `Siła: N, kN, kgf, lbf`.

Po kliknięciu wymiaru użytkownik widzi dwie kolumny:

- `Z czego`: jednostki pogrupowane według układu,
- `Na co`: te same jednostki, ale najczęstsze docelowe na górze.

Wybór jednostki źródłowej automatycznie pokazuje najczęstsze pary z tą jednostką. Po wyborze pary pole wartości dostaje fokus dopiero na żądanie, nie automatycznie.

### Scenariusz 1: "mam 5 barów, ile to psi", telefon, wejście z Google na stronę pary

1. Użytkownik otwiera stronę pary.
2. Widzi wynik referencyjny i tabelę z wartością `5 bar`, jeśli tabela zawiera 5.
3. Jeżeli chce pole, dotyka `Wartość`.
4. Wpisuje `5`.
5. Odczytuje wynik.

Kliknięcia i wpisy:

- przy tabeli: 0 kliknięć, 0 wpisów,
- przy polu: 1 kliknięcie, 1 wpis.

### Scenariusz 2: "mam moment 50 lbf ft z instrukcji, chcę Nm", komputer, wejście przez hub

1. Użytkownik otwiera hub.
2. Klika kafelek `Moment obrotowy`.
3. Klika `lbf ft` w grupie jednostek anglosaskich.
4. Klika `Nm` w grupie jednostek SI albo w sugerowanych parach.
5. Klika pole wartości.
6. Wpisuje `50`.
7. Odczytuje wynik.

Kliknięcia i wpisy: 4 kliknięcia, 1 wpis.

Jeżeli `lbf ft na Nm` jest pokazane jako typowa para po wejściu w moment, ścieżka skraca się do 3 kliknięć i 1 wpisu.

### Scenariusz 3: "nie pamiętam, jak nazywa się jednostka, wiem tylko, że to coś z ciśnieniem"

1. Użytkownik klika `Ciśnienie`.
2. Widzi krótką listę jednostek ciśnienia, nie 150 pozycji.
3. Skanuje grupy i opisy.
4. Klika jednostkę, którą rozpoznaje.

Kliknięcia i wpisy: 2 kliknięcia, 0 wpisów.

To jest najmocniejszy scenariusz tej koncepcji. Brak nazwy jednostki nie blokuje, bo użytkownik pracuje z wymiarem.

### Wybór spośród 150 jednostek

Najpierw wymiar, potem 4 do 12 jednostek. Każda grupa ma sens techniczny, np. w ciśnieniu:

- SI: `Pa`, `kPa`, `MPa`,
- praktyczne: `bar`, `mbar`,
- techniczne: `at`, `kgf/cm2`,
- atmosferyczne i słup cieczy: `atm`, `mmHg`, `mmH2O`,
- anglosaskie: `psi`.

Nie ma jednej listy. Hub pokazuje wymiary, strona wymiaru pokazuje jednostki tylko z tego wymiaru, strona pary pokazuje zmianę tylko w obrębie tego wymiaru.

### Bez JavaScriptu

Fallback jest bardzo dobry. Kafelki wymiarów są zwykłymi linkami. Strony wymiaru mają statyczne linki do par i tabelę krzyżową. Strony par mają odpowiedź i tabelę. Bez JavaScriptu użytkownik nadal przechodzi po linkach i odczytuje wyniki typowych wartości.

### Telefon i klawiatura

Ta koncepcja dobrze działa bez klawiatury, bo większość decyzji to kliknięcia. Na telefonie trzeba pilnować, żeby grupy jednostek nie zamieniły się w długi korytarz. Dobre zachowanie:

- na stronie wymiaru najpierw 5 najczęstszych par,
- potem grupy jednostek,
- panel wyniku zawsze nad pełną tabelą.

Gdy użytkownik dotknie pola wartości, klawiatura zasłoni dół ekranu, ale para i wynik zostają nad nią. Ponieważ wybór jednostek był wykonany wcześniej, klawiatura nie miesza się z listą.

### Dla kogo najlepsza i najgorsza

Najlepsza dla osób, które wiedzą, z jakim wymiarem pracują, ale nie pamiętają symbolu jednostki. Dobra dla edukacyjnego skanowania stron wymiaru, bo pokazuje kontekst techniczny.

Najgorsza dla użytkownika z konkretnym tekstem `50 lbf ft na Nm`, bo musi przejść przez wymiar i dwie jednostki. Wyszukiwarka z koncepcji 2 wygrywa tu o 2 kliknięcia.

### Koszt budowy

Koszt: 3/5.

Uzasadnienie: trzeba dobrze zaprojektować dane o grupach jednostek i popularnych parach, ale logika jest prosta. Najwięcej pracy jest redakcyjnej: nazwy grup, aliasy i kolejność jednostek muszą odpowiadać pracy konstruktora, a nie układowi z podręcznika fizyki.

## Koncepcja 4: Ściąga z aktywnym wierszem

Jedno zdanie: głównym interfejsem jest tabela wartości, a JavaScript pozwala tylko podświetlić i przeliczyć wpisany wiersz.

To jest najbardziej "HTML first" model. Traktuje kalkulator jako dynamiczny dodatek do tabeli, a nie odwrotnie.

### Układ i model interakcji

Na stronie pary centrum stanowi tabela typowych wartości. Nad tabelą jest małe pole:

`Wstaw własną wartość`

Po wpisaniu liczby tabela dostaje dodatkowy pierwszy wiersz:

`5 bar | 72,519 psi`

Na stronie wymiaru tabela krzyżowa jest główną treścią. Użytkownik wybiera wiersz i kolumnę przez kliknięcie nagłówków jednostek. Na hubie są tylko kategorie i najczęstsze tabele.

### Scenariusz 1: "mam 5 barów, ile to psi", telefon, wejście z Google na stronę pary

1. Użytkownik otwiera `/przelicznik/bar-na-psi/`.
2. Widzi tabelę typowych wartości.
3. W tabeli jest `5 bar`, więc odczytuje wynik bez dotykania interfejsu.

Kliknięcia i wpisy: 0 kliknięć, 0 wpisów.

Jeżeli wpisuje własną wartość spoza tabeli: 1 kliknięcie, 1 wpis.

### Scenariusz 2: "mam moment 50 lbf ft z instrukcji, chcę Nm", komputer, wejście przez hub

1. Użytkownik otwiera hub.
2. Klika `Moment obrotowy`.
3. Klika tabelę albo link `lbf ft na Nm`.
4. Jeżeli tabela typowych wartości zawiera 50, odczytuje wynik.

Kliknięcia i wpisy: 2 kliknięcia, 0 wpisów, jeśli `50` jest w tabeli typowych wartości.

Jeżeli wartości nie ma w tabeli: 3 kliknięcia, 1 wpis.

### Scenariusz 3: "nie pamiętam, jak nazywa się jednostka, wiem tylko, że to coś z ciśnieniem"

1. Użytkownik klika `Ciśnienie`.
2. Widzi tabelę krzyżową i listę jednostek ciśnienia.
3. Skanuje nagłówki i podpisy grup.
4. Klika parę albo zostaje przy odczycie z tabeli.

Kliknięcia i wpisy: 1 do 2 kliknięć, 0 wpisów.

### Wybór spośród 150 jednostek

Koncepcja nie wybiera z 150 jednostek. Ona rozbija problem na 21 tabel wymiarów i kilkanaście najważniejszych par. Użytkownik pracuje na gotowych tabelach, a nie na formularzu.

To dobrze pasuje do SEO, bo tabela jest treścią. Słabo pasuje do rzadkich wartości i rzadkich par. Jeżeli ktoś chce `37,5 ozf in na Nmm`, tabela nie pomoże mu tak szybko jak pole wyszukiwania.

### Bez JavaScriptu

To najlepszy fallback. Bez JavaScriptu użytkownik widzi dokładnie to, co jest głównym produktem strony: tabelę typowych wartości, wzór, notatkę i linki. Traci tylko wstawianie własnego wiersza.

### Telefon i klawiatura

Telefon jest dobry dla typowych wartości, bo nie ma klawiatury. Problem zaczyna się przy tabelach szerokich:

- tabela pary jest wąska i bezpieczna,
- tabela wymiaru może wymagać przewijania poziomego,
- tabela krzyżowa na telefonie powinna mieć tryb "wybierz jednostkę, pokaż jedną kolumnę", ale bez JavaScriptu zostaje pełna tabela.

Gdy klawiatura jest otwarta, wynik własnej wartości powinien wchodzić jako wiersz tuż pod polem, nad pełną tabelą. Inaczej użytkownik wpisze liczbę i będzie musiał schować klawiaturę, żeby zobaczyć rezultat.

### Dla kogo najlepsza i najgorsza

Najlepsza dla zapytań, które mieszczą się w typowych wartościach: 1, 5, 10, 50, 100. Bardzo dobra dla SEO i dla użytkownika, który chce tylko potwierdzić liczbę.

Najgorsza dla pracy z nietypowymi wartościami, bo użytkownik i tak wraca do pola. Słabsza też dla huba, bo tabela nie zastąpi szybkiego dojścia do rzadkiej pary.

### Koszt budowy

Koszt: 2/5.

Uzasadnienie: statyczne tabele i linki są już wymagane przez architekturę. Interfejs dodaje tylko własny wiersz i prosty wybór pary. Trudność siedzi bardziej w układzie tabel na telefonie niż w logice.

## Tabela porównawcza

| Koncepcja | Scenariusz 1: 5 bar na psi, telefon, strona pary | Scenariusz 2: 50 lbf ft na Nm, komputer, hub | Scenariusz 3: nie znam nazwy, wiem że ciśnienie | Bez JavaScriptu | Trudność na telefonie | Koszt |
| --- | ---: | ---: | ---: | --- | --- | ---: |
| Para najpierw | 0 kliknięć i 0 wpisów z tabeli, albo 1 kliknięcie i 1 wpis | 3 kliknięcia i 1 wpis, przy braku skrótu 5 kliknięć i 1 wpis | 2 do 4 kliknięć, 0 wpisów | Bardzo dobre: odpowiedź, tabela, wzór i linki zostają | Niska, wynik jest przy polu | 2/5 |
| Wyszukiwarka jednostek z odpowiedzią | 0 kliknięć i 0 wpisów z tabeli, albo 1 kliknięcie i 1 wpis | 1 kliknięcie i 1 wpis | 2 kliknięcia i 1 wpis, ze strony wymiaru 1 do 2 kliknięć i 0 wpisów | Średnie: treść zostaje, główny mechanizm znika | Średnia, klawiatura jest częścią głównej ścieżki | 4/5 |
| Kafelki wymiaru i jednostki | 0 kliknięć i 0 wpisów z tabeli, albo 1 kliknięcie i 1 wpis | 4 kliknięcia i 1 wpis, przy skrócie 3 kliknięcia i 1 wpis | 2 kliknięcia, 0 wpisów | Bardzo dobre: wszystko da się przejść linkami | Niska do średniej, dużo klikania bez klawiatury | 3/5 |
| Ściąga z aktywnym wierszem | 0 kliknięć i 0 wpisów, jeśli 5 jest w tabeli | 2 kliknięcia i 0 wpisów, jeśli 50 jest w tabeli, inaczej 3 kliknięcia i 1 wpis | 1 do 2 kliknięć, 0 wpisów | Najlepsze: tabela jest główną treścią | Średnia, problemem są szerokie tabele | 2/5 |

## Rekomendacja

Rekomenduję połączenie koncepcji 1 i 3: "Para najpierw" jako główny model strony pary, plus "Kafelki wymiaru i jednostki" na hubie oraz stronach wymiarów.

Powód jest liczbowy. Najważniejszy scenariusz z Google ma 0 kliknięć przy tabeli albo 1 kliknięcie i 1 wpis przy własnej liczbie. Wejście przez hub do `50 lbf ft na Nm` ma 3 kliknięcia i 1 wpis, jeżeli para momentu jest w skrótach. Scenariusz "wiem tylko, że ciśnienie" ma 2 kliknięcia i 0 wpisów, bo użytkownik najpierw wybiera wymiar, a potem skanuje tylko 12 jednostek ciśnienia, nie 150 jednostek z całego narzędzia.

Koncepcja 2 jest kusząca, bo na komputerze skraca hub do 1 kliknięcia i 1 wpisu. Moim zdaniem warto ją dodać później jako pomocniczą wyszukiwarkę, ale nie jako fundament. Parser aliasów ma największe ryzyko cichych pomyłek, a przy jednostkach technicznych cicha pomyłka jest gorsza niż jedno kliknięcie więcej.

Koncepcja 4 powinna zostać jako warstwa treści, nie jako cały interfejs. Tabele typowych wartości są obowiązkowe dla SEO i świetne dla `5 bar`, ale nie rozwiązują pracy z nietypową liczbą ani rzadką parą.

## Rzeczy, które łatwo zepsuć

1. Zamiana kierunku przeliczenia

Przycisk `Zamień` nie może tylko zamienić etykiet. Musi zachować wpisaną wartość jako wartość źródłową albo jasno pokazać, co się stało. Najbezpieczniej: po kliknięciu `Zamień` pole nadal zawiera `5`, ale opis zmienia się z `5 bar to 72,519 psi` na `5 psi to 0,344738 bar`. Inaczej użytkownik może myśleć, że narzędzie odwróciło wynik.

2. Dokładność z definicji kontra zaokrąglenie

Wynik `1 cal = 25,4 mm` jest dokładny z definicji. Wynik wyświetlony jako `14,5038 psi` dla bara jest zaokrąglony, choć współczynnik bazowy może być dokładny. Interfejs musi rozdzielić dwie informacje: "współczynnik dokładny" i "wynik pokazany do 6 cyfr znaczących".

Proponowany zapis: `Współczynnik dokładny. Wynik zaokrąglony do 6 cyfr znaczących.`

3. Temperatura i różnica temperatur

To nie jest detal. `1 °C` jako temperatura to `33,8 °F`, ale różnica `1 °C` to `1,8 °F`. Wymiar temperatury musi mieć przełącznik `Temperatura` i `Różnica temperatur`. Nie wolno chować tego w przypisie pod wynikiem, bo użytkownik zobaczy liczbę wcześniej niż przypis.

4. Zero i wartości ujemne

Zero w skali Celsjusza i Fahrenheita jest normalną wartością temperatury, ale zero w skali Kelvina nie powinno pozwalać zejść niżej przy temperaturze bezwzględnej. Dla różnicy temperatur wartość ujemna ma sens. Dla ciśnienia ujemne wartości zależą od tego, czy mówimy o ciśnieniu absolutnym, względnym czy podciśnieniu. Interfejs nie powinien automatycznie blokować minusa we wszystkich wymiarach.

5. Ciśnienie kontra naprężenie

Silnik może mieć ten sam wymiar fizyczny, ale użytkownik szuka inaczej. `MPa na N/mm2` to w praktyce język wytrzymałości materiałów, a `bar na psi` to pneumatyka albo hydraulika. Jeżeli wszystko trafi do jednej strony "ciśnienie", konstruktor będzie skanował obce jednostki i dłużej szukał właściwej pary.

6. `Nm` kontra `nm`

W adresach i wyszukiwarce trzeba pilnować wielkości liter i znaczenia. `N m` albo `N·m` to niutonometr. `nm` to nanometr. W polu wyszukiwania wpis `Nm` powinien preferować moment, ale wpis `nm` przy długości powinien prowadzić do nanometra. To dobry przykład, dlaczego parser nie powinien bez pytania zgadywać wszystkiego.

7. `lbf ft`, `ft lbf` i nazwy z instrukcji

Użytkownik może przepisać symbol z instrukcji jako `lbft`, `ft-lb`, `lbf ft`, `lb ft`. Dane muszą mieć aliasy. Bez aliasów przelicznik będzie wyglądał, jakby nie znał jednostki, którą zna każdy klucz dynamometryczny z USA.

8. Jednostki potoczne i stare dokumentacje

`kgf`, `kG`, `at`, `KM`, `obr/min` są częścią przewagi tego narzędzia. Nie mogą być schowane na końcu listy jako egzotyka. Na stronach wymiarów powinny mieć swoje grupy, bo to właśnie na nich Google często nie pomaga dobrze.

9. Tabele orientacyjne udające przeliczenie

Ra na Rz, HRC na HB i mesh na mikrometry nie są zwykłym mnożeniem. Jeżeli interfejs pokaże je tak samo jak `bar na psi`, narzędzie samo podważy własną wiarygodność. Te strony powinny mieć inną etykietę: `orientacyjnie`, `z tabeli`, `nie ma jednej dokładnej wartości`.

10. Puste wyniki i kasowanie pola

Istniejące narzędzia dobrze rozdzielają pusty wpis od błędu. Przelicznik też powinien. Jeżeli użytkownik skasuje `5`, pole ma zostać puste, a nie zmienić się w `0`. Komunikat powinien brzmieć spokojnie: `Wpisz wartość, a przeliczę tę parę.`

11. Za długi wynik

Wartości bardzo małe i bardzo duże mogą rozwalić układ na telefonie. Wynik musi mieć format inżynierski albo kontrolowane zaokrąglenie. Przykład: zamiast długiego ciągu zer pokazać `3,2e-6 m`, a niżej `0,0000032 m`, jeżeli to pomaga.

12. Separator dziesiętny

Polski użytkownik wpisze `2,5`, a dokumentacja angielska da `2.5`. Oba formaty muszą działać. Wynik powinien domyślnie używać przecinka, bo taki jest język strony i istniejących narzędzi.

13. Jednostki kwadratowe i sześcienne

`mm2` i `mm^2` muszą prowadzić do `mm2`, tak samo `m3` i `m^3`. Użytkownik nie będzie szukał znaku indeksu górnego na telefonie. Interfejs może pokazać ładny symbol, ale wejście musi przyjmować zapis z klawiatury.

14. Zbyt dużo "sprytnych" automatyzmów

Jeżeli użytkownik wybierze `psi`, a narzędzie samo przestawi wymiar z ciśnienia na naprężenie, powstaje niepewność. Lepiej pokazać wybór: `psi w ciśnieniu` i `psi w naprężeniu`, gdy kontekst jest niejednoznaczny.

15. Ukrycie tabeli za interfejsem

Tabela typowych wartości nie jest dodatkiem. To ona daje odpowiedź bez JavaScriptu i może łapać fragmenty w wynikach wyszukiwania. Jeżeli interfejs zasłoni tabelę albo wstawi ją dopiero po kliknięciu, łamie główne założenie architektury.

## Propozycja tekstów interfejsu dla rekomendowanej koncepcji

### Hub

Nagłówek:

`Przelicznik jednostek dla konstruktora`

Lead:

`Wpisz wartość albo wybierz wymiar. Są tu jednostki z dokumentacji, katalogów i kluczy dynamometrycznych, nie tylko szkolne SI.`

Pole pomocnicze:

`Szukaj jednostki albo pary`

Placeholder:

`np. 50 lbf ft na Nm`

Etykieta listy wymiarów:

`Wybierz, co przeliczasz`

Sekcja skrótów:

`Najczęściej sprawdzane`

Komunikat braku wyniku wyszukiwania:

`Nie znalazłem takiej jednostki. Spróbuj symbolem z dokumentacji, np. psi, kgf albo lbf ft.`

### Strona wymiaru

Nagłówek przykładowy:

`Ciśnienie: przelicznik i tabela jednostek`

Lead:

`Bar, MPa, psi, at i słup wody w jednym miejscu. Najpierw wybierz parę, potem wpisz swoją wartość.`

Etykieta skrótów:

`Popularne pary`

Etykieta jednostek:

`Jednostki ciśnienia`

Grupy dla ciśnienia:

- `SI`
- `Praktyczne`
- `Techniczne`
- `Atmosferyczne i słup cieczy`
- `Anglosaskie`

Przycisk po wyborze jednostki:

`Przelicz z tej jednostki`

Pusty stan po wyborze tylko jednej jednostki:

`Wybierz drugą jednostkę. Zostawiłem tylko ciśnienie, żeby nie przewijać całej bazy.`

### Strona pary

Nagłówek przykładowy:

`Bar na psi: przelicznik i tabela`

Odpowiedź w HTML:

`1 bar to 14,5038 psi`

Etykieta pola:

`Wartość`

Jednostka przy polu:

`bar`

Wynik:

`5 bar to 72,519 psi`

Przycisk:

`Zamień`

Przycisk zmiany jednostki:

`Zmień jednostkę`

Etykieta tabeli:

`Typowe wartości`

Link do odwrotnej pary:

`Zobacz też: psi na bar`

Opis dokładności:

`Współczynnik dokładny. Wynik pokazuję do 6 cyfr znaczących.`

Puste pole:

`Wpisz wartość, a przeliczę tę parę.`

Błąd liczby:

`Nie czytam tej liczby. Użyj zapisu typu 2,5 albo 2.5.`

Błąd jednostki:

`Ta para nie pasuje do jednego wymiaru. Sprawdź, czy nie mieszasz np. ciśnienia z momentem.`

Temperatura, wybór trybu:

- `Temperatura`
- `Różnica temperatur`

Komunikat temperatury:

`Uwaga: temperatura i różnica temperatur liczą się inaczej. 1 °C to 33,8 °F, ale różnica 1 °C to 1,8 °F.`

Przeliczenia orientacyjne:

`To nie jest dokładne przeliczenie. Pokazuję zakres z tabeli, bo jedna wartość byłaby udawaniem dokładności.`

### Mikrocopy zgodne z tonem strony

Zamiast:

`Nieprawidłowe dane wejściowe`

Lepiej:

`Nie czytam tej liczby.`

Zamiast:

`Wybierz jednostkę docelową z listy`

Lepiej:

`Na co przeliczyć?`

Zamiast:

`Brak rezultatów dla wprowadzonego zapytania`

Lepiej:

`Nie znalazłem takiej jednostki.`

Zamiast:

`Konwersja orientacyjna`

Lepiej:

`Tylko orientacyjnie`

Zamiast:

`Wynik został skopiowany do schowka`

Lepiej:

`Skopiowano wynik`

