# Geometria gwintu i proporcje śruby M10 do rysunku poglądowego

## Wniosek wykonawczy

W głównym widoku śruby zastosować przedstawienie umowne: zewnętrzną linię średnicy `d` grubą, linię dna gwintu cienką, obie równoległe do osi. Ząbki pokazać tylko w osobnym powiększeniu profilu. W powiększeniu narysować profil zewnętrzny śruby, a pełny trójkąt o wysokości `H` zaznaczyć jako konstrukcję. `H` nie jest rzeczywistą głębokością gwintu śruby.

Dla proporcji śruby przyjąć aktualne ISO 4014:2022 i model M10x60: `d = 10 mm`, `s = 16 mm`, `k = 6,4 mm`, `b = 26 mm`, `l = 60 mm`. Źródło wszystkich tych wymiarów: [ISO 4014:2022, rysunek 1 i tabela 2][S4].

## 1. Zarys metryczny

### Kąt, skok i trójkąt podstawowy

- `60°` to pełny kąt zarysu, mierzony w przekroju osiowym między dwoma sąsiednimi bokami. Źródło: [ISO 5408, definicja kąta gwintu][S3] oraz profil na [rysunku 1 ISO 68-1:2023][S1].
- Połówka kąta ma `30°` i jest mierzona między bokiem a prostą prostopadłą do osi gwintu. Bok tworzy więc `60°` z samą osią. Źródło definicji kąta boku: [ISO 5408][S3].
- `P` jest odległością osiową między odpowiadającymi sobie punktami sąsiednich zwojów. Źródło: [ISO 5408, definicja skoku][S3].
- Wysokość trójkąta podstawowego:

  `H = (sqrt(3) / 2) P = 0,866025404 P`.

  Źródło współczynnika: [ISO 68-1:2023, pkt 5][S1]. Do SVG wystarcza `0,866025 P`.

### Ścięcia i dna profili

ISO 68-1:2023 rozróżnia wspólny profil podstawowy oraz różne profile nominalne gwintu wewnętrznego i zewnętrznego. Tego rozróżnienia nie wolno zgubić. Źródło: [ISO 68-1:2023, zakres i pkt 5][S1] oraz omówienie zmiany wydania z 2023 roku w [Bolt Science][S7].

Na wspólnym profilu podstawowym wierzchołek gwintu zewnętrznego i dno gwintu wewnętrznego są odsunięte od ostrych wierzchołków trójkąta o `H/8`, natomiast dno gwintu zewnętrznego i wierzchołek gwintu wewnętrznego o `H/4`. Daje to w obu przypadkach wysokość `H1 = 5H/8`. W profilu nominalnym śruby płaskie dno podstawowe przy `H/4` zastępuje głębszy, gładko zaokrąglony kontur opisany przez `h3`. Źródło proporcji profilu podstawowego: [ISO 68-1:2023, rysunek 1 i pkt 5][S1]. Źródło profilu nominalnego śruby: [Scientific Reports][S2].

| Element | Geometria nominalna | Źródło |
|---|---:|---|
| Wierzchołek gwintu zewnętrznego | ścięcie `H/8 = 0,108253175 P`; płaska szerokość `P/8` | [ISO 68-1:2023, pkt 5][S1] |
| Dno gwintu zewnętrznego, pełne zaokrąglenie | promień `R = H/6 = 0,144337567 P`; najniższy punkt leży na poziomie ścięcia ostrego trójkąta o `H/6` | [Scientific Reports, wzory 1 i 2][S2] |
| Dno gwintu zewnętrznego, zaokrąglenie częściowe | jeśli dokument wyrobu nie stanowi inaczej, `R1 min = 0,125 P = 0,144337567 H` | [Bolt Science, omówienie ISO 68-1:2023][S7] |
| Wierzchołek gwintu wewnętrznego | ścięcie `H/4 = 0,216506351 P`; płaska szerokość `P/4` | [ISO 68-1:2023, pkt 5][S1] |
| Dno gwintu wewnętrznego | poziom podstawowy odpowiada ścięciu `H/8 = 0,108253175 P` i płaskiej szerokości `P/8`; dno może być płaskie albo częściowo lub całkowicie zaokrąglone poza tym obrysem | [ISO 68-1:2023, pkt 5][S1] oraz [Scientific Reports, opis profilu wewnętrznego][S2] |
| Promień dna gwintu wewnętrznego | norma nie określa wartości promienia | [Scientific Reports, opis profilu wewnętrznego][S2] |

