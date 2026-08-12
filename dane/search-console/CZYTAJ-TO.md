# Eksporty z Google Search Console

Tu wrzucasz pliki pobrane z Search Console. **Wystarczy, że je tu zostawisz**,
resztę robię ja: rozpakowanie, analiza, wnioski.

## Czego nie ma w gicie

Repozytorium `pocaduchy-site` jest publiczne. Dane o ruchu, czyli kto wpisuje
jakie frazy i co klika, są twoje i nie mają tam czego szukać. Ten katalog jest
wyłączony z gita przez `.gitignore`, poza tym jednym plikiem. Do repozytorium
trafiają tylko gotowe wnioski w `analizy/`.

Nie zmieniaj tej reguły bez zastanowienia. Wystarczy jeden commit, żeby dane
wyjechały na zewnątrz i już tam zostały.

## Jak zrobić eksport

1. Wejdź na `https://search.google.com/search-console`.
2. Wybierz właściwość `pocaduchy.pl`.
3. Z menu po lewej wybierz **Skuteczność**, a w nim **Wyniki wyszukiwania**.
4. U góry ustaw zakres dat na **ostatnie 3 miesiące**.
5. Prawy górny róg, przycisk **Eksportuj**, opcja **Pobierz plik CSV**.
6. Rozpakowany albo spakowany, wszystko jedno. Wrzuć tutaj.

W środku będzie kilka plików, między innymi lista zapytań, lista stron,
urządzenia i dni. Nie musisz nic z nimi robić.

## Nazewnictwo

Jeśli będziesz wrzucać kolejne eksporty, dopisz do nazwy katalogu datę
pobrania, na przykład `2026-08-12/`. Wtedy da się porównać, co się zmieniło
między jednym a drugim.

## Do czego to jest potrzebne

Audyt SEO z sierpnia 2026 zostawił trzy pytania, na które **uczciwie nie da się
odpowiedzieć bez danych o ruchu**:

1. Czy tytuł „Pozornie łatwe miejsca w projekcie maszyny" traci kliknięcia
   względem innych wpisów na podobnej pozycji.
2. Czy sufiks „część 1" przy artykule o projektowaniu wielobryłowym pomaga
   rozróżnić dwa wpisy, czy tylko zniechęca do kliknięcia.
3. Czy hub przelicznika i strona ciśnienia biją się o te same zapytania.

Bez tych danych każda zmiana tytułu byłaby zgadywaniem.
