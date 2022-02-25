rm -rf public
mkdir public
cp -r packages/client/public/* public/
cd public
git init
git remote add origin git@github.com:CapsAdmin/vero.git
git checkout -b gh-pages
git add --all
git commit -m "Deploy"
git push -f origin gh-pages