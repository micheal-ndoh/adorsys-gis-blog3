"use client";
import "@blog/i18n/boot";

import { useTranslation } from "react-i18next";

export function HomeHero() {
  const { t } = useTranslation();
  return (
    <div className="flex-1 text-center md:text-left lg:text-left w-full">
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        {/* Main Title with enhanced styling */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold leading-tight tracking-tight mb-4 sm:mb-6">
          <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            {t("home.title")}
          </span>
        </h1>
        
        {/* Enhanced gradient line */}
        <div className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 h-1.5 sm:h-2 bg-gradient-to-r from-[#0ea5e9] via-[#8b5cf6] to-[#10b981] rounded-full mx-auto md:mx-0 lg:mx-0 mb-4 sm:mb-6 md:mb-8 lg:mb-10 shadow-lg shadow-blue-500/25"></div>
        
        {/* Subtitle with improved styling */}
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 mb-3 sm:mb-4 md:mb-5 lg:mb-6 font-bold leading-relaxed">
          <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            {t("home.subtitle")}
          </span>
        </h2>
        
        {/* Description with enhanced readability */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 mb-5 sm:mb-6 md:mb-8 lg:mb-10 max-w-2xl sm:max-w-3xl leading-relaxed font-medium mx-auto md:mx-0 lg:mx-0">
          {t("home.description")}
        </p>
      </div>

      {/* Enhanced feature bullets with better visual hierarchy */}
      <div className="flex flex-wrap justify-center md:justify-start lg:justify-start gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 bg-white/5 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 sm:py-2.5 border border-white/10 hover:border-blue-400/30 transition-all duration-300">
          <div className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] rounded-full shadow-lg shadow-blue-500/50 animate-pulse"></div>
          <span className="text-xs sm:text-sm md:text-base font-semibold text-white/90">
            {t("home.bullets.expert")}
          </span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 bg-white/5 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 sm:py-2.5 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
          <div className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] rounded-full shadow-lg shadow-purple-500/50 animate-pulse"></div>
          <span className="text-xs sm:text-sm md:text-base font-semibold text-white/90">
            {t("home.bullets.interactive")}
          </span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 bg-white/5 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 sm:py-2.5 border border-white/10 hover:border-green-400/30 transition-all duration-300">
          <div className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full shadow-lg shadow-green-500/50 animate-pulse"></div>
          <span className="text-xs sm:text-sm md:text-base font-semibold text-white/90">
            {t("home.bullets.practical")}
          </span>
        </div>
      </div>

    </div>
  );
}
