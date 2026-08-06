import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import ReactMarkdown from 'react-markdown';
import Okruszki from '@site/src/components/Okruszki';
import KalkulatorPasowan from '@site/src/components/KalkulatorPasowan';
import {SITE_URL} from '@site/src/lib/site';
import tresc from '@site/content/wiedza-pasowania.json';
import styles from './pasowania.module.css';

const SCIEZKA = '/narzedzia/pasowania';

// Odpowiedz do danych strukturalnych bierzemy po TYTULE sekcji, a nie po jej
// numerze. Sekcje sa trescia edytowalna w pliku JSON, wiec usuniecie albo
// przestawienie jednej z nich nie moze wywracac strony.
function opisZasadyStalegoOtworu() {
  const sekcja = tresc.sekcje.find((s) => s.tytul === 'Dwie zasady doboru');
  const akapit = sekcja && sekcja.akapity && sekcja.akapity[0];
  return akapit
    ? akapit.replace(/\*\*/g, '')
    : 'Otwór ma zawsze pole H, czyli odchyłkę dolną równą zeru, a pasowanie dobiera się odchyłkami wałka.';
}

// Dane strukturalne. Kalkulator sam w sobie jest dla wyszukiwarki niewidoczny,
// bo tresc powstaje po interakcji, wiec opisujemy strone jako artykul
// z pytaniami, a nie jako aplikacje.
function daneStrukturalne() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${SITE_URL}${SCIEZKA}#artykul`,
        headline: tresc.meta.tytul,
        description: tresc.meta.opis,
        inLanguage: 'pl-PL',
        author: {'@id': `${SITE_URL}/#lukasz`},
        publisher: {'@id': `${SITE_URL}/#organizacja`},
        isPartOf: {'@id': `${SITE_URL}/#strona`},
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}${SCIEZKA}#pytania`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Czym różni się pasowanie luźne od ciasnego?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${tresc.rodzaje.luzne.opis} ${tresc.rodzaje.ciasne.opis}`,
            },
          },
          {
            '@type': 'Question',
            name: 'Co oznacza pasowanie H7/g6?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'H7 to pole tolerancji otworu, g6 pole tolerancji wałka. Wielka litera dotyczy otworu, mała wałka. Litera określa położenie pola tolerancji względem wymiaru nominalnego, a cyfra klasę dokładności IT. H7/g6 jest pasowaniem luźnym stosowanym w łożyskach ślizgowych korbowodów.',
            },
          },
          {
            '@type': 'Question',
            name: 'Na czym polega zasada stałego otworu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: opisZasadyStalegoOtworu(),
            },
          },
        ],
      },
    ],
  };
}

export default function Pasowania() {
  return (
    <Layout title={tresc.meta.tytul} description={tresc.meta.opis}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(daneStrukturalne())}</script>
      </Head>

      <div className={styles.wrap}>
        <Okruszki
          sciezka={[
            {nazwa: 'Narzędzia', url: '/narzedzia'},
            {nazwa: 'Pasowania', url: SCIEZKA},
          ]}
        />

        <header className={styles.hero}>
          <h1 className={styles.title}>{tresc.naglowek}</h1>
          <p className={styles.lead}>{tresc.lead}</p>
        </header>

        <KalkulatorPasowan />

        {/* Warstwa tresci dla czytelnika i dla wyszukiwarki. Sam formularz
            nie wypozycjonuje sie na nic, bo jego zawartosc powstaje dopiero
            po klikniecu. */}
        {tresc.sekcje.map((s) => (
          <section key={s.tytul} className={styles.sekcja}>
            <h2 className={styles.h2}>{s.tytul}</h2>
            {s.akapity.map((a) => (
              <div key={a.slice(0, 30)} className={styles.tekst}>
                <ReactMarkdown>{a}</ReactMarkdown>
              </div>
            ))}
          </section>
        ))}

        <section className={styles.sekcja}>
          <h2 className={styles.h2}>Popularne pasowania i ich zastosowania</h2>
          <p className={styles.tekstProsty}>
            Uporządkowane od najciaśniejszych do najluźniejszych. Kliknij pasowanie, żeby
            policzyć je dla swojej średnicy.
          </p>
          <div className={styles.tabelaWrap}>
            <table className={styles.tabelaZastosowan}>
              <thead>
                <tr>
                  <th>Pasowania</th>
                  <th>Gdzie się stosuje</th>
                </tr>
              </thead>
              <tbody>
                {tresc.zastosowania.map((z) => (
                  <tr key={z.pasowania.join()}>
                    <td className={styles.komorkaPasowan}>
                      {z.pasowania.map((p) => (
                        <code key={p} className={styles.kodPasowania}>{p}</code>
                      ))}
                    </td>
                    <td>{z.opis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.sekcja}>
          <h2 className={styles.h2}>Zobacz też</h2>
          <p className={styles.tekstProsty}>
            <Link to="/blog/polaczenie-wal-piasta">Połączenia wał-piasta: przegląd rozwiązań</Link>
            {' '}oraz{' '}
            <Link to="/blog/weryfikacja-cad-przed-produkcja">weryfikacja CAD przed produkcją</Link>.
          </p>
        </section>
      </div>
    </Layout>
  );
}
