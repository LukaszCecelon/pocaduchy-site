// AUTO-WYGENEROWANE przez scripts/build-content-pages.mjs — nie edytuj ręcznie.
import React from 'react';
import WiedzaArticleTemplate from '@site/src/components/WiedzaArticleTemplate';
import data from '@site/content/wiedza/pozycjonowanie-czesci-w-maszynie.json';

export default function Page() {
  return (
    <WiedzaArticleTemplate
      title={data.title}
      description={data.description}
      date={data.date}
      permalink="/wiedza/pozycjonowanie-czesci-w-maszynie"
      linkedinUrl={data.linkedinUrl}
      blocks={data.blocks}
    />
  );
}
