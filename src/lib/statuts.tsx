import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "./supabase";
import type { Membre } from "./types";

type Infos = Pick<Membre, "id" | "statut" | "vu_le" | "dispo_personnage_id">;
type Contexte = { statuts: Map<string, Infos>; rafraichirStatuts: () => Promise<void> };

const ContexteStatuts = createContext<Contexte>({ statuts: new Map(), rafraichirStatuts: async () => {} });

/** Charge le statut de présence de tous les membres et le rafraîchit chaque minute, pour colorer les pastilles partout. */
export function FournisseurStatuts({ actif, children }: { actif: boolean; children: ReactNode }) {
  const [statuts, setStatuts] = useState<Map<string, Infos>>(new Map());

  const rafraichirStatuts = useCallback(async () => {
    const { data, error } = await supabase.from("membres").select("id, statut, vu_le, dispo_personnage_id");
    if (!error && data) setStatuts(new Map((data as Infos[]).map((m) => [m.id, m])));
  }, []);

  useEffect(() => {
    if (!actif) return;
    rafraichirStatuts();
    const t = window.setInterval(rafraichirStatuts, 60 * 1000);
    return () => window.clearInterval(t);
  }, [actif, rafraichirStatuts]);

  return <ContexteStatuts.Provider value={{ statuts, rafraichirStatuts }}>{children}</ContexteStatuts.Provider>;
}

export const useStatuts = () => useContext(ContexteStatuts);
