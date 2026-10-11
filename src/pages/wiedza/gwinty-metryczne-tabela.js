// AUTO-WYGENEROWANE przez scripts/build-content-pages.mjs - nie edytuj ręcznie.
import React from 'react';
import WiedzaArticleTemplate from '@site/src/components/WiedzaArticleTemplate';
import data from '@site/content/wiedza/gwinty-metryczne-tabela.json';

export default function Page() {
  return (
    <WiedzaArticleTemplate
      title={data.title}
      seoTitle={data.seoTitle}
      description={data.description}
      seoDescription={data.seoDescription}
      date={data.date}
      dateModified={data.dateModified}
      permalink="/wiedza/gwinty-metryczne-tabela"
      linkedinUrl={data.linkedinUrl}
      blocks={data.blocks}
      faq={data.faq}
    />
  );
}
