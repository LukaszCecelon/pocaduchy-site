/**
 * Definicje jednostek: skad sie biora i gdzie sie je spotyka.
 *
 * Klucz to wymiar|symbol. Pola:
 *   d  definicja: z czego wynika wartosc jednostki
 *   g  gdzie sie ja spotyka w praktyce konstruktora
 *
 * To jest tresc, ktorej polskojezyczny internet praktycznie nie ma, wiec obok
 * wartosci uzytkowej jest to takze material do zaindeksowania.
 *
 * Stan: 157 definicji dla 20 wymiarow.
 */
const DEFINICJE = {

  /* ---------- DLUGOSC ---------- */
  'dlugosc|mm': {
    d: 'Tysięczna część metra, czyli dokładnie 0,001 m. To podstawowa jednostka rysunku technicznego w Europie, bo większość wymiarów maszyn dobrze mieści się w tej skali.',
    g: 'Domyślna jednostka na rysunku wykonawczym i w modelu CAD. Jeżeli na polskim rysunku nie ma dopisku przy wymiarze, praktycznie zawsze chodzi o milimetry.'
  },
  'dlugosc|cm': {
    d: 'Setna część metra, czyli dokładnie 0,01 m. W konstrukcji maszyn bywa niewygodny, bo centymetry źle mieszają się z tolerancjami i pasowaniami podawanymi w milimetrach.',
    g: 'Pojawia się raczej w opisach gabarytów, instrukcjach użytkownika i przy elementach okołomaszynowych. Na rysunku wykonawczym częściej robi bałagan niż pomaga.'
  },
  'dlugosc|m': {
    d: 'Metr jest jednostką bazową długości w SI. Od 1983 roku wynika z drogi światła w próżni, więc nie jest już oparty o fizyczny wzorzec pręta.',
    g: 'Układy linii produkcyjnych, długości przenośników, rozstawy stanowisk i dokumentacja budowlana. W detalach maszyn i tak zwykle kończy jako 1000 mm.'
  },
  'dlugosc|km': {
    d: 'Tysiąc metrów, czyli dokładnie 1000 m. W mechanice maszyn prawie nigdy nie opisuje detalu, ale potrafi wejść przez dane eksploatacyjne.',
    g: 'Instrukcje obsługi pojazdów, przebiegi, drogi testowe i utrzymanie ruchu przy maszynach mobilnych. W CAD to raczej jednostka z zewnątrz, nie z modelu części.'
  },
  'dlugosc|µm': {
    d: 'Milionowa część metra, czyli 0,001 mm. Zwana też mikronem, choć w dokumentacji lepiej trzymać się symbolu µm.',
    g: 'Tolerancje, chropowatość, bicie, powłoki i pasowania. Pole tolerancji H7 dla średnicy 20 mm ma 21 µm, więc tu naprawdę nie ma miejsca na centymetry.'
  },
  'dlugosc|nm': {
    d: 'Miliardowa część metra, czyli 0,000001 mm. Uwaga na zapis: nm to nanometr, a N·m to niutonometr, czyli moment obrotowy.',
    g: 'Powłoki, optyka, warstwy PVD i dane materiałowe dla powierzchni. W typowej konstrukcji maszyn pojawia się rzadko, ale w kartach powłok już tak.'
  },
  'dlugosc|dm': {
    d: 'Dziesiąta część metra, czyli dokładnie 0,1 m. Sama długość w decymetrach jest rzadka, za to dm³ żyje jako litr.',
    g: 'Czasem trafia się w materiałach szkolnych albo opisach pojemności, kiedy ktoś miesza długość z objętością. Na rysunku technicznym maszyny to zwykle sygnał, że dane przyszły z nietypowego źródła.'
  },
  'dlugosc|cal': {
    d: 'Od 1959 roku cal międzynarodowy ma dokładnie 25,4 mm. To wartość z definicji, więc przy przeliczeniu cali na milimetry nie ma zaokrąglania wzorca.',
    g: 'Gwinty rurowe, łożyska calowe, blachy, koła zębate i dokumentacja z USA. Trzeba uważać, bo cal w nazwie gwintu rurowego nie zawsze oznacza rzeczywistą średnicę 25,4 mm.'
  },
  'dlugosc|mil': {
    d: 'Mil, czyli thou, to tysięczna część cala: dokładnie 0,0254 mm. Nazwa jest myląca dla kogoś wychowanego na milimetrach, bo mil nie jest skrótem od milimetra.',
    g: 'Amerykańskie tolerancje, grubości folii, podkładek, powłok i luzów w instrukcjach serwisowych. Jeden mil to 25,4 µm, więc pomyłka z 1 mm robi katastrofę w skali detalu.'
  },
  'dlugosc|stopa': {
    d: 'Stopa ma 12 cali, czyli dokładnie 0,3048 m. Wartość jest dokładna, bo wynika z definicji cala międzynarodowego.',
    g: 'Rysunki budowlane z USA, długości przenośników, wysokości pomostów i layouty hal. W dokumentacji maszyn potrafi wejść razem z importowanym projektem instalacji.'
  },
  'dlugosc|jard': {
    d: 'Jard ma 3 stopy, czyli dokładnie 0,9144 m. W konstrukcji maszyn nie jest codziennością, ale czasem przychodzi razem z materiałem w rolce.',
    g: 'Tkaniny techniczne, pasy, siatki i materiały sprzedawane według anglosaskich katalogów. Przy zamawianiu warto od razu przeliczyć na metry, bo magazyn zwykle nie żyje jardami.'
  },
  'dlugosc|mila': {
    d: 'Mila lądowa ma 1760 jardów, czyli dokładnie 1609,344 m. Nie mylić z milą morską, która ma inną definicję i inną długość.',
    g: 'Prędkości w mph, przebiegi i dane eksploatacyjne urządzeń mobilnych z USA. W konstrukcji detalu praktycznie nie występuje.'
  },
  'dlugosc|Mm': {
    d: 'Mila morska ma dokładnie 1852 m. Historycznie odpowiada jednej minucie kątowej na południku, stąd jej związek z nawigacją.',
    g: 'Dokumentacja urządzeń morskich, systemów pokładowych i danych prędkości w węzłach. Symbol Mm bywa zdradliwy, bo w SI mega metr też zapisałby się podobnie.'
  },

  /* ---------- POLE ---------- */
  'pole|mm²': {
    d: 'Milimetr kwadratowy to pole kwadratu 1 mm na 1 mm, czyli dokładnie 0,000001 m². W naprężeniach 1 N/mm² daje dokładnie 1 MPa.',
    g: 'Przekroje śrub, wpustów, spoin i pól czynnych uszczelnień. To jednostka, którą konstruktor widzi częściej w obliczeniach niż w opisie powierzchni blachy.'
  },
  'pole|cm²': {
    d: 'Centymetr kwadratowy to 100 mm², czyli dokładnie 0,0001 m². Łatwo go pomylić przy ciśnieniu technicznym, bo kgf/cm² jest liczbowo atmosferą techniczną.',
    g: 'Starsze obliczenia hydrauliczne, przekroje w katalogach siłowników i opisy próbek materiałowych. W nowych rysunkach wykonawczych zwykle wygodniej zejść do mm².'
  },
  'pole|dm²': {
    d: 'Decymetr kwadratowy ma dokładnie 0,01 m². To 100 cm², czyli pole kwadratu 100 mm na 100 mm.',
    g: 'Spotykany w opisach powierzchni filtrów, wymienników i elementów użytkowych, rzadziej na rysunkach detali. Jeśli pojawia się w danych dostawcy, warto sprawdzić, czy obok nie ma l/min albo dm³.'
  },
  'pole|m²': {
    d: 'Metr kwadratowy jest polem kwadratu 1 m na 1 m. Dla detalu maszynowego bywa duży, ale dla arkuszy, osłon i powierzchni malowania jest naturalny.',
    g: 'Zamówienia blach, siatek, izolacji, powłok lakierniczych i obliczenia powierzchni wymiany ciepła. W BOM-ie pomaga policzyć materiał, ale nie zastępuje wymiarów wykonawczych.'
  },
  'pole|a': {
    d: 'Ar to dokładnie 100 m². Jednostka została przy geodezji i działkach, nie przy projektowaniu części.',
    g: 'Może pojawić się w dokumentach zagospodarowania terenu pod halę albo fundamenty maszyny. W samym projekcie mechanicznym raczej jest gościem z dokumentacji budowlanej.'
  },
  'pole|ha': {
    d: 'Hektar to 100 arów, czyli dokładnie 10 000 m². Dla konstruktora to skala zakładu, placu albo inwestycji, nie pojedynczej maszyny.',
    g: 'Mapy, decyzje środowiskowe, projekty linii na terenie zakładu i dokumenty inwestycyjne. Jeżeli trafia do notatek konstruktora, zwykle chodzi o rozmieszczenie, nie o detal.'
  },
  'pole|km²': {
    d: 'Kilometr kwadratowy to dokładnie 1 000 000 m². Jednostka opisuje obszary, nie elementy mechaniczne.',
    g: 'Dokumentacja lokalizacyjna, mapy i analizy terenu dla dużych instalacji. W projekcie maszyny pojawia się najwyżej jako kontekst inwestycji.'
  },
  'pole|cal²': {
    d: 'Cal kwadratowy to pole kwadratu o boku 1 cala, czyli dokładnie 0,00064516 m². To również 645,16 mm².',
    g: 'Amerykańskie przekroje przewodów, powierzchnie tłoków i obliczenia psi. Przy przeliczaniu siły z ciśnienia łatwo zgubić fakt, że cal był podniesiony do kwadratu.'
  },
  'pole|stopa²': {
    d: 'Stopa kwadratowa to dokładnie 0,09290304 m². Wynika z kwadratu stopy 0,3048 m.',
    g: 'Katalogi paneli, izolacji, wykładzin technicznych i dokumentacja budowlana z USA. W mechanice trafia się przy osłonach, pomostach i powierzchniach wymiany.'
  },
  'pole|jard²': {
    d: 'Jard kwadratowy to dokładnie 0,83612736 m². To pole kwadratu o boku 0,9144 m.',
    g: 'Materiały w rolkach, tkaniny techniczne i wykładziny z katalogów anglosaskich. Przy zakupach lepiej przeliczyć od razu na m², bo inaczej łatwo zamówić za mały odcinek.'
  },
  'pole|akr': {
    d: 'Akr to dokładnie 43 560 stóp kwadratowych. Po przeliczeniu daje około 4 046,86 m², więc wartość w SI jest dokładna z definicji, ale nieokrągła.',
    g: 'Dokumenty terenowe z USA, opisy działek i lokalizacji instalacji. Konstruktor spotka go raczej przy inwestycji niż przy modelu maszyny.'
  },

  /* ---------- OBJETOSC ---------- */
  'objetosc|mm³': {
    d: 'Milimetr sześcienny to objętość sześcianu 1 mm na 1 mm na 1 mm, czyli dokładnie 0,000000001 m³. W małych dozownikach liczby w mm³ przestają wyglądać abstrakcyjnie.',
    g: 'Dozowanie kleju, smaru, mikrofluidyka i objętości małych kieszeni w modelu CAD. Przy imporcie danych trzeba pilnować, czy program pokazuje mm³, czy cm³.'
  },
  'objetosc|cm³': {
    d: 'Centymetr sześcienny to dokładnie 0,000001 m³ i dokładnie 1 ml. Skrót ccm wciąż pojawia się w opisach pojemności skokowej.',
    g: 'Siłowniki, dozowniki, pompy małej wydajności i silniki spalinowe. W dokumentacji dostawców z Niemiec ccm potrafi wisieć obok bar i l/min.'
  },
  'objetosc|dm³': {
    d: 'Decymetr sześcienny to dokładnie 0,001 m³. To ta sama objętość co 1 litr, tylko zapisana geometrycznie.',
    g: 'Zbiorniki, komory, pojemności robocze i obliczenia w CAD. Przy przeliczaniu z litrami nie ma żadnego współczynnika ukrytego w tle.'
  },
  'objetosc|m³': {
    d: 'Metr sześcienny to objętość sześcianu o boku 1 m. Dla płynów oznacza dokładnie 1000 l.',
    g: 'Zbiorniki, instalacje wentylacyjne, wydajności sprężarek i kubatury obudów. W konstrukcji maszyn często wychodzi z objętości modelu albo z danych procesu.'
  },
  'objetosc|ml': {
    d: 'Mililitr to jedna tysięczna litra, czyli dokładnie 1 cm³ i 0,000001 m³. Nazwa jest objętościowa, ale wartość jest identyczna jak centymetr sześcienny.',
    g: 'Dozowniki, smarownice, układy klejenia i instrukcje serwisowe. Tam, gdzie ktoś nalewa płyn ręcznie, ml wygrywa z cm³.'
  },
  'objetosc|l': {
    d: 'Litr to dokładnie 0,001 m³, czyli 1 dm³. To nie jest jednostka SI bazowa, ale w technice płynów jest zbyt wygodna, żeby zniknęła.',
    g: 'Zbiorniki oleju, pneumatyka, hydraulika, smarowanie i karty katalogowe pomp. W praktyce l/min pojawia się częściej niż m³/s.'
  },
  'objetosc|hl': {
    d: 'Hektolitr to 100 l, czyli dokładnie 0,1 m³. Dla detalu jest za duży, dla procesu z cieczą bywa wygodny.',
    g: 'Instalacje spożywcze, zbiorniki i dokumentacja procesowa. Konstruktor może go zobaczyć przy liniach rozlewniczych, choć model dalej będzie liczony w mm i litrach.'
  },
  'objetosc|cal³': {
    d: 'Cal sześcienny to dokładnie 0,000016387064 m³, czyli 16,387064 cm³. Bierze się z podniesienia dokładnego cala 25,4 mm do trzeciej potęgi.',
    g: 'Pojemność silników, siłowników i komór w dokumentacji z USA. Uwaga na skrót cu in, bo przy szybkim czytaniu łatwo go zgubić.'
  },
  'objetosc|stopa³': {
    d: 'Stopa sześcienna to 1728 cali sześciennych, bo stopa ma 12 cali w każdym z trzech wymiarów. W SI daje około 0,0283168 m³; wartość wynika z dokładnej definicji stopy.',
    g: 'Wentylacja, sprężone powietrze i katalogi urządzeń z USA. Skrót ft³ wraca też w cfm, czyli stopach sześciennych na minutę.'
  },
  'objetosc|gal US': {
    d: 'Galon amerykański cieczy to dokładnie 0,003785411784 m³, czyli 3,785411784 l. Nie jest tym samym co galon brytyjski.',
    g: 'Pompy, zbiorniki i przepływomierze z USA. Przy gpm trzeba sprawdzić, czy dostawca nie użył galona UK, bo błąd wynosi około 20 procent.'
  },
  'objetosc|gal UK': {
    d: 'Galon brytyjski, imperialny, to dokładnie 0,00454609 m³, czyli 4,54609 l. Jest większy od galona US.',
    g: 'Starsza dokumentacja brytyjska, instalacje procesowe i katalogi pomp. Sam napis galon bez US albo UK jest za mało dokładny do obliczeń.'
  },

  /* ---------- MASA ---------- */
  'masa|mg': {
    d: 'Miligram to jedna milionowa kilograma, czyli dokładnie 0,000001 kg. W mechanice to mało, ale w dawkowaniu chemii albo smaru już potrafi mieć znaczenie.',
    g: 'Karty substancji, dozowniki, smary, kleje i dane laboratoryjne przy małych próbkach. Konstruktor widzi go częściej w technologii procesu niż w masie części.'
  },
  'masa|g': {
    d: 'Gram to jedna tysięczna kilograma. Historycznie był bliżej codziennej skali, ale w SI jednostką bazową masy został kilogram.',
    g: 'Małe elementy handlowe, opakowania, próbki materiału i dane z wag warsztatowych. Przy bilansie masy zespołu i tak zwykle wraca się do kg.'
  },
  'masa|dag': {
    d: 'Dekagram to dokładnie 0,01 kg, czyli 10 g. W technice nie ma szczególnej przewagi, poza tym że czasem żyje w polskich opisach magazynowych.',
    g: 'Notatki zakupowe, opisy materiałów pomocniczych i dane spoza ścisłej dokumentacji konstrukcyjnej. Na rysunku wykonawczym maszyny raczej nie powinien się pojawić.'
  },
  'masa|kg': {
    d: 'Kilogram jest jednostką bazową masy w SI. Od 2019 roku jest związany ze stałą Plancka, a nie z odważnikiem pod kloszem.',
    g: 'Masy części z CAD, udźwigi, BOM, transport, dobór siłowników i obliczenia bezwładności. Uwaga: kg to masa, a kgf to siła.'
  },
  'masa|t': {
    d: 'Tona metryczna to dokładnie 1000 kg. W danych technicznych oznacza masę, choć w potocznych rozmowach bywa mylona z obciążeniem jako siłą.',
    g: 'Masa maszyn, transport, suwnice, fundamenty i oferty wykonawcze. Przy obliczeniach wytrzymałościowych tonę trzeba zamienić na siłę dopiero przez przyspieszenie.'
  },
  'masa|uncja': {
    d: 'Uncja avoirdupois to dokładnie jedna szesnasta funta, czyli około 0,0283495 kg. Wartość wynika z definicji funta, ale pełny zapis jest zbyt długi do zwykłej notatki.',
    g: 'Drobne elementy z USA, opakowania, masy narzędzi i czasem sprężyny. W dokumentacji technicznej skrót oz bez kontekstu wymaga ostrożności.'
  },
  'masa|funt': {
    d: 'Funt avoirdupois ma dokładnie 0,45359237 kg. To masa, nie siła, chociaż w angielskich tekstach lb i lbf bywają zapisywane leniwie.',
    g: 'Katalogi z USA, masy podzespołów, udźwigi i dane transportowe. Przy doborze siłowników trzeba sprawdzić, czy tabela mówi o lb masy, czy o lbf siły.'
  },
  'masa|stone': {
    d: 'Stone ma dokładnie 14 funtów, czyli 6,35029318 kg. Jednostka bardziej użytkowa niż konstrukcyjna, ale czasem trafia do danych brytyjskich.',
    g: 'Dokumenty z rynku UK, opisy obciążeń użytkowych i starsze dane serwisowe. W maszynach spotykana rzadko, ale gdy już jest, lepiej nie zgadywać.'
  },
  'masa|ton US': {
    d: 'Tona amerykańska, short ton, ma dokładnie 2000 funtów, czyli 907,18474 kg. Jest mniejsza od tony metrycznej o niecałe 10 procent.',
    g: 'Nośności, transport i dokumentacja konstrukcji z USA. Sam zapis ton w amerykańskim PDF-ie nie oznacza automatycznie 1000 kg.'
  },

  /* ---------- SILA ---------- */
  'sila|N': {
    d: 'Jeden niuton nadaje masie 1 kg przyspieszenie 1 m/s². To jednostka SI, ale w praktyce mała: ciężar 1 kg to 9,80665 N.',
    g: 'Siłowniki, sprężyny, obliczenia wytrzymałościowe, dociski i reakcje podpór. To baza, do której warto sprowadzić wszystkie kilogramy siły i funty siły.'
  },
  'sila|daN': {
    d: 'Dekaniuton to dokładnie 10 N. Jest wygodny warsztatowo, bo 1 daN leży blisko ciężaru 1 kg, choć nie jest z nim równy.',
    g: 'Katalogi sprężyn, zawiesia, napinanie pasów i instrukcje montażowe. Przy szybkim szacowaniu jest praktyczny, przy obliczeniach trzeba pamiętać o różnicy 1,97 procent wobec kgf.'
  },
  'sila|kN': {
    d: 'Kiloniuton to dokładnie 1000 N. Odpowiada ciężarowi masy około 101,97 kg przy przyspieszeniu normalnym.',
    g: 'Prasy, siłowniki hydrauliczne, nośność łożysk, prowadnic i śrub. W katalogach elementów maszyn kN jest dużo wygodniejszy niż tysiące niutonów.'
  },
  'sila|MN': {
    d: 'Meganiuton to dokładnie 1 000 000 N. Skala robi się ciężka: to mniej więcej ciężar 101,97 t przy przyspieszeniu normalnym.',
    g: 'Duże prasy, konstrukcje stalowe, fundamenty i obciążenia od ciężkich maszyn. Jeśli w zwykłym uchwycie wychodzą MN, warto najpierw sprawdzić jednostki w arkuszu.'
  },
  'sila|kgf': {
    d: 'Kilogram siły to ciężar masy 1 kg przy przyspieszeniu normalnym 9,80665 m/s². Dlatego ma dokładnie 9,80665 N i bywa zapisywany jako kG albo kp.',
    g: 'Starsza polska dokumentacja, sprężyny, siłomierze, naciski i stare tablice materiałowe. Najważniejsze: kgf jest siłą, a kg jest masą.'
  },
  'sila|lbf': {
    d: 'Funt siły wynika z funta masy i przyspieszenia normalnego. Wartość jest dokładna z definicji, ale nieokrągła: około 4,44822 N.',
    g: 'Siłowniki, sprężyny, zatrzaski i dociski z katalogów USA. Jeśli obok pojawia się psi albo lbf·in, jesteśmy w imperialnym zestawie jednostek.'
  },
  'sila|ozf': {
    d: 'Uncja siły to dokładnie jedna szesnasta funta siły, czyli około 0,278014 N. Dobrze pasuje do bardzo małych sił, ale łatwo ją pomylić z uncją masy.',
    g: 'Drobne sprężyny, przełączniki, mechanizmy precyzyjne i elementy z katalogów amerykańskich. Na karcie małego zatrzasku ozf potrafi wyglądać niewinnie, dopóki trzeba dobrać europejski zamiennik.'
  },
  'sila|kip': {
    d: 'Kip to dokładnie 1000 lbf, czyli około 4 448,22 N. Skrót pochodzi od kilo pound force, choć zapis nie pokazuje litery f.',
    g: 'Konstrukcje stalowe i obciążenia w dokumentacji amerykańskiej. W maszynach pojawia się przy ciężkich ramach, podestach albo fundamentach opisanych według norm USA.'
  },

  /* ---------- MOMENT OBROTOWY ---------- */
  'moment|N·m': {
    d: 'Niutonometr to moment od siły 1 N przyłożonej na ramieniu 1 m. Uwaga na zapis, bo N·m jest momentem, a nm bez kropki w środku to nanometr.',
    g: 'Klucze dynamometryczne, tabele dokręcania, silniki, przekładnie i obliczenia wałów. Podstawowa jednostka momentu w dokumentacji europejskiej.'
  },
  'moment|N·mm': {
    d: 'Niutonomilimetr to dokładnie 0,001 N·m. W obliczeniach wytrzymałościowych często pasuje do geometrii w mm, bo ramię i przekroje są w tej samej skali.',
    g: 'Wpusty, kołki, małe wały, śruby i raporty z obliczeń. W CAD-owych szkicach i arkuszach konstrukcyjnych N·mm bywa wygodniejszy niż N·m.'
  },
  'moment|kN·m': {
    d: 'Kiloniutonometr to dokładnie 1000 N·m. To już skala dużych napędów albo konstrukcji, nie śruby M6 dokręcanej na stanowisku.',
    g: 'Duże przekładnie, ramiona maszyn, konstrukcje stalowe i obciążenia od siłowników. Jeśli w małym zespole wychodzi kN·m, najpierw sprawdź długość ramienia.'
  },
  'moment|kgf·m': {
    d: 'Kilogram siły na ramieniu 1 m daje dokładnie 9,80665 N·m. Jednostka bywa nazywana kilogramometrem.',
    g: 'Starsza dokumentacja, japońskie karty serwonapędów i dawne tabele dokręcania. Warto od razu przeliczyć, bo 10 kgf·m to nie 10 N·m.'
  },
  'moment|kgf·cm': {
    d: 'Kilogram siły na ramieniu 1 cm to dokładnie 0,0980665 N·m. To setna część kgf·m, a nie jakaś osobna definicja momentu.',
    g: 'Małe serwomechanizmy, siłowniki elektryczne, zawiasy i katalogi komponentów azjatyckich. Przy doborze napędu łatwo zgubić dwa zera między cm i m.'
  },
  'moment|lbf·ft': {
    d: 'Funt siły na ramieniu 1 stopy daje około 1,35582 N·m. Wynika z dokładnych definicji stopy i funta siły, tylko po przeliczeniu do SI liczba jest nieokrągła.',
    g: 'Amerykańskie tabele momentów dokręcania i klucze dynamometryczne z importu. Największa pułapka to pomylenie lbf·ft z lbf·in, czyli błąd dwunastokrotny.'
  },
  'moment|lbf·in': {
    d: 'Funt siły na ramieniu 1 cala daje około 0,112985 N·m. To dokładnie jedna dwunasta lbf·ft.',
    g: 'Drobne złącza, elektronika, wkręty w obudowach i nastawy małych kluczy dynamometrycznych. Na narzędziu skrót in-lb potrafi być mniejszy niż sama skala.'
  },
  'moment|ozf·in': {
    d: 'Uncja siły na ramieniu 1 cala daje około 0,00706155 N·m. To bardzo mały moment, typowy dla małych napędów i mechanizmów.',
    g: 'Silniki krokowe z USA, pokrętła, sprzęgła miniaturowe i mechanizmy precyzyjne. Moment trzymający w ozf·in wygląda duży liczbowo, ale po przeliczeniu na N·m często robi się skromny.'
  },

  /* ---------- CISNIENIE ---------- */
  'cisnienie|Pa': {
    d: 'Paskal to 1 N rozłożony na 1 m². Jest mały, dlatego w maszynach goła wartość w Pa szybko robi się długa i mało czytelna.',
    g: 'Jednostka bazowa dla obliczeń, norm i przeliczeń. Wprost pojawia się przy wentylacji, filtrach i małych spadkach ciśnienia.'
  },
  'cisnienie|hPa': {
    d: 'Hektopaskal to dokładnie 100 Pa. Liczbowo jest równy milibarowi, więc 1013 hPa to 1013 mbar.',
    g: 'Meteorologia, wentylacja i pomiary niskich ciśnień. W maszynach spotkasz go przy czujnikach różnicy ciśnień i danych środowiskowych.'
  },
  'cisnienie|kPa': {
    d: 'Kilopaskal to dokładnie 1000 Pa. Ciśnienie atmosferyczne to około 101,325 kPa, więc jednostka dobrze mieści wartości bliskie atmosferze.',
    g: 'Pneumatyka, wentylacja, spadki ciśnień i dokumentacja czujników. W katalogach bywa używany tam, gdzie bar byłby zbyt grubą jednostką.'
  },
  'cisnienie|MPa': {
    d: 'Megapaskal to dokładnie 1 000 000 Pa. Równa się dokładnie 1 N/mm², co jest bardzo wygodne przy naprężeniach.',
    g: 'Hydraulika siłowa i wytrzymałość materiałów. Ta sama liczba w MPa i N/mm² to jeden z tych małych prezentów, które mechanika czasem daje konstruktorowi.'
  },
  'cisnienie|GPa': {
    d: 'Gigapaskal to dokładnie 1 000 000 000 Pa, czyli 1000 MPa. W ciśnieniu procesowym to przesada, ale w modułach sprężystości jest normalny.',
    g: 'Karty materiałowe i obliczenia sztywności. Moduł Younga stali to zwykle około 210 GPa, aluminium około 70 GPa.'
  },
  'cisnienie|N/mm²': {
    d: 'Niuton na milimetr kwadratowy to dokładnie 1 000 000 Pa, czyli dokładnie 1 MPa. Jednostka pokazuje wprost siłę i przekrój, dlatego dobrze pasuje do obliczeń detali.',
    g: 'Rysunki, raporty MES, obliczenia śrub, spoin i przekrojów. Wielu konstruktorów czyta N/mm² szybciej niż MPa, bo widzi od razu geometrię w mm.'
  },
  'cisnienie|N/m²': {
    d: 'Niuton na metr kwadratowy to dokładnie 1 Pa. To ta sama jednostka zapisana przez siłę i pole.',
    g: 'Podręczniki, normy i wyprowadzenia wzorów. W praktycznych tabelach maszynowych rzadko zostaje w tej postaci, bo liczby są niewygodne.'
  },
  'cisnienie|bar': {
    d: 'Bar to dokładnie 100 000 Pa. Nie należy do układu SI, ale przyjął się, bo 1 bar jest blisko ciśnienia atmosferycznego.',
    g: 'Katalogi pneumatyki, sprężarki, siłowniki, reduktory i manometry. W praktyce maszynowej to najczęściej spotykana jednostka ciśnienia roboczego.'
  },
  'cisnienie|mbar': {
    d: 'Milibar to jedna tysięczna bara, czyli dokładnie 100 Pa. Jest liczbowo równy hektopaskalowi.',
    g: 'Podciśnienie, wentylacja, przyssawki i filtry. Tam, gdzie bar jest za duży, mbar pozwala uniknąć ciągłego pisania zer po przecinku.'
  },
  'cisnienie|at': {
    d: 'Atmosfera techniczna to nacisk 1 kgf na 1 cm², czyli dokładnie 98 066,5 Pa. Wartość wynika z kgf równego 9,80665 N.',
    g: 'Starsza polska i radziecka dokumentacja, manometry sprzed lat, hydraulika i zbiorniki. Łatwo pomylić ją z atmosferą fizyczną, a różnica wynosi około 3,3 procent.'
  },
  'cisnienie|atm': {
    d: 'Atmosfera fizyczna to dokładnie 101 325 Pa. To umowne ciśnienie normalne, nie wynik bieżącego pomiaru pogody.',
    g: 'Chemia, fizyka, warunki normalne i karty katalogowe procesów. W typowej hydraulice maszynowej pojawia się rzadziej niż bar albo at.'
  },
  'cisnienie|mmHg': {
    d: 'Milimetr słupa rtęci ma w danych przelicznika około 133,322 Pa. Jednostka wiąże ciśnienie z wysokością słupa rtęci i bywa nazywana torem.',
    g: 'Technika próżniowa, medycyna i starsze manometry. W pompach próżniowych spotykana do dziś, choć konstruktor i tak często potrzebuje mbar.'
  },
  'cisnienie|mmH₂O': {
    d: 'Milimetr słupa wody to dokładnie 9,80665 Pa w tym zestawie danych. Liczba wynika z ciężaru słupa wody przy przyspieszeniu normalnym.',
    g: 'Wentylacja, filtry, komory i pomiary ciągu. Spadek ciśnienia na filtrze w mmH₂O wygląda mało groźnie, dopóki nie trzeba dobrać wentylatora.'
  },
  'cisnienie|mH₂O': {
    d: 'Metr słupa wody to 1000 mmH₂O, czyli dokładnie 9806,65 Pa. To wygodny sposób mówienia o wysokości podnoszenia pompy.',
    g: 'Pompy, instalacje wodne i katalogi armatury. Wysokość podnoszenia w mH₂O jest w praktyce ciśnieniem zapisanym językiem hydraulika.'
  },
  'cisnienie|kgf/mm²': {
    d: 'Kilogram siły na milimetr kwadratowy to dokładnie 9 806 650 Pa, czyli 9,80665 MPa. Jednostka jest stara, ale w wytrzymałości materiałów potrafi wracać.',
    g: 'Starsze karty materiałowe, dokumentacja japońska i dawne tabele wytrzymałości. Wytrzymałość 60 kgf/mm² to około 588 MPa.'
  },
  'cisnienie|kgf/cm²': {
    d: 'Kilogram siły na centymetr kwadratowy to dokładnie 98 066,5 Pa. Liczbowo jest równy atmosferze technicznej at.',
    g: 'Stara hydraulika, zbiorniki, manometry i instrukcje maszyn. Jeżeli ktoś zapisał kg/cm², zwykle chodzi właśnie o kgf/cm², ale warto to sprawdzić.'
  },
  'cisnienie|psi': {
    d: 'Psi to funt siły na cal kwadratowy, czyli około 6 894,76 Pa. Wartość wynika z lbf i cala kwadratowego, więc przy zapisie dziesiętnym trzeba ją zaokrąglić.',
    g: 'Sprężarki, opony, złączki, pneumatyka i hydraulika z USA. Dopiski psig i psia mówią, czy chodzi o ciśnienie względne, czy bezwzględne.'
  },
  'cisnienie|ksi': {
    d: 'Ksi to 1000 psi, czyli około 6 894 760 Pa. W materiałach z USA zastępuje MPa przy dużych naprężeniach.',
    g: 'Karty stali i aluminium z USA. Popularna stal A36 ma granicę plastyczności 36 ksi, czyli około 248 MPa.'
  },
  'cisnienie|inHg': {
    d: 'Cal słupa rtęci ma w danych przelicznika 3386,389 Pa. To 25,4 mmHg w zaokrąglonym zapisie używanym dla tej jednostki.',
    g: 'Amerykańskie manometry próżniowe, meteorologia i dokumentacja pomp. Jeśli obok jest podciśnienie, trzeba uważać na znak i punkt odniesienia.'
  },

  /* ---------- TEMPERATURA ---------- */
  'temperatura|°C': {
    d: 'Skala Celsjusza ma krok tej samej wielkości co kelwin, ale zero jest przesunięte o 273,15 K. Wartość 0 °C to 273,15 K.',
    g: 'Dokumentacja europejska, czujniki temperatury, karty materiałowe i warunki pracy maszyn. Najczęstsza pułapka: temperatura 1 °C to 33,8 °F, ale różnica 1 °C to 1,8 °F.'
  },
  'temperatura|K': {
    d: 'Kelwin jest jednostką SI temperatury termodynamicznej. Zero kelwinów to zero bezwzględne, a krok 1 K jest równy różnicy 1 °C.',
    g: 'Termodynamika, rozszerzalność cieplna, obliczenia cieplne i dane materiałowe. W obliczeniach różnic temperatur kelwiny są najczystsze, bo nie mają przesunięcia skali.'
  },
  'temperatura|°F': {
    d: 'W skali Fahrenheita woda zamarza przy 32 °F, a wrze przy 212 °F. Jeden stopień Fahrenheita ma 5/9 kelwina, czyli różnica 1 °F to 0,5556 K.',
    g: 'Dokumentacja z USA, instrukcje maszyn, termostaty i HVAC. Przy temperaturze trzeba rozdzielić wartość od różnicy, bo 20 °C to 68 °F, ale różnica 20 °C to 36 °F.'
  },
  'temperatura|°R': {
    d: 'Skala Rankine ma zero w zerze bezwzględnym, ale stopień tej samej wielkości co Fahrenheit. Jeden °R to 5/9 K.',
    g: 'Amerykańska termodynamika, turbiny, HVAC i starsze obliczenia cieplne. W typowym projekcie mechanicznym pojawia się rzadko, ale w dokumentacji z USA nie jest błędem.'
  },

  /* ---------- PREDKOSC ---------- */
  'predkosc|m/s': {
    d: 'Metr na sekundę jest jednostką SI prędkości liniowej. Dobrze pasuje do obliczeń, ale przy przenośnikach często daje liczby mniej czytelne niż m/min.',
    g: 'Obliczenia kinematyki, pneumatyka, hydraulika i prędkości ruchu osi. W raportach z symulacji m/s jest naturalny, w rozmowie z produkcją nie zawsze.'
  },
  'predkosc|m/min': {
    d: 'Metr na minutę to 1 m podzielony przez 60 s, czyli około 0,0167 m/s. Dzielenie przez 60 nie kończy się w zapisie dziesiętnym, więc wynik jest zaokrąglony.',
    g: 'Przenośniki, linie pakujące, posuwy i dokumentacja procesu. Operator zwykle łatwiej rozumie 30 m/min niż 0,5 m/s.'
  },
  'predkosc|mm/s': {
    d: 'Milimetr na sekundę to dokładnie 0,001 m/s. Jednostka dobrze pasuje do krótkich skoków i osi liniowych.',
    g: 'Siłowniki, osie serwo, dozowniki i ruchy montażowe. Przy małych mechanizmach mm/s mówi więcej niż m/min.'
  },
  'predkosc|km/h': {
    d: 'Kilometr na godzinę to 1000 m podzielone przez 3600 s, czyli około 0,2778 m/s. Dziesiętny wynik jest zaokrąglony.',
    g: 'Wózki, pojazdy AGV, maszyny samojezdne i dane BHP dla ruchu po hali. W obliczeniach napędu zwykle i tak schodzi się do m/s albo obr/min.'
  },
  'predkosc|ft/min': {
    d: 'Stopa na minutę to dokładnie 0,00508 m/s. Skrót fpm bywa też używany przy prędkości powierzchniowej.',
    g: 'Katalogi wentylatorów, przenośników, narzędzi i maszyn z USA. Przy obróbce można spotkać SFM, czyli stopy na minutę po obwodzie narzędzia.'
  },
  'predkosc|ipm': {
    d: 'Ipm to inch per minute, czyli cal na minutę. Cal ma dokładnie 25,4 mm, a po podzieleniu przez 60 s wychodzi około 0,000423 m/s.',
    g: 'Posuwy w obrabiarkach CNC z dokumentacji amerykańskiej. Pomyłka z mm/min daje błąd 25,4 raza, czyli narzędzie szybko pokazuje, że arkusz był zły.'
  },
  'predkosc|ft/s': {
    d: 'Stopa na sekundę to dokładnie 0,3048 m/s. Jest prosta w systemie imperialnym, ale w obliczeniach europejskich zwykle tylko przeszkadza.',
    g: 'Dane przepływu, prędkości ruchu i starsze instrukcje z USA. Jeśli obok pojawia się ft/min, trzeba pilnować minuty i sekundy.'
  },
  'predkosc|mph': {
    d: 'Mila na godzinę to dokładnie 0,44704 m/s. Wynika z mili 1609,344 m i godziny 3600 s.',
    g: 'Maszyny mobilne, pojazdy, instrukcje transportowe i ograniczenia prędkości z USA lub UK. W projekcie napędu najczęściej przelicza się ją dalej na obroty koła.'
  },
  'predkosc|węzeł': {
    d: 'Węzeł to mila morska na godzinę, czyli około 0,5144 m/s. Dokładna zależność jest prosta: 1852 m podzielone przez 3600 s.',
    g: 'Urządzenia morskie, statki, systemy pokładowe i dokumentacja offshore. Jeśli maszyna pracuje na lądzie, węzeł jest zwykle tylko śladem po branży klienta.'
  },

  /* ---------- OBROTY ---------- */
  'obroty|obr/min': {
    d: 'Obrót na minutę to pełny obrót w 60 sekund. Po przeliczeniu na rad/s wychodzi 2π/60, czyli około 0,10472 rad/s. Przez π dokładna liczba dziesiętna nie istnieje.',
    g: 'Tabliczki silników, falowniki, przekładnie, wrzeciona i katalogi wentylatorów. W Polsce zapis obr/min bywa czytelniejszy niż rpm, ale oznacza to samo.'
  },
  'obroty|obr/s': {
    d: 'Obrót na sekundę to pełne 2π rad w sekundę, czyli około 6,28319 rad/s. Wartość jest niewymierna przez π, więc zapis dziesiętny zawsze jest przybliżeniem.',
    g: 'Analizy drgań, szybkie wirniki i obliczenia kinematyczne. W katalogach silników częściej zobaczysz obr/min, więc łatwo zgubić czynnik 60.'
  },
  'obroty|rad/s': {
    d: 'Radian na sekundę jest jednostką bazową prędkości kątowej w tym przeliczniku. Nie liczy obrotów wprost, tylko kąt przebywany w czasie.',
    g: 'Dynamika, symulacje, dobór serwonapędów i równania ruchu. Programy obliczeniowe lubią rad/s, tabliczki silników wolą obr/min.'
  },
  'obroty|Hz': {
    d: 'Herc oznacza jeden cykl na sekundę, a przy obrotach jeden pełny obrót na sekundę. Dlatego w tym wymiarze 1 Hz to 2π rad/s.',
    g: 'Drgania, częstotliwość wymuszeń, falowniki i analiza wirujących elementów. Uwaga: Hz w elektryce zasilania to nie zawsze prędkość obrotowa wału.'
  },
  'obroty|°/s': {
    d: 'Stopień na sekundę to π/180 rad/s, czyli około 0,01745 rad/s. Przez π zapis dziesiętny jest przybliżeniem.',
    g: 'Stoły obrotowe, roboty, osie indeksujące i czujniki położenia. W interfejsach HMI °/s bywa bardziej zrozumiały niż rad/s.'
  },

  /* ---------- PRZYSPIESZENIE ---------- */
  'przyspieszenie|m/s²': {
    d: 'Metr na sekundę kwadrat to przyspieszenie, które zwiększa prędkość o 1 m/s w każdej sekundzie. To jednostka SI używana bezpośrednio w równaniu F = m·a.',
    g: 'Dynamika osi, obliczenia sił bezwładności, profile ruchu serwonapędów i symulacje. Jeśli znasz masę w kg, m/s² daje od razu siłę w N.'
  },
  'przyspieszenie|mm/s²': {
    d: 'Milimetr na sekundę kwadrat to dokładnie 0,001 m/s². Jednostka jest mała, ale wygodna przy krótkich skokach i ruchach opisanych w milimetrach.',
    g: 'Sterowniki osi, profile ruchu, małe manipulatory i aplikacje pick-and-place. W arkuszach konstrukcyjnych łatwo pomylić ją z mm/s, czyli prędkością.'
  },
  'przyspieszenie|g': {
    d: 'Jedno g w tym przeliczniku to dokładnie 9,80665 m/s², czyli przyspieszenie normalne. To wartość definicyjna dla jednostek technicznych, nie lokalny pomiar grawitacji w hali.',
    g: 'Wibracje, udary, testy transportowe, czujniki IMU i dane odporności komponentów. Przy przeliczaniu masy na siłę 1 kg przy 1 g daje 9,80665 N.'
  },
  'przyspieszenie|ft/s²': {
    d: 'Stopa na sekundę kwadrat to dokładnie 0,3048 m/s². Jest imperialnym odpowiednikiem m/s², z tym samym sensem fizycznym.',
    g: 'Dokumentacja ruchu i dynamiki z USA, zwłaszcza przy maszynach mobilnych. Jeśli obok pojawia się lbf, trzeba pilnować różnicy między masą a siłą.'
  },

  /* ---------- PRZEPLYW ---------- */
  'przeplyw|l/min': {
    d: 'Litr na minutę to litr podzielony przez 60 sekund, czyli około 0,0000167 m³/s. Dzielenie nie kończy się w zapisie dziesiętnym, więc wynik jest zaokrąglony.',
    g: 'Hydraulika, chłodzenie, smarowanie, pneumatyka i karty katalogowe pomp. To jedna z najbardziej praktycznych jednostek przy doborze osprzętu maszyn.'
  },
  'przeplyw|l/s': {
    d: 'Litr na sekundę to dokładnie 0,001 m³/s. Liczbowo wygląda prosto, ale dla małych pomp potrafi dawać za duże liczby względem l/min.',
    g: 'Instalacje wodne, chłodzenie i większe układy procesowe. W kartach pomp spotkasz go rzadziej niż l/min albo m³/h.'
  },
  'przeplyw|l/h': {
    d: 'Litr na godzinę to 0,001 m³ podzielone przez 3600 s, czyli około 0,000000278 m³/s. Dobrze opisuje małe, powolne dozowanie.',
    g: 'Dozowniki chemii, smarowanie centralne, chłodziwa i układy laboratoryjne przy maszynach. Przy ręcznym przeliczeniu łatwo zgubić 3600.'
  },
  'przeplyw|m³/h': {
    d: 'Metr sześcienny na godzinę to 1/3600 m³/s, czyli około 0,000278 m³/s. To wygodna skala dla powietrza i większych przepływów cieczy.',
    g: 'Wentylatory, sprężarki, układy odpylania, pompy i instalacje procesowe. Katalogi często podają m³/h, a obliczenia przewodów chcą m³/s.'
  },
  'przeplyw|m³/min': {
    d: 'Metr sześcienny na minutę to 1/60 m³/s, czyli około 0,0167 m³/s. Względem m³/h różni się dokładnie 60 razy.',
    g: 'Sprężarki, wentylacja i duże przepływy powietrza w dokumentacji technicznej. Minuta w mianowniku bywa łatwa do przeoczenia, zwłaszcza obok m³/h.'
  },
  'przeplyw|m³/s': {
    d: 'Metr sześcienny na sekundę jest jednostką bazową przepływu objętościowego w tym przeliczniku. Dla typowej pneumatyki daje małe ułamki, ale w równaniach jest najczystszy.',
    g: 'Obliczenia przewodów, wentylacji, strat ciśnienia i symulacje CFD. W katalogu komponentu częściej zobaczysz l/min albo m³/h.'
  },
  'przeplyw|cm³/min': {
    d: 'Centymetr sześcienny na minutę to 0,000001 m³ podzielone przez 60 s, czyli około 0,0000000167 m³/s. To ta sama objętość co ml/min.',
    g: 'Mikropompy, dozowniki kleju, smarowanie i małe układy procesowe. Skrót ccm/min w niemieckiej karcie katalogowej oznacza właśnie cm³/min.'
  },
  'przeplyw|cfm': {
    d: 'Cfm to stopa sześcienna na minutę, czyli około 0,000471947 m³/s. W wersji scfm dochodzi jeszcze odniesienie do warunków normalnych, a to już osobny temat.',
    g: 'Sprężarki, wentylatory, odciągi i pneumatyka z USA. Przy powietrzu trzeba sprawdzić, czy katalog mówi o przepływie rzeczywistym, czy standaryzowanym.'
  },
  'przeplyw|gpm': {
    d: 'Gpm w tym przeliczniku oznacza galon US na minutę, czyli około 0,0000631 m³/s. Liczba wynika z galona US równego 3,785411784 l podzielonego przez 60 s.',
    g: 'Pompy, dysze, chłodzenie i hydraulika z USA. Uwaga na galon UK, bo wtedy ta sama liczba gpm oznacza inny przepływ.'
  },

  /* ---------- MOC ---------- */
  'moc|W': {
    d: 'Wat to 1 J/s, czyli praca 1 J wykonana w 1 sekundę. Mechanicznie można go czytać jako 1 N·m/s.',
    g: 'Silniki, grzałki, straty w przekładniach, moc chłodzenia i bilanse energetyczne. Dla większych maszyn szybko przechodzi w kW.'
  },
  'moc|kW': {
    d: 'Kilowat to dokładnie 1000 W. W maszynach jest podstawową skalą dla silników elektrycznych i napędów.',
    g: 'Tabliczki znamionowe silników, falowniki, przekładnie i dokumentacja elektryczna. Jeżeli dobierasz zabezpieczenia albo przewody, kW to dopiero początek rozmowy.'
  },
  'moc|MW': {
    d: 'Megawat to dokładnie 1 000 000 W. W konstrukcji pojedynczego mechanizmu to dużo, ale w energetyce i dużych instalacjach normalna skala.',
    g: 'Turbiny, duże napędy, kotłownie, agregaty i dokumentacja zakładów. Przy maszynach produkcyjnych zwykle pojawia się jako suma mocy linii albo przyłącza.'
  },
  'moc|KM': {
    d: 'Koń mechaniczny metryczny to dokładnie 75 kgf·m/s, czyli 735,49875 W. Nazywany też PS, nie jest tym samym co brytyjski hp.',
    g: 'Motoryzacja, starsze silniki i katalogi przekładni. Różnica wobec hp wynosi około 1,4 procent, więc przy 100 KM robi się już zauważalna.'
  },
  'moc|hp': {
    d: 'Horsepower w tym przeliczniku to 550 lbf·ft/s, czyli około 745,7 W. To brytyjsko-amerykański koń mechaniczny, wynikający z innej definicji niż metryczny KM.',
    g: 'Silniki, pompy, sprężarki i napędy z USA. Na tabliczce importowanego silnika hp nie wolno automatycznie przepisywać jako KM.'
  },
  'moc|BTU/h': {
    d: 'BTU na godzinę ma w danych przelicznika około 0,293071 W. Jednostka bierze BTU jako porcję energii cieplnej i dzieli ją przez godzinę.',
    g: 'Klimatyzacja, chłodnictwo, nagrzewnice i karty HVAC. Moc 12 000 BTU/h to około 3,52 kW, czyli klasyczny mały klimatyzator.'
  },
  'moc|kcal/h': {
    d: 'Kilokaloria na godzinę to 1,163 W w danych przelicznika. Wynika z kilokalorii technicznej podzielonej przez godzinę.',
    g: 'Starsze karty wymienników ciepła, nagrzewnic i instalacji grzewczych. Jeśli ktoś liczy wodę lodową ze starego katalogu, kcal/h może jeszcze wyskoczyć.'
  },

  /* ---------- ENERGIA ---------- */
  'energia|J': {
    d: 'Dżul to praca siły 1 N na drodze 1 m, czyli 1 N·m jako energia. To ta sama jednostka wymiarowo co moment, ale fizycznie nie wolno ich mieszać.',
    g: 'Obliczenia pracy, energii kinetycznej, udarów i bilansów cieplnych. W raporcie technicznym J mówi o energii, N·m o momencie, choć liczba bazowa wygląda podobnie.'
  },
  'energia|kJ': {
    d: 'Kilodżul to dokładnie 1000 J. Wygodny tam, gdzie pojedyncze dżule robią się zbyt drobne.',
    g: 'Bilans cieplny, energia uderzenia, testy zderzeniowe i obliczenia procesu. W instrukcjach maszyn spotykany rzadziej niż kWh, ale w obliczeniach jest poręczny.'
  },
  'energia|MJ': {
    d: 'Megadżul to dokładnie 1 000 000 J. Skala pasuje do dużych porcji energii, paliw albo akumulacji w ciężkich elementach.',
    g: 'Energia kinetyczna dużych wirników, bilanse procesowe i instalacje cieplne. Jeżeli w małym mechanizmie wychodzą MJ, warto sprawdzić masę albo prędkość.'
  },
  'energia|Wh': {
    d: 'Watogodzina to moc 1 W utrzymana przez 1 godzinę, czyli dokładnie 3600 J. To jednostka energii, nie mocy.',
    g: 'Akumulatory, zasilacze UPS, pobór energii i dokumentacja elektryczna. Klasyczna pułapka: W mówi jak szybko zużywasz energię, Wh ile jej masz albo zużyłeś.'
  },
  'energia|kWh': {
    d: 'Kilowatogodzina to dokładnie 3 600 000 J. Jest wygodna dla zużycia energii, bo maszyny rzadko pracują tylko przez sekundę.',
    g: 'Liczniki energii, koszt pracy linii, bilanse zakładu i dobór magazynu energii. Przy mocy 5 kW przez 2 h wychodzi 10 kWh, nie 10 kW.'
  },
  'energia|cal': {
    d: 'Kaloria w tym przeliczniku ma 4,1868 J. To ilość ciepła historycznie związana z ogrzaniem wody, ale definicji kalorii było kilka, więc trzeba znać przyjętą wartość.',
    g: 'Starsze dane cieplne, chemia procesowa i materiały szkoleniowe. W konstrukcji maszyn częściej spotkasz kcal albo kJ.'
  },
  'energia|kcal': {
    d: 'Kilokaloria to 1000 cal, czyli 4186,8 J w tym zestawie danych. W technice cieplnej bywa wygodna, choć SI woli dżule.',
    g: 'Wymienniki ciepła, nagrzewnice, chłodzenie i starsze obliczenia instalacyjne. W branży spożywczej kcal pojawia się też z zupełnie nietechnicznych powodów.'
  },
  'energia|BTU': {
    d: 'BTU ma w danych przelicznika około 1055,06 J. To brytyjska jednostka ciepła związana z ogrzaniem funta wody o 1 °F.',
    g: 'HVAC, chłodnictwo, palniki i dokumentacja urządzeń z USA. Jeśli moc jest w BTU/h, energia bazowa siedzi właśnie tutaj.'
  },
  'energia|kgf·m': {
    d: 'Kilogramometr jako energia to praca 1 kgf na drodze 1 m, czyli dokładnie 9,80665 J. Wygląda jak jednostka momentu, ale tutaj oznacza pracę po przesunięciu.',
    g: 'Starsze tablice mechaniczne, udary, praca podnoszenia i dawne obliczenia maszyn. Trzeba patrzeć na kontekst, bo kgf·m może oznaczać moment albo energię.'
  },

  /* ---------- GESTOSC ---------- */
  'gestosc|kg/m³': {
    d: 'Kilogram na metr sześcienny jest jednostką bazową gęstości w tym przeliczniku. Woda ma około 1000 kg/m³, więc skala jest łatwa do kontroli zdrowym rozsądkiem.',
    g: 'Karty materiałowe, obliczenia masy z objętości CAD, płyny procesowe i dobór pomp. Jeśli model podaje objętość w mm³, jednostki trzeba poukładać przed mnożeniem.'
  },
  'gestosc|g/cm³': {
    d: 'Gram na centymetr sześcienny to dokładnie 1000 kg/m³. Liczbowo woda ma około 1 g/cm³, dlatego jednostka jest wygodna w materiałach i chemii.',
    g: 'Karty tworzyw, metali, olejów i klejów. Stal 7,85 g/cm³ to 7850 kg/m³, czyli typowa wartość do sprawdzenia masy detalu.'
  },
  'gestosc|kg/dm³': {
    d: 'Kilogram na decymetr sześcienny to dokładnie 1000 kg/m³. Liczbowo jest równy g/cm³, tylko używa litrowej objętości.',
    g: 'Płyny, zbiorniki, oleje i dokumentacja procesowa. Przy wodzie 1 kg/dm³ brzmi bardziej warsztatowo niż 1000 kg/m³.'
  },
  'gestosc|t/m³': {
    d: 'Tona na metr sześcienny to dokładnie 1000 kg/m³. Liczbowo jest taka sama jak g/cm³ i kg/dm³.',
    g: 'Materiały sypkie, stal, kruszywa, beton i opisy masy zasypów. W rozmowie o konstrukcji ramy łatwiej powiedzieć 7,85 t/m³ niż 7850 kg/m³.'
  },
  'gestosc|lb/ft³': {
    d: 'Funt na stopę sześcienną ma około 16,0185 kg/m³. Wynika z funta i stopy sześciennej, a dzielenie daje niekończący się zapis dziesiętny.',
    g: 'Materiały, izolacje, gazy i dane procesowe z USA. Skrót pcf w tabeli materiału oznacza właśnie lb/ft³.'
  },
  'gestosc|lb/in³': {
    d: 'Funt na cal sześcienny ma około 27 679,9 kg/m³. To duża jednostka gęstości, bo cal sześcienny jest małą objętością.',
    g: 'Karty metali z USA i obliczenia masy elementów calowych. Stal około 0,283 lb/in³ daje okolice 7830 kg/m³, czyli można szybko sprawdzić, czy tabela ma sens.'
  },

  /* ---------- KAT ---------- */
  'kat|°': {
    d: 'Stopień to 1/360 pełnego obrotu, czyli π/180 rad. W danych przelicznika daje około 0,01745 rad, bo przez π zapis dziesiętny jest przybliżeniem.',
    g: 'Rysunki techniczne, fazy, kąty gięcia, ustawienia czujników i osie obrotowe. Stopnie są czytelne dla człowieka, ale funkcje trygonometryczne w obliczeniach zwykle chcą radianów.'
  },
  'kat|rad': {
    d: 'Radian to kąt, przy którym długość łuku jest równa promieniowi. Pełny obrót ma 2π rad, czyli około 6,28319 rad.',
    g: 'Obliczenia kinematyki, dynamiki, prędkości kątowej i funkcje matematyczne. W CAD często widzisz stopnie, ale solver pod spodem myśli radianami.'
  },
  'kat|′': {
    d: 'Minuta kątowa to 1/60 stopnia, czyli około 0,000290888 rad. Symbol wygląda jak apostrof, więc łatwo go zgubić przy kopiowaniu z PDF-u.',
    g: 'Geometria precyzyjna, optyka, geodezja i ustawianie bardzo małych kątów. W dokumentacji maszynowej pojawia się przy dokładności pochylenia albo osiowania.'
  },
  'kat|″': {
    d: 'Sekunda kątowa to 1/60 minuty kątowej i 1/3600 stopnia. W danych przelicznika ma około 0,00000484814 rad.',
    g: 'Optyka, pomiary precyzyjne, ustawianie osi i dokumentacja urządzeń pomiarowych. Symbol jest podobny do cudzysłowu, więc przy przepisywaniu łatwo zrobić z niego cale.'
  },
  'kat|grad': {
    d: 'Grad, czyli gon, dzieli pełny obrót na 400 części. Jeden grad ma π/200 rad, czyli około 0,015708 rad.',
    g: 'Geodezja, starsze przyrządy pomiarowe i niektóre nastawy kątowe. W konstrukcji maszyn rzadki, ale gdy przychodzi z pomiarów terenu, trzeba go poprawnie odczytać.'
  },
  'kat|obrót': {
    d: 'Pełny obrót to 2π rad, czyli około 6,28319 rad. Jako kąt jest prosty, ale przez π nie ma skończonego zapisu dziesiętnego.',
    g: 'Mechanizmy indeksujące, enkodery, śruby kulowe i przełożenia. Jeden obrót wału nie zawsze oznacza jeden cykl maszyny, więc kontekst mechanizmu jest kluczowy.'
  },

  /* ---------- CZAS ---------- */
  'czas|ms': {
    d: 'Milisekunda to dokładnie 0,001 s. W mechanice to krótko, ale w sterowaniu i czujnikach potrafi być całym opóźnieniem procesu.',
    g: 'PLC, czujniki, kamery, serwonapędy i czasy reakcji zaworów. Jeśli maszyna gubi detal przy 120 sztukach na minutę, milisekundy przestają być teorią.'
  },
  'czas|s': {
    d: 'Sekunda jest jednostką bazową czasu w SI. Obecnie wynika z częstotliwości przejścia atomu cezu, ale w projekcie ważniejsze jest to, że większość wzorów liczy właśnie w sekundach.',
    g: 'Cyklogramy, profile ruchu, symulacje, pneumatyka i czasy procesowe. W arkuszach trzeba pilnować, czy dostawca podał czas w s, ms czy min.'
  },
  'czas|min': {
    d: 'Minuta to dokładnie 60 s. W technice jest wygodna przy cyklu produkcyjnym, wydajnościach i przepływach.',
    g: 'Takt linii, przepływy l/min, obroty obr/min i instrukcje obsługi. To mała jednostka organizacyjna produkcji, ale w obliczeniach często trzeba zejść do sekund.'
  },
  'czas|h': {
    d: 'Godzina to dokładnie 3600 s. Dobrze opisuje eksploatację, ale potrafi namieszać, gdy w tym samym arkuszu są sekundy cyklu.',
    g: 'Motogodziny, zużycie energii kWh, przepływy l/h i planowanie produkcji. Przy przeliczeniu mocy na energię godzina siedzi w jednostce, choć łatwo o niej zapomnieć.'
  },
  'czas|doba': {
    d: 'Doba w tym przeliczniku ma dokładnie 86 400 s, czyli 24 h. To doba cywilna, bez zabaw w sekundy przestępne.',
    g: 'Wydajność dobowa, testy starzeniowe, praca ciągła i harmonogramy UR. Przy maszynach pracujących 24/7 doba szybko zamienia małe straty w duże liczby.'
  },

  /* ---------- BEZWLADNOSC ---------- */
  'bezwladnosc|kg·m²': {
    d: 'Kilogram razy metr kwadratowy jest jednostką SI masowego momentu bezwładności. To nie masa, tylko informacja, jak daleko masa leży od osi obrotu.',
    g: 'Dobór serwonapędów, hamulców, sprzęgieł i analiza rozruchu wałów. Dwa wirniki o tej samej masie mogą mieć zupełnie inną bezwładność.'
  },
  'bezwladnosc|kg·cm²': {
    d: 'Kilogram razy centymetr kwadratowy to dokładnie 0,0001 kg·m². Jednostka wygodna dla małych wirników, bo wartości w kg·m² byłyby bardzo małe.',
    g: 'Katalogi silników, przekładni, sprzęgieł i małych stołów obrotowych. Przy doborze serwa trzeba pilnować, czy producent podał kg·cm² czy kg·m².'
  },
  'bezwladnosc|g·cm²': {
    d: 'Gram razy centymetr kwadratowy to dokładnie 0,0000001 kg·m². Wynika z 0,001 kg i 0,0001 m².',
    g: 'Małe silniki, wirniki, enkodery i elementy precyzyjne. Wartości wyglądają duże liczbowo, ale po przeliczeniu na kg·m² robią się mikroskopijne.'
  },
  'bezwladnosc|lb·ft²': {
    d: 'Funt razy stopa kwadratowa ma około 0,0421401 kg·m². To jednostka masowego momentu bezwładności w systemie imperialnym, nie moment siły.',
    g: 'Koła zamachowe, napędy i dokumentacja mechaniczna z USA. Uwaga na podobieństwo zapisu do lbf·ft, bo jedna litera zmienia sens całej tabeli.'
  },
  'bezwladnosc|lb·in²': {
    d: 'Funt razy cal kwadratowy ma około 0,00029264 kg·m². To 1/144 wartości lb·ft², bo cal jest jedną dwunastą stopy.',
    g: 'Małe wirniki, sprzęgła, koła pasowe i katalogi silników z USA. Przy przeliczeniu do SI najczęściej wychodzą wartości rzędu tysięcznych albo milionowych kg·m².'
  },

  /* ---------- SZTYWNOSC ---------- */
  'sztywnosc|N/mm': {
    d: 'Niuton na milimetr oznacza, ile siły potrzeba na ugięcie o 1 mm. W bazie SI odpowiada dokładnie 1000 N/m.',
    g: 'Katalogi sprężyn, elastomerów, docisków i elementów podatnych. To naturalna jednostka, gdy skok roboczy w mechanizmie jest w milimetrach.'
  },
  'sztywnosc|N/m': {
    d: 'Niuton na metr jest jednostką bazową sztywności w tym przeliczniku. Dla typowych sprężyn maszynowych daje duże liczby, bo 1 m ugięcia to absurdalnie dużo.',
    g: 'Modele dynamiczne, symulacje, równania drgań i obliczenia akademickie. W katalogu sprężyny częściej zobaczysz N/mm.'
  },
  'sztywnosc|kN/mm': {
    d: 'Kiloniuton na milimetr to dokładnie 1 000 000 N/m. To bardzo sztywna skala, dobra dla konstrukcji, podpór albo dużych elementów sprężystych.',
    g: 'Charakterystyki pras, ram, podpór, prowadnic i dużych sprężyn talerzowych. Jeżeli mała sprężyna wychodzi w kN/mm, najpierw sprawdź, czy nie miało być N/mm.'
  },
  'sztywnosc|kgf/mm': {
    d: 'Kilogram siły na milimetr to dokładnie 9806,65 N/m. Jednostka wynika z kgf równego 9,80665 N i ugięcia liczonego w mm.',
    g: 'Starsze katalogi sprężyn, siłomierze i dokumentacja techniczna z jednostkami technicznymi. Dla montażu bywa intuicyjna, ale do obliczeń trzeba ją sprowadzić do N/mm albo N/m.'
  },
  'sztywnosc|lbf/in': {
    d: 'Funt siły na cal to około 175,127 N/m. Wynika z lbf i dokładnego cala 25,4 mm, ale zapis dziesiętny po przeliczeniu trzeba zaokrąglić.',
    g: 'Sprężyny, amortyzatory, elastomery i katalogi mechaniczne z USA. Nie mylić z lb/in jako masą na długość, bo w sprężynach chodzi o siłę.'
  },

  /* ---------- LEPKOSC ---------- */
  'lepkosc|mm²/s': {
    d: 'Milimetr kwadratowy na sekundę to dokładnie 0,000001 m²/s. Dla lepkości kinematycznej jest liczbowo równy centystokesowi.',
    g: 'Karty olejów hydraulicznych, smarowanie, dobór pomp i charakterystyki przepływu. Olej ISO VG 46 ma około 46 mm²/s przy 40 °C, więc temperatura jest częścią informacji.'
  },
  'lepkosc|cSt': {
    d: 'Centystokes to dokładnie 1 mm²/s, czyli 0,000001 m²/s. Nazwa pochodzi od stokesa, ale w kartach olejowych najczęściej zostaje właśnie cSt.',
    g: 'Oleje hydrauliczne, przekładniowe i karty środków smarnych. Jeśli dostawca podaje 32 cSt przy 40 °C, to jest 32 mm²/s, bez dodatkowego przelicznika.'
  },
  'lepkosc|St': {
    d: 'Stokes to 100 cSt, czyli dokładnie 0,0001 m²/s. Jednostka jest większa, dlatego w praktyce olejowej częściej używa się centystokesów.',
    g: 'Starsze tabele lepkości i materiały laboratoryjne. W katalogu oleju maszynowego St pojawia się rzadziej niż cSt albo mm²/s.'
  },
  'lepkosc|m²/s': {
    d: 'Metr kwadratowy na sekundę jest jednostką bazową lepkości kinematycznej w SI. Dla olejów maszynowych daje bardzo małe ułamki.',
    g: 'Obliczenia przepływu, modele numeryczne i dokumentacja naukowa. Przy doborze oleju praktyczniej czytać mm²/s, bo 0,000046 m²/s mówi mało przy przeglądaniu katalogu.'
  }
};

if (typeof module !== 'undefined') module.exports = {DEFINICJE};
