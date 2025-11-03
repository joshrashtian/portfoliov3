"use server";

import { notion } from "./notion-client";
    
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