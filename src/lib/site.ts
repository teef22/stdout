export const SITE = {
  title: "stdout",
  description: "A blog for notes, thoughts, and things worth keeping.",
  author: "teef22",
  language: "en",
  themeColor: {
    light: "#f7f8f4",
    dark: "#101512",
  },
};

export function sitePath(path = "") {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}${path.replace(/^\/+/, "")}`;
}

export function postPath(slug: string) {
  return sitePath(`posts/${slug}/`);
}

export function tagPath(tag: string) {
  return sitePath(`tags/${tagSlug(tag)}/`);
}

function shortHash(value: string) {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.codePointAt(0)!) | 0;
  }
  return (hash >>> 0).toString(36).slice(0, 6);
}

export function tagSlug(tag: string) {
  const slug = tag
    .normalize("NFKC")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(
      /[^\p{L}\p{N}-]/gu,
      (char) => `-${char.codePointAt(0)!.toString(16)}-`,
    )
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `tag-${shortHash(tag)}`;
}

const dateFormatter = new Intl.DateTimeFormat(SITE.language, {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(date: Date) {
  return dateFormatter.format(date);
}

export function absoluteUrl(path: string, origin: URL | string) {
  return new URL(path, origin).toString();
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
