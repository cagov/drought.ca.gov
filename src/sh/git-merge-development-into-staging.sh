#!/bin/sh
git fetch
git checkout development
git pull
git checkout staging
git pull
git merge --no-ff --no-commit staging
git restore --source=HEAD --staged --worktree -- \ 
    wordpress/posts \
    wordpress/pages \
    wordpress/media \
    wordpress/config \
    odi-publishing \
    .github/workflows \
    package.json \
    package-lock.json
git commit -m "Selective merge: development into staging"