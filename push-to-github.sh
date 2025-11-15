#!/bin/bash

# Script pour pousser le code sur GitHub
# Usage: ./push-to-github.sh [token]

set -e

echo "📤 Push vers GitHub - Wizeenn"
echo "=============================="
echo ""

REPO_URL="https://github.com/Wizeenn/Wizeenn.git"
TOKEN=${1:-""}

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
  echo "❌ Erreur: package.json non trouvé. Exécutez ce script depuis la racine du projet."
  exit 1
fi

# Vérifier le remote
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "")

if [ "$CURRENT_REMOTE" != "$REPO_URL" ]; then
  echo "🔗 Configuration du remote GitHub..."
  if [ -n "$CURRENT_REMOTE" ]; then
    git remote set-url origin "$REPO_URL"
  else
    git remote add origin "$REPO_URL"
  fi
fi

# Vérifier que .env.local n'est pas tracké
if git ls-files --error-unmatch .env.local &>/dev/null; then
  echo "⚠️  .env.local est tracké. Le retirant du repo..."
  git rm --cached .env.local
fi

# Ajouter tous les fichiers
echo "📦 Ajout des fichiers..."
git add -A

# Vérifier s'il y a des changements
if git diff --staged --quiet; then
  echo "ℹ️  Aucun changement à committer."
else
  echo "💾 Création du commit..."
  git commit -m "🚀 Prepare project for Vercel deployment

- Add Next.js configuration
- Add Tailwind CSS and PostCSS config
- Add middleware for route protection
- Add login and signup pages
- Add API routes for Supabase integration
- Add Vercel configuration
- Add deployment documentation"
fi

# Push vers GitHub
echo "📤 Push vers GitHub..."

if [ -n "$TOKEN" ]; then
  # Utiliser le token pour l'authentification
  git push https://${TOKEN}@github.com/Wizeenn/Wizeenn.git main
else
  # Essayer avec les credentials configurés
  if git push origin main 2>&1 | grep -q "Authentication failed\|could not read Username"; then
    echo ""
    echo "❌ Authentification requise."
    echo ""
    echo "Option 1: Utiliser un token GitHub"
    echo "  ./push-to-github.sh YOUR_GITHUB_TOKEN"
    echo ""
    echo "Option 2: Configurer SSH"
    echo "  git remote set-url origin git@github.com:Wizeenn/Wizeenn.git"
    echo "  git push origin main"
    echo ""
    echo "Option 3: Utiliser GitHub CLI"
    echo "  gh auth login"
    echo "  git push origin main"
    exit 1
  fi
fi

echo ""
echo "✅ Code poussé sur GitHub avec succès!"
echo "🔗 Repository: $REPO_URL"

