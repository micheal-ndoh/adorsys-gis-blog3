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
    <Container>
      <div className="mb-6 space-y-4">
        <CoursesHeader total={total} />
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
  );
}
