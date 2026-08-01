import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import useBaseUrl from '@docusaurus/useBaseUrl';
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
  return (
    <figure className={`${styles.obraz} ${alignClass}`}>
      {/* alt: opis dla czytników ekranu i wyszukiwarek — niezależny od
          widocznego podpisu (obraz może mieć opis bez podpisu pod spodem) */}
      <img src={url} alt={alt || podpis || ''} loading="lazy" />
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

function GaleriaImage({src}) {
  const url = useBaseUrl(src);
  return <img src={url} alt="" loading="lazy" className={styles.galeriaImg} />;
}

function GaleriaBlock({zdjecia}) {
  const items = Array.isArray(zdjecia) ? zdjecia : [];
  return (
    <div className={styles.galeria}>
      {items.map((src, i) => (
        <GaleriaImage key={`${src}-${i}`} src={src} />
      ))}
    </div>
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
