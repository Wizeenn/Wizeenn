#!/bin/bash

# Script d'auto-push vers la branche dev
# Usage: ./auto-push-dev.sh [message]
# Ce script doit être appelé depuis Cursor ou configuré comme hook

set -e

# Couleurs pour les logs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔄 Auto-push vers dev${NC}"

# Vérifier qu'on est sur la branche dev
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$CURRENT_BRANCH" != "dev" ]; then
  echo -e "${YELLOW}⚠️  Vous n'êtes pas sur la branche dev. Basculement vers dev...${NC}"
  git checkout dev
fi

# Vérifier s'il y a des changements
if git diff --quiet && git diff --cached --quiet; then
  echo -e "${YELLOW}ℹ️  Aucun changement à committer.${NC}"
  exit 0
fi

# Ajouter tous les fichiers modifiés
echo -e "${GREEN}📦 Ajout des fichiers...${NC}"
git add -A

# Message de commit
COMMIT_MSG=${1:-"feat: auto-sync from Cursor (dev)"}

# Commit
echo -e "${GREEN}💾 Création du commit...${NC}"
git commit -m "$COMMIT_MSG" || {
  echo -e "${YELLOW}ℹ️  Aucun changement à committer.${NC}"
  exit 0
}

# Push vers dev uniquement
echo -e "${GREEN}📤 Push vers origin/dev...${NC}"

# Utiliser le token GitHub si disponible
if [ -n "$GITHUB_TOKEN" ]; then
  git push https://${GITHUB_TOKEN}@github.com/Wizeenn/Wizeenn.git dev 2>&1
else
  git push origin dev 2>&1
fi

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Push réussi vers dev!${NC}"
else
  echo -e "${RED}❌ Erreur lors du push. Vérifiez votre connexion et vos credentials.${NC}"
  exit 1
fi

