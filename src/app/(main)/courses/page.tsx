import Link from "next/link";
import { getAllBlogs } from "@blog/server/blog";
import { loadBlog } from "@blog/converters";
import { Container } from "@blog/components/container";
import { CourseCard } from "@blog/components/course";
import { Pagination } from "@blog/components/pagination";
import { getSlidePreviewHtmls } from "@blog/server/blog/slide-preview";

export const dynamic = "force-dynamic";

type Props = { searchParams?: Promise<{ lang?: string; page?: string }> };

export default async function CoursesPage({ searchParams }: Props) {
  const params = await searchParams;
  const selected = (params?.lang ?? "all").toLowerCase();
  const pageParam =
    typeof params?.page === "string" ? parseInt(params.page, 10) : 1;
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const perPage = 6;

  const slugs = await getAllBlogs();
  const courses = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const { course } = await loadBlog(slug);
        const plain = course?.content
          ?.replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        const lang =
          typeof (course as any)?.lang === "string"
            ? (course as any).lang
            : undefined;
        const previews = await getSlidePreviewHtmls(slug);
        return {
          slug,
          title: course?.title ?? slug,
          description: plain,
          lang,
          previews,
        };
      } catch {
        return {
          slug,
          title: slug,
          description: undefined,
          lang: undefined,
          previews: {},
        };
      }
    })
  );

  const filtered = courses.filter(({ lang }) => {
    const matchesLang =
      selected === "all" || (lang ?? "en").toLowerCase() === selected;
    return matchesLang;
  });

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  function linkFor(targetPage: number) {
    const params = new URLSearchParams();
    if (selected !== "all") params.set("lang", selected);
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return qs ? `/courses?${qs}` : "/courses";
  }

  return (
    <div className="relative">
      {/* Background layer (dark, transparent, theme-aware, more visible) */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-100 brightness-110 saturate-125"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 800\"><defs><radialGradient id=\"bg\" cx=\"0.5\" cy=\"0.5\" r=\"0.65\"><stop offset=\"0%\" stop-color=\"%23020914\"/><stop offset=\"100%\" stop-color=\"%2301040a\"/></radialGradient><linearGradient id=\"grid\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"%230ea5e9\" stop-opacity=\"0.07\"/><stop offset=\"100%\" stop-color=\"%238b5cf6\" stop-opacity=\"0.07\"/></linearGradient><pattern id=\"hex\" width=\"60\" height=\"52\" patternUnits=\"userSpaceOnUse\"><path d=\"M30 0l30 26v26L30 78 0 52V26L30 0z\" fill=\"none\" stroke=\"%230ea5e9\" stroke-width=\"1\" opacity=\"0.12\"/></pattern><pattern id=\"dots\" width=\"40\" height=\"40\" patternUnits=\"userSpaceOnUse\"><circle cx=\"20\" cy=\"20\" r=\"1\" fill=\"%238b5cf6\" opacity=\"0.18\"/></pattern></defs><rect width=\"1200\" height=\"800\" fill=\"url(%23bg)\"/><rect width=\"1200\" height=\"800\" fill=\"url(%23grid)\"/><rect width=\"1200\" height=\"800\" fill=\"url(%23hex)\"/><rect width=\"1200\" height=\"800\" fill=\"url(%23dots)\"/><circle cx=\"220\" cy=\"180\" r=\"110\" fill=\"%230ea5e9\" opacity=\"0.04\"/><circle cx=\"980\" cy=\"620\" r=\"160\" fill=\"%238b5cf6\" opacity=\"0.04\"/><polygon points=\"320,420 420,320 520,420 420,520\" fill=\"%2310b981\" opacity=\"0.035\"/><path d=\"M110 700 Q310 610 510 700 T910 700\" stroke=\"%230ea5e9\" stroke-width=\"2\" fill=\"none\" opacity=\"0.07\"/><path d=\"M160 120 Q360 210 560 120 T960 120\" stroke=\"%238b5cf6\" stroke-width=\"2\" fill=\"none\" opacity=\"0.07\"/></svg>')`,
          }}
        />
        {/* Dark transparent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60 pointer-events-none" />
        {/* Soft theme-colored glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <Container>
          <div className="mb-10 space-y-6">
            {/* Centered page heading and meta */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Courses</span>
              </h1>
              <div className="mx-auto mt-3 h-1.5 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
              <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg opacity-80">
                Build job‑ready skills with curated, practical courses across modern technologies.
              </p>
              <div className="mt-4">
                <span className="badge badge-primary badge-lg">{total} courses available</span>
              </div>
            </div>

            {/* Language segmented control */}
            <div className="mt-2 flex items-center justify-center gap-3">
              <span className="text-sm opacity-80">Language</span>
              <div className="rounded-full border border-white/10 bg-base-200/60 p-1 shadow-lg shadow-black/10">
                <div className="join">
                  <Link
                    className={`btn btn-sm join-item rounded-full px-5 ${
                      selected === "all" ? "btn-primary" : "btn-ghost"
                    }`}
                    href={"/courses"}
                    aria-label="Show all languages"
                  >
                    <span className="mr-2">🌐</span>
                    All
                  </Link>
                  <Link
                    className={`btn btn-sm join-item rounded-full px-5 ${
                      selected === "en" ? "btn-primary" : "btn-ghost"
                    }`}
                    href={"/courses?lang=en"}
                    aria-label="Show English courses"
                  >
                    <span className="mr-2">🇬🇧</span>
                    EN
                  </Link>
                  <Link
                    className={`btn btn-sm join-item rounded-full px-5 ${
                      selected === "fr" ? "btn-primary" : "btn-ghost"
                    }`}
                    href={"/courses?lang=fr"}
                    aria-label="Show French courses"
                  >
                    <span className="mr-2">🇫🇷</span>
                    FR
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map(({ slug, title, description, lang, previews }) => (
              <CourseCard
                key={slug}
                slug={slug}
                title={title}
                description={description}
                lang={lang}
                slide1Html={(previews as any)?.firstHtml}
                slide2Html={(previews as any)?.secondHtml}
              />
            ))}
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="mt-10 flex items-center justify-center">
              <Pagination
                currentPage={current}
                totalPages={pageCount}
                baseUrl={"/courses"}
                maxVisiblePages={5}
              />
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
