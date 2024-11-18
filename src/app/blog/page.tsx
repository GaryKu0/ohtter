// src/app/blog/page.tsx
import { getAllPosts } from '@/data/blog';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import BlurFade from '@/components/ui/blur-fade'; // Optional: If you have a BlurFade component
import { Header } from '@/components/header';

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Header/>
      </BlurFade>
    <section className="max-w-3xl mx-auto p-4 my-24">
      {/* <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">Blog</h1>
      </BlurFade> */}
      {posts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
            <Link
              className="flex flex-col space-y-1 mb-4 hover:text-blue-500 transition-colors"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <p className="tracking-tight text-lg font-semibold">
                  {post.metadata.title}
                </p>
                <p className="h-6 text-xs text-gray-500">
                  {formatDate(post.metadata.publishedAt)}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                {post.metadata.summary}
              </p>
            </Link>
          </BlurFade>
        ))}
    </section>
    </>
  );
}