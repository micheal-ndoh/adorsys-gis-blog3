"use client";

import "@blog/i18n/boot";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function LanguageRedirect() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only redirect if we're on the courses page and no language is specified
    const urlLang = searchParams.get("lang");
    if (!urlLang) {
      const currentLang = i18n.language?.startsWith("fr") ? "fr" : "en";
      if (currentLang === "fr") {
        router.replace("/courses?lang=fr");
      }
    }
  }, [i18n, router, searchParams]);

  return null; // This component doesn't render anything
} 