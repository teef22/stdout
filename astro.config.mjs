import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://teef22.github.io",
  base: "/stdout",
  trailingSlash: "always",
  output: "static",
  integrations: [sitemap()],
});
