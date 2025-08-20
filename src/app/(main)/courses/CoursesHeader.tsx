"use client";
import "@blog/i18n/boot";

import { useTranslation } from "react-i18next";

type Props = { total: number };

export function CoursesHeader({ total }: Props) {
  const { t } = useTranslation();
  return (
    <div className="w-full text-center mt-10">
      <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
        <span className="text-white">
          {t("blogs.title")}
        </span>
      </h1>
      <p className="mx-auto mt-3 mb-10 max-w-3xl text-sm sm:text-base md:text-lg text-white/70">
        {t("blogs.description")}
      </p>
    </div>
  );
}
