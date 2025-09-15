"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

export function CoursesProvider({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </NuqsAdapter>
  );
}
