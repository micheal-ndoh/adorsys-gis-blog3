'use client';

import dynamic2 from "next/dynamic";

const Display = dynamic2(() => import('./display'), {
    ssr: false,
    suspense: true,
});

export default Display;