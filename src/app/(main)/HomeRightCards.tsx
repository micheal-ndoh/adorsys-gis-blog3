"use client";
import "@blog/i18n/boot";

import { useTranslation } from "react-i18next";

export function HomeRightCards() {
  const { t } = useTranslation();
  return (
    <div className="flex-1 max-w-lg w-full md:w-auto">
      {/* Mobile Portrait: Single column layout */}
      <div className="md:hidden space-y-8 sm:space-y-10">
        <div className="group relative">
          {/* Layered background cards with enhanced visibility */}
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-slate-600/30 to-slate-800/40 rounded-3xl transform rotate-3 scale-110 transition-all duration-500 group-hover:rotate-4 group-hover:scale-115 shadow-2xl"></div>
          <div className="absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br from-indigo-500/25 to-purple-600/35 rounded-3xl transform -rotate-2 scale-108 transition-all duration-500 group-hover:-rotate-3 group-hover:scale-112 shadow-xl border border-indigo-400/20"></div>
          
          {/* Main card with enhanced focus */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-white/30 bg-white/15 backdrop-blur-xl p-3 sm:p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.95)] transition-all duration-500 transform hover:-translate-y-3 z-10">
            <div
              className="aspect-video rounded-2xl bg-cover bg-center shadow-inner"
              style={{
                backgroundImage:
                  "url('https://st2.depositphotos.com/3591429/6301/i/950/depositphotos_63016959-stock-photo-man-working-on-a-computer.jpg')",
              }}
              aria-label="illustrative image"
            />
          </div>
        </div>

        <div className="group relative">
          {/* Layered background cards with enhanced visibility */}
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-slate-600/30 to-slate-800/40 rounded-3xl transform rotate-3 scale-110 transition-all duration-500 group-hover:rotate-4 group-hover:scale-115 shadow-2xl"></div>
          <div className="absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br from-emerald-500/25 to-teal-600/35 rounded-3xl transform -rotate-2 scale-108 transition-all duration-500 group-hover:-rotate-3 group-hover:scale-112 shadow-xl border border-emerald-400/20"></div>
          
          {/* Main card with enhanced focus */}
          <div className="relative rounded-3xl border-2 border-white/30 bg-white/15 backdrop-blur-xl p-4 sm:p-5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.95)] transition-all duration-500 transform hover:-translate-y-3 z-10">
            <div className="flex items-center gap-3 text-white/90 mb-4">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#10b981] to-[#34d399] shadow-lg shadow-green-500/50 animate-pulse" />
              <span className="text-sm font-semibold">{t("home.stats.liveSession")}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
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
        </div>

        <div className="group relative">
          {/* Layered background cards with enhanced visibility */}
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-slate-600/30 to-slate-800/40 rounded-3xl transform rotate-3 scale-110 transition-all duration-500 group-hover:rotate-4 group-hover:scale-115 shadow-2xl"></div>
          <div className="absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br from-rose-500/25 to-pink-600/35 rounded-3xl transform -rotate-2 scale-108 transition-all duration-500 group-hover:-rotate-3 group-hover:scale-112 shadow-xl border border-rose-400/20"></div>
          
          {/* Main card with enhanced focus */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-white/30 bg-white/15 backdrop-blur-xl p-3 sm:p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.95)] transition-all duration-500 transform hover:-translate-y-3 z-10">
            <div
              className="aspect-video rounded-2xl bg-cover bg-center shadow-inner"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              }}
              aria-label="illustrative image"
            />
          </div>
        </div>
      </div>

      {/* Mobile Landscape: Horizontal layout for better space utilization */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-1 gap-8">
          <div className="group relative">
            {/* Layered background cards with enhanced visibility */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-slate-600/30 to-slate-800/40 rounded-3xl transform rotate-3 scale-110 transition-all duration-500 group-hover:rotate-4 group-hover:scale-115 shadow-2xl"></div>
            <div className="absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br from-indigo-500/25 to-purple-600/35 rounded-3xl transform -rotate-2 scale-108 transition-all duration-500 group-hover:-rotate-3 group-hover:scale-112 shadow-xl border border-indigo-400/20"></div>
            
            {/* Main card with enhanced focus */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-white/30 bg-white/15 backdrop-blur-xl p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.95)] transition-all duration-500 transform hover:-translate-y-3 z-10">
              <div
                className="aspect-video rounded-2xl bg-cover bg-center shadow-inner"
                style={{
                  backgroundImage:
                    "url('https://st2.depositphotos.com/3591429/6301/i/950/depositphotos_63016959-stock-photo-man-working-on-a-computer.jpg')",
                }}
                aria-label="illustrative image"
              />
            </div>
          </div>

          <div className="group relative">
            {/* Layered background cards with enhanced visibility */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-slate-600/30 to-slate-800/40 rounded-3xl transform rotate-3 scale-110 transition-all duration-500 group-hover:rotate-4 group-hover:scale-115 shadow-2xl"></div>
            <div className="absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br from-emerald-500/25 to-teal-600/35 rounded-3xl transform -rotate-2 scale-108 transition-all duration-500 group-hover:-rotate-3 group-hover:scale-112 shadow-xl border border-emerald-400/20"></div>
            
            {/* Main card with enhanced focus */}
            <div className="relative rounded-3xl border-2 border-white/30 bg-white/15 backdrop-blur-xl p-5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.95)] transition-all duration-500 transform hover:-translate-y-3 z-10">
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
          </div>

          <div className="group relative">
            {/* Layered background cards with enhanced visibility */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-slate-600/30 to-slate-800/40 rounded-3xl transform rotate-3 scale-110 transition-all duration-500 group-hover:rotate-4 group-hover:scale-115 shadow-2xl"></div>
            <div className="absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br from-rose-500/25 to-pink-600/35 rounded-3xl transform -rotate-2 scale-108 transition-all duration-500 group-hover:-rotate-3 group-hover:scale-112 shadow-xl border border-rose-400/20"></div>
            
            {/* Main card with enhanced focus */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-white/30 bg-white/15 backdrop-blur-xl p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.95)] transition-all duration-500 transform hover:-translate-y-3 z-10">
              <div
                className="aspect-video rounded-2xl bg-cover bg-center shadow-inner"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                }}
                aria-label="illustrative image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Original layout with enhanced styling */}
      <div className="hidden lg:flex flex-col">
        <div className="group relative mt-6">
          {/* Layered background cards with enhanced visibility */}
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-slate-600/30 to-slate-800/40 rounded-3xl transform rotate-3 scale-110 transition-all duration-500 group-hover:rotate-4 group-hover:scale-115 shadow-2xl"></div>
          <div className="absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br from-indigo-500/25 to-purple-600/35 rounded-3xl transform -rotate-2 scale-108 transition-all duration-500 group-hover:-rotate-3 group-hover:scale-112 shadow-xl border border-indigo-400/20"></div>
          
          {/* Main card with enhanced focus */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-white/30 bg-white/15 backdrop-blur-xl p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.95)] transition-all duration-500 transform hover:-translate-y-3 z-10">
            <div
              className="aspect-video rounded-2xl bg-cover bg-center shadow-inner"
              style={{
                backgroundImage:
                  "url('https://st2.depositphotos.com/3591429/6301/i/950/depositphotos_63016959-stock-photo-man-working-on-a-computer.jpg')",
              }}
              aria-label="illustrative image"
            />
          </div>
        </div>

        <div className="group relative mt-4 self-end w-full max-w-md">
          {/* Layered background cards with enhanced visibility */}
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-slate-600/30 to-slate-800/40 rounded-3xl transform rotate-3 scale-110 transition-all duration-500 group-hover:rotate-4 group-hover:scale-115 shadow-2xl"></div>
          <div className="absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br from-emerald-500/25 to-teal-600/35 rounded-3xl transform -rotate-2 scale-108 transition-all duration-500 group-hover:-rotate-3 group-hover:scale-112 shadow-xl border border-emerald-400/20"></div>
          
          {/* Main card with enhanced focus */}
          <div className="relative rounded-3xl border-2 border-white/30 bg-white/15 backdrop-blur-xl p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.95)] transition-all duration-500 transform hover:-translate-y-3 z-10">
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
        </div>

        <div className="group relative mt-8">
          {/* Layered background cards with enhanced visibility */}
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-slate-600/30 to-slate-800/40 rounded-3xl transform rotate-3 scale-110 transition-all duration-500 group-hover:rotate-4 group-hover:scale-115 shadow-2xl"></div>
          <div className="absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br from-rose-500/25 to-pink-600/35 rounded-3xl transform -rotate-2 scale-108 transition-all duration-500 group-hover:-rotate-3 group-hover:scale-112 shadow-xl border border-rose-400/20"></div>
          
          {/* Main card with enhanced focus */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-white/30 bg-white/15 backdrop-blur-xl p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.95)] transition-all duration-500 transform hover:-translate-y-3 z-10">
            <div
              className="aspect-video rounded-2xl bg-cover bg-center shadow-inner"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              }}
              aria-label="illustrative image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
