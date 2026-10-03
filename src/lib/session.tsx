import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { chargerMetamob } from "./donnees";
import { supabase } from "./supabase";
import type { Membre, Personnage } from "./types";

type EtatSession = {
  chargement: boolean;
  session: Session | null;
  membre: Membre | null;
  mesPersos: Personnage[];
  erreur: string | null;
  rafraichir: () => Promise<void>;
  seConnecter: () => Promise<void>;
  seDeconnecter: () => Promise<void>;
};

const Ctx = createContext<EtatSession | null>(null);

/**
 * Relit le Metamob du membre à l'ouverture du site, une fois par onglet : la session Supabase restant ouverte
 * des semaines, « à chaque connexion » se traduit par « à chaque visite ». En arrière-plan, sans bloquer l'affichage.
 * La fonction serveur ignore la demande si le résumé a moins de 10 minutes.
 */
function actualiserMonMetamob(membreId: string) {
  try {
    const cle = `metamob-actualise-${membreId}`;
    if (sessionStorage.getItem(cle)) return;
    sessionStorage.setItem(cle, "1");
  } catch {
    // Stockage indisponible (navigation privée stricte) : on actualise quand même.
  }
  chargerMetamob(membreId, true).catch(() => {
    // Pas de profil, Metamob injoignable… la fiche affichera le détail le moment venu.
  });
}

export function FournisseurSession({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [membre, setMembre] = useState<Membre | null>(null);
  const [mesPersos, setMesPersos] = useState<Personnage[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  const charger = useCallback(async (s: Session | null) => {
    if (!s) {
      setMembre(null);
      setMesPersos([]);
      return;
    }
    const { data: m, error } = await supabase.from("membres").select("*").eq("id", s.user.id).single();
    if (error) setErreur("Impossible de charger ton profil : " + error.message);
    setMembre((m as Membre) ?? null);
    if (m?.valide) actualiserMonMetamob(m.id);
    if (m?.valide) {
      const { data: p } = await supabase
        .from("personnages")
        .select("*")
        .eq("membre_id", s.user.id)
        .order("est_principal", { ascending: false })
        .order("nom");
      setMesPersos((p as Personnage[]) ?? []);
    }
  }, []);

  // Vérifie l'appartenance au serveur Discord. Le jeton Discord n'existe que juste après la connexion.
  const verifierGuilde = useCallback(async (s: Session) => {
    if (!s.provider_token) return;
    const { error } = await supabase.functions.invoke("verifier-guilde", {
      body: { provider_token: s.provider_token },
    });
    if (error) setErreur("Impossible de vérifier ta présence sur le serveur Discord. Reconnecte-toi.");
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      await charger(data.session);
      setChargement(false);
    });

    const { data: abonnement } = supabase.auth.onAuthStateChange((evenement, s) => {
      setSession(s);
      // Ne pas appeler Supabase directement dans ce callback : on repousse l'appel.
      setTimeout(async () => {
        if (evenement === "SIGNED_IN" && s) await verifierGuilde(s);
        if (evenement === "SIGNED_IN" || evenement === "SIGNED_OUT") {
          await charger(s);
          setChargement(false);
        }
      }, 0);
    });
    return () => abonnement.subscription.unsubscribe();
  }, [charger, verifierGuilde]);

  const valeur: EtatSession = {
    chargement,
    session,
    membre,
    mesPersos,
    erreur,
    rafraichir: () => charger(session),
    seConnecter: async () => {
      await supabase.auth.signInWithOAuth({
        provider: "discord",
        // guilds.members.read suffit : la fiche membre n'existe que si la personne est sur le serveur,
        // et elle donne le pseudo du serveur. Pas besoin de lire la liste de tous ses serveurs.
        options: { scopes: "identify guilds.members.read", redirectTo: window.location.origin },
      });
    },
    seDeconnecter: async () => {
      await supabase.auth.signOut();
    },
  };

  return <Ctx.Provider value={valeur}>{children}</Ctx.Provider>;
}

export function useSession(): EtatSession {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSession doit être utilisé dans <FournisseurSession>");
  return v;
}
