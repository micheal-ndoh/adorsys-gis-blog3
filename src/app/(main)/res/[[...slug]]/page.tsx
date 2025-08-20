import { redirect } from 'next/navigation';
import {loadRes} from "@blog/converters";
import {Container} from "@blog/components/container";
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return [
    {},
    { slug: ['faq'] },
    { slug: ['tos'] },
    { slug: ['contact'] },
    { slug: ['privacy'] },
    { slug: ['about'] },
  ];
}

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const slugStr = Array.isArray(slug) ? slug.join('/') : '';
  if (!slugStr) {
    return null;
  }

  const content = await loadRes(slugStr);
  if (!content) {
    return null;
  }

  return {
    title: `${content.title} | Learn`,
  };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const slugStr = Array.isArray(slug) ? slug[0] : '';
  if (!slugStr) {
    return redirect('/courses');
  }

  if (slugStr === 'about') {
    return (
      <Container>
        <div className='mx-auto mt-8 sm:mt-10 max-w-6xl'>
          {/* Title */}
          <header className='text-center mb-10 sm:mb-12'>
            <h1 className='text-4xl sm:text-5xl font-extrabold'>About Adorsys GIS Blog</h1>
            <div className='mt-3 h-1 w-24 sm:w-28 bg-primary mx-auto rounded-full' />
          </header>

          {/* Our Story */}
          <section className='grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center mb-12 sm:mb-16'>
            <div>
              <h2 className='text-3xl font-bold mb-3'>Our Story</h2>
              <p className='text-base sm:text-lg opacity-80 mb-3'>
                Adorsys GIS Blog is more than a knowledge site — it is a community of
                curious learners and practitioners who love clear, practical content.
                We turn complex topics into approachable lessons you can apply right away.
              </p>
              <p className='text-base sm:text-lg opacity-80'>
                Born from the idea that sharing knowledge elevates everyone, we craft
                articles, courses, and slide decks that bring people together to learn,
                build, and grow.
              </p>
            </div>
            <FramedImage />
          </section>

          {/* Our Mission */}
          <section className='grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center'>
            <div className='order-2 md:order-1'>
              <FramedImage />
            </div>
            <div className='order-1 md:order-2'>
              <h2 className='text-3xl font-bold mb-3'>Our Mission</h2>
              <p className='text-base sm:text-lg opacity-80 mb-3'>
                Our mission is to make learning fast, enjoyable, and effective.
                We emphasise clarity, hands‑on examples, and reliable resources
                so you can move from understanding to execution with confidence.
              </p>
              <p className='text-base sm:text-lg opacity-80'>
                Whether you are just getting started or sharpening advanced skills,
                this space is designed to help you learn smarter and build faster.
              </p>
            </div>
          </section>
        </div>
      </Container>
    );
  }

  const content = await loadRes(slugStr);
  return (
    <Container>
      <div className='prose prose-neutral mx-auto mt-6 sm:mt-8'>
        {content.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
        )}
      </div>
    </Container>
  );
}

// Image block with layered rounded frames (no overlapping image), plus a subtle glass card at bottom
function FramedImage() {
  return (
    <div className='relative h-64 sm:h-72 lg:h-80'>
      {/* back frames */}
      <div className='absolute inset-0 -translate-x-2 -translate-y-2 rounded-3xl bg-purple-600/20 ring-2 ring-purple-400/40 shadow-[0_10px_30px_rgba(168,85,247,0.25)]' />
      <div className='absolute inset-0 translate-x-2 translate-y-2 rounded-3xl bg-teal-500/20 ring-2 ring-teal-300/40 shadow-[0_10px_30px_rgba(45,212,191,0.25)]' />

      {/* main image card */}
      <div className='absolute inset-0 rounded-3xl overflow-hidden border border-white/20 bg-base-200/60'>
        <Image src='/about.png' alt='About visual' width={1200} height={800} className='w-full h-full object-cover' />
      </div>

      {/* bottom glass overlay bar */}
      <div className='absolute left-6 right-6 bottom-4 rounded-2xl border border-white/15 bg-black/60 shadow-xl p-4'>
        <div className='flex items-center gap-2 text-white/90'>
          <span className='inline-block w-2.5 h-2.5 rounded-full bg-emerald-400' />
          <span className='text-sm font-semibold tracking-wide'>Live Session</span>
        </div>
        <div className='mt-2 h-2 w-2/3 rounded bg-white/20' />
      </div>
    </div>
  );
}
