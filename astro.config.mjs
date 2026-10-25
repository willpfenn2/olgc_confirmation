import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// IMPORTANT: Replace USERNAME with your GitHub username and REPO with your repo name
// after you create the GitHub repository. See README.md.
export default defineConfig({
  site: 'https://willpfenn2.github.io',
  base: '/olgc_confirmation',
  integrations: [tailwind()],
});
