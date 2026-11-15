import { defineConfig } from "vitest/config"
import { fileURLToPath } from "node:url"

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  // Components use the automatic JSX runtime (no `import React`), as in Next.js
  esbuild: { jsx: "automatic" },
})
