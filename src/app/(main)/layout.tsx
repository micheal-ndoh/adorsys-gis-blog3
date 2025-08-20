import { AppNavBar } from "@blog/components/navbar";
import LargeFooter from "../../components/footer/large-footer";
import type { PropsWithChildren } from "react";
import { Suspense } from "react";

export default function MainLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Suspense fallback={null}>
        <div className="mb-8">
          <AppNavBar />
        </div>
      </Suspense>
      <main id="main" className="flex-1 bg-black">
        <div className="mt-4 mb-10 bg-black">{children}</div>
      </main>
      <div className="mt-8 bg-black">
        <LargeFooter />
      </div>
    </div>
  );
}
