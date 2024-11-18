// src/app/blog/[slug]/page.tsx
import { getPost } from '@/data/blog';
import { formatDate } from '@/lib/utils';
import PillNavigation from '@/components/PillNavigation';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Props = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PillNavigation headings={post.headings} />
      <section className="max-w-3xl mx-auto p-4 my-24">
        <article className="prose dark:prose-invert">
          <h1>{post.metadata.title}</h1>
          <p className="text-sm text-gray-500">
            {formatDate(post.metadata.publishedAt)}
          </p>
          {post.metadata.image && (
            <div className="my-4">
              <Image
                src={post.metadata.image}
                alt={post.metadata.title}
                width={800}
                height={400}
                className="rounded-md"
              />
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </article>
      </section>
    </>
  );
}