"use client";
import "@blog/i18n/boot";

import { useTranslation } from "react-i18next";

export function HomeRightCards() {
  const { t } = useTranslation();
  return (
    <div className="flex-1 max-w-lg hidden md:flex flex-col">
      <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl p-3 md:p-4 shadow-xl">
        <div
          className="aspect-video rounded-xl bg-cover bg-center shadow-inner"
          style={{
            backgroundImage:
              "url('https://st2.depositphotos.com/3591429/6301/i/950/depositphotos_63016959-stock-photo-man-working-on-a-computer.jpg')",
          }}
          aria-label="illustrative image"
        />
      </div>

      <div className="-mt-8 self-end w-full max-w-md rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-5 shadow-xl">
        <div className="flex items-center gap-3 text-white/90">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
          <span className="text-sm">{t("home.stats.liveSession")}</span>
        </div>
        <div className="mt-2 text-3xl font-semibold text-white/90">
          {t("home.stats.count")}
        </div>
        <div className="text-xs text-white/70">
          {t("home.stats.activeLearners")}
        </div>
        <div className="mt-3 flex items-center gap-2 text-white/70 text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0ea5e9]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" />
          <span>{t("home.stats.globalCommunity")}</span>
        </div>
      </div>

      <div className="mt-6 rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl p-3 md:p-4 shadow-xl">
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
  );
}
