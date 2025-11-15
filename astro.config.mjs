// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import heroui from "./hero.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://hdsi-lab-3-0.github.io",
  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [
      tailwindcss({
        plugins: [heroui],
      }),
    ],
  },
});