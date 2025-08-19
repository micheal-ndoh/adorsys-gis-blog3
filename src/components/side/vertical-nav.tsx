"use client";
import "@blog/i18n/boot";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Search } from "react-feather";
import { useTranslation } from "react-i18next";

export default function VerticalNav() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const isFr = i18n.language?.startsWith("fr");
  const items = [
    { href: "/", label: t("nav.home"), icon: Home },
    {
      href: isFr ? "/courses?lang=fr" : "/courses",
      label: t("nav.courses"),
      icon: BookOpen,
    },
    { href: "/search", label: t("nav.search"), icon: Search },
  ];

  return (
    <div className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 z-40">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20">
        <div className="flex flex-col items-center gap-5">
          {items.map(({ href, label, icon: Icon }) => {
            const hrefPath = href.replace(/\?.*$/, "");
            const active = pathname === hrefPath;
            return (
              <Link
                key={href}
                href={href}
                className="group flex flex-col items-center gap-1 text-center"
              >
                <div
                  className={`p-2.5 rounded-xl border transition-all ${
                    active
                      ? "bg-primary/30 border-primary/40 shadow-primary/20 text-primary"
                      : "bg-white/15 border-transparent text-white/80 hover:bg-primary/25 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20"
                  }`}
                >
                  <Icon className="w-5 h-5 group-hover:text-primary" />
                </div>
                <span
                  className={`text-xs ${
                    active
                      ? "text-primary"
                      : "text-white/80 group-hover:text-primary"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
