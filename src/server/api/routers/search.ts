import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@blog/server/api/trpc';
import { searchContent } from '@blog/server/search';
import { getAllBlogMeta } from '@blog/server/blog/api';
import { loadBlog } from '@blog/converters';
import { getSlidePreviewHtmls } from '@blog/server/blog/slide-preview';

export const searchRouter = createTRPCRouter({
    query: publicProcedure
        .input(z.object({ q: z.string().min(1), limit: z.number().min(1).max(50).optional(), lang: z.enum(["en","fr"]).optional() }))
        .query(async ({ input }) => {
            const results = await searchContent(input.q, input.limit ?? 20);
            const lang = (input.lang ?? 'en').toLowerCase();
            const filtered = results.filter((r) => {
                // Only blog results matter for lang filtering; others are not returned anyway
                // We will re-check language at the cards endpoint; here keep all and let client decide if needed
                return true;
            });
            return filtered;
        }),
    tags: publicProcedure
        .query(async () => {
            const metas = await getAllBlogMeta();
            const all = new Set<string>();
            for (const m of metas) {
                for (const t of (m.tags ?? [])) {
                    const v = String(t).trim();
                    if (v) all.add(v);
                }
            }
            return Array.from(all).sort((a, b) => a.localeCompare(b));
        }),
    cards: publicProcedure
        .input(z.object({ q: z.string().min(1), limit: z.number().min(1).max(50).optional(), lang: z.enum(["en","fr"]).optional() }))
        .query(async ({ input }) => {
            const results = await searchContent(input.q, input.limit ?? 20);
            const blogResults = results.filter((r) => r.type === 'blog');
            const slugs = blogResults.map((r) => r.url.replace(/^\/?b\//, ''));

            const itemsRaw = await Promise.all(
                slugs.map(async (slug) => {
                    try {
                        const { course } = await loadBlog(slug);
                        const plain = course?.content
                            ?.replace(/<[^>]+>/g, ' ')
                            .replace(/\s+/g, ' ')
                            .trim();
                        const lang = typeof (course as any)?.lang === 'string' ? (course as any).lang : undefined;
                        const tagsRaw = (course as any)?.tags as unknown;
                        const tags = Array.isArray(tagsRaw)
                            ? tagsRaw.map((t) => String(t))
                            : typeof tagsRaw === 'string'
                                ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean)
                                : undefined;
                        const previews = await getSlidePreviewHtmls(slug);
                        return { slug, title: course?.title ?? slug, description: plain, lang, tags, previews };
                    } catch {
                        // Ignore missing or unreadable blogs (e.g., ENOENT)
                        return null;
                    }
                })
            );

            const desired = (input.lang ?? 'en').toLowerCase();
            const items = itemsRaw
                .filter((v): v is Exclude<typeof v, null> => v !== null)
                .filter((v) => {
                    if (desired === 'fr') return (v.lang ?? '').toLowerCase() === 'fr';
                    // default 'en': include english or missing lang
                    return (v.lang?.toLowerCase() ?? 'en') === 'en';
                });
            return items;
        }),
});

