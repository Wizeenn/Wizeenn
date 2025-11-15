# 🔄 Workflow Dev - Guide Complet

## 📋 Vue d'Ensemble

Ce document décrit le workflow de développement pour Wizeenn avec :
- **Branche `dev`** : Développement et Preview
- **Branche `main`** : Production (protégée)

## 🌿 Structure des Branches

```
main (production)
  ↑
  │ (via Pull Request uniquement)
  │
dev (développement)
```

## 🚀 Workflow Quotidien

### 1. Développement Local

```bash
# S'assurer d'être sur dev
git checkout dev

# Créer une nouvelle branche de feature (optionnel)
git checkout -b feature/ma-feature

# Faire vos modifications dans Cursor
# ...

# Commit
git add .
git commit -m "feat: ma nouvelle feature"

# Push vers dev
git push origin dev
```

### 2. Auto-Push Automatique

Si vous avez configuré le hook `post-commit`, chaque commit sur `dev` déclenche automatiquement un push.

**Script manuel** :
```bash
./auto-push-dev.sh "feat: ma feature"
```

### 3. Déploiement Preview Automatique

Après chaque push sur `dev` :
1. ✅ Vercel détecte le changement
2. ✅ Build automatique
3. ✅ Déploiement Preview sur : `https://wizeenn-git-dev-wizeenn.vercel.app`

### 4. Mise en Production

Quand vous êtes prêt à déployer en production :

```bash
# 1. S'assurer que dev est à jour
git checkout dev
git pull origin dev

# 2. Créer une Pull Request sur GitHub
# Aller sur : https://github.com/Wizeenn/Wizeenn/compare/main...dev

# 3. Remplir la PR :
#    - Titre : "Release: Description de la release"
#    - Description : Liste des changements
#    - Assigner des reviewers si nécessaire

# 4. Approuver la PR (si vous êtes seul, vous pouvez vous auto-approuver)

# 5. Merger la PR
#    → Vercel déploie automatiquement sur Production
```

## 🔧 Commandes Utiles

### Vérifier la Branche Actuelle

```bash
git branch
# ou
git status
```

### Basculement vers Dev

```bash
git checkout dev
```

### Push Manuel vers Dev

```bash
# Méthode 1 : Script automatique
./auto-push-dev.sh "feat: description"

# Méthode 2 : Git standard
git add .
git commit -m "feat: description"
git push origin dev

# Méthode 3 : Alias Git
git pushdev
```

### Voir les Différences entre Dev et Main

```bash
git diff main..dev
```

### Synchroniser Dev avec Main

```bash
# Si main a été mis à jour
git checkout dev
git merge main
```

## 📊 URLs Importantes

- **Repository GitHub** : https://github.com/Wizeenn/Wizeenn
- **Preview (dev)** : https://wizeenn-git-dev-wizeenn.vercel.app
- **Production (main)** : https://wizeenn.vercel.app
- **Pull Requests** : https://github.com/Wizeenn/Wizeenn/pulls

## ⚠️ Règles Importantes

### ✅ À FAIRE

- ✅ Toujours travailler sur `dev` pour le développement
- ✅ Utiliser des messages de commit clairs
- ✅ Tester sur Preview avant de merger
- ✅ Créer des Pull Requests pour merger vers `main`
- ✅ Reviewer le code avant de merger

### ❌ À NE PAS FAIRE

- ❌ Ne jamais push directement sur `main`
- ❌ Ne pas bypasser les règles de protection
- ❌ Ne pas merger sans tester sur Preview
- ❌ Ne pas commit de fichiers sensibles (.env.local)

## 🐛 Dépannage

### Erreur : "Cannot push to protected branch"

→ Vous essayez de push sur `main`. Basculez sur `dev` :
```bash
git checkout dev
```

### Erreur : "Branch is behind remote"

→ Synchronisez votre branche :
```bash
git pull origin dev
```

### Le hook post-commit ne fonctionne pas

→ Vérifier que le hook est exécutable :
```bash
chmod +x .git/hooks/post-commit
```

### Vercel ne déploie pas automatiquement

→ Vérifier :
1. Que vous avez push sur `dev` (pas `main`)
2. Que Vercel détecte la branche `dev`
3. Les logs dans Vercel Dashboard

## 📚 Documentation Complémentaire

- `VERCEL-DEV-SETUP.md` : Configuration Vercel pour Preview
- `GITHUB-PROTECTION.md` : Protection de la branche main
- `AUTOMATE-DEPLOYMENT.md` : Automatisation complète

## 🎯 Checklist Avant de Merger en Production

- [ ] Code testé localement
- [ ] Code testé sur Preview (dev)
- [ ] Aucune erreur dans les logs Vercel
- [ ] Pull Request créée
- [ ] Code review effectuée
- [ ] Toutes les variables d'environnement sont correctes
- [ ] Documentation mise à jour si nécessaire

---

**Bon développement ! 🚀**

