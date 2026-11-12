import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { IoArrowBack } from "react-icons/io5";
import { ColorSchema } from "../../../color";
import { coverFor } from "../../../extra/games/covers";
import { platformName, ratingTone } from "../../GameCase";
import { getReviews } from "../../reviews";
import { ReviewBody } from "./ReviewBody";

type Props = { params: Promise<{ id: string }> };

/* One page per review note, built ahead; any other id is a 404. */
export const dynamicParams = false;

export async function generateStaticParams() {
  return [...(await getReviews()).keys()].map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const review = (await getReviews()).get(id);
  if (!review) return {};

  const title = `${review.game.title} Review | Joshua Rashtian`;
  const description = review.excerpt || undefined;
  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: review.reviewed ?? undefined,
      images: review.headerImg ? [review.headerImg] : undefined,
    },
  };
}

/** "7 Mar 2026" */
const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const RULE = "border-dotted border-[#3a0a10]/25 dark:border-white/20";

export default async function ReviewPage({ params }: Props) {
  const { id } = await params;
  const review = (await getReviews()).get(id);
  if (!review) notFound();

  const { game, headerImg, reviewed, body, minutes } = review;
  const cover = coverFor(game.slug);

  const facts = [
    { label: "Platform", value: platformName(game) },
    game.completed
      ? { label: "Finished", value: longDate(game.completed) }
      : game.status
        ? { label: "Status", value: game.status }
        : null,
    game.genres.length
      ? {
          label: game.genres.length === 1 ? "Genre" : "Genres",
          value: game.genres.join(", "),
        }
      : null,
    { label: "Read", value: `${minutes} min` },
  ].filter((fact) => fact != null);

  return (
    <article className={`min-h-screen pb-24 ${ColorSchema.ink_text}`}>
      {/* Key art, fading into the page. Without one, a wash of the spine colour. */}
      <div
        className="relative h-[42vh] min-h-72 w-full overflow-hidden sm:h-[58vh]"
        style={{ "--art": cover?.spine ?? "#7a1620" } as CSSProperties}
      >
        {headerImg ? (
          <Image
            src={headerImg}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--art),transparent_70%)] opacity-50" />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-background/0 via-background/25 to-background" />
      </div>

      <div className="relative mx-auto -mt-36 max-w-3xl px-6 sm:-mt-48">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
          {cover ? (
            <Image
              src={cover.src}
              alt={`${game.title} cover`}
              sizes="(min-width: 640px) 176px, 128px"
              priority
              className="h-auto w-32 shrink-0 rounded-[3px] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.55)] ring-1 ring-black/10 sm:w-44"
            />
          ) : null}
          <div className="min-w-0">
            <p
              className={`font-mono text-xs uppercase tracking-[0.2em] ${ColorSchema.muted_text}`}
            >
              <Link
                href="/shelf"
                className={`underline decoration-dotted underline-offset-4 ${ColorSchema.hover_text_maroon}`}
              >
                Shelf
              </Link>{" "}
              / Review
              {reviewed ? (
                <>
                  {" · "}
                  <time dateTime={reviewed}>{longDate(reviewed)}</time>
                </>
              ) : null}
            </p>
            <h1 className="mt-3 font-climate-crisis text-4xl leading-[0.95] tracking-tight sm:text-6xl">
              {game.title}
            </h1>
          </div>
        </header>

        <dl
          className={`mt-10 flex flex-wrap items-end gap-x-10 gap-y-5 border-y py-5 ${RULE}`}
        >
          {/* A 0 is a backlog placeholder, not a score. */}
          {game.rating ? (
            <div>
              <dt
                className={`font-mono text-xs uppercase tracking-[0.2em] ${ColorSchema.muted_text}`}
              >
                Score
              </dt>
              <dd className="mt-1 flex items-baseline gap-1">
                <span
                  className={`font-mono text-5xl leading-none ${ratingTone(game.rating)}`}
                >
                  {game.rating}
                </span>
                <span className={`font-mono text-sm ${ColorSchema.muted_text}`}>
                  /100
                </span>
              </dd>
            </div>
          ) : null}
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt
                className={`font-mono text-xs uppercase tracking-[0.2em] ${ColorSchema.muted_text}`}
              >
                {fact.label}
              </dt>
              <dd className="mt-1 font-mono text-sm">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12">
          <ReviewBody markdown={body} />
        </div>

        <footer className={`mt-16 border-t pt-6 ${RULE}`}>
          <Link
            href="/shelf"
            className={`inline-flex items-center gap-2 font-mono text-sm ${ColorSchema.muted_text} ${ColorSchema.hover_text_maroon}`}
          >
            <IoArrowBack aria-hidden /> Back to the shelf
          </Link>
        </footer>
      </div>
    </article>
  );
}
