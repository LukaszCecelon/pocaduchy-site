# Weryfikacja danych o gwintach metrycznych

**Werdykt:** dane liczbowe nadają się do publikacji. Nie znalazłem błędnej liczby w polach `p`, `pd` ani `k`. Została jedna rozbieżność redakcyjna, bez wpływu na wynik liczbowy: opis pola `p` nadal nazywa je zawsze skokiem zwykłym ISO 261, chociaż przy M72, M76, M80, M85, M90 i M100 zapisane 6 mm jest w ISO 261 skokiem drobnym. Każdy z tych wpisów ma już poprawne `pUwaga`. M14x1,25, M85, próg M8 dla śrub dłuższych niż 200 mm i granica długości 125 mm są już w bieżącym pliku obsłużone prawidłowo. Nie ma poważnej rozbieżności wymagającej wstrzymania publikacji po doprecyzowaniu znaczenia pola `p`.

Raport odnosi się do stanu `src/lib/gwinty/dane.js` z 11 sierpnia 2026, godz. 12:05 i `src/lib/gwinty/dane.test.mjs` z godz. 12:06. Pliki te zostały zaktualizowane niezależnie ode mnie w czasie badania, dlatego część założeń wymienionych w zleceniu jest już w nich poprawiona.

## Rozbieżności wymagające korekty

