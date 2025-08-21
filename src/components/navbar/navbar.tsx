"use client";
import "@blog/i18n/boot";
import { Container } from "@blog/components/container";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export function AppNavBar() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Safety check for i18n initialization
  const current = i18n?.language?.startsWith("fr") ? "fr" : "en";

  // Safety check for translation function
  if (!t) {
    console.warn("Translation function not available");
    return null;
  }

  // Determine if we're on blogs page or about page
  const isOnBlogsPage = pathname?.startsWith("/courses") || pathname?.startsWith("/b");
  const isOnAboutPage = pathname?.startsWith("/res/about");

  const buildLanguageUrl = useCallback(
    (lng: "en" | "fr") => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      // On blog reading pages, switch language by going to the home page
      if (pathname?.startsWith("/b")) {
        return lng === "en" ? "/" : `/?lang=${lng}`;
      }
      if (pathname?.startsWith("/courses")) {
        if (lng === "en") params.delete("lang");
        else params.set("lang", lng);
        // reset pagination when switching language on courses
        params.delete("page");
        const qs = params.toString();
        return qs ? `${pathname}?${qs}` : pathname;
      }
      // Preserve current route elsewhere (e.g., /res, /b, /)
      if (lng === "en") params.delete("lang");
      else params.set("lang", lng);
      const qs = params.toString();
      return pathname ? (qs ? `${pathname}?${qs}` : pathname) : "/";
    },
    [pathname, searchParams]
  );

  const setLang = useCallback(
    (lng: "en" | "fr") => {
      void i18n.changeLanguage(lng);
      const url = buildLanguageUrl(lng);
      if (url) {
        router.push(url);
      }
      setOpen(false);
    },
    [i18n, buildLanguageUrl, router]
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
        <nav className="navbar min-h-14 sm:min-h-16">
          <div className="navbar-start flex gap-2 sm:gap-4">
            <Link
              href={buildLanguageUrl(current)}
              className="group flex flex-row items-center gap-1.5 sm:gap-2 select-none cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Brand"
            >
              <span className="text-base sm:text-lg md:text-xl font-extrabold uppercase text-white/90 tracking-wide">
                {t("nav.brand")}
              </span>
            </Link>
          </div>

          <div className="navbar-end flex items-center gap-2 sm:gap-3">
            {/* Desktop/Tablet links */}
            <Link
              href={
                pathname?.startsWith("/courses")
                  ? buildLanguageUrl(current)
                  : current === "en"
                  ? "/courses"
                  : `/courses?lang=${current}`
              }
              className={`text-sm sm:text-base hover:font-bold transition-all duration-200 hidden md:inline ${
                isOnBlogsPage
                  ? "text-primary font-semibold"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {t("nav.courses")}
            </Link>
            <Link
              href={current === "fr" ? "/res/about?lang=fr" : "/res/about"}
              className={`text-sm sm:text-base hover:font-bold transition-all duration-200 hidden md:inline ${
                isOnAboutPage
                  ? "text-primary font-semibold"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {t("nav.about")}
            </Link>

            {/* Small-screen overflow menu */}
            <div className="relative md:hidden">
              <details className="dropdown dropdown-end">
                <summary className="btn btn-ghost btn-xs text-white/80 hover:text-white px-1 bg-black rounded">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <circle cx="12" cy="6" r="1" />
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="18" r="1" />
                  </svg>
                </summary>
                <ul className="menu dropdown-content mt-2 p-1 shadow bg-black text-white rounded-box w-32 z-[100]">
                  <li>
                    <Link
                      href={
                        pathname?.startsWith("/courses")
                          ? buildLanguageUrl(current)
                          : current === "en"
                          ? "/courses"
                          : `/courses?lang=${current}`
                      }
                      className={`hover:text-primary hover:brightness-125 transition-all duration-200 ${
                        isOnBlogsPage ? "text-primary font-semibold" : "text-white"
                      }`}
                    >
                      {t("nav.courses")}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href={current === "fr" ? "/res/about?lang=fr" : "/res/about"}
                      className={`hover:text-primary hover:brightness-125 transition-all duration-200 ${
                        isOnAboutPage ? "text-primary font-semibold" : "text-white"
                      }`}
                    >
                      {t("nav.about")}
                    </Link>
                  </li>
                </ul>
              </details>
            </div>

            {/* Language selector dropdown */}
            <div
              ref={dropdownRef}
              className={`relative dropdown dropdown-end ${
                open ? "dropdown-open" : ""
              }`}
            >
              <div
                role="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-white/80 hover:text-white hover:font-extrabold px-1 select-none cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label={`Current language: ${
                  current === "en" ? "English" : "Français"
                }`}
              >
                <span
                  role="img"
                  aria-label={current === "en" ? "English" : "Français"}
                  className="text-base sm:text-lg"
                >
                  {current === "en" ? "🇬🇧" : "🇫🇷"}
                </span>
                <svg
                  className="w-3 sm:w-4 h-3 sm:h-4"
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
                  className="menu dropdown-content mt-2 p-1 shadow bg-black text-white rounded-box w-32 z-[100]"
                >
                  <li>
                    <button
                      role="menuitemradio"
                      aria-checked={current === "en"}
                      onClick={() => setLang("en")}
                      className={`hover:text-primary hover:brightness-125 transition-all duration-200 ${
                        current === "en" ? "text-primary font-semibold" : "text-white"
                      }`}
                    >
                      <span
                        role="img"
                        aria-label="English"
                        className="text-sm sm:text-base"
                      >
                        🇬🇧
                      </span>
                      en
                    </button>
                  </li>
                  <li>
                    <button
                      role="menuitemradio"
                      aria-checked={current === "fr"}
                      onClick={() => setLang("fr")}
                      className={`hover:text-primary hover:brightness-125 transition-all duration-200 ${
                        current === "fr" ? "text-primary font-semibold" : "text-white"
                      }`}
                    >
                      <span
                        role="img"
                        aria-label="Français"
                        className="text-sm sm:text-base"
                      >
                        🇫🇷
                      </span>
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
