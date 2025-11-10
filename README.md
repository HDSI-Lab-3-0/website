# HDSI Lab 3.0 Website

## Getting Started

### Prerequisites

1. Make sure **[NodeJS LTS](https://nodejs.org/en/download)** is installed on your machine.

2. Make sure Bun is installed on your machine. Run this command `npm install -g bun ` to install bun. You may need to add `sudo` before the command in order to install it.

3. Clone the repository
4. Install dependencies with `bun install` (You have to do this only the first time you clone the repository)
5. Start the development server with `bun run dev` (This allows you to see the changes live)
6. Open your browser and navigate to `http://localhost:4321`

## Project Structure

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
│   ├── styles/
│   └── scripts/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

### Public

The `public/` directory is where you can place static assets that you want to be available in your website. For example, you can place tue favicon, logo, or any other static assets in this directory.

### Source

The `src/` directory is where you will spend most of your time. This is where you will write your code. The `src/` directory is divided into four subdirectories:

#### Components

The `src/components/` directory is where you can place any Astro components that you want to use in your website. You can import these components in any `.astro` file in the `src/pages/` directory.

You can think of it as reusable components that you can use across your website.

#### Content

The `src/content/` directory is where you can place any content that you want to be available in your website. This would be any blog posts (or in this case, projects) that you want to be available in your website. This would be written in markdown (.md) or markdown with JSX (.mdx) files.

#### Layouts

The `src/layouts/` directory is where you can place any Astro layouts that you want to use in your website. You can import these layouts in any `.astro` file in the `src/pages/` directory.

You can think of it as the wrapper for your pages. For example, you can place the header and footer in this layout.

#### Pages

The `src/pages/` directory is where you can place any Astro pages that you want to be available in your website. For example, the `index.astro` file would be the homepage of your website. Any `.astro` file in this directory will be available as a route based on its file name.

For example, the file `src/pages/about.astro` will be available at `http://localhost:4321/about` (or whatever domain and port you are using).

**IMPORTANT**: Make sure to include three dashes (`---`) on one line and another line at the top of the file. This is how Astro knows that this is an Astro file. For example:

```astro
---
// Your frontmatter goes here. For example, adding scripts and styles to the page
import '../styles/global.css';
import '../scripts/global.js';
---
// Your HTML goes here
<div>
	<h1>Hello World</h1>
</div>
```

It is okay if the frontmatter is empty. You can leave it as if you don't need to pass any data to the page.

#### Styles & Scripts

The `src/styles/` and `src/scripts/` directories are where you can place any global styles or scripts that you want to be available in your website. These files will need to be imported in the Layout component in order to be available on all pages.

## Deployment

This website is deployed on GitHub Pages. The deployment is automated using GitHub Actions. The `deploy.yml` file in the `.github/workflows/` directory is responsible for deploying the website.

## Updating Content

To update the content of the website, you will need to update the files in the `src/content/` directory. You can add new content by creating new markdown (.md) or markdown with JSX (.mdx) files in this directory. You can also update existing content by editing the files in this directory.
