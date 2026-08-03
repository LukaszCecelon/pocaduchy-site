// AUTO-WYGENEROWANE przez scripts/build-content-pages.mjs — nie edytuj ręcznie.
import React from 'react';
import BlogArticleTemplate from '@site/src/components/BlogArticleTemplate';
import data from '@site/content/blog/projektowanie-wielobrylowe-czesc-1.json';

export default function Page() {
  return (
    <BlogArticleTemplate
      title={data.title}
      seoTitle={data.seoTitle}
      description={data.description}
      date={data.date}
      dateModified={data.dateModified}
      permalink="/blog/projektowanie-wielobrylowe-czesc-1"
      image={data.image}
      linkedinUrl={data.linkedinUrl}
      tags={data.tags}
      related={data.related}
      faq={data.faq}
      howTo={data.howTo}
      blocks={data.blocks}
    />
  );
}
