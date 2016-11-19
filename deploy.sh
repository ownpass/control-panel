#!/usr/bin/env bash

# When we're not building on Travis, we are probably calling this on a local host
if [ "$TRAVIS" == "1" ]; then
    # We don't deploy pull requests, there is no need
    if [ "$TRAVIS_PULL_REQUEST" == "1" ]; then
        echo "This is a pull request so we don't have to deploy."
        exit 0
    fi

    # We only deploy the master branch and tags
    if [ "$TRAVIS_BRANCH" != "master" ] && [ "$TRAVIS_TAG" == "" ]; then
        echo "This is not a tag and it's not the master branch either so there is nothing to deploy"
        exit 0
    fi
fi

CURRENT_DIR=`pwd`
TARGET_PATH="$CURRENT_DIR/control-panel-$TRAVIS_BRANCH.tar.gz"
BUILD_DIR="$CURRENT_DIR/build/deploy/"

# Remove previously created builds
if [ -f "$TARGET_PATH" ]; then
    rm $TARGET_PATH
fi

# Create the build directory
rm -rf $BUILD_DIR/
mkdir -p $BUILD_DIR/

# Copy the files that should be deployed:
cp -R app/ $BUILD_DIR/app/
cp -R assets/ $BUILD_DIR/assets/
cp -R node_modules/ $BUILD_DIR/node_modules/
cp .htaccess $BUILD_DIR/
cp ./index.html $BUILD_DIR/
cp ./manifest.json $BUILD_DIR/

# Compress
cd $BUILD_DIR/
tar -pczf $TARGET_PATH * .htaccess
