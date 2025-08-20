"use client";
import "@blog/i18n/boot";

import { useTranslation } from "react-i18next";

export function HomeRightCards() {
  const { t } = useTranslation();
  return (
    <div className="flex-1 max-w-lg w-full md:w-auto">
      {/* Mobile Portrait: Single column layout */}
      <div className="md:hidden space-y-4 sm:space-y-5">
        <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl p-3 sm:p-4 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300">
          <div
            className="aspect-video rounded-xl bg-cover bg-center shadow-inner"
            style={{
              backgroundImage:
                "url('https://st2.depositphotos.com/3591429/6301/i/950/depositphotos_63016959-stock-photo-man-working-on-a-computer.jpg')",
            }}
            aria-label="illustrative image"
          />
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-4 sm:p-5 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300">
          <div className="flex items-center gap-3 text-white/90 mb-3">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#10b981] to-[#34d399] shadow-lg shadow-green-500/50 animate-pulse" />
            <span className="text-sm font-semibold">{t("home.stats.liveSession")}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {t("home.stats.count")}
            </span>
          </div>
          <div className="text-sm text-white/70 mb-4">
            {t("home.stats.activeLearners")}
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] shadow-lg shadow-blue-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] shadow-lg shadow-purple-500/50" />
            <span className="font-medium">{t("home.stats.globalCommunity")}</span>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl p-3 sm:p-4 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300">
          <div
            className="aspect-video rounded-xl bg-cover bg-center shadow-inner"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            }}
            aria-label="illustrative image"
          />
        </div>
      </div>

      {/* Mobile Landscape: Horizontal layout for better space utilization */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-1 gap-5">
          <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl p-4 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300">
            <div
              className="aspect-video rounded-xl bg-cover bg-center shadow-inner"
              style={{
                backgroundImage:
                  "url('https://st2.depositphotos.com/3591429/6301/i/950/depositphotos_63016959-stock-photo-man-working-on-a-computer.jpg')",
              }}
              aria-label="illustrative image"
            />
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-5 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300">
            <div className="flex items-center gap-3 text-white/90 mb-4">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#10b981] to-[#34d399] shadow-lg shadow-green-500/50 animate-pulse" />
              <span className="text-base font-semibold">{t("home.stats.liveSession")}</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {t("home.stats.count")}
              </span>
            </div>
            <div className="text-sm text-white/70 mb-4">
              {t("home.stats.activeLearners")}
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] shadow-lg shadow-blue-500/50" />
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] shadow-lg shadow-purple-500/50" />
              <span className="font-medium">{t("home.stats.globalCommunity")}</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl p-4 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300">
            <div
              className="aspect-video rounded-xl bg-cover bg-center shadow-inner"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              }}
              aria-label="illustrative image"
            />
          </div>
        </div>
      </div>

      {/* Desktop: Original layout */}
      <div className="hidden lg:flex flex-col">
        <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl p-4 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300">
          <div
            className="aspect-video rounded-xl bg-cover bg-center shadow-inner"
            style={{
              backgroundImage:
                "url('https://st2.depositphotos.com/3591429/6301/i/950/depositphotos_63016959-stock-photo-man-working-on-a-computer.jpg')",
            }}
            aria-label="illustrative image"
          />
        </div>

        <div className="-mt-8 self-end w-full max-w-md rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300">
          <div className="flex items-center gap-3 text-white/90 mb-4">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#10b981] to-[#34d399] shadow-lg shadow-green-500/50 animate-pulse" />
            <span className="text-base font-semibold">{t("home.stats.liveSession")}</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {t("home.stats.count")}
            </span>
          </div>
          <div className="text-sm text-white/70 mb-4">
            {t("home.stats.activeLearners")}
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] shadow-lg shadow-blue-500/50" />
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] shadow-lg shadow-purple-500/50" />
            <span className="font-medium">{t("home.stats.globalCommunity")}</span>
          </div>
        </div>

        <div className="mt-6 rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl p-4 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300">
          <div
            className="aspect-video rounded-xl bg-cover bg-center shadow-inner"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            }}
            aria-label="illustrative image"
          />
        </div>
      </div>
    </div>
  );
}
