# How to access and edit each page

Astro maps **files under `src/pages/`** to URLs. Special files (`[...slug].astro`) build one page per content entry. There is no separate routing config file.

**Site base URL** for production is set in [`astro.config.mjs`](../../astro.config.mjs) (`site`)—important for absolute links and RSS.

---

## Quick reference: URL → source → what to change

| URL | Source | What you edit |
| --- | --- | --- |
| `/` | [`src/pages/index.astro`](../../src/pages/index.astro) | Hero, mission, about, Data Science blurb; [`src/data/sponsors.json`](../../src/data/sponsors.json); global strings [`src/consts.ts`](../../src/consts.ts) |
| `/members` | [`src/pages/members.astro`](../../src/pages/members.astro) | Section titles/styles; data in [`src/data/members.json`](../../src/data/members.json); images in `public/images/` |
| `/projects` | [`src/pages/projects/index.astro`](../../src/pages/projects/index.astro) | Hero headline, description, **external form CTA** `href`; project list comes from `getCollection('projects')` |
| `/projects/<slug>` | [`src/pages/projects/[...slug].astro`](../../src/pages/projects/[...slug].astro) + [`src/content/projects/<slug>.md(x)`](../../src/content/projects/) | Markdown/MDX + frontmatter per project |
| `/events` | [`src/pages/events/index.astro`](../../src/pages/events/index.astro) | Hero for events listing; all cards from `getCollection('events')` |
| `/events/<slug>` | [`src/pages/events/[...slug].astro`](../../src/pages/events/[...slug].astro) + [`src/content/events/<slug>.md(x)`](../../src/content/events/) | Markdown/MDX + frontmatter per event |
| `/opportunities` | [`src/pages/opportunities/index.astro`](../../src/pages/opportunities/index.astro) | Inline HTML (CTAs, copy, external links) |
| `/contact` | [`src/pages/contact.astro`](../../src/pages/contact.astro) | Page chrome; embedded Google Form via `<iframe src="...">` |
| `/donate` | [`src/pages/donate.astro`](../../src/pages/donate.astro) | Copy, external giving URLs |
| `/terms` | [`src/pages/terms.astro`](../../src/pages/terms.astro) | Full legal HTML |
| `/privacy` | [`src/pages/privacy.astro`](../../src/pages/privacy.astro) | Full policy HTML |
| `/rss.xml` | [`src/pages/rss.xml.js`](../../src/pages/rss.xml.js) | RSS for **projects** (`getCollection('projects')`), not events |

**404:** Astro’s default behavior applies unless you add `src/pages/404.astro` (not present in this repo as of this writing).

---

## Dynamic routes (how slugs work)

- [`projects/[...slug].astro`](../../src/pages/projects/[...slug].astro) exports `getStaticPaths()` from `getCollection('projects')`. Each entry’s `id` becomes `params.slug`.
- [`events/[...slug].astro`](../../src/pages/events/[...slug].astro) does the same for `events`.

If `slug` is missing or invalid, the events page **redirects** to `/events` (see that file).

---

## Shared chrome (every page)

| Concern | Files |
| --- | --- |
| Top nav (desktop) | [`src/components/layout/Header.astro`](../../src/components/layout/Header.astro) — [`HeaderLink`](../../src/components/layout/HeaderLink.astro) items |
| Mobile nav | [`src/components/layout/MobileNavigation.tsx`](../../src/components/layout/MobileNavigation.tsx) — same routes in a menu |
| Footer (copyright, Terms, Privacy) | [`src/components/layout/Footer.astro`](../../src/components/layout/Footer.astro) |
| Default `<head>` | [`src/components/layout/BaseHead.astro`](../../src/components/layout/BaseHead.astro) |

**Adding a new top-level page:** create `src/pages/foo.astro` → `/foo`, then add `/foo` to both `Header.astro` and `MobileNavigation.tsx` if it should appear in the menu.

---

## Content validation

- **Projects** and **events** frontmatter must satisfy [`src/content.config.ts`](../../src/content.config.ts). Run `bun run build` to catch schema errors.
- **Tag labels** for filters are partly centralized in [`src/data/tags.json`](../../src/data/tags.json) (projects and events UIs both use it).

---

## Related guides

- [Home page](../home-page/README.md)
- [Events](../events/README.md)
- [Members](../members/README.md)
- [Projects](../projects/README.md)
- [Terms](../terms-of-service/README.md)
- [Privacy](../privacy-policy/README.md)

---

## Local preview

```bash
bun install   # once
bun run dev
```

Default: `http://localhost:4321`.
