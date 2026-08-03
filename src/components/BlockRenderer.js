import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import useBaseUrl from '@docusaurus/useBaseUrl';
import imageSizes from '@site/src/data/image-sizes.json';
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

function ObrazBlock({src, podpis, alt, wyrownanie}) {
  const url = useBaseUrl(src);
  const alignClass = styles[ALIGN_CLASS[wyrownanie]] || styles.obrazSrodek;
  const sizeAttrs = imageSizeAttrs(src);
  return (
    <figure className={`${styles.obraz} ${alignClass}`}>
      {/* alt: opis dla czytników ekranu i wyszukiwarek — niezależny od
          widocznego podpisu (obraz może mieć opis bez podpisu pod spodem) */}
      <img src={url} alt={alt || podpis || ''} loading="lazy" {...sizeAttrs} />
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

const BLOCK_COMPONENTS = {
  tekst: TekstBlock,
  obraz: ObrazBlock,
  wideo: WideoBlock,
  rysunek: RysunekBlock,
  galeria: GaleriaBlock,
  tabela: TabelaBlock,
  wzor: WzorBlock,
};

// Renderuje artykuł z CMS-a: tablica bloków (tekst/obraz/galeria/tabela/wzor)
// na widoki zgodne z design systemem strony. Nowe typy bloków dodaje się
// wyłącznie tutaj — BLOCK_COMPONENTS + odpowiadająca kolekcja w config.yml.
export default function BlockRenderer({blocks}) {
  const items = Array.isArray(blocks) ? blocks : [];
  return (
    <div className={styles.wrap}>
      {items.map((block, i) => {
        const Component = BLOCK_COMPONENTS[block?.type];
        if (!Component) return null;
        return <Component key={i} {...block} />;
      })}
    </div>
  );
}
