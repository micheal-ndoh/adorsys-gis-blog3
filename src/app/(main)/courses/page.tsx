// removed unused Link import
import { getAllBlogs } from "@blog/server/blog";
import { loadBlog } from "@blog/converters";
import { Container } from "@blog/components/container";
import { CourseCard } from "@blog/components/course";
import { Pagination } from "@blog/components/pagination";
import { getSlidePreviewHtmls } from "@blog/server/blog/slide-preview";
import { CoursesHeader } from "./CoursesHeader";

export const dynamic = "force-dynamic";

type Props = { searchParams?: Promise<{ lang?: string; page?: string }> };

export default async function CoursesPage({ searchParams }: Props) {
  const params = await searchParams;
  // Default to English; treat missing course lang as 'en'
  const selected = (params?.lang ?? "en").toLowerCase();
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

  const filtered = courses.filter((c) => {
    if (selected === "fr") return (c.lang ?? "").toLowerCase() === "fr";
    // Default 'en': include english or missing lang
    return (c.lang?.toLowerCase() ?? "en") === "en";
  });

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  function linkFor(targetPage: number) {
    const params = new URLSearchParams();
    // Only include 'lang' when not default 'en' to keep URLs clean
    if (selected !== "en") params.set("lang", selected);
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return qs ? `/courses?${qs}` : "/courses";
  }

  return (
    <div className="relative">
      {/* Background layer (exactly like homepage) */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><radialGradient id="bg" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="%230b1220"/><stop offset="100%" stop-color="%23010d18"/></radialGradient><linearGradient id="grid" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230ea5e9" stop-opacity="0.08"/><stop offset="100%" stop-color="%238b5cf6" stop-opacity="0.08"/></linearGradient><pattern id="hex" width="60" height="52" patternUnits="userSpaceOnUse"><path d="M30 0l30 26v26L30 78 0 52V26L30 0z" fill="none" stroke="%230ea5e9" stroke-width="1" opacity="0.18"/></pattern><pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="%230ea5e9" opacity="0.25"/></pattern></defs><rect width="1200" height="800" fill="url(%23bg)"/><rect width="1200" height="800" fill="url(%23grid)"/><rect width="1200" height="800" fill="url(%23hex)"/><rect width="1200" height="800" fill="url(%23dots)"/><circle cx="200" cy="150" r="100" fill="%230ea5e9" opacity="0.04"/><circle cx="1000" cy="600" r="150" fill="%238b5cf6" opacity="0.04"/><polygon points="300,400 400,300 500,400 400,500" fill="%2310b981" opacity="0.04"/><path d="M100 700 Q300 600 500 700 T900 700" stroke="%230ea5e9" stroke-width="2" fill="none" opacity="0.08"/><path d="M150 100 Q350 200 550 100 T950 100" stroke="%238b5cf6" stroke-width="2" fill="none" opacity="0.08"/></svg>')`,
          }}
        />
      </div>
      {/* Darkening overlay */}
      <div className="absolute inset-0 z-[1] bg-black/40" />

      {/* Foreground wrapper */}
      <div className="relative z-10 overflow-hidden">
        <Container>
          <div className="mb-6 space-y-4">
            <CoursesHeader total={total} />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
          {pageCount > 1 && (
            <div className="mt-8 sm:mt-10 flex items-center justify-center">
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
