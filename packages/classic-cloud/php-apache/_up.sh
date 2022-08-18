#!/usr/bin/env bash

set -Eeuo pipefail
trap "echo '❌ Error'" ERR

TIMEFORMAT="done in %Rs"
thisPath="$(dirname "$0")"
cd $thisPath
ls -lahF

echoStep () {
  echo "🔹 $1"
}

echoStep "Preparing..."

[ ! -d _data ] && mkdir _data

time docker compose pull
time docker compose build --pull

echoStep "Starting..."

time docker compose up --detach --remove-orphans --force-recreate

echoStep "Fix permitions..."

time docker compose exec --index 1 --user root php "fix-permition.sh" || true

echoStep "Done"

docker compose logs --tail 300 --follow || true