Kontur wierzchołka obu profili jest nominalnie płaski, choć ISO 68-1:2023 dopuszcza jego zaokrąglenie wynikające z metody wykonania. Do rysunku objaśniającego najczytelniejszy i poprawny jest wierzchołek płaski. Źródło: [Bolt Science][S7].

### Wysokości robocze

- `H1 = 5H/8 = 0,541265877 P`. Jest to wysokość gwintu wewnętrznego na profilu nominalnym oraz wysokość obu gwintów na wspólnym profilu podstawowym. Źródło i definicja symbolu: [ISO 68-1:2023, pkt 4 i 5][S1].
- Dla zewnętrznego profilu nominalnego z zaokrąglonym dnem właściwym symbolem jest `h3`, nie `H1`: `h3 = 17H/24 = 0,613434661 P`. Źródło: [Scientific Reports, wzór 1][S2].
- Dlatego strzałki `H`, `H1` i `h3` nie są zamienne. `H` obejmuje pełny, teoretycznie ostry trójkąt, `H1` obejmuje profil podstawowy lub wewnętrzny, a `h3` rzeczywisty nominalny profil zewnętrzny z zaokrąglonym dnem. Źródła wartości: [ISO 68-1:2023][S1] i [Scientific Reports][S2].

### Średnice podstawowe

Dla średnicy nominalnej zewnętrznej `d`:

- `d2 = d - 2(3H/8) = d - 0,649519 P`, gdzie `d2` jest średnicą podziałową. Źródło: [ISO 724:2023, pkt 5][S5].
- `d3 = d - 2h3 = d - 1,226869 P`, gdzie `d3` jest średnicą rdzenia zewnętrznego profilu nominalnego z zaokrąglonym dnem. Źródło: [ISO 724:2023, pkt 5][S5].
- Dla porównania średnica wewnętrzna gwintu wewnętrznego wynosi `D1 = d - 2H1 = d - 1,082532 P`. Tę samą wartość ma `d1` zewnętrznego profilu podstawowego, wspólnego dla obu gwintów. Nie należy podstawiać `d1` zamiast `d3` przy rysowaniu nominalnego profilu śruby. Źródła: [ISO 724:2023, pkt 5][S5] i definicje profilu podstawowego w [ISO 68-1:2023][S1].

Są to wymiary podstawowe, bez pola tolerancji. Nie należy opisywać ich jako gwarantowanych wymiarów zmierzonej śruby klasy `6g`. Źródło zakresu ISO 724:2023: [oficjalna karta ISO][S6].

### Sprawdzenie M10x1,5

Dane wejściowe `d = 10 mm` i `P = 1,5 mm` pochodzą z wiersza M10 w [ISO 4014:2022, tabela 2][S4]. Wyniki obliczeń:

