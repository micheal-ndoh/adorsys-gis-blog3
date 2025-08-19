'use client';

import dynamic from 'next/dynamic';

const ThemeToggleRender = dynamic(() => import('./button'), {
  loading: () => <span className='loading loading-sm' />,
});

export function ThemeToggle() {
  return <ThemeToggleRender />;
}
