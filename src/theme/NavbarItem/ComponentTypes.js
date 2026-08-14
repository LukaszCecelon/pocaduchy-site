import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import MenuWiedzy from '@site/src/components/MenuWiedzy';

// Rejestracja wlasnego typu elementu paska nawigacji. Docusaurus umie tylko
// zwykle linki i proste rozwijane listy, a zakladka Wiedzy potrzebuje okienka
// z dzialami i tematami.
export default {
  ...ComponentTypes,
  'custom-menuWiedzy': MenuWiedzy,
};
