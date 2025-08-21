"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export function BackToBlogs({ href }: { href?: string }) {
  const { t, i18n } = useTranslation();
  const lng = (i18n.language || "en").toLowerCase();
  const short = lng.includes("-") ? lng.split("-")[0] : lng;
  const defaultHref = short !== "en" ? `/courses?lang=${short}` : "/courses";

  return (
    <Link
      href={href ?? defaultHref}
      className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/75 hover:text-white hover:font-extrabold transition-colors"
      aria-label={t("blogs.back")}
    >
      <svg
        className="w-3 h-3 sm:w-4 sm:h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      {t("blogs.back")}
    </Link>
  );
}
