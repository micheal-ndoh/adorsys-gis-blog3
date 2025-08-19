"use client";
import "@blog/i18n/boot";

import { useTranslation } from "react-i18next";

type Props = { total: number };

export function CoursesHeader({ total }: Props) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">{t("nav.courses")}</h1>
      <span className="badge badge-primary badge-lg">
        {t("courses.available", { count: total })}
      </span>
    </div>
  );
}
