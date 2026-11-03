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

// Klikniecia, ktore mowia o zainteresowaniu wspolpraca: kazdy link mailto
// (zdarzenie kontakt_mail) i elementy z atrybutem data-zdarzenie. Miejsce na
// stronie idzie z data-miejsce. Jeden nasluch na calym dokumencie, wiec nowe
// przyciski wystarczy oznaczyc atrybutem, bez osobnego kodu.
// Faza capture: wewnetrzny Link zmienia trase w swoim onClick, wiec w fazie
// bubble location.pathname byloby juz adresem docelowym, a nie zrodlowym.
//
// Piksel OpenAI (window.oaiq) istnieje tylko po zgodzie na reklamy. Mail to
// dla kampanii w ChatGPT konwersja, wiec idzie tam jako lead_created; pozostale
// klikniecia zostaja tylko w GA4.
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const el = e.target instanceof Element
      ? e.target.closest('[data-zdarzenie], a[href^="mailto:"]')
      : null;
    if (!el) return;
    if (typeof window.gtag === 'function') {
      window.gtag('event', el.dataset.zdarzenie || 'kontakt_mail', {
        miejsce: el.dataset.miejsce || 'brak',
        page_path: window.location.pathname,
      });
    }
    if (typeof window.oaiq === 'function' && el.matches('a[href^="mailto:"]')) {
      window.oaiq('measure', 'lead_created', {type: 'customer_action'});
    }
  }, true);
}

export function onRouteDidUpdate({location, previousLocation}) {
  // Pierwsze wywolanie po zaladowaniu strony pomijamy: ta odslona poszla juz
  // z konfiguracji gtag i z loadera piksela. previousLocation jest wtedy puste.
  if (!previousLocation) return;
  if (previousLocation.pathname === location.pathname) return;
  if (typeof window === 'undefined') return;

  poOdrysowaniu(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
    if (typeof window.oaiq === 'function') {
      window.oaiq('measure', 'page_viewed', {
        type: 'contents',
        contents: [{id: location.pathname, name: document.title, content_type: 'page'}],
      });
    }
  });
}
