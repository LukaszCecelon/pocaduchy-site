# Chropowatość powierzchni w budowie maszyn: kontrola danych i zalecenia projektowe

**Werdykt:** dane z `src/lib/chropowatosc/dane.js` nadają się do publikacji warunkowo, po dodaniu źródeł i kilku zastrzeżeń. Spośród 29 rekordów sześć wymaga interwencji redakcyjnej. Trzy zawierają wartość niepotwierdzoną albo źle opisaną: erozja wgłębna `Ra 0,45...0,45`, przecinanie palnikiem `Rz max 1000` oraz docieranie `Ra max 0,21`. Trzy kolejne nie wyglądają na błąd technologiczny, lecz ich obecny opis wprowadza w błąd: bardzo szerokie „normalne” zakresy odlewania ciśnieniowego i kokilowego oraz pozorna dokładność `Ra max 0,34` dla gładzenia o krótkim skoku. Pozostałe 23 rekordy są sensowne jako szerokie obwiednie możliwości procesu. Podejrzane `Ra min 0,025` po dogniataniu jest osiągalne i nie zalicza się do tych sześciu.

Dokument sprawdzono 11 sierpnia 2026 r. Wszystkie wartości Ra, Rz, Rmax, Rt, Rpk, Rvk i głębokości profilu podano w µm, o ile nie zaznaczono inaczej. Znak `≤` oznacza wymaganie maksymalne. Zakres bez tego znaku opisuje zalecane okno, w którym także zbyt mała wartość może być niekorzystna.

## Najważniejszy wniosek dla strony

Tablica metod i tablica zastosowań powinny być rozdzielone:

1. Tablica metod odpowiada na pytanie, jaki rząd chropowatości proces może osiągnąć. Jest to informacja technologiczna, nienormatywna i silnie zależna od materiału, narzędzia, parametrów oraz stanu maszyny.
2. Tablica zastosowań odpowiada na pytanie, co wpisać na rysunku. Jest to wymaganie funkcjonalne. Należy je najpierw brać z katalogu wybranego łożyska, uszczelnienia, panewki, kleju albo powłoki, a dopiero przy braku danych stosować zakres ogólny.
3. Wartości `min`, `od...do` i `max` z obecnej tablicy nie powinny być prezentowane jako trzy klasy normowe. Lepsze nazwy to „osiągalne specjalnie”, „spotykany zakres” i „zgrubna granica spotykana w zestawieniach”. Słowo „normalny” jest zbyt mocne dla szerokich obwiedni obejmujących wiele materiałów i odmian procesu.

## 1. Kontrola 29 metod obróbki

### Ra i Rz nie są przeliczalne jednym współczynnikiem

Ra jest średnią arytmetyczną bezwzględnych odchyleń profilu od linii średniej. Rz opisuje wysokości wybranych wierzchołków i wgłębień według konkretnej definicji normowej. Dwie powierzchnie o takim samym Ra mogą mieć bardzo różne głębokie rysy, udział materiałowy i zdolność utrzymania oleju.

Reguła `Rz około 4 do 7 Ra` jest użyteczna wyłącznie jako szybki test rzędu wielkości, nie jako wzór. Poważne źródła pokazują również inne relacje:

- Sunnen dla jednorodnej, jednokamieniowej powierzchni honowanej podaje przybliżony współczynnik 7,2 dla Rz i 7,6 dla `Rz ISO`, lecz jednocześnie zabrania stosowania go do plateau honing, powierzchni złożonych i innych metod obróbki. [Sunnen-Honing]
- Uddeholm podaje rzeczywiste pary dla powierzchni początkowych: szlifowana `Ra 0,5 / Rz 5`, HSM `Ra 0,2 / Rz 1,5` i EDM `Ra 3 / Rz 15`. Odpowiada to relacjom odpowiednio 10, 7,5 i 5. [Uddeholm-Polishing]
- Kemet zaznacza, że jego zestawienie równoważności jest tylko przybliżeniem, a błąd zależny od charakteru powierzchni może wynosić około 25%. [Kemet-Comparison]

Dlatego niespójność skrajnych wartości Ra i Rz w `dane.js` nie dowodzi błędu. `ra.max` i `rz.max` pochodzą z niezależnych obwiedni i nie muszą opisywać tej samej próbki. Błędem byłoby dopiero pokazanie ich w jednym wierszu tak, aby czytelnik uznał je za sparowane wyniki. Na stronie potrzebna jest uwaga: „Zakresy Ra i Rz zweryfikowano niezależnie. Nie wolno dzielić jednej kolumny przez drugą ani przeliczać wartości”.

### Tabela pozycji wątpliwych i kontrolnych

| Metoda | Wartość w `dane.js` | Dane niezależne | Ocena i rekomendacja |
|---|---:|---|---|
| Erozja wgłębna | Ra normalne `0,45...0,45`; min `0,2`; max `6,3` | Uddeholm podaje typową powierzchnię początkową EDM `Ra 3`, a nowoczesne odmiany poniżej `Ra 0,07`. GF deklaruje najlepsze `Ra 0,1`. [Uddeholm-Polishing] [GF-EDM] | **Nie potwierdzono zakresu `0,45...0,45`.** To pojedynczy punkt zapisany jako zakres. Najuczciwiej pokazać `Ra 0,45` jako wartość z materiału źródłowego, bez etykiety „zakres normalny”. Jeśli struktura wymaga zakresu, ustawić `od` i `do` na `null` do czasu kontroli skanu. Nie zastępować po cichu zakresem `0,4...3`, choć taki rząd jest praktycznie wiarygodny. |
| Przecinanie palnikiem | `Rz 16; 40...100; max 1000`; `Ra 3,2; 8...16; max 50` | ISO 9013 opisuje `Rz5`, nie Ra. Dla najgorszego sklasyfikowanego zakresu 4 granica wynosi `110 + 1,8a`, gdzie `a` jest grubością w mm. Przy maksymalnej objętej normą grubości 300 mm daje to 650 µm. [ISO-9013] [ISO-9013-Copy] | `Rz 1000` jest możliwe jako bardzo zła krawędź, wada miejscowa albo wartość spoza klas jakości, ale **nie zostało potwierdzone jako zwykła granica procesu**. Rekomendacja: usunąć `max 1000` albo opisać „poza zakresem jakości ISO 9013, wartość źródłowa niepotwierdzona”. `Ra max 50` pozostawić wyłącznie jako niezależną obwiednię. Stosunek 20 nie ma znaczenia, bo maksima nie są parą pomiarową. |
| Docieranie | `Ra 0,006; 0,025...0,2; max 0,21`; `Rz max 10` | Wzorce Rubert dla docierania płaskiego i cylindrycznego obejmują `Ra 0,025...0,2`, z `Rz 0,4...1,6`. Kemet pokazuje wyniki `Ra 0,0971`, około `0,025` i poniżej `0,01` w specjalnych zastosowaniach. [Rubert] [Kemet-Lapping] [Kemet-Valve] | Normalny zakres jest dobrze potwierdzony. **Nie potwierdzono sensu osobnego maksimum `0,21`.** Jest tylko o 0,01 większe od końca zakresu i ma fałszywą precyzję. Zalecenie: `max: null`, chyba że skan wyraźnie podaje 0,21 jako wynik pomiaru. `Rz max 10` może należeć do zgrubnego docierania, ale nie jest zgodne z wzorcami precyzyjnymi Rubert i nie powinno być łączone z `Ra 0,21`. |
| Gładzenie o krótkim skoku, superfinish | `Ra max 0,34` | Supfina deklaruje po superfinish `Ra < 0,05`. Thielenhaus pokazuje konkretny wał przed procesem `Ra 0,3497` i po procesie `Ra 0,0621`. [Supfina] [Thielenhaus] | Wartość `0,34` jest technologicznie możliwa, ale wygląda na zaokrąglony wynik konkretnego pomiaru wejściowego, nie uniwersalną granicę. Zachować po zmianie opisu na „spotykana zgrubna granica około 0,3” albo zaokrąglić do `0,3`. Nie przedstawiać trzech cyfr znaczących jako zalecenia. |
| Walcowanie, dogniatanie | `Ra min 0,025`; `Rz min 0,1` | ECOROLL podaje osiągalne `Ra 0,05...0,4` i `Rz 0,5...2`, a dla typowych powierzchni wartości poniżej `Ra 0,1` i `Rz 1`. Baublies opisuje wyniki poniżej `Ra 0,01`; katalogi narzędzi pokazują także `Ra 0,025`. [Ecoroll-Omega] [Ecoroll-Process] [Baublies] | **Wartość potwierdzona jako ambitna granica specjalna.** Para `Rz 0,1 / Ra 0,025` daje relację 4 i sama w sobie nie jest podejrzana. Pozostawić, lecz nie sugerować, że każda odmiana dogniatania osiągnie `Ra 0,025`. |
| Odlewanie ciśnieniowe | Ra normalne `0,8...30` | Groover podaje typowo `Ra 1...2` dla odlewania ciśnieniowego. Szerokie poradniki procesowe umieszczają tę metodę w znacznie szerszym polu, zależnym od stopu, stanu formy i wad. [Groover] [EngineeringToolbox] | Dolna część jest wiarygodna, lecz `Ra 30` jako „normalne” jest zbyt szerokie. Nie wygląda na oczywistą pomyłkę przepisywania, ale wymaga etykiety „pełna obwiednia spotykana w poradnikach” albo ponownej kontroli źródła. |
| Odlewanie kokilowe | Ra normalne `3,2...50` | Niezależne zestawienia lokują odlewanie w formie trwałej zwykle znacznie bliżej kilku µm Ra niż 50 µm. [Groover] [EngineeringToolbox] | `Ra 50` może opisywać złą powierzchnię, nie typowy wynik kokili. Jak wyżej: nie usuwać bez skanu, ale nie nazywać całego zakresu normalnym. |
| Cięcie plazmą, przykład niesparowanych kolumn | `Rz 6...280`; `Ra 1...10` | ISO 9013 klasyfikuje krawędź przez `Rz5` zależne od grubości. Hypertherm wskazuje zwykle zakres jakości ISO 2 do 4 dla plazmy. [ISO-9013] [Hypertherm] | Sam zakres Rz jest możliwy dla różnych grubości i klas. Iloraz 28 uzyskany z dwóch końców nie jest dowodem błędu. Na stronie nie ustawiać Ra i Rz naprzeciw siebie jako równoważnych progów. |

