#!/bin/sh
git fetch
git checkout development
git pull
git checkout main
git pull
git merge --no-ff --no-commit development
git restore --source=HEAD --staged --worktree -- \ 
