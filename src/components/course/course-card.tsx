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
  tags?: string[];
  date?: string;
}

export function CourseCard({
  slug,
  title,
  description,
  lang,
  slide1Html,
  tags,
  date,
}: Readonly<CourseCardProps>) {
  const { t } = useTranslation();
  const formattedDate = date
    ? new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
    : undefined;
  const hasSlides =
    typeof (slide1Html ?? "") === "string" &&
    (slide1Html ?? "").trim().length > 0;
  const hasCourse =
    typeof (description ?? "") === "string" &&
    (description ?? "").trim().length > 0;
  // Description fallback logic
  let computedDescription: string | undefined = description;
  if (!hasCourse) {
    computedDescription = t("courseCard.contentSoon");
  }

  return (
    <Link
      href={`/b/${slug}`}
      className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-black"
      aria-label={`Open course ${title}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* minimal, no overlays */}

        {hasSlides ? (
          <div className="relative w-full overflow-hidden bg-black">
            <div className="relative aspect-[16/9] sm:aspect-[16/8] md:h-48 lg:h-56 xl:h-64">
              <div className="slide-preview absolute inset-0">
                <div className="slide-preview-inner p-2 sm:p-3 md:p-4">
                  <div
                    className="prose prose-invert"
                    dangerouslySetInnerHTML={{ __html: slide1Html as string }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden bg-black">
            <div className="relative aspect-[16/9] sm:aspect-[16/8] md:h-48 lg:h-56 xl:h-64">
              <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                <span className="text-neutral-400 text-sm">
                  Slides not available yet
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="relative p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8">
          <h3 className="mb-2 text-lg sm:text-xl font-semibold text-white">
            {title}
          </h3>
          {formattedDate && (
            <div className="text-xs text-neutral-400 mb-2">{formattedDate}</div>
          )}
          {computedDescription && (
            <p className="mb-3 sm:mb-4 line-clamp-3 text-sm text-neutral-300">
              {computedDescription}
            </p>
          )}
          {tags && tags.length > 0 && (
            <div className="mb-3 sm:mb-4 flex flex-wrap gap-1.5 sm:gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 border border-neutral-700 text-neutral-300 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {/* No open button */}
        </div>
      </motion.div>
    </Link>
  );
}
