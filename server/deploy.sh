echo "Starting deployment"
echo "Pulling from git"
git pull origin main
echo "Installing dependencies"
npm install
echo "Building"
npm run build
echo "Restarting server"
npx pm2 stop guardian-sight-api
npx pm2 start guardian-sight-api
echo "Deployed successfully"
