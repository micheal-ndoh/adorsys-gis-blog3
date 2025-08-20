import { redirect } from 'next/navigation';
import {loadRes} from "@blog/converters";
import {Container} from "@blog/components/container";
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return [
    {},
    {
      slug: 'faq',
    },
    {
      slug: 'tos',
    },
    {
      slug: 'contact',
    },
    {
      slug: 'privacy',
    },
    {
      slug: 'about',
    },
  ];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!slug) {
    return null;
  }

  const content = await loadRes(slug);
  if (!content) {
    return null;
  }

  return {
    title: `${content.title} | Learn`,
  };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  if (!slug) {
    return redirect('/courses');
  }

  if (slug === 'about') {
    return (
      <Container>
        <div className='mx-auto mt-8 sm:mt-10 max-w-6xl'>
          {/* Title */}
          <header className='text-center mb-10 sm:mb-12'>
            <h1 className='text-3xl sm:text-4xl font-extrabold'>About Adorsys GIS Blog</h1>
            <div className='mt-3 h-1 w-24 sm:w-28 bg-primary mx-auto rounded-full' />
          </header>

          {/* Our Story */}
          <section className='grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center mb-12 sm:mb-16'>
            <div>
              <h2 className='text-2xl font-bold mb-3'>Our Story</h2>
              <p className='opacity-80 mb-3'>
                Adorsys GIS Blog is more than a knowledge site — it is a community of
                curious learners and practitioners who love clear, practical content.
                We turn complex topics into approachable lessons you can apply right away.
              </p>
              <p className='opacity-80'>
                Born from the idea that sharing knowledge elevates everyone, we craft
                articles, courses, and slide decks that bring people together to learn,
                build, and grow.
              </p>
            </div>
            <div className='relative rounded-2xl overflow-hidden border border-base-300/40 bg-base-200/60'>
              <Image src='/about.png' alt='About illustration' width={900} height={600} className='w-full h-auto object-cover' />
            </div>
          </section>

          {/* Our Mission */}
          <section className='grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center'>
            <div className='order-2 md:order-1 relative rounded-2xl overflow-hidden border border-base-300/40 bg-base-200/60'>
              <Image src='/about.png' alt='Mission illustration' width={900} height={600} className='w-full h-auto object-cover' />
            </div>
            <div className='order-1 md:order-2'>
              <h2 className='text-2xl font-bold mb-3'>Our Mission</h2>
              <p className='opacity-80 mb-3'>
                Our mission is to make learning fast, enjoyable, and effective.
                We emphasise clarity, hands‑on examples, and reliable resources
                so you can move from understanding to execution with confidence.
              </p>
              <p className='opacity-80'>
                Whether you are just getting started or sharpening advanced skills,
                this space is designed to help you learn smarter and build faster.
              </p>
            </div>
          </section>
        </div>
      </Container>
    );
  }

  const content = await loadRes(slug);
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
