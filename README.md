# Faizanb Dev Blogspace Monorepo

This is a modern [Nx](https://nx.dev) monorepo for a developer blog platform, featuring:

- **blog-ui**: Next.js 14 App Router app for the main blog UI
- **atomic-ui**: Reusable React component library (with SCSS modules)
- **Shared styles**: Centralized SCSS theme, mixins, and functions
- **API routes**: Next.js API endpoints for blog data

---

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Development

Build the UI library and run the blog app in development mode:

```sh
npx nx build atomic-ui --skip-nx-cache
npx nx serve blog-ui --skip-nx-cache
```

### 3. Production Build

Build both the UI library and the blog app for production:

```sh
npx nx build atomic-ui --configuration=production --skip-nx-cache
npx nx build blog-ui --configuration=production --skip-nx-cache
```

To serve the blog-ui app in production:

```sh
npx nx serve blog-ui --configuration=production --skip-nx-cache
```

## Project Structure

```
faizanb-dev-blogspace/
├── atomic-ui/         # Reusable React component library (SCSS modules)
├── blog-ui/           # Next.js app (App Router)
├── styles/            # Shared SCSS theme, mixins, functions, globals
├── dist/              # Build output
├── nx.json, project.json, tsconfig.base.json, etc.
```

## Features

- **Atomic Design:** UI built with atomic-ui library (atoms, molecules, organisms)
- **SCSS Modules:** Component-scoped styles, shared theme and mixins
- **Table of Contents:** Auto-generated from blog headings
- **Reading Time:** Estimated minutes to read per post
- **Theme Toggle:** Light/dark mode with persistence (via next-themes)
- **Responsive Layout:** Fixed sidebar TOC, scrollable content
- **SEO:** Metadata, OpenGraph, Twitter cards, structured data
- **Nx-powered:** Fast builds, caching, and code sharing

## License

MIT
