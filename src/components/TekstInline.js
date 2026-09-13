import React from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Krotki tekst z pliku tresci renderowany wewnatrz istniejacego akapitu.
 *
 * Pliki tresci uzywaja w odpowiedziach i wstepach zapisu `Ra 0,8` oraz
 * **pogrubien**. Wstawione wprost do <p> pokazywaly czytelnikowi surowe
 * backticki i gwiazdki. Tu zamieniamy je na <code> i <strong>, bez
 * dokladania drugiego <p> w srodku akapitu.
 */
const BEZ_AKAPITU = {p: ({children}) => <>{children}</>};

export default function TekstInline({tekst = ''}) {
  return (
    <ReactMarkdown components={BEZ_AKAPITU} allowedElements={['p', 'code', 'strong', 'em', 'a']} unwrapDisallowed>
      {tekst}
    </ReactMarkdown>
  );
}

/** Ten sam tekst bez znacznikow, do danych strukturalnych i atrybutow. */
export function bezZnacznikow(tekst = '') {
  return String(tekst).replace(/`/g, '').replace(/\*\*/g, '');
}
