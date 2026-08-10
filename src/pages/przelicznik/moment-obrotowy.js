import React from 'react';
import PrzelicznikWymiarTemplate from '@site/src/components/PrzelicznikWymiarTemplate';
import tresc from '@site/content/przelicznik/moment.json';

export default function Strona() {
  return <PrzelicznikWymiarTemplate tresc={tresc} />;
}
