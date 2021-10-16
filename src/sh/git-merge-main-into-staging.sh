#!/bin/sh
git fetch
git checkout main
git pull
git checkout staging
git pull
git merge --no-ff --no-commit main
# Don't merge production content into staging from this script.
# Don't merge wordpress-to-github settings with branch specific settings
# Don't merge build settings
# Don't merge package.json changes because staging is used to test npm package updates
git restore --source=HEAD --staged --worktree -- \
    wordpress/posts \
    wordpress/pages \
    wordpress/media \
    wordpress/wordpress-to-github.config.json \
    wordpress/wordpress-to-github.main-test-pantheon.config.json \
    wordpress/general \
    odi-publishing \
    .github/workflows \
    package.json \
    package-lock.json
git commit -m "Selective merge: main into staging"