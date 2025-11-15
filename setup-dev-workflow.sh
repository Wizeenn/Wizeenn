#!/bin/bash

# Script de configuration du workflow dev
# Usage: ./setup-dev-workflow.sh

set -e

echo "🚀 Configuration du workflow dev pour Wizeenn"
echo "=============================================="
echo ""

# Vérifier qu'on est dans le bon répertoire
if [ ! -f "package.json" ]; then
  echo "❌ Erreur: package.json non trouvé."
  exit 1
fi

# 1. S'assurer qu'on est sur dev
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "dev" ]; then
  echo "📦 Basculement vers la branche dev..."
  git checkout dev 2>/dev/null || git checkout -b dev
fi

# 2. Configurer dev comme branche par défaut pour ce repo
echo "⚙️  Configuration de dev comme branche par défaut..."
git config branch.dev.remote origin
git config branch.dev.merge refs/heads/dev

# 3. Configurer le hook post-commit
echo "🔧 Configuration du hook post-commit..."
if [ ! -f ".git/hooks/post-commit" ]; then
  cat > .git/hooks/post-commit << 'HOOK_EOF'
#!/bin/bash
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" = "dev" ] && [ -z "$GIT_PUSH_IN_PROGRESS" ]; then
  export GIT_PUSH_IN_PROGRESS=1
  sleep 1
  if [ -n "$GITHUB_TOKEN" ]; then
    git push https://${GITHUB_TOKEN}@github.com/Wizeenn/Wizeenn.git dev > /dev/null 2>&1 &
  else
    git push origin dev > /dev/null 2>&1 &
  fi
  unset GIT_PUSH_IN_PROGRESS
fi
exit 0
HOOK_EOF
  chmod +x .git/hooks/post-commit
  echo "✅ Hook post-commit configuré"
else
  echo "ℹ️  Hook post-commit existe déjà"
fi

# 4. Créer un alias Git pour push rapide vers dev
echo "📝 Création d'alias Git..."
git config alias.pushdev '!git checkout dev && git add -A && git commit -m "feat: auto-sync from Cursor (dev)" && git push origin dev'

echo ""
echo "✅ Configuration terminée!"
echo ""
echo "📋 Prochaines étapes:"
echo "   1. Configurez Vercel pour déployer la branche 'dev' en Preview"
echo "   2. Protégez la branche 'main' sur GitHub (voir GITHUB-PROTECTION.md)"
echo "   3. Utilisez './auto-push-dev.sh' pour push manuel vers dev"
echo ""

