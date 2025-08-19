import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@blog/server/api/trpc';
import { searchContent } from '@blog/server/search';

export const searchRouter = createTRPCRouter({
    query: publicProcedure
        .input(z.object({ q: z.string().min(1), limit: z.number().min(1).max(50).optional() }))
        .query(async ({ input }) => {
            const results = await searchContent(input.q, input.limit ?? 20);
            return results;
        }),
});

