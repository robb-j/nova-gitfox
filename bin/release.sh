#!/usr/bin/env bash

# 
# EXPERIMENTAL
# 

set -e

STATUS=`git status --porcelain`

if [ -n "$STATUS" ]
then
  echo "Git is not clean"
  echo "$STATUS"
  exit 1
fi

echo -n "Have you updated the changelog?"
read

echo -n "Enter version: "
read VERSION

if [ -z "$VERSION" ]
then
  echo "No version entered"
  exit 1
fi

echo "Releasing $VERSION"

tmp=`mktemp`
cat Gitfox.novaextension/extension.json | jq '.version = "'$VERSION'"' > $tmp

mv $tmp Gitfox.novaextension/extension.json

git add Gitfox.novaextension/extension.json
git commit -m "$VERSION"
git tag "v$VERSION"

nova extension release Gitfox.novaextension
