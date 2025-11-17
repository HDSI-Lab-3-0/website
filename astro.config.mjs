// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    site: "https://hdsi-lab-3-0.github.io",
    integrations: [mdx(), sitemap(), react()],

    vite: {
        plugins: [tailwindcss()],
    },
});
