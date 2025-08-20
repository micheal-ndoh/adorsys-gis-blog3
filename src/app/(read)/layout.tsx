import {Container} from "@blog/components/container";
import Link from "next/link";
import Image from "next/image";
import icon from "@blog/components/icon.svg";
import type {PropsWithChildren} from "react";

export default function MainLayout({
                                       children,
                                   }: Readonly<PropsWithChildren>) {
    return (
        <>
            <div className='sticky top-0 z-40 bg-base-300'>
                <Container className='py-0'>
                    <nav className='navbar min-h-16'>
                        <div className='navbar-start flex gap-2 sm:gap-4'>
                            <Link href='/courses' className='flex flex-row items-center gap-1.5 sm:gap-2'>
                                <Image src={icon} className='w-6 sm:w-8' alt='logo'/>
                                <span className='text-lg sm:text-xl font-extrabold uppercase' color='ghost'>Learn</span>
                            </Link>
                        </div>

                        <div className='navbar-end flex gap-2 sm:gap-4'>
                        </div>
                    </nav>
                </Container>
            </div>

            <div id='read'>{children}</div>
        </>
    );
}
