import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { fetchBlogContentHtml, fetchBlogPost } from "@/app/lib/notion";
import "@notion-render/client/dist/theme.css";
import "./notion-content.css";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchBlogPost(id).catch(() => null);
  if (!post) return { title: "Blog | Joshua Rashtian" };
  return {
    title: `${post.title} | Joshua Rashtian`,
    description: post.summary || undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchBlogPost(id).catch(() => null);
  if (!post) notFound();

  const html = await fetchBlogContentHtml(id);

  return (
    <div className="flex min-h-screen justify-center px-6 py-16 font-sans sm:px-16 dark:bg-black">
      <main className="w-full max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <IoArrowBack /> Back to blog
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {post.type && (
            <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-black">
              {post.type}
            </span>
          )}
          {post.published && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {new Date(post.published).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        <h1 className="mt-4 font-climate-crisis text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          {post.title}
        </h1>

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-300 px-2.5 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.cover && (
          <div className="relative mt-8 h-56 w-full overflow-hidden rounded-xl border-2 border-black sm:h-80 dark:border-white">
            <Image src={post.cover} alt="" fill sizes="768px" className="object-cover" />
          </div>
        )}

        <div
          className="notion-render mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    </div>
  );
}
