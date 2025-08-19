'use client';

import '@blog/styles/globals.scss';
import { RefreshCw, Home, AlertTriangle } from 'react-feather';

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  console.error('global app error', error);
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
              <h1 className="text-3xl font-extrabold md:text-5xl">Something went wrong</h1>
              <p className="mx-auto mt-3 max-w-xl opacity-80">
                An unexpected error occurred at the application level.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button className="btn btn-primary" onClick={() => reset()}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Try again
                </button>
                <a className="btn btn-ghost" href="/">
                  <Home className="mr-2 h-4 w-4" /> Home
                </a>
              </div>
              <details className="collapse collapse-arrow mt-8 border border-base-300 bg-base-100">
                <summary className="collapse-title text-left text-sm font-medium">Technical details</summary>
                <div className="collapse-content text-left">
                  <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words text-xs opacity-80">
                    {error?.stack ?? String(error)}
                  </pre>
                  {error?.digest ? (
                    <div className="mt-2 text-xs opacity-70">Digest: {error.digest}</div>
                  ) : null}
                </div>
              </details>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
