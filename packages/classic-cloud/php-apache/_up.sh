#!/usr/bin/env bash
set -ex

[ ! -d _data ] && mkdir _data

docker compose up --detach --remove-orphans --force-recreate

time docker compose exec --index 1 --user root php "fix-permition.sh" || true
