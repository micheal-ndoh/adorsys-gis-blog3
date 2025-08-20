"use client";

import "@blog/styles/globals.scss";
import { RefreshCw, Home, AlertTriangle } from "react-feather";

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  console.error("global app error", error);

  // Note: Global error cannot use useTranslation hook as it's outside the i18n context
  // We'll use English as fallback, but the error page will handle translations

  return (
    // global-error must include html and body tags
    <html lang="en">
      <body className="bg-base-100 text-base-content">
        <div className="hero min-h-[80vh] bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-base-100 shadow">
                <AlertTriangle className="h-10 w-10 text-error" aria-hidden />
              </div>
              <h1 className="text-3xl font-extrabold md:text-5xl">
                Something went wrong
              </h1>
              <p className="mx-auto mt-3 max-w-xl opacity-80">
                An unexpected error occurred. Please try again.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button className="btn btn-primary" onClick={() => reset()}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Try again
                </button>
                <a className="btn btn-ghost" href="/courses">
                  <Home className="mr-2 h-4 w-4" /> Home
                </a>
              </div>
              {/* Technical details intentionally hidden for end-users */}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
