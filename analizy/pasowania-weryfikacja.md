# Weryfikacja silnika pasowan ISO 286

Data weryfikacji: 2026-08-05.

## Zrodla danych

- IT3-IT12 i przedzialy srednic: ISO 286-2:2010, Table 1, probka iTeh Standards:
  https://cdn.standards.iteh.ai/samples/54915/7d6147c29fed4e31af36b60561e88752/ISO-286-2-2010.pdf
- Kontrola tablic IT: RoyMech, ISO Tolerance Band T:
  https://www.roymech.co.uk/Useful_Tables/ISO_Tolerances/ISO_Tol_T.htm
  https://www.roymech.co.uk/Useful_Tables/ISO_Tolerances/ISO_Tol_T_2.html
- Odchylki podstawowe walkow i drobniejsze przedzialy odchylek: RoyMech,
  ISO Shaft Limit Nearest Zero:
  https://www.roymech.co.uk/Useful_Tables/ISO_Tolerances/ISO_SHAFT_LIM_1.html
- Kontrola limitow popularnych pol tolerancji: RoyMech ISO 286-2 shaft/hole
  limits:
  https://www.roymech.co.uk/Useful_Tables/ISO_Tolerances/ISO_286_2s.html
  https://www.roymech.co.uk/Useful_Tables/ISO_Tolerances/ISO_286_2H.html
  https://www.roymech.co.uk/Useful_Tables/ISO_Tolerances/ISO_286_2H_2.html
- Pasowania uprzywilejowane: `analizy/pasowania-tablice-zrodlowe.md`,
  Tablica 5 i Tablica 6, pola oznaczone gwiazdka.

## Niezalezne zrodla wartosci referencyjnych

Wartosci referencyjne w testach nie sa brane z tej samej pojedynczej tabeli,
z ktorej przepisano odchylki podstawowe. Kontrola obejmowala:

- ISO 286-2:2010, Table 1 i opis limitow ES/EI/es/ei z probki iTeh Standards.
- Xometry Pro, ISO 286 Limits and Fits Calculator:
  https://xometry.pro/en-eu/tools/iso-286-limits-and-fits-calculator/
- MachiningDoctor, ISO fits/tolerances charts:
  https://www.machiningdoctor.com/calculators/tolerances/
  oraz strona H7/g6:
  https://www.machiningdoctor.com/calculators/tolerances/fit-2/?fitid=9
- Simply Bearings, ISO Limits and Fits:
  https://simplybearings.co.uk/shop/Info-Pages-ISO-Limits/c4746_4779/index.html

Przyklady sprawdzone jawnie w testach:

- 20 H7/g6: luz +7 do +41 um.
- 40 H7/p6: luz -42 do -1 um.
- 25 H7/h6: luz 0 do +34 um.
- 50 H7/k6: pasowanie mieszane, luz -18 do +23 um.
- 50 H8/f7: luz +25 do +89 um.

## Testy

Uruchomiona komenda:

```powershell
node --test src/lib/pasowania/
```

Wynik:

```text
tests 66
pass 66
fail 0
duration_ms 177.8998
```

Dodatkowy audyt spojnoscowy po siatce srednic granicznych, wszystkich
literach i klasach IT4-IT12:

```text
{ policzone: 448749, jawneBrakiDanych: 49887 }
```

Kazdy brak danych byl jawnym `BladPasowania`, bez `NaN` i bez cichego zera.

## Rozbieznosci i decyzje

- Przedzialy IT i przedzialy odchylek nie sa identyczne. Silnik uzywa osobnego
  przedzialu IT i osobnego przedzialu odchyłek podstawowych, np. 45 mm ma IT
  z przedzialu ponad 30 do 50, a odchyłki `u` z przedzialu ponad 40 do 50.
- Regula delta dla otworow zostala zaimplementowana wedlug zachowania tablic
  limitow ISO 286-2/RoyMech: `K`, `M`, `N` do IT8, natomiast `P`, `R`, `S`,
  `T`, `U`, `X`, `Z` do IT7. Dla `P8` i wyzej tablice limitow pokazuja powrot
  do odbicia odchyłki podstawowej walka, bez delty.
- Dla granicy 80 mm pierwsze oczekiwanie testowe mialo blad przepisywania.
  Po kontroli z tabela `s6` poprawiono je na `+59/+78` dla 65-80 mm oraz
  `+71/+93` dla 80-100 mm.

## Swiadomie niezaimplementowane

- Pole `j` dla walkow zwraca wynik tylko dla IT5-IT7, bo w uzytych tabelach
  te klasy byly jawnie podane. Pozostale klasy `j` zwracaja `BladPasowania`.
- Pole `J` dla otworow zwraca wynik tylko dla IT6-IT8, bo te klasy byly jawnie
  podane w tabelach. Pozostale klasy `J` zwracaja `BladPasowania`.
- Pole `t/T` dla najmniejszych przedzialow, w ktorych tabela zrodlowa ma puste
  komorki, zwraca `BladPasowania`.

Te ograniczenia sa celowe: brak potwierdzonej liczby jest traktowany jako blad
danych, nie jako miejsce na interpolacje albo przyblizenie.
