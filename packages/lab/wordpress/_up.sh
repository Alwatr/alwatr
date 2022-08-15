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
[ -f _data/wp-config.php ] && mv -fv "_data/wp-config.php" "_data/wp-config.php.bak"

time docker-compose pull
time docker-compose build --pull

echoStep "Starting..."

time docker-compose up --detach --remove-orphans # --force-recreate

echoStep "Fix permitions..."

time docker-compose exec php "fix-permition.sh"

echoStep "Done"

docker-compose logs --tail=300 --follow || true
