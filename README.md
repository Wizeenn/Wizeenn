## Wizeenn — Base SaaS comptable (Next.js + Supabase)

Fondation prête pour brancher Supabase Auth & RLS : Next.js 16 (App Router), Tailwind 3.4 + ShadCN/Radix UI, Zustand pour les filtres, Supabase (DB/Auth/Storage) avec `@supabase/ssr`.

Le dashboard utilise des données mockées. Les routes `/dashboard`, `/recus`, `/clients` sont déjà disponibles pour accueillir les futures protections d’accès.

## Stack principale

- **Frontend** : Next.js 16, React 19, TailwindCSS 3.4, ShadCN, Lucide, Recharts
- **State** : Zustand (`src/stores/filters-store.ts`)
- **Backend** : Supabase Postgres + Auth (RLS activées) + n8n pour l’IA
- **Supabase clients** : `@supabase/ssr` pour App Router (browser/server)

## Installation & scripts

```bash
npm install
cp env.example .env.local  # renseigner les clés Supabase
npm run dev
npm run lint
npm run build
```

Tester la connexion Supabase :

```bash
node --env-file=.env.local scripts/test-supabase.mjs
```

Ce script liste les tables exposées via l’OpenAPI REST et fait un `select * from profiles limit 1`.

## Variables d’environnement

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...  # optionnel, usage server-only
```

`SUPABASE_SERVICE_ROLE_KEY` reste côté serveur (cron/RPC). Ne jamais l’exposer au client.

## Structure

```
src/
 ├─ app/
 │   ├─ (app)/dashboard
 │   ├─ (app)/recus
 │   ├─ (app)/clients
 │   └─ layout.tsx
 ├─ components/
 │   ├─ layout/app-shell.tsx
 │   ├─ dashboard/*         # cards, charts, tables
 │   └─ ui/*                # composants ShadCN
 ├─ hooks/                  # useIsMobile, useUserRole…
 ├─ integrations/supabase/  # config, clients typed, types.ts
 ├─ lib/utils.ts            # cn, formatCurrency, formatDateTime
 └─ stores/filters-store.ts # Zustand global filters
```

- `components.json` configure la CLI `shadcn-ui`.
- `tailwind.config.ts` définit le thème (radius, couleurs, animations).
- `scripts/test-supabase.mjs` sert de smoke-test.

## Supabase

- Clients typed : `createBrowserSupabaseClient`, `createServerSupabaseClient`.
- `getSupabaseConfig` vérifie les env vars et lance des erreurs explicites si manquantes.
- `src/integrations/supabase/types.ts` vient de l’OpenAPI public. Mettre à jour via `supabase gen types` quand vous aurez un token/CLI connecté.

## Étapes suivantes

1. Ajouter l’auth Supabase (routes /auth, middleware, session cookies).
2. Brancher les vraies requêtes sur `dashboard`, `recus`, `clients`.
3. Connecter les pipelines n8n pour alimenter `recus`.
4. Tester les règles RLS et mettre en place les rôles (comptable vs entreprise).
