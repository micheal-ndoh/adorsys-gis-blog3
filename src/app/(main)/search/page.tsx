"use client";
import "@blog/i18n/boot";

import { useMemo, useRef, useState } from "react";
import { api } from "@blog/trpc/react";
import { Container } from "@blog/components/container";
import { CourseCard } from "@blog/components/course";

import { ChevronDown, Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";

import { X as ClearIcon } from "react-feather";

export default function SearchPage() {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const enabled = query.trim().length > 0;
  const { data: allTags } = api.search.tags.useQuery(undefined, {
    staleTime: 60_000,
  });
  const [showTags, setShowTags] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const filteredTags = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allTags ?? [];
    return (allTags ?? []).filter((t) => t.toLowerCase().includes(q));
  }, [allTags, query]);
  const { data, isFetching } = api.search.cards.useQuery(
    { q: query, limit: 25, lang: i18n.language?.startsWith("fr") ? "fr" : "en" },
    { enabled }
  );

  return (
    <Container>
      <div className="mb-6 space-y-4">
        <h1 className="mb-4 text-2xl sm:text-3xl font-bold">{t("search.title")}</h1>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          ref={formRef}
        >
          <div
            className="flex w-full items-center rounded-full px-3 sm:px-5 py-2 sm:py-2.5 backdrop-blur-xl
                       ring-1 ring-white/20 focus-within:ring-primary/40
                       bg-gradient-to-r from-white/10 via-white/5 to-white/10
                       shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="flex-1 bg-transparent text-white placeholder-white/70 outline-none text-sm sm:text-base"
              aria-label="Search"
              ref={inputRef}
            />
            <div className="mx-2 sm:mx-3 h-4 sm:h-6 w-px bg-white/20" />
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-full px-2 sm:px-3 py-1 text-white/85 hover:bg-white/10 text-xs sm:text-sm"
                aria-label={t("search.showTags")}
                title={t("search.showTags")}
                onClick={() => setShowTags((s) => !s)}
              >
                <span className="hidden xs:inline sm:inline">{t("search.filterLabel")}</span>
                <ChevronDown size={16} />
              </button>
              {showTags && (
                <div className="absolute right-0 z-20 mt-2 w-48 sm:w-56 rounded-xl border border-white/15 bg-base-200/90 backdrop-blur-xl shadow-xl">
                  <div className="max-h-64 overflow-auto p-2">
                    {(filteredTags ?? []).map((t) => (
                      <button
                        key={t}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          setQuery(t);
                          setShowTags(false);
                          formRef.current?.dispatchEvent(
                            new Event("submit", {
                              cancelable: true,
                              bubbles: true,
                            })
                          );
                        }}
                      >
                        {t}
                      </button>
                    ))}
                    {filteredTags && filteredTags.length === 0 && (
                      <div className="px-3 py-2 text-sm opacity-70">
                        {t("search.noTags")}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {enabled ? (
              <button
                type="button"
                className="ml-2 inline-flex h-9 sm:h-11 w-9 sm:w-11 items-center justify-center rounded-full btn btn-accent btn-circle min-h-0 border-0 shadow-[0_8px_30px_rgba(23,227,206,0.35)]"
                aria-label="Clear search"
                title="Clear search"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
              >
                <ClearIcon size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            ) : (
              <button
                type="submit"
                className="ml-2 inline-flex h-9 sm:h-11 w-9 sm:w-11 items-center justify-center rounded-full btn btn-accent btn-circle min-h-0 border-0 shadow-[0_8px_30px_rgba(23,227,206,0.35)]"
                aria-label="Submit search"
                title="Search"
              >
                <SearchIcon size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            )}
          </div>
        </form>

        {enabled && (
          <div className="mt-6">
            {isFetching && (
              <div className="text-sm opacity-70">{t("search.searching")}</div>
            )}
            {!isFetching && data && data.length === 0 && (
              <div className="text-sm opacity-70">{t("search.noResults")}</div>
            )}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data?.map(
                ({ slug, title, description, lang, tags, previews }) => (
                  <CourseCard
                    key={slug}
                    slug={slug}
                    title={title}
                    description={description}
                    lang={lang}
                    tags={tags}
                    slide1Html={previews?.firstHtml}
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
