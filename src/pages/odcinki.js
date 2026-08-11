import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Okruszki from '@site/src/components/Okruszki';
import {SITE_URL, formatShortDatePl} from '@site/src/lib/site';
import {wymiaryMiniaturyYt} from '@site/src/lib/obrazy';
import styles from './odcinki.module.css';
import episodesData from '../data/episodes.json';
import redakcja from '@site/content/odcinki.json';
import stronyOdcinkow from '../data/odcinki-strony.json';

const YOUTUBE_URL = 'https://youtube.com/@pocaduchy';

// Listę filmów generuje scripts/fetch-episodes.mjs (prebuild/prestart) z feedu
// RSS kanału, bez ręcznego utrzymania. Shortsy i transmisje na żywo są już
// odfiltrowane na etapie pobierania. Opisy i podział na działy dokładamy
// z content/odcinki.json, dopasowując po identyfikatorze filmu.
const EPISODES = episodesData.episodes
  .filter((e) => !e.isShort)
  .map((e) => ({...e, ...(redakcja.odcinki?.[e.id] || {})}));

// Odcinki, ktore maja juz wlasna strone z opisem. Kafelek prowadzi wtedy tam,
// a nie prosto na YouTube: widz dostaje streszczenie i moze zdecydowac, czy
// chce ogladac, a wyszukiwarka dostaje tresc do zaindeksowania.
const STRONY = new Map((stronyOdcinkow || []).map((o) => [o.videoId, o]));

const DZIALY = redakcja.dzialy || [];
const DZIAL_DOMYSLNY = redakcja.dzialDomyslny || DZIALY[0]?.id;

// Grupujemy odcinki po działach, zachowując kolejność działów z pliku danych
// i chronologię wewnątrz każdego z nich. Działy bez odcinków znikają.
const GRUPY = DZIALY.map((d) => ({
  ...d,
  odcinki: EPISODES.filter((e) => (e.dzial || DZIAL_DOMYSLNY) === d.id),
})).filter((g) => g.odcinki.length > 0);

// Lista odcinków jako dane strukturalne. Każdy wpis to VideoObject z tytułem,
// miniaturą, datą publikacji i własnym opisem, wskazujący na YouTube.
const EPISODES_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/odcinki#lista`,
  name: 'Odcinki kanału poCADuchy',
  numberOfItems: EPISODES.length,
  itemListElement: EPISODES.map((ep, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'VideoObject',
      name: ep.title,
      thumbnailUrl: ep.thumbnail,
      uploadDate: ep.published,
      url: ep.url,
      embedUrl: `https://www.youtube.com/embed/${ep.id}`,
      description: ep.opis || ep.title,
      inLanguage: 'pl-PL',
      publisher: {'@id': `${SITE_URL}/#organizacja`},
    },
  })),
};

function Karta({ep}) {
  const strona = STRONY.get(ep.id);
  const wnetrze = (
    <>
      <div className={styles.thumb}>
        <img
          src={ep.thumbnail}
          alt={`Miniatura odcinka: ${ep.title}`}
          loading="lazy"
          {...wymiaryMiniaturyYt(ep.thumbnail)}
        />
        <div className={styles.playBadge}>
          <div className={styles.playIcon} />
        </div>
      </div>
      <div className={styles.meta}>
        <span className={styles.epDate}>{formatShortDatePl(ep.published)}</span>
        <span className={styles.epTitle}>{strona ? strona.title : ep.title}</span>
        {strona || ep.opis ? (
          <span className={styles.epOpis}>{strona ? strona.description : ep.opis}</span>
        ) : null}
        {strona ? <span className={styles.epWiecej}>Opis odcinka →</span> : null}
      </div>
    </>
  );

  if (strona) {
    return (
      <Link to={`/odcinki/${strona.slug}/`} className={`${styles.card} pc-cut-card`}>
        {wnetrze}
      </Link>
    );
  }

  return (
    <a
      href={ep.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} pc-cut-card`}>
      {wnetrze}
    </a>
  );
}

export default function Odcinki() {
  return (
    <Layout
      title="Odcinki poCADuchy: CAD, maszyny i druk 3D"
      description="Wszystkie odcinki kanału poCADuchy: automatyzacja pracy konstruktora, projektowanie maszyn, warsztat, druk 3D i zawód konstruktora.">
      <Head>
        <script type="application/ld+json">{JSON.stringify(EPISODES_JSON_LD)}</script>
      </Head>
      <div className={styles.wrap}>
        <Okruszki sciezka={[{nazwa: 'Odcinki', url: '/odcinki'}]} />

        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>Archiwum</span>
          </div>
          <h1 className={styles.title}>Wszystkie odcinki z kanału</h1>
          {redakcja.intro ? <p className={styles.lead}>{redakcja.intro}</p> : null}
        </div>

        {GRUPY.length > 0 ? (
          GRUPY.map((g) => (
            <section key={g.id} className={styles.dzial}>
              <h2 className={styles.dzialNazwa}>{g.nazwa}</h2>
              {g.opis ? <p className={styles.dzialOpis}>{g.opis}</p> : null}
              <div className={styles.grid}>
                {g.odcinki.map((ep) => (
                  <Karta key={ep.id} ep={ep} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className={`${styles.empty} pc-cut-card`}>
            <span className={styles.emptyLabel}>Odcinki wkrótce</span>
            <p className={styles.emptyBody}>
              Nie udało się pobrać listy odcinków, zajrzyj bezpośrednio na
              kanał.
            </p>
          </div>
        )}

        <div className={styles.footerCta}>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} pc-cut`}>
            Zobacz wszystkie odcinki na YouTube
          </a>
        </div>
      </div>
    </Layout>
  );
}
