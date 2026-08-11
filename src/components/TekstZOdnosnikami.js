import React from 'react';
import Link from '@docusaurus/Link';

/**
 * Tekst z pliku tresci, w ktorym wybrane frazy staja sie odnosnikami.
 *
 * Powstalo, bo zaproszenia typu „napisz do mnie" albo „dajcie znac mailem"
 * bez odnosnika sa slepym zaulkiem, a wprowadzanie markdownu do pliku tresci
 * dla dwoch linkow w jednym zdaniu bylo nieproporcjonalne.
 *
 * Uzycie: <TekstZOdnosnikami tekst={tresc.lead} odnosniki={tresc.leadLinki} />
 * gdzie odnosniki to [{fraza: 'LinkedIn', url: 'https://...'}].
 * Fraza, ktorej nie ma w tekscie, jest po prostu pomijana.
 */
export default function TekstZOdnosnikami({tekst = '', odnosniki = []}) {
  const lista = Array.isArray(odnosniki) ? odnosniki.filter((o) => o && o.fraza && o.url) : [];
  if (lista.length === 0) return <>{tekst}</>;

  // Tniemy tekst kolejno po kazdej frazie. Kawalki tekstu zostaja tekstem,
  // trafione frazy zamieniaja sie w odnosniki.
  let czesci = [tekst];
  for (const {fraza, url} of lista) {
    czesci = czesci.flatMap((czesc) => {
      if (typeof czesc !== 'string' || !czesc.includes(fraza)) return [czesc];
      const [przed, ...reszta] = czesc.split(fraza);
      const zewnetrzny = /^https?:\/\/|^mailto:/i.test(url);
      const odnosnik = zewnetrzny ? (
        <a key={url} href={url} {...(url.startsWith('http') ? {target: '_blank', rel: 'noopener noreferrer'} : {})}>
          {fraza}
        </a>
      ) : (
        <Link key={url} to={url}>
          {fraza}
        </Link>
      );
      return [przed, odnosnik, reszta.join(fraza)];
    });
  }

  return (
    <>
      {czesci.map((czesc, i) =>
        typeof czesc === 'string' ? <React.Fragment key={i}>{czesc}</React.Fragment> : czesc
      )}
    </>
  );
}
