// Zliczanie odslon przy przejsciach wewnatrz serwisu.
//
// Docusaurus to aplikacja jednostronicowa: klikniecie w menu nie przeladowuje
// strony, wiec skrypt GA4 z <head> wysyla odslone tylko raz, przy wejsciu.
// Bez tego modulu w statystykach widac wylacznie strone wejscia, a cala
// dalsza wedrowka czytelnika przepada.
export function onRouteDidUpdate({location, previousLocation}) {
  // Pierwsze wywolanie po zaladowaniu strony pomijamy: ta odslona poszla juz
  // z konfiguracji gtag. previousLocation jest wtedy puste.
  if (!previousLocation) return;
  if (previousLocation.pathname === location.pathname) return;
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  // Krotka zwloka, bo tytul dokumentu podmienia sie dopiero po odrysowaniu
  // strony. Bez niej w raportach GA4 kazda podstrona nazywalaby sie tak, jak
  // ta poprzednia.
  setTimeout(() => {
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, 120);
}
