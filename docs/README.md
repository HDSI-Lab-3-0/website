# Documentation

This site is built with **Astro 5**: most “pages” are `.astro` files under `src/pages/`, while **projects** and **events** are **content collections** (Markdown/MDX + frontmatter validated in `src/content.config.ts`).

**Preview locally:** from the repo root, run `bun install` once, then `bun run dev` and open `http://localhost:4321`.

## Guides

| Topic | Guide |
| --- | --- |
| Home page (hero, copy, sponsors, SEO strings) | [How to update the home page](./home-page/README.md) |
| Events (add/edit/remove, frontmatter, images, filters) | [How to add, update, or edit an event](./events/README.md) |
| Members (JSON, categories, photos) | [How to update members](./members/README.md) |
| Projects (add/edit/remove, frontmatter, listing) | [How to add, update, or edit a project](./projects/README.md) |
| Terms of Service | [How to change the Terms of Service](./terms-of-service/README.md) |
| Privacy Policy | [How to change the Privacy Policy](./privacy-policy/README.md) |
| Every URL → source file → what to edit | [How to access and edit each page](./site-pages/README.md) |

If you only need a **route map**, start with [site-pages](./site-pages/README.md). If you are changing **shared navigation or footer links**, see that doc’s “Shared chrome” section.
