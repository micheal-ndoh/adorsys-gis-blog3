import { loadSlideMd, markdownToHtml } from '@blog/converters';

function splitSlides(markdown: string): string[] {
	const trimmed = (markdown ?? '').trim();
	if (trimmed.length === 0) return [];

	// Prefer Reveal.js default horizontal separator '---' on its own line
	let parts = trimmed.split(/\r?\n---\r?\n/g);
	if (parts.length > 1) {
		return parts.map((p) => p.trim()).filter((p) => p.length > 0);
	}

	// Fallback: split by heading starts (#, ##, ###) as slide boundaries
	const lines = trimmed.split(/\r?\n/);
	const blocks: string[] = [];
	let current: string[] = [];
	for (const line of lines) {
		if (/^#{1,6}\s+/.test(line) && current.length > 0) {
			blocks.push(current.join('\n').trim());
			current = [line];
		} else {
			current.push(line);
		}
	}
	if (current.length > 0) blocks.push(current.join('\n').trim());
	return blocks.filter((b) => b.length > 0);
}

export async function getSlidePreviewHtmls(blogSlug: string): Promise<{ firstHtml?: string; secondHtml?: string }> {
	try {
		const slides = await loadSlideMd('blog', blogSlug, 'slides');
		const parts = splitSlides(slides.content ?? '');
		const [first, second] = parts;
		const [firstHtml, secondHtml] = await Promise.all([
			first ? markdownToHtml(first) : Promise.resolve(undefined),
			second ? markdownToHtml(second) : Promise.resolve(undefined),
		]);
		return { firstHtml, secondHtml };
	} catch {
		return {};
	}
} 