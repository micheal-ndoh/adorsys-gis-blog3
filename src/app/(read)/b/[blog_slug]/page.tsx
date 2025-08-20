import { Container } from "@blog/components/container";
import { redirect } from "next/navigation";
import { loadBlog } from "@blog/converters";
import { getAllBlogs } from "@blog/server/blog/api";
import Display from "@blog/components/display";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const pages = await getAllBlogs();
  return pages.map((blog_slug) => ({ blog_slug }));
}

interface Props {
  params: Promise<{ blog_slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { blog_slug } = await params;
  if (!blog_slug) {
    return null;
  }

  try {
    const { course } = await loadBlog(blog_slug);
    if (!course || !course.title) {
      return { title: `${blog_slug} | adorsys GIS` };
    }
    return {
      title: `${course.title} | adorsys GIS`,
    };
  } catch {
    // Gracefully fall back when course metadata cannot be loaded
    return { title: `${blog_slug} | adorsys GIS` };
  }
}

export default async function SingleBlogPage({ params }: Props) {
  const { blog_slug } = await params;
  if (!blog_slug) {
    return redirect("/courses");
  }

  try {
    const { course, slides } = await loadBlog(blog_slug);
    return (
      <Container>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:font-bold transition-all duration-200 mb-6"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Blogs
        </Link>
        {slides && <Display data={slides.content} />}

        {course.content && (
          <article className="prose prose-neutral lg:prose-xl mx-auto mt-8 text-center">
            <div dangerouslySetInnerHTML={{ __html: course.content }} />
          </article>
        )}
      </Container>
    );
  } catch {
    return (
      <Container>
        <div className="hero min-h-[60vh] bg-base-200 rounded-2xl mt-6">
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold md:text-5xl">
                This course does not exist yet
              </h1>
              <p className="mx-auto mt-3 max-w-xl opacity-80">
                Please check the link or try again later.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a className="btn btn-outline" href={`/b/${blog_slug}`}>
                  Reload
                </a>
                <a className="btn btn-primary" href="/courses">
                  Return to Courses
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
