import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";  
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import vercel from '@astrojs/vercel';
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://spotonmobiledetailing.com",
  integrations: [tailwindcss(), sitemap(), mdx()],
  adapter: vercel(),
});
