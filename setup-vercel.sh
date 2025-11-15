#!/bin/bash

# Script d'automatisation du déploiement Vercel
# Usage: ./setup-vercel.sh

set -e

echo "🚀 Configuration automatique Vercel pour Wizeenn"
echo "================================================"
echo ""

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
  echo "📥 Installation de Vercel CLI..."
  npm install -g vercel
fi

# Vérifier si l'utilisateur est connecté
if ! vercel whoami &> /dev/null; then
  echo "🔐 Connexion à Vercel..."
  echo "Ouvrez votre navigateur pour vous connecter..."
  vercel login
fi

echo ""
echo "📦 Création du projet Vercel..."
echo ""

# Lier le projet (créera un nouveau projet si nécessaire)
vercel link --yes

echo ""
echo "🔧 Configuration des variables d'environnement..."
echo ""

# Lire les variables depuis .env.local
if [ -f ".env.local" ]; then
  source .env.local
  
  echo "Ajout des variables d'environnement..."
  
  if [ ! -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    vercel env add NEXT_PUBLIC_SUPABASE_URL production <<< "$NEXT_PUBLIC_SUPABASE_URL"
    vercel env add NEXT_PUBLIC_SUPABASE_URL preview <<< "$NEXT_PUBLIC_SUPABASE_URL"
    vercel env add NEXT_PUBLIC_SUPABASE_URL development <<< "$NEXT_PUBLIC_SUPABASE_URL"
    echo "✅ NEXT_PUBLIC_SUPABASE_URL ajouté"
  fi
  
  if [ ! -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production <<< "$NEXT_PUBLIC_SUPABASE_ANON_KEY"
    vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview <<< "$NEXT_PUBLIC_SUPABASE_ANON_KEY"
    vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development <<< "$NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY ajouté"
  fi
  
  if [ ! -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    vercel env add SUPABASE_SERVICE_ROLE_KEY production <<< "$SUPABASE_SERVICE_ROLE_KEY"
    vercel env add SUPABASE_SERVICE_ROLE_KEY preview <<< "$SUPABASE_SERVICE_ROLE_KEY"
    vercel env add SUPABASE_SERVICE_ROLE_KEY development <<< "$SUPABASE_SERVICE_ROLE_KEY"
    echo "✅ SUPABASE_SERVICE_ROLE_KEY ajouté"
  fi
  
  if [ ! -z "$NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL" ]; then
    vercel env add NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL production <<< "$NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL"
    vercel env add NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL preview <<< "$NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL"
    vercel env add NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL development <<< "$NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL"
    echo "✅ NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ajouté"
  fi
else
  echo "⚠️  .env.local non trouvé. Ajoutez les variables manuellement dans Vercel Dashboard."
fi

echo ""
echo "🌐 Déploiement Preview..."
vercel

echo ""
echo "✅ Déploiement Preview terminé!"
echo ""
echo "🌐 Déploiement Production..."
vercel --prod

echo ""
echo "🎉 Déploiement terminé avec succès!"
echo ""
echo "📝 Vérifiez votre application sur Vercel Dashboard:"
echo "   https://vercel.com/dashboard"

