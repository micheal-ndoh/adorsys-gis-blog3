'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ThemeToggleRender = dynamic(() => import('./button'), { suspense: true });

export function ThemeToggle() {
  return (
    <Suspense fallback={<span className='loading loading-sm' />}>
      <ThemeToggleRender />
    </Suspense>
  );
}
