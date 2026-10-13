import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";

// Numéro de version affiché en pied de page, lu dans package.json au moment de la construction.
const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Bibliothèques (React, Supabase…) à part : elles changent rarement, le navigateur les garde d'une version à l'autre.
        // Données du jeu (quêtes, succès, avis) dans un morceau à part, chargé seulement par les pages qui en ont besoin.
        manualChunks(id) {
          if (id.includes("node_modules")) return "bibliotheques";
          if (id.includes("/src/data/")) return "donnees-jeu";
        },
      },
    },
  },
  define: { __VERSION_SITE__: JSON.stringify(version) },
});
