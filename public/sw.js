// Service worker minimal : il rend le site installable comme une application (écran d'accueil du téléphone).
// Volontairement, il ne garde rien en cache : le site est toujours chargé à jour depuis le réseau,
// et une nouvelle version déployée est visible tout de suite, sans risque de rester bloqué sur l'ancienne.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {
  // Pas de réponse personnalisée : le navigateur va chercher la page normalement.
});
