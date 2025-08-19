export const dynamic = 'force-dynamic';

function absolutizeHtml(html: string, origin: string) {
	// Rewrite src and href attributes starting with / to absolute URLs
	return html
		.replace(/(src|href)="\/(?!\/)/g, `$1="${origin}/`);
}

function absolutizeCss(css: string, origin: string) {
	// Rewrite url(/...) to absolute
	return css.replace(/url\((['"]?)(\/[^)'"]+)\1\)/g, (_m, q, path) => `url(${q}${origin}${path}${q})`);
}

async function fetchExternal(): Promise<{ bodyHtml: string; css: string }> {
	const origin = 'http://localhost:3000';
	const res = await fetch(origin, { cache: 'no-store' });
	const html = await res.text();

	// Extract CSS link hrefs
	const cssHrefs = Array.from(html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["'][^>]*>/gi))
		.map((m) => m[1])
		.filter((v): v is string => typeof v === 'string' && v.length > 0);
	const absCssHrefs = cssHrefs.map((href) => href.startsWith('http') ? href : `${origin}${href.startsWith('/') ? '' : '/'}${href}`);
	const cssContents = await Promise.allSettled(absCssHrefs.map(async (u) => (await fetch(u, { cache: 'no-store' })).text()));
	const joinedCss = cssContents.map((r) => r.status === 'fulfilled' ? r.value : '').join('\n');
	const absCss = absolutizeCss(joinedCss, origin);

	// Extract body content
	const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
	const bodyHtmlRaw = bodyMatch?.[1] ?? html;
	const bodyHtml = absolutizeHtml(bodyHtmlRaw, origin);
	return { bodyHtml, css: absCss };
}

export default async function MirrorPage() {
	const { bodyHtml, css } = await fetchExternal();
	return (
		<div className='relative z-10 ml-0 md:ml-24'>
			<style dangerouslySetInnerHTML={{ __html: css }} />
			<div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
		</div>
	);
} 