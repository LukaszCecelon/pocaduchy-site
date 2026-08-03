import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Okruszki from '@site/src/components/Okruszki';
import prawne from '@site/content/prawne.json';
import styles from './StronaPrawna.module.css';

const SITE = 'https://pocaduchy.pl';
const {administrator, dataAktualizacji} = prawne;

// Nazwa administratora skladana z danych: NIP dokladamy tylko wtedy, gdy jest
// wypelniony, zeby na stronie nigdy nie pojawilo sie puste pole.
const NAZWA_ADMINISTRATORA = administrator.nip
  ? `${administrator.nazwa}, NIP ${administrator.nip}`
  : administrator.nazwa;

// W tekstach uzywamy znacznikow zamiast wklejania danych w kazdym miejscu,
// dzieki czemu zmiana adresu e-mail to poprawka w jednym polu JSON.
function podstaw(tekst) {
  return (tekst || '')
    .replace(/\{\{ADMINISTRATOR\}\}/g, `**${NAZWA_ADMINISTRATORA}**`)
    .replace(/\{\{EMAIL\}\}/g, `[${administrator.email}](mailto:${administrator.email})`);
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

// Ponowne otwarcie okna zgody. Wycofanie zgody musi byc rownie latwe jak jej
// udzielenie, a baner Google domyslnie nie wraca sam z siebie.
function PrzyciskZgody() {
  const [stan, setStan] = React.useState('gotowy');

  function otworz() {
    if (typeof window === 'undefined') return;
    const fc = window.googlefc;
    if (fc && typeof fc.showRevocationMessage === 'function') {
      fc.showRevocationMessage();
      return;
    }
    if (fc && Array.isArray(fc.callbackQueue)) {
      fc.callbackQueue.push({
        CONSENT_DATA_READY: () => window.googlefc.showRevocationMessage(),
      });
      return;
    }
    // Baner nie zdazyl sie zaladowac albo blokuje go rozszerzenie przegladarki.
    setStan('niedostepny');
  }

  return (
    <div className={styles.zgodaBox}>
      <button type="button" onClick={otworz} className={`${styles.zgodaBtn} pc-cut`}>
        Zmień ustawienia zgody
      </button>
      {stan === 'niedostepny' ? (
        <p className={styles.zgodaInfo}>
          Okno zgody nie odpowiada. Najczęściej blokuje je rozszerzenie
          przeglądarki typu adblock. Możesz też wyczyścić pliki cookies dla tej
          strony, wtedy baner pojawi się ponownie przy następnej wizycie.
        </p>
      ) : null}
    </div>
  );
}

function Sekcja({sekcja}) {
  return (
    <section
      className={`${styles.sekcja} ${sekcja.wyroznienie ? styles.wyrozniona : ''}`}>
      <h2 className={styles.h2}>{sekcja.tytul}</h2>

      {(sekcja.akapity || []).map((a) => (
        <div key={a.slice(0, 40)} className={styles.tekst}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{podstaw(a)}</ReactMarkdown>
        </div>
      ))}

      {sekcja.lista ? (
        <ul className={styles.lista}>
          {sekcja.lista.map((p) => (
            <li key={p.slice(0, 40)}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{podstaw(p)}</ReactMarkdown>
            </li>
          ))}
        </ul>
      ) : null}

      {sekcja.tabela ? (
        <div className={styles.tabela}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{sekcja.tabela}</ReactMarkdown>
        </div>
      ) : null}

      {sekcja.poTabeli ? (
        <div className={styles.tekst}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {podstaw(sekcja.poTabeli)}
          </ReactMarkdown>
        </div>
      ) : null}

      {sekcja.poLiscie ? (
        <div className={styles.tekst}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {podstaw(sekcja.poLiscie)}
          </ReactMarkdown>
        </div>
      ) : null}

      {sekcja.przyciskZgody ? <PrzyciskZgody /> : null}
    </section>
  );
}

// Wspolny szablon dokumentow prawnych. Tresc siedzi w content/prawne.json,
// tutaj jest wylacznie sposob jej pokazania.
export default function StronaPrawna({dokument, sciezka}) {
  const d = prawne[dokument];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE}${sciezka}#strona`,
    url: `${SITE}${sciezka}`,
    name: d.meta.tytul,
    description: d.meta.opis,
    inLanguage: 'pl-PL',
    dateModified: dataAktualizacji,
    isPartOf: {'@id': `${SITE}/#strona`},
    publisher: {'@id': `${SITE}/#organizacja`},
  };

  return (
    <Layout title={d.meta.tytul} description={d.meta.opis}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <div className={styles.wrap}>
        <Okruszki sciezka={[{nazwa: d.naglowek, url: sciezka}]} />

        <header className={styles.hero}>
          <h1 className={styles.title}>{d.naglowek}</h1>
          <p className={styles.lead}>{d.lead}</p>
          <p className={styles.data}>
            Ostatnia aktualizacja:{' '}
            <time dateTime={dataAktualizacji}>{formatDate(dataAktualizacji)}</time>
          </p>
        </header>

        {d.sekcje.map((s) => (
          <Sekcja key={s.tytul} sekcja={s} />
        ))}
      </div>
    </Layout>
  );
}
