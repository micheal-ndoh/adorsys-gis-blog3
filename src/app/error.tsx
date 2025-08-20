"use client"; // Error components must be Client Components
import "@blog/i18n/boot";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertTriangle,
  AlertCircle,
  WifiOff,
  Database,
  Lock,
  FileMinus,
  RefreshCw,
  ArrowLeft,
  Home,
} from "react-feather";

export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  const { t } = useTranslation();
  useEffect(() => {
    console.error(error);
  }, [error]);

  const meta = useMemo(() => {
    const message = error?.message ?? "";
    const name = (error?.name ?? "").toLowerCase();

    let title = t("errors.somethingWrong");
    let tone: "error" | "warning" | "info" = "error";
    let Icon = AlertTriangle;

    if (name.includes("notfound") || /not found|404/i.test(message)) {
      title = t("errors.notFound");
      tone = "warning";
      Icon = FileMinus;
    } else if (
      /unauthorized|401|forbidden|403|csrf|token/i.test(message) ||
      name.includes("auth")
    ) {
      title = "Access denied";
      tone = "warning";
      Icon = Lock;
    } else if (/network|fetch|timeout|503|502|504|dns|offline/i.test(message)) {
      title = "Network error";
      tone = "info";
      Icon = WifiOff;
    } else if (/database|sql|prisma|mongo|server/i.test(message)) {
      title = "Server error";
      Icon = Database;
    } else if (/validation|zod|invalid|schema/i.test(message)) {
      title = "Validation error";
      tone = "warning";
      Icon = AlertCircle;
    }

    let toneColor = "text-error";
    if (tone === "warning") toneColor = "text-warning";
    if (tone === "info") toneColor = "text-info";

    return { title, tone, Icon, toneColor, message };
  }, [error]);

  return (
    <div className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-base-100 shadow">
            <meta.Icon className={`h-10 w-10 ${meta.toneColor}`} aria-hidden />
          </div>

          <h1 className="text-3xl font-extrabold md:text-5xl">{meta.title}</h1>
          {meta.title !== t("errors.somethingWrong") && (
            <p className="mx-auto mt-3 max-w-xl opacity-80">
              {t("errors.somethingWrong")}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button className="btn btn-primary" onClick={() => reset()}>
              <RefreshCw className="mr-2 h-4 w-4" /> {t("errors.tryAgain")}
            </button>
            <button className="btn" onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" /> Reload
            </button>
            <button className="btn btn-outline" onClick={() => history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("errors.back")}
            </button>
            <Link className="btn btn-ghost" href="/courses">
              <Home className="mr-2 h-4 w-4" /> {t("errors.returnCourses")}
            </Link>
          </div>

          {/* Technical details intentionally hidden for end-users */}
        </div>
      </div>
    </div>
  );
}
