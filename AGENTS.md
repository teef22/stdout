# stdout — project instructions

`stdout` is a small static Astro blog published on GitHub Pages at
`https://teef22.github.io/stdout/`. Posts are Markdown files committed to Git.
The interface is intentionally terminal-inspired and minimal. Preserve that
design unless the user explicitly asks for a redesign.

## Read first

- `README.md` — setup, writing, build, and deploy basics.
- `src/lib/site.ts` — site metadata, path helpers, tag slugs, dates, JSON-LD.
- `src/lib/posts.ts` — collection access, drafts, sorting, reading time, tags.
- `src/layouts/BaseLayout.astro` — metadata, theme, navigation, search opt-in.
- `.opencode/skills/blog-maintenance/SKILL.md` — detailed maintenance workflows.

## Commands

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
```

- Dev server: `http://localhost:4321/stdout/`.
- `npm run build` runs the Astro build and then Pagefind against `dist/`.

## Architecture

- `src/pages/posts/[...slug].astro` — post pages, article metadata, JSON-LD.
- `src/pages/tags/index.astro` / `src/pages/tags/[tag].astro` — tags.
- `src/pages/search.astro` — Pagefind component UI.
- `src/pages/rss.xml.js` — RSS feed.
- `src/pages/robots.txt.ts` — generated `robots.txt`.
- `src/components/` — `PageHeading`, `PostList`, `TagList`.
- `src/content/posts/` — Markdown posts.
- `src/styles/global.css` — design tokens and styling.
- `public/` — static assets such as the favicon.
- Generated and ignored: `dist/`, `.astro/`, `node_modules/`.

## Non-negotiable rules

1. **One source for site origin/base.** `astro.config.mjs` owns `site` and
   `base`. Never hardcode `/stdout` or `teef22.github.io` in `src/`. Use
   `sitePath()`, `postPath()`, `tagPath()`, `Astro.site`, or `context.site`.
2. **One post query path.** Use `getPosts({ includeDrafts })` from
   `src/lib/posts.ts`. Do not reimplement collection filtering or sorting in
   pages. RSS must explicitly pass `{ includeDrafts: false }`.
3. **One tag pipeline.** Use `tagSlug()` for URLs and `getTagGroups()` for
   counts and tag pages. Do not rebuild tag lists with
   `new Set(posts.flatMap(...))` or filter all posts per tag.
4. **Search is opt-in.** Pagefind indexes only pages rendered with
   `BaseLayout`'s `indexable` prop. Post pages and About are indexable; home,
   tags, Search, and 404 are not. Keep `data-pagefind-body` off utility pages.
   The post `<h1>` keeps `data-pagefind-meta="title"` and article chrome stays
   ignored.
5. **Search/feed paths are derived.** Pagefind's `bundle-path`/`base-url` use
   `sitePath()`. Never hardcode them.
6. **Preserve the look.** Do not change layout, spacing, typography, colors, or
   component structure unless explicitly requested. Current intentional
   behavior includes active-nav accent and system-aware dark mode.
7. **Theme rules.** With no saved choice, follow `prefers-color-scheme`. A
   toggle persists `light`/`dark` under `stdout-theme` and stops following the
   system. Keep `data-theme`, `theme-color`, icon, and aria-label synchronized.
8. **Fonts are self-hosted.** Use `@fontsource/dm-sans` and
   `@fontsource/dm-mono`. Do not reintroduce the Google Fonts import.
9. **Metadata through the layout.** Use `BaseLayout` props (`title`,
   `description`, `ogType`, `publishedTime`, `updatedTime`, `tags`, `noindex`,
   `structuredData`) instead of hand-writing head tags. Canonical and Open
   Graph URLs derive from `Astro.site`.
10. **Sitemap and robots.** The sitemap excludes `/search/` and `/404/`.
    `robots.txt` is generated; do not add `public/robots.txt`.
11. **Drafts.** Drafts are visible in development only and must stay out of
    production routes, RSS, sitemap, and Pagefind.
12. **Generated files.** Do not edit `dist/` or `.astro/`; rebuild.
13. **Docs.** Update `README.md` when setup, behavior, or configuration changes.

## Writing a post

Create `src/content/posts/<slug>.md`. The file path becomes the URL slug.

```md
---
title: A post title
description: A short summary for the home page and search results.
pubDate: 2026-11-19
# updatedDate: 2026-11-26
tags:
  - notes
# draft: true
---
```

- Tags are trimmed and must be non-empty.
- Start body headings at `##`; the title is rendered as the page `<h1>`.
- `updatedDate` is optional and is shown on the article and in JSON-LD.
- `draft: true` keeps the post out of production.

## Verification

After any non-trivial change:

```sh
npm run check
npm run build
git diff --check
```

- `npm run check` must report 0 errors.
- The build must succeed.
- Pagefind must index About plus each post page, and no utility pages. Check
  `dist/pagefind/pagefind-entry.json` or the build log.
- Inspect `dist/robots.txt`, `dist/sitemap-0.xml`, and `dist/rss.xml` when URLs
  or metadata change.
- Run `npm run preview` and check home, a post, tags, Search, About, and 404.
- Use the `blog-reviewer` subagent for a read-only audit after larger changes.
- Load the `blog-maintenance` skill for detailed workflows and a fuller checklist.
