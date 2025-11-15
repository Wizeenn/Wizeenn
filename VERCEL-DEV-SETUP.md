# 🌐 Configuration Vercel pour Branche Dev

## ✅ État Actuel

- ✅ Branche `dev` créée et poussée sur GitHub
- ✅ Branche `dev` trackée localement
- ⏳ Configuration Vercel Preview pour `dev`

## 🔧 Configuration Vercel

### Étape 1 : Vérifier les Branches dans Vercel

1. Aller sur https://vercel.com/dashboard
2. Sélectionner le projet **Wizeenn**
3. Aller dans **Settings > Git**
4. Vérifier que la branche `dev` est détectée

### Étape 2 : Configurer Preview Deployment pour `dev`

1. Dans **Settings > Git**, vérifier :
   - ✅ **Production Branch** : `main` (ne pas changer)
   - ✅ **Preview Branches** : `dev` doit être listée

2. Si `dev` n'apparaît pas :
   - Vercel détecte automatiquement les branches après le premier push
   - Attendre quelques minutes ou déclencher un nouveau push

### Étape 3 : Variables d'Environnement pour Preview

1. Aller dans **Settings > Environment Variables**
2. Pour chaque variable, vérifier qu'elle est activée pour **Preview** :
   - ✅ NEXT_PUBLIC_SUPABASE_URL
   - ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
   - ✅ SUPABASE_SERVICE_ROLE_KEY
   - ✅ NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL

3. **IMPORTANT** : Mettre à jour `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` pour Preview :
   ```
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL = https://wizeenn-git-dev-wizeenn.vercel.app/api/auth/callback
   ```

### Étape 4 : Vérifier le Déploiement

Après chaque push sur `dev`, Vercel va automatiquement :
1. Détecter le changement
2. Builder le projet
3. Déployer sur une URL Preview

**URL Preview attendue** :
```
https://wizeenn-git-dev-wizeenn.vercel.app
```

## 🔄 Workflow Automatique

### Développement Local → Preview

1. **Vous modifiez du code dans Cursor**
2. **Auto-commit** (si hook configuré) ou commit manuel
3. **Auto-push vers `dev`** (hook post-commit)
4. **Vercel détecte le push**
5. **Build automatique**
6. **Déploiement Preview automatique**

### Merge vers Production

1. Créer une Pull Request `dev` → `main` sur GitHub
2. Vérifier que les tests passent
3. Merge la PR
4. Vercel déploie automatiquement sur Production (`main`)

## 📊 Monitoring

### Vérifier les Déploiements

- **Dashboard Vercel** : https://vercel.com/dashboard
- **Deployments** : Voir tous les déploiements (Preview + Production)
- **Logs** : Vérifier les logs de build et runtime

### URLs

- **Preview (dev)** : `https://wizeenn-git-dev-wizeenn.vercel.app`
- **Production (main)** : `https://wizeenn.vercel.app`

## ⚠️ Important

- ✅ **Toujours travailler sur `dev`** pour le développement
- ✅ **Ne jamais push directement sur `main`**
- ✅ **Utiliser des Pull Requests** pour merger `dev` → `main`
- ✅ **Vérifier Preview avant de merger en production**

## 🐛 Dépannage

### Vercel ne détecte pas la branche `dev`

1. Vérifier que la branche existe sur GitHub
2. Aller dans Vercel > Settings > Git > **Redeploy**
3. Attendre quelques minutes

### Preview ne se déploie pas automatiquement

1. Vérifier les **Webhooks GitHub** dans Vercel Settings
2. Vérifier que les **variables d'environnement** sont configurées pour Preview
3. Vérifier les **logs de build** dans Vercel Dashboard

### Erreur de build sur Preview

1. Vérifier les **logs de build** dans Vercel
2. Tester le build localement : `npm run build`
3. Vérifier que toutes les **dépendances** sont dans `package.json`

---

**Une fois configuré, chaque push sur `dev` déclenchera automatiquement un déploiement Preview ! 🚀**