### Kontrola wszystkich 29 rekordów według rodzin

To nie jest przepisanie cudzej tabeli. Poniższe porównanie służy wyłącznie ocenie rzędu wielkości i kompletności kontroli.

| Rodzina i liczba rekordów | Niezależny punkt odniesienia | Werdykt |
|---|---|---|
| Odlewanie: 3 | Groover: die casting typowo `Ra 1...2`, sand casting `Ra 12...25`. [Groover] | Kolejność jakości jest poprawna. Piasek `12,5...50` jest szeroką, ale sensowną obwiednią. Ciśnieniowe i kokilowe mają zbyt szeroki zakres nazwany „normalnym”, jak opisano wyżej. |
| Spiekanie: 2 | Nie znaleziono równie dobrego, otwartego katalogu podającego porównywalne Ra i Rz dla „spiekania normalnego” i „kalibrowanego” bez wskazania materiału i gęstości. | Kolejność `kalibrowane` lepsze od `normalnego` jest logiczna. Konkretne liczby pozostają **niepotwierdzone niezależnie**. Nie wykryto cechy typowej dla błędu przepisywania. |
| Obróbka plastyczna: 5 | Groover: cold extrusion `Ra 1...4`, sheet draw `Ra 1...3`, forging od kilku do kilkunastu µm. ECOROLL potwierdza dogniatanie poniżej `Ra 0,1`. [Groover] [Ecoroll-Process] | Rząd i kolejność są sensowne. Zakresy wyciskania, kucia i wytłaczania obejmują także bardzo zgrubne warianty, więc „spotykany” jest lepsze niż „normalny”. Dogniatanie potwierdzone. |
| EDM: 2 | Uddeholm: typowo `Ra 3 / Rz 15`; GF: nowoczesna erozja wgłębna najlepiej `Ra 0,1`; Makino: specjalna WEDM olejowa do `Ra 0,02`. [Uddeholm-Polishing] [GF-EDM] [Makino-WEDM] | Obwiednie obu metod są wiarygodne. Punkty minimalne zależą od klasy maszyny. Jedyny wyraźny problem to pojedyncze `0,45` zapisane jako zakres. |
| Cięcie termiczne: 3 | ISO 9013 uzależnia `Rz5` od grubości; Hypertherm podaje laser zwykle w zakresie ISO 1 do 2, plazmę 2 do 4. [ISO-9013] [Hypertherm] | Kolejność laser, plazma, palnik jest poprawna, ale liczby bez grubości materiału są tylko orientacyjne. `Rz 1000` dla palnika pozostaje niepotwierdzonym ekstremum. |
| Gilotyna i strumień wody: 2 | Ogólne poradniki możliwości procesów pokazują bardzo szerokie pola zależne od strefy krawędzi i jakości cięcia. [EngineeringToolbox] | Nie wykryto oczywistego błędu liczbowego. Dla waterjet trzeba w przyszłości rozróżnić górę, środek i dół krawędzi oraz klasę jakości. |
| Otwory: 4 | Groover: drilling `Ra 1,5...6`, boring `0,5...6`, reaming `1...3`. Rubert: wzorce rozwiercania `Ra 0,4...3,2`, `Rz 1,6...16`. [Groover] [Rubert] | Zakresy normalne są zgodne co do rzędu. Wspólny rekord „wytaczanie i rozwiercanie” jest zbyt szeroką kategorią, ale nie wskazuje na pomyłkę. `Ra min 0,05` wymaga procesu specjalnego i nie powinno być obietnicą zwykłego wytaczania. |
| Toczenie: 2 | Rubert: wzorce toczenia wzdłużnego i poprzecznego `Ra 0,4...50`, `Rz 1,6...160`. [Rubert] | Zakresy Ra są niemal zgodne z niezależnymi wzorcami. `Rz max 250` jest szersze, lecz możliwe jako zgrubna obwiednia, nie typowy wynik. |
| Frezowanie: 1 | Rubert: frezowanie czołowe `Ra 0,4...50`, `Rz 1,6...160`. [Rubert] | Obecne `Ra 0,4...25` i `Rz 1,6...160` są sensowne. |
| Wykańczanie ścierne: 5 | Rubert: szlifowanie `Ra 0,025...3,2`, docieranie `0,025...0,2`. Supfina: superfinish poniżej `Ra 0,05`. Sunnen pokazuje dla honowania zakres zależny od materiału i ziarna od setnych do ponad 1 µm Ra. [Rubert] [Supfina] [Sunnen-Honing] | Rząd wielkości wszystkich pięciu metod jest prawidłowy. Do korekty pozostają znaczenie `0,34` i zbędne `0,21`. Minima `0,006` są specjalnymi granicami, nie wynikiem ekonomicznym. |

### Rekomendowane zmiany przed publikacją części 1

- Zachować 29 metod, ale zmienić opisy zakresów na obwiednie technologiczne.
- Przy `erozja wgłębna, Ra` pokazać pojedyncze `0,45` jako punkt ze źródła, nie zakres.
- Przy palniku nie publikować `Rz max 1000` bez etykiety „niepotwierdzone ekstremum poza typowym zakresem ISO 9013”.
- Przy docieraniu ustawić `Ra max` jako brak danych, chyba że ponowny odczyt skanu potwierdzi znaczenie `0,21`.
- Przy krótkim skoku zaokrąglić granicę `0,34` do około `0,3` albo wyjaśnić, że to wartość empiryczna.
- Dodać źródło na poziomie rekordu lub pojedynczego pola. Zakres z jednego poradnika nie może wyglądać jak norma.
- Nie wyświetlać automatycznie ilorazu Rz/Ra i nie generować jednej kolumny z drugiej.

