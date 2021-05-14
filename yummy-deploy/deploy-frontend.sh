cd yummy-frontend
npm run build
cd /var/www/html/
rm -rf *
cp -a /home/ubuntu/yummy/yummy-frontend/build/. ./