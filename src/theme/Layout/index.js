import React from 'react';
import Layout from '@theme-original/Layout';

// Docusaurus owija tresc strony w zwykly <div>. Jeden <main> tutaj daje go
// wszystkim stronom naraz: czytniki ekranu, tryb czytania i narzedzia AI
// wiedza, gdzie zaczyna sie tresc, a gdzie nawigacja i stopka.
// Strona 404 ma wlasna tresc bez <main> (src/theme/NotFound/Content), zeby
// nie bylo dwoch zagniezdzonych.
export default function LayoutZMain({children, ...props}) {
  return (
    <Layout {...props}>
      <main>{children}</main>
    </Layout>
  );
}