## 2. Jakie Ra wpisać w konkretnym miejscu maszyny

### Jak czytać zalecenia

Wartość w kolumnie „typowe Ra” jest punktem startowym dla konstruktora, nie zamiennikiem katalogu konkretnego elementu. Gdy producent podaje maksimum, na rysunku należy wpisać maksimum, na przykład `Ra 0,4`, a nie zakres `0,2...0,4`. Wąski zakres należy wpisywać tylko wtedy, gdy dolna granica ma znaczenie funkcjonalne, jak przy uszczelnieniu wargowym. Przy powierzchniach uszczelniających, honowanych i ślizgowych trzeba często dodać Rz, Rmax, Rpk, Rvk, Rmr, kierunek śladów albo zakaz śladu śrubowego.

### 2.1. Łożyska toczne, połączenia i pasowania

| Zastosowanie | Typowe Ra na rysunku | Uzasadnienie i różnice źródeł | Źródło |
|---|---:|---|---|
| Łożysko kulkowe, czop wału z wciskiem, zwykła dokładność | `Ra ≤ 0,8` dla gniazda do 80 mm przy IT6; `Ra ≤ 1,6` dla 80 do 500 mm | SKF wiąże Ra przede wszystkim ze średnicą i klasą tolerancji, nie z samą nazwą pasowania. Przy IT5 wartości spadają odpowiednio do `0,4` i `0,8`. Wcisk nie zwalnia z kontroli okrągłości i walcowości. | [SKF-Bearings] |
| Łożysko kulkowe, czop wału z pasowaniem luźnym lub przejściowym | Zwykle `Ra ≤ 1,6`; przy dokładnym pozycjonowaniu `Ra ≤ 0,8` | Samo zmniejszenie Ra nie tworzy pasowania suwliwego. Luz wynika z pól tolerancji. Zbyt chropowata powierzchnia ułatwia fretting i fałszuje efektywny luz, natomiast wymóg ostrzejszy niż IT i geometria zwykle nie daje korzyści. | [SKF-Bearings] [NTN-Fits] |
| Łożysko kulkowe, gniazdo w korpusie z wciskiem | Zwykle `Ra ≤ 1,6`; dla dużych lub mniej krytycznych gniazd `Ra ≤ 3,2` tylko po akceptacji producenta | SKF pozwala dla zwykle dokładnie toczonych gniazd korpusowych na klasę Ra o jeden stopień luźniejszą niż dla gniazd szlifowanych. Wcisk i cienkościenny korpus wymagają kontroli odkształcenia, nie tylko Ra. | [SKF-Bearings] |
| Łożysko kulkowe, luźne gniazdo pierścienia nieruchomego w korpusie | `Ra 1,6...3,2` | Luźne gniazdo umożliwia montaż lub przemieszczenie osiowe, ale nie może dopuścić do pełzania pierścienia. NTN ostrzega, że zbyt luźne pasowanie powoduje zużycie, drgania, a nawet pęknięcie pierścienia. Ra nie zastępuje doboru pola tolerancji. | [SKF-Bearings] [NTN-Fits] |
| Łożysko wałeczkowe walcowe lub baryłkowe, czop wału z wciskiem | `Ra ≤ 1,6`; przy wyższej dokładności `0,8` lub mniej | Timken zaleca dla obracającego się wału i nieruchomej oprawy szlifowany czop do `Ra 1,6`. Toczone `Ra 3,2` jest dopuszczalne w wielu zastosowaniach, lecz producent każe wtedy nieco zwiększyć wcisk. | [Timken] |
| Łożysko wałeczkowe, luźny czop albo powierzchnia pod pierścień przesuwny | Zwykle `Ra ≤ 1,6`; dla precyzyjnego przesuwu osiowego `Ra ≤ 0,8` | Luźne pasowanie wymaga zachowania prowadzenia i ograniczenia frettingu. Nie znaleziono oddzielnej uniwersalnej liczby tylko dlatego, że pasowanie jest luźne. Punkt startowy pozostaje taki jak dla dokładnego gniazda SKF. | [SKF-Bearings] [Timken] |
| Łożysko wałeczkowe, gniazdo w korpusie, wcisk lub pasowanie luźne | `Ra ≤ 3,2` w zastosowaniu ogólnym | Timken podaje `Ra 3,2 max` dla otworów opraw. To samo maksimum może dotyczyć wcisku i luzu, ponieważ o rodzaju pasowania rozstrzyga wymiar. Przy wysokiej dokładności trzeba zejść niżej. | [Timken] |
| Łożysko stożkowe precyzyjne, czop i oprawa | Klasa zwykła C: wał `Ra ≤ 0,8`, oprawa `≤ 1,6`; klasy B, A, AA: wał odpowiednio `0,6`, `0,4`, `0,2`, oprawa `0,8`, `0,6`, `0,4` | To jeden z niewielu katalogów, który wiąże Ra bezpośrednio z klasą precyzji. Jest wiarygodniejszy od ogólnej tabeli, gdy wybrano łożysko Timken tej klasy. | [Timken] |
| Połączenie wciskane wał-piasta, także bez łożyska | Najczęściej `Ra 0,8...1,6`; toczenie `Ra 3,2` tylko po uwzględnieniu utraty wcisku | Wierzchołki profilu zgniatają się podczas wciskania. SKF wprost mówi o zmniejszeniu interferencji przez wygładzenie. NTN podaje poprawkę rzędu `1,0...2,5 µm` dla szlifowanego wału; dla powierzchni toczonej utrata jest większa. Nie należy odejmować wielokrotności Ra według uniwersalnego wzoru. | [SKF-Bearings] [NTN-Catalog] |
| Pasowanie suwliwe dokładne, prowadzące bez uszczelnienia | Punkt startowy `Ra 0,8...1,6` | To zalecenie warsztatowe, nie wartość wynikająca z ISO 286. Ra musi być małe wobec luzu, lecz ważniejsze są walcowość, prostoliniowość, twardość, smarowanie i brak gratu. Dla elementu katalogowego obowiązuje wartość producenta. | [SKF-Bearings] [Manual-Drawing] |
| Pasowanie ruchowe z większym luzem, wolny ruch | Punkt startowy `Ra 1,6...3,2` | Ostrzejsze `Ra 0,8` zwykle nie daje korzyści, jeśli luz, obciążenie i film smarny są duże. To zakres projektowy do walidacji, a nie norma. | [Manual-Drawing] [Groover] |
| Powierzchnia oporowa pod pierścień łożyska lub pierścień dystansowy | Zwykle `Ra 0,8...1,6`; dla układu ogólnego nie więcej niż `3,2` | Timken wymaga przede wszystkim prostopadłości i płaskości barku względem osi gniazda. Chropowatość nie naprawi bicia czołowego. Dla łożysk precyzyjnych należy przyjąć poziom odpowiadający gniazdu. | [Timken] |
| Czoło pod nakrętkę regulacyjną łożyska | Punkt startowy `Ra ≤ 1,6` przy regulacji dokładnej; `Ra ≤ 3,2` w układzie zwykłym | Timken każe kontrolować bicie czoła nakrętki, lecz nie podaje jednego Ra. Podana liczba jest konserwatywnym standardem zakładowym. Ważniejsze są prostopadłość, płaskość i powtarzalność momentu. | [Timken] |
| Powierzchnia pod zwykłą nakrętkę lub podkładkę konstrukcyjną | Punkt startowy `Ra 3,2...6,3`; **niepotwierdzone jako wartość uniwersalna** | Chropowatość wpływa na tarcie i rozrzut siły zacisku. Zbyt gładka lub powlekana powierzchnia może zmienić współczynnik tarcia, dlatego ostatecznie decyduje procedura dokręcania i badanie połączenia. | [Nord-Lock] |
| Rowek pod pierścień osadczy | Punkt startowy `Ra 3,2`; przy dużych obciążeniach ścianki `Ra ≤ 1,6`; **brak wartości uniwersalnej** | Katalogi Seeger i Smalley skupiają się na średnicy, szerokości, promieniu naroża, podparciu ścianki i odległości od krawędzi. Nie znaleziono wiarygodnej powszechnej wartości Ra. Nie wolno zastępować nią geometrii rowka i usunięcia gratu. | [Seeger] [Smalley] |
| Połączenie wpustowe stałe | Punkt startowy: boki rowka `Ra 1,6...3,2`, dno `Ra 3,2...6,3`; **niepotwierdzone normowo** | Moment przenoszą boki, nie dno. Ważniejsze są szerokość, pasowanie, promień dna i naciski powierzchniowe. Nie znaleziono katalogu producenta ani normy wpustów narzucającej uniwersalne Ra. | [Rubert] |
| Wielowypust stały, frezowany lub dłutowany | Typowo `Ra 1,6...3,2` na bokach; precyzyjnie szlifowany `Ra ≤ 1,6` | Producent szlifowanych wielowypustów podaje `Ra 1,6` dla klasy dokładności 7, ale ISO 4156 nie daje prostego uniwersalnego mapowania klasy na Ra. Liczbę należy potwierdzić z wykonawcą i sposobem centrowania. | [Spline-Manufacturer] [ISO-4156] |
| Wielowypust przesuwny pod obciążeniem | Punkt startowy `Ra 0,8...1,6` na bokach i średnicy centrującej; **zależne od smarowania i klasy** | Przesuw wymaga ograniczenia zużycia i stick-slip. Zakres jest ostrzejszy niż dla połączenia stałego, lecz nie został potwierdzony jako wymóg DIN 5480 lub ISO 4156. | [Spline-Manufacturer] [GGB] |

