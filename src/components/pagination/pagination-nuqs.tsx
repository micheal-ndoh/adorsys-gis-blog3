"use client";

import { useQueryState, parseAsInteger } from "nuqs";
import { useTranslation } from "react-i18next";
import { useMemo, type MouseEvent } from "react";

export interface PaginationNuqsProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  onPageChange: (page: number) => void;
}

function computeVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisible: number
): number[] {
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function PaginationNuqs({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
  onPageChange,
}: Readonly<PaginationNuqsProps>) {
  const { t } = useTranslation();

  const visiblePages = useMemo(
    () => computeVisiblePages(currentPage, totalPages, maxVisiblePages),
    [currentPage, totalPages, maxVisiblePages]
  );

  if (!Number.isFinite(totalPages) || totalPages <= 1) return null;

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  const handlePageClick = (page: number) => (e: MouseEvent) => {
    e.preventDefault();
    onPageChange(page);
  };

  const preventIfDisabled = (disabled: boolean) => (e: MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <nav
      aria-label="Course navigation"
      className="flex items-center justify-center gap-2 sm:gap-2 bg-transparent"
    >
      {/* Previous */}
      <button
        onClick={isPrevDisabled ? preventIfDisabled(true) : handlePageClick(Math.max(1, currentPage - 1))}
        disabled={isPrevDisabled}
        aria-label={t("Previous Page")}
        className={`${
          isPrevDisabled ? "cursor-not-allowed text-neutral-600" : "hover:text-white"
        } rounded-lg px-3 py-2 text-base sm:px-2 sm:py-1.5 sm:text-sm`}
      >
        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="opacity-80 sm:w-[14px] sm:h-[14px]"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hidden sm:inline">{t("Previous")}</span>
        </span>
      </button>

      {/* Pages */}
      <div className="flex items-center gap-2 sm:gap-2">
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={handlePageClick(page)}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={
              page === currentPage
                ? t("Current Page {{page}}", { page })
                : t("Go to Page {{page}}", { page })
            }
            className={`${
              page === currentPage
                ? "bg-neutral-800 text-white"
                : "bg-black text-neutral-300 hover:text-white"
            } border border-neutral-800 rounded-lg min-w-[2.5rem] text-center px-3 py-2 text-base sm:min-w-[2rem] sm:px-2 sm:py-1.5 sm:text-sm`}
          >
            <span>{page}</span>
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={isNextDisabled ? preventIfDisabled(true) : handlePageClick(Math.min(totalPages, currentPage + 1))}
        disabled={isNextDisabled}
        aria-label={t("Next Page")}
        className={`${
          isNextDisabled ? "cursor-not-allowed text-neutral-600" : "hover:text-white"
        } rounded-lg px-3 py-2 text-base sm:px-2 sm:py-1.5 sm:text-sm`}
      >
        <span className="flex items-center gap-1">
          <span className="hidden sm:inline">{t("Next")}</span>
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="opacity-80 sm:w-[14px] sm:h-[14px]"
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </nav>
  );
}

export default PaginationNuqs;
