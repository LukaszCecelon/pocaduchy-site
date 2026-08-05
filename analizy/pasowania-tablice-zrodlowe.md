# Pasowania normalne: tablice zrodlowe

Material przekazany przez Lukasza (zrzut z tablic normatywnych) oraz lista
zastosowan ze zrodla podanego nizej. Ten plik jest **zrodlem prawdy** dla
pasowan uprzywilejowanych i opisow zastosowan w kalkulatorze.

## Tablica 5: pasowania normalne wg zasady stalego otworu

Wiersz opisuje rodzaj pasowania, kolumna klase dokladnosci otworu podstawowego.
Gwiazdka oznacza pasowanie **uprzywilejowane** (w oryginale w ramce).

### Luzne

| H5 | H6 | H7 | H8 | H9 | H10 | H11 | H12 |
|---|---|---|---|---|---|---|---|
| H5/g6 | H6/f6 | H7/c8 | H8/c8 | H9/d9 * | H10/d10 | H11/a11 | H12/b12 |
| H5/h4 | H6/g5 | H7/d8 | H8/d8 | H9/e8 | H10/h10 | H11/b11 | H12/h12 |
|  | H6/h5 | H7/e8 * | H8/d9 * | H9/e9 |  | H11/c11 * |  |
|  |  | H7/f7 * | H8/e8 * | H9/f8 |  | H11/d11 * |  |
|  |  | H7/g6 * | H8/e9 * | H9/f9 |  | H11/h11 * |  |
|  |  | H7/h6 * | H8/f8 * | H9/h8 |  |  |  |
|  |  |  | H8/f9 | H9/h9 |  |  |  |
|  |  |  | H8/h7 * |  |  |  |  |
|  |  |  | H8/h8 * |  |  |  |  |
|  |  |  | H8/h9 |  |  |  |  |

### Mieszane

| H5 | H6 | H7 | H8 |
|---|---|---|---|
| H5/js4 | H6/js5 | H7/js6 * | H8/js7 |
| H5/k4 | H6/k5 | H7/k6 * | H8/k7 |
| H5/m4 | H6/m5 | H7/m6 * | H8/m7 |
| H5/n4 | H6/n5 | H7/n6 * | H8/n7 |

### Ciasne

| H6 | H7 | H8 |
|---|---|---|
| H6/p5 | H7/p6 * | H8/s7 |
| H6/r5 | H7/r6 * | H8/u8 |
| H6/s5 | H7/s6 * | H8/x8 |
|  | H7/s7 | H8/z8 |
|  | H7/t6 |  |
|  | H7/u7 |  |

## Tablica 6: pasowania normalne wg zasady stalego walka

### Luzne

| h4 | h5 | h6 | h7 | h8 | h9 | h10 | h11 | h12 |
|---|---|---|---|---|---|---|---|---|
| G5/h4 | F7/h5 | D8/h6 | D8/h7 | D8/h8 | D9/h9 | D10/h10 | A11/h11 | B12/h12 |
| H5/h4 | G6/h5 | E8/h6 | E8/h7 | E8/h8 | E9/h9 | H10/h10 | B11/h11 | H12/h12 |
|  | H7/h5 | F7/h6 | F8/h7 | E9/h8 |  |  | C11/h11 |  |
|  |  | F8/h6 * | H8/h7 * | E9/h8 * | F9/h9 |  | D11/h11 |  |
|  |  | G7/h6 * |  | F8/h8 | H8/h9 |  | H11/h11 * |  |
|  |  | H7/h6 * |  | F9/h8 | H9/h9 |  |  |  |
|  |  |  |  | H8/h8 * | H10/h9 |  |  |  |
|  |  |  |  | H9/h8 |  |  |  |  |

### Mieszane

| h4 | h5 | h6 | h7 |
|---|---|---|---|
| Js5/h4 | Js6/h5 | Js7/h6 | Js8/h7 |
| K5/h4 | K6/h5 | K7/h6 * | K8/h7 |
| M5/h4 | M6/h5 | M7/h6 | M8/h7 |
| N5/h4 | N6/h5 | N7/h6 | N8/h7 |

### Ciasne

| h5 | h6 | h7 |
|---|---|---|
| P6/h5 | P7/h6 * | U8/h7 |
|  | R7/h6 |  |
|  | S7/h6 |  |

