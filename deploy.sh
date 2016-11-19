#!/usr/bin/env bash

CURRENT_DIR=`pwd`
TARGET_PATH="$CURRENT_DIR/ownpass-control-panel-master.zip"
BUILD_DIR="$CURRENT_DIR/build/deploy/"

# Remove previously created builds
if [ -f "$TARGET_PATH" ]; then
    rm $TARGET_PATH
fi

# Create the build directory
rm -rf $BUILD_DIR/
mkdir -p $BUILD_DIR/

# Build
npm run typings install
tsc
npm run uglify

# Copy the files that should be deployed:
cp -R app/ $BUILD_DIR/app/
cp -R node_modules/ $BUILD_DIR/node_modules/
cp -R typings/ $BUILD_DIR/typings/
cp .htaccess $BUILD_DIR/
cp ./config.json.dist $BUILD_DIR/
cp ./icons.svg $BUILD_DIR/
cp ./index.html $BUILD_DIR/
cp ./manifest.json $BUILD_DIR/
cp ./styles.css $BUILD_DIR/
cp ./systemjs.config.js $BUILD_DIR/
cp ./vendor.js $BUILD_DIR/

# Compress
cd $BUILD_DIR/
zip -r $TARGET_PATH .
