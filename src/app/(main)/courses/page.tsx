import Link from 'next/link';
import {getAllBlogs} from '@blog/server/blog';
import {loadBlog} from '@blog/converters';
import {Container} from '@blog/components/container';
import {CourseCard} from '@blog/components/course';
import {CoursesSearchBar} from './search-bar';

export const dynamic = 'force-dynamic';

type Props = { searchParams?: Promise<{ q?: string; lang?: string }> };

export default async function CoursesPage({ searchParams }: Props) {
	const params = await searchParams;
	const selected = (params?.lang ?? 'all').toLowerCase();
	const q = (params?.q ?? '').toLowerCase();

	const slugs = await getAllBlogs();
	const courses = await Promise.all(
		slugs.map(async (slug) => {
			const {course} = await loadBlog(slug);
			const plain = course?.content
				?.replace(/<[^>]+>/g, ' ')
				.replace(/\s+/g, ' ')
				.trim();
			const lang = typeof (course as any)?.lang === 'string' ? (course as any).lang : undefined;
			return { slug, title: course?.title ?? slug, description: plain, lang };
		})
	);

	const filtered = courses.filter(({ title, description, lang }) => {
		const matchesLang = selected === 'all' || (lang ?? 'en').toLowerCase() === selected;
		const hay = `${title} ${description ?? ''}`.toLowerCase();
		const matchesQuery = q.length === 0 || hay.includes(q);
		return matchesLang && matchesQuery;
	});

	return (
		<Container>
			<div className='mb-6 space-y-4'>
				<div className='flex items-center justify-between'>
					<h1 className='text-3xl font-bold'>Courses</h1>
					<span className='badge badge-primary badge-lg'>{filtered.length} courses available</span>
				</div>
				<CoursesSearchBar selectedLang={selected} query={q} />
			</div>

			<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
				{filtered.map(({ slug, title, description, lang }) => (
					<CourseCard key={slug} slug={slug} title={title} description={description} lang={lang} />
				))}
			</div>
		</Container>
	);
} 