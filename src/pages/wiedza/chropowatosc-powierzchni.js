// AUTO-WYGENEROWANE przez scripts/build-content-pages.mjs - nie edytuj ręcznie.
import React from 'react';
import WiedzaArticleTemplate from '@site/src/components/WiedzaArticleTemplate';
import data from '@site/content/wiedza/chropowatosc-powierzchni.json';

export default function Page() {
  return (
    <WiedzaArticleTemplate
      title={data.title}
      seoTitle={data.seoTitle}
      description={data.description}
      date={data.date}
      permalink="/wiedza/chropowatosc-powierzchni"
      linkedinUrl={data.linkedinUrl}
      blocks={data.blocks}
      faq={data.faq}
    />
  );
}
