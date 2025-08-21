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
        // Force apply our CSS after Reveal.js initializes
        setTimeout(() => {
          const slides = document.querySelectorAll('.reveal .slides section[data-markdown] h1, .reveal .slides section[data-markdown] h2, .reveal .slides section[data-markdown] h3');
          slides.forEach(slide => {
            if (slide instanceof HTMLElement) {
              slide.style.wordSpacing = 'normal';
              slide.style.letterSpacing = 'normal';
              slide.style.whiteSpace = 'normal';
              slide.style.textAlign = 'center';
              slide.style.display = 'block';
              slide.style.width = '100%';
              slide.style.maxWidth = '100%';
              slide.style.lineHeight = '1.4';
              slide.style.margin = '0.5rem 0';
              slide.style.padding = '0';
              slide.style.overflowWrap = 'normal';
              slide.style.wordBreak = 'normal';
              slide.style.hyphens = 'none';
              slide.style.columnSpan = 'all';
              slide.style.breakInside = 'avoid';
              slide.style.float = 'none';
              slide.style.clear = 'both';
            }
          });
          
          // Also fix prose content titles (general blog content)
          const proseTitles = document.querySelectorAll('.prose h1, .prose.prose-neutral h1, .prose.prose-invert h1, article.prose h1, article.prose.prose-neutral h1, article.prose.prose-neutral.lg\\:prose-xl h1');
          proseTitles.forEach(title => {
            if (title instanceof HTMLElement) {
              title.style.wordSpacing = 'normal';
              title.style.letterSpacing = 'normal';
              title.style.whiteSpace = 'normal';
              title.style.textAlign = 'center';
              title.style.display = 'block';
              title.style.width = '100%';
              title.style.maxWidth = '100%';
              title.style.lineHeight = '1.4';
              title.style.margin = '1rem 0';
              title.style.padding = '0';
              title.style.overflowWrap = 'normal';
              title.style.wordBreak = 'normal';
              title.style.hyphens = 'none';
              title.style.columnSpan = 'all';
              title.style.breakInside = 'avoid';
              title.style.float = 'none';
              title.style.clear = 'both';
            }
          });
        }, 100);
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

  // Additional useEffect to fix prose content immediately when component mounts
  useEffect(() => {
    const fixProseContent = () => {
      const proseTitles = document.querySelectorAll('.prose h1, .prose.prose-neutral h1, .prose.prose-invert h1, article.prose h1, article.prose.prose-neutral h1, article.prose.prose-neutral.lg\\:prose-xl h1');
      proseTitles.forEach(title => {
        if (title instanceof HTMLElement) {
          title.style.wordSpacing = 'normal';
          title.style.letterSpacing = 'normal';
          title.style.whiteSpace = 'normal';
          title.style.textAlign = 'center';
          title.style.display = 'block';
          title.style.width = '100%';
          title.style.maxWidth = '100%';
          title.style.lineHeight = '1.4';
          title.style.margin = '1rem 0';
          title.style.padding = '0';
          title.style.overflowWrap = 'normal';
          title.style.wordBreak = 'normal';
          title.style.hyphens = 'none';
          title.style.columnSpan = 'all';
          title.style.breakInside = 'avoid';
          title.style.float = 'none';
          title.style.clear = 'both';
        }
      });
    };

    // Fix immediately and also after a short delay
    fixProseContent();
    setTimeout(fixProseContent, 50);
    setTimeout(fixProseContent, 200);
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
        
        /* Ultra-aggressive word spacing fixes */
        .reveal .slides section[data-markdown] *,
        .reveal .slides section[data-markdown] h1 *,
        .reveal .slides section[data-markdown] h2 *,
        .reveal .slides section[data-markdown] h3 *,
        .reveal .slides section[data-markdown] h4 *,
        .reveal .slides section[data-markdown] h5 *,
        .reveal .slides section[data-markdown] h6 * {
          word-spacing: normal !important;
          letter-spacing: normal !important;
          white-space: normal !important;
          text-align: inherit !important;
          display: inline !important;
          float: none !important;
          clear: none !important;
          margin: 0 !important;
          padding: 0 !important;
          text-indent: 0 !important;
        }
        
        /* Maximum specificity overrides */
        html body .reveal .slides section[data-markdown] h1,
        html body .reveal .slides section[data-markdown] h2,
        html body .reveal .slides section[data-markdown] h3,
        html body .reveal .slides section[data-markdown] h4,
        html body .reveal .slides section[data-markdown] h5,
        html body .reveal .slides section[data-markdown] h6 {
          word-spacing: normal !important;
          letter-spacing: normal !important;
          white-space: normal !important;
          text-align: center !important;
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
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
        }
        
        html body .reveal .slides section[data-markdown] h1 *,
        html body .reveal .slides section[data-markdown] h2 *,
        html body .reveal .slides section[data-markdown] h3 *,
        html body .reveal .slides section[data-markdown] h4 *,
        html body .reveal .slides section[data-markdown] h5 *,
        html body .reveal .slides section[data-markdown] h6 * {
          word-spacing: normal !important;
          letter-spacing: normal !important;
          white-space: normal !important;
          display: inline !important;
          margin: 0 !important;
          padding: 0 !important;
          text-indent: 0 !important;
          float: none !important;
          clear: none !important;
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
