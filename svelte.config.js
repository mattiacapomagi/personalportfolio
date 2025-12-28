import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "200.html", // SPA fallback for dynamic routes
      precompress: false,
      strict: false, // Allow dynamic routes
    }),
    paths: {
      base: dev ? "" : "/personalportfolio",
    },
  },
};

export default config;
