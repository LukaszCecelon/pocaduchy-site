import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import useBaseUrl from '@docusaurus/useBaseUrl';
import imageSizes from '@site/src/data/image-sizes.json';
import {dobierzPierscien, listaSrednic} from '@site/src/lib/pierscienie/oblicz';
import WidokWalek from '@site/src/components/pierscienie/widok-walek.svg';
import WidokOtwor from '@site/src/components/pierscienie/widok-otwor.svg';
import pozycje from '@site/src/components/pierscienie/pozycje.json';
import {GWINTY, DLUGOSC_GWINTU, dlugoscGwintu} from '@site/src/lib/gwinty/dane';
import styles from './BlockRenderer.module.css';

const ALIGN_CLASS = {
  lewo: 'obrazLewo',
  prawo: 'obrazPrawo',
  srodek: 'obrazSrodek',
  'pelna-szerokosc': 'obrazPelny',
};

// Linki zewnętrzne otwieramy w nowej karcie, żeby czytelnik nie tracił
// artykułu; rel chroni przed dostępem do window.opener.
const MD_COMPONENTS = {
  a({href = '', children, ...props}) {
    const zewnetrzny = /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        {...(zewnetrzny ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
        {...props}>
        {children}
      </a>
    );
  },
};

function imageSizeAttrs(src) {
  const size = imageSizes[src];
  return size ? {width: size.w, height: size.h} : {};
}

function TekstBlock({body}) {
  return (
    <div className={styles.tekst}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD_COMPONENTS}>
        {body}
      </ReactMarkdown>
    </div>
  );
}

function ObrazBlock({src, podpis, alt, wyrownanie, priorytet}) {
  const url = useBaseUrl(src);
  const alignClass = styles[ALIGN_CLASS[wyrownanie]] || styles.obrazSrodek;
  const sizeAttrs = imageSizeAttrs(src);
  return (
    <figure className={`${styles.obraz} ${alignClass}`}>
      {/* alt: opis dla czytników ekranu i wyszukiwarek — niezależny od
          widocznego podpisu (obraz może mieć opis bez podpisu pod spodem) */}
      <img
        src={url}
        alt={alt || podpis || ''}
        loading={priorytet ? 'eager' : 'lazy'}
        fetchPriority={priorytet ? 'high' : undefined}
        {...sizeAttrs}
      />
      {podpis ? <figcaption className={styles.podpis}>{podpis}</figcaption> : null}
    </figure>
  );
}

function RysunekBlock({svg, podpis}) {
  if (!svg) return null;

  return (
    <figure className={styles.rysunek}>
      {/* SVG pochodzi wyłącznie z naszego CMS-a/repo, czyli z zaufanego źródła. */}
      <div dangerouslySetInnerHTML={{__html: svg}} />
      {podpis ? <figcaption className={styles.podpis}>{podpis}</figcaption> : null}
    </figure>
  );
}

function GaleriaImage({src, alt}) {
  const url = useBaseUrl(src);
  const sizeAttrs = imageSizeAttrs(src);
  return (
    <img
      src={url}
      alt={alt || ''}
      loading="lazy"
      className={styles.galeriaImg}
      {...sizeAttrs}
    />
  );
}

function GaleriaBlock({zdjecia, obrazy}) {
  // Zdjecia moga byc lista adresow albo lista obiektow {src, alt}. Druga
  // postac jest lepsza, bo niesie opis dla czytnikow ekranu, ale pierwsza
  // zostaje: uzywaja jej starsze artykuly.
  const items = Array.isArray(obrazy) ? obrazy : Array.isArray(zdjecia) ? zdjecia : [];
  return (
    <div className={styles.galeria}>
      {items.map((it, i) => {
        const src = typeof it === 'string' ? it : it.src;
        const alt = typeof it === 'string' ? '' : it.alt;
        return <GaleriaImage key={`${src}-${i}`} src={src} alt={alt} />;
      })}
    </div>
  );
}

