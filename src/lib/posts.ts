import { getCollection } from "astro:content";

export async function getPosts() {
  const posts = await getCollection("posts", ({ data }) => {
    return import.meta.env.DEV || !data.draft;
  });

  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}