**Wniosek o łożyskach:** nie znaleziono uzasadnienia dla prostego hasła „kulkowe zawsze Ra 0,8, wałeczkowe zawsze Ra 1,6”. Różnice wynikają przede wszystkim z średnicy, klasy dokładności, tego który pierścień obraca się względem obciążenia, wcisku, sztywności oprawy i możliwości przesuwu osiowego. Podział na typy łożysk jest przydatny, ale nie może zastąpić katalogu i doboru pasowania.

### 2.2. Uszczelnienia

| Zastosowanie | Typowe Ra na rysunku | Uzasadnienie i różnice źródeł | Źródło |
|---|---:|---|---|
| Czop pod promieniowe uszczelnienie wargowe, Simmering | Preferowane `Ra 0,20...0,43`, szlifowanie wgłębne bez posuwu osiowego, kierunkowość `0 ± 0,05°` | Parker podaje wąskie okno `0,20...0,43` i zero lead. SKF pokazuje trzy zależne od metody oceny okna: ISO `0,2...0,5`, DIN `0,2...0,8`, RMA `0,2...0,43`. Dolna granica jest funkcjonalna: gładszy czop pogarsza dopływ środka smarnego pod wargę. Na rysunku należy podać także zakaz śladu śrubowego i brak rys przecinających tor wargi. | [Parker-Rotary] [SKF-Seals] |
| Gniazdo zewnętrznej średnicy uszczelnienia wargowego | `Ra ≤ 3,2`; dla trudnego uszczelnienia metalowego korpusu warto zacząć od `1,6...2,5` | SKF uznaje `Ra 3,2` za wystarczające do ograniczenia przecieku między oprawą a zewnętrzną średnicą uszczelnienia. Elastomerowa lub powlekana średnica zewnętrzna lepiej kompensuje niedoskonałości niż goły metal. | [SKF-Seal-Analysis] [Parker-Rotary] |
| O-ring statyczny, powierzchnia uszczelniająca, ciśnienie niepulsujące | `Ra ≤ 1,6` | Parker podaje `Ra 1,6`, `Rmax 6,3` i udział materiałowy ponad 50%. Sama średnia Ra nie wyklucza głębokiej rysy tworzącej kanał przecieku. | [Parker-Oring] |
| O-ring statyczny, powierzchnia uszczelniająca, ciśnienie pulsujące | `Ra ≤ 0,8` | Pulsowanie wymaga dwukrotnie gładszej powierzchni kontaktowej według tabeli Parkera. | [Parker-Oring] |
| O-ring dynamiczny, powierzchnia współpracująca | `Ra ≤ 0,4`, `Rmax ≤ 1,6` | Parker podaje te same maksima dla ciśnienia pulsującego i niepulsującego. Dla dużych prędkości, gazu, próżni albo nietypowej mieszanki trzeba użyć karty konkretnego uszczelnienia. | [Parker-Oring] |
| O-ring, dno i boki rowka statycznego | Niepulsujące `Ra ≤ 3,2`; pulsujące `Ra ≤ 1,6` | Dno rowka nie jest główną powierzchnią ślizgową, dlatego może być bardziej chropowate niż powierzchnia kontaktowa. Parker podaje także odpowiednio `Rmax 12,5` i `6,3`. | [Parker-Oring] |
| O-ring, dno i boki rowka dynamicznego | `Ra ≤ 1,6`, `Rmax ≤ 6,3` | Chropowatość jest łagodniejsza niż na powierzchni ruchowej, ale grat i ostre krawędzie mogą przeciąć O-ring przy montażu. | [Parker-Oring] |
| Miękka uszczelka płaska, włóknista, grafitowa, elastomerowa | Najczęściej `Ra 3,2...6,3`; dla niektórych miękkich uszczelek producenci dopuszczają szerszy zakres | Profil powinien dawać „ząb” ograniczający wydmuchanie i ślizganie, ale nie może tworzyć promieniowego kanału przecieku. Teadit podaje jako najczęstszy handlowy profil stalowego kołnierza `Ra 3,2...6,3`. Ostatecznie obowiązuje karta uszczelki. | [Teadit] |
| Uszczelka spiralnie zwijana | `Ra 3,2...6,3` | Flexitallic podaje 125 do 250 µin Ra, czyli około `3,2...6,3`. Zbyt gładki kołnierz zmniejsza odporność uszczelki na przesuw, zbyt głębokie rowki tworzą ścieżkę przecieku. | [Flexitallic] [Teadit] |
| Uszczelka pełnometalowa albo metalowa bez miękkiej warstwy | Zwykle `Ra ≤ 1,6`; dla bardzo sztywnego uszczelnienia punkt startowy `Ra ≤ 0,8` | Teadit stwierdza, że pełne uszczelki metalowe wymagają gładszego kołnierza niż niemetalowe. Parker dla metalowych uszczelnień zaleca `Ra 0,8` lub lepiej. Wymaganie zależy od materiału, nacisku i dopuszczalnego przecieku. | [Teadit] [Parker-Metal-Seal] |
| Bezpośrednie uszczelnienie metal-metal, docierane gniazdo zaworu | Typowo `Ra 0,01...0,1` plus wymaganie płaskości lub kształtu | Kemet dla docieranych zasuw i gniazd podaje zakres od `Ra 0,1` do lepszego niż `0,01`, z konkretnymi wynikami `0,0218` i `0,025`. Sama wartość Ra nie zapewnia szczelności, jeżeli brak płaskości, współosiowości lub właściwej szerokości styku. | [Kemet-Valve] |

### 2.3. Prowadzenie, pary ślizgowe i cylindry