| Wielkość | Obliczenie | Wynik obliczenia, mm | Wynik do rysunku lub tablicy, mm | Źródło wzoru i kontrola |
|---|---:|---:|---:|---|
| `H` | `0,866025404 × 1,5` | `1,299038106` | `1,2990` | [ISO 68-1:2023][S1] |
| `H/8` | `1,299038106 / 8` | `0,162379763` | `0,1624` | [ISO 68-1:2023][S1] |
| `H/4` | `1,299038106 / 4` | `0,324759527` | `0,3248` | [ISO 68-1:2023][S1] |
| `H1` | `0,541265877 × 1,5` | `0,811898816` | `0,8119` | [ISO 68-1:2023][S1] |
| `h3` | `0,613434661 × 1,5` | `0,920151992` | `0,9202` | [Scientific Reports][S2] |
| `R` | `0,144337567 × 1,5` | `0,216506351` | `0,2165` | [Scientific Reports][S2] |
| `R1 min` | `0,125 × 1,5` | `0,187500000` | `0,1875` | [Bolt Science][S7] |
| `d2` | `10 - 0,649519053 × 1,5` | `9,025721421` | `9,026` | wzór i wartość tablicowa: [ISO 724:2023][S5] |
| `D1`, także `d1` profilu podstawowego | `10 - 1,082531755 × 1,5` | `8,376202368` | `8,376` | wzór i wartość `D1`: [ISO 724:2023][S5]; symbol `d1`: [ISO 68-1:2023][S1] |
| `d3` | `10 - 1,226869322 × 1,5` | `8,159696017` | `8,160` | wzór i wartość tablicowa: [ISO 724:2023][S5] |

Zgodność jest pełna po zaokrągleniu do `0,001 mm`: ISO 724:2023 tablicuje dla M10x1,5 odpowiednio `d2 = 9,026 mm`, `D1 = 8,376 mm` i `d3 = 8,160 mm`. Źródło: [ISO 724:2023, tabela 1][S5].

### Proporcja wygodna do SVG

Jeżeli w powiększeniu przyjąć `P = 100` jednostek rysunku, to dla zewnętrznego profilu śruby należy użyć `H = 86,6025`, `h3 = 61,3435`, `R = 14,4338` oraz płaskiego wierzchołka o szerokości `12,5`. Źródła współczynników: [ISO 68-1:2023][S1] i [Scientific Reports][S2]. Wymiar `H` pokazać na przedłużeniach boków ostrego trójkąta, a wymiar `h3` można pominąć, jeśli ilustracja ma objaśniać wyłącznie kolumnę `H`.

## 2. Proporcje śruby sześciokątnej M10

Podstawą jest aktualne ISO 4014:2022, nie wycofane ISO 4014:2011. Aktualna edycja obejmuje śruby sześciokątne z częściowym gwintem o skoku grubym. Źródło statusu i zakresu: [oficjalna karta ISO 4014:2022][S8].

| Wymiar | M10 według ISO 4014:2022 | Stosunek do `d = 10 mm` | Jak użyć na ilustracji | Źródło |
|---|---:|---:|---|---|
| `s`, pod klucz | nominalnie `16,00 mm`, minimum `15,73 mm` | nominalnie `1,600 d` | wymiarować między przeciwległymi płaskimi bokami łba | [ISO 4014:2022, tabela 2][S4] |
| `k`, wysokość łba | nominalnie `6,4 mm`, zakres `6,22 do 6,58 mm` | nominalnie `0,640 d`, zakres `0,622 do 0,658 d` | do proporcji użyć wartości nominalnej | [ISO 4014:2022, tabela 2][S4] |
| `e`, wymiar przez naroża | minimum `17,77 mm` | minimum `1,777 d` | użyteczny do obwiedni sześciokąta | [ISO 4014:2022, tabela 2][S4] |
| `dw`, średnica powierzchni oporowej | minimum `14,63 mm` | minimum `1,463 d` | opcjonalna, jeśli spód łba jest pokazany dokładniej | [ISO 4014:2022, tabela 2][S4] |
| `b`, długość gwintu dla `l ≤ 125 mm` | wartość odniesienia `26 mm` | `2,600 d` | wymiar od końca śruby do granicy długości gwintu | [ISO 4014:2022, tabela 2 i przypis b][S4] |
| `l`, propozycja do ilustracji | `60 mm` | `6,000 d` | mierzyć od powierzchni oporowej pod łbem do końca śruby, bez `k` | [ISO 4014:2022, rysunek 1 i tabela 2][S4] |

