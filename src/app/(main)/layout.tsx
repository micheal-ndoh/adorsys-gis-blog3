import {AppNavBar} from '@blog/components/navbar';
import LargeFooter from '../../components/footer/large-footer';
import type {PropsWithChildren} from "react";
import VerticalNav from '@blog/components/side/vertical-nav';

export default function MainLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return (
		<div className='min-h-screen flex flex-col'>
			<AppNavBar/>
			<VerticalNav />
			<main id='main' className='flex-1'>
				{children}
			</main>
			<LargeFooter/>
		</div>
	);
}