| Zastosowanie | Typowe Ra na rysunku | Uzasadnienie i różnice źródeł | Źródło |
|---|---:|---|---|
| Zewnętrzna bieżnia rolkowej prowadnicy liniowej wykonywana w korpusie | `Ra ≤ 0,4`; `Ra około 0,8` tylko gdy dopuszczalne jest lekkie zużycie początkowe | THK podaje te dwie wartości wprost. Twardość, prostoliniowość i montaż pod obciążeniem są równie ważne. | [THK-Raceway] |
| Wałek pod tuleję liniową kulkową | `Ra ≤ 0,4` | THK podaje `Ra 0,4` lub mniej dla standardowych wałków LM. Należy równocześnie kontrolować prostoliniowość, twardość i tolerancję średnicy. | [THK-Shaft] |
| Prowadnica ślizgowa smarowana, metal-metal | Punkt startowy `Ra 0,4...0,8` na powierzchni ruchowej; **brak jednej wartości dla wszystkich par** | Za gładka powierzchnia może mieć gorsze warunki filmu smarnego i docierania, a za szorstka zwiększa zużycie. Dobór zależy od materiałów, nacisku, prędkości, oleju, rowków i skrobania. Nie należy zastępować tekstury skrobanej pojedynczym Ra. | [SKF-Tribology] [Polytec] |
| Tuleja kompozytowa PTFE, stalowa powierzchnia współpracująca | `Ra ≤ 0,4`; w wymagających warunkach `Ra ≤ 0,3` | SKF podaje dla tulei PTFE `Ra 0,4 / Rz 3`, a w cięższych warunkach `Ra 0,3 / Rz 2`. Ważna jest twardość i brak ostrych śladów. | [SKF-Plain] |
| Tuleja kompozytowa POM, stalowa powierzchnia współpracująca | `Ra ≤ 0,8`, `Rz ≤ 6` | POM toleruje nieco bardziej chropowatą powierzchnię niż PTFE. | [SKF-Plain] |
| Sucha tuleja polimerowa iglidur G | Cel `Ra około 0,8` | igus ostrzega, że wał zbyt gładki zwiększa tarcie i zużycie, a zbyt szorstki działa jak pilnik. Jest to wartość materiałowa, nie uniwersalna dla wszystkich polimerów. Dla innych mieszanek producent podaje inne optimum, na przykład `Ra 0,6...0,7`. | [igus-G] [igus-A160] |
| Tuleje ślizgowe i panewki metalowe hydrodynamiczne | **Nie ma uniwersalnego Ra.** Jako punkt startowy dla czopa szlifowanego `Ra 0,2...0,4`, ale wymaga potwierdzenia z katalogiem panewki | Nośność zależy od luzu, lepkości, prędkości, geometrii, materiału panewki i profilu czopa. Wartość pochodząca z tulei PTFE lub polimerowej nie może być przenoszona na panewkę bimetaliczną. | [SKF-Plain] [SKF-Tribology] |
| Tłoczysko lub powierzchnia dynamiczna siłownika, uszczelnienie PTFE | `Ra 0,05...0,30`, `Rz 0,6...2,0`, `Rmr 50...70%` | Trelleborg podaje pełne okno topografii. Ra bez Rz, Rpk, Rvk i udziału materiałowego jest niewystarczające, bo szlifowana powierzchnia z ostrymi szczytami może mieć właściwe Ra i niszczyć uszczelnienie. | [Trelleborg-Counter] |
| Tłoczysko lub powierzchnia dynamiczna siłownika, uszczelnienie TPU | `Ra 0,05...0,40`, `Rz 0,6...2,0` | TPU dopuszcza nieco wyższe Ra niż PTFE. Konkretna karta profilu uszczelnienia ma pierwszeństwo. | [Trelleborg-Counter] |
| Tuleja cylindra hydraulicznego honowana | Dla PTFE `Ra 0,05...0,30`; dla TPU `0,05...0,40`, ale obowiązkowo z parametrami plateau | Gładzenie krzyżowe tworzy doliny na olej i spłaszczone pola nośne. Sunnen podkreśla, że kontrolowany crosshatch utrzymuje olej lub smar i zapewnia uszczelnienie pierścieni. Nie wpisywać tylko `Ra 0,2` bez Rz/Rpk/Rvk/Rmr i kierunku śladów. | [Trelleborg-Counter] [Sunnen-Cylinder] |
| Rowek uszczelnienia tłokowego lub tłoczyskowego, powierzchnia statyczna | Zwykle `Ra ≤ 1,6`; dla powierzchni statycznej bez ruchu Parker podaje także `Ra 0,8` w zależności od profilu | Parker zaznacza, że wymagania zależą od materiału uszczelnienia, a PTFE wymaga gładszej powierzchni niż poliuretan i większość gum. Należy użyć rysunku montażowego konkretnego profilu. | [Parker-Hydraulic] [Parker-Hydraulic-EU] |

### 2.4. Zęby kół zębatych

Nie należy przypisywać Ra wyłącznie na podstawie klasy dokładności uzębienia. ISO 1328-1 wprost stwierdza, że tekstura powierzchni nie jest objęta tą klasyfikacją i odsyła do ISO/TR 10064-4. [ISO-1328] Klasa dokładności opisuje odchyłki podziałki, profilu i linii zęba, nie mikrotopografię. Dlatego tabela na stronie powinna używać procesu i funkcji przekładni, nie automatycznego mapowania „klasa 6 = Ra 0,4”.

| Zastosowanie lub proces | Typowe Ra na rysunku | Uzasadnienie i różnice źródeł | Źródło |
|---|---:|---|---|
| Zęby po dokładnym skrawaniu, gdy nie wymaga się szlifowania | Około `Ra 0,5...0,8` jako realny cel procesu, nie reguła dla każdej klasy | Gleason pokazuje dla konkretnego procesu Coniflex Pro `Ra 0,51` przy wolniejszym i `0,83` przy szybszym toczeniu obwiedniowym. Wynik zależy od posuwu, narzędzia i materiału. | [Gleason] |
| Zęby szlifowane konwencjonalnie | Około `Ra 0,3` | Klingelnberg podaje `Ra około 0,3` jako wynik zwykłego szlifowania uzębień. Jest to lepszy punkt odniesienia niż ogólna klasa dokładności. | [Klingelnberg] |
| Zęby dokładnie szlifowane | Około `Ra 0,2` | Fine grinding osiąga według Klingelnberg około `Ra 0,2`. Stosować, gdy wymaga tego nośność, hałas lub ryzyko mikropittingu, a nie automatycznie. | [Klingelnberg] |
| Zęby polish-ground lub izotropowo wygładzane | Typowo `Ra 0,05...0,1` | Klingelnberg podaje około `Ra 0,1`, w badaniach `0,05`, a po trowalizacji poniżej `0,06`. W badaniach obniżenie poniżej `Ra 0,3` ograniczało mikropitting, lecz nie jest to uniwersalny próg dla każdej przekładni i każdego oleju. | [Klingelnberg] |

### 2.5. Klejenie, lutowanie, malowanie i powłoki

| Zastosowanie | Typowe Ra lub właściwsze wymaganie | Uzasadnienie i różnice źródeł | Źródło |
|---|---:|---|---|
| Klejenie konstrukcyjne metalu klejem ciekłym | **Nie wpisywać uniwersalnego Ra.** Wpisać proces przygotowania z karty kleju, na przykład lekka abrazja, czyszczenie i primer | 3M wskazuje korzyść z większej powierzchni i mechanicznego zakotwienia, ale nadmierna szorstkość może uwięzić powietrze i zmniejszyć rzeczywisty kontakt, jeżeli klej nie zwilży dolin. Krytyczne są energia powierzchniowa, czystość, lepkość i grubość spoiny. | [3M-Roughness] |
| Taśma cienka lub VHB | Zależnie od produktu, często powierzchnia gładka i ciągła; bez liczby Ra, jeżeli karta jej nie podaje | 3M ostrzega przed zbyt grubym ścierniwem. Niektóre taśmy 4932 i 4952 działają najlepiej na gładkiej, błyszczącej powierzchni, a abrazja może pogorszyć wytrzymałość. To bezpośredni przykład, że „bardziej chropowato” nie zawsze znaczy lepiej. | [3M-VHB] |
| Lutowanie twarde | Typowo `Ra 0,61...1,63`; unikać mniej niż około `0,76` i więcej niż około `6,35` według podanego procesu | Lucas-Milhaupt podaje typowe 24 do 64 µin. Powierzchnia polerowana poniżej 30 µin może gorzej się zwilżać, a bardzo chropowata powyżej 250 µin może pochłaniać spoiwo i utrudniać wypełnienie szczeliny. Czystość i luz kapilarny pozostają ważniejsze niż samo Ra. | [Lucas-Brazing] |
| Lutowanie miękkie | **Nie potwierdzono uniwersalnego Ra.** Wymagać czystości, zwilżalności i procesu przygotowania | Nie znaleziono wiarygodnego źródła dającego jedną wartość dla stopów lutowniczych, topników i powłok. Nie przenosić automatycznie okna z lutowania twardego. | [3M-Roughness] |
| Malowanie stali po obróbce strumieniowo-ściernej | Nie specyfikować Ra. Typowy wymagany profil `25...75` lub `30...75` według systemu malarskiego oraz czystość Sa 2½ | Jotun dla różnych systemów podaje profil `25...55` albo `30...75` według ISO 8503. Jest to głębokość profilu kotwiącego, nie Ra. Wartość musi pasować do grubości suchej powłoki. | [Jotun-25-55] [Jotun-30-75] |
| Malowanie po szlifowaniu lub czyszczeniu narzędziowym | Powierzchnia matowa, chropowata, bez wypolerowanych pól; zwykle bez Ra | Jotun ostrzega, aby szczotką lub narzędziem nie wypolerować metalu, bo zmniejsza to przyczepność. Lepszy jest zapis procesu, czystości i wyglądu niż przypadkowe `Ra 3,2`. | [Jotun-25-55] |
| PVD na aktywnej powierzchni narzędzia | `Ra < 0,2`; krytyczne zastosowania `Ra < 0,05` | Uddeholm podaje, że typowe szlifowane `Ra około 0,5` jest za szorstkie dla wysokowydajnego narzędzia. Głębokie ślady mogą powodować niejednorodną powłokę i pęknięcia. | [Uddeholm-PVD] |

