// AUTO-WYGENEROWANE przez scripts/build-content-pages.mjs — nie edytuj ręcznie.
import React from 'react';
import WiedzaArticleTemplate from '@site/src/components/WiedzaArticleTemplate';
import data from '@site/content/wiedza/materialy/stal-konstrukcyjna-s235.json';

export default function Page() {
  return (
    <WiedzaArticleTemplate
      title={data.title}
      description={data.description}
      categoryLabel="Materiały konstrukcyjne"
      categoryHref="/wiedza/materialy"
      blocks={data.blocks}
    />
  );
}
