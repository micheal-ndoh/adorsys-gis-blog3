"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface CourseCardProps {
  slug: string;
  title: string;
  description?: string;
  lang?: string;
  slide1Html?: string;
  slide2Html?: string;
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
  const { t } = useTranslation();
  const hasSlides =
    typeof (slide1Html ?? "") === "string" &&
    (slide1Html ?? "").trim().length > 0;
  const hasCourse =
    typeof (description ?? "") === "string" &&
    (description ?? "").trim().length > 0;
  const computedDescription = hasCourse
    ? description
    : hasSlides
    ? t("courseCard.slidesSoon")
    : t("courseCard.contentSoon");

  return (
    <Link
      href={`/b/${slug}`}
      className='group relative overflow-hidden rounded-2xl border border-base-300/30 bg-base-200/60 ring-1 ring-white/5 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transform-gpu hover:-translate-y-0.5 hover:scale-[1.01]'
      aria-label={`Open course ${title}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
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

        {hasSlides ? (
          <div className='relative w-full overflow-hidden bg-base-200/80'>
            <div className='relative aspect-[16/9] sm:aspect-[16/8] md:h-48 lg:h-56 xl:h-64'>
              <div className='slide-preview absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0'>
                <div className='slide-preview-inner p-2 sm:p-3 md:p-4'>
                  <div className='prose prose-neutral' dangerouslySetInnerHTML={{ __html: slide1Html as string }} />
                </div>
              </div>
              {(slide2Html ?? "").trim().length > 0 && (
                <div className='slide-preview absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100'>
                  <div className='slide-preview-inner p-2 sm:p-3 md:p-4'>
                    <div className='prose prose-neutral' dangerouslySetInnerHTML={{ __html: slide2Html as string }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='relative w-full overflow-hidden bg-base-200/80'>
            <div className='relative aspect-[16/9] sm:aspect-[16/8] md:h-48 lg:h-56 xl:h-64'>
              <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-base-200 to-accent/10' />
            </div>
          </div>
        )}

        <div className='relative p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8'>
          <h3 className='mb-2 text-lg sm:text-xl font-semibold'>{title}</h3>
          {computedDescription && (
            <p className='mb-3 sm:mb-4 line-clamp-3 text-sm opacity-80'>{computedDescription}</p>
          )}
          {tags && tags.length > 0 && (
            <div className='mb-3 sm:mb-4 flex flex-wrap gap-1.5 sm:gap-2'>
              {tags.map((tag) => (
                <span key={tag} className='badge badge-outline badge-sm text-xs'>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span className='absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-10 btn btn-primary btn-sm rounded-full shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'>
            {t("common.open")}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}


