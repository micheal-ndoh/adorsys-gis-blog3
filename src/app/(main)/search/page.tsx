"use client";

import { useState } from "react";
import { api } from "@blog/trpc/react";
import { Container } from "@blog/components/container";
import { CourseCard } from "@blog/components/course";
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
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses, slides, resources..."
          className="input input-bordered input-lg w-full"
          aria-label="Search"
        />

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
