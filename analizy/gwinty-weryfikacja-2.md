# Druga weryfikacja danych o gwintach

**Werdykt:** dane nie nadają się jeszcze do publikacji bez zastrzeżeń. Wartości normatywne skoków, wymiarów pod klucz i długości gwintu są po korektach spójne ze sprawdzonymi normami, a największa wcześniejsza luka, czyli wymiary pod klucz od M42 do M100, została zamknięta. Publikację blokuje jednak mechanizm `minD`: znaleziony katalogowy wariant M5x250 z gwintem częściowym 35,4 mm obala próg `minD: 8`, a wariant M3x150 obala handlowe uzasadnienie progu `minD: 5`. Dodatkowo artykuł tłumaczy każdą kreskę wyłącznie niemożliwością geometryczną, choć kod wstawia ją również z powodu tych progów. Rekomenduję usunąć `minD` i oddzielić obliczenie normowego `b` od informacji o dostępności handlowej.

## Zakres i metoda

Punktem wyjścia były aktualne pliki `src/lib/gwinty/dane.js` oraz `src/lib/gwinty/dane.test.mjs`, a nie ustalenia zapamiętane z pierwszej rundy. Uruchomiony zestaw zawiera 13 testów i wszystkie 13 przechodzą. Testy potwierdzają zgodność implementacji z przyjętymi założeniami, ale nie dowodzą prawdziwości progów handlowych.

Wskazana w zadaniu lista wymiarów pod klucz powyżej M39 zawiera 14 średnic i dokładnie 14 takich wpisów występuje w aktualnym `dane.js`. Wszystkie 14 zostały sprawdzone osobno.

## Nowe znaleziska

Poniżej są wyłącznie ustalenia, których nie było w pierwszym raporcie.

