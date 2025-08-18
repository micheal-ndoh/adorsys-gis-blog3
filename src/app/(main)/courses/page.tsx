import Link from 'next/link';
import {getAllBlogs} from '@blog/server/blog';
import {loadBlog} from '@blog/converters';
import {Container} from '@blog/components/container';
import {CourseCard} from '@blog/components/course';

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
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

	return (
		<Container>
			<div className='mb-6 flex items-center justify-between'>
				<h1 className='text-3xl font-bold'>Courses</h1>
				<span className='badge badge-primary badge-lg'>{courses.length} courses available</span>
			</div>

			<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
				{courses.map(({ slug, title, description, lang }) => (
					<CourseCard key={slug} slug={slug} title={title} description={description} lang={lang} />
				))}
			</div>
		</Container>
	);
} 