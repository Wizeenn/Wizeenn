# 🚀 Wizeenn — SaaS Comptable (Next.js + Supabase)

Plateforme SaaS B2B pour cabinets comptables et entreprises. Gestion de reçus, extraction IA, et collaboration multi-tenant.

## ✨ Fonctionnalités

- 🔐 **Authentification Supabase** : Magic link et password
- 👥 **Multi-tenant** : Support comptables et entreprises
- 📄 **Gestion de reçus** : Import et extraction IA via n8n
- 📊 **Dashboard analytique** : TVA, statistiques, graphiques
- 🎨 **UI moderne** : Tailwind CSS + ShadCN + Radix UI

## 🛠️ Stack Technique

- **Frontend** : Next.js 16 (App Router), React 19, TailwindCSS 3.4, ShadCN, Lucide, Recharts
- **State** : Zustand pour les filtres globaux
- **Backend** : Supabase (PostgreSQL + Auth + Storage + RLS)
- **IA** : n8n pour pipelines d'extraction OCR
- **Déploiement** : Vercel

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/Wizeenn/Wizeenn.git
cd Wizeenn

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp env.example .env.local
# Éditer .env.local avec vos clés Supabase

# Lancer en développement
npm run dev
```

## 🔧 Variables d'Environnement

Créer un fichier `.env.local` :

```env
# Supabase (Public)
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://votre-app.vercel.app/api/auth/callback

# Supabase (Private - Server only)
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key
```

⚠️ **Important** : Ne jamais exposer `SUPABASE_SERVICE_ROLE_KEY` côté client.

## 🚀 Déploiement sur Vercel

### Méthode 1 : Via Dashboard (Recommandé)

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer "Add New Project"
3. Importer le repository `Wizeenn/Wizeenn`
4. Ajouter les variables d'environnement
5. Cliquer "Deploy"

### Méthode 2 : Via CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

📚 **Documentation complète** : Voir `DEPLOYMENT.md` et `AUTOMATE-DEPLOYMENT.md`

## 📁 Structure du Projet

```
src/
 ├─ app/
 │   ├─ (app)/              # Routes protégées
 │   │   ├─ dashboard/
 │   │   ├─ recus/
 │   │   └─ clients/
 │   ├─ auth/               # Routes d'authentification
 │   │   ├─ login/
 │   │   ├─ signup/
 │   │   └─ callback/
 │   ├─ login/              # Page de connexion
 │   ├─ signup/             # Pages d'inscription
 │   ├─ api/                # API Routes
 │   └─ actions/            # Server Actions
 ├─ components/
 │   ├─ layout/             # AppShell, navigation
 │   ├─ dashboard/          # Composants dashboard
 │   └─ ui/                 # Composants ShadCN
 ├─ hooks/                  # useIsMobile, useUserRole
 ├─ integrations/supabase/  # Config Supabase
 ├─ lib/                    # Utilitaires
 └─ stores/                 # Zustand stores
```

## 🛣️ Routes Disponibles

### Publiques
- `/` → Redirige vers `/auth/login`
- `/auth/login` → Sélection de rôle
- `/login` → Connexion email/password
- `/signup/comptable` → Inscription comptable
- `/auth/signup/entreprise` → Inscription entreprise

### Protégées (nécessitent authentification)
- `/dashboard` → Tableau de bord
- `/recus` → Liste des reçus
- `/clients` → Gestion des clients
- `/equipe` → Gestion de l'équipe
- `/parametres` → Paramètres

## 🧪 Tests

```bash
# Tester la connexion Supabase
node --env-file=.env.local scripts/test-supabase.mjs

# Build de production
npm run build

# Linter
npm run lint
```

## 📚 Documentation

- `DEPLOYMENT.md` : Guide de déploiement technique
- `AUTOMATE-DEPLOYMENT.md` : Automatisation complète
- `QUICK-START.md` : Démarrage rapide

## 🔐 Sécurité

- **RLS (Row Level Security)** : Activé sur toutes les tables Supabase
- **Middleware** : Protection automatique des routes sensibles
- **Service Role Key** : Uniquement côté serveur (API Routes)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est privé et propriétaire de Wizeenn.

## 🆘 Support

Pour toute question ou problème, ouvrir une issue sur GitHub.

---

**Développé avec ❤️ par l'équipe Wizeenn**
