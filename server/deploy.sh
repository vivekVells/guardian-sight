echo "Starting deployment"
echo "Pulling from git"
git pull origin main
npx pm2 restart guardian-sight-api
echo "Deployed successfully"