### 2.6. Bazowanie, pomiar i powierzchnie swobodne

| Zastosowanie | Typowe Ra na rysunku | Uzasadnienie i różnice źródeł | Źródło |
|---|---:|---|---|
| Powierzchnia bazująca, wielokrotnie opierana na przyrządzie | `Ra ≤ 1,6` jako dobry punkt startowy; przy wysokiej powtarzalności `Ra ≤ 0,8` | Poradnik rysunku technicznego podaje `Ra 1,6` lub lepiej dla powierzchni współpracujących statycznie i baz. ISO 5459 definiuje bazy, ale nie narzuca im jednego Ra. Płaskość, czystość, grat i rozmieszczenie punktów podparcia wpływają na wynik bardziej bezpośrednio. | [Manual-Drawing] [ISO-5459] |
| Powierzchnia przeznaczona do pomiaru dotykowego CMM lub czujnikiem | Najczęściej `Ra 0,8...1,6`, jeśli chropowatość ma być mała wobec niepewności; **bez wartości uniwersalnej** | Ra nie jest tolerancją kształtu. Strategia próbkowania i promień końcówki mogą uśredniać profil. Wymaganie powinno wynikać z budżetu niepewności, a nie z samego faktu, że powierzchnia jest mierzona. | [NIST-Metrology] [Polytec] |
| Powierzchnia swobodna, obrabiana, bez styku funkcjonalnego | Zakładowo zwykle `Ra 6,3`; `Ra 12,5` dla obróbki zgrubnej, jeżeli wygląd i powłoka na to pozwalają | Nie jest to wartość normowa. Ma ograniczyć koszt nadmiernego wykańczania i ujednolicić rysunek. Groover pokazuje, że zwykłe toczenie i frezowanie bez trudu obejmuje kilka µm Ra, ale materiał i wykonawca nadal mają znaczenie. | [Groover] [Manual-Drawing] |
| Powierzchnia surowa po odlewaniu albo kuciu bez funkcji | Bez indywidualnego Ra albo osobne wymaganie ogólne dla powierzchni surowych | Nadanie wszystkim powierzchniom `Ra 6,3` może wymusić niepotrzebną obróbkę. Na rysunku należy odróżnić powierzchnie pozostawione w stanie surowym od obrabianych. | [Groover] |

## 3. Kiedy zbyt gładko szkodzi

### Uszczelnienie wargowe

Dla czopa Simmeringa nie należy wpisywać tylko `Ra ≤ 0,4`. Parker wymaga okna `Ra 0,20...0,43`, a SKF wyjaśnia, że wartość poniżej dolnej granicy pogarsza dostarczanie środka smarnego do wargi. Skutkiem może być wzrost temperatury, utwardzenie, pękanie i przedwczesna awaria. Jednocześnie nawet właściwe Ra nie pomoże, jeśli szlifowanie pozostawi ślad śrubowy pompujący medium przez uszczelnienie. [Parker-Rotary] [SKF-Seals]

### O-ring w ruchu

Parker ostrzega, że powierzchnia dynamiczna nie powinna być gładsza niż `Rmax 0,5`, ponieważ film smarny nie ma się czego utrzymać. To nie jest dolne ograniczenie Ra i nie wolno go tak przepisywać. Wniosek projektowy brzmi: dla ruchowego O-ringu kontrolować co najmniej Ra i Rmax lub Rz oraz udział materiałowy, a nie żądać „lustra”. [Parker-Oring]

### Tuleja polimerowa i prowadnica sucha

igus podaje dla iglidur G optimum około `Ra 0,8` i wprost stwierdza, że zbyt gładki wał zwiększa współczynnik tarcia oraz zużycie. Przy zbyt małej chropowatości rośnie adhezja i ryzyko stick-slip, a warstwa transferowa może tworzyć się nieprawidłowo. Z drugiej strony powierzchnia zbyt szorstka działa jak pilnik. Wartość optimum zależy od konkretnego materiału tulei. [igus-G] [igus-Friction]

### Prowadnice ślizgowe i film olejowy

W parze smarowanej doliny profilu stanowią rezerwuar oleju, ale ostre szczyty zwiększają docieranie i zużycie. Dwie powierzchnie o takim samym Ra mogą mieć inny Rvk, Rpk i udział materiałowy. Dlatego powierzchnia skrobana, plateau-honowana i wypolerowana nie są funkcjonalnie równoważne. Dla krytycznej prowadnicy samo Ra należy uzupełnić opisem tekstury, smarowania i procesu. [SKF-Tribology] [Trelleborg-Counter]

### Tuleja cylindra i crosshatch

Wygładzenie tulei do bardzo małego Ra bez pozostawienia dolin olejowych może pogorszyć smarowanie i uszczelnienie. Kontrolowany ślad krzyżowy przechowuje olej, a plateau daje powierzchnię nośną. Sunnen opisuje tę funkcję wprost. Jest to klasyczny przypadek, w którym `Ra 0,2` może oznaczać zarówno powierzchnię dobrą, jak i złą. [Sunnen-Cylinder]

### Klejenie

Lekka abrazja zwiększa powierzchnię, tworzy mechaniczne zakotwienie i może hamować propagację pęknięcia. Jednak nadmierna chropowatość zmniejsza rzeczywisty kontakt, gdy lepkość lub grubość kleju nie pozwala wypełnić dolin, i może uwięzić powietrze. Dla cienkich taśm bardzo gładka powierzchnia bywa lepsza, a dla niektórych VHB producent wręcz ostrzega przed abrazją. Nie istnieje jedna optymalna wartość Ra dla „klejenia”. [3M-Roughness] [3M-VHB]

### Lutowanie twarde

Lucas-Milhaupt wskazuje okno około `Ra 0,61...1,63`. Powierzchnia poniżej około `0,76` może mieć problem ze zwilżaniem z powodu braku dróg kapilarnych, a powyżej około `6,35` może pochłaniać spoiwo i utrudniać wypełnienie. Oznacza to, że zarówno polerowanie, jak i bardzo zgrubna powierzchnia mogą zaszkodzić. [Lucas-Brazing]

### Uszczelki płaskie

Miękka albo spiralnie zwijana uszczelka potrzebuje kontrolowanego profilu, który ogranicza wydmuchanie i przesuw. Pełna uszczelka metalowa potrzebuje powierzchni gładszej, aby materiał mógł wypełnić nierówności pod dostępnym naciskiem. Dlatego zdanie „kołnierz im gładszy, tym szczelniejszy” jest prawdziwe tylko dla części typów uszczelnień. [Teadit] [Flexitallic]

