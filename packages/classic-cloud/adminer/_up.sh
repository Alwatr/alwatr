#!/usr/bin/env bash
set -Eeuo pipefail
trap "echo '❌ Error'" ERR

thisPath="$(pwd)"
# projectName="$(basename "$thisPath")"
cd $thisPath;
ls -lahF;

echoStep () {
  echo "🔸 $1"
}

echoStep "Preparing..."

docker network create alwatr-private-network || echo "network exist"

docker-compose pull
# docker-compose build --pull

echoStep "Starting..."

docker-compose up --detach --remove-orphans --force-recreate

echoStep "Done"

docker-compose logs --tail=300 --follow || true
