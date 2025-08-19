'use client';

import dynamic2 from "next/dynamic";
import { Skeleton } from "@blog/components/loading";

const Display = dynamic2(() => import('./display'), {
    ssr: false,
    loading: () => <Skeleton className="h-64 w-full mb-8" />,
});

export default Display;


