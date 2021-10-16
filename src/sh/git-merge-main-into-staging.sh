#!/bin/sh
git fetch
git checkout main
git pull
git checkout staging
git pull
git merge --no-ff --no-commit main
git restore --source=HEAD --staged --worktree -- \
    # Don't merge production content into staging from this script.
    wordpress/posts \
    wordpress/pages \
    wordpress/media \
    # Don't merge wordpress-to-github settings with branch specific settings
    wordpress/wordpress-to-github.config.json \
    wordpress/wordpress-to-github.main-test-pantheon.config.json
    wordpress/general \
    # Don't merge build settings
    odi-publishing \
    .github/workflows \
    # Don't merge package.json changes because staging is used to test npm package updates
    package.json \
    package-lock.json \
git commit -m "Selective merge: main into staging"