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

function TekstBlock({body}) {
  return (
    <div className={styles.tekst}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
    </div>
  );
}

function ObrazBlock({src, podpis, wyrownanie}) {
  const url = useBaseUrl(src);
  const alignClass = styles[ALIGN_CLASS[wyrownanie]] || styles.obrazSrodek;
  return (
    <figure className={`${styles.obraz} ${alignClass}`}>
      <img src={url} alt={podpis || ''} loading="lazy" />
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