Jedna normowa, typowa długość `l` dla M10: **nie potwierdzone**. Norma podaje szereg długości, nie jedną długość typową. `60 mm` jest świadomym wyborem do rysunku: występuje w szeregu ISO 4014:2022, leży między najkrótszą długością M10 równą `4,5d = 45 mm` a największą standardową długością równą `10d = 100 mm`, i pozostawia czytelny odcinek trzpienia bez pełnego gwintu. Źródło reguł długości i wiersza `60 mm`: [ISO 4014:2022, rysunek 1, przypisy d i e oraz tabela 2][S4].

Dla samego układu graficznego można więc przyjąć `d = 100` jednostek, `s = 160`, `k = 64`, `e ≥ 177,7`, `dw ≥ 146,3`, `b = 260` i `l = 600`. Są to wyłącznie powyższe stosunki przeskalowane z [ISO 4014:2022][S4].

Uwaga redakcyjna: starszy DIN 931 dla M10 bywa podawany z `s = 17 mm`, natomiast aktualne ISO 4014:2022 ma `s = 16 mm`. W jednym rysunku nie wolno łączyć łba DIN z pozostałymi wymiarami ISO. Źródło wartości ISO: [ISO 4014:2022, tabela 2][S4]. Źródło różnicy starszego DIN i ISO: [katalog Maryland Metrics, wiersz M10][S9].

## 3. Przedstawienie na rysunku technicznym

### Linie gwintu zewnętrznego

- Widoczne wierzchołki gwintu rysuje się ciągłą linią grubą. W widoku bocznym śruby są to dwie zewnętrzne linie średnicy `d`. Źródło: [ISO 6410-1:1993, pkt 3.2.1][S10].
- Widoczne dna gwintu rysuje się ciągłą linią cienką. W widoku bocznym są to dwie wewnętrzne linie średnicy rdzenia. Źródło: [ISO 6410-1:1993, pkt 3.2.1][S10].
- Granicę długości pełnego gwintu, jeśli jest widoczna, rysuje się ciągłą linią grubą. Linia kończy się na liniach średnicy zewnętrznej, nie na cienkich liniach dna. Źródło: [ISO 6410-1:1993, pkt 3.2.5][S10].
- Wybieg, gdy jest funkcjonalnie potrzebny albo wymiarowany, rysuje się ciągłą linią cienką i ukośną. Norma pozwala go pominąć tam, gdzie to możliwe. Źródło: [ISO 6410-1:1993, pkt 3.2.6][S10].

### Co narysować w tym konkretnym materiale

1. Główna śruba z boku: dwie grube linie zewnętrzne i dwie cienkie linie wewnętrzne, wszystkie równoległe do osi. To jest poprawne przedstawienie umowne według [ISO 6410-1:1993, pkt 3.2][S10].
2. Powiększenie obok: profil ząbkowany jest właściwy jako przedstawienie szczegółowe w publikacji lub materiale objaśniającym. Norma wprost dopuszcza taki przypadek i zaznacza, że skok ani profil zwykle nie muszą być rysowane w skali. Źródło: [ISO 6410-1:1993, pkt 3.1][S10].
3. W powiększeniu oznaczyć `P` równolegle do osi, `60°` między bokami oraz `H` na pełnym trójkącie konstrukcyjnym. Rzeczywisty profil śruby zakończyć płaskim wierzchołkiem i zaokrąglonym dnem `R = H/6`. Źródła geometrii: [ISO 5408][S3], [ISO 68-1:2023][S1] i [Scientific Reports][S2].
4. `s` najlepiej pokazać w małym widoku łba od czoła, między dwiema przeciwległymi płaskimi ściankami. `l` mierzyć bez wysokości łba, `b` wzdłuż osi przy końcu gwintowanym, a `d` poprzecznie przez wierzchołki gwintu. Układ symboli pokazuje [rysunek 1 ISO 4014:2022][S4].

