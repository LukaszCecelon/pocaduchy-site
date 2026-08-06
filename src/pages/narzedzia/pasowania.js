import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import ReactMarkdown from 'react-markdown';
import Okruszki from '@site/src/components/Okruszki';
import KalkulatorPasowan from '@site/src/components/KalkulatorPasowan';
import {absolutePageUrl, SITE_URL} from '@site/src/lib/site';
import tresc from '@site/content/wiedza-pasowania.json';
import styles from './pasowania.module.css';

const SCIEZKA = '/narzedzia/pasowania';
const PAGE_URL = absolutePageUrl(SCIEZKA);

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

function odpowiedzFaq(pytanie) {
  if (pytanie.odpowiedz) return pytanie.odpowiedz;

  const sekcja = tresc.sekcje.find((s) => s.tytul === pytanie.odpowiedzSekcja);
  const akapit = sekcja && sekcja.akapity && sekcja.akapity[pytanie.odpowiedzAkapit || 0];
  return akapit ? akapit.replace(/\*\*/g, '') : opisZasadyStalegoOtworu();
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
        '@id': `${PAGE_URL}#artykul`,
        headline: tresc.meta.tytul,
        description: tresc.meta.opis,
        inLanguage: 'pl-PL',
        author: {'@id': `${SITE_URL}/#lukasz`},
        publisher: {'@id': `${SITE_URL}/#organizacja`},
        isPartOf: {'@id': `${SITE_URL}/#strona`},
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#pytania`,
        mainEntity: tresc.faq.map((pytanie) => ({
          '@type': 'Question',
          name: pytanie.pytanie,
          acceptedAnswer: {
            '@type': 'Answer',
            text: odpowiedzFaq(pytanie),
          },
        })),
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
          <h2 className={styles.h2}>{tresc.tabelaZastosowan.tytul}</h2>
          <p className={styles.tekstProsty}>{tresc.tabelaZastosowan.opis}</p>
          <div className={styles.tabelaWrap}>
            <table className={styles.tabelaZastosowan}>
              <thead>
                <tr>
                  <th>{tresc.tabelaZastosowan.naglowekPasowania}</th>
                  <th>{tresc.tabelaZastosowan.naglowekZastosowanie}</th>
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
          <h2 className={styles.h2}>{tresc.zobaczTez.tytul}</h2>
          <p className={styles.tekstProsty}>
            {tresc.zobaczTez.linki.map((link, i) => (
              <React.Fragment key={link.url}>
                {i === 0 ? null : ` ${tresc.zobaczTez.spojnik} `}
                <Link to={link.url}>{link.tekst}</Link>
              </React.Fragment>
            ))}
            .
          </p>
        </section>
      </div>
    </Layout>
  );
}
