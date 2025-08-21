// Generate a mapping of blog slug -> created date (ISO string)
// Priority: course.md frontmatter date -> first git commit date -> file birthtime/mtime
import fs from 'fs-extra';
import path from 'node:path';
import matter from 'gray-matter';
import { execSync } from 'node:child_process';

/**
 * @param {string} docsBlogDir
 * @returns {Promise<string[]>}
 */
async function getAllBlogSlugs(docsBlogDir) {
    const entries = await fs.readdir(docsBlogDir, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

/**
 * @param {string} filePath
 * @returns {string|undefined}
 */
function getGitCreatedIso(filePath) {
    try {
        // %aI = author date, strict ISO 8601
        const cmd = `git log --diff-filter=A --follow --format=%aI -1 -- ${JSON.stringify(filePath).slice(1, -1)}`;
        const out = execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
        if (out) return out;
    } catch { }
    return undefined;
}

async function main() {
    const repoRoot = process.cwd();
    const docsBlogDir = path.join(repoRoot, 'docs', 'blog');
    const outFile = path.join(repoRoot, 'src', 'server', 'blog', 'created-dates.json');

    /** @type {Record<string,string>} */
    const mapping = {};
    if (!(await fs.pathExists(docsBlogDir))) {
        await fs.outputJson(outFile, mapping, { spaces: 2 });
        return;
    }

    const slugs = await getAllBlogSlugs(docsBlogDir);
    for (const slug of slugs) {
        try {
            const coursePath = path.join(docsBlogDir, slug, 'course.md');
            if (!(await fs.pathExists(coursePath))) continue;
            const raw = await fs.readFile(coursePath, 'utf8');
            const parsed = matter(raw);
            const fmDate = typeof parsed.data?.date === 'string' ? parsed.data.date.trim() : '';
            if (fmDate) {
                mapping[slug] = fmDate;
                continue;
            }

            const gitIso = getGitCreatedIso(coursePath);
            if (gitIso) {
                mapping[slug] = gitIso;
                continue;
            }

            const stat = await fs.stat(coursePath).catch(() => undefined);
            const fallbackDate = stat?.birthtime && stat.birthtime.getTime() > 0
                ? stat.birthtime.toISOString()
                : stat?.mtime?.toISOString();
            if (fallbackDate) mapping[slug] = fallbackDate;
        } catch {
            // best-effort; ignore and continue
        }
    }

    await fs.outputJson(outFile, mapping, { spaces: 2 });
}

main().catch(async () => {
    // Ensure file exists even on failure
    try {
        const outFile = path.join(process.cwd(), 'src', 'server', 'blog', 'created-dates.json');
        await fs.outputJson(outFile, {}, { spaces: 2 });
    } catch { }
    process.exit(0);
});

