"use client";

import Link from "next/link";
import { FileMinus, Search, Home } from "react-feather";
import { useTranslation } from "react-i18next";
import "@blog/i18n/boot";
import { Container } from "@blog/components/container";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Container>
      <div className="hero min-h-[60vh] bg-base-200 rounded-2xl mt-6">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-base-100 shadow">
              <FileMinus className="h-10 w-10 text-warning" aria-hidden />
            </div>
            <h1 className="text-3xl font-extrabold md:text-5xl">
              {t("errors.notFound")}
            </h1>
            <p className="mx-auto mt-3 max-w-xl opacity-80">
              {t("errors.notFoundDesc")}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link className="btn btn-outline" href="/">
                <Home className="mr-2 h-4 w-4" /> {t("errors.returnHome")}
              </Link>
              <Link className="btn btn-primary" href="/courses">
                <Search className="mr-2 h-4 w-4" /> {t("errors.returnCourses")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
