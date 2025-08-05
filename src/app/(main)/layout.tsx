import {AppNavBar} from '@blog/components/navbar';
import LargeFooter from '../../components/footer/large-footer';
import type {PropsWithChildren} from "react";

export default function MainLayout({
                                       children,
                                   }: Readonly<PropsWithChildren>) {
    return (
        <>
            <AppNavBar/>
            <div id='main'>{children}</div>
            <LargeFooter/>
        </>
    );
}
