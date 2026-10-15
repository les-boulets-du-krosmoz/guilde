import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { FournisseurSession } from "./lib/session";
import "./styles.css";
import { appliquerModeDaltonien, modeDaltonienMemorise } from "./lib/affichage";

// Mode daltonien : appliqué tout de suite, avant l'affichage, pour éviter un clignotement de couleurs.
appliquerModeDaltonien(modeDaltonienMemorise());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <FournisseurSession>
        <App />
      </FournisseurSession>
    </BrowserRouter>
  </StrictMode>,
);

// Application installable : le service worker n'est enregistré que sur le site en ligne (pas en développement).
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => { navigator.serviceWorker.register("/sw.js").catch(() => {}); });
}
