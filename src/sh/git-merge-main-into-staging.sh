#!/bin/sh
git fetch
git checkout main
git pull
git checkout staging
git pull
git merge --no-ff --no-commit main
git restore --source=HEAD --staged --worktree -- \
    wordpress/posts \
    wordpress/pages \
    wordpress/media \
    wordpress/general \
    odi-publishing \
    .github/workflows \
#    package.json \
#    package-lock.json \
    wordpress/wordpress-to-github.config.json \
    wordpress/wordpress-to-github.main-test-pantheon.config.json
git commit -m "Selective merge: main into staging"