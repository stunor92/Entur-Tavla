import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '200.html', // Fallback page for dynamic routes
      precompress: false,
      strict: true
    }),
    prerender: {
      default: true
    },
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/your-repo-name' : ''
    }
  }
};

export default config;