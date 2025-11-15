# 🚀 Guide d'Automatisation Complète - Déploiement Vercel

## ✅ État Actuel

- ✅ Code commité localement
- ✅ Remote GitHub configuré: `https://github.com/Wizeenn/Wizeenn`
- ✅ `.env.local` bien ignoré par `.gitignore`
- ⏳ Push vers GitHub (nécessite authentification)
- ⏳ Configuration Vercel

## 📤 ÉTAPE 1 : Push vers GitHub

### Option A : Avec Token (Recommandé)

1. **Créer un Personal Access Token GitHub** :
   - Aller sur https://github.com/settings/tokens
   - Cliquer sur "Generate new token" > "Generate new token (classic)"
   - Nom: `Wizeenn Deploy`
   - Permissions: Cocher `repo` (accès complet aux repositories)
   - Cliquer sur "Generate token"
   - **Copier le token** (il ne sera affiché qu'une fois)

2. **Exécuter le script** :
   ```bash
   cd /Users/samiwqrdgytvcv/Wizeenn/Wizeenn
   ./push-to-github.sh YOUR_GITHUB_TOKEN
   ```

### Option B : Via GitHub CLI

```bash
# Installer GitHub CLI (si pas déjà fait)
brew install gh

# Se connecter
gh auth login

# Push
git push origin main
```

### Option C : Via SSH

```bash
# Configurer SSH (si pas déjà fait)
git remote set-url origin git@github.com:Wizeenn/Wizeenn.git
git push origin main
```

## 🌐 ÉTAPE 2 : Configuration Vercel

### Option A : Via Dashboard Vercel (Recommandé - Plus Simple)

1. **Aller sur Vercel** :
   - Ouvrir https://vercel.com
   - Se connecter avec GitHub

2. **Créer un nouveau projet** :
   - Cliquer sur "Add New Project"
   - Sélectionner le repository `Wizeenn/Wizeenn`
   - Cliquer sur "Import"

3. **Configurer le projet** :
   - **Project Name**: `wizeenn` (ou laisser par défaut)
   - **Framework Preset**: Next.js (détecté automatiquement)
   - **Root Directory**: `./` (par défaut)
   - **Build Command**: `npm run build` (par défaut)
   - **Output Directory**: `.next` (par défaut)
   - **Install Command**: `npm install` (par défaut)

4. **Ajouter les variables d'environnement** :
   Cliquer sur "Environment Variables" et ajouter :

   ```
   NEXT_PUBLIC_SUPABASE_URL = https://smiyzxrijkgwlbkudchs.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtaXl6eHJpamtnd2xia3VkY2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwODQ3MDUsImV4cCI6MjA3ODY2MDcwNX0.E3mAlWWg17Okfx0v_erixbfVpuvSeEthf5W6fbIcp1k
   SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtaXl6eHJpamtnd2xia3VkY2hzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzA4NDcwNSwiZXhwIjoyMDc4NjYwNzA1fQ.XTbPZp_Qiu7YB7wVMGg3l-OMSCsskCXX04EcAIzGS0c
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL = https://wizeenn.vercel.app/api/auth/callback
   ```

   ⚠️ **IMPORTANT** : Sélectionner les environnements pour chaque variable :
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. **Déployer** :
   - Cliquer sur "Deploy"
   - Attendre la fin du build
   - Votre app sera disponible sur `https://wizeenn.vercel.app`

### Option B : Via CLI Vercel (Automatique)

```bash
cd /Users/samiwqrdgytvcv/Wizeenn/Wizeenn

# Exécuter le script d'automatisation
./setup-vercel.sh
```

Le script va :
- Vérifier/installer Vercel CLI
- Vous connecter à Vercel
- Créer le projet
- Ajouter les variables d'environnement depuis `.env.local`
- Déployer en Preview puis Production

## 🔧 ÉTAPE 3 : Vérification Post-Déploiement

### Routes à tester :

1. **Page d'accueil** :
   - `https://wizeenn.vercel.app/`
   - Doit rediriger vers `/auth/login`

2. **Sélection de rôle** :
   - `https://wizeenn.vercel.app/auth/login`
   - Doit afficher les boutons "Je suis comptable" et "Je suis une entreprise"

3. **Connexion** :
   - `https://wizeenn.vercel.app/login`
   - Tester avec un compte existant

4. **Inscription Comptable** :
   - `https://wizeenn.vercel.app/signup/comptable`
   - Créer un compte test

5. **Inscription Entreprise** :
   - `https://wizeenn.vercel.app/auth/signup/entreprise`
   - Créer un compte test avec un org_id valide

6. **Dashboard** :
   - `https://wizeenn.vercel.app/dashboard`
   - Doit être protégé (redirige vers login si non connecté)

## 📝 Checklist Finale

- [ ] Code poussé sur GitHub
- [ ] Projet Vercel créé et lié à GitHub
- [ ] Variables d'environnement configurées
- [ ] Déploiement Preview réussi
- [ ] Déploiement Production réussi
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] Toutes les routes fonctionnent
- [ ] Login/Signup fonctionnent
- [ ] Dashboard accessible après connexion

## 🎯 Commandes Rapides

```bash
# Push GitHub avec token
./push-to-github.sh YOUR_TOKEN

# Setup Vercel automatique
./setup-vercel.sh

# Déploiement manuel
vercel --prod
```

## 🐛 Dépannage

### Erreur "Authentication failed" lors du push
→ Utiliser un token GitHub ou configurer SSH

### Erreur "Missing Supabase credentials" sur Vercel
→ Vérifier que toutes les variables sont ajoutées dans Vercel Dashboard

### Build échoue sur Vercel
→ Vérifier les logs dans Vercel Dashboard > Deployments > [votre déploiement] > Build Logs

### Redirection Supabase ne fonctionne pas
→ Vérifier que `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` pointe vers `https://wizeenn.vercel.app/api/auth/callback`

---

**Une fois terminé, votre SaaS sera en ligne sur `https://wizeenn.vercel.app` ! 🎉**

