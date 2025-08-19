"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Search, Globe } from 'react-feather';

export default function VerticalNav() {
	const pathname = usePathname();
	const items = [
		{ href: '/', label: 'Home', icon: Home },
		{ href: '/courses', label: 'Courses', icon: BookOpen },
		{ href: '/search', label: 'Search', icon: Search },
	];

	return (
		<div className='hidden md:block fixed left-4 top-1/2 -translate-y-1/2 z-40'>
			<div className='bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20'>
				<div className='flex flex-col items-center gap-5'>
					{items.map(({ href, label, icon: Icon }) => {
						const active = pathname === href;
						return (
							<Link key={href} href={href} className='group flex flex-col items-center gap-1 text-center'>
								<div className={`p-2.5 rounded-xl border transition-all ${active ? 'bg-primary/30 border-primary/40 shadow-primary/20 text-primary' : 'bg-white/15 border-transparent text-white/80 hover:bg-primary/25 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20'}`}>
									<Icon className='w-5 h-5 group-hover:text-primary' />
								</div>
								<span className={`text-xs ${active ? 'text-primary' : 'text-white/80 group-hover:text-primary'}`}>{label}</span>
							</Link>
						);
					})}
					<div className='w-6 h-px bg-white/30 rounded-full' />
					<button aria-label='Language' className='group flex flex-col items-center gap-1 text-center'>
						<div className='p-2.5 rounded-xl border transition-all bg-white/15 border-transparent text-white/80 hover:bg-primary/25 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20'>
							<Globe className='w-5 h-5 group-hover:text-primary' />
						</div>
						<span className='text-xs text-white/80 group-hover:text-primary'>Language</span>
					</button>
				</div>
			</div>
		</div>
	);
} 