#!/bin/sh
git fetch
git checkout main
git pull
git checkout staging
git pull
echo "Doing a no fast-forward, no commit merge from main into staging branch"
git merge --no-ff --no-commit main
# Don't merge production content into staging from this script.
# Don't merge wordpress-to-github settings with branch specific settings
# Don't merge build settings
# Don't merge package.json changes because staging is used to test npm package updates

echo "Try git restore to unset any branch specific settings"
# (@TODO let's write a description of exactly what this is doing for everyone's benefit)
git restore --source=HEAD --staged --worktree -- \
    src/templates/wordpress/posts \
    src/templates/wordpress/pages \
    src/wordpress-media \

# echo "Checking out an exact copy of wordpress posts, pages and media from staging. This should fully reset any diff changes for content that differs from main and staging."
# git checkout staging \
   # wordpress/posts \
   # wordpress/pages \
   # wordpress/media    


# git status
# @TODO Check for any merge conflicts. If no, it may be safe to do a the commit. 
# We also want to create this as another branch.
# git commit -m "Selective merge: main into staging"
