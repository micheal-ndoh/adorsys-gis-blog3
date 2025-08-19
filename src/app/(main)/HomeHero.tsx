"use client";
import "@blog/i18n/boot";

import { useTranslation } from "react-i18next";

export function HomeHero() {
  const { t } = useTranslation();
  return (
    <div className="flex-1 text-center lg:text-left md:ml-8 lg:ml-12">
      <div className="mb-12">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white/90 leading-tight tracking-tight">
          <span className="block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            {t("home.title")}
          </span>
        </h1>
        <div className="w-32 h-1.5 bg-gradient-to-r from-[#0ea5e9] to-[#8b5cf6] rounded-full mx-auto lg:mx-0 mb-10"></div>
        <h2 className="text-2xl md:text-3xl text-white/90 mb-6 font-semibold leading-relaxed">
          {t("home.subtitle")}
        </h2>
        <p className="text-lg md:text-xl text-white/70 mb-8 max-w-3xl leading-relaxed font-light mx-auto lg:mx-0">
          {t("home.description")}
        </p>
      </div>

      <div className="flex flex-wrap gap-6 mb-12 text-white/80">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#0ea5e9] rounded-full" />
          <span className="text-sm font-medium">
            {t("home.bullets.expert")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#8b5cf6] rounded-full" />
          <span className="text-sm font-medium">
            {t("home.bullets.interactive")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#10b981] rounded-full" />
          <span className="text-sm font-medium">
            {t("home.bullets.practical")}
          </span>
        </div>
      </div>
    </div>
  );
}
