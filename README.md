# OLGC Confirmation Prep 2026

A modern, static website for the Our Lady of Good Counsel Confirmation preparation class.

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

## Deploying to GitHub Pages (one-time setup)

1. **Create a new repo on GitHub** — recommended name: `confirmation-website`. Make it public (required for free GitHub Pages).

2. **Edit `astro.config.mjs`** and replace the `USERNAME` placeholder with your GitHub username. If you named the repo something other than `confirmation-website`, also update the `base` value to match. Example:
   ```js
   site: 'https://willpfenn.github.io',
   base: '/confirmation-website',
   ```

3. **Push the code**:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/confirmation-website.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**: on GitHub, go to **Settings → Pages**. Under **Source**, select **GitHub Actions**. (You do not need to pick a branch — the workflow handles it.)

5. Within ~1 minute, the workflow in `.github/workflows/deploy.yml` builds and deploys the site. It will be live at:
   ```
   https://YOUR-USERNAME.github.io/confirmation-website/
   ```
   Every time you push a change to `main`, the site rebuilds automatically.

## Adding or editing lessons

Lessons live as markdown files in [src/content/lessons/](src/content/lessons/).

**To write a new lesson:**

1. Open [src/data/lessons.ts](src/data/lessons.ts) and change the lesson's `published: false` to `published: true`.
2. Create a markdown file at `src/content/lessons/<slug>.md` where `<slug>` matches the slug in `lessons.ts` (e.g., `02-the-holy-spirit.md`).
3. Use this frontmatter template:
   ```md
   ---
   order: 2
   title: "The Holy Spirit"
   subtitle: "Optional one-line subtitle"
   scripture: "John 14:16-17"
   ---

   Your lesson content here. Standard markdown works:

   - Bullet lists
   - **Bold** and *italic*
   - [Links](https://example.com)

   ## Section Heading

   More content.

   ## Further Reading

   - [Link to source](https://...)
   ```
4. Commit and push — the site redeploys automatically.

## Project structure

```
src/
├── content/
│   ├── config.ts              ← lesson frontmatter schema
│   └── lessons/*.md           ← one markdown file per lesson
├── data/lessons.ts            ← master list of all 20 lessons (edit here to publish)
├── components/Sidebar.astro   ← the dark left sidebar
├── layouts/BaseLayout.astro   ← HTML shell + sidebar + mobile menu
├── pages/
│   ├── index.astro            ← home page
│   └── lessons/[...slug].astro ← dynamic route; one page per lesson markdown file
└── styles/global.css          ← Tailwind + a few custom styles
```
