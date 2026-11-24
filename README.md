# stdout

A small static blog built with Astro, published at
`https://teef22.github.io/stdout/`. Posts are Markdown files in Git.

## Develop

```sh
npm install
npm run dev
```

## Write a post

Add a Markdown file in `src/content/posts/`:

```md
---
title: A post title
description: A short summary for the home page and search results.
pubDate: 2026-11-19
tags:
  - notes
---

Write the post in Markdown.
```

Set `draft: true` to keep a post out of production. Omit it (or use `false`)
to publish.

## Build

```sh
npm run build
npm run preview
```

The build writes the site, RSS feed, sitemap, and Pagefind search index to
`dist/`.

## Deploy

Push to `main`. The GitHub Actions workflow in `.github/workflows/deploy.yml`
builds and deploys the site. Astro's `base` path is set to `/stdout`; update
that and the Pagefind settings if you rename the repository or add a custom
domain.
