#!/usr/bin/env bash
set -Eeuo pipefail
trap "echo '❌ Error'" ERR

TIMEFORMAT="done in %Rs"
thisPath="$(pwd)"
cd $thisPath;
ls -lahF;

echoStep () {
  echo "🔸 $1"
}

echoStep "Preparing..."

docker network create alwatr-public-network --subnet=172.18.0.0/16 || echo "network exist"

[ ! -d _data ] && mkdir _data
[ ! -f _data/acme.json ] && touch _data/acme.json
chmod 600 _data/acme.json

time docker compose pull
# docker compose build --pull

echoStep "Starting..."

time docker compose up --detach --remove-orphans # --force-recreate

echoStep "Done"

docker compose logs --tail=300 --follow || true
