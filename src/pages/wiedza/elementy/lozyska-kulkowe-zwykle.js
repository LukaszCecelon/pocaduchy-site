// AUTO-WYGENEROWANE przez scripts/build-content-pages.mjs — nie edytuj ręcznie.
import React from 'react';
import WiedzaArticleTemplate from '@site/src/components/WiedzaArticleTemplate';
import data from '@site/content/wiedza/elementy/lozyska-kulkowe-zwykle.json';

export default function Page() {
  return (
    <WiedzaArticleTemplate
      title={data.title}
      description={data.description}
      categoryLabel="Elementy standardowe"
      categoryHref="/wiedza/elementy"
      blocks={data.blocks}
    />
  );
}
