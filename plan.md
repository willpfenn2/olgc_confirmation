# OLGC Confirmation Prep 2026 — Build Plan

## Overview
Build a modern, static website for an 8th grade / high school Catholic Confirmation prep class. Dark sidebar with a scrollable list of ~20 lessons; main content area shows the selected lesson plus a "Further Reading" section. Deploy for free via GitHub Pages, auto-deployed from the `main` branch via GitHub Actions.

## Tech Stack
- **Astro** — static site generator; outputs pure HTML, no client-side JS runtime needed
- **Tailwind CSS** (via `@astrojs/tailwind` integration) — for the "bold & modern" visual design
- **Astro Content Collections + Markdown** — lessons are `.md` files with frontmatter, not HTML
- **GitHub Pages** — hosted free at `https://USERNAME.github.io/REPO/`
- **GitHub Actions** — auto-build and deploy on every push to `main`

**Why Astro over Next.js:** Astro ships zero JavaScript by default (perfect for a reading site), handles markdown content natively, and deploys to GitHub Pages with less config than Next.js (no `next export` quirks, no `basePath` runtime issues).

**Node version:** Astro 4+ requires Node 18.17+ or 20+. Assume the user has a modern Node installed.

## Visual Style
"Bold & modern" — dark sidebar, bright content area, confident typography.

