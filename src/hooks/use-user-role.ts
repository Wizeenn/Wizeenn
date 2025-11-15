"use client";

import { useMemo } from "react";
import type { Database } from "@/integrations/supabase/types";

type AccountType = Database["public"]["Tables"]["profiles"]["Row"]["account_type"];

export const useUserRole = (accountType?: AccountType) => {
  return useMemo(() => {
    const role = accountType ?? "comptable";
    return {
      role,
      isComptable: role === "comptable",
      isEntreprise: role === "entreprise",
    };
  }, [accountType]);
};

