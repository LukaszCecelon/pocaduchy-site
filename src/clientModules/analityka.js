// Zliczanie odslon przy przejsciach wewnatrz serwisu.
//
// Docusaurus to aplikacja jednostronicowa: klikniecie w menu nie przeladowuje
// strony, wiec skrypt GA4 z <head> wysyla odslone tylko raz, przy wejsciu.
// Bez tego modulu w statystykach widac wylacznie strone wejscia, a cala
// dalsza wedrowka czytelnika przepada.

// Tytul dokumentu podmienia sie dopiero w kolejnej klatce animacji, juz po
// zdarzeniu zmiany trasy (znany problem Docusaurusa, issue #7420). Gdybysmy
// wyslali odslone od razu, kazda podstrona w raportach GA4 nosilaby nazwe tej
// poprzedniej. Czekamy wiec na klatke, ale z zapadka czasowa: w karcie
// schowanej w tle przegladarka wstrzymuje klatki i samo requestAnimationFrame
// nigdy by nie zadzialalo.
function poOdrysowaniu(akcja) {
  let wykonane = false;
  const raz = () => {
    if (wykonane) return;
    wykonane = true;
    akcja();
  };
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => requestAnimationFrame(raz));
  }
  setTimeout(raz, 300);
}

export function onRouteDidUpdate({location, previousLocation}) {
  // Pierwsze wywolanie po zaladowaniu strony pomijamy: ta odslona poszla juz
  // z konfiguracji gtag. previousLocation jest wtedy puste.
  if (!previousLocation) return;
  if (previousLocation.pathname === location.pathname) return;
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  poOdrysowaniu(() => {
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  });
}
