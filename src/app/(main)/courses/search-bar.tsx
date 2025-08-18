'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {useCallback, useEffect, useMemo, useState} from 'react';

type Props = {
    selectedLang: string;
    query: string;
};

export function CoursesSearchBar({ selectedLang, query }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [q, setQ] = useState(query);

    useEffect(() => {
        setQ(query);
    }, [query]);

    const makeUrl = useCallback((next: { lang?: string; q?: string }) => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        if (next.lang !== undefined) {
            if (!next.lang || next.lang === 'all') params.delete('lang');
            else params.set('lang', next.lang);
        }
        if (next.q !== undefined) {
            if (!next.q) params.delete('q');
            else params.set('q', next.q);
        }
        const qs = params.toString();
        return qs ? `/courses?${qs}` : '/courses';
    }, [searchParams]);

    const onSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        router.push(makeUrl({ q }));
    }, [router, makeUrl, q]);

    const options = useMemo(() => ([
        { key: 'all', label: 'All' },
        { key: 'en', label: 'EN' },
        { key: 'fr', label: 'FR' },
    ]), []);

    return (
        <div className="rounded-2xl border border-base-300/30 bg-base-200/60 p-6 ring-1 ring-white/5">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span className="i-[search]">🔍</span>
                </div>
                <h2 className="text-lg font-semibold">Discover Your Next Lesson</h2>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search lessons, topics, or skills..."
                    className="input input-bordered w-full"
                />

                <div className="flex items-center gap-3">
                    <span className="text-sm opacity-80">Language:</span>
                    <div className="join">
                        {options.map((opt) => (
                            <button
                                key={opt.key}
                                type="button"
                                className={`btn btn-sm join-item ${selectedLang === opt.key ? 'btn-primary' : ''}`}
                                onClick={() => router.push(makeUrl({ lang: opt.key }))}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                    <div className="ml-auto">
                        <button type="submit" className="btn btn-accent btn-sm">Search</button>
                    </div>
                </div>
            </form>
        </div>
    );
}


