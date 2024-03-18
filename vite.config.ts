import { fileURLToPath } from "url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: fileURLToPath(
          new URL("./src/components/index.ts", import.meta.url)
        ),
      },
      {
        find: "@pages",
        replacement: fileURLToPath(
          new URL("./src/pages/index.ts", import.meta.url)
        ),
      },
      {
        find: "@api",
        replacement: fileURLToPath(
          new URL("./src/api/index.ts", import.meta.url)
        ),
      },
      {
        find: "@models",
        replacement: fileURLToPath(
          new URL("./src/models/index.ts", import.meta.url)
        ),
      },
      {
        find: "@hooks",
        replacement: fileURLToPath(
          new URL("./src/hooks/index.ts", import.meta.url)
        ),
      },
    ],
  },
});
