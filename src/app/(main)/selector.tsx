"use client";

import {usePathname, useRouter, useSearchParams} from 'next/navigation';

type Props = {
    selected: string;
}

export function LanguageSelector({ selected }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const next = e.target.value;
        const usp = new URLSearchParams(params?.toString());
        if (next === 'all') {
            usp.delete('lang');
        } else {
            usp.set('lang', next);
        }
        const query = usp.toString();
        router.push(query ? `${pathname}?${query}` : pathname);
    }

    return (
        <select className="select select-bordered w-full" value={selected} onChange={onChange}>
            <option value="all">All languages</option>
            <option value="en">English</option>
            <option value="fr">French</option>
        </select>
    );
}


