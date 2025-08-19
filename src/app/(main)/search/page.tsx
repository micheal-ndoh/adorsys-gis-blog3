"use client";

import { useState } from "react";
import { api } from "@blog/trpc/react";
import { Container } from "@blog/components/container";
import { CourseCard } from "@blog/components/course";
import { ChevronDown, Search as SearchIcon } from "react-feather";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const enabled = query.trim().length > 0;
  const { data, isFetching } = api.search.cards.useQuery(
    { q: query, limit: 25 },
    { enabled }
  );

  return (
    <Container>
      <div className="mb-6 space-y-4">
        <h1 className="mb-4 text-3xl font-bold">Search</h1>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex w-full items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses, topics, or keywords..."
              className="flex-1 bg-transparent text-white placeholder-white/60 outline-none"
              aria-label="Search"
            />
            <div className="mx-3 h-6 w-px bg-white/20" />
            <button
              type="button"
              className="flex items-center gap-1 rounded-full px-3 py-1 text-white/80 hover:bg-white/10"
              aria-label="Result scope"
              title="Currently searching in Courses"
            >
              <span>Courses</span>
              <ChevronDown size={16} />
            </button>
            <button
              type="submit"
              className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-black hover:opacity-90"
              aria-label="Submit search"
            >
              <SearchIcon size={18} />
            </button>
          </div>
        </form>

        {enabled && (
          <div className="mt-6">
            {isFetching && <div className="text-sm opacity-70">Searching…</div>}
            {!isFetching && data && data.length === 0 && (
              <div className="text-sm opacity-70">No results</div>
            )}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data?.map(({ slug, title, description, lang, tags, previews }) => (
                <CourseCard
                  key={slug}
                  slug={slug}
                  title={title}
                  description={description}
                  lang={lang}
                  tags={tags}
                  slide1Html={previews?.firstHtml}
                  slide2Html={previews?.secondHtml}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
