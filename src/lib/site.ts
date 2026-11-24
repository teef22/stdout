export const SITE = {
  title: "stdout",
  origin: "https://teef22.github.io",
  description: "A blog for notes, thoughts, and things worth keeping.",
};

export function sitePath(path = "") {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\/+/, "")}`;
}

export function postPath(slug: string) {
  return sitePath(`posts/${slug}/`);
}

export function tagPath(tag: string) {
  return sitePath(`tags/${tagSlug(tag)}/`);
}

export function tagSlug(tag: string) {
  return tag
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
