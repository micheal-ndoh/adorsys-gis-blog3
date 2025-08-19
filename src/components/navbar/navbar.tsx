import { Container } from "@blog/components/container";
import icon from "@blog/components/icon.svg";
import { ThemeToggle } from "@blog/components/theme";
import Image from "next/image";
import Link from "next/link";

export function AppNavBar() {
  return (
    <div className="sticky top-0 z-40 bg-white/10 backdrop-blur-xl border-b border-white/20">
      <Container className="py-0">
        <nav className="navbar">
          <div className="navbar-start flex gap-4">
            <Link href="/" className="group flex flex-row items-center gap-2" aria-label="Go to home">
              <Image src={icon} className="w-8 transition-transform duration-200 group-hover:scale-110" alt="logo" />
              <span className="text-xl font-extrabold uppercase text-white/90 transition-colors duration-200 group-hover:text-primary">
                Learn
              </span>
            </Link>
          </div>

          <div className="navbar-end flex items-center gap-2">
            {/* Language dropdown with flags */}
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                aria-label="Language switcher"
                className="px-3 py-2 bg-white/15 text-white/80 hover:text-primary hover:bg-primary/25 border border-transparent hover:border-primary/30 rounded-xl backdrop-blur-md transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <span className="text-base">🇬🇧</span>
                <span className="hidden sm:inline">EN</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 mt-2 shadow-xl bg-base-200/80 backdrop-blur-xl rounded-xl border border-white/20 w-44"
              >
                <li>
                  <Link href="/courses?lang=en" aria-label="Switch to English">
                    <span className="mr-2">🇬🇧</span>
                    English
                  </Link>
                </li>
                <li>
                  <Link href="/courses?lang=fr" aria-label="Basculer en français">
                    <span className="mr-2">🇫🇷</span>
                    Français
                  </Link>
                </li>
              </ul>
            </div>
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </div>
  );
}
