---
title: Catching up on OpenCode releases with Beacon
description: A small OpenCode plugin that turns skipped release notes into one readable digest, with a free-model summary and a curated fallback.
pubDate: 2026-11-19
tags:
  - opencode
  - plugins
  - tools
---

OpenCode ships often. If you update every week or two, you skip versions, and
the changelog turns into a pile of release notes you will probably never read.
I built **opencode-beacon** to fix that small annoyance: after an update, it
shows one digest covering every stable release you missed.

It is a TUI plugin, not a separate app. The digest appears in a scrollable
dialog, and everything else is driven by a slash command.

*A quick disclosure: Beacon was built with AI-assisted coding.*

## What it does

On the first launch after a newer stable release, Beacon compares the running
version with the last version you marked read. If there is a gap, it fetches
the release notes for that range from GitHub and groups the changes into:

- main features and behavior changes,
- performance and efficiency,
- smaller improvements and fixes,
- breaking changes and required actions.

The digest is newest-first, so you start with the version you are running. The
same content is available later through `/beacon`, and `/beacon latest` lets
you browse the newest stable release without marking anything as read.

Two details matter in practice:

- Only stable releases are included. Drafts and prereleases are skipped.
- The digest can be summarized by a zero-cost model, or shown as curated
  release notes with no model request at all.

## Install

Beacon needs OpenCode 2.3.0 or later and network access to GitHub. Clone the
plugin, install its dependencies, then add the absolute path to the `plugins`
array in your global `~/.config/opencode/cli.json`. Keep the rest of the file
intact:

```json
{
  "plugins": ["/absolute/path/to/opencode-beacon"]
}
```

OpenCode watches `cli.json`, but `/reload` is a safe way to pick up the change.

## Commands

| Command | What it does |
| --- | --- |
| `/beacon` | Opens the unread digest, or tells you there is nothing new. |
| `/beacon latest` | Shows the newest stable release without changing read state. |
| `/beacon read` | Marks everything through the running version as read. |
| `/beacon model` | Picks Auto, a specific free model, or release-notes-only mode. |
| `/beacon reset` | Clears Beacon's cache, tracking, and model choice after confirmation. |

`/beacon` also accepts the aliases `whatsnew` and `whats-new`, and all of these
actions are available from the command palette.

Closing the digest with `esc` does not mark it read. That is deliberate: you
can dismiss it, keep working, and still get the full range next time. Only
`/beacon read` advances the bookmark, and `reset` restarts tracking from the
version you are currently running.

## Summaries without a bill

Beacon's AI mode is intentionally narrow. It only considers models from the
`opencode` and `opencode-go` providers, only chat models, and only models whose
listed cost is zero for input, output, and cache reads and writes. Auto tries
up to three such models, preferring a small built-in order, and caches a
successful summary for the same release range and model.

It never retries with a paid model. If no free model is available, or every
attempt fails, Beacon falls back to the curated notes and tells you why. The
dialog header shows the current state:

- `AI off` — release-notes-only mode.
- `AI on (success)` — a generated or cached summary is shown.
- `AI on (failure)` — the free attempts failed and curated notes are shown.

Privacy is part of the design too: Beacon sends only the public release notes
to the selected model. It does not send project files, prompts, or session
history. The fallback path makes no model request at all.

## A few useful details

The first launch establishes a baseline. Beacon will not dump years of old
releases on you; tracking starts from whatever version is running at that
moment. It also only auto-prompts on the production channel, so development
builds stay quiet unless you run `/beacon` yourself.

The plugin keeps its state in OpenCode's plugin storage, per channel, and
handles the boring parts: version normalization, sorting by publication date,
parsing release-note headings, and recognizing performance-related bullets so
they land in the efficiency section rather than the feature list. A summary
cache is capped at the most recent entries, so it does not grow forever.

If you update OpenCode frequently and mostly care about “what changed since
last time,” Beacon removes the tab-hopping. If you enjoy reading every release
note in full, it will happily stay out of the way.