| Parametr | Nasza wartość lub zachowanie | Wartość ze źródła | Źródło | Rekomendacja |
|---|---:|---:|---|---|
| Próg średnicy dla śrub dłuższych niż 200 mm | `minD: 8`, więc M5x250 nie dostaje wyniku | M5x250, skok 0,8 mm, gwint częściowy 35,4 mm, klasa 4.8, kod dostawcy `BHBM5x0.8x250` | [JSP Store, karta produktu M5x250](https://www.jspstore.com/product/55223-52885/%E0%B8%99%E0%B9%87%E0%B8%AD%E0%B8%95%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B8%AB%E0%B8%81%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A1%E0%B8%82%E0%B8%B2%E0%B8%A7-m5x250-%E0%B9%80%E0%B8%81%E0%B8%A3%E0%B8%94-48-%E0%B9%80%E0%B8%81%E0%B8%A5%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%95%E0%B8%A5%E0%B8%AD%E0%B8%94) | Usunąć `minD`. Doraźne obniżenie progu do 5 naprawiłoby ten przypadek, ale nadal udawałoby nieistniejącą granicę rynku. |
| Próg średnicy w przedziale powyżej 125 do 200 mm | `minD: 5`, więc M3x150 nie dostaje wyniku | Zewnętrzna śruba sześciokątna M3x150, kod IMPA 692322; karta nie podaje długości gwintu | [Ship Store, M3x150, kod 692322](https://www.ship-store.com/product-page/stainless-steel-bolt-and-nut-hexagon-head-m3-x-150-mm), [katalog Balaji Marine, pozycja 692322](https://www.balajimarine.com/pdf/screw%20and%20nuts.pdf) | Nie używać dostępności handlowej jako warunku pokazania wzoru. Dla M3x150 nie wolno jednak przypisać normowego `b` bez potwierdzenia wykonania i normy produktu. |
| Znaczenie kreski w artykule | `dlugoscGwintu()` zwraca `null` również przy `d < minD` | Artykuł mówi, że kreska oznacza wyłącznie przypadek, w którym obliczony gwint byłby dłuższy od śruby | `src/lib/gwinty/dane.js`, `src/lib/blocks/BlockRenderer.js`, `content/wiedza/gwinty-metryczne-tabela.json` | Usunąć progi albo w przyszłej korekcie tekstu rozróżnić brak wyniku geometryczny od arbitralnego filtra dostępności. Obecnie prezentacja jest merytorycznie myląca. |

Karta JSP Store nie podaje producenta ani zgodności z ISO 4014 lub DIN 931. Jest jednak wystarczającym dowodem przeciw komentarzowi w kodzie, który przedstawia `minD` jako granicę spotykaną w katalogach. Podane 35,4 mm nie obala normowego wzoru dającego dla M5 wartość 35 mm, ponieważ nie wykazano, że produkt wykonano według tej normy.

## Ocena pięciu wprowadzonych korekt

| Korekta | Wynik drugiej kontroli | Czy powstał nowy błąd |
|---|---|---|
| Skok 6 mm dla M72, M76, M80, M85, M90 i M100 | Wprowadzona poprawnie. Każdy z 6 wpisów ma `pUwaga`, a renderer dodaje gwiazdkę. ISO 261:1998 podaje te skoki w tabeli 2, ale szereg zgrubny wyróżniony grubą linią kończy się na M68. [ISO 261:1998, tabela 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf) | Nie. |
| M85 bez śruby sześciokątnej | `sruba: false` jest odczytywane przed heurystyką po `k`. M85 nie występuje ani w zakresie ISO 4014 od M1,6 do M64, ani w szeregu DIN 931-2 od M68 do M160x6. [ISO 4014:2022](https://cdn.standards.iteh.ai/samples/72579/81f2b1e966b440d7a25f6734e508ea48/ISO-4014-2022.pdf), [DIN 931-2, zakres normy](https://www.dinmedia.de/en/standard/din-931-2/117410325) | Nie. Pozostałe średnice z `k` zostały sprawdzone niżej. |
| Przypis dla M14x1,25 | Wprowadzony poprawnie jako `pdUwagi`. Pełna kontrola przypisów ISO 261 potwierdza zastosowanie wyłącznie do świec zapłonowych silników. [ISO 261:1998, przypis a do tabeli 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf) | Nie. |
| Próg dla śrub dłuższych niż 200 mm obniżony z 10 do 8 | Zmiana została wykonana zgodnie z poprzednią rekomendacją i test obejmuje M8x250 oraz M8x300. Nowy produkt M5x250 dowodzi jednak, że poprawiony próg 8 nadal jest fałszywy jako granica handlowa. [JSP Store, M5x250 i gwint 35,4 mm](https://www.jspstore.com/product/55223-52885/%E0%B8%99%E0%B9%87%E0%B8%AD%E0%B8%95%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B8%AB%E0%B8%81%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A1%E0%B8%82%E0%B8%B2%E0%B8%A7-m5x250-%E0%B9%80%E0%B8%81%E0%B8%A3%E0%B8%94-48-%E0%B9%80%E0%B8%81%E0%B8%A5%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%95%E0%B8%A5%E0%B8%AD%E0%B8%94) | Tak, w sensie merytorycznym pozostał błędny filtr. Nie jest to regresja kodu, lecz nowy kontrprzykład dla założenia. |
| Opis przedziału `powyżej 125 do 200 mm` | Granice są teraz opisane zgodnie z warunkiem `l <= 200` po odrzuceniu `l <= 125`. | Nie. |

Poprawka zdania w `content/wiedza/gwinty-metryczne-tabela.json` także jest prawidłowa. Tekst rozdziela teraz koniec szeregu zgrubnego DIN 13-1 na M68 od występowania większych średnic ze skokiem 6 mm w ISO 261.

## Wymiary pod klucz powyżej M39

Źródłem rozstrzygającym jest ISO 272:1982, tabela 1. Norma jest nadal publikowana, a ISO podało jej ponowne potwierdzenie w 2023 roku. [Status ISO 272:1982](https://www.iso.org/standard/4182.html). Drugim źródłem jest katalog nakrętek DIN 934 i ISO 4032 TurkeyFasteners. Dodatkową kontrolę praktyczną daje tabela wkładek narzędzi napinających ITH. Kreska ITH przy M85 oznacza brak wkładki w tym katalogu, a nie inną wartość wymiaru pod klucz.

| Gwint | `k` w danych, mm | ISO 272, mm | Niezależne potwierdzenie, mm | Wynik i źródła |
|---|---:|---:|---:|---|
| M42 | 65 | 65 | 65 | Zgodne. [ISO 272, tab. 1](https://cdn.standards.iteh.ai/samples/4182/6ca794f3439e4e96b6dae186f88f189f/ISO-272-1982.pdf), [ITH, M42 i 65](https://www.ith.com/en/products-accessories/bolt-tensioning-cylinder-type-esx/) |
| M45 | 70 | 70 | 70 | Zgodne. [ISO 272, tab. 1](https://cdn.standards.iteh.ai/samples/4182/6ca794f3439e4e96b6dae186f88f189f/ISO-272-1982.pdf), [ITH, M45 i 70](https://www.ith.com/en/products-accessories/bolt-tensioning-cylinder-type-esx/) |
| M48 | 75 | 75 | 75 | Zgodne. [ISO 272, tab. 1](https://cdn.standards.iteh.ai/samples/4182/6ca794f3439e4e96b6dae186f88f189f/ISO-272-1982.pdf), [ITH, M48 i 75](https://www.ith.com/en/products-accessories/bolt-tensioning-cylinder-type-esx/) |
| M52 | 80 | 80 | 80 | Zgodne. [ISO 272, tab. 1](https://cdn.standards.iteh.ai/samples/4182/6ca794f3439e4e96b6dae186f88f189f/ISO-272-1982.pdf), [ITH, M52 i 80](https://www.ith.com/en/products-accessories/bolt-tensioning-cylinder-type-esx/) |
| M56 | 85 | 85 | 85 | Zgodne. [ISO 272, tab. 1](https://cdn.standards.iteh.ai/samples/4182/6ca794f3439e4e96b6dae186f88f189f/ISO-272-1982.pdf), [ITH, M56 i 85](https://www.ith.com/en/products-accessories/bolt-tensioning-cylinder-type-esx/) |
| M60 | 90 | 90 | 90 | Zgodne. [ISO 272, tab. 1](https://cdn.standards.iteh.ai/samples/4182/6ca794f3439e4e96b6dae186f88f189f/ISO-272-1982.pdf), [ITH, M60 i 90](https://www.ith.com/en/products-accessories/bolt-tensioning-cylinder-type-esx/) |
| M64 | 95 | 95 | 95 | Zgodne. [ISO 272, tab. 1](https://cdn.standards.iteh.ai/samples/4182/6ca794f3439e4e96b6dae186f88f189f/ISO-272-1982.pdf), [ITH, M64 i 95](https://www.ith.com/en/products-accessories/bolt-tensioning-cylinder-type-esx/) |
| M68 | 100 | 100 | 100 | Zgodne. [ISO 272, tab. 1](https://cdn.standards.iteh.ai/samples/4182/6ca794f3439e4e96b6dae186f88f189f/ISO-272-1982.pdf), [ITH, M68 i 100](https://www.ith.com/en/products-accessories/bolt-tensioning-cylinder-type-esx/) |
| M72 | 105 | 105 | 105 | Zgodne. [ISO 272, tab. 1](https://cdn.standards.iteh.ai/samples/4182/6ca794f3439e4e96b6dae186f88f189f/ISO-272-1982.pdf), [ITH, M72 i 105](https://www.ith.com/en/products-accessories/bolt-tensioning-cylinder-type-esx/) |
| M76 | 110 | 110 | 110 | Zgodne. [ISO 272, tab. 1](https://cdn.standards.iteh.ai/samples/4182/6ca794f3439e4e96b6dae186f88f189f/ISO-272-1982.pdf), [ITH, M76 i 110](https://www.ith.com/en/products-accessories/bolt-tensioning-cylinder-type-esx/) |
| M80 | 115 | 115 | 115 | Zgodne. [ISO 272, tab. 1](https://cdn.standards.iteh.ai/samples/4182/6ca794f3439e4e96b6dae186f88f189f/ISO-272-1982.pdf), [ITH, M80 i 115](https://www.ith.com/en/products-accessories/bolt-tensioning-cylinder-type-esx/) |
| M85 | 120 | 120 | 120 | Zgodne dla wymiaru elementu sześciokątnego, nie jest to dowód istnienia śruby DIN 931. [ISO 272, tab. 1](https://cdn.standards.iteh.ai/samples/4182/6ca794f3439e4e96b6dae186f88f189f/ISO-272-1982.pdf), [TurkeyFasteners, M85 i 120](https://pub-mediabox-storage.rxweb-prd.com/exhibitor/products/exh-d93ed7ed-efef-45a9-9974-5380c3a6f241/product-documents/pro-a3099c04-3f81-4865-ae88-07794b32f35a/610d20ba-b20e-4cdd-827e-b954dd41bc3c.pdf) |
| M90 | 130 | 130 | 130 | Zgodne. [ISO 272, tab. 1](https://cdn.standards.iteh.ai/samples/4182/6ca794f3439e4e96b6dae186f88f189f/ISO-272-1982.pdf), [ITH, M90 i 130](https://www.ith.com/en/products-accessories/bolt-tensioning-cylinder-type-esx/) |
| M100 | 145 | 145 | 145 | Zgodne. [ISO 272, tab. 1](https://cdn.standards.iteh.ai/samples/4182/6ca794f3439e4e96b6dae186f88f189f/ISO-272-1982.pdf), [ITH, M100 i 145](https://www.ith.com/en/products-accessories/bolt-tensioning-cylinder-type-esx/) |

Nie stwierdziłem żadnej rozbieżności liczbowej. Katalog TurkeyFasteners podaje także zgodne wartości dla pozostałych 13 średnic z tej tabeli, więc każda wartość ma kontrolę normową i katalogową.

## Czy istnieje jeszcze jakieś M85

Nie. Każda pozostała średnica mająca `k` występuje jako śruba z łbem sześciokątnym w ISO 4014:2022 albo DIN 931-2:2009.

| Źródło | Potwierdzone średnice z aktualnego `dane.js` | Uwagi |
|---|---|---|
| [ISO 4014:2022, tabele 1 i 2](https://cdn.standards.iteh.ai/samples/72579/81f2b1e966b440d7a25f6734e508ea48/ISO-4014-2022.pdf) | M1,6, M2, M2,5, M3, M3,5, M4, M5, M6, M7, M8, M10, M12 | M3,5 jest wymiarem niepreferowanym. M7 dodano do wydania ISO 4014 z 2022 roku i także jest niepreferowany, ale śruba normowa istnieje. |
| [ISO 4014:2022, tabele 3 do 6](https://cdn.standards.iteh.ai/samples/72579/81f2b1e966b440d7a25f6734e508ea48/ISO-4014-2022.pdf) | M14, M16, M18, M20, M22, M24, M27, M30, M33, M36, M39, M42, M45, M48, M52, M56, M60, M64 | Średnice w nawiasach normy są dopuszczone, ale niepreferowane. |
| [DIN 931-2:2009, zakres M68 do M160x6](https://www.dinmedia.de/en/standard/din-931-2/117410325) oraz [tabela wymiarów DIN 931-2](https://fr.scribd.com/document/879591316/DIN-931-2) | M68, M72, M76, M80, M90, M100 | Szereg tabeli to M68, M72, M76, M80, M90, M100, M110, M125, M140 i M160. Nie ma M85. |

Wniosek dla implementacji jest korzystny: jawny wyjątek `sruba: false` przy M85 wystarcza dla obecnego zbioru. Heurystyka po obecności `k` nie daje drugiego fałszywego wyniku. Dla przyszłych dopisków bezpieczniejsze pozostaje jednak jawne pole `sruba`, ponieważ ISO 272 określa wymiar pod klucz, a nie istnienie konkretnego typu śruby.

## Progi długości śrub

### Próba obalenia

1. M5 dłuższa niż 200 mm została znaleziona: M5x250, skok 0,8 mm, klasa 4.8, wykonanie z gwintem częściowym, kod `BHBM5x0.8x250`, długość gwintu 35,4 mm. Źródło: [JSP Store](https://www.jspstore.com/product/55223-52885/%E0%B8%99%E0%B9%87%E0%B8%AD%E0%B8%95%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B8%AB%E0%B8%81%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A1%E0%B8%82%E0%B8%B2%E0%B8%A7-m5x250-%E0%B9%80%E0%B8%81%E0%B8%A3%E0%B8%94-48-%E0%B9%80%E0%B8%81%E0%B8%A5%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%95%E0%B8%A5%E0%B8%AD%E0%B8%94). Producent nie jest podany.
2. M3 dłuższa niż 125 mm została znaleziona: M3x150, zewnętrzny łeb sześciokątny, zestaw ze stali nierdzewnej, kod IMPA 692322. Źródła: [Ship Store](https://www.ship-store.com/product-page/stainless-steel-bolt-and-nut-hexagon-head-m3-x-150-mm) i [Balaji Marine](https://www.balajimarine.com/pdf/screw%20and%20nuts.pdf). Producent i długość gwintu nie są podane.
3. Zewnętrznej śruby sześciokątnej M4 dłuższej niż 200 mm nie potwierdziłem. Wynik negatywny nie dowodzi jej nieistnienia.

### Ocena mechanizmu

Lepsza jest alternatywa zaproponowana w zadaniu: usunąć `minD` i pokazywać wynik wzoru wszędzie, gdzie obliczone `b` mieści się w długości całkowitej. Wzór opisuje geometrię referencyjną śruby, natomiast dostępność handlowa zależy od producenta, materiału, klasy, wykonania i rynku. Mieszanie obu informacji powoduje trzy problemy:

- każda nowa oferta handlowa może obalić próg;
- kreska nie ma jednego znaczenia;
- test utrwala bieżące założenie katalogowe, zamiast sprawdzać normę.

Po usunięciu progów opis powinien wyraźnie mówić: wynik jest referencyjną długością gwintu dla wskazanego zakresu długości, a nie zapewnieniem, że każdy wariant średnicy i długości jest objęty normą albo dostępny w sprzedaży.

## Skoki drobnozwojne i przypisy ISO 261

Przejrzałem całą tabelę 2 i oba przypisy ISO 261:1998, a także regułę dotyczącą wartości zapisanych w nawiasach. [ISO 261:1998, punkt 5.1 i tabela 2](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf).

- Przypis `a` dotyczy tylko M14x1,25 i ogranicza zastosowanie do świec zapłonowych silników. Jest już prawidłowo zapisany.
- Przypis `b` dotyczy tylko M35 i zastosowania do nakrętek łożyskowych. M35 nie występuje w naszych danych.
- Wartości w nawiasach należy w miarę możliwości omijać. W tabeli dotyczą one między innymi M30x3 i M33x3, ale skoku 3 mm nie ma w naszych tablicach `pd` dla M30 ani M33.

Nie znalazłem drugiego wpisu `pd`, który wymagałby ostrzeżenia podobnego do M14x1,25. Nie znalazłem też w naszych `pd` pozycji opisanej przez ISO 261 jako wycofywana.

## Zaokrąglenie przy M1,6

ISO 4014:2022 podaje dla M1,6 tablicową wartość `b = 9 mm`. [ISO 4014:2022, tabela 1](https://cdn.standards.iteh.ai/samples/72579/81f2b1e966b440d7a25f6734e508ea48/ISO-4014-2022.pdf). Publiczna tabela DIN 931-1 podaje tę samą wartość 9 mm. [DIN 931-1, tabela 1](https://www.jsjustso.com/wanboguanwangmanbetx/pic/DIN931.pdf).

Normy podają 9 mm jako wartość tablicową. Nie znalazłem w nich reguły mówiącej, że należy obliczyć 9,2 mm i zaokrąglić do 9 mm. `Math.round()` daje więc prawidłowy wynik liczbowy, ale komentarz w kodzie nie powinien przedstawiać tego jako potwierdzonego normą sposobu zaokrąglania.

Dla wszystkich pozostałych średnic śrub w naszym zbiorze wzory `2d + 6`, `2d + 12` i `2d + 25` dają wartości całkowite i zgadzają się z odpowiednimi tabelami ISO 4014 lub DIN 931-2. Nie znalazłem drugiej średnicy, dla której wartość tablicowa różniłaby się od wyniku algebraicznego.

## Klasyfikacja pierwszego, drugiego i trzeciego wyboru

Drugim, niezależnym od użytego wcześniej podglądu źródłem jest tabela preferowanych średnic w podręczniku Fastener Training Institute, przypisana Metric & Multistandard Components Corp. [Fastener Training Institute, Basic Training Guide, strona 16 PDF](https://www.guide2source.com/users/public/catalogs/0001a-FastenerTrainingInstitute-BasicTrainingGuide2009-Education.pdf). Wynik porównałem także z układem kolumn w [ISO 261:1998, tabela 1](https://cdn.standards.iteh.ai/samples/4165/ec50482690954e82931c52fdce3bc8bb/ISO-261-1998.pdf).

Lista gotowa do wprowadzenia do danych:

- `wybor: 1`, 25 pozycji: M1, M1,2, M1,6, M2, M2,5, M3, M4, M5, M6, M8, M10, M12, M16, M20, M24, M30, M36, M42, M48, M56, M64, M72, M80, M90, M100.
- `wybor: 2`, 17 pozycji: M1,4, M1,8, M2,2, M3,5, M7, M14, M18, M22, M27, M33, M39, M45, M52, M60, M68, M76, M85.
- `wybor: 3`, 1 pozycja: M9.

Szczególnie wskazane w zadaniu przypadki są potwierdzone następująco: M1,2 ma wybór 1; M7 wybór 2; M9 wybór 3; M72 wybór 1; M76 wybór 2; M85 wybór 2; M100 wybór 1. Oba źródła dają ten sam podział 25 + 17 + 1 = 43.

## Co nadal pozostaje niepotwierdzone

1. Producent i zgodność M5x250 z ISO 4014 albo DIN 931 nie są podane przez JSP Store. Potwierdzone są oferta, oznaczenie, długość 250 mm i gwint częściowy 35,4 mm, ale nie wolno używać tej karty jako dowodu na normową wartość `b = 35 mm`.
2. Długość gwintu M3x150 nie jest podana przez Ship Store ani Balaji Marine. Produkt obala opis progu jako granicy handlowej, lecz nie potwierdza wyniku wzoru `b = 18 mm` dla tego konkretnego wykonania.
3. Nie potwierdziłem zewnętrznej śruby sześciokątnej M4 o długości większej niż 200 mm. Nie ma podstaw, aby z niepowodzenia wyszukiwania tworzyć próg normowy lub handlowy.
4. Pełny tekst PN-M-82101 nadal nie był publicznie dostępny. Nie blokuje to wyniku dla M1,6, ponieważ wartość 9 mm została potwierdzona bezpośrednio w ISO 4014 i w tabeli DIN 931-1.
5. Nie przeprowadzono wyczerpującego przeglądu światowego rynku śrub. Taki przegląd szybko się dezaktualizuje i nie może być podstawą trwałego `minD`.

## Konkluzja wdrożeniowa

Nie ma podstaw do zmiany wartości `p`, `pd`, `k`, klasyfikacji wyboru ani tablicowych długości `b`. Nie znaleziono drugiego przypadku podobnego do M85 ani drugiego specjalnego przypisu podobnego do M14x1,25. Jedyna blokada publikacyjna dotyczy filtrowania wyników przez `minD` oraz wynikającego z niego fałszywego znaczenia kreski. Po usunięciu progów i pozostawieniu warunku geometrycznego dane mogą być publikowane z krótkim zastrzeżeniem, że tabela nie gwarantuje dostępności każdego wariantu na rynku.
