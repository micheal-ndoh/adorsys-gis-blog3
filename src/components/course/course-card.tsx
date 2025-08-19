import Link from "next/link";
import { BookOpen } from "react-feather";

interface CourseCardProps {

	slug: string;
	title: string;
	slide1Html?: string;
	slide2Html?: string;
	description?: string;
	lang?: string;
	tags?: string[];
}

export function CourseCard({ slug, title, description, lang, slide1Html, slide2Html, tags }: CourseCardProps) {
	return (
		<Link
			href={`/b/${slug}`}
			className='group relative overflow-hidden rounded-2xl border border-base-300/30 bg-base-200/60 ring-1 ring-white/5 transition-all hover:border-primary/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]'
			aria-label={`Open course ${title}`}
		>
			{lang && (
				<span className='absolute right-4 top-4 z-10 badge badge-outline uppercase'>
					{lang}
				</span>
			)}
			{/* Grid background overlay */}
			<div
				className='pointer-events-none absolute inset-0 opacity-[0.25]'
				style={{
					backgroundImage:
						'linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)',
					backgroundSize: '32px 32px',
				}}
			/>
			{/* Glow */}
			<div className='pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-primary/10 blur-2xl' />
			<div className='pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-secondary/10 blur-2xl' />

  slug: string;
  title: string;
  slide1Html?: string;
  slide2Html?: string;
  description?: string;
  lang?: string;
  tags?: string[];
}

export function CourseCard({
  slug,
  title,
  description,
  lang,
  slide1Html,
  slide2Html,
  tags,
}: CourseCardProps) {
  const hasSlides =
    typeof (slide1Html ?? "") === "string" &&
    (slide1Html ?? "").trim().length > 0;
  const hasCourse =
    typeof (description ?? "") === "string" &&
    (description ?? "").trim().length > 0;
  const computedDescription = hasCourse
    ? description
    : hasSlides
    ? "Slides available. Course notes coming soon."
    : "Content coming soon.";
  return (
    <Link
      href={`/b/${slug}`}
      className="group relative overflow-hidden rounded-2xl border border-base-300/30 bg-base-200/60 ring-1 ring-white/5 transition-all hover:border-primary/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
      aria-label={`Open course ${title}`}
    >
      {lang && (
        <span className="absolute right-4 top-4 z-10 badge badge-outline uppercase">
          {lang}
        </span>
      )}
      {/* Grid background overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-primary/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-secondary/10 blur-2xl" />


      {/* Preview slide area */}
      {hasSlides ? (
        <div className="relative w-full overflow-hidden bg-base-200/80">
          <div className="relative aspect-[16/9]">
            <div className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0">
              <div className="h-full w-full overflow-hidden p-4 prose prose-sm prose-neutral max-w-none">
                <div dangerouslySetInnerHTML={{ __html: slide1Html ?? "" }} />
              </div>
            </div>
            {(slide2Html ?? "").trim().length > 0 && (
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                <div className="h-full w-full overflow-hidden p-4 prose prose-sm prose-neutral max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: slide2Html ?? "" }} />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative w-full overflow-hidden bg-base-200/80">
          <div className="relative aspect-[16/9]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-[0_0_35px_rgba(59,130,246,0.25)]">
                  <BookOpen size={28} />
                </div>
                <span className="badge badge-sm">No slides yet</span>
              </div>
            </div>
          </div>
        </div>
      )}


			<div className='relative p-6 sm:p-7 md:p-8'>
				<h3 className='mb-2 text-xl font-semibold'>{title}</h3>
				{description && (
					<p className='mb-4 line-clamp-3 text-sm opacity-80'>{description}</p>
				)}

				{tags && tags.length > 0 && (
					<div className='mb-4 flex flex-wrap gap-2'>
						{tags.map((t) => (
							<span key={t} className='badge badge-outline badge-sm'>
								{t}
							</span>
						))}
					</div>
				)}

				<div className='flex items-center justify-end'>
					<span className='btn btn-accent btn-sm rounded-full'>Open</span>
				</div>
			</div>
		</Link>
	);
} 

      <div className="relative p-6 sm:p-7 md:p-8">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="mb-4 line-clamp-3 text-sm opacity-80">
          {computedDescription}
        </p>
        {tags && tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="badge badge-outline badge-sm">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-end">
          <span className="btn btn-accent btn-sm rounded-full">Open</span>
        </div>
      </div>
    </Link>
  );
}

