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

docker network create alwatr-private-network || echo "network exist"

time docker compose pull
# docker compose build --pull

echoStep "Starting..."

time docker compose up --detach --remove-orphans #--force-recreate

echoStep "Done"

docker compose logs --tail=300 --follow || true
