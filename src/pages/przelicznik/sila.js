import React from 'react';
import PrzelicznikWymiarTemplate from '@site/src/components/PrzelicznikWymiarTemplate';
import tresc from '@site/content/przelicznik/sila.json';

export default function Strona() {
  return <PrzelicznikWymiarTemplate tresc={tresc} />;
}
