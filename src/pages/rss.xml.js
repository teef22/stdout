import rss from "@astrojs/rss";
import { getPosts } from "../lib/posts";
import { SITE, postPath } from "../lib/site";

export async function GET(context) {
  const posts = await getPosts();

  return rss({
    title: `${SITE.title} — by ${SITE.author}`,
    description: SITE.description,
    site: new URL(import.meta.env.BASE_URL, context.site).toString(),
    items: posts
      .filter((post) => !post.data.draft)
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: postPath(post.id),
      })),
    customData: "<language>en-us</language>",
  });
}
