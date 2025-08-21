import { AppNavBar } from "@blog/components/navbar";
import type {PropsWithChildren} from "react";
import { Suspense } from "react";

export default function MainLayout({
                                       children,
                                   }: Readonly<PropsWithChildren>) {
    return (
        <>
            <Suspense fallback={null}>
                <AppNavBar />
            </Suspense>

            <div id='read'>{children}</div>
        </>
    );
}
