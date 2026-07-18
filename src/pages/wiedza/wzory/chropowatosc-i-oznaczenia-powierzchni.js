// AUTO-WYGENEROWANE przez scripts/build-content-pages.mjs — nie edytuj ręcznie.
import React from 'react';
import WiedzaArticleTemplate from '@site/src/components/WiedzaArticleTemplate';
import data from '@site/content/wiedza/wzory/chropowatosc-i-oznaczenia-powierzchni.json';

export default function Page() {
  return (
    <WiedzaArticleTemplate
      title={data.title}
      description={data.description}
      categoryLabel="Wzory i tabele"
      categoryHref="/wiedza/wzory"
      blocks={data.blocks}
    />
  );
}
