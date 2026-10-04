import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";

// Numéro de version affiché en pied de page, lu dans package.json au moment de la construction.
const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

export default defineConfig({
  plugins: [react()],
  define: { __VERSION_SITE__: JSON.stringify(version) },
});
