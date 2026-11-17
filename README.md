# stdout — by Henry H.

A small, static blog built with Astro. Posts are Markdown files in Git; the site
is designed for GitHub Pages at `https://teef22.github.io/stdout/`.

## Run locally

```sh
npm install
npm run dev
```

Astro uses the `/stdout/` base path to match the eventual GitHub Pages address.
The starter post is a draft, so it appears in local development but is not
published in production.

## Write a post

Create a Markdown file in `src/content/posts/`:

```md
---
title: A post title
description: A short summary for the archive and search results.
pubDate: 2026-11-18
tags:
  - notes
---

Write the post in Markdown.
```

Posts with `draft: true` are visible locally and excluded from production.
Omit `draft` or set it to `false` when the post is ready to publish.

## Build and preview

```sh
npm run build
npm run preview
```

The build generates the static site, RSS feed, sitemap, and Pagefind search
index in `dist/`.

## Publish on GitHub Pages

1. Create a **public** GitHub repository named `stdout` under the `teef22`
   account and push this project to its `main` branch.
2. In the repository, open **Settings → Pages** and select **GitHub Actions**
   as the build and deployment source.
3. The workflow in `.github/workflows/deploy.yml` will build and deploy the
   site on each push to `main`.

The Astro `base` setting and Pagefind configuration are set for the
`/stdout/` project URL. If you rename the repository or use a custom domain,
update those settings before deploying.
