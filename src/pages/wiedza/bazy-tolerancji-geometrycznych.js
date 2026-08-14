// AUTO-WYGENEROWANE przez scripts/build-content-pages.mjs - nie edytuj ręcznie.
import React from 'react';
import WiedzaArticleTemplate from '@site/src/components/WiedzaArticleTemplate';
import data from '@site/content/wiedza/bazy-tolerancji-geometrycznych.json';

export default function Page() {
  return (
    <WiedzaArticleTemplate
      title={data.title}
      seoTitle={data.seoTitle}
      description={data.description}
      date={data.date}
      permalink="/wiedza/bazy-tolerancji-geometrycznych"
      linkedinUrl={data.linkedinUrl}
      blocks={data.blocks}
      faq={data.faq}
    />
  );
}
