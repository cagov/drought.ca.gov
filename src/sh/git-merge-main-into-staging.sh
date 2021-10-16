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

# Check out an exact copy of wordpress posts, pages and media from staging
git checkout staging \
    wordpress/posts \
    wordpress/pages \
    wordpress/media \

# Try git restore (@TODO let's write a description of exactly what this is doing for everyone's benefit)
git restore --source=HEAD --staged --worktree -- \
    wordpress/wordpress-to-github.config.json \
    wordpress/wordpress-to-github.main-test-pantheon.config.json \
    wordpress/general \
    odi-publishing \
    .github/workflows \
    package.json \
    package-lock.json

# @TODO Check for any merge conflicts. If no, it may be safe to do a the commit. 
# We also want to create this as another branch.
# git commit -m "Selective merge: main into staging"