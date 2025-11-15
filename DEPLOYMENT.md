# 🚀 Guide de Déploiement Vercel - Wizeenn

## ✅ Prérequis

- Compte Vercel créé
- Projet Git (GitHub, GitLab, ou Bitbucket)
- Variables d'environnement Supabase prêtes

## 📋 Variables d'Environnement Requises

Ajoutez ces variables dans Vercel (Settings > Environment Variables) :

### Variables Publiques (NEXT_PUBLIC_*)
```
NEXT_PUBLIC_SUPABASE_URL=https://smiyzxrijkgwlbkudchs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://votre-app.vercel.app/api/auth/callback
```

### Variables Privées (Server-side uniquement)
```
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key
```

⚠️ **IMPORTANT** : Ne jamais exposer `SUPABASE_SERVICE_ROLE_KEY` côté client !

## 🎯 Méthode 1 : Déploiement via CLI Vercel

### 1. Installer Vercel CLI (si pas déjà fait)
```bash
npm i -g vercel
```

### 2. Se connecter à Vercel
```bash
vercel login
```

### 3. Lier le projet à Vercel
```bash
cd /Users/samiwqrdgytvcv/Wizeenn/Wizeenn
vercel link
```
- Choisir un projet existant ou créer un nouveau projet
- Sélectionner le scope (votre compte/organisation)

### 4. Déployer en preview
```bash
vercel
```

### 5. Déployer en production
```bash
vercel --prod
```

## 🌐 Méthode 2 : Déploiement via Dashboard Vercel

### 1. Connecter votre repository Git
- Aller sur [vercel.com](https://vercel.com)
- Cliquer sur "Add New Project"
- Importer votre repository GitHub/GitLab/Bitbucket

### 2. Configurer le projet
- **Framework Preset** : Next.js (détecté automatiquement)
- **Root Directory** : `./` (ou laisser par défaut)
- **Build Command** : `npm run build` (par défaut)
- **Output Directory** : `.next` (par défaut)
- **Install Command** : `npm install` (par défaut)

### 3. Ajouter les variables d'environnement
- Aller dans Settings > Environment Variables
- Ajouter toutes les variables listées ci-dessus
- Sélectionner les environnements (Production, Preview, Development)

### 4. Déployer
- Cliquer sur "Deploy"
- Vercel va automatiquement :
  - Installer les dépendances
  - Builder le projet
  - Déployer sur un URL unique

## ✅ Vérifications Post-Déploiement

### Routes à tester :
- ✅ `/` → Redirige vers `/auth/login`
- ✅ `/auth/login` → Page de sélection de rôle
- ✅ `/login` → Page de connexion
- ✅ `/signup/comptable` → Inscription comptable
- ✅ `/auth/signup/entreprise` → Inscription entreprise
- ✅ `/dashboard` → Dashboard (protégé, nécessite auth)

### Tests fonctionnels :
1. **Inscription Comptable** :
   - Créer un compte comptable
   - Vérifier que l'org est créée
   - Vérifier que le profile est rempli

2. **Inscription Entreprise** :
   - Créer un compte entreprise avec un org_id valide
   - Vérifier que l'entreprise est créée

3. **Connexion** :
   - Se connecter avec email/password
   - Vérifier la redirection vers `/dashboard`

## 🔧 Configuration du Projet

### Fichiers de Configuration
- ✅ `next.config.ts` - Configuration Next.js
- ✅ `tsconfig.json` - Configuration TypeScript avec paths `@/*`
- ✅ `tailwind.config.ts` - Configuration Tailwind CSS
- ✅ `postcss.config.js` - Configuration PostCSS
- ✅ `vercel.json` - Configuration Vercel
- ✅ `middleware.ts` - Protection des routes

### Routes Protégées
Le middleware protège automatiquement :
- `/dashboard`
- `/recus`
- `/clients`
- `/equipe`
- `/parametres`

### Routes Publiques
Ces routes sont accessibles sans authentification :
- `/`
- `/login`
- `/auth/login`
- `/auth/signup/*`
- `/signup/*`

## 🐛 Dépannage

### Erreur "Missing Supabase credentials"
- Vérifier que toutes les variables d'environnement sont ajoutées dans Vercel
- Vérifier que `SUPABASE_SERVICE_ROLE_KEY` est bien dans les variables privées

### Erreur de build
- Vérifier que `npm run build` fonctionne localement
- Vérifier les logs de build dans Vercel Dashboard

### Erreur de redirection
- Vérifier que `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` pointe vers votre domaine Vercel
- Format : `https://votre-app.vercel.app/api/auth/callback`

## 📝 Notes Importantes

1. **Service Role Key** : Ne jamais utiliser côté client, uniquement dans les API routes
2. **Environment Variables** : Les variables `NEXT_PUBLIC_*` sont exposées au client
3. **Middleware** : Protège automatiquement les routes sensibles
4. **Build** : Le build doit passer sans erreur avant le déploiement

## 🎉 Une fois déployé

Votre application sera accessible sur :
- **Production** : `https://votre-projet.vercel.app`
- **Preview** : `https://votre-projet-git-branch.vercel.app` (pour chaque PR)

---

**Bon déploiement ! 🚀**

