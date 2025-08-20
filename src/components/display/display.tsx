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
        .reveal .slides section ul,
        .reveal .slides section ol {
          text-align: justify !important;
          list-style-position: inside !important;
          display: inline-block !important;
          margin: 0 2rem !important;
          padding: 0 !important;
          word-spacing: normal !important;
          letter-spacing: normal !important;
        }
        
        .reveal .slides section li {
          text-align: justify !important;
          margin: 0 !important;
          padding: 0 !important;
          text-indent: 0 !important;
          word-spacing: normal !important;
          letter-spacing: normal !important;
        }
        
        .reveal .slides section ul li::marker,
        .reveal .slides section ol li::marker {
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* Force justify all text content in slides */
        .reveal .slides section,
        .reveal .slides section * {
          text-align: justify !important;
          word-spacing: normal !important;
          letter-spacing: normal !important;
          white-space: normal !important;
          font-kerning: normal !important;
          font-feature-settings: "kern" 1 !important;
          text-rendering: optimizeLegibility !important;
        }
        
        /* Specific targeting for headings and paragraphs */
        .reveal .slides section h1,
        .reveal .slides section h2,
        .reveal .slides section h3,
        .reveal .slides section h4,
        .reveal .slides section h5,
        .reveal .slides section h6,
        .reveal .slides section p,
        .reveal .slides section div,
        .reveal .slides section span {
          text-align: justify !important;
          word-spacing: normal !important;
          letter-spacing: normal !important;
          white-space: normal !important;
        }
        
        /* Nuclear option - override everything */
        .reveal,
        .reveal *,
        .reveal .slides,
        .reveal .slides *,
        .reveal .slides section,
        .reveal .slides section *,
        .reveal .slides section * *,
        .reveal .slides section * * * {
          word-spacing: normal !important;
          letter-spacing: normal !important;
          text-align: justify !important;
          text-justify: inter-word !important;
          white-space: normal !important;
          font-kerning: normal !important;
          font-feature-settings: "kern" 1 !important;
          text-rendering: optimizeLegibility !important;
          -webkit-font-feature-settings: "kern" 1 !important;
          -moz-font-feature-settings: "kern" 1 !important;
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
