import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  cover: string | null;
  tags: string[];
  type: string | null;
  published: string | null;
};

function isFullPage(page: unknown): page is PageObjectResponse {
  return Boolean(page && typeof page === "object" && "properties" in page);
}

export function toBlogPost(page: unknown): BlogPost | null {
  if (!isFullPage(page)) return null;
  const props = page.properties;

  const title =
    props.Name?.type === "title"
      ? props.Name.title.map((t) => t.plain_text).join("")
      : "Untitled";

  const summary =
    props.Summary?.type === "rich_text"
      ? props.Summary.rich_text.map((t) => t.plain_text).join("")
      : "";

  const coverFile =
    props.coverImage?.type === "files" ? props.coverImage.files[0] : undefined;
  const cover = coverFile
    ? coverFile.type === "file"
      ? coverFile.file.url
      : coverFile.type === "external"
        ? coverFile.external.url
        : null
    : page.cover
      ? page.cover.type === "file"
        ? page.cover.file.url
        : page.cover.external.url
      : null;

  const tags =
    props.tags?.type === "multi_select"
      ? props.tags.multi_select.map((t) => t.name)
      : [];

  const type = props.Type?.type === "select" ? (props.Type.select?.name ?? null) : null;

  const published =
    props.Published?.type === "date" ? (props.Published.date?.start ?? null) : null;

  return { id: page.id, title, summary, cover, tags, type, published };
}
