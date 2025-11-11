// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    site: "https://hdsi-lab-3-0.github.io",
    base: "/website",
    integrations: [mdx(), sitemap()],
});