Ząbkowany kontur na głównej sylwetce śruby nie jest standardowym przedstawieniem umownym. Jest dopuszczalnym zabiegiem ilustracyjnym, jeśli jest jednoznacznie wydzielony jako powiększony profil lub detal, a nie udawany widok techniczny całej śruby. Źródło rozróżnienia przedstawienia szczegółowego i umownego: [ISO 6410-1:1993, pkt 3.1 i 3.2][S10].

## 4. Lista błędów, których należy uniknąć

### Geometria profilu

- Nie opisywać rzeczywistej wysokości zęba jako `H`. `H = 0,866025404 P` jest wysokością trójkąta podstawowego, zaś nominalna głębokość profilu zewnętrznego wynosi `h3 = 0,613434661 P`. Źródła: [ISO 68-1:2023][S1] i [Scientific Reports][S2].
- Nie rysować `60°` między bokiem i osią. `60°` jest kątem między bokami, a kąt boku do prostej prostopadłej do osi wynosi `30°`. Źródła: [ISO 5408][S3] i [ISO 68-1:2023][S1].
- Nie rysować ostrego wierzchołka i ostrego dna jako profilu gotowej śruby. Wierzchołek zewnętrzny ma ścięcie `H/8`, a dno ma gładkie zaokrąglenie. Dla wariantu pełnego jest to `R = H/6`, a wariant częściowy ma domyślnie `R1 min = 0,125 P`. Źródła: [ISO 68-1:2023][S1], [Scientific Reports][S2] i [Bolt Science][S7].
- Nie przenosić profilu nakrętki na śrubę. Gwint wewnętrzny ma wysokość `H1 = 5H/8`, a zewnętrzny profil nominalny ma `h3 = 17H/24` i zaokrąglone dno. Źródła: [ISO 68-1:2023][S1] i [Scientific Reports][S2].
- Nie mierzyć `P` po skosie boku ani między nieodpowiadającymi punktami. `P` jest odległością osiową punktów homologicznych. Źródło: [ISO 5408][S3].
- Nie umieszczać `d2` w dowolnej połowie wysokości zęba. Jego położenie wynika ze wzoru `d2 = d - 0,649519 P`. Źródło: [ISO 724:2023][S5].
- Nie podpisywać `d3` wartością `d1`. Dla M10x1,5 różnica wynosi `8,160 mm` wobec `8,376 mm`. Źródło obu wartości: [ISO 724:2023, tabela 1][S5].

### Helisa i zakończenia gwintu

- Jeżeli szczegółowy profil jest rysowany po obu stronach osi śruby jednozwojnej, nie ustawiać obu stron w tej samej fazie. Strona przeciwna powinna być przesunięta osiowo o `P/2`. Źródło zasady konstrukcyjnej: [Technical Graphics, rozdział o rysowaniu gwintów][S11]. W głównym widoku umownym problem znika, bo stosuje się linie równoległe.
- Nie prowadzić pełnego gwintu do powierzchni pod łbem w śrubie ISO 4014 M10x60. Dla `l = 60 mm` długość gwintu ma wartość odniesienia `b = 26 mm`, więc śruba musi mieć czytelny odcinek niegwintowany. Źródło: [ISO 4014:2022, tabela 2][S4].
- Nie pokazywać pełnego zęba aż do czoła końca śruby. ISO 4014:2022 wymaga dla M10 końca fazowanego i dopuszcza gwint niepełny `u ≤ 2P`; dla `P = 1,5 mm` daje to `u ≤ 3,0 mm`. Źródło: [ISO 4014:2022, rysunek 1, przypisy a i b oraz tabela 2][S4].
- Nie rysować dosłownego, nagłego uskoku od pełnego gwintu do gładkiego trzpienia, jeśli pokazuje się geometrię szczegółową. Należy pokazać wybieg albo podcięcie. W przedstawieniu umownym sam wybieg wolno pominąć, więc jego brak nie jest automatycznie błędem. Źródło: [ISO 6410-1:1993, pkt 3.2.6][S10].