## Zastosowania popularnych par pasowan

Zrodlo: https://pkm.edu.pl/baza-wiedzy/tolerancje-i-pasowania/dobor-pasowan-wymiarow/
Sprawdzono: 2026-08-05.

Kolejnosc od najciasniejszych do najluzniejszych.

| Pasowania | Zastosowanie |
|---|---|
| U8/h7, H8/s7, S7/h6, H7/r6, R7/h6 | polaczenia wtlaczane kol zebatych z walami, tarcz sprzeglowych oraz wiencow kol zebatych z piastami |
| H7/p6, P7/h6 | polaczenia kol zebatych z walami maszyn obciazonych zmiennie i udarowo, laczenie tulei lozyskowych, kolkow, pierscieni osadczych oraz wpustow |
| H7/n6, N7/h6 | polaczenia wiencow kol zebatych z piastami, dzwigni i korb na walach, tulei w korpusach, kol i sprzegiel na walach, lozysk na walach |
| H7/m6, M7/h6 | polaczenia kol pasowych i zebatych na walach, zabezpieczone przed przemieszczaniem wzdluznym, sworzni oraz kolkow ustalajacych |
| H7/k6 | polaczenia kol pasowych i zamachowych z walami, recznych dzwigni na walach, kolkow, srub oraz sworzni ustalajacych |
| H7/j6, J7/h6 | polaczenia czesci czesto demontowanych recznie: zewnetrzne pierscienie lozysk tocznych w oslonach, wymienne kola zebate i kola pasowe na walach, czesto wymieniane tuleje lozyskowe oraz panewki lozysk slizgowych |
| H7/h6 | polaczenia umozliwiajace reczne przesuwanie po nasmarowaniu: zewnetrzne pierscienie lozysk tocznych, pierscienie uszczelniajace, prowadnice, lozyska slizgowe oraz narzedzia na trzpieniach |
| H8/h9, H9/h8 | polaczenia pierscieni osadczych i lozyska slizgowe |
| H11/h11 | polaczenia czesci lutowanych lub spawanych, zaciskane na walach, tuleje dystansowe |
| H7/g6, G7/h6 | lozyska slizgowe korbowodow |
| H7/f7 | lozyska i prowadnice slizgowe |
| H8/e8, E8/h9 | polaczenia ze znacznym luzem, waly w dlugich lozyskach |
| H11/d9, H11/d11, D11/h11 | polaczenia nitow z otworami |
| H11/c11 | polaczenia z duzym luzem, lozyska maszyn rolniczych |

## Definicje, ktore musza znalezc sie w tresci strony

Zrodlo: https://pkm.edu.pl/baza-wiedzy/tolerancje-i-pasowania/zasady-pasowania-wymiarow/
oraz https://pkm.edu.pl/baza-wiedzy/tolerancje-i-pasowania/polozenie-pol-tolerancji-wzgledem-wymiaru-normalnego/
Sprawdzono: 2026-08-05.

- **Pasowanie luzne**: walek zawsze mniejszy od otworu, zawsze wystepuje luz.
- **Pasowanie ciasne (wtlaczane)**: walek wiekszy od otworu, polaczenie wymaga
  wciskania.
- **Pasowanie mieszane (przejsciowe)**: w zaleznosci od rzeczywistych wymiarow
  moze wystapic luz albo wcisk.
- **Zasada stalego otworu**: otwor toleruje sie w glab materialu, czyli EI = 0
  (pole H), a zadane pasowanie uzyskuje sie dobierajac odchylki walka.
  Stosowana najczesciej.
- **Zasada stalego walka**: walek toleruje sie w glab materialu, czyli es = 0
  (pole h), a pasowanie dobiera sie odchylkami otworu. Stosowana na przyklad
  przy osadzaniu wielu elementow na jednym wale.
- **Litery male** oznaczaja pola tolerancji **walkow**, **wielkie** pola
  tolerancji **otworow**.
- Litery **poczatku alfabetu** kladą pole tolerancji w glab materialu, czyli
  daja luz. Litery **konca alfabetu** kladą je na zewnatrz, czyli daja wcisk.
- **h** to walek o odchylce gornej rownej zero, **H** to otwor o odchylce
  dolnej rownej zero. Oba sa polami odniesienia.
- **js** i **JS** to pola **symetryczne** wzgledem wymiaru nominalnego.
