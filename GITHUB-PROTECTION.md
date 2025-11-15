# 🛡️ Protection de la Branche Main sur GitHub

## 🎯 Objectif

Protéger la branche `main` pour éviter les push directs et garantir la stabilité de la production.

## ✅ Configuration Requise

### Étape 1 : Accéder aux Settings du Repository

1. Aller sur https://github.com/Wizeenn/Wizeenn
2. Cliquer sur **Settings** (en haut à droite)
3. Dans le menu de gauche, cliquer sur **Branches**

### Étape 2 : Ajouter une Règle de Protection pour `main`

1. Dans la section **Branch protection rules**, cliquer sur **Add rule**
2. Dans **Branch name pattern**, entrer : `main`
3. Configurer les règles suivantes :

#### ✅ Require a pull request before merging
   - ✅ **Require approvals** : Cocher
   - **Required number of approvals** : `1` (ou plus selon vos besoins)
   - ✅ **Dismiss stale pull request approvals when new commits are pushed**

#### ✅ Require status checks to pass before merging
   - ✅ **Require branches to be up to date before merging**
   - **Status checks** : Sélectionner les checks requis (si vous avez des CI/CD)

#### ✅ Require conversation resolution before merging
   - ✅ Cocher cette option

#### ✅ Require signed commits
   - Optionnel : Cocher si vous voulez forcer les commits signés

#### ✅ Require linear history
   - Optionnel : Cocher pour forcer un historique linéaire

#### ✅ Include administrators
   - ✅ **Cocher** : Appliquer les règles même aux administrateurs

#### ✅ Restrict pushes that create files larger than 100 MB
   - ✅ Cocher pour éviter les fichiers trop volumineux

### Étape 3 : Sauvegarder

1. Cliquer sur **Create** en bas de la page
2. La règle est maintenant active

## 🔒 Résultat

Une fois configuré :

- ❌ **Impossible de push directement sur `main`**
- ✅ **Seules les Pull Requests peuvent merger vers `main`**
- ✅ **Les PR nécessitent au moins 1 approbation**
- ✅ **Les administrateurs sont aussi soumis aux règles**

## 🔄 Workflow Protégé

### Développement Normal

1. **Travailler sur `dev`** (push direct autorisé)
2. **Créer une Pull Request** `dev` → `main`
3. **Demander une review** (ou s'auto-approuver si seul)
4. **Approuver la PR**
5. **Merger la PR** → Déploiement automatique sur Production

### En Cas d'Urgence

Si vous devez absolument push sur `main` (urgence critique) :

1. Aller dans **Settings > Branches**
2. **Désactiver temporairement** la protection
3. Faire le push
4. **Réactiver immédiatement** la protection

⚠️ **À utiliser uniquement en cas d'urgence absolue !**

## 📋 Checklist de Protection

- [ ] Règle de protection créée pour `main`
- [ ] Pull Request requise activée
- [ ] Approbation requise activée
- [ ] Administrateurs inclus dans les règles
- [ ] Règle sauvegardée et active

## 🔍 Vérification

Pour vérifier que la protection est active :

1. Essayer de push directement sur `main` :
   ```bash
   git checkout main
   git commit --allow-empty -m "test"
   git push origin main
   ```
2. Vous devriez recevoir une erreur : `remote: error: GH006: Protected branch update failed`

## 🎯 Bonnes Pratiques

- ✅ **Toujours développer sur `dev`**
- ✅ **Créer des PR pour merger vers `main`**
- ✅ **Reviewer le code avant de merger**
- ✅ **Tester sur Preview avant de merger**
- ✅ **Utiliser des messages de commit clairs**

---

**Une fois configuré, votre branche `main` est protégée et la production est sécurisée ! 🛡️**

