"use server";

import { NotionRenderer } from "@notion-render/client";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import hljsPlugin from "@notion-render/hljs-plugin";
import { notion } from "./notion-client";
import { toBlogPost } from "./notion-utils";

export async function fetchBlogPost(pageId: string) {
  const page = await notion.pages.retrieve({ page_id: pageId });
  return toBlogPost(page);
}

export async function fetchBlogContentHtml(pageId: string) {
  const renderer = new NotionRenderer({ client: notion });
  await renderer.use(bookmarkPlugin(undefined), hljsPlugin({}));
  return renderer.renderBlock(pageId);
}

export async function fetchBlogs() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
    page_size: 7,
  });
  return res;
}

export async function fetchBlogsByNumber(number: number) {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
    page_size: number,
  });
  return res;
}