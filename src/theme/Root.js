import React from 'react';
import BanerZgody from '@site/src/components/BanerZgody';

// Root opakowuje kazda strone serwisu. To jedyne miejsce, z ktorego baner
// zgody trafia na wszystkie podstrony bez dopisywania go w kazdej z osobna.
export default function Root({children}) {
  return (
    <>
      {children}
      <BanerZgody />
    </>
  );
}
