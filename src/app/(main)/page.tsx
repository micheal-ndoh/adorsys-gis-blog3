import Link from 'next/link';
import {getAllBlogMeta} from "@blog/server/blog";
import {Suspense} from 'react';
import {LanguageSelector} from './selector';

type Props = {
  searchParams?: Promise<{ lang?: string }>
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const selected = (params?.lang ?? 'all').toLowerCase();
  const meta = await getAllBlogMeta();
  const filtered = meta.filter(m => {
    if (selected === 'all') return true;
    if (selected === 'en' || selected === 'fr') return (m.lang ?? 'en').toLowerCase() === selected;
    return true;
  });
  
  return (
    <div>
      <div className='hero min-h-[calc(50vh)] my-4'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Hello there</h1>
            <p className='py-6'>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
              a id nisi.
            </p>
            <Link href='/courses' className='btn btn-primary'>
              Get Started
            </Link>
          </div>
        </div>
      </div>
      
      <div className='max-w-md mx-auto mb-6'>
        <Suspense>
          <LanguageSelector selected={selected} />
        </Suspense>
      </div>

      <div className='grid grid-cols-2 gap-6'>
        {filtered.map((b) => (
          <div key={b.slug} className='card bg-base-200 shadow-sm'>
            <div className='card-body'>
              <h2 className='card-title'>{b.title ?? b.slug}</h2>
              {b.description && (<p className='opacity-80'>{b.description}</p>)}
              <div className='card-actions justify-between items-center mt-2'>
                <span className='badge badge-outline'>{(b.lang ?? 'en').toUpperCase()}</span>
                <Link className='btn btn-sm btn-primary' href={`/b/${b.slug}`}>Open</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
