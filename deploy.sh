#!/bin/bash

# Script de déploiement Vercel pour Wizeenn
# Usage: ./deploy.sh [preview|production]

set -e

echo "🚀 Déploiement Wizeenn sur Vercel"
echo "=================================="
echo ""

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
  echo "❌ Erreur: package.json non trouvé. Exécutez ce script depuis la racine du projet."
  exit 1
fi

# Vérifier que le build fonctionne
echo "📦 Vérification du build..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Erreur: Le build a échoué. Corrigez les erreurs avant de déployer."
  exit 1
fi

echo "✅ Build réussi!"
echo ""

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
  echo "📥 Installation de Vercel CLI..."
  npm install -g vercel
fi

# Vérifier si l'utilisateur est connecté
if ! vercel whoami &> /dev/null; then
  echo "🔐 Connexion à Vercel..."
  vercel login
fi

# Déploiement
DEPLOY_TYPE=${1:-preview}

if [ "$DEPLOY_TYPE" = "production" ]; then
  echo "🌐 Déploiement en PRODUCTION..."
  vercel --prod
else
  echo "🔍 Déploiement en PREVIEW..."
  vercel
fi

echo ""
echo "✅ Déploiement terminé!"
echo ""
echo "📝 N'oubliez pas de configurer les variables d'environnement dans Vercel:"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo ""

