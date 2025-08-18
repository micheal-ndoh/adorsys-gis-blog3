import * as fs from 'fs-extra';
import * as path from 'node:path';
import matter from 'gray-matter';

export interface SearchDocument {
    id: string;
    title: string;
    slug: string;
    url: string;
    type: 'blog' | 'res' | 'doc';
    content: string;
}

export interface SearchResultItem {
    id: string;
    title: string;
    url: string;
    type: SearchDocument['type'];
    snippet: string;
    score: number;
}

let cachedIndex: SearchDocument[] | null = null;

async function listMarkdownFiles(rootDir: string): Promise<string[]> {
    const files: string[] = [];
    async function walk(current: string) {
        const entries = await fs.readdir(current, { withFileTypes: true });
        for (const entry of entries) {
            const full = path.join(current, entry.name);
            if (entry.isDirectory()) {
                await walk(full);
            } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
                files.push(full);
            }
        }
    }
    await walk(rootDir);
    return files;
}

function stripMarkdown(markdown: string): string {
    // Remove code blocks
    let text = markdown.replace(/```[\s\S]*?```/g, ' ');
    // Remove inline code
    text = text.replace(/`[^`]*`/g, ' ');
    // Remove images ![alt](url)
    text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ');
    // Remove links [text](url)
    text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
    // Remove headings, emphasis, lists, blockquotes, tables markers
    text = text.replace(/^\s{0,3}#{1,6}\s+/gm, '');
    text = text.replace(/[>*_~`#|-]/g, ' ');
    // Collapse whitespace
    text = text.replace(/\s+/g, ' ').trim();
    return text;
}

async function buildIndex(): Promise<SearchDocument[]> {
    const docsRoot = path.join(process.cwd(), 'docs');
    const files = await listMarkdownFiles(docsRoot);

    const docs: SearchDocument[] = [];
    for (const absPath of files) {
        const rel = path.relative(docsRoot, absPath).replace(/\\/g, '/');
        const file = await fs.readFile(absPath, 'utf8');
        const parsed = matter(file);

        const contentPlain = stripMarkdown(parsed.content ?? '');

        const pathParts = rel.split('/');
        const isBlog = pathParts[0] === 'blog' && pathParts.length >= 3;
        const isRes = pathParts[0] === 'res' && pathParts.length === 2;

        let type: SearchDocument['type'];
        let url = '';
        let slug = '';

        if (isBlog) {
            type = 'blog';
            const blogSlug = pathParts[1]!;
            slug = blogSlug;
            url = `/b/${blogSlug}`;
        } else if (isRes) {
            type = 'res';
            const resSlug = pathParts[1]!.replace(/\.md$/i, '');
            slug = resSlug;
            url = `/res/${resSlug}`;
        } else {
            type = 'doc';
            slug = rel.replace(/\.md$/i, '');
            url = `/`;
        }

        const titleFromFrontMatter = (parsed.data as Record<string, unknown>)?.title;
        const title = typeof titleFromFrontMatter === 'string' && titleFromFrontMatter.trim().length > 0
            ? titleFromFrontMatter.trim()
            : slug;

        docs.push({
            id: rel,
            title,
            slug,
            url,
            type,
            content: contentPlain,
        });
    }

    // Deduplicate by id
    const unique = new Map<string, SearchDocument>();
    for (const d of docs) unique.set(d.id, d);
    return Array.from(unique.values());
}

export async function ensureIndex(): Promise<SearchDocument[]> {
    if (cachedIndex) return cachedIndex;
    cachedIndex = await buildIndex();
    return cachedIndex;
}

function scoreDocument(query: string, doc: SearchDocument): number {
    const q = query.toLowerCase();
    const words = q.split(/\s+/).filter(Boolean);
    if (words.length === 0) return 0;

    let score = 0;
    const titleLower = doc.title.toLowerCase();
    const contentLower = doc.content.toLowerCase();

    for (const w of words) {
        if (titleLower.includes(w)) score += 5;
        const titleMatches = titleLower.split(w).length - 1;
        score += titleMatches * 10; // strong boost for title frequency

        if (contentLower.includes(w)) score += 1;
        const contentMatches = contentLower.split(w).length - 1;
        score += contentMatches * 2;
    }

    // Slight boost by type if desired
    if (doc.type === 'blog') score += 1;

    return score;
}

function makeSnippet(content: string, query: string, size = 180): string {
    if (!content) return '';
    const lower = content.toLowerCase();
    const q = query.toLowerCase();
    const firstIdx = lower.indexOf(q);
    const idx = firstIdx >= 0 ? firstIdx : 0;
    const start = Math.max(0, idx - Math.floor(size / 2));
    const end = Math.min(content.length, start + size);
    const prefix = start > 0 ? '…' : '';
    const suffix = end < content.length ? '…' : '';
    return `${prefix}${content.slice(start, end).trim()}${suffix}`;
}

export async function searchContent(query: string, limit = 20): Promise<SearchResultItem[]> {
    const index = await ensureIndex();
    const scored = index
        .map((doc) => ({ doc, score: scoreDocument(query, doc) }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ doc, score }) => ({
            id: doc.id,
            title: doc.title,
            url: doc.url,
            type: doc.type,
            snippet: makeSnippet(doc.content, query),
            score,
        }));
    return scored;
}