### Farba i powłoka

W systemach malarskich liczy się profil kotwiący i czystość. Wypolerowanie metalu przez szczotkę może zmniejszyć adhezję, a zbyt głęboki profil pozostawia niepokryte wierzchołki albo wymaga grubszej warstwy. Dla PVD sytuacja jest odwrotna: ślady po szlifowaniu mogą inicjować niejednorodność i pękanie, więc Uddeholm wymaga polerowania poniżej `Ra 0,2`, a w krytycznych miejscach poniżej `0,05`. [Jotun-25-55] [Uddeholm-PVD]

### Docieranie i eksploatacyjne wygładzanie

Nie każda para cierna powinna otrzymać najniższe wykonalne Ra przed montażem. W niektórych systemach kontrolowane docieranie zaokrągla szczyty i tworzy profil współpracujący z konkretnym smarem oraz materiałem pary. Nie oznacza to zgody na przypadkowo chropowatą powierzchnię. Oznacza konieczność określenia docelowej topografii i procedury docierania, zamiast samego minimalizowania Ra. [SKF-Tribology]

## 4. Czego nie udało się potwierdzić

1. Nie potwierdzono, że `Ra 0,45...0,45` jest prawidłowym normalnym zakresem erozji wgłębnej. Potwierdzono tylko, że pojedyncze `Ra 0,45` leży w wiarygodnym polu wyników EDM.
2. Nie potwierdzono `Rz max 1000` jako zwykłej granicy cięcia palnikiem. Wartość wykracza ponad granicę klasy 4 ISO 9013 obliczoną nawet dla 300 mm, choć może opisywać wadę lub krawędź niesklasyfikowaną.
3. Nie potwierdzono technologicznego sensu `Ra max 0,21` dla docierania. Potwierdzono zakres `Ra 0,025...0,2`.
4. Nie potwierdzono, że `Ra 0,34` jest uniwersalną granicą superfinish. Potwierdzono, że taki wynik może występować jako powierzchnia wejściowa, a proces może zejść poniżej `Ra 0,05`.
5. Nie potwierdzono konkretnych zakresów dla spiekania normalnego i kalibrowanego w otwartym źródle o porównywalnej jakości.
6. Nie znaleziono normowego mapowania rodzaju pasowania ISO 286 na jedną wartość Ra. Podane zakresy pasowań suwliwych są punktami startowymi, nie normą.
7. Nie znaleziono osobnych, uniwersalnych Ra gniazd łożysk wyłącznie na podstawie podziału „kulkowe kontra wałeczkowe” i „wcisk kontra luz”. Katalogi uzależniają wymaganie głównie od średnicy, IT, klasy dokładności, ruchu pierścienia i konstrukcji oprawy.
8. Nie potwierdzono powszechnej wartości Ra dla rowków pod pierścienie osadcze. Wiarygodni producenci skupiają się na geometrii, promieniu, podparciu ścianki i usunięciu gratu.
9. Nie potwierdzono normowych Ra dla zwykłych połączeń wpustowych ani prostego mapowania klasy wielowypustu DIN 5480 lub ISO 4156 na Ra. Zakresy w tabeli są zaleceniem konstrukcyjnym do uzgodnienia z wykonawcą.
10. Nie potwierdzono uniwersalnego Ra pod zwykłe nakrętki i podkładki. Tarcie, powłoka, twardość, płaskość oraz metoda dokręcania są ważniejsze.
11. Nie istnieje poprawne mapowanie klasy dokładności uzębienia ISO 1328 na Ra. Norma wprost wyłącza teksturę powierzchni ze swojego zakresu.
12. Nie potwierdzono uniwersalnego Ra dla klejenia, lutowania miękkiego ani malowania. W tych procesach lepszy jest zapis przygotowania powierzchni, czystości i profilu z karty materiału.
13. Nie potwierdzono jednej wartości Ra dla każdej powierzchni bazowej lub pomiarowej. ISO 5459 nie narzuca takiej wartości, a dobór zależy od niepewności i funkcji bazy.
14. Nie znaleziono podstaw do uniwersalnego przelicznika Ra na Rz. Istnieją wyłącznie empiryczne relacje ograniczone do konkretnego typu profilu i metody.

## 5. Proponowany kształt danych na stronę

Dla każdego zastosowania warto przechowywać osobno:

- `raMin` tylko wtedy, gdy powierzchnia może być za gładka;
- `raMax` jako zwykłe wymaganie rysunkowe;
- dodatkowe parametry `rz`, `rmax`, `rpk`, `rvk`, `rmr`, jeżeli źródło ich wymaga;
- `lay`, na przykład bez śladu śrubowego lub crosshatch;
- `warunki`, na przykład PTFE, TPU, ciśnienie pulsujące, średnica lub klasa łożyska;
- `status`: katalog producenta, norma, poradnik, punkt startowy albo niepotwierdzone;
- `sourceUrl` i krótki cytowalny opis źródła;
- `uwagaZaGladko`, jeżeli istnieje funkcjonalna dolna granica.

Takie pola zapobiegają najgroźniejszemu uproszczeniu, czyli sprowadzeniu wszystkich powierzchni do pytania „czy Ra jest dostatecznie małe”.

## Źródła

Źródła producentów i norm stosowano przed poradnikami ogólnymi. Ogólne wykresy procesów służą tylko do kontroli rzędu wielkości, nigdy do ustanawiania wymagania odbiorczego.

