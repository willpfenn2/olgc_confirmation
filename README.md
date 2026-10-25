# OLGC Confirmation 2027

A modern, static website for the Our Lady of Good Counsel Confirmation class of 2027.

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com). Deploys for free to GitHub Pages.

## Local preview

```
npm install
npm run dev
```

Opens at http://localhost:4321 (or the next free port). Edit any file and the browser hot-reloads.

To check the production build:

```
npm run build
npm run preview
```

## Adding the hero mosaic images

Drop 6 images into [public/images/mosaic/](public/images/mosaic/) named exactly `01.jpg` through `06.jpg`. They appear behind the home-page title. Missing images show a dark fallback tile.

## Class schedule

Defined in [src/data/lessons.ts](src/data/lessons.ts). First class **Oct 11, 2026**; last class **May 23, 2027**. Breaks: Nov 1, Nov 29, Dec 27 (2026); Jan 3, Mar 28 (2027). Edit the dates in that file if the schedule changes.

## Deploying to GitHub Pages (one-time setup)

1. **Create a public repo on GitHub**. The current config in [astro.config.mjs](astro.config.mjs) points at `https://willpfenn2.github.io/olgc_confirmation` — if your repo is named something else, update `base` there to match.

2. **Push the code**:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/willpfenn2/olgc_confirmation.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**: on GitHub, go to **Settings → Pages**. Under **Source**, select **GitHub Actions**.

4. Within ~1 minute the workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds and deploys the site at:
   ```
   https://willpfenn2.github.io/olgc_confirmation/
   ```
   Every push to `main` redeploys automatically.

## Adding or editing lessons

Lessons live as markdown files in [src/content/lessons/](src/content/lessons/).

**To publish an upcoming lesson:**

1. Open [src/data/lessons.ts](src/data/lessons.ts) and flip the lesson's `clickable: false` to `clickable: true` and `published: false` to `published: true`. Also update `title` if needed and make sure `slug` matches the filename you create below.
2. Create `src/content/lessons/<slug>.md` matching the slug.
3. Use this template (follows the Topic / Outline / To Do / Further Reading flow):
   ```md
   ---
   order: 4
   title: "The Fall"
   subtitle: "Optional short subtitle"
   scripture: "Genesis 3"
   ---

   ## Topic

   Main teaching content for this lesson.

   ## Outline

   - Point one
   - Point two
   - Point three

   ## To Do

   - Homework or reflection task one
   - Homework or reflection task two

   ## Further Reading

   - [Catechism §XXX-XXX](https://www.vatican.va/...)
   - Supplemental resource
   ```
4. Commit and push — the site redeploys automatically.

## Setting the survey link

In [src/pages/index.astro](src/pages/index.astro), find the line `const surveyUrl = '#';` and replace `'#'` with your real survey URL (e.g., a Google Form link).

## Project structure

```
src/
├── content/
│   ├── config.ts                ← lesson frontmatter schema
│   └── lessons/*.md             ← one markdown file per published lesson
├── data/lessons.ts              ← master list of 28 lessons + dates
├── components/Sidebar.astro     ← dark sidebar with lesson list + dates
├── layouts/BaseLayout.astro     ← HTML shell + sidebar + fonts
├── pages/
│   ├── index.astro              ← home page (hero mosaic + buttons + curriculum)
│   └── lessons/[...slug].astro  ← dynamic route; one page per lesson markdown file
└── styles/global.css            ← Tailwind + custom styles

public/
├── favicon.svg
└── images/mosaic/               ← drop 01.jpg...06.jpg here
```
