// AUTO-WYGENEROWANE przez scripts/build-content-pages.mjs - nie edytuj ręcznie.
import React from 'react';
import OdcinekTemplate from '@site/src/components/OdcinekTemplate';
import data from '@site/content/odcinki/ruchomy-model-robota-ilogic.json';

export default function Page() {
  return (
    <OdcinekTemplate
      videoId={data.videoId}
      title={data.title}
      seoTitle={data.seoTitle}
      description={data.description}
      permalink="/odcinki/ruchomy-model-robota-ilogic/"
      lead={data.lead}
      czasTrwania={data.czasTrwania}
      czegoSieDowiesz={data.czegoSieDowiesz}
      sekcje={data.sekcje}
      wnioski={data.wnioski}
      narzedzia={data.narzedzia}
      related={data.related}
    />
  );
}
