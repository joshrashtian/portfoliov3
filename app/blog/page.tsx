import Link from "next/link";
import Image from "next/image";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { fetchBlogs } from "@/app/lib/notion";
import { toBlogPost } from "@/app/lib/notion-utils";

export const metadata = {
  title: "Blog | Joshua Rashtian",
  description: "Writing from Joshua Rashtian.",
};

export const revalidate = 3600;

export default async function BlogIndexPage() {
  const res = await fetchBlogs();
  const posts = res.results.map(toBlogPost).filter((p) => p !== null);

  return (
    <div className="flex min-h-screen justify-center px-6 py-16 font-sans sm:px-16 dark:bg-black">
      <main className="w-full max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <IoArrowBack /> Back home
        </Link>

        <h1 className="mt-6 font-climate-crisis text-6xl leading-[0.9] tracking-tight sm:text-8xl">
          The Blog
        </h1>
        <p className="mt-4 max-w-lg text-base text-zinc-600 dark:text-zinc-400">
          Notes, projects, and whatever else I&apos;m thinking about.
        </p>

        {posts.length === 0 ? (
          <div className="mt-16 rounded-xl border-2 border-dashed border-black/20 p-10 text-center text-zinc-500 dark:border-white/20 dark:text-zinc-400">
            No published posts yet — check back soon.
          </div>
        ) : (
          <div className="mt-12 flex flex-col gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group flex flex-col-reverse gap-4 overflow-hidden rounded-xl border-2 border-black bg-stone-50 p-6 transition hover:-translate-y-0.5 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:border-white dark:bg-zinc-950"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
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
                  <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{post.title}</h2>
                  {post.summary && (
                    <p className="mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
                      {post.summary}
                    </p>
                  )}
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
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 transition group-hover:gap-2.5">
                    Read post <IoArrowForward />
                  </span>
                </div>

                {post.cover && (
                  <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg border border-black/10 sm:h-28 sm:w-44 dark:border-white/10">
                    <Image
                      src={post.cover}
                      alt=""
                      fill
                      sizes="176px"
                      className="object-cover"
                    />
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