// Krotkie nagrania z warsztatu i z ekranu CAD. Sa czescia argumentacji
// artykulu, nie ozdoba, wiec traktujemy je jak obraz: w ramce, z podpisem.
function WideoBlock({src, poster, podpis, petla}) {
  const url = useBaseUrl(src);
  const posterUrl = useBaseUrl(poster || '');
  const posterSizeAttrs = imageSizeAttrs(poster);

  // Domyslnie nagranie zachowuje sie jak animowany gif: leci w kolko, bez
  // dzwieku, samo z siebie. Wystarczy podac petla: false, zeby czytelnik
  // musial je uruchomic.
  //
  // Wyjatek: czytelnik, ktory w systemie prosil o ograniczenie animacji,
  // dostaje nagranie zatrzymane. Samo CSS tego nie zalatwi, bo autoodtwarzanie
  // jest atrybutem, nie stylem.
  const [ograniczRuch, setOgraniczRuch] = React.useState(false);
  React.useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    setOgraniczRuch(q.matches);
    const zmiana = (e) => setOgraniczRuch(e.matches);
    q.addEventListener('change', zmiana);
    return () => q.removeEventListener('change', zmiana);
  }, []);

  const wPetli = petla !== false && !ograniczRuch;

  return (
    <figure className={styles.wideo}>
      <video
        src={url}
        poster={poster ? posterUrl : undefined}
        {...posterSizeAttrs}
        controls
        muted={wPetli}
        loop={wPetli}
        autoPlay={wPetli}
        playsInline
        preload={wPetli ? 'auto' : 'metadata'}
      />
      {podpis ? <figcaption className={styles.podpis}>{podpis}</figcaption> : null}
    </figure>
  );
}

// Plik do pobrania: materiał źródłowy, ściągawka na biurko, karta katalogowa.
// Nie jest to zwykły link w tekście, bo pobranie pliku to osobna decyzja
// czytelnika i ma prawo wyglądać jak osobna decyzja.
function PlikBlock({src, tytul, opis, format, waga}) {
  const url = useBaseUrl(src);
  const szczegoly = [format, waga].filter(Boolean).join(', ');

  return (
    <a href={url} download className={`${styles.plik} pc-cut-card`}>
      <span className={styles.plikIkona} aria-hidden="true">↓</span>
      <span className={styles.plikTresc}>
        <span className={styles.plikTytul}>{tytul}</span>
        {opis ? <span className={styles.plikOpis}>{opis}</span> : null}
      </span>
      {szczegoly ? <span className={styles.plikMeta}>{szczegoly}</span> : null}
    </a>
  );
}

