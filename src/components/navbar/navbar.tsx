"use client";
import "@blog/i18n/boot";
import { Container } from "@blog/components/container";
import icon from "@blog/components/icon.svg";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export function AppNavBar() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const current = i18n.language?.startsWith("fr") ? "fr" : "en";

  const buildCoursesUrl = useCallback(
    (lng: "en" | "fr") => {
      if (pathname?.startsWith("/courses")) {
        const params = new URLSearchParams(searchParams?.toString() ?? "");
        if (lng === "en") params.delete("lang");
        else params.set("lang", lng);
        params.delete("page");
        const qs = params.toString();
        return qs ? `${pathname}?${qs}` : pathname;
      }
      // When not on courses, do not redirect anywhere; just stay on the same page
      return null;
    },
    [pathname, searchParams]
  );

  const setLang = useCallback(
    (lng: "en" | "fr") => {
      void i18n.changeLanguage(lng);
      const url = buildCoursesUrl(lng);
      if (url) {
        router.push(url);
      }
      setOpen(false);
    },
    [i18n, buildCoursesUrl, router]
  );

  useEffect(() => {
    function onDocClick(ev: MouseEvent) {
      if (!open) return;
      const target = ev.target as Node | null;
      if (
        dropdownRef.current &&
        target &&
        !dropdownRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);
  
  return (
    <div className="sticky top-0 z-40 bg-white/10 backdrop-blur-xl border-b border-white/20">
      <Container className="py-0">
        <nav className="navbar min-h-16">
          <div className="navbar-start flex gap-2 sm:gap-4">
            <div
              className="group flex flex-row items-center gap-1.5 sm:gap-2 select-none cursor-default"
              aria-label="Brand"
            >
              <Image
                src={icon}
                className="w-6 sm:w-8"
                alt="logo"
              />
              <span className="text-lg sm:text-xl font-extrabold uppercase text-white/90">
                Adorsys GIS Blog
              </span>
            </div>
          </div>

          <div className="navbar-end flex items-center gap-3 sm:gap-4">
            <Link
              href="/courses"
              className="text-2xl font-bold text-primary"
              aria-label="Go to blogs"
            >
              Blogs
            </Link>
            <Link
              href="/res/about"
              className="text-white/80 hover:text-white hover:font-extrabold transition-colors px-1"
            >
              {i18n.language?.startsWith("fr") ? "À propos" : "About"}
            </Link>
            <div
              ref={dropdownRef}
              className={`relative dropdown dropdown-end ${open ? "dropdown-open" : ""}`}
            >
              <div
                role="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-white/80 hover:text-white hover:font-extrabold px-1 select-none cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label={`Current language: ${current === "en" ? "English" : "Français"}`}
              >
                <span role="img" aria-label={current === "en" ? "English" : "Français"} className="text-lg sm:text-xl">
                  {current === "en" ? "🇬🇧" : "🇫🇷"}
                </span>
                <svg
                  className="w-3.5 sm:w-4 h-3.5 sm:h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {open && (
                <ul
                  role="menu"
                  className="menu dropdown-content mt-2 p-2 shadow bg-base-200 text-base-content rounded-box w-24 sm:w-28 z-[100]"
                >
                  <li>
                    <button
                      role="menuitemradio"
                      aria-checked={current === "en"}
                      onClick={() => setLang("en")}
                      className={`${
                        current === "en" ? "bg-base-300 text-base-content" : ""
                      } normal-case text-base-content hover:bg-base-300 flex items-center gap-2 text-sm`}
                    >
                      <span role="img" aria-label="English" className="text-base sm:text-lg">🇬🇧</span>
                      en
                    </button>
                  </li>
                  <li>
                    <button
                      role="menuitemradio"
                      aria-checked={current === "fr"}
                      onClick={() => setLang("fr")}
                      className={`${
                        current === "fr" ? "bg-base-300 text-base-content" : ""
                      } normal-case text-base-content hover:bg-base-300 flex items-center gap-2 text-sm`}
                    >
                      <span role="img" aria-label="Français" className="text-base sm:text-lg">🇫🇷</span>
                      fr
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
}
