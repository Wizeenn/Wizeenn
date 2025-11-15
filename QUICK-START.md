# ⚡ Quick Start - Déploiement Automatique

## 🎯 Objectif : Déployer Wizeenn sur Vercel en 5 minutes

### ✅ Étape 1 : Push GitHub (2 min)

**Option la plus rapide** : Utiliser un token GitHub

```bash
cd /Users/samiwqrdgytvcv/Wizeenn/Wizeenn

# 1. Créer un token sur https://github.com/settings/tokens
#    Permissions: repo (accès complet)

# 2. Exécuter :
./push-to-github.sh VOTRE_TOKEN_ICI
```

✅ **Résultat attendu** : Code sur https://github.com/Wizeenn/Wizeenn

---

### ✅ Étape 2 : Configurer Vercel (3 min)

**Méthode Dashboard (Recommandée)** :

1. Aller sur https://vercel.com
2. Cliquer "Add New Project"
3. Importer `Wizeenn/Wizeenn`
4. Ajouter ces variables d'environnement :

```
NEXT_PUBLIC_SUPABASE_URL=https://smiyzxrijkgwlbkudchs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtaXl6eHJpamtnd2xia3VkY2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwODQ3MDUsImV4cCI6MjA3ODY2MDcwNX0.E3mAlWWg17Okfx0v_erixbfVpuvSeEthf5W6fbIcp1k
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtaXl6eHJpamtnd2xia3VkY2hzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzA4NDcwNSwiZXhwIjoyMDc4NjYwNzA1fQ.XTbPZp_Qiu7YB7wVMGg3l-OMSCsskCXX04EcAIzGS0c
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://wizeenn.vercel.app/api/auth/callback
```

5. Cliquer "Deploy"

✅ **Résultat attendu** : App live sur https://wizeenn.vercel.app

---

## 🎉 C'est tout !

Votre SaaS est maintenant en ligne. Testez :
- ✅ https://wizeenn.vercel.app/auth/login
- ✅ https://wizeenn.vercel.app/login
- ✅ https://wizeenn.vercel.app/signup/comptable

---

## 📚 Documentation Complète

Voir `AUTOMATE-DEPLOYMENT.md` pour plus de détails.

