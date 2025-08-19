import Link from 'next/link';
import {BookOpen} from 'react-feather';

interface CourseCardProps {
	slug: string;
	title: string;
	description?: string;
	lang?: string;
}

export function CourseCard({ slug, title, description, lang }: CourseCardProps) {
	return (
		<Link
			href={`/b/${slug}`}
			className='relative overflow-hidden rounded-2xl border border-base-300/30 bg-base-200/60 ring-1 ring-white/5 transition-all hover:border-primary/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]'
			aria-label={`Open course ${title}`}
		>
			{lang && (
				<span className='absolute right-4 top-4 z-10 badge badge-outline uppercase'>
					{lang}
				</span>
			)}
			{/* Grid background overlay */}
			<div
				className='pointer-events-none absolute inset-0 opacity-[0.25]'
				style={{
					backgroundImage:
						'linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)',
					backgroundSize: '32px 32px',
				}}
			/>
			{/* Glow */}
			<div className='pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-primary/10 blur-2xl' />
			<div className='pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-secondary/10 blur-2xl' />

			<div className='relative p-6 sm:p-7 md:p-8'>
				<div className='flex items-center gap-3'>
					<div className='mx-auto -mt-10 mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-[0_0_35px_rgba(59,130,246,0.25)]'>
						<BookOpen size={28} />
					</div>
				</div>
				<h3 className='mb-2 text-xl font-semibold'>{title}</h3>
				{description && (
					<p className='mb-4 line-clamp-3 text-sm opacity-80'>{description}</p>
				)}

				<div className='flex items-center justify-end'>
					<span className='btn btn-accent btn-sm rounded-full'>Open</span>
				</div>
			</div>
		</Link>
	);
} 