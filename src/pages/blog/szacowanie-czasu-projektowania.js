// AUTO-WYGENEROWANE przez scripts/build-content-pages.mjs — nie edytuj ręcznie.
import React from 'react';
import BlogArticleTemplate from '@site/src/components/BlogArticleTemplate';
import data from '@site/content/blog/szacowanie-czasu-projektowania.json';

export default function Page() {
  return (
    <BlogArticleTemplate
      title={data.title}
      description={data.description}
      date={data.date}
      permalink="/blog/szacowanie-czasu-projektowania"
      image={data.image}
      linkedinUrl={data.linkedinUrl}
      blocks={data.blocks}
    />
  );
}
