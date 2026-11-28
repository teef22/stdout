# stdout

A small static blog built with Astro, published at
`https://teef22.github.io/stdout/`. Posts are Markdown files in Git.

## Develop

```sh
npm install
npm run dev
```

The dev server serves the site at `http://localhost:4321/stdout/`. Search needs
a production build: run `npm run build` and `npm run preview` to test Pagefind.

## Write a post

Add a Markdown file in `src/content/posts/`:

```md
---
title: A post title
description: A short summary for the home page and search results.
pubDate: 2026-11-19
# updatedDate: 2026-11-26
tags:
  - notes
---

Write the post in Markdown.
```

Set `draft: true` to keep a post out of production. Omit it (or use `false`) to
publish. `updatedDate` is optional and is shown on the article and in structured
data. Tags are trimmed; empty tags are rejected.

## Build

```sh
npm run check
npm run build
npm run preview
```

`check` runs Astro's type diagnostics. The build writes the site, RSS feed,
sitemap, generated `robots.txt`, and Pagefind search index to `dist/`. Pagefind
indexes post bodies and the About page; utility pages and tag listings are
excluded.

## What is included

- Home page with the post list and RSS feed
- Post pages with reading time, tags, and an optional updated date
- Light/dark theme that follows the system preference until you choose one
- Self-hosted DM Sans and DM Mono
- Pagefind search scoped to posts and About
- Open Graph/Twitter metadata and JSON-LD for posts
- Generated `robots.txt` and sitemap

## Configure

Edit the title, description, author, language, and theme colors in
`src/lib/site.ts`. The canonical origin comes from `site` in
`astro.config.mjs`; the base path comes from `base`. Internal links and the
Pagefind configuration are generated from `BASE_URL`, so there are no search or
feed path settings to update.

## Deploy

Push to `main`. The GitHub Actions workflow in `.github/workflows/deploy.yml`
runs `npm run check`, builds the site, and deploys it to GitHub Pages.

## AI-assisted maintenance

OpenCode loads `AGENTS.md` automatically. The project also includes:

- `.opencode/skills/blog-maintenance/SKILL.md` — on-demand maintenance and
  verification workflow.
- `.opencode/agents/blog-reviewer.md` — read-only audit subagent.

Other coding agents can read `AGENTS.md` directly for the same project rules.
