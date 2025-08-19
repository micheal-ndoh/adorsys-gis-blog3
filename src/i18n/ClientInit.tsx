"use client";

import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { i18nFn } from "@blog/i18n";

export function I18nInit({ children }: PropsWithChildren) {
  useEffect(() => {
    void i18nFn();
  }, []);
  return children as any;
}
