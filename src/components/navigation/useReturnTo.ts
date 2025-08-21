"use client";

import { usePathname, useSearchParams } from "next/navigation";

export function useReturnTo(): string {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const current = `${pathname}${queryString ? `?${queryString}` : ""}`;
  return current || "/courses";
}


