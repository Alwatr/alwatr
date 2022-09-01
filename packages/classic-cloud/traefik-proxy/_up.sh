#!/usr/bin/env bash
set -ex

docker network create alwatr-private-network --subnet=172.18.0.0/16 2>/dev/null || true

[ ! -d _data ] && mkdir _data
[ ! -f _data/acme.json ] && touch _data/acme.json
chmod 600 _data/acme.json

docker compose up --detach --remove-orphans # --force-recreate
