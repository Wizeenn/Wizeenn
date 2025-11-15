export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          address: string | null;
          created_at: string;
          email: string | null;
          id: string;
          legal_representative: string | null;
          name: string;
          notes: string | null;
          org_id: string;
          phone: string | null;
          prorata_tva: number;
          regime_tva: string;
          repas_deductibles: number;
          siret_siren: string | null;
          updated_at: string | null;
          vat_number: string | null;
          vehicules: string | null;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          legal_representative?: string | null;
          name: string;
          notes?: string | null;
          org_id: string;
          phone?: string | null;
          prorata_tva?: number;
          regime_tva?: string;
          repas_deductibles?: number;
          siret_siren?: string | null;
          updated_at?: string | null;
          vat_number?: string | null;
          vehicules?: string | null;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          legal_representative?: string | null;
          name?: string;
          notes?: string | null;
          org_id?: string;
          phone?: string | null;
          prorata_tva?: number;
          regime_tva?: string;
          repas_deductibles?: number;
          siret_siren?: string | null;
          updated_at?: string | null;
          vat_number?: string | null;
          vehicules?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "clients_org_id_fkey";
            columns: ["org_id"];
            referencedRelation: "orgs";
            referencedColumns: ["id"];
          },
        ];
      };
      org_members: {
        Row: {
          added_at: string | null;
          created_at: string | null;
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          notes: string | null;
          org_id: string;
          phone: string | null;
          role: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          added_at?: string | null;
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          notes?: string | null;
          org_id: string;
          phone?: string | null;
          role: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          added_at?: string | null;
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          notes?: string | null;
          org_id?: string;
          phone?: string | null;
          role?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "org_members_org_id_fkey";
            columns: ["org_id"];
            referencedRelation: "orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "org_members_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["user_id"];
          },
        ];
      };
      orgs: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          owner_id: string | null;
          type: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          owner_id?: string | null;
          type: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          owner_id?: string | null;
          type?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          account_type: string | null;
          created_at: string;
          email: string | null;
          first_name: string | null;
          last_name: string | null;
          org_id: string | null;
          phone: string | null;
          user_id: string;
        };
        Insert: {
          account_type?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          org_id?: string | null;
          phone?: string | null;
          user_id: string;
        };
        Update: {
          account_type?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          org_id?: string | null;
          phone?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_org_id_fkey";
            columns: ["org_id"];
            referencedRelation: "orgs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "org_members";
            referencedColumns: ["user_id"];
          },
        ];
      };
      recus: {
        Row: {
          adresse: string | null;
          analysis_report_url: string | null;
          category_id: string | null;
          categorie: string | null;
          client_id: string | null;
          corrected_at: string | null;
          corrected_by: string | null;
          country_code: string | null;
          created_at: string;
          date_recu: string | null;
          date_traitement: string;
          enseigne: string | null;
          id: number;
          is_corrected: boolean;
          montant_ht: number | null;
          montant_ttc: number | null;
          moyen_paiement: string | null;
          numero_recu: string | null;
          org_id: string;
          processed_by: string | null;
          source: string | null;
          status: Database["public"]["Enums"]["receipt_status"];
          tva: number | null;
          tva_non_recuperable: number | null;
          tva_recuperable: number | null;
          updated_at: string;
          user_id: string | null;
          ville: string | null;
        };
        Insert: {
          adresse?: string | null;
          analysis_report_url?: string | null;
          category_id?: string | null;
          categorie?: string | null;
          client_id?: string | null;
          corrected_at?: string | null;
          corrected_by?: string | null;
          country_code?: string | null;
          created_at?: string;
          date_recu?: string | null;
          date_traitement?: string;
          enseigne?: string | null;
          id?: number;
          is_corrected?: boolean;
          montant_ht?: number | null;
          montant_ttc?: number | null;
          moyen_paiement?: string | null;
          numero_recu?: string | null;
          org_id: string;
          processed_by?: string | null;
          source?: string | null;
          status?: Database["public"]["Enums"]["receipt_status"];
          tva?: number | null;
          tva_non_recuperable?: number | null;
          tva_recuperable?: number | null;
          updated_at?: string;
          user_id?: string | null;
          ville?: string | null;
        };
        Update: {
          adresse?: string | null;
          analysis_report_url?: string | null;
          category_id?: string | null;
          categorie?: string | null;
          client_id?: string | null;
          corrected_at?: string | null;
          corrected_by?: string | null;
          country_code?: string | null;
          created_at?: string;
          date_recu?: string | null;
          date_traitement?: string;
          enseigne?: string | null;
          id?: number;
          is_corrected?: boolean;
          montant_ht?: number | null;
          montant_ttc?: number | null;
          moyen_paiement?: string | null;
          numero_recu?: string | null;
          org_id?: string;
          processed_by?: string | null;
          source?: string | null;
          status?: Database["public"]["Enums"]["receipt_status"];
          tva?: number | null;
          tva_non_recuperable?: number | null;
          tva_recuperable?: number | null;
          updated_at?: string;
          user_id?: string | null;
          ville?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "recus_client_id_fkey";
            columns: ["client_id"];
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recus_org_id_fkey";
            columns: ["org_id"];
            referencedRelation: "orgs";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      receipt_status: "en_cours" | "corrige" | "valide" | "rejete";
    };
  };
};