function TabelaBlock({markdown}) {
  return (
    <div className={styles.tabela}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}

function WzorBlock({latex}) {
  return (
    <div className={styles.wzor}>
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {`$$${latex || ''}$$`}
      </ReactMarkdown>
    </div>
  );
}



const WIDOKI_ROWKA = {walek: WidokWalek, otwor: WidokOtwor};

// Etykieta zaczepiona za rog pola tekstowego z oryginalnego rysunku, a nie za
// srodek. Rosnie w strone wolnego miejsca, wiec nie wchodzi na linie wymiarowa
// ani na groty strzalek. Ten sam mechanizm co w kalkulatorze.
function EtykietaRowka({zaczep, children}) {
  return (
    <div
      className={`${styles.etRowka} ${styles[zaczep.typ]}`}
      style={{left: `${zaczep.x}%`, top: `${zaczep.y}%`}}>
      {children}
    </div>
  );
}

/**
 * Schemat rowka z oznaczeniami zamiast liczb. Rysunek jest tym samym plikiem,
 * ktorego uzywa kalkulator, wiec tabela, narzedzie i przekroj pokazuja te sama
 * geometrie. Glebokosci t nie opisujemy na rysunku, bo oryginal nie ma dla niej
 * linii wymiarowej, a dorysowywanie jej byloby juz zmyslaniem cudzego rysunku.
 */
function SchematRowka({typ}) {
  const Widok = WIDOKI_ROWKA[typ];
  const zaczepy = pozycje[typ].zaczepy;
  const element = typ === 'walek' ? 'wałka' : 'otworu';

  return (
    <div className={styles.plotnoRowka}>
      <Widok
        className={styles.cadRowka}
        role="img"
        aria-label={`Przekrój rowka pod pierścień osadczy w ${element} z oznaczeniami wymiarów`}
      />
      <EtykietaRowka zaczep={zaczepy.d1}>
        <span className={styles.etGlowna}>⌀d1</span>
      </EtykietaRowka>
      <EtykietaRowka zaczep={zaczepy.d2}>
        <span className={styles.etGlowna}>⌀d2</span>
      </EtykietaRowka>
      <EtykietaRowka zaczep={zaczepy.m}>
        <span className={styles.etGlowna}>m</span>
      </EtykietaRowka>
      <EtykietaRowka zaczep={zaczepy.n}>
        <span className={styles.etGlowna}>n</span>
      </EtykietaRowka>
    </div>
  );
}

// Opis oznaczen pod schematem. Odpowiada na pytanie, ktorej srednicy dotyczy
// ktory wymiar. Kazda pozycja ma opis pelny i skrot: na duzym ekranie widac
// pelny, na malym skrot, zeby panel nie zjadal wysokosci potrzebnej na tabele.
// Grubosc s nie wystepuje na schemacie, ale jest kolumna tabeli, wiec musi tu byc.
function LegendaRowka({typ}) {
  const walek = typ === 'walek';
  const pozycjeLegendy = [
    ['d1', walek ? 'średnica wałka, czyli wymiar, pod który dobierasz pierścień' : 'średnica otworu, czyli wymiar gniazda w korpusie albo piaście',
      walek ? 'średnica wałka' : 'średnica otworu'],
    ['s', 'nominalna grubość pierścienia, wymiar samego pierścienia, a nie rowka', 'grubość pierścienia'],
    ['d2', walek ? 'średnica rowka, mniejsza od d1, bo rowek jest podtoczeniem' : 'średnica rowka, większa od d1, bo rowek jest wybraniem w otworze',
      'średnica rowka'],
    ['m', 'szerokość rowka w klasie H13', 'szerokość rowka'],
    ['t', walek ? 'głębokość rowka, czyli (d1 - d2) / 2' : 'głębokość rowka, czyli (d2 - d1) / 2', 'głębokość rowka'],
    ['n', 'najmniejsza dopuszczalna odległość rowka od czoła detalu', 'od czoła detalu'],
  ];
  return (
    <dl className={styles.legendaRowka}>
      {pozycjeLegendy.map(([symbol, opis, skrot]) => (
        <div key={symbol}>
          <dt>{symbol}</dt>
          <dd>
            <span className={styles.legendaOpisPelny}>{opis}</span>
            <span className={styles.legendaOpisSkrot} aria-hidden="true">
              {skrot}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

// Liczby na rysunku warsztatowym pisze sie z przecinkiem, bez zer na koncu.
function pl(x) {
  return String(Math.round(x * 1000) / 1000).replace('.', ',');
}

/**
 * Tablica rowkow pod pierscienie osadcze, liczona z tego samego zrodla co
 * kalkulator. Recznie przepisana tabela rozjechalaby sie z narzedziem przy
 * pierwszej poprawce danych, a tutaj rozjazd jest niemozliwy.
 */
function TabelaPierscieniBlock({typ = 'walek', podpis}) {
  const wiersze = listaSrednic(typ).map((d1) => {
    const w = dobierzPierscien({typ, srednica: d1});
    return {d1, w};
  });
  const norma = typ === 'walek' ? 'DIN 471' : 'DIN 472';
  const element = typ === 'walek' ? 'wałka' : 'otworu';

  return (
    <figure className={styles.tabelaPierscieni}>
      <div className={styles.odniesienieRowka}>
        <SchematRowka typ={typ} />
        <LegendaRowka typ={typ} />
      </div>
      <div className={styles.tabelaPierscieniWrap}>
        <table>
          <caption className={styles.tabelaPierscieniCaption}>
            {norma}: wymiary rowka w funkcji średnicy {element}
          </caption>
          <thead>
            <tr>
              <th scope="col">d1</th>
              <th scope="col">s</th>
              <th scope="col">d2</th>
              <th scope="col">m</th>
              <th scope="col">t</th>
              <th scope="col">n</th>
            </tr>
          </thead>
          <tbody>
            {wiersze.map(({d1, w}) => (
              <tr key={d1}>
                <th scope="row">{pl(d1)}</th>
                <td>{pl(w.pierscien.s)}</td>
                <td>
                  {pl(w.rowek.d2)} <span className={styles.klasaTol}>{w.rowek.d2Klasa}</span>
                </td>
                <td>
                  {pl(w.rowek.m)} <span className={styles.klasaTol}>H13</span>
                </td>
                <td>{pl(w.rowek.glebokosc)}</td>
                <td>{pl(w.rowek.n)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className={styles.tabelaPierscieniPodpis}>
        {podpis ||
          `Wszystkie wymiary w milimetrach, przy d2 i m razem z klasą tolerancji. d1 to średnica ${element}, d2 średnica rowka, m jego szerokość, t głębokość, n minimalna odległość od czoła.`}
      </figcaption>
    </figure>
  );
}


/**
 * Tablica gwintow metrycznych. Skoki i wymiary pod klucz ida z danych,
 * a dlugosc gwintu liczy sie ze wzoru, bo w DIN 931 to jest wzor, a nie
 * tablica: 2d plus 6, 12 albo 25 zaleznie od dlugosci calej sruby.
 */
function TabelaGwintowBlock({podpis}) {
  return (
    <figure className={styles.tabelaPierscieni}>
      <div className={styles.tabelaPierscieniWrap}>
        <table className={styles.tabelaGwintow}>
          <caption className={styles.tabelaPierscieniCaption}>
            Gwint metryczny: skok, długość gwintu śruby i wymiar pod klucz
          </caption>
          <thead>
            <tr>
              <th scope="col" rowSpan={2}>M</th>
              <th scope="col" rowSpan={2}>wybór</th>
              <th scope="col" colSpan={2}>Skok gwintu</th>
              <th scope="col" colSpan={3}>Długość gwintu, DIN 931</th>
              <th scope="col" rowSpan={2}>Klucz</th>
            </tr>
            <tr>
              <th scope="col">zwykły</th>
              <th scope="col">drobnozwojny</th>
              {DLUGOSC_GWINTU.map((p) => (
                <th key={p.id} scope="col">
                  {p.opis}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GWINTY.map((g) => (
              <tr key={g.d}>
                <th scope="row">M{pl(g.d)}</th>
                <td className={styles.wybor}>{g.w}</td>
                <td>
                  {pl(g.p)}
                  {g.pUwaga ? (
                    <abbr className={styles.gwiazdkaKlucza} title={g.pUwaga}>
                      *
                    </abbr>
                  ) : null}
                </td>
                <td>
                  {g.pd.map((skok, i) => (
                    <React.Fragment key={skok}>
                      {i > 0 ? ' / ' : ''}
                      {pl(skok)}
                      {g.pdUwagi && g.pdUwagi[skok] ? (
                        <abbr className={styles.gwiazdkaKlucza} title={g.pdUwagi[skok]}>
                          *
                        </abbr>
                      ) : null}
                    </React.Fragment>
                  ))}
                </td>
                {DLUGOSC_GWINTU.map((p) => {
                  const b = dlugoscGwintu(g.d, p.id);
                  return <td key={p.id}>{b === null ? '–' : pl(b)}</td>;
                })}
                <td>
                  {g.k === undefined ? (
                    '–'
                  ) : (
                    <>
                      {pl(g.k)}
                      {g.kUwaga ? (
                        <abbr className={styles.gwiazdkaKlucza} title={g.kUwaga}>
                          *
                        </abbr>
                      ) : null}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className={styles.tabelaPierscieniPodpis}>
        {podpis ||
          'Wszystkie wymiary w milimetrach. Kąt zarysu gwintu metrycznego wynosi 60 stopni. Kolumna wyboru to kolejność z ISO 261: średnice pierwszego wyboru mają najlepszą dostępność śrub, gwintowników i sprawdzianów. Kreska w długości gwintu znaczy, że gwint byłby dłuższy od samej śruby albo że w tej średnicy nie ma śruby z łbem sześciokątnym. Długość gwintu jest wartością znormalizowaną, a nie deklaracją, że taka śruba leży na magazynie. Gwiazdka oznacza wartość z zastrzeżeniem, najedź na nią, żeby je zobaczyć.'}
      </figcaption>
    </figure>
  );
}

const BLOCK_COMPONENTS = {
  tekst: TekstBlock,
  obraz: ObrazBlock,
  wideo: WideoBlock,
  rysunek: RysunekBlock,
  galeria: GaleriaBlock,
  plik: PlikBlock,
  tabela: TabelaBlock,
  wzor: WzorBlock,
  tabelaPierscieni: TabelaPierscieniBlock,
  tabelaGwintow: TabelaGwintowBlock,
};

// Renderuje artykuł z CMS-a: tablica bloków (tekst/obraz/galeria/tabela/wzor)
// na widoki zgodne z design systemem strony. Nowe typy bloków dodaje się
// wyłącznie tutaj — BLOCK_COMPONENTS + odpowiadająca kolekcja w config.yml.
export default function BlockRenderer({blocks}) {
  const items = Array.isArray(blocks) ? blocks : [];
  const firstImageIndex = items.findIndex((block) => block?.type === 'obraz');
  return (
    <div className={styles.wrap}>
      {items.map((block, i) => {
        const Component = BLOCK_COMPONENTS[block?.type];
        if (!Component) return null;
        return <Component key={i} {...block} priorytet={i === firstImageIndex} />;
      })}
    </div>
  );
}
