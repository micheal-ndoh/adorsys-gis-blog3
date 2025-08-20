'use client';

import './display.scss';

import { useEffect, useRef } from 'react';
import Reveal from 'reveal.js';
import RevealMermaid from 'reveal.js-mermaid-plugin';
import Highlight from 'reveal.js/plugin/highlight/highlight';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import Notes from 'reveal.js/plugin/notes/notes';
import RevealSearch from 'reveal.js/plugin/search/search';

const htmlContent = (data: string) => `
<section data-markdown>
  <textarea data-template>
    ${data}
  </textarea>
</section>
`;

export interface DisplayProps {
  data: string;
}

export default function Display({ data }: DisplayProps) {
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance

  useEffect(() => {
    // Prevents double initialization in strict mode
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current!, {
      plugins: [Notes, Highlight, RevealSearch, RevealMermaid, RevealMarkdown],
      controls: true,
      embedded: true,
    });
    //console.log(deckRef.current);

    deckRef.current
      .initialize()
      .then(() => {
        console.log('Deck initialized');
        // good place for event handlers and plugin setups
      })
      .catch(console.log);

    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn('Reveal.js destroy call failed.', e);
      }
    };
  }, []);
  
  return (
    <>
      <style jsx global>{`
        /* Force slide content to display properly */
        .reveal .slides section[data-markdown] {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: flex-start !important;
          text-align: center !important;
          width: 100% !important;
          max-width: 100% !important;
          column-count: 1 !important;
          column-gap: normal !important;
          column-fill: auto !important;
        }
        
        .reveal .slides section[data-markdown] h1,
        .reveal .slides section[data-markdown] h2,
        .reveal .slides section[data-markdown] h3,
        .reveal .slides section[data-markdown] h4,
        .reveal .slides section[data-markdown] h5,
        .reveal .slides section[data-markdown] h6 {
          flex: 0 0 auto !important;
          width: 100% !important;
          max-width: 100% !important;
          text-align: center !important;
          white-space: normal !important;
          word-spacing: normal !important;
          letter-spacing: normal !important;
          line-height: 1.4 !important;
          margin: 0.5rem 0 !important;
          padding: 0 !important;
          overflow-wrap: normal !important;
          word-break: normal !important;
          hyphens: none !important;
          column-span: all !important;
          break-inside: avoid !important;
          float: none !important;
          clear: both !important;
          display: block !important;
        }
        
        .reveal .slides section[data-markdown] h1 br,
        .reveal .slides section[data-markdown] h2 br,
        .reveal .slides section[data-markdown] h3 br,
        .reveal .slides section[data-markdown] h4 br,
        .reveal .slides section[data-markdown] h5 br,
        .reveal .slides section[data-markdown] h6 br {
          display: none !important;
        }
      `}</style>
      <div className='display'>
        <div className='reveal' ref={deckDivRef}>
          <div
            className='slides'
            dangerouslySetInnerHTML={{ __html: htmlContent(data) }}
          />
        </div>
      </div>
    </>
  );
}
