"use client";
import "@blog/i18n/boot";
import { Container } from "@blog/components/container";
import icon from "@blog/components/icon.svg";
import { ThemeToggle } from "@blog/components/theme";
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
        <nav className="navbar">
          <div className="navbar-start flex gap-4">
            <Link
              href="/"
              className="group flex flex-row items-center gap-2"
              aria-label="Go to home"
            >
              <Image
                src={icon}
                className="w-8 transition-transform duration-200 group-hover:scale-110"
                alt="logo"
              />
              <span className="text-xl font-extrabold uppercase text-white/90 transition-colors duration-200 group-hover:text-primary">
                Learn
              </span>
            </Link>
          </div>

          <div className="navbar-end flex items-center gap-2">
            <div ref={dropdownRef} className="relative dropdown">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="btn btn-ghost px-3 py-2 bg-white/15 text-white/80 hover:text-primary hover:bg-primary/25 border border-transparent hover:border-primary/30 rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
                aria-haspopup="menu"
                aria-expanded={open}
              >
                <span className="uppercase">{current}</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {open && (
                <ul
                  role="menu"
                  className="menu dropdown-content mt-2 p-2 shadow bg-base-200 text-base-content rounded-box w-28 z-[100]"
                >
                  <li>
                    <button
                      role="menuitemradio"
                      aria-checked={current === "en"}
                      onClick={() => setLang("en")}
                      className={`${
                        current === "en" ? "bg-base-300 text-base-content" : ""
                      } normal-case text-base-content hover:bg-base-300 flex items-center gap-2`}
                    >
                      <span role="img" aria-label="English" className="text-lg">🇬🇧</span>
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
                      } normal-case text-base-content hover:bg-base-300 flex items-center gap-2`}
                    >
                      <span role="img" aria-label="Français" className="text-lg">🇫🇷</span>
                      fr
                    </button>
                  </li>
                </ul>
              )}
            </div>
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </div>
  );
}
