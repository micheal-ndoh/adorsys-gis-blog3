import * as fs from "fs-extra";
import * as path from "node:path";
import _ from "lodash";

async function* dir_api(dir: string) {
    for await (const d of await fs.promises.opendir(dir)) {
        if (d.isDirectory()) yield* [d.name];
    }
}

export async function getAllBlogs() {
    const fullPath = path.join(process.cwd(), 'docs', 'blog');
    const dirs = dir_api(fullPath);
    const list = [];
    for await (let d of dirs) {
        list.push(d);
    }
    return _.uniq(list);
}

export type BlogMeta = {
    slug: string;
    title?: string;
    description?: string;
    lang?: string;
};

/**
 * Loads only the frontmatter for each blog's course.md to avoid heavy markdown conversion.
 */
export async function getAllBlogMeta(): Promise<BlogMeta[]> {
    const slugs = await getAllBlogs();
    const results: BlogMeta[] = [];

    for (const blogSlug of slugs) {
        try {
            const filePath = path.join(process.cwd(), 'docs', 'blog', blogSlug, 'course.md');
            const file = await fs.readFile(filePath, 'utf8');
            // Lazy import to avoid adding a hard dependency at module load time
            const matter = (await import('gray-matter')).default;
            const parsed = matter(file);
            results.push({
                slug: blogSlug,
                title: parsed.data?.title,
                description: parsed.data?.description,
                lang: parsed.data?.lang,
            });
        } catch {
            results.push({ slug: blogSlug });
        }
    }

    return results;
}
