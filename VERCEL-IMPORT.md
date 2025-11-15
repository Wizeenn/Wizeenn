# 🚀 Import Vercel - Wizeenn

## ✅ État du Déploiement

- ✅ **Code poussé sur GitHub** : https://github.com/Wizeenn/Wizeenn
- ✅ **Build vérifié** : `npm run build` fonctionne sans erreur
- ✅ **Configuration Vercel** : `vercel.json` présent et correct
- ✅ **Middleware** : Configuré pour protéger les routes
- ✅ **API Routes** : Toutes compilent correctement

## 🔗 URL pour Importer dans Vercel

### Option 1 : Import Direct (Recommandé)

**URL du Repository** :
```
https://github.com/Wizeenn/Wizeenn
```

**Étapes** :
1. Aller sur https://vercel.com/new
2. Cliquer sur "Import Git Repository"
3. Coller l'URL : `https://github.com/Wizeenn/Wizeenn`
4. Cliquer sur "Import"

### Option 2 : Via Dashboard Vercel

1. Aller sur https://vercel.com/dashboard
2. Cliquer sur "Add New Project"
3. Dans la liste des repositories, chercher `Wizeenn/Wizeenn`
4. Cliquer sur "Import"

## ⚙️ Configuration Vercel

### Variables d'Environnement à Ajouter

Une fois le projet importé, ajouter ces variables dans **Settings > Environment Variables** :

```
NEXT_PUBLIC_SUPABASE_URL = https://smiyzxrijkgwlbkudchs.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtaXl6eHJpamtnd2xia3VkY2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwODQ3MDUsImV4cCI6MjA3ODY2MDcwNX0.E3mAlWWg17Okfx0v_erixbfVpuvSeEthf5W6fbIcp1k

SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtaXl6eHJpamtnd2xia3VkY2hzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzA4NDcwNSwiZXhwIjoyMDc4NjYwNzA1fQ.XTbPZp_Qiu7YB7wVMGg3l-OMSCsskCXX04EcAIzGS0c

NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL = https://wizeenn.vercel.app/api/auth/callback
```

⚠️ **IMPORTANT** : Pour chaque variable, sélectionner les environnements :
- ✅ Production
- ✅ Preview  
- ✅ Development

### Configuration du Projet

- **Framework Preset** : Next.js (détecté automatiquement)
- **Root Directory** : `./` (par défaut)
- **Build Command** : `npm run build` (par défaut)
- **Output Directory** : `.next` (par défaut)
- **Install Command** : `npm install` (par défaut)

## ✅ Vérifications Post-Déploiement

### Routes à Tester

1. **Page d'accueil** :
   ```
   https://wizeenn.vercel.app/
   ```
   → Doit rediriger vers `/auth/login`

2. **Sélection de rôle** :
   ```
   https://wizeenn.vercel.app/auth/login
   ```
   → Doit afficher les boutons "Je suis comptable" et "Je suis une entreprise"

3. **Connexion** :
   ```
   https://wizeenn.vercel.app/login
   ```
   → Formulaire de connexion fonctionnel

4. **Inscription Comptable** :
   ```
   https://wizeenn.vercel.app/signup/comptable
   ```
   → Création de compte comptable

5. **Inscription Entreprise** :
   ```
   https://wizeenn.vercel.app/auth/signup/entreprise
   ```
   → Création de compte entreprise

6. **Dashboard** :
   ```
   https://wizeenn.vercel.app/dashboard
   ```
   → Doit être protégé (redirige vers login si non connecté)

## 📊 Routes Compilées

```
✓ / (redirige vers /auth/login)
✓ /auth/login (sélection de rôle)
✓ /login (connexion)
✓ /signup/comptable (inscription comptable)
✓ /auth/signup/entreprise (inscription entreprise)
✓ /dashboard (protégé)
✓ /recus (protégé)
✓ /clients (protégé)
✓ /api/create-org-comptable
✓ /api/create-entreprise
✓ /api/update-profile-org-id
✓ /auth/callback
```

## 🎯 Prochaines Étapes

1. ✅ Importer le projet dans Vercel
2. ✅ Ajouter les variables d'environnement
3. ✅ Déployer
4. ✅ Tester toutes les routes
5. ✅ Configurer un domaine personnalisé (optionnel)

---

**Votre projet est prêt pour le déploiement ! 🚀**

