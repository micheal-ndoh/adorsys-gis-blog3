'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen } from 'react-feather';

interface CourseCardProps {
	slug: string;
	title: string;
	slide1Html?: string;
	slide2Html?: string;
	description?: string;
	lang?: string;
}

export function CourseCard({ slug, title, description, lang, slide1Html, slide2Html }: CourseCardProps) {
	return (
		<Link
			href={`/b/${slug}`}
			className='group relative overflow-hidden rounded-2xl border border-base-300/30 bg-base-200/60 ring-1 ring-white/5 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transform-gpu hover:-translate-y-0.5 hover:scale-[1.01]'
			aria-label={`Open course ${title}`}
		>
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration: 0.35, ease: 'easeOut' }}
			>
				{lang && (
					<span className='absolute right-4 top-4 z-10 badge badge-primary uppercase'>
						{lang}
					</span>
				)}
				{/* Gradient border accent on hover */}
				<div className='pointer-events-none absolute inset-0 rounded-2xl p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/40' />
				{/* Grid background overlay */}
				<div
					className='pointer-events-none absolute inset-0 opacity-[0.22]'
					style={{
						backgroundImage:
							'linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)',
						backgroundSize: '32px 32px',
					}}
				/>
				{/* Glow */}
				<div className='pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-primary/20 blur-2xl' />
				<div className='pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-accent/20 blur-2xl' />

				{/* Preview slide area - larger and immersive */}
				{slide1Html ? (
					<div className='relative w-full overflow-hidden bg-base-200/80'>
						<div className='relative aspect-[16/9] sm:aspect-[16/8] md:h-56 lg:h-64 xl:h-72'>
							<div className='slide-preview absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0'>
								<div className='slide-preview-inner p-3 sm:p-4'>
									<div className='prose prose-neutral' dangerouslySetInnerHTML={{ __html: slide1Html! }} />
								</div>
							</div>
							{(slide2Html ?? '').trim().length > 0 && (
								<div className='slide-preview absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100'>
									<div className='slide-preview-inner p-3 sm:p-4'>
										<div className='prose prose-neutral' dangerouslySetInnerHTML={{ __html: slide2Html! }} />
									</div>
								</div>
							)}
						</div>
					</div>
				) : (
					<div className='relative w-full overflow-hidden bg-base-200/80'>
						<div className='relative aspect-[16/9] sm:aspect-[16/8] md:h-56 lg:h-64 xl:h-72'>
							<div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-base-200 to-accent/10' />
						</div>
					</div>
				)}

				<div className='relative p-6 sm:p-7 md:p-8 pb-16 pr-20'>
					<h3 className='mb-2 text-xl font-semibold transition-colors group-hover:text-primary'>{title}</h3>
					{description && (
						<p className='mb-4 line-clamp-3 text-sm opacity-80'>{description}</p>
					)}
				</div>

				{/* Consistent bottom-right Open button */}
				<span className='absolute bottom-4 right-4 z-10 btn btn-primary btn-sm rounded-full shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'>Open</span>
			</motion.div>
		</Link>
	);
}
