import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
    // Load Markdown and MDX files in the `src/content/projects/` directory.
    loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            // Transform string to Date object
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            heroImage: image().optional(),
            imageGif: image().optional(),
            links: z
                .object({
                    lessonPlan: z.string().optional(),
                    materials: z.string().optional(),
                })
                .optional(),
            relevance: z.string().optional(),
            tags: z.array(z.string()).optional(),
            estimated_time: z.number().optional(),
        }),
});

const events = defineCollection({
    // Load Markdown and MDX files in the `src/content/events/` directory.
    loader: glob({ base: "./src/content/events", pattern: "**/*.{md,mdx}" }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            eventName: z.string(),
            eventDescription: z.string(),
            // Transform string to Date object
            eventDateStart: z.coerce.date(),
            eventDateEnd: z.coerce.date(),
            eventStatus: z.enum(["upcoming", "ongoing", "completed", "cancelled"]),
            eventLocation: z.string(),
            eventFor: z.string(),
            heroImage: image().optional(),
            imageGif: image().optional(),
            eventTags: z.array(z.string()).optional(),
        }),
});

export const collections = { projects, events };
