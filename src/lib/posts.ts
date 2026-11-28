import { getCollection, type CollectionEntry } from "astro:content";
import { tagSlug } from "./site";

export type Post = CollectionEntry<"posts">;

export type TagGroup = {
  name: string;
  slug: string;
  posts: Post[];
  count: number;
};

type GetPostsOptions = {
  includeDrafts?: boolean;
};

export async function getPosts(
  { includeDrafts = import.meta.env.DEV }: GetPostsOptions = {},
): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => {
    return includeDrafts || !data.draft;
  });

  return posts.sort((a, b) => {
    const byDate = b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
    return byDate || a.id.localeCompare(b.id);
  });
}

export function readingTime(content = "") {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export function getTagGroups(posts: Post[]): TagGroup[] {
  const groups = new Map<string, { name: string; posts: Map<string, Post> }>();

  for (const post of posts) {
    for (const rawTag of post.data.tags) {
      const name = rawTag.trim();
      if (!name) continue;

      const slug = tagSlug(name);
      const group = groups.get(slug) ?? {
        name,
        posts: new Map<string, Post>(),
      };
      group.posts.set(post.id, post);
      groups.set(slug, group);
    }
  }

  return [...groups.entries()]
    .map(([slug, group]) => {
      const tagPosts = [...group.posts.values()];
      return {
        name: group.name,
        slug,
        posts: tagPosts,
        count: tagPosts.length,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
