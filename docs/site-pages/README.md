# How to access and edit each page

Astro uses **file-based routing**: files under [`src/pages/`](../../src/pages/) become URLs. Dynamic routes use `[...slug].astro` with content from [`src/content/`](../../src/content/).

## Route map

| URL | Source file | How to edit |
| --- | --- | --- |
| `/` | [`src/pages/index.astro`](../../src/pages/index.astro) | Inline HTML; sponsors in [`src/data/sponsors.json`](../../src/data/sponsors.json); site strings in [`src/consts.ts`](../../src/consts.ts) |
| `/members` | [`src/pages/members.astro`](../../src/pages/members.astro) | Layout/styling; member data in [`src/data/members.json`](../../src/data/members.json) |
| `/projects` | [`src/pages/projects/index.astro`](../../src/pages/projects/index.astro) | Projects index UI; entries from `src/content/projects/` |
| `/projects/<slug>` | [`src/pages/projects/[...slug].astro`](../../src/pages/projects/[...slug].astro) | One `.md`/`.mdx` per project in [`src/content/projects/`](../../src/content/projects/) |
| `/events` | [`src/pages/events/index.astro`](../../src/pages/events/index.astro) | Events index UI; entries from `src/content/events/` |
| `/events/<slug>` | [`src/pages/events/[...slug].astro`](../../src/pages/events/[...slug].astro) | One `.md`/`.mdx` per event in [`src/content/events/`](../../src/content/events/) |
| `/opportunities` | [`src/pages/opportunities/index.astro`](../../src/pages/opportunities/index.astro) | Inline content (e.g. CTA, external form links) |
| `/contact` | [`src/pages/contact.astro`](../../src/pages/contact.astro) | Page copy; embedded Google Form `iframe` `src` |
| `/donate` | [`src/pages/donate.astro`](../../src/pages/donate.astro) | Inline copy and external giving links |
| `/terms` | [`src/pages/terms.astro`](../../src/pages/terms.astro) | Full legal HTML in the page |
| `/privacy` | [`src/pages/privacy.astro`](../../src/pages/privacy.astro) | Full policy HTML in the page |
| `/rss.xml` | [`src/pages/rss.xml.js`](../../src/pages/rss.xml.js) | RSS feed generator (projects-related) |

## Shared chrome

- **Header / nav:** [`src/components/layout/Header.astro`](../../src/components/layout/Header.astro) and [`src/components/layout/MobileNavigation.tsx`](../../src/components/layout/MobileNavigation.tsx)
- **Footer:** [`src/components/layout/Footer.astro`](../../src/components/layout/Footer.astro) (includes Terms & Privacy links)

Change those files if you add a top-level route and want it in the menu or footer.

## Content schemas

Events and projects must validate against [`src/content.config.ts`](../../src/content.config.ts). Invalid frontmatter fails the build.

## Local preview

```bash
bun run dev
```

Default dev URL: `http://localhost:4321`.
