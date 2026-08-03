import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Okruszki from '@site/src/components/Okruszki';
import {otworzBanerZgody} from '@site/src/components/BanerZgody';
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
// udzielenie, a zaden z banerow nie wraca sam z siebie.
//
// Sa dwa niezalezne mechanizmy: nasz baner steruje statystykami, a CMP Google
// zgodami reklamowymi. Przycisk otwiera oba, bo z punktu widzenia czytelnika
// to jedna sprawa: chce zmienic zdanie.
function PrzyciskZgody() {
  function otworzGoogle() {
    const fc = typeof window !== 'undefined' ? window.googlefc : null;
    if (fc && typeof fc.showRevocationMessage === 'function') {
      fc.showRevocationMessage();
      return true;
    }
    if (fc && Array.isArray(fc.callbackQueue)) {
      fc.callbackQueue.push({
        CONSENT_DATA_READY: () => window.googlefc.showRevocationMessage(),
      });
      return true;
    }
    // CMP Google milczy, dopoki AdSense nie zatwierdzi witryny. To normalny
    // stan, a nie blad, wiec nie robimy z tego komunikatu.
    return false;
  }

  function otworz() {
    otworzBanerZgody();
    otworzGoogle();
  }

  return (
    <div className={styles.zgodaBox}>
      <button type="button" onClick={otworz} className={`${styles.zgodaBtn} pc-cut`}>
        Zmień ustawienia zgody
      </button>
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
