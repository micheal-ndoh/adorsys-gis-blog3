"use client";

import { useState } from "react";
import { api } from "@blog/trpc/react";
import { Container } from "@blog/components/container";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const enabled = query.trim().length > 0;
  const { data, isFetching } = api.search.query.useQuery(
    { q: query, limit: 25 },
    { enabled }
  );

  return (
    <Container>
      <div className="mx-auto max-w-3xl">
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
            {data && data.length === 0 && (
              <div className="text-sm opacity-70">No results</div>
            )}
            <ul className="space-y-4">
              {data?.map((r) => (
                <li key={r.id} className="rounded-box border p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="badge badge-sm">{r.type}</span>
                    <Link
                      href={r.url}
                      className="link link-hover text-lg font-semibold"
                    >
                      {r.title}
                    </Link>
                  </div>
                  {r.snippet && (
                    <p className="text-sm opacity-80">{r.snippet}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Container>
  );
}