| Parametr | Nasza wartość lub założenie | Wartość albo stan w źródle | Źródło | Rekomendacja |
| --- | --- | --- | --- | --- |
| `p` i komentarz przy `GRANICA_ISO_261` | Definicja pola mówi `skok zwykły wg ISO 261`, a komentarz przy stałej mówi, że powyżej M68 idziemy za DIN 13. Przy sześciu dużych średnicach `pUwaga` poprawnie zaznacza już skok drobny. | ISO 261 nadal obejmuje M72, M76, M80, M85, M90 i M100, a 6 mm leży dla nich w kolumnie skoków drobnych. DIN 13-10 niezależnie obejmuje skok drobny 6 mm dla średnic od 70 do 500 mm. | [ISO 261:1998, pkt 5 i tabela 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf), [oficjalny status ISO 261:1998](https://www.iso.org/standard/4165.html), [DIN 13-10:1999-11](https://www.dinmedia.de/en/standard/din-13-10/17217287), [iCAD](https://obliczenia.icad.pl/gwinty/metryczne/) | Zdefiniować `p` jako skok domyślny lub prezentowany, nie zawsze zwykły. Nazwać stałą granicą serii zwykłej. Usunąć sugestię, że ISO 261 kończy zakres na M68. Liczb i istniejących `pUwaga` nie zmieniać. |

## Potwierdzenia

### Skoki z pola `p`

Porównałem wszystkie 43 wpisy z tabelą 2 ISO 261. Liczby są zgodne:

| Zakres | Sprawdzone pary średnica x skok, mm | Źródło |
| --- | --- | --- |
| M1 do M12 | M1x0,25; M1,2x0,25; M1,4x0,3; M1,6x0,35; M1,8x0,35; M2x0,4; M2,2x0,45; M2,5x0,45; M3x0,5; M3,5x0,6; M4x0,7; M5x0,8; M6x1; M7x1; M8x1,25; M9x1,25; M10x1,5; M12x1,75 | [ISO 261:1998, tabela 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf), [Bossard, zestawienie ISO 262 i tolerancji ISO](https://media.bossard.com/global-en/-/media/bossard-group/website/documents/technical-resources/en/f_079_en.pdf) |
| M14 do M68 | M14x2; M16x2; M18x2,5; M20x2,5; M22x2,5; M24x3; M27x3; M30x3,5; M33x3,5; M36x4; M39x4; M42x4,5; M45x4,5; M48x5; M52x5; M56x5,5; M60x5,5; M64x6; M68x6 | [ISO 261:1998, tabela 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf), [Bossard, zestawienie ISO 262 i tolerancji ISO](https://media.bossard.com/global-en/-/media/bossard-group/website/documents/technical-resources/en/f_079_en.pdf) |
| Powyżej M68 | M72x6; M76x6; M80x6; M85x6; M90x6; M100x6 | [ISO 261:1998, tabela 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf), [DIN 13-10:1999-11, skok drobny 6 mm](https://www.dinmedia.de/en/standard/din-13-10/17217287), [iCAD](https://obliczenia.icad.pl/gwinty/metryczne/) |

Ostatni wiersz nie jest jednak serią zwykłą ISO. ISO 261 nadal obejmuje te średnice, a 6 mm jest tam skokiem drobnym. DIN 13-1 rzeczywiście kończy serię zwykłą na M68, lecz nie wynika z tego koniec ISO 261. [DIN 13-1 ma jawny zakres od 1 do 68 mm](https://www.dinmedia.de/en/standard/din-13-1/17218832), natomiast [DIN 13-10 obejmuje drobny skok 6 mm od 70 do 500 mm](https://www.dinmedia.de/en/standard/din-13-10/17217287).

iCAD pokazuje poprawne M1,6x0,35, więc znaleziony wcześniej zapis `035` nie występuje w tym serwisie. Ręczna kontrola szczególnie ryzykownych pozycji M1,4x0,3, M3,5x0,6, M7x1, M9x1,25, M14x2, M18x2,5, M33x3,5, M45x4,5, M52x5 i M60x5,5 również nie wykazała różnic względem ISO 261. [Źródło normatywne: ISO 261:1998, tabela 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf); [niezależna kontrola użytkowa: iCAD](https://obliczenia.icad.pl/gwinty/metryczne/).

### Skoki drobnozwojne `pd`

Każda wartość z każdej tablicy `pd` występuje dla odpowiadającej jej średnicy w tabeli 2 ISO 261. Nie znalazłem fałszywego skoku. W szczególności potwierdzone są M10: 1,25 / 1 / 0,75; M45: 3 / 2 / 1,5; M56 i M60: 4 / 3 / 2 / 1,5; oraz M64, M68, M72, M76, M80, M85, M90 i M100: 4 / 3 / 2. [ISO 261:1998, tabela 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf) podaje te kombinacje; ręczne zapytania dla wskazanych średnic potwierdził także [iCAD](https://obliczenia.icad.pl/gwinty/metryczne/).

Lista celowo nie jest pełnym wyciągiem z normy. Przykładowo ISO 261 dopuszcza również 1,5 mm przy M64, M68, M72, M76 i M80, ale brak tych wartości w liście opisanej jako praktyczna nie jest błędem. [ISO 261:1998, tabela 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf). M14x1,25 jest zastrzeżony w normie do świec zapłonowych, a bieżące dane już zawierają tę uwagę w `pdUwagi`. [ISO 261:1998, pkt 5.1 i przypis a do tabeli 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf).

### Wymiar pod klucz `k`

W kodzie `k` oznacza wymiar pod klucz. W ISO 4014, ISO 4032, DIN 931 i DIN 934 ten wymiar ma symbol `s`, natomiast `k` oznacza wysokość łba albo nakrętki. To tylko nazwa pola wewnętrznego, ale warto zaznaczyć różnicę przy cytowaniu norm. [ISO 4014:2022, rysunek 1 i tablice 1 do 6](https://cdn.standards.iteh.ai/samples/72579/81f2b1e966b440d7a25f6734e508ea48/ISO-4014-2022.pdf), [ISO 4032:2023, rysunek 1 i tablice 1 oraz 2](https://cdn.standards.iteh.ai/samples/75016/5b1f83bd2dc44fc199973e9957a75086/ISO-4032-2023.pdf).

Komplet wartości został sprawdzony. Dla rozmiarów bez świadomej różnicy DIN/ISO zgodne są: M1,6 = 3,2; M2 = 4; M2,5 = 5; M3 = 5,5; M3,5 = 6; M4 = 7; M5 = 8; M6 = 10; M7 = 11; M8 = 13; M16 = 24; M18 = 27; M20 = 30; M24 = 36; M27 = 41; M30 = 46; M33 = 50; M36 = 55; M39 = 60; M42 = 65; M45 = 70; M48 = 75; M52 = 80; M56 = 85; M60 = 90 i M64 = 95 mm. [ISO 4014:2022, tablice 1 do 6](https://cdn.standards.iteh.ai/samples/72579/81f2b1e966b440d7a25f6734e508ea48/ISO-4014-2022.pdf), [Performance Fasteners, porównanie ISO 4014 i DIN 931](https://www.performancefastenersltd.co.uk/_files/ugd/aa5dc8_659865f859d941c2905d0a253d751077.pdf).

Dla dużych śrub DIN 931-2 zgodne są M68 = 100; M72 = 105; M76 = 110; M80 = 115; M90 = 130 i M100 = 145 mm. M85 nie występuje w DIN 931-2, mimo że szerokość 120 mm można znaleźć dla nakrętki M85. [DIN 931-2:2009, tabela wymiarów](https://www.fasten.it/en/norms/norm/din_931-2), [ISO 4032, zestawienie wymiarów nakrętek](https://www.ferrofast.com/resources/dimensional-standards/iso/nuts/iso-4032/).

Cztery świadomie zapisane różnice są prawidłowe:

| Średnica | Stary DIN 931 lub DIN 934, mm | ISO 4014 lub ISO 4032, mm | Ocena naszej wartości |
| --- | --- | --- | --- |
| M10 | 17 | 16 | `k = 17` jest wartością starego DIN; uwaga o ISO jest poprawna. |
| M12 | 19 | 18 | `k = 19` jest wartością starego DIN; uwaga o ISO jest poprawna. |
| M14 | 22 | 21 | `k = 21` jest wartością ISO; uwaga o starym DIN jest poprawna. |
| M22 | 32 | 34 | `k = 34` jest wartością ISO; uwaga o starym DIN jest poprawna. |

Źródła dla wszystkich czterech par: [Würth, tabela zmian DIN na ISO](https://www.wuerth-industrie.com/web/media/en/pictures/wuerthindustrie/unternehmen/download_center/Broschuere_DIN-EN-ISO_Normung_DE.pdf) i [ISO 4032:2023, tabele 1 i 2](https://cdn.standards.iteh.ai/samples/75016/5b1f83bd2dc44fc199973e9957a75086/ISO-4032-2023.pdf). Würth wymienia dokładnie te cztery zmienione średnice, więc nie ma piątej analogicznej różnicy szerokości sześciokąta.

Trzeba doprecyzować edycję normy. Aktualne ISO 4032:2023 ma zasadniczy zakres M5 do M39, a wymiary poniżej M5 i powyżej M39 przeniesiono do informacyjnego załącznika A. Poprzednie ISO 4032:2012 miało zakres M1,6 do M64. [ISO 4032:2023, zakres i opis zmian](https://www.iso.org/cms/render/live/en/sites/isoorg/contents/data/standard/07/50/75016.html), [ISO 4032:2012, zakres i status wycofania](https://www.iso.org/fr/standard/61668.html). Dla łbów śrub podstawowym źródłem powinno być ISO 4014 albo DIN 931-2, nie ISO 4032 dotyczące nakrętek.

### Długość gwintu i zakres śrub

Wartości tablicowe odpowiadają zależnościom:

* `b = 2d + 6` dla `l <= 125 mm`;
* `b = 2d + 12` dla `125 mm < l <= 200 mm`;
* `b = 2d + 25` dla `l > 200 mm`.

Potwierdzają je tablice ISO 4014, DIN 931-2 oraz materiały producentów. Dla przykładu ISO 4014 podaje M6: 18 / 24 / 37 mm, M10: 26 / 32 / 45 mm, a DIN 931-2 podaje M68: 148 / 161 mm w dwóch możliwych dla tej średnicy przedziałach. [ISO 4014:2022](https://cdn.standards.iteh.ai/samples/72579/81f2b1e966b440d7a25f6734e508ea48/ISO-4014-2022.pdf), [DIN 931-2:2009](https://www.fasten.it/en/norms/norm/din_931-2), [Schuster, dane ISO 4014](https://www.schuster-gmbh.de/de/lieferprogramm/produkte/din-en-iso-4014/).

Dla M1,6 ISO 4014 podaje bezpośrednio wymiar odniesienia `b = 9 mm`. Norma nie formułuje ogólnej reguły zaokrąglania wyniku `2 x 1,6 + 6 = 9,2 mm`; po prostu tablicuje 9 mm. `Math.round()` daje więc właściwy wynik dla tego jednego przypadku, ale lepiej opisać go jako wyjątek tablicowy, a nie normową metodę zaokrąglania. [ISO 4014:2022, tabela 1](https://cdn.standards.iteh.ai/samples/72579/81f2b1e966b440d7a25f6734e508ea48/ISO-4014-2022.pdf).

Aktualne ISO 4014 obejmuje średnice od M1,6 do M64. Dla M5 do M8 najkrótsza długość standardowa jest wyznaczana jako `5d`, dla M10 jako `4,5d`, dla M12 do M22 jako `4d`, dla M24 do M60 jako `3,75d`, a dla M64 wynosi 220 mm. Największa długość standardowa nie przekracza mniejszej z wartości `10d` i 500 mm. Dłuższe wykonania mogą być uzgodnione według ISO 888 i rzeczywiście występują w handlu. [ISO 4014:2022, rysunek 1 i przypisy d oraz e](https://cdn.standards.iteh.ai/samples/72579/81f2b1e966b440d7a25f6734e508ea48/ISO-4014-2022.pdf).

Z tego powodu `minD` nie jest normowym opisem zakresu długości. Jako obserwacje handlowe oba obecne progi są obronione: M5 dla długości powyżej 125 mm, ponieważ katalog podaje M5 do 130 mm, oraz M8 dla długości powyżej 200 mm, ponieważ dostępne są M8x250 i M8x300. [H&S Technik, zakresy handlowe DIN 931](https://hs-technik.com.pl/wp-content/uploads/2020/09/SRUBY-DIN-931.pdf), [Fabory, M8x250](https://www.fabory.com/nl/zeskantbout-din-931-staal-blank-8-8-m8x250/p/01000080250), [Würth, M8x300](https://eshop.wuerth.de/Hexagonal-bolt-with-shank-ISO-4014-steel-88-plain-SCR-HEX-ISO4014-88-WS13-M8X300/00518%20%20300.sku/en/US/EUR/). Nie są to jednak normowe gwarancje dostępności wszystkich wariantów materiału, klasy i powłoki.

PN-M-82101:1985 jest normą wycofaną od 1999 r. i zastąpioną polskimi wydaniami norm EN dotyczących śrub sześciokątnych. [Katalog PKN](https://sklep.pkn.pl/pn-m-82101-1985p.html). Dostępne katalogi branżowe utożsamiają jej śrubę z częściowym gwintem z DIN 931 i ISO 4014 oraz podają te same wartości `b`, ale pełnego tekstu PN nie udało się odczytać bez płatnego dostępu. [BIMAR, tabela DIN 931 / PN 82101 / ISO 4014](https://www.bimar.pl/sruby/din-931-pn-82101-sruby-ze-lbem-szesciokatnym), [H&S Technik](https://hs-technik.com.pl/wp-content/uploads/2020/09/SRUBY-DIN-931.pdf). Wniosek liczbowy jest dobrze potwierdzony pośrednio, lecz nie przypisuję PN ogólnej reguły zaokrąglania, której nie widziałem w jej tekście.

## Klasyfikacja średnic według ISO 261

ISO 261 nakazuje wybierać najpierw średnice z kolumny 1, następnie w razie potrzeby z kolumny 2, a na końcu z kolumny 3. Poniższe grupy są wynikiem odczytu kolumn tabeli 2 dla dokładnie naszych 43 średnic, a nie kopią gotowej tabeli serwisu. [ISO 261:1998, pkt 5.1 i tabela 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf).

* **Pierwszy wybór:** M1, M1,2, M1,6, M2, M2,5, M3, M4, M5, M6, M8, M10, M12, M16, M20, M24, M30, M36, M42, M48, M56, M64, M72, M80, M90, M100. [ISO 261:1998, tabela 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf).
* **Drugi wybór:** M1,4, M1,8, M2,2, M3,5, M7, M14, M18, M22, M27, M33, M39, M45, M52, M60, M68, M76, M85. [ISO 261:1998, tabela 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf).
* **Trzeci wybór:** M9. [ISO 261:1998, tabela 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf).

iCAD pokazuje tę samą klasyfikację, ale jest tu tylko kontrolą niezależnej implementacji. Źródłem klasyfikacji pozostaje tabela 2 ISO 261. [iCAD](https://obliczenia.icad.pl/gwinty/metryczne/).

## Założenie o dostępności śrub sześciokątnych

Brak śruby ISO 4014 lub DIN 931 dla M1, M1,2, M1,4, M1,8, M2,2 i M9 jest potwierdzony zakresem i tablicami obu norm. ISO 4014 zaczyna się od M1,6 i nie zawiera M1,8, M2,2 ani M9; podane sześć średnic nie występuje także w DIN 931-1 lub DIN 931-2. [ISO 4014:2022, zakres i tablice 1 do 6](https://cdn.standards.iteh.ai/samples/72579/81f2b1e966b440d7a25f6734e508ea48/ISO-4014-2022.pdf), [DIN 931-2:2009, zakres](https://www.dinmedia.de/en/standard/din-931-2/117410325).

Samo kryterium `k !== undefined` nie byłoby bezpieczne, ale bieżąca funkcja najpierw respektuje jawne pole `sruba`. Przy M85 jest już `sruba: false`: `k = 120` pozostaje wymiarem sześciokąta spotykanym dla nakrętki, a dostępność śruby nie jest z niego wyprowadzana. Z drugiej strony aktualne ISO 4032:2023 dodało nakrętkę M7, a aktualne ISO 4014:2022 ma śrubę M7 jako rozmiar niezalecany, więc M7 z kluczem 11 mm jest dziś poprawny. [ISO 4032:2023, opis zmian i tabela 1](https://cdn.standards.iteh.ai/samples/75016/5b1f83bd2dc44fc199973e9957a75086/ISO-4032-2023.pdf), [ISO 4014:2022, tabela 2](https://cdn.standards.iteh.ai/samples/72579/81f2b1e966b440d7a25f6734e508ea48/ISO-4014-2022.pdf), [DIN 931-2:2009](https://www.fasten.it/en/norms/norm/din_931-2).

Rzeczywisty zakres norm należy zapisać oddzielnie: ISO 4014:2022 obejmuje M1,6 do M64, a uzupełniający i aktualny DIN 931-2:2009 obejmuje wybrane śruby od M68 do M160x6. W naszym zbiorze są to M68, M72, M76, M80, M90 i M100; M85 jest pominięte. [ISO 4014:2022](https://www.iso.org/cms/render/live/en/sites/isoorg/contents/data/standard/07/25/72579.html), [DIN 931-2:2009](https://www.dinmedia.de/en/standard/din-931-2/117410325), [lista średnic DIN 931-2:2009](https://www.globalfastener.com/standards/model.php?sid=1681&x=208).

## Czego nie udało się potwierdzić bezpośrednio

* Nie miałem dostępu do pełnego tekstu PN-M-82101:1985. PKN potwierdza tytuł, datę wycofania i następców, a dwa niezależne katalogi potwierdzają zgodność liczb z DIN 931 i ISO 4014. Nie potwierdzam jednak, że polska norma wyrażała wartości jako trzy wzory ani że definiowała regułę zaokrąglania M1,6. [PKN](https://sklep.pkn.pl/pn-m-82101-1985p.html), [BIMAR](https://www.bimar.pl/sruby/din-931-pn-82101-sruby-ze-lbem-szesciokatnym), [H&S Technik](https://hs-technik.com.pl/wp-content/uploads/2020/09/SRUBY-DIN-931.pdf).
* Norma wymiarowa nie jest katalogiem stanów magazynowych. Przykłady M5x130, M8x250 i M8x300 dowodzą, że obecne progi handlowe są niepełne, ale nie pozwalają obiecać dostępności każdego połączenia średnicy, długości, klasy i powłoki. [H&S Technik](https://hs-technik.com.pl/wp-content/uploads/2020/09/SRUBY-DIN-931.pdf), [Fabory](https://www.fabory.com/nl/zeskantbout-din-931-staal-blank-8-8-m8x250/p/01000080250), [Würth](https://eshop.wuerth.de/Hexagonal-bolt-with-shank-ISO-4014-steel-88-plain-SCR-HEX-ISO4014-88-WS13-M8X300/00518%20%20300.sku/en/US/EUR/).
* Informacyjny załącznik A aktualnego ISO 4032:2023 nie mieści się w publicznym podglądzie. Wartości dużych szerokości sześciokąta potwierdziłem w DIN 931-2, ISO 272 i katalogu producenta, ale nie nazywam wymiarów powyżej M39 normatywnym zakresem ISO 4032:2023. [ISO 4032:2023, zakres](https://www.iso.org/cms/render/live/en/sites/isoorg/contents/data/standard/07/50/75016.html), [ISO 272:1982](https://www.iso.org/standard/4182.html), [DIN 931-2:2009](https://www.fasten.it/en/norms/norm/din_931-2).

## Ocena iCAD

iCAD jest dobrym kalkulatorem geometrii i tolerancji gwintu. Deklaruje PN-ISO 724:1995, PN-ISO 68-1:2000, PN-ISO 261:2001, PN-ISO 965-1:2001 i PN-ISO 965-3:2001, prowadzi użytkownika przez średnicę, skok i pole tolerancji, a następnie liczy wymiary graniczne. [Strona zakresu iCAD](https://obliczenia.icad.pl/gwinty/), [kalkulator metryczny](https://obliczenia.icad.pl/gwinty/metryczne/).

Serwis realnie obejmuje średnice ISO 261 aż do M300, pokazuje pierwszy, drugi i trzeci wybór oraz rozróżnia skok zwykły gwiazdką. W ręcznie sprawdzonych pozycjach zgodził się z naszymi skokami, w tym podał M1,6x0,35, M10x0,75, komplet wskazanych skoków M45, M56 i M60 oraz 6 / 4 / 3 / 2 mm dla dużych średnic, z dodatkowymi 1,5 mm tam, gdzie przewiduje je ISO 261. [iCAD](https://obliczenia.icad.pl/gwinty/metryczne/).

Ma dwie istotne granice. Po pierwsze nie podaje wymiarów łba, nakrętki, długości gwintu ani dostępności śrub ISO 4014 lub DIN 931, więc nie może weryfikować pól `k` i `DLUGOSC_GWINTU`. Po drugie wyświetla M14x1,25 bez widocznego zastrzeżenia o świecach zapłonowych, chociaż taki przypis jest w ISO 261. [iCAD](https://obliczenia.icad.pl/gwinty/metryczne/), [ISO 261:1998, pkt 5.1 i przypis a](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf).

Warto polecić iCAD czytelnikowi jako wygodne narzędzie kontrolne do doboru gwintu i obliczania tolerancji, z podaniem edycji norm widocznych w serwisie. Nie należy przedstawiać go jako źródła danych o śrubach i nakrętkach ani jako zamiennika tekstu normy. Jego wyniki pokrywają się z naszymi liczbami gwintowymi, ale jednocześnie ujawniają błąd naszego komentarza o końcu ISO 261 na M68.

## Główne źródła niezależne od iCAD

1. [ISO 261:1998, oficjalna karta normy](https://www.iso.org/standard/4165.html) i [publiczny podgląd pkt 5 oraz tabeli 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf), źródło normatywne dla średnic, skoków i kolejności wyboru.
2. [ISO 4014:2022, oficjalna karta normy](https://www.iso.org/cms/render/live/en/sites/isoorg/contents/data/standard/07/25/72579.html) i [publiczny podgląd tablic](https://cdn.standards.iteh.ai/samples/72579/81f2b1e966b440d7a25f6734e508ea48/ISO-4014-2022.pdf), źródło dla śrub, kluczy, długości gwintu i standardowych długości.
3. [ISO 4032:2023, oficjalna karta normy](https://www.iso.org/cms/render/live/en/sites/isoorg/contents/data/standard/07/50/75016.html) i [publiczny podgląd tablic](https://cdn.standards.iteh.ai/samples/75016/5b1f83bd2dc44fc199973e9957a75086/ISO-4032-2023.pdf), źródło dla współczesnych nakrętek.
4. [DIN 13-1:1999-11](https://www.dinmedia.de/en/standard/din-13-1/17218832), [DIN 13-10:1999-11](https://www.dinmedia.de/en/standard/din-13-10/17217287) i [DIN 931-2:2009-06](https://www.dinmedia.de/en/standard/din-931-2/117410325), oficjalne karty DIN.
5. [Würth, zestawienie zmian DIN i ISO](https://www.wuerth-industrie.com/web/media/en/pictures/wuerthindustrie/unternehmen/download_center/Broschuere_DIN-EN-ISO_Normung_DE.pdf), [Bossard, dane gwintów ISO](https://media.bossard.com/global-en/-/media/bossard-group/website/documents/technical-resources/en/f_079_en.pdf), [Schuster, dane ISO 4014](https://www.schuster-gmbh.de/de/lieferprogramm/produkte/din-en-iso-4014/) i [Performance Fasteners, przewodnik techniczny](https://www.performancefastenersltd.co.uk/_files/ugd/aa5dc8_659865f859d941c2905d0a253d751077.pdf), niezależne źródła producentów i dystrybutorów.
6. [PKN, PN-M-82101:1985](https://sklep.pkn.pl/pn-m-82101-1985p.html), oficjalne źródło statusu polskiej normy.
