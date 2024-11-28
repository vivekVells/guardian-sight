echo "Starting deployment"
echo "Pulling from git"
git pull origin main
echo "Installing dependencies"
npm install
echo "Building"
npm run build
echo "Restarting server"
npx pm2 restart guardian-sight-api
echo "Deployed successfully"
