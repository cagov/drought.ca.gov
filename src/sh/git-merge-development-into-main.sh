#!/bin/sh
git fetch
git checkout development
git pull
git checkout main
git pull
git merge --no-ff --no-commit development
git restore --source=HEAD --staged --worktree -- \ 
    pages/wordpress/posts \ 
    pages/wordpress/pages \ 
    pages/wordpress/media \ 
    wordpress/config/wordpress-to-github.development.config.json
git commit -m "Selective merge: development into main"