**Color palette (configure in `tailwind.config.mjs`):**
- Sidebar background: `slate-950` (#020617) with a subtle gradient to `slate-900`
- Sidebar text: `slate-400` inactive, `white` active
- Active lesson accent bar: `indigo-400` (#818cf8) — 3px left border
- Active lesson background: `slate-800/50`
- Main content background: `white`
- Main content body text: `slate-700`
- Headings: `slate-900`
- Links / accent: `indigo-600`

**Typography:**
- Load **Inter** from Google Fonts via `<link>` in the base layout
- Headings use `font-semibold` (not bold), tracking-tight
- Body uses `text-lg leading-relaxed` for comfortable reading
- Max content width: `max-w-2xl` (~672px)

**Overall feel:** Looks like a modern docs site (e.g., Linear's docs, Vercel's docs) — clean, confident, generous whitespace.

## Project Structure

```
Confirmation Website/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
├── .gitignore
├── .github/
│   └── workflows/
│       └── deploy.yml           ← GitHub Action for auto-deploy
├── public/
│   └── favicon.svg
├── src/
│   ├── content/
│   │   ├── config.ts            ← content collection schema
│   │   └── lessons/
│   │       ├── 01-what-is-confirmation.md
│   │       ├── 02-the-holy-spirit.md
│   │       └── 03-gifts-of-the-spirit.md
│   ├── components/
│   │   └── Sidebar.astro        ← shared sidebar, lists all 20 lessons
│   ├── layouts/
│   │   └── BaseLayout.astro     ← HTML shell + sidebar + main slot
│   ├── pages/
│   │   ├── index.astro          ← home page
│   │   └── lessons/
│   │       └── [...slug].astro  ← dynamic route for each lesson
│   └── styles/
│       └── global.css           ← Tailwind directives + custom base styles
├── README.md
└── plan.md                      ← this file
```

## Setup Steps

### Step 1: Initialize Astro project
Run from the project root:
```
npm create astro@latest -- --template minimal --typescript strict --install --no-git
```
Answer prompts to create files in the current directory. **Do not create a nested folder.**

If `npm create astro` prompts refuse to install into a non-empty directory (because `plan.md` and `README.md` exist), move those files out, run the init, then move them back in. Alternatively, scaffold a `temp/` folder and move files up.

### Step 2: Add Tailwind integration
```
npx astro add tailwind
```
Accept all prompts (modifies `astro.config.mjs`, creates `tailwind.config.mjs`).

### Step 3: Configure `astro.config.mjs`
Set `site` and `base` for GitHub Pages subpath deployment:
```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://USERNAME.github.io',
  base: '/confirmation-website',
  integrations: [tailwind()],
});
```
Leave `USERNAME` as a literal placeholder — the user will replace it after creating the GitHub repo. Document this clearly in the README.

### Step 4: Set up content collection
Create `src/content/config.ts`:
```ts
import { defineCollection, z } from 'astro:content';

const lessons = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    subtitle: z.string().optional(),
    scripture: z.string().optional(),
  }),
});

export const collections = { lessons };
```

### Step 5: Create the sidebar component
`src/components/Sidebar.astro` — accepts `currentSlug` as a prop, renders:
- Site title "OLGC Confirmation Prep 2026" at top (padded, `text-xl font-semibold`)
- Thin divider (`border-slate-800`)
- "Home" link
- A scrollable `<nav>` with all 20 lesson entries
- Entries for existing lessons link to the lesson page; entries for not-yet-written lessons render as muted `<span>` with text "Coming soon" below the title

The sidebar must be able to list ALL 20 lesson titles (hardcoded in the component as an array, or defined in a shared TS file). For the 17 that don't have markdown files yet, render them as "Coming soon" (muted `text-slate-600 cursor-not-allowed`).

**Lesson titles array** (hardcode in sidebar; the first 3 should match the markdown files created in Step 7):
1. What is Confirmation?
2. The Holy Spirit
3. Gifts of the Holy Spirit
4. Fruits of the Holy Spirit
5. The Sacraments
6. Baptism and Confirmation
7. The Apostles' Creed
8. The Trinity
9. Jesus Christ
10. The Church
11. The Mass
12. The Eucharist
13. Prayer
14. The Our Father
15. Mary and the Saints
16. The Ten Commandments
17. The Beatitudes
18. Sin and Forgiveness
19. Choosing a Confirmation Saint
20. Living as a Confirmed Catholic

Active lesson gets:
- `bg-slate-800/50`
- 3px `border-l-indigo-400` left border
- `text-white` (vs `text-slate-400` default)

Sidebar container classes:
- `fixed left-0 top-0 h-screen w-72 bg-slate-950 flex flex-col`
- Nav list: `flex-1 overflow-y-auto px-3 py-2 space-y-0.5`

### Step 6: Create the base layout
`src/layouts/BaseLayout.astro`:
- Receives `title`, `currentSlug` props
- Renders `<html>`, `<head>` (with Inter font `<link>`, viewport meta, title)
- Renders `<Sidebar currentSlug={currentSlug} />` + `<main class="ml-72 min-h-screen">` with `<slot />` inside
- Main inner container: `max-w-2xl mx-auto px-8 py-16`
- Mobile: below `md`, sidebar becomes a slide-out drawer triggered by a hamburger button in the top-left (small inline `<script>` toggles a class). Keep JS minimal.

### Step 7: Create the three lesson markdown files
Each file in `src/content/lessons/` with frontmatter + body:

**`01-what-is-confirmation.md`:**
```md
---
order: 1
title: "What is Confirmation?"
subtitle: "The sacrament of sealing"
scripture: "Acts 2:1-4"
---

Confirmation is one of the seven sacraments of the Catholic Church...

[3-4 paragraphs of placeholder content about what Confirmation is]

## Key Points

- Confirmation completes the grace of Baptism
- The sacrament is administered through anointing with chrism
- It is one of the three Sacraments of Initiation

## Further Reading

- [Catechism of the Catholic Church §1285-1314](https://www.vatican.va/archive/ENG0015/__P3S.HTM)
- [USCCB on Confirmation](https://www.usccb.org/beliefs-and-teachings/what-we-believe/sacraments-and-sacramentals/sacraments-of-initiation/confirmation)
```

**`02-the-holy-spirit.md`** and **`03-gifts-of-the-spirit.md`** follow the same pattern with topic-appropriate placeholder content and real-looking Further Reading links.

### Step 8: Build the dynamic lesson route
`src/pages/lessons/[...slug].astro`:
```astro
---
import { getCollection, getEntry } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const lessons = await getCollection('lessons');
  return lessons.map((lesson) => ({
    params: { slug: lesson.slug },
    props: { lesson },
  }));
}

const { lesson } = Astro.props;
const { Content } = await lesson.render();
---
<BaseLayout title={lesson.data.title} currentSlug={lesson.slug}>
  <article class="prose prose-slate prose-lg max-w-none">
    <p class="text-sm uppercase tracking-wider text-indigo-600 font-semibold mb-2">
      Lesson {lesson.data.order}
    </p>
    <h1 class="text-4xl font-semibold tracking-tight text-slate-900 mb-2">
      {lesson.data.title}
    </h1>
    {lesson.data.subtitle && (
      <p class="text-xl text-slate-500 mb-1">{lesson.data.subtitle}</p>
    )}
    {lesson.data.scripture && (
      <p class="text-sm italic text-slate-500 mb-8">{lesson.data.scripture}</p>
    )}
    <hr class="my-8 border-slate-200" />
    <Content />
  </article>
</BaseLayout>
```

Install `@tailwindcss/typography` and add to `tailwind.config.mjs` plugins so the `prose` class works:
```
npm install -D @tailwindcss/typography
```

### Step 9: Build the home page
`src/pages/index.astro`:
- Uses `BaseLayout` with no `currentSlug` (or pass `"home"`)
- Welcome heading: "Welcome to OLGC Confirmation Prep 2026"
- 2-3 paragraphs of placeholder welcoming text
- A styled "Begin with Lesson 1 →" button linking to the first lesson

### Step 10: Add favicon
Create a simple `public/favicon.svg` — just a cross symbol in indigo, or a stylized "C" monogram. Keep it to a single inline SVG.

### Step 11: Add GitHub Actions deploy workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Step 12: Update `.gitignore`
Ensure `.gitignore` includes:
```
node_modules
dist
.astro
.DS_Store
```

### Step 13: Write README.md
Replace the current README with:

```md
# OLGC Confirmation Prep 2026

Static website for the OLGC Confirmation prep class.

## Local development
```
npm install
npm run dev
```
Opens at http://localhost:4321

## Deploying to GitHub Pages

1. Create a new GitHub repo named `confirmation-website`
2. In `astro.config.mjs`, replace `USERNAME` with your GitHub username
3. Push:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/confirmation-website.git
   git push -u origin main
   ```
4. On GitHub: Settings → Pages → Source: **GitHub Actions**
5. The workflow runs automatically on each push. Site goes live at:
   `https://YOUR-USERNAME.github.io/confirmation-website/`

## Adding a lesson

1. Create `src/content/lessons/NN-slug.md` with the frontmatter template
2. In `src/components/Sidebar.astro`, swap the matching "Coming soon" entry to a real link
3. Commit and push — the Action redeploys automatically
```

## Acceptance Criteria

- [ ] `npm run dev` starts a local server and the home page renders with dark sidebar
- [ ] Sidebar shows all 20 lesson entries; the 3 real lessons are active links, the other 17 are "Coming soon" muted entries
- [ ] Each of the 3 lesson markdown files renders at its own URL via the dynamic route
- [ ] Active lesson is visually highlighted in the sidebar with the indigo accent bar
- [ ] Sidebar scrolls independently of main content
- [ ] Typography is clean and modern (Inter font loaded, `prose` styling applied)
- [ ] `npm run build` succeeds with zero errors
- [ ] Built site in `dist/` can be opened and works correctly
- [ ] `.github/workflows/deploy.yml` exists and is valid YAML
- [ ] README has clear GitHub Pages setup steps

## Out of Scope

- No quizzes, forms, or sign-ups
- No search
- No authentication
- No CMS / admin UI (edits happen via markdown files)
- No dark/light mode toggle (site is permanently light-content / dark-sidebar)
- No images in sample lessons (user can add later to `public/` or inline in markdown)
- No analytics
- No custom domain configuration (user can add later via GitHub Pages settings)
