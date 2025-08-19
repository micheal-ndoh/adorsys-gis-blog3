"use client";

import Link from "next/link";
import { BookOpen } from "react-feather";
import { useTranslation } from "react-i18next";

export function CoursesLink() {
  const { t, i18n } = useTranslation();
  const lng = (i18n.language || "en").toLowerCase();
  const short = lng.includes("-") ? lng.split("-")[0] : lng;
  const href = short !== "en" ? `/courses?lang=${short}` : "/courses";

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-xl border border-base-300 bg-base-200 px-4 py-2 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition"
    >
      <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary shadow-[0_0_20px_rgba(59,130,246,0.25)]">
        <BookOpen size={18} />
      </span>
      <span className="font-medium">{t("nav.courses")}</span>
    </Link>
  );
}
