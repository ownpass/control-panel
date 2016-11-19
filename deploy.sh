#!/usr/bin/env bash

# Prepare
rm ownpass-control-panel-master.zip
rm -rf build-deploy/
mkdir build-deploy/

# Build
npm run typings install
tsc
npm run uglify

# Copy the files that should be deployed:
cp -R app/ build-deploy/app/
cp -R node_modules/ build-deploy/node_modules/
cp -R typings/ build-deploy/typings/
cp .htaccess build-deploy/
cp ./config.json.dist build-deploy/
cp ./icons.svg build-deploy/
cp ./index.html build-deploy/
cp ./manifest.json build-deploy/
cp ./styles.css build-deploy/
cp ./systemjs.config.js build-deploy/
cp ./vendor.js build-deploy/

# Compress
cd build-deploy/
zip -r ../ownpass-control-panel-master.zip .
