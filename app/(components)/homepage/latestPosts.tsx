import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { fetchBlogsByNumber } from "@/app/lib/notion";
import { toBlogPost } from "@/app/lib/notion-utils";
import { ColorSchema } from "../../color";

const POST_COUNT = 3;

/** The few newest posts, shown at the end of the homepage. Renders nothing when there are none. */
export default async function LatestPosts() {
  const res = await fetchBlogsByNumber(POST_COUNT);
  const posts = res.results.map(toBlogPost).filter((p) => p !== null);
  if (posts.length === 0) return null;

  return (
    <section className="px-6 pt-20 pb-24  sm:px-16 sm:pt-32">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-climate-crisis text-4xl leading-[0.9] tracking-tight sm:text-6xl">
          Latest Writing
        </h2>
        <Link
          href="/blog"
          className={`inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold transition ${ColorSchema.text_maroon} ${ColorSchema.hover_text_maroon}`}
        >
          See all posts <IoArrowForward />
        </Link>
      </div>

      <div className="mt-8 flex flex-col">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="group flex flex-col gap-2 border-b border-[#3a0a10]/10 py-5 transition hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 dark:border-white/20"
          >
            <div className="flex min-w-0 items-center gap-3">
              {post.type && (
                <span className={`shrink-0 rounded-full -skew-2 ${ColorSchema.pill_maroon} px-3 py-1 text-xs font-semibold font-mono`}>
                  <p className="skew-2">{post.type}</p>
                </span>
              )}
              <h3 className={`truncate font-mono text-lg sm:text-xl ${ColorSchema.group_hover_text_maroon}`}>
                {post.title}
              </h3>
            </div>
            {post.published && (
              <span className={`shrink-0 text-xs ${ColorSchema.muted_text}`}>
                {new Date(post.published).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
