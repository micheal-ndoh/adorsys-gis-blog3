'use client';

import { useEffect } from 'react';

export default function ProseFixer() {
  useEffect(() => {
    const fixProseContent = () => {
      // Target all possible prose content selectors
      const selectors = [
        '.prose h1',
        '.prose.prose-neutral h1',
        '.prose.prose-invert h1',
        'article.prose h1',
        'article.prose.prose-neutral h1',
        'article.prose.prose-neutral.lg\\:prose-xl h1',
        '.prose.prose-neutral.lg\\:prose-xl.mx-auto.mt-8.text-justify.px-8 h1'
      ];
      
      const proseTitles = document.querySelectorAll(selectors.join(', '));
      
      proseTitles.forEach(title => {
        if (title instanceof HTMLElement) {
          console.log('Fixing prose title:', title.textContent);
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

    // Run immediately and with delays to ensure it catches all content
    fixProseContent();
    setTimeout(fixProseContent, 50);
    setTimeout(fixProseContent, 100);
    setTimeout(fixProseContent, 200);
    setTimeout(fixProseContent, 500);
    setTimeout(fixProseContent, 1000);

    // Also run when the DOM changes
    const observer = new MutationObserver(fixProseContent);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