[Mitutoyo]: https://www.mitutoyo.com/webfoo/wp-content/uploads/1984_Surf_Roughness_PG.pdf "Mitutoyo, Quick Guide to Surface Roughness Measurement"
[Sunnen-Honing]: https://www.sunnen.com/userfiles/resources/sunnen-catalog-precisionhoningsupplies.pdf "Sunnen, Precision Honing Supplies, technical data"
[Kemet-Comparison]: https://www.kemet.co.uk/blog/lapping/surface-finishing-technologies-process-types-and-methods "Kemet, Surface Finishing Technologies"
[Uddeholm-Polishing]: https://www.uddeholm.com/app/uploads/sites/239/2024/06/Tech-Uddeholm-Polishing-EN-1.pdf "Uddeholm, Polishing of Mould Steel"
[Rubert]: https://www.rubert.co.uk/comparison-specimens/microsurf-2/ "Rubert, Microsurf comparison specimens"
[Groover]: https://industri.fatek.unpatti.ac.id/wp-content/uploads/2019/03/246-Fundamentals-of-Modern-Manufacturing-Materials-Processes-and-Systems-Mikell-P.-Groover-Edisi-5-2012.pdf "Mikell P. Groover, Fundamentals of Modern Manufacturing"
[EngineeringToolbox]: https://www.engineeringtoolbox.com/surface-roughness-d_1368.html "Engineering ToolBox, surface roughness by process"
[GF-EDM]: https://www.gfms.com/en-nl/machines/edm/die-sinking/agiecharmilles-form-e-series.html "GF Machining Solutions, FORM E die-sinking EDM"
[Makino-WEDM]: https://www.makino.com/en-us/machine-technology/machines/wire-edm/upv-3 "Makino UPV-3 wire EDM"
[ISO-9013]: https://www.iso.org/standard/60321.html "ISO 9013:2017, scope"
[ISO-9013-Copy]: https://uscc.ua/frontend/web/uploads/page/images/normativnye%20dokumenty/dstu/vigotovlennya-mk-mizhnarodna-gilka-standarty/70-dstu-en-so-9013-2019-gazove-r-zannya.pdf "EN ISO 9013:2017, accessible copy, table of Rz5 ranges"
[Hypertherm]: https://www.hypertherm.com/pl/resources/more-resources/blogs/how-to-choose-between-laser-and-plasma-cutting/ "Hypertherm, laser and plasma cut quality"
[Supfina]: https://attachments.supfina.com/en/ "Supfina, Superfinishing attachments"
[Thielenhaus]: https://thielenhaus.com/wp-content/uploads/Flyer_CrankStar_2019_EN.pdf "Thielenhaus, CrankStar Microfinish"
[Kemet-Lapping]: https://www.kemet.co.uk/blog/lapping/lapping-hard-materials "Kemet, lapping hard materials"
[Kemet-Valve]: https://www.kemet.co.uk/blog/lapping/gate-valve-lapping "Kemet, gate valve lapping"
[Ecoroll-Omega]: https://www.ecoroll.de/en/products/processing-cylinders/omega-system-rdo-rio.html "ECOROLL, OMEGA system"
[Ecoroll-Process]: https://www.ecoroll.com/processes/roller-burnishing-1 "ECOROLL, roller burnishing process"
[Baublies]: https://www.baublies.com/files/content/press/de/2008-01-fachartikel-glattwalzen-auf-drehmaschinen.pdf "Baublies, roller burnishing on lathes"
[SKF-Bearings]: https://www.skf.com/binaries/pub12/Images/0901d196802809de-Rolling-bearings---17000_1-EN_tcm_12-121486.pdf "SKF, Rolling Bearings, bearing seat roughness"
[Timken]: https://www.timken.com/wp-content/uploads/2016/10/Timken-Engineering-Manual_10424.pdf "Timken Engineering Manual"
[NTN-Fits]: https://ntnamericas.com/technical-resources/shaft-housing-fits/ "NTN, shaft and housing fits"
[NTN-Catalog]: https://www.ntnglobal.com/en/products/catalog/pdf/2203E.pdf "NTN, Ball and Roller Bearings catalog"
[Nord-Lock]: https://www.nord-lock.com/learnings/bolting-tips/2016/torque-vary-tightening-untightening/ "Nord-Lock, torque and friction"
[Seeger]: https://www.seeger-orbis.com/technology/design-details "Seeger-Orbis, retaining-ring groove design details"
[Smalley]: https://www.smalley.com/ring-design/load-capacity "Smalley, retaining-ring load capacity and groove design"
[Spline-Manufacturer]: https://stalvia.com.ua/en/services/grooving/ "Stalvia, spline grinding capability"
[ISO-4156]: https://preview.sist.si/sist-preview/36497/4add0c28a6954ec8aec1eeca26ec1630/SIST-ISO-4156-1-2006.pdf "ISO 4156-1 preview, involute splines"
[Parker-Rotary]: https://www.parker.com/content/dam/Parker-com/Literature/Engineered-Polymer-Systems/5350.pdf "Parker, Rotary Seal Design Guide"
[SKF-Seals]: https://www.skf.com/binaries/pub12/Images/0901d196807662c1-810-701_CRSeals_Handbook_Jan_2019_tcm_12-318140.pdf "SKF, CR Seals Handbook"
[SKF-Seal-Analysis]: https://evolution.skf.com/us/seal-analysis-pays/ "SKF, Seal analysis pays"
[Parker-Oring]: https://www.parker.com/content/dam/Parker-com/Literature/Praedifa/Catalogs/Catalog_O-Ring-Handbook_PTD5705-EN.pdf "Parker, O-Ring Handbook"
[Teadit]: https://teadit.com/wp-content/uploads/2021/08/Livro-Industrial-Gaskets-5.pdf "Teadit, Industrial Gaskets"
[Flexitallic]: https://flexitallic.com/wp-content/uploads/site/1/us_Spiral_Wound_Gasket_Syle_R_Data_Sheet_03-16-2017.pdf "Flexitallic, Spiral Wound Gasket data sheet"
[Parker-Metal-Seal]: https://discover.parker.com/extreme-low-temperature-elastomer-seals-webinar "Parker, metal seal hardware finish guidance"
[THK-Raceway]: https://www.thk.com/jp/en/products/other_linear_motion_guides/lm_roller/design//0001/ "THK, LM Roller raceway design"
[THK-Shaft]: https://www.thk.com/sg/en/products/other_linear_motion_guides/linear_bushing/lm_shaft_end_support/ "THK, LM shafts"
[SKF-Tribology]: https://evolution.skf.com/us/tailored-bearing-surfaces-for-optimum-operating-characteristics-2/ "SKF, tailored bearing surfaces"
[SKF-Plain]: https://cdn.skfmediahub.skf.com/api/public/0901d19680229dfc/pdf_preview_medium/0901d19680229dfc_pdf_preview_medium.pdf "SKF, composite plain bearings"
[GGB]: https://www.ggbearings.com/sites/default/files/inline-files/GGB%20WhitePaper%20-%20Applying%20tribology%20to%20improve%20system%20performance_white%20paper.pdf "GGB, applying tribology to improve system performance"
[igus-G]: https://www.igus.com/ContentData/Products/Downloads/iglide_G300_FM_USen.pdf "igus, iglidur G material data"
[igus-A160]: https://www.igus.com/plastic-bearings/resources/plain-bearings-a160-material "igus, iglidur A160 material data"
[igus-Friction]: https://www.igus.com/plastic-bearings/resources/plain-bearings-iglide-plastic-bushings-coefficients-of-friction-ca "igus, roughness, friction and stick-slip"
[Trelleborg-Counter]: https://www.trelleborg.com/seals/-/media/tss-media-repository/tss_website/services-and-tools/technical-library/whitepapers/introduction-to-counter-surfaces-whitepaper_en.pdf "Trelleborg, An Introduction to Counter Surfaces"
[Sunnen-Cylinder]: https://www.sunnen.com/userfiles/inthenews/hydraulic-cylinders-reconditioned-low-cost-honing-system.pdf "Sunnen, hydraulic cylinder honing application"
[Parker-Hydraulic]: https://www.parker.com/content/dam/Parker-com/Literature/Engineered-Polymer-Systems/5371.pdf "Parker, Performance Sealing Products"
[Parker-Hydraulic-EU]: https://www.parker.com/literature/Singapore/Hydraulic%20Seals.pdf "Parker, Hydraulic Seals"
[ISO-1328]: https://www.iso.org/obp/ui/?_escaped_fragment_=iso%3Astd%3Aiso%3A1328%3A-1%3Aed-2%3Av1%3Aen "ISO 1328-1:2013"
[Gleason]: https://www.gleason.com/gear-technology-solutions/files/basic-html/page128.html "Gleason, Coniflex Pro surface roughness example"
[Klingelnberg]: https://klingelnberg.com/fileadmin/News/White_Paper/Bevel_Gear_Technology_Whitepaper_Fine_Grinding_EN.pdf "Klingelnberg, Fine Grinding"
[3M-Roughness]: https://www.3m.com/3M/en_US/bonding-and-assembly-us/resources/science-of-adhesion/influence-surface-roughness/ "3M, Influence of Surface Roughness"
[3M-VHB]: https://www.3m.com/3M/en_US/bonding-and-assembly-us/resources/full-story/?storyid=b3996cbd-9954-455f-8e72-88e452ca38c0 "3M, surface preparation for VHB tape"
[Lucas-Brazing]: https://blog.lucasmilhaupt.com/en-us/about/blog/brazing-surface-preparation "Lucas-Milhaupt, brazing surface preparation"
[Jotun-25-55]: https://www.jotun.com/api/v1/datasheets/download/merged?selectedFiles=84 "Jotun, Jotacote F60 application guide"
[Jotun-30-75]: https://www.jotun.com/api/v1/datasheets/download/merged?selectedFiles=191 "Jotun, Penguard Universal application guide"
[Uddeholm-PVD]: https://www.uddeholm.com/app/uploads/sites/247/2024/09/Tech_Uddeholm_PVD_Coating-EN.pdf "Uddeholm, tool steel for PVD coatings"
[Manual-Drawing]: https://www.sciencedirect.com/topics/engineering/datum-surface "Manual of Engineering Drawing excerpt on datum surfaces"
[ISO-5459]: https://www.iso.org/standard/87855.html "ISO 5459:2024"
[NIST-Metrology]: https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=905020 "NIST, Introduction to Surface Finish Metrology"
[Polytec]: https://www.polytec.com/en/surface-metrology/solutions/measurement-tasks/surface-roughness-measurement "Polytec, surface roughness measurement guide"