### Wymiarowanie i konwencja

- Nie wliczać wysokości łba `k = 6,4 mm` do długości `l = 60 mm`. `l` zaczyna się na powierzchni oporowej pod łbem. Źródło: [ISO 4014:2022, rysunek 1 i tabela 2][S4].
- Nie oznaczać wymiarem `s` odległości między narożami. Dla aktualnego ISO 4014:2022 `s = 16,00 mm` jest wymiarem między płaskimi ściankami, a `e ≥ 17,77 mm` wymiarem przez naroża. Źródło: [ISO 4014:2022, rysunek 1 i tabela 2][S4].
- Nie mieszać `s = 17 mm` ze starego DIN 931 z geometrią aktualnego ISO 4014:2022, w którym M10 ma `s = 16 mm`. Źródła: [Maryland Metrics][S9] i [ISO 4014:2022][S4].
- Nie odwracać grubości linii: wierzchołki widoczne są grube, dna cienkie. Nie kończyć grubej granicy gwintu na cienkiej linii dna. Źródło: [ISO 6410-1:1993, pkt 3.2.1 i 3.2.5][S10].
- Nie przedstawiać ząbkowanej sylwetki całej śruby jako standardowego uproszczenia rysunkowego. Standardowym widokiem są linie równoległe; ząbki należą do osobnego przedstawienia szczegółowego. Źródło: [ISO 6410-1:1993, pkt 3.1 i 3.2][S10].
- Nie opisywać wartości podstawowych `d2 = 9,026 mm` i `d3 = 8,160 mm` jako granicznych wymiarów rzeczywistej śruby bez podania pola tolerancji. ISO 724:2023 definiuje wymiary podstawowe, nie granice klasy wykonania. Źródło: [oficjalna karta ISO 724:2023][S6] i [tabela ISO 724:2023][S5].

## Źródła

[S1]: https://cdn.standards.iteh.ai/samples/85107/2562fb7b223244f5a95c287e78f257a6/ISO-68-1-2023.pdf "ISO 68-1:2023, publiczny podgląd"
[S2]: https://www.nature.com/articles/s41598-026-53095-1 "M. Andó, Novel calculation methods for geometrically accurate thread depth, Scientific Reports 2026"
[S3]: https://cdn.standards.iteh.ai/samples/44424/c5d401f647744dd886f406a39f501680/ISO-5408-2009.pdf "ISO 5408:2009, publiczny podgląd definicji"
[S4]: https://cdn.standards.iteh.ai/samples/72579/81f2b1e966b440d7a25f6734e508ea48/ISO-4014-2022.pdf "ISO 4014:2022, publiczny podgląd"
[S5]: https://cdn.standards.iteh.ai/samples/85104/8fc8f785b7d2431ebed8f1ef4058c224/ISO-724-2023.pdf "ISO 724:2023, publiczny podgląd wzorów i tabeli wymiarów podstawowych"
[S6]: https://www.iso.org/cms/%20render/live/en/sites/isoorg/contents/data/standard/08/51/85104.html "ISO 724:2023, oficjalna karta"
[S7]: https://www.boltscience.com/pages/ISO68-1-basic-and-design-thread-profiles.htm "Bolt Science, omówienie profili ISO 68-1:2023"
[S8]: https://www.iso.org/standard/72579.html "ISO 4014:2022, oficjalna karta"
[S9]: https://khainguyen.com.vn/wp-content/uploads/2021/08/ISO-4014.pdf "Maryland Metrics, zestawienie ISO 4014 i DIN 931"
[S10]: https://cdn.standards.iteh.ai/samples/12750/07f99becf07a454ab9fece84a0dce861/ISO-6410-1-1993.pdf "ISO 6410-1:1993, publiczny podgląd"
[S11]: https://studylib.net/doc/26994368/meyers-et-al.---technical-graphics-schroff-development-co... "Technical Graphics, zasada przesunięcia profili po przeciwnych stronach"
