"use client";
import "@blog/i18n/boot";

import { useTranslation } from "react-i18next";

type Props = { total: number };

export function CoursesHeader({ total }: Props) {
  const { t } = useTranslation();
  return (
    <div className="w-full text-center">
      <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-yellow-300 bg-clip-text text-transparent">
          {t("courses.title", { defaultValue: "Our Courses" })}
        </span>
      </h1>
      <p className="mx-auto mt-3 max-w-3xl text-sm sm:text-base md:text-lg text-white/70">
        {t(
          "courses.subtitle",
          {
            defaultValue:
              "Explore our comprehensive collection of GIS lessons, from fundamentals to advanced techniques. Each course is designed with interactive content and practical examples.",
          }
        )}
      </p>
      <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs sm:text-sm text-white/70">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400/80" />
        {t("courses.available", { count: total })}
      </div>
      <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}
