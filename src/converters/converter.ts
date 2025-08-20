import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGithub from 'remark-github';
import { unified } from 'unified';

import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';

import { twMerge } from 'tailwind-merge';
import { visit } from 'unist-util-visit';

type NodeType = Record<string, any> & {
  children: NodeType[];
  properties: Record<string, any>;
};

const rehypeHeadingToSpan = () => {
  return (tree: any) => {
    visit(tree, 'element', (node: Record<string, any>) => {
      if (node.tagName === 'h1') {
        node.children = [
          {
            type: 'element',
            tagName: 'span',
            properties: {},
            children: node.children,
          },
        ];
      }
    });
  };
};

const rehypePreCodeHighlight = () => {
  return (tree: any) => {
    visit(tree, 'element', (node: NodeType) => {
      if (node.tagName === 'pre') {
        for (const child of node.children) {
          if (child.tagName === 'code') {
            node.properties.className = twMerge(
                '!p-0 -mx-4 md:-mx-8 lg:-mx-12 !rounded-box',
                node.properties.className as string,
            );
            child.properties.className = twMerge(
                '!px-8 !py-4 md:!px-8 lg:!px-12',
                child.properties.className as string,
            );
          }
        }
      }
    });
  };
};

// Custom handler for mermaid diagrams
const rehypeMermaidCustom = () => {
  return (tree: any) => {
    visit(tree, 'element', (node: NodeType) => {
      if (node.tagName === 'pre') {
        for (const child of node.children) {
          if (
              child.tagName === 'code' &&
              (child.properties.className?.includes('language-mermaid') ||
               child.children?.[0]?.value?.includes('graph'))
          ) {
            // Add mermaid class to the code element
            child.properties.className = twMerge(
                'mermaid',
                child.properties.className as string,
            );
            // Make the pre element transparent
            node.properties.className = twMerge(
                'bg-transparent',
                node.properties.className as string,
            );
            // Add a data attribute to help identify mermaid blocks
            node.properties['data-mermaid'] = 'true';
            
            console.log('Processed Mermaid block:', child.children?.[0]?.value?.substring(0, 100));
          }
        }
      }
    });
  };
};

export const markdownToHtml = async (markdown: string) => {
  const mdProcessor = unified()
      .use(remarkParse)
      .use(remarkGithub)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeHeadingToSpan)
      .use(rehypeExternalLinks, { rel: ['nofollow'], target: '_blank' })
      .use(rehypeMermaidCustom) // Use custom mermaid handler
      .use(rehypeHighlight)
      .use(rehypePreCodeHighlight)
      .use(rehypeStringify);

  const result = await mdProcessor.process(markdown);
  return result.toString('utf-8');
};
